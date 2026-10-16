import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ------------------------------------------------------------------ smooth scroll */
let lenis = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollTo = (target, offset = -88) => {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.1 });
  else {
    const el = typeof target === 'string' ? $(target) : target;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  }
};
// in-page anchors through Lenis
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id === '#topo') {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0 });
      return;
    }
    const el = id.length > 1 && $(id);
    if (el) {
      e.preventDefault();
      scrollTo(el);
    }
  });
});

/* ------------------------------------------------------------------ header */
const hdr = $('[data-hdr]');
if (hdr) {
  let last = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('is-solid', y > 40);
    const goingDown = y > last + 4;
    const goingUp = y < last - 4;
    if (goingDown && y > 320 && !document.body.classList.contains('menu-open')) hdr.classList.add('is-hidden');
    if (goingUp || y < 320) hdr.classList.remove('is-hidden');
    last = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ------------------------------------------------------------------ menu */
const menu = $('[data-menu]');
const openBtn = $('[data-menu-open]');
if (menu && openBtn) {
  const closeBtn = $('[data-menu-close]', menu);
  const focusables = () => $$('a, button', menu);
  const open = () => {
    menu.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    lenis?.stop();
    if (!reduce) gsap.from($$('.menu__list li', menu), { yPercent: 60, opacity: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out' });
    closeBtn.focus();
  };
  const close = () => {
    menu.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    lenis?.start();
    openBtn.focus();
  };
  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      const f = focusables();
      const first = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    }
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => close()));
}

/* ------------------------------------------------------------------ reveal system */
// stagger containers hand an increasing delay to their children
$$('[data-stagger]').forEach((box) => {
  [...box.children].forEach((child, i) => {
    if (child.tagName === 'LEGEND') return;
    if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
    child.style.setProperty('--d', String(i * 70));
  });
});

const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
);
$$('[data-reveal]').forEach((el) => io.observe(el));
// clipped elements report no visible area to IntersectionObserver: watch their parent instead
const ioParent = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        $$(':scope > [data-wipe], :scope > [data-shutter]', e.target).forEach((el) => el.classList.add('is-in'));
        ioParent.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
);
new Set($$('[data-wipe], [data-shutter]').map((el) => el.parentElement)).forEach((p) => ioParent.observe(p));
// masked lines outside the hero rise when they enter
const ioLines = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        ioLines.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -2% 0px', threshold: 0 }
);
$$('.lines').forEach((el) => {
  if (el.closest('[data-hero], [data-page-hero]')) return;
  ioLines.observe(el);
});
// safety net: never leave content hidden if something goes wrong
setTimeout(() => {
  $$('[data-reveal], [data-wipe], [data-shutter], .lines').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in');
  });
}, 2600);

/* ------------------------------------------------------------------ hero */
const hero = $('[data-hero]');
const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
fontsReady.then(() => {
  hero?.classList.add('is-ready');
  $('[data-page-hero]')?.classList.add('is-ready');
  ScrollTrigger.refresh();
});
setTimeout(() => {
  hero?.classList.add('is-ready');
  $('[data-page-hero]')?.classList.add('is-ready');
}, 1200);

/* ------------------------------------------------------------------ split paragraphs */
if (!reduce) {
  fontsReady.then(() => {
    $$('[data-split]').forEach((el) => {
      SplitText.create(el.tagName === 'DIV' ? el.querySelectorAll('p') : el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        linesClass: 'split-line',
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 100,
            duration: 1,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          });
        },
      });
    });
  });
}

