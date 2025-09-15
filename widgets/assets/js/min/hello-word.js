import{i as e,a as o,x as n}from"./chunks/lit-element-CDtWn28c.js";class r extends e{static properties={mensaje:{type:String,reflect:!0},contador:{type:Number,reflect:!0}};static styles=o`
    :host { display: inline-block; padding: 12px 16px; border-radius: 12px; }
    button { border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; }
    .num { font-weight: 600; }
  `;constructor(){super(),this.mensaje="Hola Lit",this.contador=0}#t=()=>{this.contador+=1};#e=()=>{this.contador-=1};render(){return n`
      <div class="box">
        <p>${this.mensaje} — <span class="num">${this.contador}</span></p>
        <button @click=${this.#t}>Incrementar</button>
        <button @click=${this.#e}>Decrementar</button>
      </div>
    `}}customElements.define("hello-word",r);alert("loaded hello-word");const s=t=>{};document.addEventListener("DOMContentLoaded",()=>s());
//# sourceMappingURL=hello-word.js.map
