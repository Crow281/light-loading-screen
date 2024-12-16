(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();function u(t){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(t)}function g(t,e){if(u(t)!="object"||!t)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var o=r.call(t,e||"default");if(u(o)!="object")return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function p(t){var e=g(t,"string");return u(e)=="symbol"?e:e+""}function m(t,e,r){return(e=p(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}class y{constructor(e){this._element=e;const r=e.style;r.display="flex",r.position="fixed",r.inset="0px",r.justifyContent="center",r.alignItems="center",r.background="white"}get element(){return this._element}get zIndex(){return this._element.style.zIndex}set zIndex(e){this._element.style.zIndex=e}get background(){return this._element.style.background}set background(e){this._element.style.background=e}}const a="2rem";function h(){const t=document.createElement("button");t.hidden=!0;const e=t.style;return e.margin="1rem",e.padding="0.2rem",t}function f(){const t=h(),e=document.createElement("div");e.innerText="X";const r=e.style;return r.lineHeight=a,r.width=a,r.height=a,r.fontSize=a,t.appendChild(e),t}function b(){const t=document.createElementNS("http://www.w3.org/2000/svg","svg");t.setAttribute("width","24"),t.setAttribute("height","24");const e=t.viewBox.baseVal;e.x=-4,e.y=-4,e.width=24,e.height=24;const r=document.createElementNS("http://www.w3.org/2000/svg","path");r.setAttribute("d","M 13.656854249,13.656854249 A 8,8 0 1 1 16,8"),r.setAttribute("fill","none"),r.setAttribute("stroke","black"),r.setAttribute("stroke-width","2"),t.appendChild(r);const o=document.createElementNS("http://www.w3.org/2000/svg","path");return o.setAttribute("d","M 21,6 L 16,10 L 11,6"),t.appendChild(o),t}function _(){const t=h(),e=b(),r=e.style;return r.verticalAlign="middle",r.width=a,r.height=a,t.appendChild(e),t}class v{constructor(e){m(this,"_onTryAgain",null),m(this,"_onCancel",null),this._element=e;const r=e.style;r.padding="1rem";const o=document.createElement("p");this._messageParagraph=o,e.appendChild(o);const n=document.createElement("div"),s=n.style;s.display="flex",s.justifyContent="center",e.appendChild(n);const l=_();this._tryAgainButton=l,l.onclick=()=>{this._onTryAgain()},n.append(l);const c=f();this._cancelButton=c,c.onclick=()=>{this._onCancel()},n.append(c),this.messageColor="red"}get element(){return this._element}get message(){return this._messageParagraph.innerText}set message(e){this._messageParagraph.innerText=e}get messageColor(){return this._messageParagraph.style.color}set messageColor(e){this._messageParagraph.style.color=e}get onTryAgain(){return this._onTryAgain}set onTryAgain(e){this._onTryAgain=e,this._tryAgainButton.hidden=!e}get onCancel(){return this._onCancel}set onCancel(e){this._onCancel=e,this._cancelButton.hidden=!e}}class E{constructor(e){this._element=e;const r=e.style;r.borderRadius="50%",r.borderStyle="solid",r.borderColor="transparent",this.size="3rem",this.borderSize="0.75rem",this.color="rgb(64, 150, 255)",e.animate([{transform:"rotate(0deg)"},{transform:"rotate(360deg)"}],{duration:1e3,iterations:Number.POSITIVE_INFINITY})}get element(){return this._element}get size(){return this._element.style.width}set size(e){const r=this._element.style;r.width=e,r.height=e}get borderSize(){return this._element.style.borderWidth}set borderSize(e){this._element.style.borderWidth=e}get color(){return this._element.style.borderTopColor}set color(e){const r=this._element.style;r.borderTopColor=e,r.borderBottomColor=e}get animation(){return this._element.style.animation}set animation(e){this._element.style.animation=e}}let i=function(t){return t[t.None=0]="None",t[t.Spinner=1]="Spinner",t[t.ErrorDialog=2]="ErrorDialog",t}({});class w{constructor(){m(this,"_state",i.None);const e=document.createElement("div");this._background=new y(e);const r=document.createElement("div");this._spinner=new E(r);const o=document.createElement("div");this._errorDialog=new v(o),this.state=i.Spinner}get background(){return this._background}get spinner(){return this._spinner}get errorDialog(){return this._errorDialog}get visible(){return this._background.element.parentElement!==null}set visible(e){if(this.visible!==e)if(e)document.body.appendChild(this._background.element);else{const r=this._background.element;r.parentElement.removeChild(r)}}get state(){return this._state}set state(e){if(this._state===e)return;const r=this._background.element,o=this.getStateElements(this._state),n=this.getStateElements(e);for(const s of o)r.removeChild(s);for(const s of n)r.appendChild(s);this._state=e}getStateElements(e){switch(e){case i.Spinner:return[this._spinner.element];case i.ErrorDialog:return[this._errorDialog.element];default:return[]}}}function d(t,e,r){t.visible=!0,t.state=i.Spinner,r||(r=o=>o?String(o):"Error ⚠"),e.then(o=>{t.visible=!1},o=>{t.state=i.ErrorDialog,t.errorDialog.message=r(o)})}function C(t,e,r){t.errorDialog.onTryAgain=()=>{d(t,e(),r)},d(t,e(),r)}function A(t,e){const r=()=>{e.removeEventListener("load",o),e.removeEventListener("error",n)},o=s=>{r(),t.visible=!1},n=s=>{r(),t.state=i.ErrorDialog,t.errorDialog.message=s.message,t.errorDialog.onTryAgain=()=>{window.location.reload()}};t.visible=!0,t.state=i.Spinner,e.addEventListener("load",o),e.addEventListener("error",n)}export{w as L,m as _,C as a,A as b,u as c,d,p as t};
