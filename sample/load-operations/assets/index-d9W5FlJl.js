(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();function c(r){"@babel/helpers - typeof";return c=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c(r)}function p(r,e){if(c(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var n=t.call(r,e||"default");if(c(n)!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function f(r){var e=p(r,"string");return c(e)=="symbol"?e:e+""}function u(r,e,t){return(e=f(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}class b{constructor(e){this._element=e;const t=e.style;t.zIndex="1000",t.display="flex",t.position="fixed",t.inset="0",t.justifyContent="center",t.alignItems="center",t.background="white"}get element(){return this._element}get zIndex(){return this._element.style.zIndex}set zIndex(e){this._element.style.zIndex=e}get background(){return this._element.style.background}set background(e){this._element.style.background=e}}function y(){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),e=r.viewBox.baseVal;e.x=0,e.y=0,e.width=24,e.height=24;const t=document.createElementNS("http://www.w3.org/2000/svg","path");return t.setAttribute("d","M 4,4 L 20,20 M 20,4 L 4,20"),t.setAttribute("stroke","black"),t.setAttribute("stroke-width","2"),r.appendChild(t),r}function _(){const r=document.createElementNS("http://www.w3.org/2000/svg","svg"),e=r.viewBox.baseVal;e.x=-4,e.y=-4,e.width=24,e.height=24;const t=document.createElementNS("http://www.w3.org/2000/svg","path");t.setAttribute("d","M 13.656854249,13.656854249 A 8,8 0 1 1 16,8"),t.setAttribute("fill","none"),t.setAttribute("stroke","black"),t.setAttribute("stroke-width","2"),r.appendChild(t);const n=document.createElementNS("http://www.w3.org/2000/svg","path");return n.setAttribute("d","M 21,6 L 16,10 L 11,6"),r.appendChild(n),r}const m="2rem";function h(r){const e=document.createElement("button");e.hidden=!0;const t=e.style;t.margin="1rem",t.padding="0.2rem";const n=r.style;return n.verticalAlign="middle",n.width=m,n.height=m,e.appendChild(r),e}class v{constructor(e){u(this,"_onTryAgain",null),u(this,"_onCancel",null),this._element=e;const t=e.style;t.padding="1rem";const n=document.createElement("p");this._messageParagraph=n,e.appendChild(n);const s=document.createElement("div"),i=s.style;i.display="flex",i.justifyContent="center",e.appendChild(s);const o=h(_());this._tryAgainButton=o,o.onclick=()=>{this._onTryAgain()},s.append(o);const a=h(y());this._cancelButton=a,a.onclick=()=>{this._onCancel()},s.append(a),this.messageColor="red"}get element(){return this._element}get message(){return this._messageParagraph.innerText}set message(e){this._messageParagraph.innerText=e}get messageColor(){return this._messageParagraph.style.color}set messageColor(e){this._messageParagraph.style.color=e}get onTryAgain(){return this._onTryAgain}set onTryAgain(e){this._onTryAgain=e,this._tryAgainButton.hidden=!e}get onCancel(){return this._onCancel}set onCancel(e){this._onCancel=e,this._cancelButton.hidden=!e}}class w{constructor(e){this._element=e;const t=e.style;t.borderRadius="50%",t.borderStyle="solid",t.borderColor="transparent",this.size="3rem",this.borderSize="0.75rem",this.color="rgb(64, 150, 255)",e.animate([{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],{duration:1e3,iterations:Number.POSITIVE_INFINITY})}get element(){return this._element}get size(){return this._element.style.width}set size(e){const t=this._element.style;t.width=e,t.height=e}get borderSize(){return this._element.style.borderWidth}set borderSize(e){this._element.style.borderWidth=e}get color(){return this._element.style.borderTopColor}set color(e){const t=this._element.style;t.borderTopColor=e,t.borderBottomColor=e}get animation(){return this._element.style.animation}set animation(e){this._element.style.animation=e}}let l=function(r){return r[r.None=0]="None",r[r.Spinner=1]="Spinner",r[r.ErrorDialog=2]="ErrorDialog",r}({});class E{constructor(){u(this,"_onVisibleListeners",[]),u(this,"_state",l.None);const e=document.createElement("div");this._background=new b(e);const t=document.createElement("div");this._spinner=new w(t);const n=document.createElement("div");this._errorDialog=new v(n),this.state=l.Spinner}get root(){return this._background.element}get background(){return this._background}get spinner(){return this._spinner}get errorDialog(){return this._errorDialog}get visible(){return this._background.element.parentElement!==null}set visible(e){if(this.visible!==e){if(e)document.body.appendChild(this._background.element);else{const t=this._background.element;t.parentElement.removeChild(t)}for(const t of this._onVisibleListeners)t(e)}}addVisibleListener(e){this._onVisibleListeners.push(e)}removeVisibleListener(e){const t=this._onVisibleListeners,n=t.indexOf(e);return n===-1?!1:(t.splice(n,1),!0)}get state(){return this._state}set state(e){if(this._state===e)return;const t=this._background.element,n=this.getStateElements(this._state),s=this.getStateElements(e);for(const i of n)t.removeChild(i);for(const i of s)t.appendChild(i);this._state=e}getStateElements(e){switch(e){case l.Spinner:return[this._spinner.element];case l.ErrorDialog:return[this._errorDialog.element];default:return[]}}}function g(r,e,t){r.visible=!0,r.state=l.Spinner,t||(t=n=>n?String(n):"Error ⚠"),e.then(n=>{r.visible=!1},n=>{r.state=l.ErrorDialog,r.errorDialog.message=t(n)})}function C(r,e,t){r.errorDialog.onTryAgain=()=>{g(r,e(),t)},g(r,e(),t)}function A(r,e){const t=()=>{e.removeEventListener("load",n),e.removeEventListener("error",s)},n=i=>{t(),r.visible=!1},s=i=>{t(),r.state=l.ErrorDialog,r.errorDialog.message=i.message,r.errorDialog.onTryAgain=()=>{window.location.reload()}};r.visible=!0,r.state=l.Spinner,e.addEventListener("load",n),e.addEventListener("error",s)}function L(r){const e=r.root;let t=[];const n=s=>{const i=document.body;if(s){const o=i.children;for(let a=o.length-1;a>=0;--a){const d=o.item(a);d!==e&&(d.remove(),t.push(d))}}else{for(let o=t.length-1;o>=0;--o)i.appendChild(t[o]);t=[]}};return r.addVisibleListener(n),n(r.visible),n}export{E as L,u as _,C as a,A as b,c,g as d,L as s,f as t};