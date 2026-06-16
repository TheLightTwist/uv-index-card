function e(e,t,i,o){var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;class r{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}}const s=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new r(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,h=c.trustedTypes,d=h?h.emptyScript:"",u=c.reactiveElementPolyfillSupport,v={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:m},_="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);void 0!==o&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);void 0!==o&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const n=this[e];this[t]=o,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const o=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{i?e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):o.forEach(i=>{const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=i.cssText,e.appendChild(o)})})(o,this.constructor.elementStyles),o}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var o;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:v).toAttribute(t,i.type);this._$El=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,n=o._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=o.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:v;this._$El=n,this[n]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;g[_]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:g}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const y=window,w=y.trustedTypes,$=w?w.createPolicy("lit-html",{createHTML:e=>e}):void 0,x="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,A="?"+b,k=`<${A}>`,E=document,C=()=>E.createComment(""),S=e=>null===e||"object"!=typeof e&&"function"!=typeof e,U=Array.isArray,V="[ \t\n\f\r]",z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,O=/>/g,N=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,P=/"/g,L=/^(?:script|style|textarea|title)$/i,R=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),T=Symbol.for("lit-noChange"),I=Symbol.for("lit-nothing"),H=new WeakMap,D=E.createTreeWalker(E,129,null,!1);function F(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==$?$.createHTML(t):t}const B=(e,t)=>{const i=e.length-1,o=[];let n,r=2===t?"<svg>":"",s=z;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,h=0;for(;h<i.length&&(s.lastIndex=h,l=s.exec(i),null!==l);)h=s.lastIndex,s===z?"!--"===l[1]?s=M:void 0!==l[1]?s=O:void 0!==l[2]?(L.test(l[2])&&(n=RegExp("</"+l[2],"g")),s=N):void 0!==l[3]&&(s=N):s===N?">"===l[0]?(s=null!=n?n:z,c=-1):void 0===l[1]?c=-2:(c=s.lastIndex-l[2].length,a=l[1],s=void 0===l[3]?N:'"'===l[3]?P:j):s===P||s===j?s=N:s===M||s===O?s=z:(s=N,n=void 0);const d=s===N&&e[t+1].startsWith("/>")?" ":"";r+=s===z?i+k:c>=0?(o.push(a),i.slice(0,c)+x+i.slice(c)+b+d):i+b+(-2===c?(o.push(void 0),t):d)}return[F(e,r+(e[i]||"<?>")+(2===t?"</svg>":"")),o]};class W{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let n=0,r=0;const s=e.length-1,a=this.parts,[l,c]=B(e,t);if(this.el=W.createElement(l,i),D.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(o=D.nextNode())&&a.length<s;){if(1===o.nodeType){if(o.hasAttributes()){const e=[];for(const t of o.getAttributeNames())if(t.endsWith(x)||t.startsWith(b)){const i=c[r++];if(e.push(t),void 0!==i){const e=o.getAttribute(i.toLowerCase()+x).split(b),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?X:"?"===t[1]?G:"@"===t[1]?Q:J})}else a.push({type:6,index:n})}for(const t of e)o.removeAttribute(t)}if(L.test(o.tagName)){const e=o.textContent.split(b),t=e.length-1;if(t>0){o.textContent=w?w.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],C()),D.nextNode(),a.push({type:2,index:++n});o.append(e[t],C())}}}else if(8===o.nodeType)if(o.data===A)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=o.data.indexOf(b,e+1));)a.push({type:7,index:n}),e+=b.length-1}n++}}static createElement(e,t){const i=E.createElement("template");return i.innerHTML=e,i}}function q(e,t,i=e,o){var n,r,s,a;if(t===T)return t;let l=void 0!==o?null===(n=i._$Co)||void 0===n?void 0:n[o]:i._$Cl;const c=S(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(r=null==l?void 0:l._$AO)||void 0===r||r.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,o)),void 0!==o?(null!==(s=(a=i)._$Co)&&void 0!==s?s:a._$Co=[])[o]=l:i._$Cl=l),void 0!==l&&(t=q(e,l._$AS(e,t.values),l,o)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:E).importNode(i,!0);D.currentNode=n;let r=D.nextNode(),s=0,a=0,l=o[0];for(;void 0!==l;){if(s===l.index){let t;2===l.type?t=new K(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new ee(r,this,e)),this._$AV.push(t),l=o[++a]}s!==(null==l?void 0:l.index)&&(r=D.nextNode(),s++)}return D.currentNode=E,n}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class K{constructor(e,t,i,o){var n;this.type=2,this._$AH=I,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=null===(n=null==o?void 0:o.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),S(e)?e===I||null==e||""===e?(this._$AH!==I&&this._$AR(),this._$AH=I):e!==this._$AH&&e!==T&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>U(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==I&&S(this._$AH)?this._$AA.nextSibling.data=e:this.$(E.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,n="number"==typeof o?this._$AC(e):(void 0===o.el&&(o.el=W.createElement(F(o.h,o.h[0]),this.options)),o);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.v(i);else{const e=new Z(n,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=H.get(e.strings);return void 0===t&&H.set(e.strings,t=new W(e)),t}T(e){U(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const n of e)o===t.length?t.push(i=new K(this.k(C()),this.k(C()),this,this.options)):i=t[o],i._$AI(n),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,o,n){this.type=1,this._$AH=I,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=I}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const n=this.strings;let r=!1;if(void 0===n)e=q(this,e,t,0),r=!S(e)||e!==this._$AH&&e!==T,r&&(this._$AH=e);else{const o=e;let s,a;for(e=n[0],s=0;s<n.length-1;s++)a=q(this,o[i+s],t,s),a===T&&(a=this._$AH[s]),r||(r=!S(a)||a!==this._$AH[s]),a===I?e=I:e!==I&&(e+=(null!=a?a:"")+n[s+1]),this._$AH[s]=a}r&&!o&&this.j(e)}j(e){e===I?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class X extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===I?void 0:e}}const Y=w?w.emptyScript:"";class G extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==I?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}}class Q extends J{constructor(e,t,i,o,n){super(e,t,i,o,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=q(this,e,t,0))&&void 0!==i?i:I)===T)return;const o=this._$AH,n=e===I&&o!==I||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,r=e!==I&&(o===I||n);n&&this.element.removeEventListener(this.name,this,o),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const te=y.litHtmlPolyfillSupport;null==te||te(W,K),(null!==(f=y.litHtmlVersions)&&void 0!==f?f:y.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,oe;class ne extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var o,n;const r=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:t;let s=r._$litPart$;if(void 0===s){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=s=new K(t.insertBefore(C(),e),e,void 0,null!=i?i:{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return T}}ne.finalized=!0,ne._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:ne});const re=globalThis.litElementPolyfillSupport;null==re||re({LitElement:ne}),(null!==(oe=globalThis.litElementVersions)&&void 0!==oe?oe:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:o}=t;return{kind:i,elements:o,finisher(t){customElements.define(e,t)}}})(e,t),ae=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ae(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce(e){return le({...e,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var he;null===(he=window.HTMLSlotElement)||void 0===he||he.prototype.assignedElements;var de="[1-9]\\d?",ue="\\d\\d",ve="[^\\s]+";function me(e,t){for(var i=[],o=0,n=e.length;o<n;o++)i.push(e[o].substr(0,t));return i}var pe=function(e){return function(t,i){var o=i[e].map(function(e){return e.toLowerCase()}),n=o.indexOf(t.toLowerCase());return n>-1?n:null}};function _e(e){for(var t=[],i=1;i<arguments.length;i++)t[i-1]=arguments[i];for(var o=0,n=t;o<n.length;o++){var r=n[o];for(var s in r)e[s]=r[s]}return e}var ge=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],fe=["January","February","March","April","May","June","July","August","September","October","November","December"],ye=me(fe,3),we={dayNamesShort:me(ge,3),dayNames:ge,monthNamesShort:ye,monthNames:fe,amPm:["am","pm"],DoFn:function(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10?1:0)*e%10]}},$e=(_e({},we),function(e){return+e-1}),xe=[null,de],be=[null,ve],Ae=["isPm",ve,function(e,t){var i=e.toLowerCase();return i===t.amPm[0]?0:i===t.amPm[1]?1:null}],ke=["timezoneOffset","[^\\s]*?[\\+\\-]\\d\\d:?\\d\\d|[^\\s]*?Z?",function(e){var t=(e+"").match(/([+-]|\d\d)/gi);if(t){var i=60*+t[1]+parseInt(t[2],10);return"+"===t[0]?i:-i}return 0}];pe("monthNamesShort"),pe("monthNames");var Ee,Ce;!function(){try{(new Date).toLocaleDateString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleString("i")}catch(e){return"RangeError"===e.name}}(),function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}}(),function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ee||(Ee={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Ce||(Ce={}));var Se=["closed","locked","off"],Ue=function(e,t,i,o){o=o||{},i=null==i?{}:i;var n=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return n.detail=i,e.dispatchEvent(n),n},Ve=function(e){Ue(window,"haptic",e)},ze=function(e,t,i,o){if(o||(o={action:"more-info"}),!o.confirmation||o.confirmation.exemptions&&o.confirmation.exemptions.some(function(e){return e.user===t.user.id})||(Ve("warning"),confirm(o.confirmation.text||"Are you sure you want to "+o.action+"?")))switch(o.action){case"more-info":(i.entity||i.camera_image)&&Ue(e,"hass-more-info",{entityId:i.entity?i.entity:i.camera_image});break;case"navigate":o.navigation_path&&function(e,t,i){void 0===i&&(i=!1),i?history.replaceState(null,"",t):history.pushState(null,"",t),Ue(window,"location-changed",{replace:i})}(0,o.navigation_path);break;case"url":o.url_path&&window.open(o.url_path);break;case"toggle":i.entity&&(function(e,t){(function(e,t,i){void 0===i&&(i=!0);var o,n=function(e){return e.substr(0,e.indexOf("."))}(t),r="group"===n?"homeassistant":n;switch(n){case"lock":o=i?"unlock":"lock";break;case"cover":o=i?"open_cover":"close_cover";break;default:o=i?"turn_on":"turn_off"}e.callService(r,o,{entity_id:t})})(e,t,Se.includes(e.states[t].state))}(t,i.entity),Ve("success"));break;case"call-service":if(!o.service)return void Ve("failure");var n=o.service.split(".",2);t.callService(n[0],n[1],o.service_data),Ve("success");break;case"fire-dom-event":Ue(e,"ll-custom",o)}};function Me(e){return void 0!==e&&"none"!==e.action}class Oe{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const Ne="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.maxTouchPoints>0;class je extends HTMLElement{constructor(){super(),this.holdTime=500,this.held=!1,this.ripple=document.createElement("div")}connectedCallback(){Object.assign(this.style,{position:"absolute",width:Ne?"100px":"50px",height:Ne?"100px":"50px",transform:"translate(-50%, -50%)",pointerEvents:"none",zIndex:"999"}),this.appendChild(this.ripple),Object.assign(this.ripple.style,{width:"100%",height:"100%",borderRadius:"50%",background:"rgba(255, 255, 255, 0.2)",opacity:"0",transform:"scale(0.2)",transition:"transform 180ms ease-out, opacity 180ms ease-out"}),["touchcancel","mouseout","mouseup","touchmove","mousewheel","wheel","scroll"].forEach(e=>{document.addEventListener(e,()=>{clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0},{passive:!0})})}bind(e,t){if(e.actionHandler)return;e.actionHandler=!0,e.addEventListener("contextmenu",e=>{const t=e||window.event;return t.preventDefault&&t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.cancelBubble=!0,t.returnValue=!1,!1});const i=e=>{let t,i;this.held=!1,e.touches?(t=e.touches[0].pageX,i=e.touches[0].pageY):(t=e.pageX,i=e.pageY),this.timer=window.setTimeout(()=>{this.startAnimation(t,i),this.held=!0},this.holdTime)},o=i=>{i.preventDefault(),["touchend","touchcancel"].includes(i.type)&&void 0===this.timer||(clearTimeout(this.timer),this.stopAnimation(),this.timer=void 0,this.held?Ue(e,"action",{action:"hold"}):t.hasDoubleClick?"click"===i.type&&i.detail<2||!this.dblClickTimeout?this.dblClickTimeout=window.setTimeout(()=>{this.dblClickTimeout=void 0,Ue(e,"action",{action:"tap"})},250):(clearTimeout(this.dblClickTimeout),this.dblClickTimeout=void 0,Ue(e,"action",{action:"double_tap"})):Ue(e,"action",{action:"tap"}))};e.addEventListener("touchstart",i,{passive:!0}),e.addEventListener("touchend",o),e.addEventListener("touchcancel",o),e.addEventListener("mousedown",i,{passive:!0}),e.addEventListener("click",o),e.addEventListener("keyup",e=>{13===e.keyCode&&o(e)})}startAnimation(e,t){Object.assign(this.style,{left:`${e}px`,top:`${t}px`,display:null}),this.ripple.style.opacity="1",this.ripple.style.transform="scale(1)"}stopAnimation(){this.ripple.style.opacity="0",this.ripple.style.transform="scale(0.2)",this.style.display="none"}}customElements.define("action-handler-uv-index",je);const Pe=(e,t)=>{const i=(()=>{const e=document.body;if(e.querySelector("action-handler-uv-index"))return e.querySelector("action-handler-uv-index");const t=document.createElement("action-handler-uv-index");return e.appendChild(t),t})();i&&i.bind(e,t)},Le=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends Oe{update(e,[t]){return Pe(e.element,t),T}render(e){}});var Re={version:"Versió",invalid_configuration:"Configuració invàlida",show_warning:"Mostra avis",show_error:"Mostra error",uv_index:"Índex UV",uv_risk:"Risc UV"},Te={low:"Baix",moderate:"Moderat",high:"Alt",very_high:"Molt Alt",extreme:"Extrem"},Ie={common:Re,uv_levels:Te},He={version:"Verze",invalid_configuration:"Neplatná konfigurace",show_warning:"Zobrazit varování",show_error:"Zobrazit chybu",uv_index:"UV Index",uv_risk:"UV Riziko"},De={low:"Nízké",moderate:"Střední",high:"Vysoké",very_high:"Velmi vysoké",extreme:"Extrémní"},Fe={common:He,uv_levels:De},Be={version:"Version",invalid_configuration:"Ugyldig konfiguration",show_warning:"Vis advarsel",show_error:"Vis fejl",uv_index:"UV-indeks",uv_risk:"UV-risiko"},We={low:"Lav",moderate:"Moderat",high:"Høj",very_high:"Meget høj",extreme:"Ekstrem"},qe={common:Be,uv_levels:We},Ze={version:"Version",invalid_configuration:"Ungültige Konfiguration",show_warning:"Warnung anzeigen",show_error:"Fehler anzeigen",uv_index:"UV-Index",uv_risk:"Risikostufe"},Ke={low:"Niedrig",moderate:"Mäßig",high:"Hoch",very_high:"Sehr hoch",extreme:"Extrem"},Je={common:Ze,uv_levels:Ke},Xe={version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error",uv_index:"UV Index",uv_risk:"UV Risk"},Ye={low:"Low",moderate:"Moderate",high:"High",very_high:"Very High",extreme:"Extreme"},Ge={common:Xe,uv_levels:Ye},Qe={version:"Versión",invalid_configuration:"Configuración no válida",show_warning:"Mostrar advertencia",show_error:"Mostrar error",uv_index:"Índice UV",uv_risk:"Riesgo UV"},et={low:"Bajo",moderate:"Moderado",high:"Alto",very_high:"Muy Alto",extreme:"Extremo"},tt={common:Qe,uv_levels:et},it={version:"Versio",invalid_configuration:"Väärä konfikuraatio",show_warning:"Näytä varoitus",show_error:"Näytä virhe",uv_index:"UV-indeksi",uv_risk:"UV-riski"},ot={low:"Matala",moderate:"Kohtalainen",high:"Korkea",very_high:"Erittäin korkea",extreme:"Äärimmäinen"},nt={common:it,uv_levels:ot},rt={version:"Version",invalid_configuration:"Configuration invalide",show_warning:"Afficher les Warnings",show_error:"Afficher les Erreurs",uv_index:"Indice UV",uv_risk:"Risque UV"},st={low:"Faible",moderate:"Modéré",high:"Élevé",very_high:"Très élevé",extreme:"Extrême"},at={common:rt,uv_levels:st},lt={version:"Version",invalid_configuration:"הגדרות לא נכונות",show_warning:"הצגת שגיאה",show_error:"הצגת שגיאה",uv_index:"רמת קרינת UV",uv_risk:"סיכון מקרינת UV"},ct={low:"נמוך",moderate:"בינוני",high:"גבוה",very_high:"גבוה מאוד",extreme:"קיצוני"},ht={common:lt,uv_levels:ct},dt={version:"Verzió",invalid_configuration:"Érvénytelen konfiguráció",show_warning:"Figyelmeztetések megjelenítése",show_error:"Hibák megjelenítése",uv_index:"UV Index",uv_risk:"UV kockázat"},ut={low:"Alacsony",moderate:"Mérsékelt",high:"Magas",very_high:"Nagyon magas",extreme:"Extrém"},vt={common:dt,uv_levels:ut},mt={version:"Versione",invalid_configuration:"Configurazione non valida",show_warning:"Mostra Avviso",show_error:"Mostra Errore",uv_index:"Indice UV",uv_risk:"Rischio UV"},pt={low:"Basso",moderate:"Moderato",high:"Alto",very_high:"Altissimo",extreme:"Estremo"},_t={common:mt,uv_levels:pt},gt={version:"Versjon",invalid_configuration:"Ugyldig konfigurasjon",show_warning:"Vis advarsel",show_error:"Vis feil",uv_index:"UV-indeks",uv_risk:"UV-risiko"},ft={low:"Lav",moderate:"Moderat",high:"Høy",very_high:"Veldig høy",extreme:"Ekstremt høy"},yt={common:gt,uv_levels:ft},wt={version:"Versie",invalid_configuration:"Ongeldige configuratie",show_warning:"Toon waarschuwing",show_error:"Toon foutmelding",uv_index:"UV index",uv_risk:"UV risico"},$t={low:"Laag",moderate:"Matig",high:"Hoog",very_high:"Zeer hoog",extreme:"Extreem"},xt={common:wt,uv_levels:$t},bt={version:"Wersja",invalid_configuration:"Nieprawidłowa konfiguracja",show_warning:"Pokaż ostrzeżenie",show_error:"Pokaż błąd",uv_index:"Index UV",uv_risk:"Ryzyko UV"},At={low:"Małe",moderate:"Średnie",high:"Wysokie",very_high:"Bardzo wysokie",extreme:"Ekstremalne"},kt={common:bt,uv_levels:At},Et={version:"Versão",invalid_configuration:"Configuração Invalida",show_warning:"Mostrar aviso",show_error:"Mostrar Erro",uv_index:"Índice UV",uv_risk:"Risco UV"},Ct={low:"Baixo",moderate:"Moderado",high:"Alto",very_high:"Muito Alto",extreme:"Extremo"},St={common:Et,uv_levels:Ct},Ut={version:"Versão",invalid_configuration:"Configuração inválida",show_warning:"Mostrar aviso",show_error:"Mostrar Erro",uv_index:"Índice UV",uv_risk:"Risco UV"},Vt={low:"Baixo",moderate:"Moderado",high:"Alto",very_high:"Muito Alto",extreme:"Extremo"},zt={common:Ut,uv_levels:Vt},Mt={version:"Verzia",invalid_configuration:"Neplatná konfigurácia",show_warning:"Zobraziť varovanie",show_error:"Zobraziť chybu",uv_index:"UV Index",uv_risk:"UV Riziko"},Ot={low:"Nízke",moderate:"Stredne",high:"Vysoké",very_high:"Veľmi Vysoké",extreme:"Extrémne"},Nt={common:Mt,uv_levels:Ot},jt={version:"Različica",invalid_configuration:"Neveljavna konfiguracija",show_warning:"Prikaži opozorilo",show_error:"Prikaži napako",uv_index:"UV Indeks",uv_risk:"UV Tveganje"},Pt={low:"Nizko",moderate:"Zmerno",high:"Visoko",very_high:"Zelo visoko",extreme:"Ekstremno"},Lt={common:jt,uv_levels:Pt},Rt={version:"Version",invalid_configuration:"Ogiltig konfiguration",show_warning:"Visa Varning",show_error:"Visa Fel",uv_index:"UV Index",uv_risk:"UV Risk"},Tt={low:"Lågt",moderate:"Måttligt",high:"Högt",very_high:"Väldigt Högt",extreme:"Extremt"},It={common:Rt,uv_levels:Tt};const Ht={ca:Object.freeze({__proto__:null,common:Re,uv_levels:Te,default:Ie}),cs:Object.freeze({__proto__:null,common:He,uv_levels:De,default:Fe}),da:Object.freeze({__proto__:null,common:Be,uv_levels:We,default:qe}),de:Object.freeze({__proto__:null,common:Ze,uv_levels:Ke,default:Je}),en:Object.freeze({__proto__:null,common:Xe,uv_levels:Ye,default:Ge}),es:Object.freeze({__proto__:null,common:Qe,uv_levels:et,default:tt}),fi:Object.freeze({__proto__:null,common:it,uv_levels:ot,default:nt}),fr:Object.freeze({__proto__:null,common:rt,uv_levels:st,default:at}),he:Object.freeze({__proto__:null,common:lt,uv_levels:ct,default:ht}),hu:Object.freeze({__proto__:null,common:dt,uv_levels:ut,default:vt}),it:Object.freeze({__proto__:null,common:mt,uv_levels:pt,default:_t}),nb:Object.freeze({__proto__:null,common:gt,uv_levels:ft,default:yt}),nl:Object.freeze({__proto__:null,common:wt,uv_levels:$t,default:xt}),pl:Object.freeze({__proto__:null,common:bt,uv_levels:At,default:kt}),pt:Object.freeze({__proto__:null,common:Et,uv_levels:Ct,default:St}),"pt-BR":Object.freeze({__proto__:null,common:Ut,uv_levels:Vt,default:zt}),sk:Object.freeze({__proto__:null,common:Mt,uv_levels:Ot,default:Nt}),sl:Object.freeze({__proto__:null,common:jt,uv_levels:Pt,default:Lt}),sv:Object.freeze({__proto__:null,common:Rt,uv_levels:Tt,default:It})},Dt=Object.keys(Ht).sort((e,t)=>e.localeCompare(t));function Ft(e,t="",i="",o=""){let n;""===o&&(o=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").trim());const r=function(e=""){const t=e.replace(/['"]+/g,"").trim();if(!t)return"en";const i=t.replace(/_/g,"-"),o=t.replace(/-/g,"_"),n=i.split("-"),r=2===n.length?`${n[0].toLowerCase()}-${n[1].toUpperCase()}`:i,s=n[0].toLowerCase();return[t,i,o,r,i.toLowerCase(),o.toLowerCase(),s].find(e=>e in Ht)||"en"}(o);try{n=e.split(".").reduce((e,t)=>e[t],Ht[r])}catch(t){n=e.split(".").reduce((e,t)=>e[t],Ht.en)}return void 0===n&&(n=e.split(".").reduce((e,t)=>e[t],Ht.en)),""!==t&&""!==i&&(n=n.replace(t,i)),n}let Bt=class extends ne{constructor(){super(...arguments),this._computeLabel=e=>{switch(e.name){case"entity":return"Entity";case"name":return"Name";case"layout":return"Layout";case"decimals":return"Decimals";case"language":return"Language";case"show_name":return"Show name";case"show_index":return"Show index";case"show_risk":return"Show risk";default:return e.name}}}setConfig(e){this._config=e}render(){return this.hass&&this._config?R`
      <ha-form
        .hass=${this.hass}
        .data=${this._formData}
        .schema=${this._schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `:R``}get _layout(){var e;return(null===(e=this._config)||void 0===e?void 0:e.layout)||"full"}get _schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"full",label:"Full"},{value:"compact",label:"Compact"},{value:"icon",label:"Icon"}]}}},{name:"decimals",selector:{number:{min:0,max:3,step:1,mode:"box"}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"",label:"Automatic"},...Dt.map(e=>({value:e,label:e}))]}}},{name:"show_name",selector:{boolean:{}}},{name:"show_index",selector:{boolean:{}}},{name:"show_risk",selector:{boolean:{}}}]}get _formData(){var e,t,i,o,n,r,s,a,l,c,h;return{entity:(null===(e=this._config)||void 0===e?void 0:e.entity)||"",name:(null===(t=this._config)||void 0===t?void 0:t.name)||"",layout:this._layout,decimals:null!==(o=null===(i=this._config)||void 0===i?void 0:i.decimals)&&void 0!==o?o:1,language:(null===(n=this._config)||void 0===n?void 0:n.language)||"",show_name:null!==(s=null===(r=this._config)||void 0===r?void 0:r.show_name)&&void 0!==s?s:"icon"!==this._layout,show_index:null!==(l=null===(a=this._config)||void 0===a?void 0:a.show_index)&&void 0!==l?l:"icon"!==this._layout,show_risk:null!==(h=null===(c=this._config)||void 0===c?void 0:c.show_risk)&&void 0!==h?h:"icon"!==this._layout}}_valueChanged(e){var t;if(!this._config)return;const i=e.detail.value,o=Object.assign(Object.assign({},this._config),i);o.entity||delete o.entity,o.name||delete o.name,o.language||delete o.language;const n=Number(null!==(t=o.decimals)&&void 0!==t?t:1);o.decimals=Number.isFinite(n)?Math.max(0,Math.min(3,Math.round(n))):1,this._config=o,Ue(this,"config-changed",{config:o})}};Bt.styles=s`
    :host {
      display: block;
    }
  `,e([le({attribute:!1})],Bt.prototype,"hass",void 0),e([ce()],Bt.prototype,"_config",void 0),Bt=e([se("uv-index-card-editor")],Bt),console.info(`%c  UV-INDEX-CARD \n%c  ${Ft("common.version")} 1.2.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"uv-index-card",name:"UV Index Card",preview:!0,description:"A Lovelace card that shows the UV index and risk level for Home Assistant"});let Wt=class extends ne{static async getConfigElement(){return document.createElement("uv-index-card-editor")}static getStubConfig(){return{name:"UV Index",layout:"full",show_name:!0,show_index:!0,show_risk:!0,decimals:1}}setConfig(e){if(!e)throw new Error(Ft("common.invalid_configuration"));e.test_gui&&function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config=Object.assign({name:"UV Index",layout:"full",decimals:1,show_warning:!1,show_error:!1},e)}shouldUpdate(e){return!!this.config&&function(e,t,i){if(t.has("config")||i)return!0;if(e.config.entity){var o=t.get("hass");return!o||o.states[e.config.entity]!==e.hass.states[e.config.entity]}return!1}(this,e,!1)}render(){if(this.config.show_warning)return this._showWarning(Ft("common.show_warning","","",this.config.language));if(this.config.show_error)return this._showError(Ft("common.show_error","","",this.config.language));const e=this.config.entity,t=e?this.hass.states[e]:void 0;if(!e||!t)return this._showWarning(Ft("common.invalid_configuration","","",this.config.language));const i=this._parseUvIndex(t.state),o=this._layout;return"compact"===o?this._renderCard(this._renderCompact(i),"compact"):"icon"===o?this._renderCard(this._renderIcon(i),"icon"):this._renderCard(this._renderFull(i),"full")}get _layout(){var e;const t=null!==(e=this.config.layout)&&void 0!==e?e:"full";return"compact"===t||"icon"===t||"full"===t?t:"full"}get _decimals(){var e;const t=Number(null!==(e=this.config.decimals)&&void 0!==e?e:1);return Number.isFinite(t)?Math.max(0,Math.min(3,Math.round(t))):1}_parseUvIndex(e){if("unknown"===e||"unavailable"===e||""===e)return;const t=Number.parseFloat(e);return Number.isFinite(t)?Math.max(0,t):void 0}_renderCard(e,t){const i="full"===t&&!1!==this.config.show_name;return R`
      <ha-card
        class=${`layout-${t}`}
        .header=${i?this.config.name:void 0}
        @action=${this._handleAction}
        .actionHandler=${Le({hasHold:Me(this.config.hold_action),hasDoubleClick:Me(this.config.double_tap_action)})}
        tabindex="0"
        .label=${`UV Index: ${this.config.entity||"No Entity Defined"}`}
      >
        ${e}
      </ha-card>
    `}_renderFull(e){const t=void 0===e?void 0:this._riskForIndex(e),i=this._showIndexForLayout("full"),o=this._showRiskForLayout("full");return R`
      <div class="full-card">
        <div class="full-pyramid">${this._renderPyramid(e)}</div>
        <div class="full-content">
          ${i?R`
                <div class="full-row">
                  <span class="label">${Ft("common.uv_index","","",this.config.language)}</span><br />
                  <span class="value">${this._formatUvIndex(e)}</span>
                </div>
              `:I}
          ${o?R`
                <div class="full-row">
                  <span class="label">${Ft("common.uv_risk","","",this.config.language)}</span><br />
                  <span class="risk">${this._riskText(t)}</span>
                </div>
              `:I}
        </div>
      </div>
    `}_renderCompact(e){const t=void 0===e?void 0:this._riskForIndex(e),i=this._showNameForLayout("compact"),o=this._showIndexForLayout("compact"),n=this._showRiskForLayout("compact");return R`
      <div class="compact-card">
        <div class="compact-content">
          ${i?R`<div class="compact-name">${this.config.name||"UV Index"}</div>`:I}
          ${o?R`<div class="compact-index">${this._formatUvIndex(e)}</div>`:I}
          ${n?R`<div class="compact-risk">${this._riskText(t)}</div>`:I}
        </div>
        <div class="compact-pyramid">${this._renderPyramid(e)}</div>
      </div>
    `}_renderIcon(e){const t=void 0===e?void 0:this._riskForIndex(e),i=this._showNameForLayout("icon"),o=this._showIndexForLayout("icon"),n=this._showRiskForLayout("icon"),r=i||o||n;return R`
      <div class=${"icon-card "+(r?"has-icon-text":"")}>
        ${r?R`
              <div class="icon-content">
                ${i?R`<div class="icon-name">${this.config.name||"UV Index"}</div>`:I}
                ${o?R`<div class="icon-index">${this._formatUvIndex(e)}</div>`:I}
                ${n?R`<div class="icon-risk">${this._riskText(t)}</div>`:I}
              </div>
            `:I}
        <div class="icon-pyramid">${this._renderPyramid(e)}</div>
      </div>
    `}_renderPyramid(e){const t=null!=e?e:-1,i=this._idleColor,o=this._riskColor("low"),n=this._riskColor("moderate"),r=this._riskColor("high"),s=this._riskColor("very_high"),a=this._riskColor("extreme");return R`
      <svg
        class="uv-pyramid"
        viewBox="0 0 162 136"
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label=${`${Ft("common.uv_index","","",this.config.language)} ${this._formatUvIndex(e)}`}
      >
        <title>UV</title>
        <g id="UV-Index-Triangle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <polygon points="81.9537723 2.99975159 77.2979826 10.4602611 86.4956236 10.4362484" fill=${t>=12?a:i}></polygon>
          <polygon points="92.8108692 20.7694268 70.8323051 20.8356688 76.2650231 12.1248408 87.5102538 12.0925478" fill=${t>=11?a:i}></polygon>
          <polygon points="99.1192621 31.0946561 64.3589492 31.2022994 69.7916672 22.4914713 93.8186467 22.4177771" fill=${t>=10?s:i}></polygon>
          <polygon points="105.434921 41.428828 57.8945103 41.5778726 63.3272282 32.8670446 100.134305 32.751121" fill=${t>=9?s:i}></polygon>
          <polygon points="111.751405 51.7620892 51.4218149 51.9450828 56.8627892 43.2334268 106.442533 43.0769299" fill=${t>=8?s:i}></polygon>
          <polygon points="118.058972 62.0882293 44.9567154 62.3192484 50.3894333 53.6092484 112.758356 53.4105223" fill=${t>=7?r:i}></polygon>
          <polygon points="124.367447 72.4134586 38.4834421 72.686707 43.9244164 63.975879 119.066832 63.7440318" fill=${t>=6?r:i}></polygon>
          <polygon points="130.17996 81.9276369 32.5388267 82.2331783 37.4513908 74.3512038 125.38216 74.0696752" fill=${t>=5?n:i}></polygon>
          <polygon points="136.495618 92.2528662 26.0661313 92.6006369 31.4988492 83.8889809 131.195003 83.5759873" fill=${t>=4?n:i}></polygon>
          <polygon points="142.804011 102.58621 19.6010318 102.96793 25.0337497 94.2562739 137.503396 93.9093312" fill=${t>=3?n:i}></polygon>
          <polygon points="149.111661 112.912268 13.1285841 113.342841 18.5613021 104.632013 143.819302 104.242013" fill=${t>=2?o:i}></polygon>
          <polygon points="155.427732 123.23758 6.66373231 123.717834 12.0964503 115.007006 150.127117 114.560701" fill=${t>=1?o:i}></polygon>
          <polygon points="5.62342462 125.373554 0.999834872 132.792662 161.264189 132.792662 156.435014 124.893299" fill=${void 0===e?i:o}></polygon>
        </g>
      </svg>
    `}get _idleColor(){return"#ededed"}_riskColor(e){return{low:"green",moderate:"yellow",high:"orange",very_high:"red",extreme:"blueviolet"}[e]}_riskForIndex(e){return e>=11?"extreme":e>=8?"very_high":e>=6?"high":e>=3?"moderate":"low"}_riskText(e){if(void 0===e)return"N/A";return Ft("very_high"===e?"uv_levels.very_high":`uv_levels.${e}`,"","",this.config.language)}_showNameForLayout(e){var t;return null!==(t=this.config.show_name)&&void 0!==t?t:"icon"!==e}_showIndexForLayout(e){var t;return null!==(t=this.config.show_index)&&void 0!==t?t:"icon"!==e}_showRiskForLayout(e){var t;return null!==(t=this.config.show_risk)&&void 0!==t?t:"icon"!==e}_formatUvIndex(e){var t,i;if(void 0===e)return"N/A";const o=this._decimals,n=(null===(i=null===(t=this.hass)||void 0===t?void 0:t.locale)||void 0===i?void 0:i.language)||this.config.language||void 0;try{return e.toLocaleString(n,{minimumFractionDigits:o,maximumFractionDigits:o})}catch(t){return e.toFixed(o)}}_handleAction(e){this.hass&&this.config&&e.detail.action&&function(e,t,i,o){var n;"double_tap"===o&&i.double_tap_action?n=i.double_tap_action:"hold"===o&&i.hold_action?n=i.hold_action:"tap"===o&&i.tap_action&&(n=i.tap_action),ze(e,t,i,n)}(this,this.hass,this.config,e.detail.action)}_showWarning(e){return R`<hui-warning>${e}</hui-warning>`}_showError(e){const t=document.createElement("hui-error-card");return t.setConfig({type:"error",error:e,origConfig:this.config}),R`${t}`}static get styles(){return s`
      :host {
        display: block;
      }

      ha-card {
        box-sizing: border-box;
        height: 100%;
        overflow: hidden;
      }

      ha-card.layout-compact {
        min-height: 140px;
      }

      .full-card {
        box-sizing: border-box;
        display: grid;
        grid-template-columns: minmax(84px, 45%) minmax(0, 1fr);
        gap: 12px;
        align-items: center;
        padding: 12px;
      }

      .full-pyramid,
      .compact-pyramid {
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .full-pyramid {
        justify-content: center;
      }

      .full-content {
        min-width: 0;
        line-height: 1.45;
      }

      .full-row + .full-row {
        margin-top: 8px;
      }

      .label {
        color: var(--primary-text-color);
        font-weight: bold;
      }

      .value,
      .risk {
        color: var(--primary-text-color);
      }

      .compact-card {
        box-sizing: border-box;
        min-height: 140px;
        padding: 16px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(86px, 42%);
        gap: 12px;
        align-items: center;
      }

      .compact-content {
        min-width: 0;
        z-index: 1;
      }

      .compact-name {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: var(--ha-card-header-font-size, 16px);
        font-weight: 500;
        line-height: 20px;
        margin-bottom: 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-index {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 32px;
        font-weight: 400;
        line-height: 36px;
        letter-spacing: 0;
      }

      .compact-risk {
        margin-top: 4px;
        color: var(--secondary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .compact-pyramid {
        justify-content: flex-end;
        height: 100%;
        overflow: hidden;
      }

      .icon-card {
        box-sizing: border-box;
        min-height: 80px;
        padding: 8px;
        display: grid;
        grid-template-columns: minmax(48px, 1fr);
        gap: 0;
        align-items: center;
        justify-content: center;
      }

      .icon-card.has-icon-text {
        grid-template-columns: minmax(0, max-content) minmax(48px, 1fr);
        gap: 8px;
      }

      .icon-content {
        min-width: 0;
        max-width: 96px;
        overflow: hidden;
      }

      .icon-name {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 13px;
        font-weight: 500;
        line-height: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon-index {
        color: var(--primary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 18px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0;
        white-space: nowrap;
      }

      .icon-risk {
        color: var(--secondary-text-color);
        font-family: var(--ha-font-family-body, var(--primary-font-family));
        font-size: 11px;
        font-weight: 400;
        line-height: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icon-pyramid {
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .uv-pyramid {
        display: block;
        width: 100%;
        height: auto;
        max-width: var(--uv-index-card-pyramid-size, 120px);
        aspect-ratio: 162 / 136;
        flex: 0 1 auto;
      }

      .compact-pyramid .uv-pyramid {
        width: 100%;
        max-width: var(--uv-index-card-compact-pyramid-size, 128px);
        height: auto;
        max-height: 104px;
      }

      .icon-pyramid .uv-pyramid {
        max-width: var(--uv-index-card-pyramid-size, 64px);
      }


    `}};e([le({attribute:!1})],Wt.prototype,"hass",void 0),e([ce()],Wt.prototype,"config",void 0),Wt=e([se("uv-index-card")],Wt);export{Wt as UVIndexCard};
