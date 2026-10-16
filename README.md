# Advogando para Médicos — Borges & Fidélis Advocacia

Site institucional da Borges & Fidélis Advocacia (advocacia dedicada a médicos e profissionais da saúde).
Versão 2 (outubro de 2026), tipografia PP Mori.

## Stack
- [Astro 5](https://astro.build) gerando páginas estáticas (`npm run build` → `dist/`)
- GSAP 3 (ScrollTrigger + SplitText) e Lenis para as animações de scroll
- Imagens otimizadas no build (`astro:assets` + sharp, WebP responsivo)
- Hospedagem: Vercel (cada push na `main` publica)

## Banco de conteúdo
Todo o texto do site vem de `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `site.json` | Dados do escritório: contatos, endereço, sócias (OAB e formação), grupos de áreas, passos de atendimento |
| `areas.json` | As 10 áreas de atuação: resumo, situações, pontos jurídicos com norma citada, método, normas, FAQ, cuidado |
| `triagem.json` | As 8 situações da triagem "O que aconteceu?" da home |
| `faq.json` | As 12 dúvidas gerais |
| `artigos.json` | Os 4 artigos de Conteúdos |

Para alterar um texto, edite o JSON e faça push. Fontes da pesquisa: `_source/pesquisa/`.
Material original do site antigo (WordPress): `_source/old-site/`.

## Desenvolvimento
```
npm install
npm run dev
```

## Fonte
PP Mori (Pangram Pangram). O arquivo atual é a versão "Free for Personal Use":
**antes do lançamento, adquirir a licença web** para uso comercial e substituir os arquivos em `public/fonts/`.
