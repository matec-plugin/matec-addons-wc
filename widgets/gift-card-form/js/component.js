// Opción sin build (CDN ESM):
// import { LitElement, html, css } from 'https://esm.run/lit';
import { LitElement, html, css } from 'Lit';

export class GiftCardForm extends LitElement {
  static properties = {
    amount: { type: Number, reflect: true },
    currency: { type: String, reflect: true },
    locale: { type: String, reflect: true },
    recommendations: { type: Array },
    alertEnabled: { type: Boolean, reflect: true, attribute: 'alert-enabled' },
    alertChannel: { type: String, reflect: true, attribute: 'alert-channel' }, // 'email' | 'sms'
    alertDatetime: { type: String, reflect: true, attribute: 'alert-datetime' },
    buyer: { state: true },
    recipient: { state: true },
    errors: { state: true },
  };

  static styles = css`
    :host { display: block; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell; color: #0b1324; }
    .card { border: 1px solid #e3e7ef; border-radius: 16px; padding: 16px; background: #fff; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    h2 { margin: 0 0 12px; font-size: 1.1rem; }
    .grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
    @media (min-width: 820px){ .grid{ grid-template-columns: repeat(2, 1fr);} }
    fieldset { border: none; padding: 0; margin: 0; display: grid; gap: 10px; }
    label { display: grid; gap: 6px; font-weight: 600; font-size: .92rem; }
    input, textarea, select { border: 1px solid #d6dbe8; border-radius: 10px; padding: 10px 12px; font-size: 1rem; outline: none; }
    input:focus, textarea:focus, select:focus{ border-color: #6b8dff; box-shadow: 0 0 0 3px rgba(107,141,255,0.2); }
    .row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
    button { border: none; padding: 10px 12px; border-radius: 10px; cursor: pointer; }
    .btn { background: #0f172a; color: #fff; font-weight: 700; }
    .pill { background: #f3f5fb; }
    .pill.active { background: #0f172a; color: #fff; }
    .muted{ color: #5b6784; }
    .error { color: #b42318; font-size: .9rem; }
    .section { display: grid; gap: 12px; }
    .amountBox{ display: grid; gap: 10px; }
    .inline { display: flex; align-items: center; gap: 8px; }
  `;

  constructor(){
    super();
    this.amount = 0;
    this.currency = 'ARS';
    this.locale = 'es-AR';
    this.recommendations = [10000, 20000, 50000];
    this.alertEnabled = false;
    this.alertChannel = 'email';
    this.alertDatetime = '';
    this.buyer = { name: '', email: '' };
    this.recipient = { name: '', email: '', message: '' };
    this.errors = {};
  }