/* ------------------------------------------------------------------ scroll-linked moments */
const mm = gsap.matchMedia();
mm.add(
  {
    desk: '(min-width: 900px)',
    mob: '(max-width: 899px)',
    motion: '(prefers-reduced-motion: no-preference)',
  },
  (ctx) => {
    const { desk, motion } = ctx.conditions;
    if (!motion) return;

    // hero lines drift apart as the statement leaves
    if (hero && desk) {
      gsap.to($('.l1', hero), { xPercent: -7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
      gsap.to($('.l2', hero), { xPercent: 5, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 0.6 } });
      gsap.to($('.hero__foot', hero), { opacity: 0, y: -30, ease: 'none', scrollTrigger: { trigger: hero, start: '40% top', end: '85% top', scrub: true } });
    }

    // the plates switch on
    const plates = $('[data-plates]');
    if (plates) {
      const imgs = $$('img', plates);
      const shades = $$('.plates__shade', plates);
      gsap.fromTo(imgs, { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: plates, start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.fromTo(shades, { opacity: 0.86 }, { opacity: 0, ease: 'power1.in', stagger: 0.15, scrollTrigger: { trigger: plates, start: 'top 80%', end: 'center 45%', scrub: true } });
    }

    // the partners settle into their field
    const sImg = $('[data-socias-img] img');
    if (sImg) {
      gsap.fromTo(sImg, { yPercent: 12, scale: 1.04 }, { yPercent: 0, scale: 1, ease: 'none', scrollTrigger: { trigger: sImg.closest('section'), start: 'top bottom', end: 'center center', scrub: true } });
    }

    // the staircase of steps slides into place
    if (desk) {
      $$('[data-step]').forEach((li) => {
        gsap.fromTo(li, { x: 90 }, { x: 0, ease: 'none', scrollTrigger: { trigger: li, start: 'top bottom', end: 'top 50%', scrub: true } });
      });
    }

    // full-bleed photograph drifts
    $$('[data-drift] img').forEach((img, k) => {
      const amp = k % 2 ? 7 : 5;
      gsap.fromTo(img, { yPercent: -amp }, { yPercent: amp, ease: 'none', scrollTrigger: { trigger: img.closest('[data-drift]'), start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // footer phone slides along the field
    const big = $('.ftr__big a');
    if (big && desk) {
      gsap.fromTo(big, { xPercent: 6 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '[data-footer]', start: 'top bottom', end: 'top 20%', scrub: true } });
    }
  }
);

/* ------------------------------------------------------------------ magnetic action */
if (fine && !reduce) {
  $$('[data-magnetic]').forEach((btn) => {
    const qx = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
    const qy = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      qx(gsap.utils.clamp(-7, 7, (e.clientX - (r.left + r.width / 2)) * 0.15));
      qy(gsap.utils.clamp(-7, 7, (e.clientY - (r.top + r.height / 2)) * 0.15));
    });
    btn.addEventListener('pointerleave', () => {
      qx(0);
      qy(0);
    });
  });
}

/* ------------------------------------------------------------------ areas caption */
const caption = $('[data-area-caption]');
if (caption) {
  const def = caption.dataset.default;
  let timer;
  const set = (txt) => {
    clearTimeout(timer);
    caption.style.opacity = '0';
    timer = setTimeout(() => {
      caption.textContent = txt;
      caption.style.opacity = '1';
    }, 140);
  };
  $$('[data-resumo]').forEach((row) => {
    row.addEventListener('pointerenter', () => set(row.dataset.resumo));
    row.addEventListener('focus', () => set(row.dataset.resumo));
  });
  $('[data-areas] .areas__col')?.addEventListener('pointerleave', () => set(def));
}

/* ------------------------------------------------------------------ triage (live thing) */
const tri = $('[data-triagem]');
if (tri) {
  const sits = $$('.ficha__sit', tri);
  const waBtn = $('[data-wa]', tri);
  const perfil = $('[data-perfil]', tri);
  const prazo = $('[data-prazo]', tri);
  const ficha = $('[data-ficha]', tri);
  const phone = waBtn.href.split('?')[0];
  const current = () => sits.find((s) => s.classList.contains('is-on')) || sits[0];
  const compose = () => {
    const s = current();
    let msg = s.dataset.msg || '';
    if (perfil.value) msg += ` Sou ${perfil.value.toLowerCase()}.`;
    if (prazo.value === 'sim') msg += ' Já há um prazo correndo.';
    if (prazo.value === 'nao') msg += ' Ainda não há prazo correndo.';
    waBtn.href = `${phone}?text=${encodeURIComponent(msg)}`;
  };
  $$('input[name="situacao"]', tri).forEach((input) => {
    input.addEventListener('change', () => {
      sits.forEach((s) => s.classList.toggle('is-on', s.dataset.sit === input.value));
      compose();
      if (window.matchMedia('(max-width: 899px)').matches) {
        const r = ficha.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.6) scrollTo(ficha, -80);
      }
    });
  });
  perfil.addEventListener('change', compose);
  prazo.addEventListener('change', compose);
  compose();
}

/* ------------------------------------------------------------------ contact form */
const form = $('[data-contact-form]');
if (form) {
  const out = $('[data-form-status]', form);
  const build = () => {
    const d = new FormData(form);
    const parts = [];
    parts.push(`Olá. Meu nome é ${String(d.get('nome') || '').trim() || '(não informado)'}.`);
    if (d.get('perfil')) parts.push(`Sou ${String(d.get('perfil')).toLowerCase()}.`);
    if (d.get('assunto')) parts.push(`Assunto: ${d.get('assunto')}.`);
    const p = d.get('prazo');
    if (p === 'sim') parts.push('Já há um prazo correndo.');
    if (p === 'nao') parts.push('Ainda não há prazo correndo.');
    if (p === 'nao-sei') parts.push('Não sei se há prazo correndo.');
    const m = String(d.get('mensagem') || '').trim();
    if (m) parts.push(m);
    return parts.join(' ');
  };
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const via = e.submitter?.value || 'whatsapp';
    const msg = build();
    const url =
      via === 'email'
        ? `mailto:${form.dataset.email}?subject=${encodeURIComponent('Atendimento pelo site')}&body=${encodeURIComponent(msg)}`
        : `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(msg)}`;
    if (via === 'email') window.location.href = url;
    else window.open(url, '_blank', 'noopener');
    if (out) out.textContent = via === 'email' ? 'Abrimos o seu aplicativo de e-mail com a mensagem pronta.' : 'Abrimos o WhatsApp numa nova aba com a mensagem pronta.';
  });
}

/* ------------------------------------------------------------------ copy link on FAQ anchors */
$$('[data-copy]').forEach((b) => {
  b.addEventListener('click', async () => {
    const url = `${location.origin}${location.pathname}#${b.dataset.copy}`;
    try {
      await navigator.clipboard.writeText(url);
      b.textContent = 'Link copiado';
      setTimeout(() => (b.textContent = 'Copiar link'), 1800);
    } catch {
      location.hash = b.dataset.copy;
    }
  });
});

window.addEventListener('load', () => ScrollTrigger.refresh());
