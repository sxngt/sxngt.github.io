(self.webpackChunkysh_blog=self.webpackChunkysh_blog||[]).push([[230],{1309:function(e,t,l){"use strict";var n=l(7294),o=l(2788),a=l(9583),i=l(231),r=l(9349);const c=o.default.div.withConfig({displayName:"Bio__BioWrapper",componentId:"sc-i9lyaz-0"})(["display:flex;align-items:center;@media (max-width:768px){padding:0 15px;}"]),s="undefined"!=typeof window&&"localhost:8000"===window.location.host?"http://localhost:8000":r.siteUrl,m=o.default.div.withConfig({displayName:"Bio__Profile",componentId:"sc-i9lyaz-1"})(["flex:0 0 auto;margin-right:16px;width:128px;height:128px;border-radius:999px;background-image:url(","/profile.png);background-size:cover;background-position:center;"],s),d=o.default.div.withConfig({displayName:"Bio__Author",componentId:"sc-i9lyaz-2"})(["margin-bottom:4.8px;font-size:24px;font-weight:700;color:",";"],(e=>e.theme.colors.text)),u=o.default.div.withConfig({displayName:"Bio__Description",componentId:"sc-i9lyaz-3"})(["margin-bottom:11.2px;line-height:1.5;font-size:16px;color:",";"],(e=>e.theme.colors.secondaryText)),p=o.default.div.withConfig({displayName:"Bio__LinksWrapper",componentId:"sc-i9lyaz-4"})(["& a{margin-right:9.6px;}& svg{width:25.6px;height:25.6px;cursor:pointer;}& svg path{fill:",";transition:fill 0.3s;}& a:hover svg path{fill:",";}"],(e=>e.theme.colors.icon),(e=>e.theme.colors.text)),g=e=>{let{link:t,children:l}=e;return t?n.createElement("a",{href:t,target:"_blank",rel:"noreferrer"},l):null};t.Z=()=>{const{github:e,kaggle:t,instagram:l,facebook:o,twitter:s,x:h,blogger:f,medium:E,linkedIn:x,email:k,resume:w,link:y}=r.links;return n.createElement(c,{id:"bio"},n.createElement(m,null),n.createElement("div",null,n.createElement(d,null,"@",r.author),n.createElement(u,null,r.description),n.createElement(p,null,n.createElement(g,{link:e},n.createElement(a.hJX,null)),n.createElement(g,{link:t},n.createElement(a.jnu,null)),n.createElement(g,{link:l},n.createElement(a.Zf_,null)),n.createElement(g,{link:o},n.createElement(a.Am9,null)),n.createElement(g,{link:s},n.createElement(a.fWC,null)),n.createElement(g,{link:h},n.createElement(i.LCd,null)),n.createElement(g,{link:E},n.createElement(i.Vlo,null)),n.createElement(g,{link:f},n.createElement(i.emo,null)),n.createElement(g,{link:x},n.createElement(a.ltd,null)),n.createElement(g,{link:k},n.createElement(i.uWG,null)),n.createElement(g,{link:w},n.createElement(i.lp$,null)),n.createElement(g,{link:y},n.createElement(i.gjK,null)))))}},4246:function(e,t,l){"use strict";var n=l(3493),o=l.n(n),a=l(7294),i=l(2788),r=l(1883),c=l(2213),s=l(729),m=l(184);const d=i.default.div.withConfig({displayName:"PostList__PostListWrapper",componentId:"sc-s0goqs-0"})(["@media (max-width:768px){padding:0 10px;}"]),u=i.default.div.withConfig({displayName:"PostList__PostWrapper",componentId:"sc-s0goqs-1"})(["position:relative;top:0;transition:all 0.5s;@media (max-width:768px){padding:0 5px;}"]),p=i.default.p.withConfig({displayName:"PostList__Date",componentId:"sc-s0goqs-2"})(["margin-bottom:16px;font-size:14.4px;color:",";"],(e=>e.theme.colors.tertiaryText)),g=i.default.p.withConfig({displayName:"PostList__Excerpt",componentId:"sc-s0goqs-3"})(["margin-bottom:32px;line-height:1.7;font-size:16px;color:",";word-break:break-all;"],(e=>e.theme.colors.secondaryText));t.Z=e=>{let{postList:t}=e;const{0:l,1:n}=(0,a.useState)(10),i=o()((()=>{document.documentElement.scrollHeight-document.documentElement.scrollTop<=document.documentElement.clientHeight+100&&l<t.length&&setTimeout((()=>n(l+10)),300)}),250);return(0,a.useEffect)((()=>(window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)})),[l,t]),(0,a.useEffect)((()=>{n(10)}),[t]),a.createElement(d,null,t.slice(0,l).map(((e,n)=>{const{title:o,description:i,date:d,tags:h}=e.frontmatter,{excerpt:f}=e,{slug:E}=e.fields;return a.createElement(a.Fragment,null,a.createElement(u,null,a.createElement(c.Z,{size:"bg"},a.createElement(r.Link,{to:E},o)),a.createElement(p,null,d),i?a.createElement(g,null,i):a.createElement(g,null,f),a.createElement(m.Z,{tagList:h})),l-1!==n&&t.length-1!==n&&a.createElement(s.Z,{mt:"48px",mb:"32px"}))})))}},184:function(e,t,l){"use strict";var n=l(7294),o=l(2788),a=l(1883);const i=o.default.div.withConfig({displayName:"TagList__TagListWrapper",componentId:"sc-1330gcr-0"})(["margin-bottom:16px;word-break:break-all;"]),r=o.default.div.withConfig({displayName:"TagList__TagLink",componentId:"sc-1330gcr-1"})(["display:inline-block;padding:9.6px 11.2px;margin-right:8px;margin-bottom:8px;border-radius:50px;background-color:",";color:",";text-decoration:none;font-size:14.4px;transition:all 0.2s;&:hover{background-color:",";}"],(e=>e.selected?e.theme.colors.selectedTagBackground:e.theme.colors.tagBackground),(e=>e.selected?e.theme.colors.selectedTagText:e.theme.colors.tagText),(e=>e.selected?e.theme.colors.hoveredSelectedTagBackground:e.theme.colors.hoveredTagBackground)),c=e=>e.replace(/\s+/g,"-");t.Z=e=>{let{tagList:t,count:l,selected:o}=e;return t?l?n.createElement(i,null,t.map(((e,t)=>n.createElement(a.Link,{key:JSON.stringify({tag:e,i:t}),to:o===e.fieldValue?"/tags":"/tags?q="+e.fieldValue},n.createElement(r,{selected:e.fieldValue===o},c(e.fieldValue)," (",e.totalCount,")"))))):n.createElement(i,null,t.map(((e,t)=>n.createElement(a.Link,{key:JSON.stringify({tag:e,i:t}),to:"/tags?q="+e},n.createElement(r,null,c(e)))))):null}},804:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return b}});var n=l(9734),o=l.n(n),a=l(7294),i=l(5038),r=l(5609),c=l(1309),s=l(4246),m=l(5161),d=l.n(m),u=l(2788),p=l(1883);const g=u.default.div.withConfig({displayName:"SideTagList__RelativeWrapper",componentId:"sc-10t0uxa-0"})(["position:relative;"]),h=u.default.aside.withConfig({displayName:"SideTagList__Wrapper",componentId:"sc-10t0uxa-1"})(["position:absolute;left:112%;top:0px;width:200px;height:100px;font-size:16px;@media (max-width:1300px){display:none;}"]),f=u.default.div.withConfig({displayName:"SideTagList__Title",componentId:"sc-10t0uxa-2"})(["margin-bottom:25px;font-weight:bold;color:",";"],(e=>e.theme.colors.secondaryText)),E=u.default.li.withConfig({displayName:"SideTagList__Tag",componentId:"sc-10t0uxa-3"})(["margin-bottom:16px;color:",";cursor:pointer;transition:color 0.3s;&:hover{color:",";}& > a{color:inherit;text-decoration:none;}"],(e=>e.theme.colors.tertiaryText),(e=>e.theme.colors.text));var x=e=>{let{tags:t,postCount:l}=e;return a.createElement(g,null,a.createElement(h,null,a.createElement(f,null,"TAG LIST"),a.createElement("ul",null,a.createElement(E,null,a.createElement(p.Link,{to:"/tags"},"all (",l,")")),d()(t,(e=>a.createElement(E,null,a.createElement(p.Link,{to:"/tags?q="+e.fieldValue},e.fieldValue," (",e.totalCount,")")))))))},k=l(729),w=l(1093),y=l(9349);var b=e=>{let{data:t}=e;const l=t.allMarkdownRemark.nodes,n=o()(t.allMarkdownRemark.group,["totalCount"]).reverse();return 0===l.length?a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).'):a.createElement(i.Z,null,a.createElement(r.Z,{title:y.title,description:y.description,url:y.siteUrl}),a.createElement(w.Z,{size:48}),a.createElement(c.Z,null),a.createElement(k.Z,null),a.createElement(x,{tags:n,postCount:l.length}),a.createElement(s.Z,{postList:l}))}},5161:function(e,t,l){var n=l(9932),o=l(7206),a=l(9199),i=l(1469);e.exports=function(e,t){return(i(e)?n:a)(e,o(t,3))}}}]);
//# sourceMappingURL=component---src-pages-index-jsx-dd5ab04b36dbdd8d76bc.js.map