  #fmt(n){
    try{ return new Intl.NumberFormat(this.locale, { style:'currency', currency: this.currency }).format(Number(n||0)); }
    catch{ return `${this.currency} ${Number(n||0).toFixed(2)}` }
  }

  #setAmount(v){ this.amount = Math.max(0, Number(v||0)); }

  #selectRec(v){ this.amount = Number(v); }

  #updateBuyer(k, e){ this.buyer = { ...this.buyer, [k]: e.target.value }; }
  #updateRecipient(k, e){ this.recipient = { ...this.recipient, [k]: e.target.value }; }

  #toggleAlert(e){ this.alertEnabled = e.target.checked; }
  #updateAlert(k, e){ this[k] = e.target.value; }

  #validate(){
    const errs = {};
    if (!this.amount || this.amount < 1) errs.amount = 'Define un monto (mayor a 0).';
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.buyer.name) errs.buyerName = 'Nombre del comprador es obligatorio.';
    if (!this.buyer.email || !emailRe.test(this.buyer.email)) errs.buyerEmail = 'Email del comprador no es válido.';
    if (!this.recipient.name) errs.recName = 'Nombre del destinatario es obligatorio.';
    if (!this.recipient.email || !emailRe.test(this.recipient.email)) errs.recEmail = 'Email del destinatario no es válido.';
    if (this.alertEnabled){
      if (!this.alertDatetime) errs.alertDatetime = 'Configurá fecha y hora de alerta.';
      if (!['email','sms'].includes(this.alertChannel)) errs.alertChannel = 'Canal inválido.';
    }
    this.errors = errs;
    return Object.keys(errs).length === 0;
  }

  #submit(ev){
    ev.preventDefault();
    if (!this.#validate()) return;
    const detail = {
      amount: Number(this.amount),
      currency: this.currency,
      buyer: { ...this.buyer },
      recipient: { ...this.recipient },
      alert: this.alertEnabled ? { channel: this.alertChannel, datetime: this.alertDatetime } : null,
      createdAt: new Date().toISOString(),
    };
    this.dispatchEvent(new CustomEvent('giftcard-submit', { detail, bubbles: true, composed: true }));
  }

  reset(){
    this.amount = 0;
    this.buyer = { name: '', email: '' };
    this.recipient = { name: '', email: '', message: '' };
    this.alertEnabled = false;
    this.alertChannel = 'email';
    this.alertDatetime = '';
    this.errors = {};
  }

  render(){
    const e = this.errors || {};
    return html`
      <form class="card" @submit=${this.#submit} novalidate>
        <h2>Comprar Gift Card</h2>
        <div class="section amountBox" aria-describedby="amount-help">
          <label>
            Monto personalizado
            <div class="inline">
              <span class="muted">${this.currency}</span>
              <input type="number" inputmode="decimal" min="1" step="1" .value=${String(this.amount||'')} @input=${(ev)=>this.#setAmount(ev.target.value)} aria-invalid=${e.amount? 'true':'false'} aria-describedby="amount-help ${e.amount? 'err-amount':''}">
            </div>
          </label>
          <div id="amount-help" class="muted">O elegí una recomendación:</div>
          <div class="row" role="group" aria-label="Recomendaciones de monto">
            ${this.recommendations.map(v=> html`<button type="button" class="pill ${Number(this.amount)===Number(v)?'active':''}" @click=${()=>this.#selectRec(v)}>${this.#fmt(v)}</button>`) }
          </div>
          ${e.amount? html`<div id="err-amount" class="error">${e.amount}</div>`: ''}
        </div>

        <div class="grid section">
          <fieldset>
            <legend class="muted" style="margin-bottom:4px;">Datos del comprador</legend>
            <label>Nombre
              <input type="text" placeholder="Tu nombre" .value=${this.buyer.name} @input=${(ev)=>this.#updateBuyer('name', ev)} aria-invalid=${e.buyerName? 'true':'false'}>
            </label>
            ${e.buyerName? html`<div class="error">${e.buyerName}</div>`: ''}
            <label>Email
              <input type="email" placeholder="tu@email.com" .value=${this.buyer.email} @input=${(ev)=>this.#updateBuyer('email', ev)} aria-invalid=${e.buyerEmail? 'true':'false'}>
            </label>
            ${e.buyerEmail? html`<div class="error">${e.buyerEmail}</div>`: ''}
          </fieldset>

          <fieldset>
            <legend class="muted" style="margin-bottom:4px;">Datos del destinatario</legend>
            <label>Nombre
              <input type="text" placeholder="Nombre del destinatario" .value=${this.recipient.name} @input=${(ev)=>this.#updateRecipient('name', ev)} aria-invalid=${e.recName? 'true':'false'}>
            </label>
            ${e.recName? html`<div class="error">${e.recName}</div>`: ''}
            <label>Email
              <input type="email" placeholder="destinatario@email.com" .value=${this.recipient.email} @input=${(ev)=>this.#updateRecipient('email', ev)} aria-invalid=${e.recEmail? 'true':'false'}>
            </label>
            ${e.recEmail? html`<div class="error">${e.recEmail}</div>`: ''}
            <label>Mensaje (opcional)
              <textarea rows="3" maxlength="300" placeholder="¡Gracias por todo!" .value=${this.recipient.message} @input=${(ev)=>this.#updateRecipient('message', ev)}></textarea>
            </label>
          </fieldset>
        </div>

        <div class="section">
          <label class="inline">
            <input type="checkbox" .checked=${this.alertEnabled} @change=${this.#toggleAlert}>
            Quiero configurar una alerta de entrega/envío
          </label>
          ${this.alertEnabled ? html`
            <div class="grid" style="grid-template-columns: 1fr 1fr; gap: 10px;">
              <label>Canal de alerta
                <select .value=${this.alertChannel} @change=${(ev)=>this.#updateAlert('alertChannel', ev)} aria-invalid=${e.alertChannel? 'true':'false'}>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                </select>
              </label>
              <label>Fecha y hora
                <input type="datetime-local" .value=${this.alertDatetime} @input=${(ev)=>this.#updateAlert('alertDatetime', ev)} aria-invalid=${e.alertDatetime? 'true':'false'}>
              </label>
            </div>
            ${e.alertChannel? html`<div class="error">${e.alertChannel}</div>`: ''}
            ${e.alertDatetime? html`<div class="error">${e.alertDatetime}</div>`: ''}
          `: ''}
        </div>

        <div class="row" style="justify-content: space-between; margin-top: 14px;">
          <div class="muted">Total: <strong>${this.#fmt(this.amount)}</strong></div>
          <div class="row">
            <button type="button" class="pill" @click=${this.reset}>Limpiar</button>
            <button class="btn" type="submit">Comprar</button>
          </div>
        </div>
      </form>
    `;
  }
}

customElements.define('mawc-gift-card-form', GiftCardForm);

