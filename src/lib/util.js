import site from '../data/site.json';
import areas from '../data/areas.json';

export const wa = (msg = site.mensagemPadrao) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mail = (subject = 'Atendimento', body = '') =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const areaBySlug = Object.fromEntries(areas.map((a) => [a.slug, a]));

export const grupos = Object.entries(site.grupos).map(([id, label]) => ({
  id,
  label,
  areas: areas.filter((a) => a.grupo === id),
}));

/** Split "Título: subtítulo" into parts */
export const splitTitle = (t) => {
  const i = t.indexOf(':');
  return i > 0 ? [t.slice(0, i).trim(), t.slice(i + 1).trim()] : [t, ''];
};

/** Capitalise first letter (for subtitles after a colon) */
export const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

/** Longest line length, used to fit display titles to the width */
export const fit = (lines) => Math.max(...lines.map((l) => [...l].length));

export const oabLine = () =>
  site.socias.map((s) => `${s.tratamento}, ${s.oab.join(', ')}`).join(' · ');

export const ano = new Date().getFullYear();

/** Break a display name into at most two balanced lines */
export const breakTitle = (t, max = 14) => {
  if ([...t].length <= max || !t.includes(' ')) return [t];
  const words = t.split(' ');
  let best = [t], score = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' '), b = words.slice(i).join(' ');
    const s = Math.max(a.length, b.length);
    if (s < score) { score = s; best = [a, b]; }
  }
  return best;
};

export const dataBR = (iso) => {
  const meses = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} de ${meses[m - 1]} de ${y}`;
};
