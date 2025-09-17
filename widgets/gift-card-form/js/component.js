import { LitElement, html, css, nothing } from 'lit';

const ICONS = {
  coffee: html`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M3 8h13v5a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M16 9h2.5a2.5 2.5 0 0 1 0 5H16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M3 19h13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M8 4c0 .8-.6 1.2-.6 2S8 7 8 7M11 4c0 .8-.6 1.2-.6 2S11 7 11 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  </svg>`,
  utensils: html`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path d="M5 3v8M8 3v8M5 7h3M12 3v18M16 3c0 2 2 2 2 4v6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,
  gift: html`<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <rect x="3" y="8" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M12 8v13M3 12h18" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7.5 6a2.5 2.5 0 1 1 5 0v2H9a2 2 0 0 1-1.5-2Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M16.5 6a2.5 2.5 0 1 0-5 0v2H15a2 2 0 0 0 1.5-2Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
  </svg>`
};

export class GiftCardForm extends LitElement {
  static properties = {
    step: { type: Number, state: true },
    amount: { type: Number, reflect: true },
    currency: { type: String, reflect: true },
    locale: { type: String, reflect: true },
    recommendations: { type: Array },
    alertEnabled: { type: Boolean, reflect: true, attribute: 'alert-enabled' },
    alertChannel: { type: String, reflect: true, attribute: 'alert-channel' },
    alertDatetime: { type: String, reflect: true, attribute: 'alert-datetime' },
    giftDate: { type: String, reflect: true },
    buyer: { state: true },
    recipient: { state: true },
    errors: { state: true },
    accent: { type: String, reflect: true },
  };

  static styles = css`
    :host{
      display:block; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; color:#0b1324;
      --space-1: 8px;
      --space-2: 12px;
      --space-3: 16px;
      --space-4: 20px;

      /* tema */
      --mawc-accent: var(--mawc-accent-global, #0f172a);
      --mawc-on-accent: var(--mawc-on-accent-global, #ffffff);
      --mawc-accent-ring: var(--mawc-accent-ring-global, rgba(15,23,42,.12));
    }

    .card{
      border:1px solid #e3e7ef; border-radius:16px; padding:16px; background:#fff;
      box-shadow:0 2px 12px rgba(0,0,0,.04);
      display:grid; gap:var(--space-4);
    }

    /* Header / Stepper */
    .header{ display:grid; gap:var(--space-2); }
    .title-row{ display:flex; align-items:center; justify-content:space-between; }
    h2{ margin:0; font-size:1.15rem; font-weight:800; letter-spacing:.2px; }
    .subtitle{ color:#5b6784; font-size:.92rem; }
    .progress{ position:relative; block-size:6px; border-radius:999px; background:#eef2fb; overflow:hidden; }
    .progress > i{ display:block; block-size:100%; inline-size: calc(var(--p, 33%)); background:var(--mawc-accent); transition:inline-size .3s ease; border-radius:inherit; }
    .stepper{ display:grid; grid-template-columns: repeat(3, 1fr); gap:var(--space-2); }
    .step{
      display:grid; grid-template-rows: auto auto; justify-items:center; gap:6px;
      padding:12px; border-radius:12px; border:1px solid #e8ecf5; background:#f7f8fc; color:#5b6784; font-weight:600; font-size:.92rem;
    }
    .step-num{ inline-size:28px; block-size:28px; border-radius:999px; display:grid; place-items:center; font-weight:800; background:#e9edf7; color:#334155; }
    .step[aria-current="step"]{ background:color-mix(in srgb, var(--mawc-accent) 10%, white); border-color:var(--mawc-accent); color:#0b1324; }
    .step[aria-current="step"] .step-num{ background:var(--mawc-accent); color:var(--mawc-on-accent); }

    /* Vertical rhythm: más separación entre controles */
    form .section{ display:grid; gap:var(--space-3); }
    fieldset{ border:none; padding:0; margin:0; display:grid; gap:var(--space-3); }
    label{ display:grid; gap:6px; font-weight:600; font-size:.92rem; }
    .recs{ margin-top:var(--space-2); }
    /* añade espacio entre elementos sucesivos de cada sección */
    .card section > * + * { margin-top: var(--space-3); }

    input, textarea, select{
      border:1px solid #d6dbe8; border-radius:10px; padding:12px 14px; font-size:1rem; outline:none; background:#fff;
    }
    input:focus, textarea:focus, select:focus{ border-color:var(--mawc-accent); box-shadow:0 0 0 3px var(--mawc-accent-ring); }
    .error{ color:#b42318; font-size:.9rem; }

    .hidden{ display:none !important; }

    /* Recomendaciones */
    .recs{ display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:var(--space-2); }
    .rec{
      display:grid; justify-items:center; gap:6px; text-align:center;
      border:1px solid #e6eaf5; background:#f9fafc; border-radius:12px; padding:12px;
      cursor:pointer; transition:transform .05s ease, border-color .15s ease, background .15s ease;
    }
    .rec .icon{ color:#334155; }
    .rec .price{ font-weight:800; }
    .rec .hint{ font-size:.86rem; color:#5b6784; line-height:1.25; }
    .rec.active{ border-color:var(--mawc-accent); background:color-mix(in srgb, var(--mawc-accent) 12%, white); }
    .rec:active{ transform:scale(.98); }

    /* Footer de acciones: sticky + CTA fuerte */
    .actions{
      position:sticky; bottom:10px;
      display:flex; justify-content:space-between; align-items:center;
      padding-top:var(--space-2);
      background:
        linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,.85) 35%, #fff 60%);
      border-top:1px solid #eef2fb;
    }
    .btn{
      background:var(--mawc-accent); color:var(--mawc-on-accent);
      border:none; border-radius:12px; cursor:pointer; font-weight:800;
      padding:12px 18px; font-size:1rem; box-shadow:0 8px 20px rgba(0,0,0,.06);
      display:inline-flex; align-items:center; gap:10px;
      transition: transform .06s ease, box-shadow .15s ease, background .15s ease;
    }
    .btn:hover{ transform:translateY(-1px); box-shadow:0 10px 24px rgba(0,0,0,.09); }
    .btn:active{ transform:translateY(0); }
    .btn svg{ width:18px; height:18px; }
    .pill{ background:#f3f5fb; border:none; padding:10px 12px; border-radius:10px; cursor:pointer; font-weight:700; }
  `;

  constructor() {
    super();
    this.step = 1;
    this.amount = 0;
    this.currency = 'ARS';
    this.locale = 'es-AR';
    this.recommendations = [10000, 20000, 50000]; // o [{amount,label,icon}, ...]
    this.alertEnabled = false;
    this.alertChannel = 'email';
    this.alertDatetime = '';
    this.giftDate = '';
    this.buyer = { name: '', email: '', dni: '' };
    this.recipient = { name: '', lastName: '', dni: '', email: '', phone: '', message: '' };
    this.errors = {};
    this.accent = '';
  }

  updated(changed) {
    if (changed.has('accent')) {
      if (this.accent) this.style.setProperty('--mawc-accent', this.accent);
      else this.style.removeProperty('--mawc-accent');
    }
  }

  // helpers
  #fmt(n){ try{ return new Intl.NumberFormat(this.locale, { style:'currency', currency:this.currency, maximumFractionDigits:0 }).format(Number(n||0)); } catch{ return `${this.currency} ${Number(n||0).toFixed(0)}`; } }
  #stepPercent(){ return `${Math.max(0, Math.min(100, (this.step/3)*100))}%`; }
  #todayISO(){ const d=new Date(); d.setHours(0,0,0,0); const off=d.getTimezoneOffset(); return new Date(d.getTime()-off*60000).toISOString().split('T')[0]; }
  #isPastDate(iso){ if(!iso) return false; const [y,m,day]=iso.split('-').map(Number); const i=new Date(y,m-1,day); const t=new Date(); t.setHours(0,0,0,0); i.setHours(0,0,0,0); return i<t; }

  // state
  #setAmount(v){ this.amount = Math.max(0, Number(v||0)); }
  #selectRec(v){ this.amount = Number(v); }
  #updateBuyer(k,e){ this.buyer = { ...this.buyer, [k]: e.target.value }; }
  #updateRecipient(k,e){ this.recipient = { ...this.recipient, [k]: e.target.value }; }
  #toggleAlert(e){ this.alertEnabled = e.target.checked; }
  #updateAlert(k,e){ this[k] = e.target.value; }

  // validation
  #validate(){
    const errs = {};
    if (this.step === 1) {
      if (!this.amount || this.amount < 1) errs.amount = 'Definí un monto válido';
      if (!this.giftDate) errs.giftDate = 'Elegí fecha de regalo';
      else if (this.#isPastDate(this.giftDate)) errs.giftDate = 'La fecha no puede ser anterior a hoy';
    }
    if (this.step === 2) {
      const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.buyer.name) errs.buyerName = 'Nombre es obligatorio';
      if (!this.buyer.dni) errs.buyerDni = 'DNI es obligatorio';
      if (!this.buyer.email || !re.test(this.buyer.email)) errs.buyerEmail = 'Email no válido';
    }
    if (this.step === 3) {
      const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.recipient.name) errs.recName = 'Nombre obligatorio';
      if (!this.recipient.lastName) errs.recLastName = 'Apellido obligatorio';
      if (!this.recipient.dni) errs.recDni = 'DNI obligatorio';
      if (!this.recipient.email || !re.test(this.recipient.email)) errs.recEmail = 'Email no válido';
      if (!this.recipient.phone) errs.recPhone = 'Celular obligatorio';
    }
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }

  #next(){ if(this.#validate()) this.step = Math.min(this.step+1, 3); }
  #prev(){ this.step = Math.max(this.step-1, 1); }
  #submit(ev){
    ev.preventDefault();
    if (!this.#validate()) return;
    const payload = {
      amount: this.amount, currency: this.currency, giftDate: this.giftDate,
      buyer: this.buyer, recipient: this.recipient,
      alert: this.alertEnabled ? { channel: this.alertChannel, datetime: this.alertDatetime } : null,
    };
    this.dispatchEvent(new CustomEvent('gift-card-submit', { detail: payload, bubbles: true, composed: true }));
  }

  #renderHeader(){
    const steps = [
      { n:1, label:'Monto & fecha' },
      { n:2, label:'Comprador' },
      { n:3, label:'Destinatario' },
    ];
    return html`
      <div class="header" role="group" aria-label="Progreso de compra">
        <div class="title-row">
          <h2>Comprar Gift Card</h2>
          <div class="subtitle">Paso ${this.step} de 3</div>
        </div>
        <div class="progress" style=${`--p:${this.#stepPercent()}`} aria-hidden="true"><i></i></div>
        <div class="stepper">
          ${steps.map(s => html`
            <div class="step" aria-current=${this.step===s.n ? 'step' : nothing} aria-label="Paso ${s.n}: ${s.label}">
              <span class="step-num">${s.n}</span>
              <span>${s.label}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  #normalizedRecs(){
    const defaults = [
      { label:'Café & medialunas (1-2 pers.)', icon:'coffee' },
      { label:'Brunch liviano (2 pers.)',       icon:'utensils' },
      { label:'Cena aniversario (2-3 pers.)',   icon:'gift' },
    ];
    if (!Array.isArray(this.recommendations)) return [];
    if (typeof this.recommendations[0] === 'number') {
      return this.recommendations.map((amount, i) => ({
        amount, label: defaults[i]?.label || 'Sugerido', icon: defaults[i]?.icon || 'gift'
      }));
    }
    return this.recommendations; // [{amount,label,icon}]
  }

  render(){
    const e = this.errors;
    const recs = this.#normalizedRecs();

    return html`
      <form class="card" @submit=${(ev)=>this.#submit(ev)} novalidate>
        ${this.#renderHeader()}

        <!-- Paso 1 -->
        <section class="section ${this.step===1?'':'hidden'}" aria-labelledby="s1">
          <h3 id="s1" class="visually-hidden" style="position:absolute;clip:rect(0 0 0 0)">Paso 1</h3>

          <label>Monto personalizado
            <input type="number" min="1" step="1" inputmode="numeric"
              .value=${String(this.amount||'')}
              @input=${(ev)=>this.#setAmount(ev.target.value)}
              aria-invalid=${e.amount? 'true':'false'}
              aria-describedby=${e.amount? 'err-amount': nothing}>
          </label>
          ${e.amount? html`<div id="err-amount" class="error">${e.amount}</div>`: nothing}

          <div class="recs" role="listbox" aria-label="Montos sugeridos">
            ${recs.map(r => {
              const active = Number(this.amount)===Number(r.amount);
              return html`
                <button type="button" role="option"
                  class="rec ${active?'active':''}" aria-selected=${active}
                  @click=${()=>this.#selectRec(r.amount)}>
                  <span class="icon" aria-hidden="true">${ICONS[r.icon] || ICONS.gift}</span>
                  <span class="price">${this.#fmt(r.amount)}</span>
                  <span class="hint">${r.label}</span>
                </button>
              `;
            })}
          </div>

          <label>Fecha de regalo
            <input type="date" min=${this.#todayISO()} .value=${this.giftDate}
              @input=${(ev)=> this.giftDate = ev.target.value}
              aria-invalid=${e.giftDate? 'true':'false'}
              aria-describedby=${e.giftDate? 'err-date': nothing}>
          </label>
          ${e.giftDate? html`<div id="err-date" class="error">${e.giftDate}</div>`: nothing}
        </section>

        <!-- Paso 2 -->
        <section class="section ${this.step===2?'':'hidden'}" aria-labelledby="s2">
          <h3 id="s2" class="visually-hidden" style="position:absolute;clip:rect(0 0 0 0)">Paso 2</h3>
          <fieldset>
            <legend class="muted">Datos del comprador</legend>
            <label>Nombre (usado en el saludo)
              <input type="text" .value=${this.buyer.name} @input=${(ev)=>this.#updateBuyer('name',ev)} aria-invalid=${e.buyerName?'true':'false'}>
            </label>${e.buyerName? html`<div class="error">${e.buyerName}</div>`: nothing}
            <label>Email
              <input type="email" .value=${this.buyer.email} @input=${(ev)=>this.#updateBuyer('email',ev)} aria-invalid=${e.buyerEmail?'true':'false'}>
            </label>${e.buyerEmail? html`<div class="error">${e.buyerEmail}</div>`: nothing}
            <label>DNI
              <input type="text" .value=${this.buyer.dni} @input=${(ev)=>this.#updateBuyer('dni',ev)} aria-invalid=${e.buyerDni?'true':'false'}>
            </label>${e.buyerDni? html`<div class="error">${e.buyerDni}</div>`: nothing}
          </fieldset>
        </section>

        <!-- Paso 3 -->
        <section class="section ${this.step===3?'':'hidden'}" aria-labelledby="s3">
          <h3 id="s3" class="visually-hidden" style="position:absolute;clip:rect(0 0 0 0)">Paso 3</h3>
          <fieldset>
            <legend class="muted">Datos del destinatario</legend>
            <label>Nombre
              <input type="text" .value=${this.recipient.name} @input=${(ev)=>this.#updateRecipient('name',ev)} aria-invalid=${e.recName?'true':'false'}>
            </label>${e.recName? html`<div class="error">${e.recName}</div>`: nothing}
            <label>Apellido
              <input type="text" .value=${this.recipient.lastName} @input=${(ev)=>this.#updateRecipient('lastName',ev)} aria-invalid=${e.recLastName?'true':'false'}>
            </label>${e.recLastName? html`<div class="error">${e.recLastName}</div>`: nothing}
            <label>DNI
              <input type="text" .value=${this.recipient.dni} @input=${(ev)=>this.#updateRecipient('dni',ev)} aria-invalid=${e.recDni?'true':'false'}>
            </label>${e.recDni? html`<div class="error">${e.recDni}</div>`: nothing}
            <label>Email
              <input type="email" .value=${this.recipient.email} @input=${(ev)=>this.#updateRecipient('email',ev)} aria-invalid=${e.recEmail?'true':'false'}>
            </label>${e.recEmail? html`<div class="error">${e.recEmail}</div>`: nothing}
            <label>Celular
              <input type="tel" .value=${this.recipient.phone} @input=${(ev)=>this.#updateRecipient('phone',ev)} aria-invalid=${e.recPhone?'true':'false'}>
            </label>${e.recPhone? html`<div class="error">${e.recPhone}</div>`: nothing}
            <label>Mensaje
              <textarea .value=${this.recipient.message} @input=${(ev)=>this.#updateRecipient('message',ev)}></textarea>
            </label>

            <label style="display:flex;align-items:center;gap:8px;">
              <input type="checkbox" .checked=${this.alertEnabled} @change=${(ev)=>this.#toggleAlert(ev)}> Configurar alerta
            </label>

            ${this.alertEnabled ? html`
              <label>Canal
                <select .value=${this.alertChannel} @change=${(ev)=>this.#updateAlert('alertChannel',ev)}>
                  <option value="email">Email</option>
                  <option value="wpp">WhatsApp</option>
                  <option value="reminder">Solo recordatorio al comprador</option>
                </select>
              </label>
              <label>Fecha y hora de alerta (opcional)
                <input type="datetime-local" .value=${this.alertDatetime} @input=${(ev)=>this.#updateAlert('alertDatetime',ev)}>
              </label>
            ` : nothing}
          </fieldset>
        </section>

        <div class="actions">
          ${this.step>1
            ? html`<button type="button" class="pill" @click=${()=>this.#prev()}>Anterior</button>`
            : html`<span></span>`}
          ${this.step<3
            ? html`
              <button type="button" class="btn" @click=${()=>this.#next()}>
                Siguiente
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
                </svg>
              </button>`
            : html`<button class="btn" type="submit">
                Añadir al carrito
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                     stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>`
          }
        </div>
      </form>
    `;
  }
}

customElements.define('mawc-gift-card-form', GiftCardForm);
