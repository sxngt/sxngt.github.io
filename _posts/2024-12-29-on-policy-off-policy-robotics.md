---
layout: post
title: "시뮬레이션 로보틱스에서의 On-Policy와 Off-Policy"
date: 2024-12-29
---

## 1. Policy의 재정의: 로봇 제어 관점

### 1.1 수학적 정의의 물리적 투영

- **Policy** $\pi(a|s): \mathcal{S} \rightarrow \mathcal{P}(\mathcal{A})$는 상태 공간에서 행동 확률 분포로의 매핑임
- Quadruped locomotion에서 $s$는 joint position, velocity, body orientation을 포함하는 observation vector임
- $a$는 각 joint에 대한 torque command 또는 position target임
- Isaac Lab의 `env.step(action)` 호출 시 발생하는 것은 $a \sim \pi(\cdot|s;\theta)$의 샘플링 과정임

### 1.2 Stochastic vs Deterministic Policy의 실용적 구분

**훈련 시 (Stochastic):**
$$\pi_\theta(a|s) = \mathcal{N}(\mu_\theta(s), \sigma_\theta(s))$$

**배포 시 (Deterministic):**
$$\pi(s) = \mu_\theta(s)$$

- Stochastic policy의 분산 $\sigma$는 exploration을 담당함
- Real robot 배포 시 $\sigma \rightarrow 0$으로 설정하는 이유: 탐험으로 인한 예측 불가능한 동작이 하드웨어 손상을 유발함
- Sim-to-real transfer에서 policy의 deterministic 전환은 필수 과정임

---

## 2. On-Policy 방법론: 시뮬레이션 로보틱스의 주류

### 2.1 PPO (Proximal Policy Optimization)의 지배적 위치

**Clipped Surrogate Objective:**
$$L^{CLIP}(\theta) = \mathbb{E}_t \left[ \min \left( r_t(\theta) \hat{A}_t, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \hat{A}_t \right) \right]$$

- $r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{old}}(a_t|s_t)}$: probability ratio
- $\epsilon = 0.2$: policy 변화를 20% 이내로 제한하는 trust region 파라미터

**Clipping의 물리적 의미:**
- Policy의 급격한 변화는 gait pattern의 불연속성을 유발함
- Locomotion에서 gait 급변은 넘어짐으로 직결됨
- $\epsilon$은 연속적인 동작 변화를 보장하는 안전 장치임

**RSL-RL 기본 설정의 근거:**
```python
clip_param = 0.2      # trust region 크기
entropy_coef = 0.01   # exploration 강도
learning_rate = 3e-4  # gradient step 크기
```

### 2.2 GAE (Generalized Advantage Estimation)

$$\hat{A}_t^{GAE(\gamma,\lambda)} = \sum_{l=0}^{\infty} (\gamma\lambda)^l \delta_{t+l}$$

- $\delta_t = r_t + \gamma V(s_{t+1}) - V(s_t)$: TD error
- $\lambda = 0$: TD(0), high bias / low variance → 빠른 수렴, local optima 위험
- $\lambda = 1$: Monte Carlo, zero bias / high variance → 느린 수렴, 정확한 gradient

**시뮬레이션에서의 variance 해결:**
- 4096개 병렬 환경 × 24 step horizon = 98,304 transitions per update
- 대량의 샘플이 Monte Carlo 방식의 high variance를 상쇄함
- GPU 병렬화가 On-policy의 sample inefficiency 문제를 해결함

### 2.3 On-Policy의 Sample Inefficiency 문제

**계산 예시:**
- 1M timesteps @ 4096 parallel envs = 244 iterations
- 1 iteration @ 30 FPS = 3.2 seconds
- Total training time: ~13 minutes (RTX 4090 기준)

**Real robot으로 환산:**
- 단일 로봇, 실시간 수집 가정
- 1M timesteps = 11.5일 소요
- On-policy의 "한 번 쓰고 버리는" 특성이 실제 로봇에서는 치명적임

---

## 3. Off-Policy 방법론: Sample Efficiency의 대가

### 3.1 Q-Learning과 연속 행동 공간의 문제

