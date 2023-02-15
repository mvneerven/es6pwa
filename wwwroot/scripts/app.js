var nt=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var wt=(r,t,e)=>t in r?nt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var D=(r,t,e,s)=>{for(var i=s>1?void 0:s?xt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(i=(s?n(t,e,i):n(i))||i);return s&&i&&nt(t,e,i),i};var I=(r,t,e)=>(wt(r,typeof t!="symbol"?t+"":t,e),e);var M=window,L=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),lt=new WeakMap,P=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&lt.set(e,t))}return t}toString(){return this.cssText}},at=r=>new P(typeof r=="string"?r:r+"",void 0,V),K=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new P(e,r,V)},W=(r,t)=>{L?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let s=document.createElement("style"),i=M.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)})},j=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return at(e)})(r):r;var Z,z=window,ht=z.trustedTypes,Pt=ht?ht.emptyScript:"",dt=z.reactiveElementPolyfillSupport,F={toAttribute(r,t){switch(t){case Boolean:r=r?Pt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ct=(r,t)=>t!==r&&(t==t||r==r),J={attribute:!0,type:String,converter:F,reflect:!1,hasChanged:ct},f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,s)=>{let i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=J){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){let o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||J}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){let e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(j(i))}else t!==void 0&&e.push(j(t));return e}static _$Ep(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return W(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=J){var i;let o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){let n=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:F).toAttribute(e,s.type);this._$El=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var s;let i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){let n=i.getPropertyOptions(o),d=typeof n.converter=="function"?{fromAttribute:n.converter}:((s=n.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?n.converter:F;this._$El=o,this[o]=d.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ct)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let e=!1,s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},dt?.({ReactiveElement:f}),((Z=z.reactiveElementVersions)!==null&&Z!==void 0?Z:z.reactiveElementVersions=[]).push("1.6.1");var G,q=window,b=q.trustedTypes,pt=b?b.createPolicy("lit-html",{createHTML:r=>r}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,_t="?"+$,Ut=`<${_t}>`,C=document,H=(r="")=>C.createComment(r),O=r=>r===null||typeof r!="object"&&typeof r!="function",gt=Array.isArray,Ht=r=>gt(r)||typeof r?.[Symbol.iterator]=="function",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,vt=/>/g,y=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),mt=/'/g,ft=/"/g,At=/^(?:script|style|textarea|title)$/i,St=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),B=St(1),zt=St(2),_=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,E=C.createTreeWalker(C,129,null,!1),Ot=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":"",n=U;for(let l=0;l<e;l++){let a=r[l],m,h,c=-1,u=0;for(;u<a.length&&(n.lastIndex=u,h=n.exec(a),h!==null);)u=n.lastIndex,n===U?h[1]==="!--"?n=ut:h[1]!==void 0?n=vt:h[2]!==void 0?(At.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=y):h[3]!==void 0&&(n=y):n===y?h[0]===">"?(n=i??U,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,m=h[1],n=h[3]===void 0?y:h[3]==='"'?ft:mt):n===ft||n===mt?n=y:n===ut||n===vt?n=U:(n=y,i=void 0);let k=n===y&&r[l+1].startsWith("/>")?" ":"";o+=n===U?a+Ut:c>=0?(s.push(m),a.slice(0,c)+"$lit$"+a.slice(c)+$+k):a+$+(c===-2?(s.push(void 0),l):k)}let d=o+(r[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return[pt!==void 0?pt.createHTML(d):d,s]},g=class{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,d=t.length-1,l=this.parts,[a,m]=Ot(t,e);if(this.el=g.createElement(a,s),E.currentNode=this.el.content,e===2){let h=this.el.content,c=h.firstChild;c.remove(),h.append(...c.childNodes)}for(;(i=E.nextNode())!==null&&l.length<d;){if(i.nodeType===1){if(i.hasAttributes()){let h=[];for(let c of i.getAttributeNames())if(c.endsWith("$lit$")||c.startsWith($)){let u=m[n++];if(h.push(c),u!==void 0){let k=i.getAttribute(u.toLowerCase()+"$lit$").split($),N=/([.?@])?(.*)/.exec(u);l.push({type:1,index:o,name:N[2],strings:k,ctor:N[1]==="."?X:N[1]==="?"?Y:N[1]==="@"?tt:w})}else l.push({type:6,index:o})}for(let c of h)i.removeAttribute(c)}if(At.test(i.tagName)){let h=i.textContent.split($),c=h.length-1;if(c>0){i.textContent=b?b.emptyScript:"";for(let u=0;u<c;u++)i.append(h[u],H()),E.nextNode(),l.push({type:2,index:++o});i.append(h[c],H())}}}else if(i.nodeType===8)if(i.data===_t)l.push({type:2,index:o});else{let h=-1;for(;(h=i.data.indexOf($,h+1))!==-1;)l.push({type:7,index:o}),h+=$.length-1}o++}}static createElement(t,e){let s=C.createElement("template");return s.innerHTML=t,s}};function x(r,t,e=r,s){var i,o,n,d;if(t===_)return t;let l=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl,a=O(t)?void 0:t._$litDirective$;return l?.constructor!==a&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),a===void 0?l=void 0:(l=new a(r),l._$AT(r,e,s)),s!==void 0?((n=(d=e)._$Co)!==null&&n!==void 0?n:d._$Co=[])[s]=l:e._$Cl=l),l!==void 0&&(t=x(r,l._$AS(r,t.values),l,s)),t}var Q=class{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;let{el:{content:s},parts:i}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:C).importNode(s,!0);E.currentNode=o;let n=E.nextNode(),d=0,l=0,a=i[0];for(;a!==void 0;){if(d===a.index){let m;a.type===2?m=new A(n,n.nextSibling,this,t):a.type===1?m=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(m=new et(n,this,t)),this.u.push(m),a=i[++l]}d!==a?.index&&(n=E.nextNode(),d++)}return o}p(t){let e=0;for(let s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},A=class{constructor(t,e,s,i){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=(o=i?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=x(this,t,e),O(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==_&&this.g(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Ht(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==p&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){var e;let{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=g.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.p(s);else{let n=new Q(o,this),d=n.v(this.options);n.p(s),this.T(d),this._$AH=n}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new g(t)),e}k(t){gt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new A(this.O(H()),this.O(H()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cm=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},w=class{constructor(t,e,s,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=x(this,t,e,0),n=!O(t)||t!==this._$AH&&t!==_,n&&(this._$AH=t);else{let d=t,l,a;for(t=o[0],l=0;l<o.length-1;l++)a=x(this,d[s+l],e,l),a===_&&(a=this._$AH[l]),n||(n=!O(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a??"")+o[l+1]),this._$AH[l]=a}n&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},X=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}},Rt=b?b.emptyScript:"",Y=class extends w{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Rt):this.element.removeAttribute(this.name)}},tt=class extends w{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=x(this,t,e,0))!==null&&s!==void 0?s:p)===_)return;let i=this._$AH,o=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==p&&(i===p||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}},et=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){x(this,t)}};var yt=q.litHtmlPolyfillSupport;yt?.(g,A),((G=q.litHtmlVersions)!==null&&G!==void 0?G:q.litHtmlVersions=[]).push("2.6.1");var Et=(r,t,e)=>{var s,i;let o=(s=e?.renderBefore)!==null&&s!==void 0?s:t,n=o._$litPart$;if(n===void 0){let d=(i=e?.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=n=new A(t.insertBefore(H(),d),d,void 0,e??{})}return n._$AI(r),n};var st,it;var v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;let s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Et(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return _}};v.finalized=!0,v._$litElement$=!0,(st=globalThis.litElementHydrateSupport)===null||st===void 0||st.call(globalThis,{LitElement:v});var bt=globalThis.litElementPolyfillSupport;bt?.({LitElement:v});((it=globalThis.litElementVersions)!==null&&it!==void 0?it:globalThis.litElementVersions=[]).push("3.2.2");var Tt=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}};function rt(r){return(t,e)=>e!==void 0?((s,i,o)=>{i.constructor.createProperty(o,s)})(r,t,e):Tt(r,t)}var S=({finisher:r,descriptor:t})=>(e,s)=>{var i;if(s===void 0){let o=(i=e.originalKey)!==null&&i!==void 0?i:e.key,n=t!=null?{kind:"method",placement:"prototype",key:o,descriptor:t(e.key)}:{...e,key:o};return r!=null&&(n.finisher=function(d){r(d,o)}),n}{let o=e.constructor;t!==void 0&&Object.defineProperty(e,s,t(s)),r?.(o,s)}};function Ct(r){return S({finisher:(t,e)=>{Object.assign(t.prototype[e],r)}})}var ot,pe=((ot=window.HTMLSlotElement)===null||ot===void 0?void 0:ot.prototype.assignedElements)!=null?(r,t)=>r.assignedElements(t):(r,t)=>r.assignedNodes(t).filter(e=>e.nodeType===Node.ELEMENT_NODE);var R=class extends v{render(){return B`
      <label for="name">Enter your name:</label>
      <input
        id="name"
        type="text"
        placeholder=${this.placeholder}
        @change=${this.handleChange}
      />
    `}handleChange(e){let s=new CustomEvent("nameChanged",{detail:{name:e.target.value},composed:!0,bubbles:!0});this.dispatchEvent(s)}};D([rt({type:String,attribute:"data-placeholder"})],R.prototype,"placeholder",2),D([Ct({passive:!0})],R.prototype,"handleChange",1);customElements.define("pwa-name-editor",R);var T=class extends v{constructor(){super(),this.name="Somebody"}render(){return B`
      <p>Hello, ${this.name}!</p>
      <pwa-name-editor
        data-placeholder="Somebody"
        @nameChanged=${this.handleNameChange}
      ></pwa-name-editor>
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
