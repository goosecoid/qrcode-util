var ct=Object.defineProperty;var ut=(o,e,i)=>e in o?ct(o,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[e]=i;var U=(o,e,i)=>ut(o,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=i(t);fetch(t.href,r)}})();function Ie(o){const e=o.replace(/\s/g,"").toUpperCase();if(!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(e))return!1;const n=(e.slice(4)+e.slice(0,4)).replace(/[A-Z]/g,r=>(r.charCodeAt(0)-55).toString());let t=n.slice(0,2);for(let r=2;r<n.length;r+=7)t=(parseInt(t+n.slice(r,r+7),10)%97).toString();return parseInt(t,10)===1}function Ae(o){return/^[A-Z]{2}[A-Z0-9]{2,12}$/.test(o.replace(/\s/g,"").toUpperCase())}class dt{getTitle(){return"Payment Information"}render(e){const i=document.createElement("div");i.className="step-container",i.innerHTML=`
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
    `;const n=i.querySelector('input[value="structured"]'),t=i.querySelector('input[value="unstructured"]'),r=i.querySelector("#structured-field"),s=i.querySelector("#unstructured-field"),l=()=>{n.checked?(r.style.display="block",s.style.display="none"):(r.style.display="none",s.style.display="block")};n.addEventListener("change",l),t.addEventListener("change",l);const a=i.querySelector("#iban"),c=i.querySelector("#iban-error");a.addEventListener("blur",()=>{a.value&&!Ie(a.value)?(c.textContent="Invalid IBAN format",a.classList.add("invalid")):(c.textContent="",a.classList.remove("invalid"))});const u=i.querySelector("#billerVAT"),p=i.querySelector("#billerVAT-error");u.addEventListener("blur",()=>{u.value&&!Ae(u.value)?(p.textContent="Invalid VAT format (should include country code)",u.classList.add("invalid")):(p.textContent="",u.classList.remove("invalid"))});const h=i.querySelector("#size"),d=i.querySelector("#size-value");return h.addEventListener("input",()=>{d.textContent=h.value}),i}validate(e){var n,t,r,s,l,a,c,u,p,h;const i=[];return(n=e.iban)!=null&&n.trim()?Ie(e.iban)||i.push("Invalid IBAN format"):i.push("IBAN is required"),!((t=e.billerVAT)!=null&&t.trim())&&!((r=e.billerIdentificationNumber)!=null&&r.trim())&&i.push("Either Biller VAT or Biller Identification Number is required"),(s=e.billerVAT)!=null&&s.trim()&&!Ae(e.billerVAT)&&i.push("Invalid VAT format"),!((l=e.creditorReference)!=null&&l.trim())&&!((a=e.remittanceInfo)!=null&&a.trim())&&i.push("Either structured reference or unstructured message is required"),(!((u=(c=e.credentials)==null?void 0:c.username)!=null&&u.trim())||!((h=(p=e.credentials)==null?void 0:p.password)!=null&&h.trim()))&&i.push("API credentials (username and password) are required. Please fill them in the header."),{valid:i.length===0,errors:i}}collectData(e){var M,w,g;const i=e.querySelector("#iban").value.trim(),n=e.querySelector("#billerVAT").value.trim(),t=e.querySelector("#billerIdentificationNumber").value.trim(),r=e.querySelector("#amount").value,s=r?parseFloat(r):void 0,l=(M=e.querySelector('input[name="communicationType"]:checked'))==null?void 0:M.value,a=(w=e.querySelector("#creditorReference"))==null?void 0:w.value.trim(),c=(g=e.querySelector("#remittanceInfo"))==null?void 0:g.value.trim(),u=e.querySelector("#language").value||void 0,p=e.querySelector("#multiple").checked,h=e.querySelector("#paymentInternalId").value.trim()||void 0,d=e.querySelector("#paymentMethod").value||void 0,R=e.querySelector("#allowedPaymentMethods").value.trim()||void 0,B=parseInt(e.querySelector("#size").value,10);return{iban:i,billerVAT:n,billerIdentificationNumber:t,amount:s,communicationType:l,creditorReference:l==="structured"?a:void 0,remittanceInfo:l==="unstructured"?c:void 0,language:u,multiple:p,paymentInternalId:h,paymentMethod:d,allowedPaymentMethods:R,size:B}}}const et={test:"https://test.digiteal.eu",production:"https://app.digiteal.eu"};function ft(o){return et[o]}class x extends Error{constructor(e,i){super(e),this.statusCode=i,this.name="QRCodeApiError"}}function tt(o,e="test"){const i=et[e],n=new URL("/api/v1/payment-request/pay-button/execute",i);if(o.iban&&n.searchParams.append("iban",o.iban),o.billerVAT&&n.searchParams.append("requesterVAT",o.billerVAT),o.billerIdentificationNumber&&n.searchParams.append("requesterIdentificationNumber",o.billerIdentificationNumber),o.amount){const t=Math.round(o.amount*100);n.searchParams.append("amountInCents",String(t))}return o.creditorReference?n.searchParams.append("creditorReference",o.creditorReference):o.remittanceInfo&&n.searchParams.append("remittanceInfo",o.remittanceInfo),o.language&&n.searchParams.append("language",o.language.toUpperCase()),o.multiple!==void 0&&n.searchParams.append("multiple",String(o.multiple)),o.paymentInternalId&&n.searchParams.append("paymentInternalId",o.paymentInternalId),o.paymentMethod&&n.searchParams.append("paymentMethod",o.paymentMethod),o.allowedPaymentMethods&&n.searchParams.append("allowedPaymentMethods",o.allowedPaymentMethods),n.toString()}async function ht(o,e,i,n){const r=`${ft(e)}/api/v1/shortLink`,s="Basic "+btoa(`${i}:${n}`);try{const l=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:s},body:JSON.stringify({longURL:o})});if(!l.ok){let c=`Failed to create short link (${l.status})`;try{c=(await l.json()).message||c}catch{const u=await l.text();u&&(c=u)}throw new x(c,l.status)}return(await l.json()).shortURL}catch(l){throw l instanceof x?l:l instanceof TypeError?new x("Network error: Please check your connection"):new x(`Unexpected error: ${l instanceof Error?l.message:"Unknown error"}`)}}async function gt(o,e,i,n){const t=tt(o,e);return await ht(t,e,i,n)}function mt(o,e="test"){return tt(o,e)}function pt(o){return o&&o.__esModule&&Object.prototype.hasOwnProperty.call(o,"default")?o.default:o}var z={},Z,Se;function yt(){return Se||(Se=1,Z=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),Z}var W={},k={},Re;function V(){if(Re)return k;Re=1;let o;const e=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return k.getSymbolSize=function(n){if(!n)throw new Error('"version" cannot be null or undefined');if(n<1||n>40)throw new Error('"version" should be in range from 1 to 40');return n*4+17},k.getSymbolTotalCodewords=function(n){return e[n]},k.getBCHDigit=function(i){let n=0;for(;i!==0;)n++,i>>>=1;return n},k.setToSJISFunction=function(n){if(typeof n!="function")throw new Error('"toSJISFunc" is not a valid function.');o=n},k.isKanjiModeEnabled=function(){return typeof o<"u"},k.toSJIS=function(n){return o(n)},k}var $={},Be;function ve(){return Be||(Be=1,(function(o){o.L={bit:1},o.M={bit:0},o.Q={bit:3},o.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return o.L;case"m":case"medium":return o.M;case"q":case"quartile":return o.Q;case"h":case"high":return o.H;default:throw new Error("Unknown EC Level: "+i)}}o.isValid=function(n){return n&&typeof n.bit<"u"&&n.bit>=0&&n.bit<4},o.from=function(n,t){if(o.isValid(n))return n;try{return e(n)}catch{return t}}})($)),$}var X,Te;function bt(){if(Te)return X;Te=1;function o(){this.buffer=[],this.length=0}return o.prototype={get:function(e){const i=Math.floor(e/8);return(this.buffer[i]>>>7-e%8&1)===1},put:function(e,i){for(let n=0;n<i;n++)this.putBit((e>>>i-n-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(e){const i=Math.floor(this.length/8);this.buffer.length<=i&&this.buffer.push(0),e&&(this.buffer[i]|=128>>>this.length%8),this.length++}},X=o,X}var ee,Me;function vt(){if(Me)return ee;Me=1;function o(e){if(!e||e<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=e,this.data=new Uint8Array(e*e),this.reservedBit=new Uint8Array(e*e)}return o.prototype.set=function(e,i,n,t){const r=e*this.size+i;this.data[r]=n,t&&(this.reservedBit[r]=!0)},o.prototype.get=function(e,i){return this.data[e*this.size+i]},o.prototype.xor=function(e,i,n){this.data[e*this.size+i]^=n},o.prototype.isReserved=function(e,i){return this.reservedBit[e*this.size+i]},ee=o,ee}var te={},Pe;function wt(){return Pe||(Pe=1,(function(o){const e=V().getSymbolSize;o.getRowColCoords=function(n){if(n===1)return[];const t=Math.floor(n/7)+2,r=e(n),s=r===145?26:Math.ceil((r-13)/(2*t-2))*2,l=[r-7];for(let a=1;a<t-1;a++)l[a]=l[a-1]-s;return l.push(6),l.reverse()},o.getPositions=function(n){const t=[],r=o.getRowColCoords(n),s=r.length;for(let l=0;l<s;l++)for(let a=0;a<s;a++)l===0&&a===0||l===0&&a===s-1||l===s-1&&a===0||t.push([r[l],r[a]]);return t}})(te)),te}var ne={},Ne;function Ct(){if(Ne)return ne;Ne=1;const o=V().getSymbolSize,e=7;return ne.getPositions=function(n){const t=o(n);return[[0,0],[t-e,0],[0,t-e]]},ne}var re={},Le;function Et(){return Le||(Le=1,(function(o){o.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};o.isValid=function(t){return t!=null&&t!==""&&!isNaN(t)&&t>=0&&t<=7},o.from=function(t){return o.isValid(t)?parseInt(t,10):void 0},o.getPenaltyN1=function(t){const r=t.size;let s=0,l=0,a=0,c=null,u=null;for(let p=0;p<r;p++){l=a=0,c=u=null;for(let h=0;h<r;h++){let d=t.get(p,h);d===c?l++:(l>=5&&(s+=e.N1+(l-5)),c=d,l=1),d=t.get(h,p),d===u?a++:(a>=5&&(s+=e.N1+(a-5)),u=d,a=1)}l>=5&&(s+=e.N1+(l-5)),a>=5&&(s+=e.N1+(a-5))}return s},o.getPenaltyN2=function(t){const r=t.size;let s=0;for(let l=0;l<r-1;l++)for(let a=0;a<r-1;a++){const c=t.get(l,a)+t.get(l,a+1)+t.get(l+1,a)+t.get(l+1,a+1);(c===4||c===0)&&s++}return s*e.N2},o.getPenaltyN3=function(t){const r=t.size;let s=0,l=0,a=0;for(let c=0;c<r;c++){l=a=0;for(let u=0;u<r;u++)l=l<<1&2047|t.get(c,u),u>=10&&(l===1488||l===93)&&s++,a=a<<1&2047|t.get(u,c),u>=10&&(a===1488||a===93)&&s++}return s*e.N3},o.getPenaltyN4=function(t){let r=0;const s=t.data.length;for(let a=0;a<s;a++)r+=t.data[a];return Math.abs(Math.ceil(r*100/s/5)-10)*e.N4};function i(n,t,r){switch(n){case o.Patterns.PATTERN000:return(t+r)%2===0;case o.Patterns.PATTERN001:return t%2===0;case o.Patterns.PATTERN010:return r%3===0;case o.Patterns.PATTERN011:return(t+r)%3===0;case o.Patterns.PATTERN100:return(Math.floor(t/2)+Math.floor(r/3))%2===0;case o.Patterns.PATTERN101:return t*r%2+t*r%3===0;case o.Patterns.PATTERN110:return(t*r%2+t*r%3)%2===0;case o.Patterns.PATTERN111:return(t*r%3+(t+r)%2)%2===0;default:throw new Error("bad maskPattern:"+n)}}o.applyMask=function(t,r){const s=r.size;for(let l=0;l<s;l++)for(let a=0;a<s;a++)r.isReserved(a,l)||r.xor(a,l,i(t,a,l))},o.getBestMask=function(t,r){const s=Object.keys(o.Patterns).length;let l=0,a=1/0;for(let c=0;c<s;c++){r(c),o.applyMask(c,t);const u=o.getPenaltyN1(t)+o.getPenaltyN2(t)+o.getPenaltyN3(t)+o.getPenaltyN4(t);o.applyMask(c,t),u<a&&(a=u,l=c)}return l}})(re)),re}var K={},qe;function nt(){if(qe)return K;qe=1;const o=ve(),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],i=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return K.getBlocksCount=function(t,r){switch(r){case o.L:return e[(t-1)*4+0];case o.M:return e[(t-1)*4+1];case o.Q:return e[(t-1)*4+2];case o.H:return e[(t-1)*4+3];default:return}},K.getTotalCodewordsCount=function(t,r){switch(r){case o.L:return i[(t-1)*4+0];case o.M:return i[(t-1)*4+1];case o.Q:return i[(t-1)*4+2];case o.H:return i[(t-1)*4+3];default:return}},K}var ie={},H={},De;function It(){if(De)return H;De=1;const o=new Uint8Array(512),e=new Uint8Array(256);return(function(){let n=1;for(let t=0;t<255;t++)o[t]=n,e[n]=t,n<<=1,n&256&&(n^=285);for(let t=255;t<512;t++)o[t]=o[t-255]})(),H.log=function(n){if(n<1)throw new Error("log("+n+")");return e[n]},H.exp=function(n){return o[n]},H.mul=function(n,t){return n===0||t===0?0:o[e[n]+e[t]]},H}var Ue;function At(){return Ue||(Ue=1,(function(o){const e=It();o.mul=function(n,t){const r=new Uint8Array(n.length+t.length-1);for(let s=0;s<n.length;s++)for(let l=0;l<t.length;l++)r[s+l]^=e.mul(n[s],t[l]);return r},o.mod=function(n,t){let r=new Uint8Array(n);for(;r.length-t.length>=0;){const s=r[0];for(let a=0;a<t.length;a++)r[a]^=e.mul(t[a],s);let l=0;for(;l<r.length&&r[l]===0;)l++;r=r.slice(l)}return r},o.generateECPolynomial=function(n){let t=new Uint8Array([1]);for(let r=0;r<n;r++)t=o.mul(t,new Uint8Array([1,e.exp(r)]));return t}})(ie)),ie}var oe,ke;function St(){if(ke)return oe;ke=1;const o=At();function e(i){this.genPoly=void 0,this.degree=i,this.degree&&this.initialize(this.degree)}return e.prototype.initialize=function(n){this.degree=n,this.genPoly=o.generateECPolynomial(this.degree)},e.prototype.encode=function(n){if(!this.genPoly)throw new Error("Encoder not initialized");const t=new Uint8Array(n.length+this.degree);t.set(n);const r=o.mod(t,this.genPoly),s=this.degree-r.length;if(s>0){const l=new Uint8Array(this.degree);return l.set(r,s),l}return r},oe=e,oe}var se={},le={},ae={},Ve;function rt(){return Ve||(Ve=1,ae.isValid=function(e){return!isNaN(e)&&e>=1&&e<=40}),ae}var N={},Fe;function it(){if(Fe)return N;Fe=1;const o="[0-9]+",e="[A-Z $%*+\\-./:]+";let i="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";i=i.replace(/u/g,"\\u");const n="(?:(?![A-Z0-9 $%*+\\-./:]|"+i+`)(?:.|[\r
]))+`;N.KANJI=new RegExp(i,"g"),N.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),N.BYTE=new RegExp(n,"g"),N.NUMERIC=new RegExp(o,"g"),N.ALPHANUMERIC=new RegExp(e,"g");const t=new RegExp("^"+i+"$"),r=new RegExp("^"+o+"$"),s=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return N.testKanji=function(a){return t.test(a)},N.testNumeric=function(a){return r.test(a)},N.testAlphanumeric=function(a){return s.test(a)},N}var _e;function F(){return _e||(_e=1,(function(o){const e=rt(),i=it();o.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},o.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},o.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},o.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},o.MIXED={bit:-1},o.getCharCountIndicator=function(r,s){if(!r.ccBits)throw new Error("Invalid mode: "+r);if(!e.isValid(s))throw new Error("Invalid version: "+s);return s>=1&&s<10?r.ccBits[0]:s<27?r.ccBits[1]:r.ccBits[2]},o.getBestModeForData=function(r){return i.testNumeric(r)?o.NUMERIC:i.testAlphanumeric(r)?o.ALPHANUMERIC:i.testKanji(r)?o.KANJI:o.BYTE},o.toString=function(r){if(r&&r.id)return r.id;throw new Error("Invalid mode")},o.isValid=function(r){return r&&r.bit&&r.ccBits};function n(t){if(typeof t!="string")throw new Error("Param is not a string");switch(t.toLowerCase()){case"numeric":return o.NUMERIC;case"alphanumeric":return o.ALPHANUMERIC;case"kanji":return o.KANJI;case"byte":return o.BYTE;default:throw new Error("Unknown mode: "+t)}}o.from=function(r,s){if(o.isValid(r))return r;try{return n(r)}catch{return s}}})(le)),le}var ze;function Rt(){return ze||(ze=1,(function(o){const e=V(),i=nt(),n=ve(),t=F(),r=rt(),s=7973,l=e.getBCHDigit(s);function a(h,d,R){for(let B=1;B<=40;B++)if(d<=o.getCapacity(B,R,h))return B}function c(h,d){return t.getCharCountIndicator(h,d)+4}function u(h,d){let R=0;return h.forEach(function(B){const M=c(B.mode,d);R+=M+B.getBitsLength()}),R}function p(h,d){for(let R=1;R<=40;R++)if(u(h,R)<=o.getCapacity(R,d,t.MIXED))return R}o.from=function(d,R){return r.isValid(d)?parseInt(d,10):R},o.getCapacity=function(d,R,B){if(!r.isValid(d))throw new Error("Invalid QR Code version");typeof B>"u"&&(B=t.BYTE);const M=e.getSymbolTotalCodewords(d),w=i.getTotalCodewordsCount(d,R),g=(M-w)*8;if(B===t.MIXED)return g;const A=g-c(B,d);switch(B){case t.NUMERIC:return Math.floor(A/10*3);case t.ALPHANUMERIC:return Math.floor(A/11*2);case t.KANJI:return Math.floor(A/13);case t.BYTE:default:return Math.floor(A/8)}},o.getBestVersionForData=function(d,R){let B;const M=n.from(R,n.M);if(Array.isArray(d)){if(d.length>1)return p(d,M);if(d.length===0)return 1;B=d[0]}else B=d;return a(B.mode,B.getLength(),M)},o.getEncodedBits=function(d){if(!r.isValid(d)||d<7)throw new Error("Invalid QR Code version");let R=d<<12;for(;e.getBCHDigit(R)-l>=0;)R^=s<<e.getBCHDigit(R)-l;return d<<12|R}})(se)),se}var ce={},Oe;function Bt(){if(Oe)return ce;Oe=1;const o=V(),e=1335,i=21522,n=o.getBCHDigit(e);return ce.getEncodedBits=function(r,s){const l=r.bit<<3|s;let a=l<<10;for(;o.getBCHDigit(a)-n>=0;)a^=e<<o.getBCHDigit(a)-n;return(l<<10|a)^i},ce}var ue={},de,He;function Tt(){if(He)return de;He=1;const o=F();function e(i){this.mode=o.NUMERIC,this.data=i.toString()}return e.getBitsLength=function(n){return 10*Math.floor(n/3)+(n%3?n%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(n){let t,r,s;for(t=0;t+3<=this.data.length;t+=3)r=this.data.substr(t,3),s=parseInt(r,10),n.put(s,10);const l=this.data.length-t;l>0&&(r=this.data.substr(t),s=parseInt(r,10),n.put(s,l*3+1))},de=e,de}var fe,xe;function Mt(){if(xe)return fe;xe=1;const o=F(),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function i(n){this.mode=o.ALPHANUMERIC,this.data=n}return i.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(t){let r;for(r=0;r+2<=this.data.length;r+=2){let s=e.indexOf(this.data[r])*45;s+=e.indexOf(this.data[r+1]),t.put(s,11)}this.data.length%2&&t.put(e.indexOf(this.data[r]),6)},fe=i,fe}var he,Qe;function Pt(){if(Qe)return he;Qe=1;const o=F();function e(i){this.mode=o.BYTE,typeof i=="string"?this.data=new TextEncoder().encode(i):this.data=new Uint8Array(i)}return e.getBitsLength=function(n){return n*8},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){for(let n=0,t=this.data.length;n<t;n++)i.put(this.data[n],8)},he=e,he}var ge,Ke;function Nt(){if(Ke)return ge;Ke=1;const o=F(),e=V();function i(n){this.mode=o.KANJI,this.data=n}return i.getBitsLength=function(t){return t*13},i.prototype.getLength=function(){return this.data.length},i.prototype.getBitsLength=function(){return i.getBitsLength(this.data.length)},i.prototype.write=function(n){let t;for(t=0;t<this.data.length;t++){let r=e.toSJIS(this.data[t]);if(r>=33088&&r<=40956)r-=33088;else if(r>=57408&&r<=60351)r-=49472;else throw new Error("Invalid SJIS character: "+this.data[t]+`
Make sure your charset is UTF-8`);r=(r>>>8&255)*192+(r&255),n.put(r,13)}},ge=i,ge}var me={exports:{}},je;function Lt(){return je||(je=1,(function(o){var e={single_source_shortest_paths:function(i,n,t){var r={},s={};s[n]=0;var l=e.PriorityQueue.make();l.push(n,0);for(var a,c,u,p,h,d,R,B,M;!l.empty();){a=l.pop(),c=a.value,p=a.cost,h=i[c]||{};for(u in h)h.hasOwnProperty(u)&&(d=h[u],R=p+d,B=s[u],M=typeof s[u]>"u",(M||B>R)&&(s[u]=R,l.push(u,R),r[u]=c))}if(typeof t<"u"&&typeof s[t]>"u"){var w=["Could not find a path from ",n," to ",t,"."].join("");throw new Error(w)}return r},extract_shortest_path_from_predecessor_list:function(i,n){for(var t=[],r=n;r;)t.push(r),i[r],r=i[r];return t.reverse(),t},find_path:function(i,n,t){var r=e.single_source_shortest_paths(i,n,t);return e.extract_shortest_path_from_predecessor_list(r,t)},PriorityQueue:{make:function(i){var n=e.PriorityQueue,t={},r;i=i||{};for(r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);return t.queue=[],t.sorter=i.sorter||n.default_sorter,t},default_sorter:function(i,n){return i.cost-n.cost},push:function(i,n){var t={value:i,cost:n};this.queue.push(t),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};o.exports=e})(me)),me.exports}var Ye;function qt(){return Ye||(Ye=1,(function(o){const e=F(),i=Tt(),n=Mt(),t=Pt(),r=Nt(),s=it(),l=V(),a=Lt();function c(w){return unescape(encodeURIComponent(w)).length}function u(w,g,A){const S=[];let P;for(;(P=w.exec(A))!==null;)S.push({data:P[0],index:P.index,mode:g,length:P[0].length});return S}function p(w){const g=u(s.NUMERIC,e.NUMERIC,w),A=u(s.ALPHANUMERIC,e.ALPHANUMERIC,w);let S,P;return l.isKanjiModeEnabled()?(S=u(s.BYTE,e.BYTE,w),P=u(s.KANJI,e.KANJI,w)):(S=u(s.BYTE_KANJI,e.BYTE,w),P=[]),g.concat(A,S,P).sort(function(C,b){return C.index-b.index}).map(function(C){return{data:C.data,mode:C.mode,length:C.length}})}function h(w,g){switch(g){case e.NUMERIC:return i.getBitsLength(w);case e.ALPHANUMERIC:return n.getBitsLength(w);case e.KANJI:return r.getBitsLength(w);case e.BYTE:return t.getBitsLength(w)}}function d(w){return w.reduce(function(g,A){const S=g.length-1>=0?g[g.length-1]:null;return S&&S.mode===A.mode?(g[g.length-1].data+=A.data,g):(g.push(A),g)},[])}function R(w){const g=[];for(let A=0;A<w.length;A++){const S=w[A];switch(S.mode){case e.NUMERIC:g.push([S,{data:S.data,mode:e.ALPHANUMERIC,length:S.length},{data:S.data,mode:e.BYTE,length:S.length}]);break;case e.ALPHANUMERIC:g.push([S,{data:S.data,mode:e.BYTE,length:S.length}]);break;case e.KANJI:g.push([S,{data:S.data,mode:e.BYTE,length:c(S.data)}]);break;case e.BYTE:g.push([{data:S.data,mode:e.BYTE,length:c(S.data)}])}}return g}function B(w,g){const A={},S={start:{}};let P=["start"];for(let m=0;m<w.length;m++){const C=w[m],b=[];for(let f=0;f<C.length;f++){const E=C[f],y=""+m+f;b.push(y),A[y]={node:E,lastCount:0},S[y]={};for(let I=0;I<P.length;I++){const v=P[I];A[v]&&A[v].node.mode===E.mode?(S[v][y]=h(A[v].lastCount+E.length,E.mode)-h(A[v].lastCount,E.mode),A[v].lastCount+=E.length):(A[v]&&(A[v].lastCount=E.length),S[v][y]=h(E.length,E.mode)+4+e.getCharCountIndicator(E.mode,g))}}P=b}for(let m=0;m<P.length;m++)S[P[m]].end=0;return{map:S,table:A}}function M(w,g){let A;const S=e.getBestModeForData(w);if(A=e.from(g,S),A!==e.BYTE&&A.bit<S.bit)throw new Error('"'+w+'" cannot be encoded with mode '+e.toString(A)+`.
 Suggested mode is: `+e.toString(S));switch(A===e.KANJI&&!l.isKanjiModeEnabled()&&(A=e.BYTE),A){case e.NUMERIC:return new i(w);case e.ALPHANUMERIC:return new n(w);case e.KANJI:return new r(w);case e.BYTE:return new t(w)}}o.fromArray=function(g){return g.reduce(function(A,S){return typeof S=="string"?A.push(M(S,null)):S.data&&A.push(M(S.data,S.mode)),A},[])},o.fromString=function(g,A){const S=p(g,l.isKanjiModeEnabled()),P=R(S),m=B(P,A),C=a.find_path(m.map,"start","end"),b=[];for(let f=1;f<C.length-1;f++)b.push(m.table[C[f]].node);return o.fromArray(d(b))},o.rawSplit=function(g){return o.fromArray(p(g,l.isKanjiModeEnabled()))}})(ue)),ue}var Je;function Dt(){if(Je)return W;Je=1;const o=V(),e=ve(),i=bt(),n=vt(),t=wt(),r=Ct(),s=Et(),l=nt(),a=St(),c=Rt(),u=Bt(),p=F(),h=qt();function d(m,C){const b=m.size,f=r.getPositions(C);for(let E=0;E<f.length;E++){const y=f[E][0],I=f[E][1];for(let v=-1;v<=7;v++)if(!(y+v<=-1||b<=y+v))for(let T=-1;T<=7;T++)I+T<=-1||b<=I+T||(v>=0&&v<=6&&(T===0||T===6)||T>=0&&T<=6&&(v===0||v===6)||v>=2&&v<=4&&T>=2&&T<=4?m.set(y+v,I+T,!0,!0):m.set(y+v,I+T,!1,!0))}}function R(m){const C=m.size;for(let b=8;b<C-8;b++){const f=b%2===0;m.set(b,6,f,!0),m.set(6,b,f,!0)}}function B(m,C){const b=t.getPositions(C);for(let f=0;f<b.length;f++){const E=b[f][0],y=b[f][1];for(let I=-2;I<=2;I++)for(let v=-2;v<=2;v++)I===-2||I===2||v===-2||v===2||I===0&&v===0?m.set(E+I,y+v,!0,!0):m.set(E+I,y+v,!1,!0)}}function M(m,C){const b=m.size,f=c.getEncodedBits(C);let E,y,I;for(let v=0;v<18;v++)E=Math.floor(v/3),y=v%3+b-8-3,I=(f>>v&1)===1,m.set(E,y,I,!0),m.set(y,E,I,!0)}function w(m,C,b){const f=m.size,E=u.getEncodedBits(C,b);let y,I;for(y=0;y<15;y++)I=(E>>y&1)===1,y<6?m.set(y,8,I,!0):y<8?m.set(y+1,8,I,!0):m.set(f-15+y,8,I,!0),y<8?m.set(8,f-y-1,I,!0):y<9?m.set(8,15-y-1+1,I,!0):m.set(8,15-y-1,I,!0);m.set(f-8,8,1,!0)}function g(m,C){const b=m.size;let f=-1,E=b-1,y=7,I=0;for(let v=b-1;v>0;v-=2)for(v===6&&v--;;){for(let T=0;T<2;T++)if(!m.isReserved(E,v-T)){let D=!1;I<C.length&&(D=(C[I]>>>y&1)===1),m.set(E,v-T,D),y--,y===-1&&(I++,y=7)}if(E+=f,E<0||b<=E){E-=f,f=-f;break}}}function A(m,C,b){const f=new i;b.forEach(function(T){f.put(T.mode.bit,4),f.put(T.getLength(),p.getCharCountIndicator(T.mode,m)),T.write(f)});const E=o.getSymbolTotalCodewords(m),y=l.getTotalCodewordsCount(m,C),I=(E-y)*8;for(f.getLengthInBits()+4<=I&&f.put(0,4);f.getLengthInBits()%8!==0;)f.putBit(0);const v=(I-f.getLengthInBits())/8;for(let T=0;T<v;T++)f.put(T%2?17:236,8);return S(f,m,C)}function S(m,C,b){const f=o.getSymbolTotalCodewords(C),E=l.getTotalCodewordsCount(C,b),y=f-E,I=l.getBlocksCount(C,b),v=f%I,T=I-v,D=Math.floor(f/I),O=Math.floor(y/I),st=O+1,we=D-O,lt=new a(we);let j=0;const Q=new Array(I),Ce=new Array(I);let Y=0;const at=new Uint8Array(m.buffer);for(let _=0;_<I;_++){const G=_<T?O:st;Q[_]=at.slice(j,j+G),Ce[_]=lt.encode(Q[_]),j+=G,Y=Math.max(Y,G)}const J=new Uint8Array(f);let Ee=0,L,q;for(L=0;L<Y;L++)for(q=0;q<I;q++)L<Q[q].length&&(J[Ee++]=Q[q][L]);for(L=0;L<we;L++)for(q=0;q<I;q++)J[Ee++]=Ce[q][L];return J}function P(m,C,b,f){let E;if(Array.isArray(m))E=h.fromArray(m);else if(typeof m=="string"){let D=C;if(!D){const O=h.rawSplit(m);D=c.getBestVersionForData(O,b)}E=h.fromString(m,D||40)}else throw new Error("Invalid data");const y=c.getBestVersionForData(E,b);if(!y)throw new Error("The amount of data is too big to be stored in a QR Code");if(!C)C=y;else if(C<y)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+y+`.
`);const I=A(C,b,E),v=o.getSymbolSize(C),T=new n(v);return d(T,C),R(T),B(T,C),w(T,b,0),C>=7&&M(T,C),g(T,I),isNaN(f)&&(f=s.getBestMask(T,w.bind(null,T,b))),s.applyMask(f,T),w(T,b,f),{modules:T,version:C,errorCorrectionLevel:b,maskPattern:f,segments:E}}return W.create=function(C,b){if(typeof C>"u"||C==="")throw new Error("No input text");let f=e.M,E,y;return typeof b<"u"&&(f=e.from(b.errorCorrectionLevel,e.M),E=c.from(b.version),y=s.from(b.maskPattern),b.toSJISFunc&&o.setToSJISFunction(b.toSJISFunc)),P(C,E,f,y)},W}var pe={},ye={},Ge;function ot(){return Ge||(Ge=1,(function(o){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let n=i.slice().replace("#","").split("");if(n.length<3||n.length===5||n.length>8)throw new Error("Invalid hex color: "+i);(n.length===3||n.length===4)&&(n=Array.prototype.concat.apply([],n.map(function(r){return[r,r]}))),n.length===6&&n.push("F","F");const t=parseInt(n.join(""),16);return{r:t>>24&255,g:t>>16&255,b:t>>8&255,a:t&255,hex:"#"+n.slice(0,6).join("")}}o.getOptions=function(n){n||(n={}),n.color||(n.color={});const t=typeof n.margin>"u"||n.margin===null||n.margin<0?4:n.margin,r=n.width&&n.width>=21?n.width:void 0,s=n.scale||4;return{width:r,scale:r?4:s,margin:t,color:{dark:e(n.color.dark||"#000000ff"),light:e(n.color.light||"#ffffffff")},type:n.type,rendererOpts:n.rendererOpts||{}}},o.getScale=function(n,t){return t.width&&t.width>=n+t.margin*2?t.width/(n+t.margin*2):t.scale},o.getImageWidth=function(n,t){const r=o.getScale(n,t);return Math.floor((n+t.margin*2)*r)},o.qrToImageData=function(n,t,r){const s=t.modules.size,l=t.modules.data,a=o.getScale(s,r),c=Math.floor((s+r.margin*2)*a),u=r.margin*a,p=[r.color.light,r.color.dark];for(let h=0;h<c;h++)for(let d=0;d<c;d++){let R=(h*c+d)*4,B=r.color.light;if(h>=u&&d>=u&&h<c-u&&d<c-u){const M=Math.floor((h-u)/a),w=Math.floor((d-u)/a);B=p[l[M*s+w]?1:0]}n[R++]=B.r,n[R++]=B.g,n[R++]=B.b,n[R]=B.a}}})(ye)),ye}var Ze;function Ut(){return Ze||(Ze=1,(function(o){const e=ot();function i(t,r,s){t.clearRect(0,0,r.width,r.height),r.style||(r.style={}),r.height=s,r.width=s,r.style.height=s+"px",r.style.width=s+"px"}function n(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}o.render=function(r,s,l){let a=l,c=s;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),s||(c=n()),a=e.getOptions(a);const u=e.getImageWidth(r.modules.size,a),p=c.getContext("2d"),h=p.createImageData(u,u);return e.qrToImageData(h.data,r,a),i(p,c,u),p.putImageData(h,0,0),c},o.renderToDataURL=function(r,s,l){let a=l;typeof a>"u"&&(!s||!s.getContext)&&(a=s,s=void 0),a||(a={});const c=o.render(r,s,a),u=a.type||"image/png",p=a.rendererOpts||{};return c.toDataURL(u,p.quality)}})(pe)),pe}var be={},We;function kt(){if(We)return be;We=1;const o=ot();function e(t,r){const s=t.a/255,l=r+'="'+t.hex+'"';return s<1?l+" "+r+'-opacity="'+s.toFixed(2).slice(1)+'"':l}function i(t,r,s){let l=t+r;return typeof s<"u"&&(l+=" "+s),l}function n(t,r,s){let l="",a=0,c=!1,u=0;for(let p=0;p<t.length;p++){const h=Math.floor(p%r),d=Math.floor(p/r);!h&&!c&&(c=!0),t[p]?(u++,p>0&&h>0&&t[p-1]||(l+=c?i("M",h+s,.5+d+s):i("m",a,0),a=0,c=!1),h+1<r&&t[p+1]||(l+=i("h",u),u=0)):a++}return l}return be.render=function(r,s,l){const a=o.getOptions(s),c=r.modules.size,u=r.modules.data,p=c+a.margin*2,h=a.color.light.a?"<path "+e(a.color.light,"fill")+' d="M0 0h'+p+"v"+p+'H0z"/>':"",d="<path "+e(a.color.dark,"stroke")+' d="'+n(u,c,a.margin)+'"/>',R='viewBox="0 0 '+p+" "+p+'"',M='<svg xmlns="http://www.w3.org/2000/svg" '+(a.width?'width="'+a.width+'" height="'+a.width+'" ':"")+R+' shape-rendering="crispEdges">'+h+d+`</svg>
`;return typeof l=="function"&&l(null,M),M},be}var $e;function Vt(){if($e)return z;$e=1;const o=yt(),e=Dt(),i=Ut(),n=kt();function t(r,s,l,a,c){const u=[].slice.call(arguments,1),p=u.length,h=typeof u[p-1]=="function";if(!h&&!o())throw new Error("Callback required as last argument");if(h){if(p<2)throw new Error("Too few arguments provided");p===2?(c=l,l=s,s=a=void 0):p===3&&(s.getContext&&typeof c>"u"?(c=a,a=void 0):(c=a,a=l,l=s,s=void 0))}else{if(p<1)throw new Error("Too few arguments provided");return p===1?(l=s,s=a=void 0):p===2&&!s.getContext&&(a=l,l=s,s=void 0),new Promise(function(d,R){try{const B=e.create(l,a);d(r(B,s,a))}catch(B){R(B)}})}try{const d=e.create(l,a);c(null,r(d,s,a))}catch(d){c(d)}}return z.create=e.create,z.toCanvas=t.bind(null,i.render),z.toDataURL=t.bind(null,i.renderToDataURL),z.toString=t.bind(null,function(r,s,l){return n.render(r,l)}),z}var Ft=Vt();const _t=pt(Ft);class zt{constructor(e){U(this,"onRestart",null);this.onRestart=e||null}getTitle(){return"Generate QR Code"}render(e){var h,d,R,B;const i=document.createElement("div");i.className="step-container result-step";const n={iban:e.iban.replace(/\s/g,"")};(h=e.billerVAT)!=null&&h.trim()&&(n.billerVAT=e.billerVAT.replace(/\s/g,"")),(d=e.billerIdentificationNumber)!=null&&d.trim()&&(n.billerIdentificationNumber=e.billerIdentificationNumber.trim()),e.creditorReference?n.creditorReference=e.creditorReference.replace(/\s/g,""):e.remittanceInfo&&(n.remittanceInfo=e.remittanceInfo),e.amount&&(n.amount=e.amount),e.language&&(n.language=e.language),e.size&&(n.size=e.size),e.paymentInternalId&&(n.paymentInternalId=e.paymentInternalId),e.multiple!==void 0&&(n.multiple=e.multiple),e.paymentMethod&&(n.paymentMethod=e.paymentMethod),e.allowedPaymentMethods&&(n.allowedPaymentMethods=e.allowedPaymentMethods);const t=mt(n,e.environment||"test"),r=((R=e.credentials)==null?void 0:R.username)&&((B=e.credentials)==null?void 0:B.password);i.innerHTML=`
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
        <h3>Payment URL (pay-button/execute)</h3>
        <div class="url-display">
          <code id="api-url">${t}</code>
          <button id="copy-url-btn" class="btn btn-secondary" title="Copy URL">Copy</button>
        </div>
        <small>This URL will be shortened and encoded into a QR code</small>
      </div>

      ${r?"":`
        <div class="error-box">
          <h4>API Credentials Required</h4>
          <p>Please enter your API username and password in the header above to generate the QR code.</p>
        </div>
      `}

      <div class="action-buttons">
        <button id="generate-btn" class="btn btn-primary" ${r?"":"disabled"}>
          Generate QR Code
        </button>
      </div>

      <div id="loading" class="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Creating short link and generating QR code...</p>
      </div>

      <div id="result" class="result-container" style="display: none;">
        <h3>Your QR Code</h3>
        <div id="short-url-display" class="url-preview-box" style="margin-bottom: 1rem;">
          <h4>Short URL:</h4>
          <div class="url-display">
            <code id="short-url"></code>
            <button id="copy-short-url-btn" class="btn btn-secondary">Copy</button>
          </div>
        </div>
        <div id="qr-preview" class="qr-preview"></div>
        <div class="result-actions">
          <button id="download-btn" class="btn btn-success">Download QR Code</button>
          <button id="restart-btn" class="btn btn-secondary">Generate Another</button>
        </div>
      </div>

      <div id="error" class="error-box" style="display: none;"></div>
    `;const s=i.querySelector("#copy-url-btn");s.addEventListener("click",()=>{navigator.clipboard.writeText(t).then(()=>{const M=s.textContent;s.textContent="Copied!",s.classList.add("btn-success"),s.classList.remove("btn-secondary"),setTimeout(()=>{s.textContent=M,s.classList.remove("btn-success"),s.classList.add("btn-secondary")},2e3)}).catch(M=>{console.error("Failed to copy URL:",M),alert("Failed to copy URL to clipboard")})});const l=i.querySelector("#generate-btn"),a=i.querySelector("#loading"),c=i.querySelector("#result"),u=i.querySelector("#error"),p=i.querySelector("#qr-preview");return r&&l.addEventListener("click",async()=>{var M,w;l.disabled=!0,a.style.display="block",c.style.display="none",u.style.display="none";try{const g={iban:e.iban.replace(/\s/g,"")};(M=e.billerVAT)!=null&&M.trim()&&(g.billerVAT=e.billerVAT.replace(/\s/g,"")),(w=e.billerIdentificationNumber)!=null&&w.trim()&&(g.billerIdentificationNumber=e.billerIdentificationNumber.trim()),e.creditorReference?g.creditorReference=e.creditorReference.replace(/\s/g,""):e.remittanceInfo&&(g.remittanceInfo=e.remittanceInfo),e.amount&&(g.amount=e.amount),e.language&&(g.language=e.language),e.size&&(g.size=e.size),e.paymentInternalId&&(g.paymentInternalId=e.paymentInternalId),e.multiple!==void 0&&(g.multiple=e.multiple),e.paymentMethod&&(g.paymentMethod=e.paymentMethod),e.allowedPaymentMethods&&(g.allowedPaymentMethods=e.allowedPaymentMethods);const A=await gt(g,e.environment||"test",e.credentials.username,e.credentials.password),S=i.querySelector("#short-url");S.textContent=A;const P=i.querySelector("#copy-short-url-btn");P.addEventListener("click",()=>{navigator.clipboard.writeText(A).then(()=>{const f=P.textContent;P.textContent="Copied!",P.classList.add("btn-success"),P.classList.remove("btn-secondary"),setTimeout(()=>{P.textContent=f,P.classList.remove("btn-success"),P.classList.add("btn-secondary")},2e3)})});const m=document.createElement("canvas");await _t.toCanvas(m,A,{width:e.size||400,margin:2,color:{dark:"#000000",light:"#FFFFFF"}}),p.innerHTML="",p.appendChild(m),a.style.display="none",c.style.display="block",l.style.display="none",i.querySelector("#download-btn").addEventListener("click",()=>{m.toBlob(f=>{if(f){const E=URL.createObjectURL(f),y=document.createElement("a");y.href=E,y.download=`qr-code-${new Date().toISOString().split("T")[0]}.png`,document.body.appendChild(y),y.click(),document.body.removeChild(y),URL.revokeObjectURL(E)}})}),i.querySelector("#restart-btn").addEventListener("click",()=>{this.onRestart&&this.onRestart()})}catch(g){a.style.display="none",l.disabled=!1,u.style.display="block",g instanceof x?u.innerHTML=`
              <h4>Error Generating QR Code</h4>
              <p>${g.message}</p>
              ${g.statusCode?`<p class="error-code">Status Code: ${g.statusCode}</p>`:""}
              ${g.statusCode===401?"<p><strong>Check your API credentials in the header above.</strong></p>":""}
            `:u.innerHTML=`
              <h4>Unexpected Error</h4>
              <p>${g instanceof Error?g.message:"An unknown error occurred"}</p>
            `}}),i}validate(e){return{valid:!0,errors:[]}}collectData(e){return{}}}class Ot{constructor(e){U(this,"currentStep",0);U(this,"data",{environment:"test"});U(this,"credentials",{username:"",password:""});U(this,"steps",[]);U(this,"container");U(this,"currentStepContainer",null);const i=document.getElementById(e);if(!i)throw new Error(`Container with id "${e}" not found`);this.container=i,this.steps=[new dt,new zt(()=>this.restart())],this.render()}render(){this.container.innerHTML="";const e=document.createElement("div");e.className="wizard";const i=this.createProgressIndicator();e.appendChild(i);const n=document.createElement("div");n.className="wizard-content",n.id="step-content",e.appendChild(n);const t=this.createNavigation();e.appendChild(t),this.container.appendChild(e),this.renderStep()}createProgressIndicator(){const e=document.createElement("div");return e.className="wizard-progress",this.steps.forEach((i,n)=>{const t=document.createElement("div");t.className="progress-step",n===this.currentStep?t.classList.add("active"):n<this.currentStep&&t.classList.add("completed"),t.innerHTML=`
        <div class="step-number">${n+1}</div>
        <div class="step-title">${i.getTitle()}</div>
      `,e.appendChild(t)}),e}createNavigation(){const e=document.createElement("div");e.className="wizard-navigation";const i=document.createElement("button");i.id="prev-btn",i.className="btn btn-secondary",i.textContent="Previous",i.disabled=this.currentStep===0,i.addEventListener("click",()=>this.previous());const n=document.createElement("button");return n.id="next-btn",n.className="btn btn-primary",n.textContent=this.currentStep===this.steps.length-1?"Finish":"Next",n.addEventListener("click",()=>this.next()),this.currentStep===this.steps.length-1&&(n.style.display="none"),e.appendChild(i),e.appendChild(n),e}renderStep(){const e=document.getElementById("step-content");if(!e)return;e.innerHTML="";const i=this.steps[this.currentStep],n={...this.data,credentials:this.credentials};this.currentStepContainer=i.render(n),e.appendChild(this.currentStepContainer)}next(){if(this.currentStepContainer){const e=this.steps[this.currentStep],i=e.collectData(this.currentStepContainer);this.data={...this.data,...i};const n={...this.data,credentials:this.credentials},t=e.validate(n);if(!t.valid){this.showErrors(t.errors);return}}this.currentStep<this.steps.length-1&&(this.currentStep++,this.render())}previous(){if(this.currentStepContainer){const i=this.steps[this.currentStep].collectData(this.currentStepContainer);this.data={...this.data,...i}}this.currentStep>0&&(this.currentStep--,this.render())}showErrors(e){const i=document.querySelector(".validation-errors");i&&i.remove();const n=document.createElement("div");n.className="validation-errors",n.innerHTML=`
      <h4>Please fix the following errors:</h4>
      <ul>
        ${e.map(r=>`<li>${r}</li>`).join("")}
      </ul>
    `;const t=document.getElementById("step-content");t&&t.firstChild&&t.insertBefore(n,t.firstChild),t==null||t.scrollIntoView({behavior:"smooth"})}restart(){this.currentStep=0,this.data={environment:"test"},this.render()}getData(){return this.data}setEnvironment(e){this.data.environment=e}getEnvironment(){return this.data.environment||"test"}setCredentials(e,i){this.credentials={username:e,password:i}}getCredentials(){return this.credentials}}const Xe={test:"https://test.digiteal.eu",production:"https://app.digiteal.eu"};document.addEventListener("DOMContentLoaded",()=>{const o=new Ot("wizard-container"),e=(s,l)=>{const a=document.getElementById(s),c=document.getElementById(l);a&&c&&a.addEventListener("click",()=>{a.classList.toggle("collapsed"),c.classList.toggle("collapsed")})};e("creds-toggle","creds-content"),e("env-toggle","env-content");const i=document.getElementById("env-select"),n=document.getElementById("env-url");if(i&&n){const s=o.getEnvironment();i.value=s,n.textContent=Xe[s],i.addEventListener("change",()=>{const l=i.value;o.setEnvironment(l),n.textContent=Xe[l]})}const t=document.getElementById("username"),r=document.getElementById("password");t&&r&&(t.addEventListener("input",()=>{o.setCredentials(t.value,r.value)}),r.addEventListener("input",()=>{o.setCredentials(t.value,r.value)}))});
