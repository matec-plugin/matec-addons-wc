// Opción sin build: import directo desde CDN ESM
import { LitElement, html, css } from 'Lit';

export class HelloWord extends LitElement {
    static properties = {
        mensaje: { type: String, reflect: true },
        contador: { type: Number, reflect: true },
    };

    static styles = css`
    :host { display: inline-block; padding: 12px 16px; border-radius: 12px; }
    button { border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; }
    .num { font-weight: 600; }
  `;

    constructor() {
        super();
        this.mensaje = 'Hola Lit';
        this.contador = 0;
    }

    #inc = () => { this.contador += 1; };
    #dec = () => { this.contador -= 1; };

    render() {
        return html`
      <div class="box">
        <p>${this.mensaje} — <span class="num">${this.contador}</span></p>
        <button @click=${this.#inc}>Incrementar</button>
        <button @click=${this.#dec}>Decrementar</button>
      </div>
    `;
    }
}

customElements.define('hello-word', HelloWord);
