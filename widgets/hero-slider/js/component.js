// Hero Slider - Lit (compatible ES2019 / sin campos privados)
// CDN: import { LitElement, html, css } from 'https://esm.run/lit';
import { LitElement, html, css } from 'Lit';

export class HeroSlider extends LitElement {
  static properties = {
    slides: { type: Array }, // [{src, alt, title, subtitle, ctaText, ctaHref, badgeText}]
    interval: { type: Number, reflect: true }, // ms
    current: { type: Number },
    autoplay: { type: Boolean, reflect: true },
    pauseOnHover: { type: Boolean, attribute: 'pause-on-hover', reflect: true },
  };

  static styles = css`
    :host{ display:block; position:relative; --h: 60vh; --radius: 0; }
    .hero{ position:relative; overflow:hidden; height:var(--h); border-radius:var(--radius); margin-bottom:10px; padding-bottom:20px; }
    .track{ display:flex; height:100%; transition: transform .6s ease; }
    .slide{ position:relative; min-width:100%; height:100%; }
    .img{ width:100%; height:100%; object-fit:cover; object-position:center; display:block; }
    .shade{ position:absolute; inset:0; background: linear-gradient(90deg, rgba(0,0,0,.45) 0%, rgba(0,0,0,.25) 40%, rgba(0,0,0,0) 70%); }
    .content{ position:absolute; inset:auto 0 0 0; padding: clamp(16px, 5vw, 40px); color:#fff; display:grid; gap:.5rem; max-width:min(1000px, 90%); }
    .title{ font-size: clamp(1.4rem, 3.2vw, 3rem); line-height:1.05; font-weight:800; text-shadow:0 2px 16px rgba(0,0,0,.35); }
    .subtitle{ font-size: clamp(.95rem, 1.4vw, 1.25rem); opacity:.95; max-width: 60ch; text-shadow:0 2px 12px rgba(0,0,0,.35); }
    .row{ display:flex; gap:.6rem; align-items:center; flex-wrap:wrap; }
    .btn{ appearance:none; border:none; background:#111827; color:#fff; padding:.7rem 1rem; border-radius:999px; font-weight:700; cursor:pointer; }
    .btn[href]{ text-decoration:none; display:inline-block; }
    .badge{ background:#9AE6B4; color:#0B1324; border-radius:999px; padding:.35rem .6rem; font-size:.85rem; font-weight:800; }

    /* arrows */
    .nav{ position:absolute; inset:0; display:flex; align-items:center; justify-content:space-between; pointer-events:none; }
    .arrow{ pointer-events:auto; display:grid; place-items:center; width:44px; height:44px; border-radius:999px; background:rgba(0,0,0,.45); color:#fff; border:1px solid rgba(255,255,255,.35); margin: 0 .5rem; cursor:pointer; }
    .arrow:focus{ outline:2px solid #fff; }

    /* dots */
    .dots{ position:absolute; left:0; right:0; bottom:2px; display:flex; gap:8px; justify-content:center; align-items:center; }
    .dot{ width:8px; height:8px; border-radius:50%; background:rgba(122,122,122,.5); border:1px solid rgba(122,122,122,.5); cursor:pointer; }
    .dot.active{ background:#272727; transform: scale(1.2); }

    @media (max-width: 700px){ :host{ --h: 48vh } }
  `;

  constructor(){
    super();
    this.slides = [];
    this.interval = 5000;
    this.current = 0;
    this.autoplay = true;
    this.pauseOnHover = true;
    this._timer = null;    // reemplazo de #timer
    this._io = null;       // reemplazo de #io (IntersectionObserver)
    this._boundKey = this._onKey.bind(this); // reemplazo de #boundKey
  }

  connectedCallback(){
    super.connectedCallback();
    // Permitir pasar slides por atributo como JSON
    if (typeof this.slides === 'string') {
      try { this.slides = JSON.parse(this.slides); } catch(e) { this.slides = []; }
    }
    this._start();
    window.addEventListener('keydown', this._boundKey);
    var self = this;
    this._io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ en.isIntersecting ? self._start() : self._stop(); });
    }, { threshold: 0.25 });
    this._io.observe(this);
  }

  disconnectedCallback(){
    super.disconnectedCallback();
    this._stop();
    window.removeEventListener('keydown', this._boundKey);
    if (this._io && this._io.disconnect) this._io.disconnect();
  }

  _start(){
    if (!this.autoplay || (this._timer !== null)) return;
    var self = this;
    this._timer = setInterval(function(){ self.next(); }, this.interval);
  }

  _stop(){
    if (this._timer) clearInterval(this._timer);
    this._timer = null;
  }

  _onKey(e){
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  prev(){
    if (!this.slides.length) return;
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
  }
  next(){
    if (!this.slides.length) return;
    this.current = (this.current + 1) % this.slides.length;
  }
  go(i){
    if (!this.slides.length) return;
    this.current = i % this.slides.length;
  }

  _onEnter(){ if(this.pauseOnHover) this._stop(); }
  _onLeave(){ if(this.pauseOnHover) this._start(); }

  // Swipe simple
  firstUpdated(){
    var el = this.renderRoot && this.renderRoot.querySelector('.hero');
    if (!el) return;
    var x0 = null;
    el.addEventListener('pointerdown', function(e){ x0=e.clientX; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointerup', (e)=>{
      if(x0==null) return; var dx=e.clientX-x0; x0=null; if(Math.abs(dx)>30) dx<0?this.next():this.prev();
    });
  }

  render(){
    var slides = this.slides || [];
    var offset = 'translateX(-'+ (this.current*100) +'%)';
    return html`
      <section class="hero" @mouseenter=${this._onEnter} @mouseleave=${this._onLeave} aria-roledescription="carousel" aria-label="Hero" tabindex="0">
        <div class="track" style="transform:${offset}" role="group" aria-live="polite">
          ${slides.map((s)=> html`
            <article class="slide">
              <img class="img" src=${s.src} alt=${s.alt||''} loading="lazy" />
              <div class="shade" aria-hidden="true"></div>
              <div class="content">
                ${s.badgeText? html`<span class="badge">${s.badgeText}</span>`: ''}
                ${s.title? html`<h2 class="title">${s.title}</h2>`: ''}
                ${s.subtitle? html`<p class="subtitle">${s.subtitle}</p>`: ''}
                <div class="row">
                  ${s.ctaText? html`<a class="btn" href=${s.ctaHref||'#'}>${s.ctaText}</a>`: ''}
                </div>
              </div>
            </article>
          `)}
        </div>

        ${slides.length>1 ? html`
          <div class="nav" aria-hidden="false">
            <button class="arrow" @click=${this.prev} aria-label="Anterior">‹</button>
            <button class="arrow" @click=${this.next} aria-label="Siguiente">›</button>
          </div>
          <div class="dots">
            ${slides.map((_,i)=> html`<button class="dot ${i===this.current?'active':''}" @click=${()=>this.go(i)} aria-label="Ir al slide ${i+1}"></button>`)}
          </div>
        `: ''}
      </section>
    `;
  }
}

customElements.define('mawc-hero-slider', HeroSlider);
