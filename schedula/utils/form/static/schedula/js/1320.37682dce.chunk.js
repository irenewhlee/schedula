"use strict";(self.webpackChunkschedula_form=self.webpackChunkschedula_form||[]).push([[1320],{51320:function(e,t,n){n.r(t);var r=n(1413),o=n(29439),a=n(45987),c=n(72791),l=n(32014),i=n(66106),u=n(30914),p=n(66818),f=n(61431),s=n(49998),d=n(23414),m=n(10187),h=n(26181),v=n.n(h),y=n(17805),Z=n.n(y),x=n(74485),C=n.n(x),g=n(58121),k=n.n(g),j=n(25984),b=n(18050),w=n(37481),H=n(93629),V=n.n(H),I=n(80184),L=["children","render","copyItems"],z=function e(t){return"array"===v()(t,"props.schema.type")?t:Z()(t,"props.formContext.parent")?e(v()(t,"props.formContext.parent")):null};t.default=function(e){e.children;var t=e.render,n=e.copyItems,h=void 0===n?{}:n,y=(0,a.Z)(e,L),Z=(0,(0,w.useLocaleStore)().getLocale)("ArrayCopy"),x=z(v()(t,"formContext.parent",{})),g=(0,c.useState)([]),H=(0,o.Z)(g,2),D=H[0],M=H[1];if(V()(h)&&(h=h.reduce((function(e,t){return e[t]=t,e}),{})),Object.keys(h).length&&null!==x){var O,S=D,F=x.state.keyedFormData,B=x.props,E=B.name,_=void 0===E?"item":E,A=B.uiSchema,G=void 0===A?{}:A,K=t.formContext.arrayItemIndex,N=(0,b.LI)(G).itemLabel,P=F.map((function(e,t){var n=e.item;return{label:(N&&n[N]?"".concat(t,". ").concat(n[N]):null)||"".concat(_,"-").concat(t+1),value:t}})).filter((function(e){return e.value!==K}));if(P.length>=1)return O=P.length<=5?(0,I.jsx)(l.Z.Group,{options:P,defaultValue:D,onChange:function(e){M(e),S=e},children:(0,I.jsx)(i.Z,{children:P.map((function(e,t){var n=e.value,r=e.label;return(0,I.jsx)(u.Z,{span:24,children:(0,I.jsx)(l.Z,{value:n,children:r},t)},t)}))})}):(0,I.jsx)(p.Z,{mode:"multiple",allowClear:!0,style:{width:"100%"},placeholder:Z.placeholder,defaultValue:D,onChange:function(e){M(e),S=e},options:P}),(0,I.jsx)(f.Z,{title:Z.tooltip,children:(0,I.jsx)(d.Z,(0,r.Z)({onClick:function(e){e.stopPropagation(),s.Z.confirm({centered:!0,title:Z.titleCopyButton,icon:(0,I.jsx)(m.Z,{}),content:O,onOk:function(){if(S.length){var e=x.props.onChange,n=Object.entries(h).map((function(e){var n=(0,o.Z)(e,2),r=n[0];return[n[1],v()(t.formData,r)]})),a=F.map((function(e,t){var r=e.key,a=e.item;return K!==t&&S.includes(t)&&(a=k()(a),r=(0,j.x0)(),n.forEach((function(e){var t=(0,o.Z)(e,2),n=t[0],r=t[1];C()(a,n,r)}))),{key:r,item:a}}));x.setState((0,r.Z)((0,r.Z)({},x.state),{},{keyedFormData:a,updatedKeyedFormData:!0}),(function(){e(a.map((function(e){return e.item})))}))}}})}},y),"copy")},"copy")}return null}},23414:function(e,t,n){n.d(t,{Z:function(){return i}});var r=n(1413),o=n(72791),a={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z"}}]},name:"copy",theme:"outlined"},c=n(54291),l=function(e,t){return o.createElement(c.Z,(0,r.Z)((0,r.Z)({},e),{},{ref:t,icon:a}))};l.displayName="CopyOutlined";var i=o.forwardRef(l)}}]);
//# sourceMappingURL=1320.37682dce.chunk.js.map