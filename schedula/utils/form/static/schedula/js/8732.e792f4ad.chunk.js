"use strict";(self.webpackChunkschedula_form=self.webpackChunkschedula_form||[]).push([[8732],{32080:function(e,n,t){var r=t(72791),u=t(47563),c=t(99723),a=t(80184),o=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function i(e){var n=[],t=[];return Array.from(e.querySelectorAll(o)).forEach((function(e,r){var u=function(e){var n=parseInt(e.getAttribute("tabindex"),10);return Number.isNaN(n)?"true"===e.contentEditable||("AUDIO"===e.nodeName||"VIDEO"===e.nodeName||"DETAILS"===e.nodeName)&&null===e.getAttribute("tabindex")?0:e.tabIndex:n}(e);-1!==u&&function(e){return!(e.disabled||"INPUT"===e.tagName&&"hidden"===e.type||function(e){if("INPUT"!==e.tagName||"radio"!==e.type)return!1;if(!e.name)return!1;var n=function(n){return e.ownerDocument.querySelector('input[type="radio"]'.concat(n))},t=n('[name="'.concat(e.name,'"]:checked'));return t||(t=n('[name="'.concat(e.name,'"]'))),t!==e}(e))}(e)&&(0===u?n.push(e):t.push({documentOrder:r,tabIndex:u,node:e}))})),t.sort((function(e,n){return e.tabIndex===n.tabIndex?e.documentOrder-n.documentOrder:e.tabIndex-n.tabIndex})).map((function(e){return e.node})).concat(n)}function l(){return!0}n.Z=function(e){var n=e.children,t=e.disableAutoFocus,o=void 0!==t&&t,s=e.disableEnforceFocus,f=void 0!==s&&s,d=e.disableRestoreFocus,v=void 0!==d&&d,b=e.getTabbable,m=void 0===b?i:b,E=e.isEnabled,h=void 0===E?l:E,I=e.open,x=r.useRef(),p=r.useRef(null),g=r.useRef(null),y=r.useRef(null),N=r.useRef(null),k=r.useRef(!1),A=r.useRef(null),F=(0,u.Z)(n.ref,A),R=r.useRef(null);r.useEffect((function(){I&&A.current&&(k.current=!o)}),[o,I]),r.useEffect((function(){if(I&&A.current){var e=(0,c.Z)(A.current);return A.current.contains(e.activeElement)||(A.current.hasAttribute("tabIndex")||A.current.setAttribute("tabIndex",-1),k.current&&A.current.focus()),function(){v||(y.current&&y.current.focus&&(x.current=!0,y.current.focus()),y.current=null)}}}),[I]),r.useEffect((function(){if(I&&A.current){var e=(0,c.Z)(A.current),n=function(n){var t=A.current;if(null!==t)if(e.hasFocus()&&!f&&h()&&!x.current){if(!t.contains(e.activeElement)){if(n&&N.current!==n.target||e.activeElement!==N.current)N.current=null;else if(null!==N.current)return;if(!k.current)return;var r=[];if(e.activeElement!==p.current&&e.activeElement!==g.current||(r=m(A.current)),r.length>0){var u,c,a=Boolean((null==(u=R.current)?void 0:u.shiftKey)&&"Tab"===(null==(c=R.current)?void 0:c.key)),o=r[0],i=r[r.length-1];a?i.focus():o.focus()}else t.focus()}}else x.current=!1},t=function(n){R.current=n,!f&&h()&&"Tab"===n.key&&e.activeElement===A.current&&n.shiftKey&&(x.current=!0,g.current.focus())};e.addEventListener("focusin",n),e.addEventListener("keydown",t,!0);var r=setInterval((function(){"BODY"===e.activeElement.tagName&&n()}),50);return function(){clearInterval(r),e.removeEventListener("focusin",n),e.removeEventListener("keydown",t,!0)}}}),[o,f,v,h,I,m]);var T=function(e){null===y.current&&(y.current=e.relatedTarget),k.current=!0};return(0,a.jsxs)(r.Fragment,{children:[(0,a.jsx)("div",{tabIndex:I?0:-1,onFocus:T,ref:p,"data-testid":"sentinelStart"}),r.cloneElement(n,{ref:F,onFocus:function(e){null===y.current&&(y.current=e.relatedTarget),k.current=!0,N.current=e.target;var t=n.props.onFocus;t&&t(e)}}),(0,a.jsx)("div",{tabIndex:I?0:-1,onFocus:T,ref:g,"data-testid":"sentinelEnd"})]})}},8732:function(e,n,t){t.r(n),t.d(n,{default:function(){return r.Z}});var r=t(32080)}}]);
//# sourceMappingURL=8732.e792f4ad.chunk.js.map