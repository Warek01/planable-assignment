import{w as L,a as R}from"./with-props-Nl8GaAsT.js";import{a as c,n as p,M as T,L as _,S as H,o as q,O as U,p as B}from"./chunk-SYFQ2XB5-ePwPyWlc.js";import{c as W,m as Y,a as Z,u as G,b as J,s as K,D as Q,p as V,d as X,r as ee,R as te,P as ae}from"./redux-D9f6bYtA.js";import"./index-Gr51Cw-a.js";let re={data:""},se=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||re,oe=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ie=/\/\*[^]*?\*\/|  +/g,P=/\n+/g,x=(e,t)=>{let a="",o="",s="";for(let r in e){let n=e[r];r[0]=="@"?r[1]=="i"?a=r+" "+n+";":o+=r[1]=="f"?x(n,r):r+"{"+x(n,r[1]=="k"?"":t)+"}":typeof n=="object"?o+=x(n,t?t.replace(/([^,])+/g,i=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,i):i?i+" "+l:l)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=x.p?x.p(r,n):r+":"+n+";")}return a+(t&&s?t+"{"+s+"}":s)+o},y={},F=e=>{if(typeof e=="object"){let t="";for(let a in e)t+=a+F(e[a]);return t}return e},ne=(e,t,a,o,s)=>{let r=F(e),n=y[r]||(y[r]=(l=>{let d=0,u=11;for(;d<l.length;)u=101*u+l.charCodeAt(d++)>>>0;return"go"+u})(r));if(!y[n]){let l=r!==e?e:(d=>{let u,m,f=[{}];for(;u=oe.exec(d.replace(ie,""));)u[4]?f.shift():u[3]?(m=u[3].replace(P," ").trim(),f.unshift(f[0][m]=f[0][m]||{})):f[0][u[1]]=u[2].replace(P," ").trim();return f[0]})(e);y[n]=x(s?{["@keyframes "+n]:l}:l,a?"":"."+n)}let i=a&&y.g?y.g:null;return a&&(y.g=y[n]),((l,d,u,m)=>{m?d.data=d.data.replace(m,l):d.data.indexOf(l)===-1&&(d.data=u?l+d.data:d.data+l)})(y[n],t,o,i),n},le=(e,t,a)=>e.reduce((o,s,r)=>{let n=t[r];if(n&&n.call){let i=n(a),l=i&&i.props&&i.props.className||/^go/.test(i)&&i;n=l?"."+l:i&&typeof i=="object"?i.props?"":x(i,""):i===!1?"":i}return o+s+(n??"")},"");function A(e){let t=this||{},a=e.call?e(t.p):e;return ne(a.unshift?a.raw?le(a,[].slice.call(arguments,1),t.p):a.reduce((o,s)=>Object.assign(o,s&&s.call?s(t.p):s),{}):a,se(t.target),t.g,t.o,t.k)}let N,O,I;A.bind({g:1});let b=A.bind({k:1});function de(e,t,a,o){x.p=t,N=e,O=a,I=o}function v(e,t){let a=this||{};return function(){let o=arguments;function s(r,n){let i=Object.assign({},r),l=i.className||s.className;a.p=Object.assign({theme:O&&O()},i),a.o=/ *go\d+/.test(l),i.className=A.apply(a,o)+(l?" "+l:"");let d=e;return e[0]&&(d=i.as||e,delete i.as),I&&d[0]&&I(i),N(d,i)}return s}}var ce=e=>typeof e=="function",k=(e,t)=>ce(e)?e(t):e,ue=(()=>{let e=0;return()=>(++e).toString()})(),z=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),pe=20,M=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,pe)};case 1:return{...e,toasts:e.toasts.map(r=>r.id===t.toast.id?{...r,...t.toast}:r)};case 2:let{toast:a}=t;return M(e,{type:e.toasts.find(r=>r.id===a.id)?1:0,toast:a});case 3:let{toastId:o}=t;return{...e,toasts:e.toasts.map(r=>r.id===o||o===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return t.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(r=>r.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let s=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+s}))}}},S=[],$={toasts:[],pausedAt:void 0},w=e=>{$=M($,e),S.forEach(t=>{t($)})},me={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},fe=(e={})=>{let[t,a]=c.useState($);c.useEffect(()=>(S.push(a),()=>{let s=S.indexOf(a);s>-1&&S.splice(s,1)}),[t]);let o=t.toasts.map(s=>{var r,n,i;return{...e,...e[s.type],...s,removeDelay:s.removeDelay||((r=e[s.type])==null?void 0:r.removeDelay)||(e==null?void 0:e.removeDelay),duration:s.duration||((n=e[s.type])==null?void 0:n.duration)||(e==null?void 0:e.duration)||me[s.type],style:{...e.style,...(i=e[s.type])==null?void 0:i.style,...s.style}}});return{...t,toasts:o}},he=(e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(a==null?void 0:a.id)||ue()}),j=e=>(t,a)=>{let o=he(t,e,a);return w({type:2,toast:o}),o.id},h=(e,t)=>j("blank")(e,t);h.error=j("error");h.success=j("success");h.loading=j("loading");h.custom=j("custom");h.dismiss=e=>{w({type:3,toastId:e})};h.remove=e=>w({type:4,toastId:e});h.promise=(e,t,a)=>{let o=h.loading(t.loading,{...a,...a==null?void 0:a.loading});return typeof e=="function"&&(e=e()),e.then(s=>{let r=t.success?k(t.success,s):void 0;return r?h.success(r,{id:o,...a,...a==null?void 0:a.success}):h.dismiss(o),s}).catch(s=>{let r=t.error?k(t.error,s):void 0;r?h.error(r,{id:o,...a,...a==null?void 0:a.error}):h.dismiss(o)}),e};var ge=(e,t)=>{w({type:1,toast:{id:e,height:t}})},ye=()=>{w({type:5,time:Date.now()})},E=new Map,be=1e3,xe=(e,t=be)=>{if(E.has(e))return;let a=setTimeout(()=>{E.delete(e),w({type:4,toastId:e})},t);E.set(e,a)},ve=e=>{let{toasts:t,pausedAt:a}=fe(e);c.useEffect(()=>{if(a)return;let r=Date.now(),n=t.map(i=>{if(i.duration===1/0)return;let l=(i.duration||0)+i.pauseDuration-(r-i.createdAt);if(l<0){i.visible&&h.dismiss(i.id);return}return setTimeout(()=>h.dismiss(i.id),l)});return()=>{n.forEach(i=>i&&clearTimeout(i))}},[t,a]);let o=c.useCallback(()=>{a&&w({type:6,time:Date.now()})},[a]),s=c.useCallback((r,n)=>{let{reverseOrder:i=!1,gutter:l=8,defaultPosition:d}=n||{},u=t.filter(g=>(g.position||d)===(r.position||d)&&g.height),m=u.findIndex(g=>g.id===r.id),f=u.filter((g,C)=>C<m&&g.visible).length;return u.filter(g=>g.visible).slice(...i?[f+1]:[0,f]).reduce((g,C)=>g+(C.height||0)+l,0)},[t]);return c.useEffect(()=>{t.forEach(r=>{if(r.dismissed)xe(r.id,r.removeDelay);else{let n=E.get(r.id);n&&(clearTimeout(n),E.delete(r.id))}})},[t]),{toasts:t,handlers:{updateHeight:ge,startPause:ye,endPause:o,calculateOffset:s}}},we=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ee=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,je=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,De=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${we} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${je} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Se=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,$e=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Se} 1s linear infinite;
`,ke=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Ae=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ce=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Ae} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Oe=v("div")`
  position: absolute;
