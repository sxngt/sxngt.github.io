# CLAUDE.md - sxngt.github.io 유지보수 가이드

## 프로젝트 개요

- **테마**: [no-style-please](https://github.com/riggraz/no-style-please)
- **URL**: https://sxngt.github.io
- **배포**: GitHub Pages (자동, main 브랜치 push 시)

## 폴더 구조

```
sxngt.github.io/
├── _config.yml          # 사이트 설정
├── _data/
│   └── menu.yml         # 메뉴 구조
├── _posts/              # 블로그 글
│   └── YYYY-MM-DD-title.md
├── _layouts/            # 레이아웃 템플릿
├── _sass/
│   └── no-style-please.scss  # 스타일 커스터마이징
├── about.md             # 소개 페이지
├── cv.md                # 이력서 페이지
├── index.md             # 홈페이지
└── archive.md           # 블로그 아카이브
```

## 블로그 글 작성

### 새 글 추가

`_posts/YYYY-MM-DD-title.md` 형식으로 파일 생성:

```markdown
---
layout: post
title: "글 제목"
---

본문 내용...
```

### 카테고리/태그 사용 (선택)

```markdown
---
layout: post
title: "글 제목"
category: robotics
tags: [isaac-lab, reinforcement-learning]
---
```

## 메뉴 수정

`_data/menu.yml` 편집:

```yaml
entries:
  - title: ~/about
    url: about

  - title: ~/projects
    entries:
      - title: "project name"
        url: https://github.com/sxngt/repo

  - title: ~/blog
    post_list:
      limit: 10
```

### 메뉴 구조 옵션

- `url`: 링크 URL
- `entries`: 하위 메뉴 항목
- `post_list`: 블로그 글 목록 표시
  - `limit`: 표시할 글 수
  - `show_more`: 더보기 링크 표시
  - `category`: 특정 카테고리만 표시

## 설정 변경

### `_config.yml` 주요 항목

```yaml
title: sxngt                    # 사이트 제목
author: SangHyun Yun            # 작성자
description: >                  # 사이트 설명 (SEO)
  Robotics Master's Student

theme_config:
  appearance: "dark"            # dark / light / auto
  lowercase_titles: true        # 소문자 제목
```

### 다크모드 색상 변경

`_sass/no-style-please.scss`:

```scss
html[data-theme="dark"] {
  --bg: #0d1117;
  --text: #c9d1d9;
  --links: #58a6ff;
}
```

## 로컬 개발

```bash
# 의존성 설치
bundle install

# 로컬 서버 실행
bundle exec jekyll serve

# http://localhost:4000 에서 확인
```

## 배포

```bash
git add .
git commit -m "커밋 메시지"
git push origin main

# GitHub Actions가 자동으로 빌드 & 배포
# 1-2분 후 사이트 반영
```

## 자주 쓰는 작업

### 새 블로그 글 추가

```bash
# 파일 생성
touch _posts/$(date +%Y-%m-%d)-title.md

# 커밋 & 푸시
git add . && git commit -m "Add post: title" && git push
```

### about/cv 페이지 수정

- `about.md` - 소개 페이지
- `cv.md` - 이력서 페이지
- 영어 먼저, `---` 구분선 후 한국어

### 프로젝트 링크 추가

`_data/menu.yml`의 `~/projects` 섹션에 추가:

```yaml
- title: "new-project - description"
  url: https://github.com/sxngt/new-project
```

## 트러블슈팅

### 빌드 실패 시

```bash
# GitHub Actions 로그 확인
gh run list
gh run view <run-id> --log-failed
```

### 로컬에서 확인

```bash
bundle exec jekyll build --verbose
```

## 참고 링크

- [no-style-please 문서](https://github.com/riggraz/no-style-please)
- [Jekyll 문서](https://jekyllrb.com/docs/)
- [GitHub Pages 문서](https://docs.github.com/en/pages)