**기본 Q-Learning:**
$$Q(s,a) \leftarrow Q(s,a) + \alpha \left[ r + \gamma \max_{a'} Q(s',a') - Q(s,a) \right]$$

- $\max_{a'}$ 연산이 continuous action space에서 intractable함
- Joint torque는 연속값이므로 모든 action enumeration 불가능

**SAC (Soft Actor-Critic)의 해결책:**
$$J(\pi) = \mathbb{E}_{\tau \sim \pi} \left[ \sum_t r(s_t, a_t) + \alpha \mathcal{H}(\pi(\cdot|s_t)) \right]$$

- Entropy term $\mathcal{H}$가 exploration을 자동 조절함
- Temperature $\alpha$의 자동 튜닝으로 hyperparameter 부담 감소

### 3.2 Experience Replay의 통계적 근거

**Temporal correlation 문제:**
- 연속된 state 간 상관관계: $\text{Corr}(s_t, s_{t+1}) \approx 1$
- 로봇 동역학의 연속성으로 인해 인접 observation이 거의 동일함
- 높은 correlation이 gradient estimation을 오염시킴

**Replay buffer의 역할:**
- Random sampling으로 $\text{Corr}(s_i, s_j) \approx 0$ 달성
- i.i.d. assumption 복원
- Stochastic gradient descent의 이론적 전제 조건 충족

### 3.3 Target Network의 필요성

**Bootstrap 불안정성:**
$$y = r + \gamma Q_\theta(s', \arg\max_{a'} Q_\theta(s', a'))$$

- 동일한 $Q_\theta$로 target 계산과 network 업데이트를 수행함
- Self-referential update로 인한 발산 가능성

**Polyak averaging 해결책:**
$$\theta^{-} \leftarrow \tau \theta + (1-\tau) \theta^{-}, \quad \tau = 0.005$$

- Target network $\theta^{-}$를 slowly moving average로 유지
- Value function 발산 시 로봇의 비정상적 동작 유발
- 안정적 수렴을 위한 필수 메커니즘임

---

## 4. Sim-to-Real Transfer: 이론과 현실의 간극

### 4.1 Domain Randomization

**수학적 정의:**
$$\pi^* = \arg\max_\pi \mathbb{E}_{\xi \sim P(\Xi)} \left[ J(\pi; \xi) \right]$$

- $\xi$: domain parameters (마찰계수, 질량, 관성 모멘트, 센서 노이즈)
- 다양한 물리 조건에 대해 평균적으로 좋은 성능을 내는 robust policy 학습

**Isaac Lab 구현:**
```python
mass_range = [0.8, 1.2]       # ±20% 질량 변화
friction_range = [0.5, 1.5]    # 마찰계수 변화
motor_strength_range = [0.9, 1.1]  # 모터 출력 변화
```

- Reality gap: 시뮬레이션과 실제 물리의 불일치
- Domain randomization은 이 gap에 대한 robustness를 확보하는 regularization 기법임

### 4.2 Observation Noise Injection

$$\tilde{s} = s + \epsilon, \quad \epsilon \sim \mathcal{N}(0, \sigma^2)$$

- 실제 센서의 노이즈 특성: IMU drift, encoder quantization, latency
- 시뮬레이션의 clean observation으로 학습 시 real 환경에서 성능 저하
- Noise injection으로 센서 불확실성에 대한 내성 확보

---

## 5. On-Policy vs Off-Policy: 선택 기준

### 5.1 시뮬레이션 환경에서의 비교

| 항목 | On-Policy (PPO) | Off-Policy (SAC) |
|------|-----------------|------------------|
| 구현 복잡도 | 낮음 | 높음 (replay buffer, target network) |
| Hyperparameter 수 | 적음 | 많음 |
| 병렬화 용이성 | 높음 | 낮음 (replay buffer 병목) |
| 수렴 안정성 | 높음 | replay ratio에 민감 |
| GPU 활용도 | 극대화 가능 | 메모리 제약 존재 |

### 5.2 병렬 시뮬레이션이 바꾼 패러다임

- 98,304 samples/iteration이 가능해지면서 On-policy의 sample inefficiency가 상쇄됨
- Off-policy의 주요 장점인 "sample 재활용"의 중요도가 감소함
- GPU parallelism이 On-policy를 로보틱스 시뮬레이션의 de facto standard로 만듦

### 5.3 Off-Policy가 유리한 경우

**Real robot online learning:**
- 병렬 환경 불가능, 단일 로봇만 존재
- 수집된 데이터의 재활용이 필수적
- SAC + Experience Replay가 적합

**Human demonstration 활용:**
- 인간 시연 데이터는 현재 policy와 무관하게 수집됨
- On-policy로는 off-distribution data 사용 불가
- Off-policy의 behavior-agnostic 특성이 필요

---

## 6. 결론

**시뮬레이션 기반 학습:**
- 병렬화 가능 + 안정성 요구 → PPO
- 데이터 효율 + 탐험 다양성 → SAC

**Real robot 적용:**
- Sim-to-real transfer → PPO로 시뮬레이션 학습 후 zero-shot transfer
- Online adaptation 필요 → SAC + minimal replay buffer

Policy 선택의 근거는 "무엇이 좋은가"가 아니라 "문제의 제약 조건이 무엇인가"에 기반해야 함. 병렬 시뮬레이션 자원의 가용성, 실제 로봇 데이터 수집의 비용, transfer 요구사항이 알고리즘 선택의 결정 요인임.

---

*시뮬레이션은 거짓말을 하지 않는다. 거짓말을 하는 것은 모델링의 가정이다.*
