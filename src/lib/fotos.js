import principal from '../assets/img/principal.jpg';
import placaBorges from '../assets/img/placa-borges.jpg';
import placaFidelis from '../assets/img/placa-fidelis.jpg';
import sala from '../assets/img/sala-reunioes.jpg';
import corredor from '../assets/img/corredor.jpg';
import estacao from '../assets/img/estacao-de-trabalho.jpg';

/** Fotografias reais do escritório. Toda foto aparece inteira no site, sem recorte. */
export const fotos = {
  principal: {
    src: principal,
    alt: 'Logotipo Borges & Fidélis em letras pretas aplicado na parede de mármore do escritório',
    cap: 'Borges & Fidélis, em Uberlândia',
  },
  borges: {
    src: placaBorges,
    alt: 'Placa de madeira com o nome Borges e o monograma do escritório iluminados em dourado, na sala da Dra. Tuane Borges',
    cap: 'Sala da Dra. Tuane Borges',
  },
  fidelis: {
    src: placaFidelis,
    alt: 'Placa de madeira com o nome Fidélis e o monograma do escritório iluminados em dourado, na sala da Dra. Flávia Fidélis',
    cap: 'Sala da Dra. Flávia Fidélis',
  },
  sala: {
    src: sala,
    alt: 'Sala de reuniões do escritório, com mesa de mármore, cadeiras caramelo e janela para a cidade',
    cap: 'Sala de reuniões',
  },
  corredor: {
    src: corredor,
    alt: 'Corredor do escritório com divisórias de vidro e vasos de plantas',
    cap: 'Corredor das salas',
  },
  estacao: {
    src: estacao,
    alt: 'Estação de trabalho do escritório, com estante de livros jurídicos e janelas amplas',
    cap: 'Estação de trabalho',
  },
};

/** Pares usados nas páginas internas, em rodízio */
export const pares = [
  ['principal', 'corredor'],
  ['borges', 'sala'],
  ['fidelis', 'estacao'],
  ['principal', 'sala'],
  ['borges', 'corredor'],
  ['fidelis', 'principal'],
  ['estacao', 'borges'],
  ['sala', 'fidelis'],
  ['corredor', 'principal'],
  ['estacao', 'fidelis'],
];
