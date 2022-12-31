"use strict";(self.webpackChunkschedula_form=self.webpackChunkschedula_form||[]).push([[6139],{60220:function(r,a,t){t.d(a,{Z:function(){return b}});var e=t(29439),o=t(63366),n=t(87462),i=t(72791),l=t(28182),s=t(94419),c=t(66934),u=t(31402),v=t(74223),d=t(80184),f=(0,v.Z)((0,d.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),m=t(72800),p=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],g=(0,c.ZP)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(r,a){var t=r.ownerState;return[a.root,a[t.variant],t.colorDefault&&a.colorDefault]}})((function(r){var a=r.theme,t=r.ownerState;return(0,n.Z)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:a.typography.fontFamily,fontSize:a.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===t.variant&&{borderRadius:(a.vars||a).shape.borderRadius},"square"===t.variant&&{borderRadius:0},t.colorDefault&&(0,n.Z)({color:(a.vars||a).palette.background.default},a.vars?{backgroundColor:a.vars.palette.Avatar.defaultBg}:{backgroundColor:"light"===a.palette.mode?a.palette.grey[400]:a.palette.grey[600]}))})),h=(0,c.ZP)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(r,a){return a.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),Z=(0,c.ZP)(f,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(r,a){return a.fallback}})({width:"75%",height:"75%"});var b=i.forwardRef((function(r,a){var t=(0,u.Z)({props:r,name:"MuiAvatar"}),c=t.alt,v=t.children,f=t.className,b=t.component,x=void 0===b?"div":b,y=t.imgProps,A=t.sizes,S=t.src,k=t.srcSet,w=t.variant,M=void 0===w?"circular":w,P=(0,o.Z)(t,p),R=null,N=function(r){var a=r.crossOrigin,t=r.referrerPolicy,o=r.src,n=r.srcSet,l=i.useState(!1),s=(0,e.Z)(l,2),c=s[0],u=s[1];return i.useEffect((function(){if(o||n){u(!1);var r=!0,e=new Image;return e.onload=function(){r&&u("loaded")},e.onerror=function(){r&&u("error")},e.crossOrigin=a,e.referrerPolicy=t,e.src=o,n&&(e.srcset=n),function(){r=!1}}}),[a,t,o,n]),c}((0,n.Z)({},y,{src:S,srcSet:k})),j=S||k,z=j&&"error"!==N,C=(0,n.Z)({},t,{colorDefault:!z,component:x,variant:M}),D=function(r){var a=r.classes,t={root:["root",r.variant,r.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return(0,s.Z)(t,m.$,a)}(C);return R=z?(0,d.jsx)(h,(0,n.Z)({alt:c,src:S,srcSet:k,sizes:A,ownerState:C,className:D.img},y)):null!=v?v:j&&c?c[0]:(0,d.jsx)(Z,{className:D.fallback}),(0,d.jsx)(g,(0,n.Z)({as:x,ownerState:C,className:(0,l.Z)(D.root,f),ref:a},P,{children:R}))}))},72800:function(r,a,t){t.d(a,{$:function(){return n}});var e=t(75878),o=t(21217);function n(r){return(0,o.Z)("MuiAvatar",r)}var i=(0,e.Z)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);a.Z=i},46139:function(r,a,t){t.r(a),t.d(a,{avatarGroupClasses:function(){return g},default:function(){return A},getAvatarGroupUtilityClass:function(){return p}});var e=t(4942),o=t(63366),n=t(87462),i=t(72791),l=(t(57441),t(28182)),s=t(94419),c=t(66934),u=t(31402),v=t(72800),d=t(60220),f=t(75878),m=t(21217);function p(r){return(0,m.Z)("MuiAvatarGroup",r)}var g=(0,f.Z)("MuiAvatarGroup",["root","avatar"]),h=t(80184),Z=["children","className","component","componentsProps","max","slotProps","spacing","total","variant"],b={small:-16,medium:null},x=(0,c.ZP)("div",{name:"MuiAvatarGroup",slot:"Root",overridesResolver:function(r,a){return(0,n.Z)((0,e.Z)({},"& .".concat(g.avatar),a.avatar),a.root)}})((function(r){var a,t=r.theme;return a={},(0,e.Z)(a,"& .".concat(v.Z.root),{border:"2px solid ".concat((t.vars||t).palette.background.default),boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}}),(0,e.Z)(a,"display","flex"),(0,e.Z)(a,"flexDirection","row-reverse"),a})),y=(0,c.ZP)(d.Z,{name:"MuiAvatarGroup",slot:"Avatar",overridesResolver:function(r,a){return a.avatar}})((function(r){var a=r.theme;return{border:"2px solid ".concat((a.vars||a).palette.background.default),boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}}})),A=i.forwardRef((function(r,a){var t,e=(0,u.Z)({props:r,name:"MuiAvatarGroup"}),c=e.children,v=e.className,d=e.component,f=void 0===d?"div":d,m=e.componentsProps,g=void 0===m?{}:m,A=e.max,S=void 0===A?5:A,k=e.slotProps,w=void 0===k?{}:k,M=e.spacing,P=void 0===M?"medium":M,R=e.total,N=e.variant,j=void 0===N?"circular":N,z=(0,o.Z)(e,Z),C=S<2?2:S,D=(0,n.Z)({},e,{max:S,spacing:P,component:f,variant:j}),G=function(r){var a=r.classes;return(0,s.Z)({root:["root"],avatar:["avatar"]},p,a)}(D),L=i.Children.toArray(c).filter((function(r){return i.isValidElement(r)})),F=R||L.length;F===C&&(C+=1),C=Math.min(F+1,C);var I=Math.min(L.length,C-1),E=Math.max(F-C,F-I,0),q=P&&void 0!==b[P]?b[P]:-P,O=null!=(t=w.additionalAvatar)?t:g.additionalAvatar;return(0,h.jsxs)(x,(0,n.Z)({as:f,ownerState:D,className:(0,l.Z)(G.root,v),ref:a},z,{children:[E?(0,h.jsxs)(y,(0,n.Z)({ownerState:D,variant:j},O,{className:(0,l.Z)(G.avatar,null==O?void 0:O.className),style:(0,n.Z)({marginLeft:q},null==O?void 0:O.style),children:["+",E]})):null,L.slice(0,I).reverse().map((function(r,a){return i.cloneElement(r,{className:(0,l.Z)(r.props.className,G.avatar),style:(0,n.Z)({marginLeft:a===I-1?void 0:q},r.props.style),variant:r.props.variant||j})}))]}))}))}}]);
//# sourceMappingURL=6139.aea1be9e.chunk.js.map