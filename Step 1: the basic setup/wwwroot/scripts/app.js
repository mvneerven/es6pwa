var ot=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var wt=(r,t,e)=>t in r?ot(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var D=(r,t,e,s)=>{for(var i=s>1?void 0:s?xt(t,e):t,n=r.length-1,o;n>=0;n--)(o=r[n])&&(i=(s?o(t,e,i):o(i))||i);return s&&i&&ot(t,e,i),i};var I=(r,t,e)=>(wt(r,typeof t!="symbol"?t+"":t,e),e);var M=window,L=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),nt=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&nt.set(e,t))}return t}toString(){return this.cssText}},lt=r=>new P(typeof r=="string"?r:r+"",void 0,V),K=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,n)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[n+1],r[0]);return new P(e,r,V)},W=(r,t)=>{L?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)})},j=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return lt(e)})(r):r;var Z,z=window,at=z.trustedTypes,Pt=at?at.emptyScript:"",ht=z.reactiveElementPolyfillSupport,F={toAttribute(r,t){switch(t){case Boolean:r=r?Pt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},dt=(r,t)=>t!==r&&(t==t||r==r),J={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:dt},f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,s)=>{let i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=J){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){let n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||J}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Ep(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return W(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=J){var i;let n=this.constructor._$Ep(t,s);if(n!==void 0&&s.reflect===!0){let o=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:F).toAttribute(e,s.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;let i=this.constructor,n=i._$Ev.get(t);if(n!==void 0&&this._$El!==n){let o=i.getPropertyOptions(n),d=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:F;this._$El=n,this[n]=d.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||dt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,n)=>this[n]=i),this._$Ei=void 0);let e=!1,s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var n;return(n=i.hostUpdate)===null||n===void 0?void 0:n.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},ht?.({ReactiveElement:f}),((Z=z.reactiveElementVersions)!==null&&Z!==void 0?Z:z.reactiveElementVersions=[]).push("1.6.1");var G,q=window,b=q.trustedTypes,ct=b?b.createPolicy("lit-html",{createHTML:r=>r}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,yt="?"+$,Ut=`<${yt}>`,C=document,H=(r="")=>C.createComment(r),O=r=>r===null||typeof r!="object"&&typeof r!="function",_t=Array.isArray,Ht=r=>_t(r)||typeof r?.[Symbol.iterator]=="function",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,y=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),vt=/'/g,mt=/"/g,gt=/^(?:script|style|textarea|title)$/i,At=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),B=At(1),jt=At(2),_=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ft=new WeakMap,E=C.createTreeWalker(C,129,null,!1),Ot=(r,t)=>{let e=r.length-1,s=[],i,n=t===2?"<svg>":"",o=U;for(let l=0;l<e;l++){let a=r[l],m,h,c=-1,p=0;for(;p<a.length&&(o.lastIndex=p,h=o.exec(a),h!==null);)p=o.lastIndex,o===U?h[1]==="!--"?o=ut:h[1]!==void 0?o=pt:h[2]!==void 0?(gt.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=y):h[3]!==void 0&&(o=y):o===y?h[0]===">"?(o=i??U,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,m=h[1],o=h[3]===void 0?y:h[3]==='"'?mt:vt):o===mt||o===vt?o=y:o===ut||o===pt?o=U:(o=y,i=void 0);let k=o===y&&r[l+1].startsWith("/>")?" ":"";n+=o===U?a+Ut:c>=0?(s.push(m),a.slice(0,c)+"$lit$"+a.slice(c)+$+k):a+$+(c===-2?(s.push(void 0),l):k)}let d=n+(r[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ct!==void 0?ct.createHTML(d):d,s]},g=class{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0,d=t.length-1,l=this.parts,[a,m]=Ot(t,e);if(this.el=g.createElement(a,s),E.currentNode=this.el.content,e===2){let h=this.el.content,c=h.firstChild;c.remove(),h.append(...c.childNodes)}for(;(i=E.nextNode())!==null&&l.length<d;){if(i.nodeType===1){if(i.hasAttributes()){let h=[];for(let c of i.getAttributeNames())if(c.endsWith("$lit$")||c.startsWith($)){let p=m[o++];if(h.push(c),p!==void 0){let k=i.getAttribute(p.toLowerCase()+"$lit$").split($),N=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:N[2],strings:k,ctor:N[1]==="."?X:N[1]==="?"?Y:N[1]==="@"?tt:w})}else l.push({type:6,index:n})}for(let c of h)i.removeAttribute(c)}if(gt.test(i.tagName)){let h=i.textContent.split($),c=h.length-1;if(c>0){i.textContent=b?b.emptyScript:"";for(let p=0;p<c;p++)i.append(h[p],H()),E.nextNode(),l.push({type:2,index:++n});i.append(h[c],H())}}}else if(i.nodeType===8)if(i.data===yt)l.push({type:2,index:n});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)l.push({type:7,index:n}),h+=$.length-1}n++}}static createElement(t,e){let s=C.createElement("template");return s.innerHTML=t,s}};function x(r,t,e=r,s){var i,n,o,d;if(t===_)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl,a=O(t)?void 0:t._$litDirective$;return l?.constructor!==a&&((n=l?._$AO)===null||n===void 0||n.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,s)),s!==void 0?((o=(d=e)._$Co)!==null&&o!==void 0?o:d._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=x(r,l._$AS(r,t.values),l,s)),t}var Q=class{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;let{el:{content:s},parts:i}=this._$AD,n=((e=t?.creationScope)!==null&&e!==void 0?e:C).importNode(s,!0);E.currentNode=n;let o=E.nextNode(),d=0,l=0,a=i[0];for(;a!==void 0;){if(d===a.index){let m;a.type===2?m=new A(o,o.nextSibling,this,t):a.type===1?m=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(m=new et(o,this,t)),this.u.push(m),a=i[++l]}d!==a?.index&&(o=E.nextNode(),d++)}return n}p(t){let e=0;for(let s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},A=class{constructor(t,e,s,i){var n;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=(n=i?.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),O(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==_&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==u&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){var e;let{values:s,_$litType$:i}=t,n=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=g.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.p(s);else{let o=new Q(n,this),d=o.v(this.options);o.p(s),this.T(d),this._$AH=o}}_$AC(t){let e=ft.get(t.strings);return e===void 0&&ft.set(t.strings,e=new g(t)),e}k(t){_t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let n of t)i===e.length?e.push(s=new A(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cm=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},w=class{constructor(t,e,s,i,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){let n=this.strings,o=!1;if(n===void 0)t=x(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{let d=t,l,a;for(t=n[0],l=0;l<n.length-1;l++)a=x(this,d[s+l],e,l),a===_&&(a=this._$AH[l]),o||(o=!O(a)||a!==this._$AH[l]),a===u?t=u:t!==u&&(t+=(a??"")+n[l+1]),this._$AH[l]=a}o&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},Rt=b?b.emptyScript:"",Y=class extends w{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Rt):this.element.removeAttribute(this.name)}},tt=class extends w{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=(s=x(this,t,e,0))!==null&&s!==void 0?s:u)===_)return;let i=this._$AH,n=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==u&&(i===u||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}},et=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}};var $t=q.litHtmlPolyfillSupport;$t?.(g,A),((G=q.litHtmlVersions)!==null&&G!==void 0?G:q.litHtmlVersions=[]).push("2.6.1");var St=(r,t,e)=>{var s,i;let n=(s=e?.renderBefore)!==null&&s!==void 0?s:t,o=n._$litPart$;if(o===void 0){let d=(i=e?.renderBefore)!==null&&i!==void 0?i:null;n._$litPart$=o=new A(t.insertBefore(H(),d),d,void 0,e??{})}return o._$AI(r),o};var st,it;var v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;let s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=St(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return _}};v.finalized=!0,v._$litElement$=!0,(st=globalThis.litElementHydrateSupport)===null||st===void 0||st.call(globalThis,{LitElement:v});var Et=globalThis.litElementPolyfillSupport;Et?.({LitElement:v});((it=globalThis.litElementVersions)!==null&&it!==void 0?it:globalThis.litElementVersions=[]).push("3.2.2");var bt=r=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(r,t):((e,s)=>{let{kind:i,elements:n}=s;return{kind:i,elements:n,finisher(o){customElements.define(e,o)}}})(r,t);var S=({finisher:r,descriptor:t})=>(e,s)=>{var i;if(s===void 0){let n=(i=e.originalKey)!==null&&i!==void 0?i:e.key,o=t!=null?{kind:"method",placement:"prototype",key:n,descriptor:t(e.key)}:{...e,key:n};return r!=null&&(o.finisher=function(d){r(d,n)}),o}{let n=e.constructor;t!==void 0&&Object.defineProperty(e,s,t(s)),r?.(n,s)}};function Ct(r){return S({finisher:(t,e)=>{Object.assign(t.prototype[e],r)}})}var rt,ue=((rt=window.HTMLSlotElement)===null||rt===void 0?void 0:rt.prototype.assignedElements)!=null?(r,t)=>r.assignedElements(t):(r,t)=>r.assignedNodes(t).filter(e=>e.nodeType===Node.ELEMENT_NODE);var R=class extends v{render(){return B`
      <label for="name">Enter your name:</label>
      <input id="name" type="text" @change=${this.handleChange} />
    `}handleChange(t){let e=new CustomEvent("nameChanged",{detail:{name:t.target.value},composed:!0,bubbles:!0});this.dispatchEvent(e)}};D([Ct({passive:!0})],R.prototype,"handleChange",1),R=D([bt("pwa-name-editor")],R);var T=class extends v{constructor(){super(),this.name="Somebody"}render(){return B`
      <p>Hello, ${this.name}!</p>
      <pwa-name-editor @nameChanged=${this.handleNameChange}></pwa-name-editor>
    `}handleNameChange(t){console.log(t),this.name=t.detail.name}};I(T,"styles",K`
    p {
      color: blue;
    }
  `),I(T,"properties",{name:{type:String}});customElements.define("pwa-app",T);
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=app.js.map