`,Ie=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Pe=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Fe=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Pe} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ne=({toast:e})=>{let{icon:t,type:a,iconTheme:o}=e;return t!==void 0?typeof t=="string"?c.createElement(Fe,null,t):t:a==="blank"?null:c.createElement(Ie,null,c.createElement($e,{...o}),a!=="loading"&&c.createElement(Oe,null,a==="error"?c.createElement(De,{...o}):c.createElement(Ce,{...o})))},ze=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Me=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Le="0%{opacity:0;} 100%{opacity:1;}",Re="0%{opacity:1;} 100%{opacity:0;}",Te=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,_e=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,He=(e,t)=>{let a=e.includes("top")?1:-1,[o,s]=z()?[Le,Re]:[ze(a),Me(a)];return{animation:t?`${b(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},qe=c.memo(({toast:e,position:t,style:a,children:o})=>{let s=e.height?He(e.position||t||"top-center",e.visible):{opacity:0},r=c.createElement(Ne,{toast:e}),n=c.createElement(_e,{...e.ariaProps},k(e.message,e));return c.createElement(Te,{className:e.className,style:{...s,...a,...e.style}},typeof o=="function"?o({icon:r,message:n}):c.createElement(c.Fragment,null,r,n))});de(c.createElement);var Ue=({id:e,className:t,style:a,onHeightUpdate:o,children:s})=>{let r=c.useCallback(n=>{if(n){let i=()=>{let l=n.getBoundingClientRect().height;o(e,l)};i(),new MutationObserver(i).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return c.createElement("div",{ref:r,className:t,style:a},s)},Be=(e,t)=>{let a=e.includes("top"),o=a?{top:0}:{bottom:0},s=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:z()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...o,...s}},We=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,D=16,Ye=({reverseOrder:e,position:t="top-center",toastOptions:a,gutter:o,children:s,containerStyle:r,containerClassName:n})=>{let{toasts:i,handlers:l}=ve(a);return c.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:D,left:D,right:D,bottom:D,pointerEvents:"none",...r},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},i.map(d=>{let u=d.position||t,m=l.calculateOffset(d,{reverseOrder:e,gutter:o,defaultPosition:t}),f=Be(u,m);return c.createElement(Ue,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?We:"",style:f},d.type==="custom"?k(d.message,d):s?s(d):c.createElement(qe,{toast:d,position:u}))}))};const Ze=W({reducer:{mediaData:Y,mediaUiState:Z}}),Ge={position:"top-center"},Je={radius:"large",appearance:"light"},Ke=({children:e})=>{const t=G(),a=J(K),o=()=>{document.querySelectorAll(".hide-overflow-on-dnd").forEach(d=>d.classList.remove("dnd-overflow-hidden"))},s=()=>{document.querySelectorAll(".hide-overflow-on-dnd").forEach(d=>d.classList.add("dnd-overflow-hidden"))},r=d=>{var f;o();const u=d.active.id.toString(),m=(f=d.over)==null?void 0:f.id.toString();!u||!m||!a||m===a.id||(t(X({itemIds:[u],srcFolderId:a.id,dstFolderId:m})),t(ee({itemId:u})))},n=()=>{s()},i=()=>{o()},l=()=>{o()};return p.jsx(Q,{collisionDetection:V,onDragEnd:r,onDragStart:n,onDragAbort:i,onDragCancel:l,children:e})},at=()=>[{rel:"icon",href:"/icon.png"},{rel:"preconnect",href:"https://fonts.googleapis.com"},{rel:"preconnect",href:"https://fonts.gstatic.com",crossOrigin:"anonymous"},{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"}],rt=()=>[{title:"Media gallery"},{name:"description",content:"Simple media gallery that allows media files management"}],st=({children:e})=>p.jsxs("html",{lang:"en",children:[p.jsxs("head",{children:[p.jsx("meta",{charSet:"utf-8"}),p.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),p.jsx(T,{}),p.jsx(_,{})]}),p.jsxs("body",{children:[e,p.jsx(H,{}),p.jsx(q,{})]})]}),Qe=()=>p.jsxs(te,{...Je,children:[p.jsx(Ye,{...Ge}),p.jsx(ae,{store:Ze,children:p.jsx(Ke,{children:p.jsx(U,{})})})]}),ot=L(Qe),it=R(({error:e})=>{let t="Oops!",a="An unexpected error occurred.",o;return B(e)&&(t=e.status===404?"404":"Error",a=e.status===404?"The requested page could not be found.":e.statusText||a),p.jsxs("main",{className:"pt-16 p-4 container mx-auto",children:[p.jsx("h1",{children:t}),p.jsx("p",{children:a}),o]})});export{it as ErrorBoundary,st as Layout,ot as default,at as links,rt as meta};
