import { LitElement, html, css } from 'Lit';

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
  };

  static styles = css`
    :host { display: block; font-family: system-ui, sans-serif; color: #0b1324; }
    .card { border: 1px solid #e3e7ef; border-radius: 16px; padding: 16px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    h2 { margin: 0 0 12px; font-size: 1.1rem; }
    .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
    fieldset { border: none; padding: 0; margin: 0; display: grid; gap: 10px; }
    label { display: grid; gap: 6px; font-weight: 600; font-size: .92rem; }
    input, textarea, select { border: 1px solid #d6dbe8; border-radius: 10px; padding: 10px 12px; font-size: 1rem; outline: none; }
    .row { display: flex; gap: 8px; align-items: center; }
    button { border: none; padding: 10px 12px; border-radius: 10px; cursor: pointer; }
    .btn { background: #0f172a; color: #fff; font-weight: 700; }
    .pill { background: #f3f5fb; }
    .pill.active { background: #0f172a; color: #fff; }
    .muted{ color: #5b6784; }
    .error { color: #b42318; font-size: .9rem; }
    .section { display: grid; gap: 12px; }
    .hidden { display: none; }
  `;

  constructor(){
    super();
    this.step = 1;
    this.amount = 0;
    this.currency = 'ARS';
    this.locale = 'es-AR';
    this.recommendations = [10000, 20000, 50000];
    this.alertEnabled = false;
    this.alertChannel = 'email';
    this.alertDatetime = '';
    this.giftDate = '';
    this.buyer = { name: '', email: '', dni: '' };
    this.recipient = { name: '', lastName: '', dni: '', email: '', phone: '', message: '' };
    this.errors = {};
  }

  #fmt(n){
    try{ return new Intl.NumberFormat(this.locale, { style:'currency', currency: this.currency }).format(Number(n||0)); }
    catch{ return `${this.currency} ${Number(n||0).toFixed(2)}` }
  }

  #setAmount(v){ this.amount = Math.max(0, Number(v||0)); }
  #selectRec(v){ this.amount = Number(v); }
  #updateBuyer(k,e){ this.buyer = { ...this.buyer, [k]: e.target.value }; }
  #updateRecipient(k,e){ this.recipient = { ...this.recipient, [k]: e.target.value }; }
  #toggleAlert(e){ this.alertEnabled = e.target.checked; }
  #updateAlert(k,e){ this[k] = e.target.value; }

  #validate(){
    const errs = {};
    if (this.step === 1) {
      if (!this.amount || this.amount < 1) errs.amount = 'Definí un monto válido';
      if (!this.giftDate) errs.giftDate = 'Elegí fecha de regalo';
    }
    if (this.step === 2) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.buyer.name) errs.buyerName = 'Nombre es obligatorio';
      if (!this.buyer.dni) errs.buyerDni = 'DNI es obligatorio';
      if (!this.buyer.email || !emailRe.test(this.buyer.email)) errs.buyerEmail = 'Email no válido';
    }
    if (this.step === 3) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.recipient.name) errs.recName = 'Nombre obligatorio';
      if (!this.recipient.lastName) errs.recLastName = 'Apellido obligatorio';
      if (!this.recipient.dni) errs.recDni = 'DNI obligatorio';
      if (!this.recipient.email || !emailRe.test(this.recipient.email)) errs.recEmail = 'Email no válido';
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
    console.log('Formulario completo:', {
      amount: this.amount,
      currency: this.currency,
      giftDate: this.giftDate,
      buyer: this.buyer,
      recipient: this.recipient,
      alert: this.alertEnabled ? { channel: this.alertChannel, datetime: this.alertDatetime } : null,
    });
  }

  render(){
    const e = this.errors;
    return html`
      <form class="card" @submit=${this.#submit}>
        <h2>Comprar Gift Card</h2>

        <!-- Paso 1 -->
        <div class=${this.step===1?'':'hidden'}>
          <label>Monto personalizado
            <input type="number" min="1" step="1" .value=${String(this.amount||'')} @input=${(ev)=>this.#setAmount(ev.target.value)}>
          </label>
          ${e.amount? html`<div class="error">${e.amount}</div>`:''}
          <div class="row">
            ${this.recommendations.map(v=> html`<button type="button" class="pill ${Number(this.amount)===Number(v)?'active':''}" @click=${()=>this.#selectRec(v)}>${this.#fmt(v)}</button>`)}
          </div>
          <label>Fecha de regalo
            <input type="date" min=${new Date().toISOString().split('T')[0]} .value=${this.giftDate} @input=${(ev)=>this.giftDate=ev.target.value}>
          </label>
          ${e.giftDate? html`<div class="error">${e.giftDate}</div>`:''}
        </div>

        <!-- Paso 2 -->
        <div class=${this.step===2?'':'hidden'}>
          <fieldset>
            <legend>Datos del comprador</legend>
            <label>Nombre (usado en el saludo)
              <input type="text" .value=${this.buyer.name} @input=${(ev)=>this.#updateBuyer('name',ev)}>
            </label>
            ${e.buyerName? html`<div class="error">${e.buyerName}</div>`:''}
            <label>Email
              <input type="email" .value=${this.buyer.email} @input=${(ev)=>this.#updateBuyer('email',ev)}>
            </label>
            ${e.buyerEmail? html`<div class="error">${e.buyerEmail}</div>`:''}
            <label>DNI
              <input type="text" .value=${this.buyer.dni} @input=${(ev)=>this.#updateBuyer('dni',ev)}>
            </label>
            ${e.buyerDni? html`<div class="error">${e.buyerDni}</div>`:''}
          </fieldset>
        </div>

        <!-- Paso 3 -->
        <div class=${this.step===3?'':'hidden'}>
          <fieldset>
            <legend>Datos del destinatario</legend>
            <label>Nombre
              <input type="text" .value=${this.recipient.name} @input=${(ev)=>this.#updateRecipient('name',ev)}>
            </label>
            ${e.recName? html`<div class="error">${e.recName}</div>`:''}
            <label>Apellido
              <input type="text" .value=${this.recipient.lastName} @input=${(ev)=>this.#updateRecipient('lastName',ev)}>
            </label>
            ${e.recLastName? html`<div class="error">${e.recLastName}</div>`:''}
            <label>DNI
              <input type="text" .value=${this.recipient.dni} @input=${(ev)=>this.#updateRecipient('dni',ev)}>
            </label>
            ${e.recDni? html`<div class="error">${e.recDni}</div>`:''}
            <label>Email
              <input type="email" .value=${this.recipient.email} @input=${(ev)=>this.#updateRecipient('email',ev)}>
            </label>
            ${e.recEmail? html`<div class="error">${e.recEmail}</div>`:''}
            <label>Celular
              <input type="tel" .value=${this.recipient.phone} @input=${(ev)=>this.#updateRecipient('phone',ev)}>
            </label>
            ${e.recPhone? html`<div class="error">${e.recPhone}</div>`:''}
            <label>Mensaje
              <textarea .value=${this.recipient.message} @input=${(ev)=>this.#updateRecipient('message',ev)}></textarea>
            </label>

            <label class="row">
              <input type="checkbox" .checked=${this.alertEnabled} @change=${this.#toggleAlert}>
              Configurar alerta
            </label>
            ${this.alertEnabled? html`
              <label>Canal
                <select .value=${this.alertChannel} @change=${(ev)=>this.#updateAlert('alertChannel',ev)}>
                  <option value="email">Email</option>
                  <option value="wpp">WhatsApp</option>
                  <option value="reminder">No avisar, solo enviar email de recordatorio al comprador</option>
                </select>
              </label>
            `:''}
          </fieldset>
        </div>

        <div class="row" style="justify-content: space-between; margin-top: 14px;">
          ${this.step>1? html`<button type="button" class="pill" @click=${this.#prev}>Anterior</button>`:''}
          ${this.step<3? html`<button type="button" class="btn" @click=${this.#next}>Siguiente</button>`:''}
          ${this.step===3? html`<button class="btn" type="submit">Añadir al carrito</button>`:''}
        </div>
      </form>
    `;
  }
}

customElements.define('mawc-gift-card-form', GiftCardForm);
