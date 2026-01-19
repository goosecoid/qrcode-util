var st=Object.defineProperty;var lt=(o,e,i)=>e in o?st(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var F=(o,e,i)=>lt(o,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();function Ce(o){const e=o.replace(/\s/g,"").toUpperCase();if(!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(e))return!1;const n=(e.slice(4)+e.slice(0,4)).replace(/[A-Z]/g,r=>(r.charCodeAt(0)-55).toString());let t=n.slice(0,2);for(let r=2;r<n.length;r+=7)t=(parseInt(t+n.slice(r,r+7),10)%97).toString();return parseInt(t,10)===1}function Ie(o){return/^[A-Z]{2}[A-Z0-9]{2,12}$/.test(o.replace(/\s/g,"").toUpperCase())}class at{getTitle(){return"Payment Information"}render(e){const i=document.createElement("div");i.className="step-container",i.innerHTML=`
      <h2>${this.getTitle()}</h2>
      <p class="step-description">Fill in the payment details</p>

      <h3>Requester Information</h3>

      <div class="form-group">
        <label for="iban">
          IBAN <span class="required">*</span>
        </label>
        <input
          type="text"
          id="iban"
          name="iban"
          value="${e.iban||""}"
          placeholder="e.g., BE40251230861709"
          required
        />
        <small>International Bank Account Number</small>
        <div class="error-message" id="iban-error"></div>
      </div>

      <div class="form-group">
        <label for="billerVAT">
          Biller VAT <span class="required">*</span>
        </label>
        <input
          type="text"
          id="billerVAT"
          name="billerVAT"
          value="${e.billerVAT||""}"
          placeholder="e.g., BE0000000196"
        />
        <small>VAT number with country code (at least one of VAT or ID Number required)</small>
        <div class="error-message" id="billerVAT-error"></div>
      </div>

      <div class="form-group">
        <label for="billerIdentificationNumber">
          Biller Identification Number <span class="required">*</span>
        </label>
        <input
          type="text"
          id="billerIdentificationNumber"
          name="billerIdentificationNumber"
          value="${e.billerIdentificationNumber||""}"
          placeholder="e.g., BE:VAT:BE0000000097"
        />
        <small>Company identification number (at least one of VAT or ID Number required)</small>
      </div>

      <h3>Payment Details</h3>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value="${e.amount||""}"
          placeholder="e.g., 1234.50"
          step="0.01"
          min="0"
        />
        <small>Amount to be paid in EUR</small>
      </div>

      <div class="form-group">
        <label>
          Communication <span class="required">*</span>
        </label>
        <p class="field-note">At least one communication method is required</p>

        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              name="communicationType"
              value="structured"
              ${!e.communicationType||e.communicationType==="structured"?"checked":""}
            />
            Structured Reference
          </label>
          <label class="radio-label">
            <input
              type="radio"
              name="communicationType"
              value="unstructured"
              ${e.communicationType==="unstructured"?"checked":""}
            />
            Unstructured Message
          </label>
        </div>

        <div id="structured-field" class="conditional-field">
          <label for="creditorReference">Structured Reference</label>
          <input
            type="text"
            id="creditorReference"
            name="creditorReference"
            value="${e.creditorReference||""}"
            placeholder="e.g., +++000/6002/32562+++"
          />
          <small>Structured reference (Belgian BBA format or ISO)</small>
          <div class="error-message" id="creditorReference-error"></div>
        </div>

        <div id="unstructured-field" class="conditional-field" style="display: none;">
          <label for="remittanceInfo">Unstructured Message</label>
          <input
            type="text"
            id="remittanceInfo"
            name="remittanceInfo"
            value="${e.remittanceInfo||""}"
            placeholder="e.g., Invoice 1234"
          />
          <small>Free text communication</small>
        </div>
      </div>

      <h3>Additional Settings</h3>

      <div class="form-group">
        <label for="language">Language</label>
        <select id="language" name="language">
          <option value="">Default</option>
          <option value="en" ${e.language==="en"?"selected":""}>English</option>
          <option value="fr" ${e.language==="fr"?"selected":""}>French</option>
          <option value="nl" ${e.language==="nl"?"selected":""}>Dutch</option>
        </select>
        <small>Language for the payment page (EN, NL, or FR)</small>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            id="multiple"
            name="multiple"
            ${e.multiple!==!1?"checked":""}
          />
          Accept Multiple Payments
        </label>
        <small>Allow this QR code to be used for multiple payments</small>
      </div>

      <div class="form-group">
        <label for="paymentInternalId">Payment Internal ID</label>
        <input
          type="text"
          id="paymentInternalId"
          name="paymentInternalId"
          value="${e.paymentInternalId||""}"
          placeholder="e.g., PAY123456"
        />
        <small>Your internal identifier for this payment</small>
      </div>

      <div class="form-group">
        <label for="paymentMethod">Payment Method</label>
        <select id="paymentMethod" name="paymentMethod">
          <option value="">All available methods</option>
          <option value="DIGITEAL_STANDARD" ${e.paymentMethod==="DIGITEAL_STANDARD"?"selected":""}>DigiTeal Standard</option>
          <option value="PIS_STANDARD" ${e.paymentMethod==="PIS_STANDARD"?"selected":""}>Payment Initiation Service (PIS)</option>
          <option value="BANCONTACT" ${e.paymentMethod==="BANCONTACT"?"selected":""}>Bancontact</option>
          <option value="IDEAL" ${e.paymentMethod==="IDEAL"?"selected":""}>iDEAL</option>
          <option value="VISA" ${e.paymentMethod==="VISA"?"selected":""}>Visa</option>
          <option value="MASTERCARD" ${e.paymentMethod==="MASTERCARD"?"selected":""}>Mastercard</option>
          <option value="CARTE_BLEUE" ${e.paymentMethod==="CARTE_BLEUE"?"selected":""}>Carte Bleue</option>
          <option value="MAESTRO" ${e.paymentMethod==="MAESTRO"?"selected":""}>Maestro</option>
          <option value="PAYCONIQ" ${e.paymentMethod==="PAYCONIQ"?"selected":""}>Payconiq</option>
        </select>
        <small>Force a specific payment method (leave empty to allow all)</small>
      </div>

      <div class="form-group">
        <label for="allowedPaymentMethods">Allowed Payment Methods</label>
        <input
          type="text"
          id="allowedPaymentMethods"
          name="allowedPaymentMethods"
          value="${e.allowedPaymentMethods||""}"
          placeholder="e.g., VISA,MASTERCARD,BANCONTACT"
        />
        <small>Comma-separated list of allowed payment methods (leave empty to allow all)</small>
      </div>

      <div class="form-group">
        <label for="size">QR Code Size: <span id="size-value">${e.size||400}</span>px</label>
        <input
          type="range"
          id="size"
          name="size"
          min="250"
          max="4000"
          value="${e.size||400}"
          step="50"
        />
        <small>Width of the generated QR code (250-4000px)</small>
      </div>
    `;const n=i.querySelector('input[value="structured"]'),t=i.querySelector('input[value="unstructured"]'),r=i.querySelector("#structured-field"),s=i.querySelector("#unstructured-field"),l=()=>{n.checked?(r.style.display="block",s.style.display="none"):(r.style.display="none",s.style.display="block")};n.addEventListener("change",l),t.addEventListener("change",l);const a=i.querySelector("#iban"),c=i.querySelector("#iban-error");a.addEventListener("blur",()=>{a.value&&!Ce(a.value)?(c.textContent="Invalid IBAN format",a.classList.add("invalid")):(c.textContent="",a.classList.remove("invalid"))});const d=i.querySelector("#billerVAT"),m=i.querySelector("#billerVAT-error");d.addEventListener("blur",()=>{d.value&&!Ie(d.value)?(m.textContent="Invalid VAT format (should include country code)",d.classList.add("invalid")):(m.textContent="",d.classList.remove("invalid"))});const f=i.querySelector("#size"),u=i.querySelector("#size-value");return f.addEventListener("input",()=>{u.textContent=f.value}),i}validate(e){var n,t,r,s,l,a;const i=[];return(n=e.iban)!=null&&n.trim()?Ce(e.iban)||i.push("Invalid IBAN format"):i.push("IBAN is required"),!((t=e.billerVAT)!=null&&t.trim())&&!((r=e.billerIdentificationNumber)!=null&&r.trim())&&i.push("Either Biller VAT or Biller Identification Number is required"),(s=e.billerVAT)!=null&&s.trim()&&!Ie(e.billerVAT)&&i.push("Invalid VAT format"),!((l=e.creditorReference)!=null&&l.trim())&&!((a=e.remittanceInfo)!=null&&a.trim())&&i.push("Either structured reference or unstructured message is required"),{valid:i.length===0,errors:i}}collectData(e){var M,v,C;const i=e.querySelector("#iban").value.trim(),n=e.querySelector("#billerVAT").value.trim(),t=e.querySelector("#billerIdentificationNumber").value.trim(),r=e.querySelector("#amount").value,s=r?parseFloat(r):void 0,l=(M=e.querySelector('input[name="communicationType"]:checked'))==null?void 0:M.value,a=(v=e.querySelector("#creditorReference"))==null?void 0:v.value.trim(),c=(C=e.querySelector("#remittanceInfo"))==null?void 0:C.value.trim(),d=e.querySelector("#language").value||void 0,m=e.querySelector("#multiple").checked,f=e.querySelector("#paymentInternalId").value.trim()||void 0,u=e.querySelector("#paymentMethod").value||void 0,S=e.querySelector("#allowedPaymentMethods").value.trim()||void 0,R=parseInt(e.querySelector("#size").value,10);return{iban:i,billerVAT:n,billerIdentificationNumber:t,amount:s,communicationType:l,creditorReference:l==="structured"?a:void 0,remittanceInfo:l==="unstructured"?c:void 0,language:d,multiple:m,paymentInternalId:f,paymentMethod:u,allowedPaymentMethods:S,size:R}}}const ut={test:"https://test.digiteal.eu",production:"https://app.digiteal.eu"};function ct(o,e="test"){const i=ut[e],n=new URL("/api/v1/payment-request/pay-button/execute",i);if(o.iban&&n.searchParams.append("iban",o.iban),o.billerVAT&&n.searchParams.append("requesterVAT",o.billerVAT),o.billerIdentificationNumber&&n.searchParams.append("requesterIdentificationNumber",o.billerIdentificationNumber),o.amount){const t=Math.round(o.amount*100);n.searchParams.append("amountInCents",String(t))}return o.creditorReference?n.searchParams.append("creditorReference",o.creditorReference):o.remittanceInfo&&n.searchParams.append("remittanceInfo",o.remittanceInfo),o.language&&n.searchParams.append("language",o.language.toUpperCase()),o.multiple!==void 0&&n.searchParams.append("multiple",String(o.multiple)),o.paymentInternalId&&n.searchParams.append("paymentInternalId",o.paymentInternalId),o.paymentMethod&&n.searchParams.append("paymentMethod",o.paymentMethod),o.allowedPaymentMethods&&n.searchParams.append("allowedPaymentMethods",o.allowedPaymentMethods),n.toString()}function dt(o,e="test"){return ct(o,e)}function ft(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var z={},x,Ae;function ht(){return Ae||(Ae=1,x=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),x}var Z={},U={},Se;function V(){if(Se)return U;Se=1;let o;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return U.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},U.getSymbolTotalCodewords=function(n){return e[n]},U.getBCHDigit=function(i){let n=0;for(;i!==0;)n++,i>>>=1;return n},U.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');o=n},U.isKanjiModeEnabled=function(){return typeof o<"u"},U.toSJIS=function(n){return o(n)},U}var W={},Be;function ve(){return Be||(Be=1,(function(o){o.L={bit:1},o.M={bit:0},o.Q={bit:3},o.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return o.L;case"m":case"medium":return o.M;case"q":case"quartile":return o.Q;case"h":case"high":return o.H;default:throw new Error("Unknown EC Level: "+i)}}o.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},o.from=function(n,t){if(o.isValid(n))return n;try{return e(n)}catch{return t}}})(W)),W}var X,Re;function gt(){if(Re)return X;Re=1;function o(){this.buffer=[],this.length=0}return o.prototype={get:function(e){const i=Math.floor(e/8);return(this.buffer[i]>>>7-e%8&1)===1},put:function(e,i){for(let n=0;n<i;n++)this.putBit((e>>>i-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),e&&(this.buffer[i]|=128>>>this.length%8),this.length++}},X=o,X}var $,Te;function mt(){if(Te)return $;Te=1;function o(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return o.prototype.set=function(e,i,n,t){const r=e*this.size+i;this.data[r]=n,t&&(this.reservedBit[r]=!0)},o.prototype.get=function(e,i){return this.data[e*this.size+i]},o.prototype.xor=function(e,i,n){this.data[e*this.size+i]^=n},o.prototype.isReserved=function(e,i){return this.reservedBit[e*this.size+i]},$=o,$}var ee={},Me;function pt(){return Me||(Me=1,(function(o){const e=V().getSymbolSize;o.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,r=e(n),s=r===145?26:Math.ceil((r-13)/(2*t-2))*2,l=[r-7];for(let a=1;a<t-1;a++)l[a]=l[a-1]-s;return l.push(6),l.reverse()},o.getPositions=function(n){const t=[],r=o.getRowColCoords(n),s=r.length;for(let l=0;l<s;l++)for(let a=0;a<s;a++)l===0&&a===0||l===0&&a===s-1||l===s-1&&a===0||t.push([r[l],r[a]]);return t}})(ee)),ee}var te={},Ne;function yt(){if(Ne)return te;Ne=1;const o=V().getSymbolSize,e=7;return te.getPositions=function(n){const t=o(n);return[[0,0],[t-e,0],[0,t-e]]},te}var ne={},Pe;function vt(){return Pe||(Pe=1,(function(o){o.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};o.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},o.from=function(t){return o.isValid(t)?parseInt(t,10):void 0},o.getPenaltyN1=function(t){const r=t.size;let s=0,l=0,a=0,c=null,d=null;for(let m=0;m<r;m++){l=a=0,c=d=null;for(let f=0;f<r;f++){let u=t.get(m,f);u===c?l++:(l>=5&&(s+=e.N1+(l-5)),c=u,l=1),u=t.get(f,m),u===d?a++:(a>=5&&(s+=e.N1+(a-5)),d=u,a=1)}l>=5&&(s+=e.N1+(l-5)),a>=5&&(s+=e.N1+(a-5))}return s},o.getPenaltyN2=function(t){const r=t.size;let s=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const c=t.get(l,a)+t.get(l,a+1)+t.get(l+1,a)+t.get(l+1,a+1);(c===4||c===0)&&s++}return s*e.N2},o.getPenaltyN3=function(t){const r=t.size;let s=0,l=0,a=0;for(let c=0;c<r;c++){l=a=0;for(let d=0;d<r;d++)l=l<<1&2047|t.get(c,d),d>=10&&(l===1488||l===93)&&s++,a=a<<1&2047|t.get(d,c),d>=10&&(a===1488||a===93)&&s++}return s*e.N3},o.getPenaltyN4=function(t){let r=0;const s=t.data.length;for(let a=0;a<s;a++)r+=t.data[a];return Math.abs(Math.ceil(r*100/s/5)-10)*e.N4};function i(n,t,r){switch(n){case o.Patterns.PATTERN000:return(t+r)%2===0;case o.Patterns.PATTERN001:return t%2===0;case o.Patterns.PATTERN010:return r%3===0;case o.Patterns.PATTERN011:return(t+r)%3===0;case o.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2===0;case o.Patterns.PATTERN101:return t*r%2+t*r%3===0;case o.Patterns.PATTERN110:return(t*r%2+t*r%3)%2===0;case o.Patterns.PATTERN111:return(t*r%3+(t+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}o.applyMask=function(t,r){const s=r.size;for(let l=0;l<s;l++)for(let a=0;a<s;a++)r.isReserved(a,l)||r.xor(a,l,i(t,a,l))},o.getBestMask=function(t,r){const s=Object.keys(o.Patterns).length;let l=0,a=1/0;for(let c=0;c<s;c++){r(c),o.applyMask(c,t);const d=o.getPenaltyN1(t)+o.getPenaltyN2(t)+o.getPenaltyN3(t)+o.getPenaltyN4(t);o.applyMask(c,t),d<a&&(a=d,l=c)}return l}})(ne)),ne}var Q={},Le;function $e(){if(Le)return Q;Le=1;const o=ve(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return Q.getBlocksCount=function(t,r){switch(r){case o.L:return e[(t-1)*4+0];case o.M:return e[(t-1)*4+1];case o.Q:return e[(t-1)*4+2];case o.H:return e[(t-1)*4+3];default:return}},Q.getTotalCodewordsCount=function(t,r){switch(r){case o.L:return i[(t-1)*4+0];case o.M:return i[(t-1)*4+1];case o.Q:return i[(t-1)*4+2];case o.H:return i[(t-1)*4+3];default:return}},Q}var re={},H={},qe;function bt(){if(qe)return H;qe=1;const o=new Uint8Array(512),e=new Uint8Array(256);return(function(){let n=1;for(let t=0;t<255;t++)o[t]=n,e[n]=t,n<<=1,n&256&&(n^=285);for(let t=255;t<512;t++)o[t]=o[t-255]})(),H.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},H.exp=function(n){return o[n]},H.mul=function(n,t){return n===0||t===0?0:o[e[n]+e[t]]},H}var De;function wt(){return De||(De=1,(function(o){const e=bt();o.mul=function(n,t){const r=new Uint8Array(n.length+t.length-1);for(let s=0;s<n.length;s++)for(let l=0;l<t.length;l++)r[s+l]^=e.mul(n[s],t[l]);return r},o.mod=function(n,t){let r=new Uint8Array(n);for(;r.length-t.length>=0;){const s=r[0];for(let a=0;a<t.length;a++)r[a]^=e.mul(t[a],s);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},o.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let r=0;r<n;r++)t=o.mul(t,new Uint8Array([1,e.exp(r)]));return t}})(re)),re}var ie,Ue;function Et(){if(Ue)return ie;Ue=1;const o=wt();function e(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=o.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(n.length+this.degree);t.set(n);const r=o.mod(t,this.genPoly),s=this.degree-r.length;if(s>0){const l=new Uint8Array(this.degree);return l.set(r,s),l}return r},ie=e,ie}var oe={},se={},le={},Fe;function et(){return Fe||(Fe=1,le.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),le}var P={},Ve;function tt(){if(Ve)return P;Ve=1;const o="[0-9]+",e="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;P.KANJI=new RegExp(i,"g"),P.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),P.BYTE=new RegExp(n,"g"),P.NUMERIC=new RegExp(o,"g"),P.ALPHANUMERIC=new RegExp(e,"g");const t=new RegExp("^"+i+"$"),r=new RegExp("^"+o+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return P.testKanji=function(a){return t.test(a)},P.testNumeric=function(a){return r.test(a)},P.testAlphanumeric=function(a){return s.test(a)},P}var _e;function _(){return _e||(_e=1,(function(o){const e=et(),i=tt();o.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},o.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},o.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},o.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},o.MIXED={bit:-1},o.getCharCountIndicator=function(r,s){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?r.ccBits[0]:s<27?r.ccBits[1]:r.ccBits[2]},o.getBestModeForData=function(r){return i.testNumeric(r)?o.NUMERIC:i.testAlphanumeric(r)?o.ALPHANUMERIC:i.testKanji(r)?o.KANJI:o.BYTE},o.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},o.isValid=function(r){return r&&r.bit&&r.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return o.NUMERIC;case"alphanumeric":return o.ALPHANUMERIC;case"kanji":return o.KANJI;case"byte":return o.BYTE;default:throw new Error("Unknown mode: "+t)}}o.from=function(r,s){if(o.isValid(r))return r;try{return n(r)}catch{return s}}})(se)),se}var ke;function Ct(){return ke||(ke=1,(function(o){const e=V(),i=$e(),n=ve(),t=_(),r=et(),s=7973,l=e.getBCHDigit(s);function a(f,u,S){for(let R=1;R<=40;R++)if(u<=o.getCapacity(R,S,f))return R}function c(f,u){return t.getCharCountIndicator(f,u)+4}function d(f,u){let S=0;return f.forEach(function(R){const M=c(R.mode,u);S+=M+R.getBitsLength()}),S}function m(f,u){for(let S=1;S<=40;S++)if(d(f,S)<=o.getCapacity(S,u,t.MIXED))return S}o.from=function(u,S){return r.isValid(u)?parseInt(u,10):S},o.getCapacity=function(u,S,R){if(!r.isValid(u))throw new Error("Invalid QR Code version");typeof R>"u"&&(R=t.BYTE);const M=e.getSymbolTotalCodewords(u),v=i.getTotalCodewordsCount(u,S),C=(M-v)*8;if(R===t.MIXED)return C;const B=C-c(R,u);switch(R){case t.NUMERIC:return Math.floor(B/10*3);case t.ALPHANUMERIC:return Math.floor(B/11*2);case t.KANJI:return Math.floor(B/13);case t.BYTE:default:return Math.floor(B/8)}},o.getBestVersionForData=function(u,S){let R;const M=n.from(S,n.M);if(Array.isArray(u)){if(u.length>1)return m(u,M);if(u.length===0)return 1;R=u[0]}else R=u;return a(R.mode,R.getLength(),M)},o.getEncodedBits=function(u){if(!r.isValid(u)||u<7)throw new Error("Invalid QR Code version");let S=u<<12;for(;e.getBCHDigit(S)-l>=0;)S^=s<<e.getBCHDigit(S)-l;return u<<12|S}})(oe)),oe}var ae={},ze;function It(){if(ze)return ae;ze=1;const o=V(),e=1335,i=21522,n=o.getBCHDigit(e);return ae.getEncodedBits=function(r,s){const l=r.bit<<3|s;let a=l<<10;for(;o.getBCHDigit(a)-n>=0;)a^=e<<o.getBCHDigit(a)-n;return(l<<10|a)^i},ae}var ue={},ce,Oe;function At(){if(Oe)return ce;Oe=1;const o=_();function e(i){this.mode=o.NUMERIC,this.data=i.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let t,r,s;for(t=0;t+3<=this.data.length;t+=3)r=this.data.substr(t,3),s=parseInt(r,10),n.put(s,10);const l=this.data.length-t;l>0&&(r=this.data.substr(t),s=parseInt(r,10),n.put(s,l*3+1))},ce=e,ce}var de,He;function St(){if(He)return de;He=1;const o=_(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(n){this.mode=o.ALPHANUMERIC,this.data=n}return i.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let r;for(r=0;r+2<=this.data.length;r+=2){let s=e.indexOf(this.data[r])*45;s+=e.indexOf(this.data[r+1]),t.put(s,11)}this.data.length%2&&t.put(e.indexOf(this.data[r]),6)},de=i,de}var fe,Ke;function Bt(){if(Ke)return fe;Ke=1;const o=_();function e(i){this.mode=o.BYTE,typeof i=="string"?this.data=new TextEncoder().encode(i):this.data=new Uint8Array(i)}return e.getBitsLength=function(n){return n*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){for(let n=0,t=this.data.length;n<t;n++)i.put(this.data[n],8)},fe=e,fe}var he,Qe;function Rt(){if(Qe)return he;Qe=1;const o=_(),e=V();function i(n){this.mode=o.KANJI,this.data=n}return i.getBitsLength=function(t){return t*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let t;for(t=0;t<this.data.length;t++){let r=e.toSJIS(this.data[t]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),n.put(r,13)}},he=i,he}var ge={exports:{}},Ye;function Tt(){return Ye||(Ye=1,(function(o){var e={single_source_shortest_paths:function(i,n,t){var r={},s={};s[n]=0;var l=e.PriorityQueue.make();l.push(n,0);for(var a,c,d,m,f,u,S,R,M;!l.empty();){a=l.pop(),c=a.value,m=a.cost,f=i[c]||{};for(d in f)f.hasOwnProperty(d)&&(u=f[d],S=m+u,R=s[d],M=typeof s[d]>"u",(M||R>S)&&(s[d]=S,l.push(d,S),r[d]=c))}if(typeof t<"u"&&typeof s[t]>"u"){var v=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(v)}return r},extract_shortest_path_from_predecessor_list:function(i,n){for(var t=[],r=n;r;)t.push(r),i[r],r=i[r];return t.reverse(),t},find_path:function(i,n,t){var r=e.single_source_shortest_paths(i,n,t);return e.extract_shortest_path_from_predecessor_list(r,t)},PriorityQueue:{make:function(i){var n=e.PriorityQueue,t={},r;i=i||{};for(r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);return t.queue=[],t.sorter=i.sorter||n.default_sorter,t},default_sorter:function(i,n){return i.cost-n.cost},push:function(i,n){var t={value:i,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};o.exports=e})(ge)),ge.exports}var Je;function Mt(){return Je||(Je=1,(function(o){const e=_(),i=At(),n=St(),t=Bt(),r=Rt(),s=tt(),l=V(),a=Tt();function c(v){return unescape(encodeURIComponent(v)).length}function d(v,C,B){const I=[];let N;for(;(N=v.exec(B))!==null;)I.push({data:N[0],index:N.index,mode:C,length:N[0].length});return I}function m(v){const C=d(s.NUMERIC,e.NUMERIC,v),B=d(s.ALPHANUMERIC,e.ALPHANUMERIC,v);let I,N;return l.isKanjiModeEnabled()?(I=d(s.BYTE,e.BYTE,v),N=d(s.KANJI,e.KANJI,v)):(I=d(s.BYTE_KANJI,e.BYTE,v),N=[]),C.concat(B,I,N).sort(function(w,b){return w.index-b.index}).map(function(w){return{data:w.data,mode:w.mode,length:w.length}})}function f(v,C){switch(C){case e.NUMERIC:return i.getBitsLength(v);case e.ALPHANUMERIC:return n.getBitsLength(v);case e.KANJI:return r.getBitsLength(v);case e.BYTE:return t.getBitsLength(v)}}function u(v){return v.reduce(function(C,B){const I=C.length-1>=0?C[C.length-1]:null;return I&&I.mode===B.mode?(C[C.length-1].data+=B.data,C):(C.push(B),C)},[])}function S(v){const C=[];for(let B=0;B<v.length;B++){const I=v[B];switch(I.mode){case e.NUMERIC:C.push([I,{data:I.data,mode:e.ALPHANUMERIC,length:I.length},{data:I.data,mode:e.BYTE,length:I.length}]);break;case e.ALPHANUMERIC:C.push([I,{data:I.data,mode:e.BYTE,length:I.length}]);break;case e.KANJI:C.push([I,{data:I.data,mode:e.BYTE,length:c(I.data)}]);break;case e.BYTE:C.push([{data:I.data,mode:e.BYTE,length:c(I.data)}])}}return C}function R(v,C){const B={},I={start:{}};let N=["start"];for(let g=0;g<v.length;g++){const w=v[g],b=[];for(let h=0;h<w.length;h++){const A=w[h],p=""+g+h;b.push(p),B[p]={node:A,lastCount:0},I[p]={};for(let E=0;E<N.length;E++){const y=N[E];B[y]&&B[y].node.mode===A.mode?(I[y][p]=f(B[y].lastCount+A.length,A.mode)-f(B[y].lastCount,A.mode),B[y].lastCount+=A.length):(B[y]&&(B[y].lastCount=A.length),I[y][p]=f(A.length,A.mode)+4+e.getCharCountIndicator(A.mode,C))}}N=b}for(let g=0;g<N.length;g++)I[N[g]].end=0;return{map:I,table:B}}function M(v,C){let B;const I=e.getBestModeForData(v);if(B=e.from(C,I),B!==e.BYTE&&B.bit<I.bit)throw new Error('"'+v+'" cannot be encoded with mode '+e.toString(B)+`.
 Suggested mode is: `+e.toString(I));switch(B===e.KANJI&&!l.isKanjiModeEnabled()&&(B=e.BYTE),B){case e.NUMERIC:return new i(v);case e.ALPHANUMERIC:return new n(v);case e.KANJI:return new r(v);case e.BYTE:return new t(v)}}o.fromArray=function(C){return C.reduce(function(B,I){return typeof I=="string"?B.push(M(I,null)):I.data&&B.push(M(I.data,I.mode)),B},[])},o.fromString=function(C,B){const I=m(C,l.isKanjiModeEnabled()),N=S(I),g=R(N,B),w=a.find_path(g.map,"start","end"),b=[];for(let h=1;h<w.length-1;h++)b.push(g.table[w[h]].node);return o.fromArray(u(b))},o.rawSplit=function(C){return o.fromArray(m(C,l.isKanjiModeEnabled()))}})(ue)),ue}var je;function Nt(){if(je)return Z;je=1;const o=V(),e=ve(),i=gt(),n=mt(),t=pt(),r=yt(),s=vt(),l=$e(),a=Et(),c=Ct(),d=It(),m=_(),f=Mt();function u(g,w){const b=g.size,h=r.getPositions(w);for(let A=0;A<h.length;A++){const p=h[A][0],E=h[A][1];for(let y=-1;y<=7;y++)if(!(p+y<=-1||b<=p+y))for(let T=-1;T<=7;T++)E+T<=-1||b<=E+T||(y>=0&&y<=6&&(T===0||T===6)||T>=0&&T<=6&&(y===0||y===6)||y>=2&&y<=4&&T>=2&&T<=4?g.set(p+y,E+T,!0,!0):g.set(p+y,E+T,!1,!0))}}function S(g){const w=g.size;for(let b=8;b<w-8;b++){const h=b%2===0;g.set(b,6,h,!0),g.set(6,b,h,!0)}}function R(g,w){const b=t.getPositions(w);for(let h=0;h<b.length;h++){const A=b[h][0],p=b[h][1];for(let E=-2;E<=2;E++)for(let y=-2;y<=2;y++)E===-2||E===2||y===-2||y===2||E===0&&y===0?g.set(A+E,p+y,!0,!0):g.set(A+E,p+y,!1,!0)}}function M(g,w){const b=g.size,h=c.getEncodedBits(w);let A,p,E;for(let y=0;y<18;y++)A=Math.floor(y/3),p=y%3+b-8-3,E=(h>>y&1)===1,g.set(A,p,E,!0),g.set(p,A,E,!0)}function v(g,w,b){const h=g.size,A=d.getEncodedBits(w,b);let p,E;for(p=0;p<15;p++)E=(A>>p&1)===1,p<6?g.set(p,8,E,!0):p<8?g.set(p+1,8,E,!0):g.set(h-15+p,8,E,!0),p<8?g.set(8,h-p-1,E,!0):p<9?g.set(8,15-p-1+1,E,!0):g.set(8,15-p-1,E,!0);g.set(h-8,8,1,!0)}function C(g,w){const b=g.size;let h=-1,A=b-1,p=7,E=0;for(let y=b-1;y>0;y-=2)for(y===6&&y--;;){for(let T=0;T<2;T++)if(!g.isReserved(A,y-T)){let D=!1;E<w.length&&(D=(w[E]>>>p&1)===1),g.set(A,y-T,D),p--,p===-1&&(E++,p=7)}if(A+=h,A<0||b<=A){A-=h,h=-h;break}}}function B(g,w,b){const h=new i;b.forEach(function(T){h.put(T.mode.bit,4),h.put(T.getLength(),m.getCharCountIndicator(T.mode,g)),T.write(h)});const A=o.getSymbolTotalCodewords(g),p=l.getTotalCodewordsCount(g,w),E=(A-p)*8;for(h.getLengthInBits()+4<=E&&h.put(0,4);h.getLengthInBits()%8!==0;)h.putBit(0);const y=(E-h.getLengthInBits())/8;for(let T=0;T<y;T++)h.put(T%2?17:236,8);return I(h,g,w)}function I(g,w,b){const h=o.getSymbolTotalCodewords(w),A=l.getTotalCodewordsCount(w,b),p=h-A,E=l.getBlocksCount(w,b),y=h%E,T=E-y,D=Math.floor(h/E),O=Math.floor(p/E),rt=O+1,be=D-O,it=new a(be);let Y=0;const K=new Array(E),we=new Array(E);let J=0;const ot=new Uint8Array(g.buffer);for(let k=0;k<E;k++){const G=k<T?O:rt;K[k]=ot.slice(Y,Y+G),we[k]=it.encode(K[k]),Y+=G,J=Math.max(J,G)}const j=new Uint8Array(h);let Ee=0,L,q;for(L=0;L<J;L++)for(q=0;q<E;q++)L<K[q].length&&(j[Ee++]=K[q][L]);for(L=0;L<be;L++)for(q=0;q<E;q++)j[Ee++]=we[q][L];return j}function N(g,w,b,h){let A;if(Array.isArray(g))A=f.fromArray(g);else if(typeof g=="string"){let D=w;if(!D){const O=f.rawSplit(g);D=c.getBestVersionForData(O,b)}A=f.fromString(g,D||40)}else throw new Error("Invalid data");const p=c.getBestVersionForData(A,b);if(!p)throw new Error("The amount of data is too big to be stored in a QR Code");if(!w)w=p;else if(w<p)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+p+`.
`);const E=B(w,b,A),y=o.getSymbolSize(w),T=new n(y);return u(T,w),S(T),R(T,w),v(T,b,0),w>=7&&M(T,w),C(T,E),isNaN(h)&&(h=s.getBestMask(T,v.bind(null,T,b))),s.applyMask(h,T),v(T,b,h),{modules:T,version:w,errorCorrectionLevel:b,maskPattern:h,segments:A}}return Z.create=function(w,b){if(typeof w>"u"||w==="")throw new Error("No input text");let h=e.M,A,p;return typeof b<"u"&&(h=e.from(b.errorCorrectionLevel,e.M),A=c.from(b.version),p=s.from(b.maskPattern),b.toSJISFunc&&o.setToSJISFunction(b.toSJISFunc)),N(w,A,h,p)},Z}var me={},pe={},Ge;function nt(){return Ge||(Ge=1,(function(o){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let n=i.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+i);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}o.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:r,scale:r?4:s,margin:t,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},o.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},o.getImageWidth=function(n,t){const r=o.getScale(n,t);return Math.floor((n+t.margin*2)*r)},o.qrToImageData=function(n,t,r){const s=t.modules.size,l=t.modules.data,a=o.getScale(s,r),c=Math.floor((s+r.margin*2)*a),d=r.margin*a,m=[r.color.light,r.color.dark];for(let f=0;f<c;f++)for(let u=0;u<c;u++){let S=(f*c+u)*4,R=r.color.light;if(f>=d&&u>=d&&f<c-d&&u<c-d){const M=Math.floor((f-d)/a),v=Math.floor((u-d)/a);R=m[l[M*s+v]?1:0]}n[S++]=R.r,n[S++]=R.g,n[S++]=R.b,n[S]=R.a}}})(pe)),pe}var xe;function Pt(){return xe||(xe=1,(function(o){const e=nt();function i(t,r,s){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}o.render=function(r,s,l){let a=l,c=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(c=n()),a=e.getOptions(a);const d=e.getImageWidth(r.modules.size,a),m=c.getContext("2d"),f=m.createImageData(d,d);return e.qrToImageData(f.data,r,a),i(m,c,d),m.putImageData(f,0,0),c},o.renderToDataURL=function(r,s,l){let a=l;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const c=o.render(r,s,a),d=a.type||"image/png",m=a.rendererOpts||{};return c.toDataURL(d,m.quality)}})(me)),me}var ye={},Ze;function Lt(){if(Ze)return ye;Ze=1;const o=nt();function e(t,r){const s=t.a/255,l=r+'="'+t.hex+'"';return s<1?l+" "+r+'-opacity="'+s.toFixed(2).slice(1)+'"':l}function i(t,r,s){let l=t+r;return typeof s<"u"&&(l+=" "+s),l}function n(t,r,s){let l="",a=0,c=!1,d=0;for(let m=0;m<t.length;m++){const f=Math.floor(m%r),u=Math.floor(m/r);!f&&!c&&(c=!0),t[m]?(d++,m>0&&f>0&&t[m-1]||(l+=c?i("M",f+s,.5+u+s):i("m",a,0),a=0,c=!1),f+1<r&&t[m+1]||(l+=i("h",d),d=0)):a++}return l}return ye.render=function(r,s,l){const a=o.getOptions(s),c=r.modules.size,d=r.modules.data,m=c+a.margin*2,f=a.color.light.a?"<path "+e(a.color.light,"fill")+' d="M0 0h'+m+"v"+m+'H0z"/>':"",u="<path "+e(a.color.dark,"stroke")+' d="'+n(d,c,a.margin)+'"/>',S='viewBox="0 0 '+m+" "+m+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+S+' shape-rendering="crispEdges">'+f+u+`</svg>
`;return typeof l=="function"&&l(null,M),M},ye}var We;function qt(){if(We)return z;We=1;const o=ht(),e=Nt(),i=Pt(),n=Lt();function t(r,s,l,a,c){const d=[].slice.call(arguments,1),m=d.length,f=typeof d[m-1]=="function";if(!f&&!o())throw new Error("Callback required as last argument");if(f){if(m<2)throw new Error("Too few arguments provided");m===2?(c=l,l=s,s=a=void 0):m===3&&(s.getContext&&typeof c>"u"?(c=a,a=void 0):(c=a,a=l,l=s,s=void 0))}else{if(m<1)throw new Error("Too few arguments provided");return m===1?(l=s,s=a=void 0):m===2&&!s.getContext&&(a=l,l=s,s=void 0),new Promise(function(u,S){try{const R=e.create(l,a);u(r(R,s,a))}catch(R){S(R)}})}try{const u=e.create(l,a);c(null,r(u,s,a))}catch(u){c(u)}}return z.create=e.create,z.toCanvas=t.bind(null,i.render),z.toDataURL=t.bind(null,i.renderToDataURL),z.toString=t.bind(null,function(r,s,l){return n.render(r,l)}),z}var Dt=qt();const Ut=ft(Dt);class Ft{constructor(e){F(this,"onRestart",null);this.onRestart=e||null}getTitle(){return"Generate QR Code"}render(e){var m,f;const i=document.createElement("div");i.className="step-container result-step";const n={iban:e.iban.replace(/\s/g,"")};(m=e.billerVAT)!=null&&m.trim()&&(n.billerVAT=e.billerVAT.replace(/\s/g,"")),(f=e.billerIdentificationNumber)!=null&&f.trim()&&(n.billerIdentificationNumber=e.billerIdentificationNumber.trim()),e.creditorReference?n.creditorReference=e.creditorReference.replace(/\s/g,""):e.remittanceInfo&&(n.remittanceInfo=e.remittanceInfo),e.amount&&(n.amount=e.amount),e.language&&(n.language=e.language),e.size&&(n.size=e.size),e.paymentInternalId&&(n.paymentInternalId=e.paymentInternalId),e.multiple!==void 0&&(n.multiple=e.multiple),e.paymentMethod&&(n.paymentMethod=e.paymentMethod),e.allowedPaymentMethods&&(n.allowedPaymentMethods=e.allowedPaymentMethods);const t=dt(n,e.environment||"test");i.innerHTML=`
      <h2>${this.getTitle()}</h2>
      <p class="step-description">Review and generate your QR code</p>

      <div id="summary" class="summary-box">
        <h3>Summary</h3>
        <dl>
          <dt>IBAN:</dt>
          <dd>${e.iban}</dd>
          ${e.billerVAT?`<dt>Biller VAT:</dt><dd>${e.billerVAT}</dd>`:""}
          ${e.billerIdentificationNumber?`<dt>Biller ID:</dt><dd>${e.billerIdentificationNumber}</dd>`:""}
          ${e.amount?`<dt>Amount:</dt><dd>${e.amount} EUR</dd>`:""}
          ${e.creditorReference?`<dt>Reference:</dt><dd>${e.creditorReference}</dd>`:""}
          ${e.remittanceInfo?`<dt>Message:</dt><dd>${e.remittanceInfo}</dd>`:""}
          ${e.language?`<dt>Language:</dt><dd>${e.language.toUpperCase()}</dd>`:""}
          ${e.multiple?"<dt>Multiple Payments:</dt><dd>Yes</dd>":""}
          ${e.paymentInternalId?`<dt>Payment ID:</dt><dd>${e.paymentInternalId}</dd>`:""}
          ${e.paymentMethod?`<dt>Payment Method:</dt><dd>${e.paymentMethod}</dd>`:""}
          ${e.allowedPaymentMethods?`<dt>Allowed Methods:</dt><dd>${e.allowedPaymentMethods}</dd>`:""}
        </dl>
      </div>

      <div class="url-preview-box">
        <h3>Payment URL</h3>
        <div class="url-display">
          <code id="api-url">${t}</code>
          <button id="copy-url-btn" class="btn btn-secondary" title="Copy URL">Copy</button>
        </div>
        <small>This URL will be encoded into a QR code</small>
      </div>

      <div class="action-buttons">
        <button id="generate-btn" class="btn btn-primary">
          Generate QR Code
        </button>
      </div>

      <div id="loading" class="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Generating QR code...</p>
      </div>

      <div id="result" class="result-container" style="display: none;">
        <h3>Your QR Code</h3>
        <div id="qr-preview" class="qr-preview"></div>
        <div class="result-actions">
          <button id="download-btn" class="btn btn-success">Download QR Code</button>
          <button id="restart-btn" class="btn btn-secondary">Generate Another</button>
        </div>
      </div>

      <div id="error" class="error-box" style="display: none;"></div>
    `;const r=i.querySelector("#copy-url-btn");r.addEventListener("click",()=>{navigator.clipboard.writeText(t).then(()=>{const u=r.textContent;r.textContent="Copied!",r.classList.add("btn-success"),r.classList.remove("btn-secondary"),setTimeout(()=>{r.textContent=u,r.classList.remove("btn-success"),r.classList.add("btn-secondary")},2e3)}).catch(u=>{console.error("Failed to copy URL:",u),alert("Failed to copy URL to clipboard")})});const s=i.querySelector("#generate-btn"),l=i.querySelector("#loading"),a=i.querySelector("#result"),c=i.querySelector("#error"),d=i.querySelector("#qr-preview");return s.addEventListener("click",async()=>{s.disabled=!0,l.style.display="block",a.style.display="none",c.style.display="none";try{const u=document.createElement("canvas");await Ut.toCanvas(u,t,{width:e.size||400,margin:2,color:{dark:"#000000",light:"#FFFFFF"}}),d.innerHTML="",d.appendChild(u),l.style.display="none",a.style.display="block",s.style.display="none",i.querySelector("#download-btn").addEventListener("click",()=>{u.toBlob(M=>{if(M){const v=URL.createObjectURL(M),C=document.createElement("a");C.href=v,C.download=`qr-code-${new Date().toISOString().split("T")[0]}.png`,document.body.appendChild(C),C.click(),document.body.removeChild(C),URL.revokeObjectURL(v)}})}),i.querySelector("#restart-btn").addEventListener("click",()=>{this.onRestart&&this.onRestart()})}catch(u){l.style.display="none",s.disabled=!1,c.style.display="block",c.innerHTML=`
            <h4>Error Generating QR Code</h4>
            <p>${u instanceof Error?u.message:"An unknown error occurred"}</p>
          `}}),i}validate(e){return{valid:!0,errors:[]}}collectData(e){return{}}}class Vt{constructor(e){F(this,"currentStep",0);F(this,"data",{environment:"test"});F(this,"steps",[]);F(this,"container");F(this,"currentStepContainer",null);const i=document.getElementById(e);if(!i)throw new Error(`Container with id "${e}" not found`);this.container=i,this.steps=[new at,new Ft(()=>this.restart())],this.render()}render(){this.container.innerHTML="";const e=document.createElement("div");e.className="wizard";const i=this.createProgressIndicator();e.appendChild(i);const n=document.createElement("div");n.className="wizard-content",n.id="step-content",e.appendChild(n);const t=this.createNavigation();e.appendChild(t),this.container.appendChild(e),this.renderStep()}createProgressIndicator(){const e=document.createElement("div");return e.className="wizard-progress",this.steps.forEach((i,n)=>{const t=document.createElement("div");t.className="progress-step",n===this.currentStep?t.classList.add("active"):n<this.currentStep&&t.classList.add("completed"),t.innerHTML=`
        <div class="step-number">${n+1}</div>
        <div class="step-title">${i.getTitle()}</div>
      `,e.appendChild(t)}),e}createNavigation(){const e=document.createElement("div");e.className="wizard-navigation";const i=document.createElement("button");i.id="prev-btn",i.className="btn btn-secondary",i.textContent="Previous",i.disabled=this.currentStep===0,i.addEventListener("click",()=>this.previous());const n=document.createElement("button");return n.id="next-btn",n.className="btn btn-primary",n.textContent=this.currentStep===this.steps.length-1?"Finish":"Next",n.addEventListener("click",()=>this.next()),this.currentStep===this.steps.length-1&&(n.style.display="none"),e.appendChild(i),e.appendChild(n),e}renderStep(){const e=document.getElementById("step-content");if(!e)return;e.innerHTML="";const i=this.steps[this.currentStep];this.currentStepContainer=i.render(this.data),e.appendChild(this.currentStepContainer)}next(){if(this.currentStepContainer){const e=this.steps[this.currentStep],i=e.collectData(this.currentStepContainer);this.data={...this.data,...i};const n=e.validate(this.data);if(!n.valid){this.showErrors(n.errors);return}}this.currentStep<this.steps.length-1&&(this.currentStep++,this.render())}previous(){if(this.currentStepContainer){const i=this.steps[this.currentStep].collectData(this.currentStepContainer);this.data={...this.data,...i}}this.currentStep>0&&(this.currentStep--,this.render())}showErrors(e){const i=document.querySelector(".validation-errors");i&&i.remove();const n=document.createElement("div");n.className="validation-errors",n.innerHTML=`
      <h4>Please fix the following errors:</h4>
      <ul>
        ${e.map(r=>`<li>${r}</li>`).join("")}
      </ul>
    `;const t=document.getElementById("step-content");t&&t.firstChild&&t.insertBefore(n,t.firstChild),t==null||t.scrollIntoView({behavior:"smooth"})}restart(){this.currentStep=0,this.data={environment:"test"},this.render()}getData(){return this.data}setEnvironment(e){this.data.environment=e}getEnvironment(){return this.data.environment||"test"}}const Xe={test:"https://test.digiteal.eu",production:"https://app.digiteal.eu"};document.addEventListener("DOMContentLoaded",()=>{const o=new Vt("wizard-container");((t,r)=>{const s=document.getElementById(t),l=document.getElementById(r);s&&l&&s.addEventListener("click",()=>{s.classList.toggle("collapsed"),l.classList.toggle("collapsed")})})("env-toggle","env-content");const i=document.getElementById("env-select"),n=document.getElementById("env-url");if(i&&n){const t=o.getEnvironment();i.value=t,n.textContent=Xe[t],i.addEventListener("change",()=>{const r=i.value;o.setEnvironment(r),n.textContent=Xe[r]})}});
