# Referências de design, motion e interação — Borges & Fidélis · Advogando para Médicos

Pesquisa de direção de arte para o redesign do site. Outubro de 2026.
Restrições do projeto: tipografia única **PP Mori** (Extralight 200, Regular 400, SemiBold 600 e itálicos), paleta azul-noite `#0F1B23`, papel `#F2EFEA`, latão `#C9A35B` (das placas iluminadas), carvalho `#CDB894`; GSAP ScrollTrigger + Lenis; conformidade com o CED da OAB (arts. 39–47) e o Provimento 205/2021 (sem depoimentos, sem estatística de êxito, sem autopromoção).

---

## 0. Resumo executivo

### Três direções visuais

| | Direção | Em uma frase | Base no catálogo |
|---|---|---|---|
| **A** | **Placa acesa** (noturna) | O site é o escritório à noite: azul-noite como superfície principal, o latão como a única fonte de luz e as faixas de papel como "salas de leitura". | Mercury, Runway, Lamborghini, Linear |
| **B** | **Prontuário editorial** (papel) | Um relatório clínico-jurídico impresso: papel quente, grade milimetrada, numeração de dispositivos legais (Art., §, inciso) como sistema tipográfico e Extralight enorme em tinta azul-noite. | Oura, Apple, Stripe (banda creme), Runway (fonte única) |
| **C** | **Pulso e parágrafo** (linha contínua) | Uma única linha de latão atravessa o site inteiro: nasce como traçado de ECG no herói, vira a régua do parágrafo, o sublinhado dos links e termina como linha de assinatura no rodapé. | Apple (alternância claro/escuro), Framer (cortes de modo) |

**Recomendação:** usar **B como base** (é o que mais combina com a decisão já tomada de "relatório impresso"), com **as faixas escuras de A** como pontuação (herói, sócias/placas, rodapé) e **a linha de C** como assinatura de motion. As três direções são compatíveis porque partem do mesmo sistema de tokens (seção 1.8).

### Os 8 padrões de interação mais valiosos (detalhes na seção 3)
1. Do pulso ao parágrafo: o traçado de ECG que se transforma em linha de assinatura.
2. Manchetes reveladas por máscara de linha (SplitText com `mask: "lines"`).
3. Glossário em duas colunas, Medicina ↔ Direito, que se alinham com o scroll.
4. Índice das áreas como sumário de código, com prévia que acompanha o ponteiro (em vez de grade de cards).
5. Triagem "O que aconteceu?" como ficha clínica que se preenche.
6. Régua milimetrada fixa que serve de barra de progresso e de navegação por seções (§1 a §9).
7. Placas das sócias que "acendem" com uma varredura de luz.
8. Protocolo de atendimento em scroll horizontal pinado (só no desktop), costurado pela linha de ECG.

---

## 1. Catálogo awesome-design-md: o que aproveitar

O catálogo (`/home/claude/_awesome/design-md/`, 84 marcas) é forte em tokens estáticos e fraco em motion: quase nenhum DESIGN.md registra tempos ou curvas (o da Notion só sugere "150–200ms ease"; Ferrari e Bugatti dizem explicitamente que animação ficou de fora). Por isso os princípios de motion da seção 3 vêm da pesquisa web e da prática de GSAP, não do catálogo.

### Marcas escolhidas e por quê

| Marca | Por que entra | Lido em |
|---|---|---|
| **Runway** | O caso mais próximo da nossa restrição: **uma única fonte faz tudo** (display, corpo, rótulos), heróis escuros e faixas de leitura em papel. | `runwayml/DESIGN.md` |
| **Mercury** | "Banco privado noturno": superfície tinta-violeta, **pesos leves** (360/420/480) e uma só cor de ação. É a tradução direta de azul-noite com PP Mori fina. | `mercury/DESIGN.md` |
| **Oura** | Saúde premium em **papel creme** (`#f7f1e8`), longos silêncios entre seções, cores terrosas fora dos botões. | `oura/DESIGN.md` |
| **Apple** | Ritmo de **alternância claro/escuro como divisor**, corpo a 17px e a régua de pesos sem 500. | `apple/DESIGN.md` |
| **Stripe** | **Display em peso fino com tracking negativo proporcional**, algarismos tabulares e marinho como tinta no lugar do preto. | `stripe/DESIGN.md` |
| **Linear** | **Escada de superfícies escuras + hairlines** no lugar de sombra, eyebrows com tracking positivo e acento escasso. | `linear.app/DESIGN.md` |
| *Apoio:* Framer, Lamborghini | Framer: tracking de cartaz (-5% a 110px) e "cortes de modo". Lamborghini: **monocromia + ouro como única cor** e hover só por cor. | `framer/`, `lamborghini/` |

Marcas que existem no catálogo mas ficaram de fora: Vercel e Raycast (linguagem de ferramenta de dev), Notion (lúdica demais), Lovable e Clay (gradientes, formas orgânicas).

### 1.1 Runway: fonte única, cinema e papel
- **Uma família, expressão completa.** A variedade vem de tamanho, peso, caixa e tracking, nunca da troca de fonte. Display a 48px/400 com **line-height 1.0** e tracking de -1.2px (-2,5%).
- **Caixa-alta só para estrutura.** Rótulos de 11–14px em caixa-alta com tracking **positivo** (+0,35px) funcionam como sinalização, em contraste com o texto minúsculo e apertado.
- **Zero sombra.** A profundidade vem da alternância de seções escuras e claras e da fotografia ("no cinema, profundidade é luz e foco, não drop-shadow").
- **Raio pequeno (4–8px), nunca pílula.** Grade editorial assimétrica: uma imagem grande e duas menores.
- *Para B&F:* PP Mori pode carregar o sistema sozinha se tratarmos o **itálico Extralight como "segunda voz"** (o papel que a serifa faz na Oura).

### 1.2 Mercury: o banco privado noturno
- **Dois mundos:** `night #171721` com cards um degrau acima (`#1e1e2a`) e páginas claras quase brancas. **Nav e rodapé sempre noturnos**, emoldurando as páginas claras. Para nós: herói e rodapé em azul-noite em todas as páginas, miolo em papel.
- **Pesos leves em tudo:** corpo 360, UI 420, títulos 480. A hierarquia vem de tamanho e cor, não de negrito. Com PP Mori: títulos em 200, corpo em 400, UI e rótulos em 600.
- **Uma ação saturada por vista.** As outras ações são cápsulas translúcidas (fundo da cor a 10–20%).
- Seções de 80–128px de respiro; títulos de seção estreitos (~600px).

### 1.3 Oura: saúde premium em papel
- **O papel é o estado de repouso.** O branco puro fica só para elementos elevados (inputs, cards), nunca para o fundo. Isso vale literalmente para o nosso `#F2EFEA`.
- **"Serifa para sentimento, sans para fatos".** Tradução para fonte única: **Extralight/itálico para a frase de sentimento, Regular para o fato** (ex.: "Defendemos quem *cuida*." em 200 itálico; o parágrafo técnico em 400).
- **Cores terrosas em faixas, ilustração e dados, nunca em botões.** Para nós: o carvalho `#CDB894` fica em superfícies, divisores e gráficos; o latão é o sinal.
- **O silêncio é estrutura:** espaços longos entre seções ritmam o scroll como capítulos. O rodapé é quase preto.
- Eyebrow: 12px, peso 700 (para nós, 600), caixa-alta, +1px de tracking.

### 1.4 Apple: ritmo e contenção
- **A mudança de cor é o divisor.** Seções de ponta a ponta, sem bordas, alternando claro e escuro. Cada seção ocupa mais ou menos uma viewport e tem pelo menos 64px de ar acima do título.
- **Corpo a 17px, não 16px:** o pixel extra marca um ritmo "de leitura, não de varredura". Para o público médico (35–65 anos, lendo no celular entre plantões), **17–19px** é o certo.
- **A régua de pesos pula o 500** (300/400/600/700). A PP Mori que licenciamos (200/400/600) já impõe essa disciplina.
- **Uma única sombra no sistema, reservada ao objeto sobre superfície.** Para nós: só a placa de latão pode ter "luz". Nenhum card leva sombra.
- Estado de pressionado: `scale(.95)`; para o tom jurídico, `.98` ou `translateY(1px)`. Rodapé denso com entrelinha 2,41 nas listas de links.

### 1.5 Stripe: fino, apertado e tabular
- **Display sempre em peso fino (300) com tracking negativo proporcional:** -1,4px a 56px (-2,5%), caindo até -0,2px a 20px. "Subir para 400 derruba o ar editorial." Com PP Mori 200, use de -0,03 a -0,04em em tamanhos grandes.
- **`font-feature-settings: "tnum"` em todo número** (prazos, artigos de lei, anos). É um detalhe que sinaliza rigor documental.
- **Marinho como tinta, não preto** (`#0d253d`). O nosso azul-noite cumpre esse papel: o texto em papel deve ser `#0F1B23`, nunca `#000`.
- **Banda creme como interlúdio quente** entre seções frias. Um botão preenchido por banda, no máximo.

### 1.6 Linear: escada escura e hairlines
- **Quatro degraus de superfície escura** (`#010102 → #0f1011 → #141516 → #18191a`) e hairlines (`#23252a`) carregam a hierarquia sem sombra. Linear quase não usa drop-shadow no escuro.
- Tracking agressivo no display (-3px a 80px, ~-3,75%) contra um eyebrow de **+0,4px**: o tracking positivo marca a "taxonomia".
- Anel de foco de 2px na cor de destaque a 50%. O acento aparece só no logo, no CTA principal, no foco e na ênfase de link.
- **Brilho branco sutil na borda superior** dos painéis elevados: dá ao escuro um acabamento "renderizado". Para nós, um fio de latão a 20% no topo das faixas escuras.

### 1.7 Framer e Lamborghini (apoio)
- **Framer:** tracking de cartaz (-5,5px a 110px, line-height 0,85). As seções se separam por **mudança de modo, como cortes de filme**. Gradientes só em cards isolados, nunca na seção inteira (no nosso caso, nenhum gradiente).
- **Lamborghini:** monocromia mais **ouro como única cor**, reservado ao CTA principal. A profundidade vem de camadas tonais (`#000 → #181818 → #202020`). **Hover só muda cor ou opacidade, sem scale nem translate.** Tipografia com DNA geométrico próprio, repetido nos ícones (lá o hexágono; aqui o §).

### 1.8 Síntese: sistema B&F derivado (tokens iniciais)

**Papéis de cor e contraste (calculado pelo WCAG 2.x)**

| Par | Contraste | Uso permitido |
|---|---|---|
| papel `#F2EFEA` sobre noite `#0F1B23` | **15,24:1** | texto principal no escuro |
| latão `#C9A35B` sobre noite | **7,39:1** | números, eyebrows, links, foco e CTA no escuro (AAA) |
| carvalho `#CDB894` sobre noite | 9,06:1 | texto secundário quente no escuro |
| noite sobre latão (botão preenchido) | 7,39:1 | CTA primário latão com texto noite |
| **latão sobre papel** | **2,06:1, reprova** | **só ornamento grande ou decorativo** (§ gigante, linha, grade); nunca texto, ícone funcional ou anel de foco |
| latão-tinta `#7A5C24` sobre papel | 5,41:1 | a versão do latão para números, eyebrows e links no papel (AA) |
| cinza-tinta `#5B6670` sobre papel | 5,12:1 | texto secundário no papel |
| névoa `#9AA6AE` sobre noite | 7,03:1 | texto secundário no escuro |

Escada noturna (à maneira da Linear): `#0B141A` (mais funda, rodapé) → `#0F1B23` (canvas) → `#15242E` (elevado) → `#1C2E3A` (hover ou selecionado). Hairlines: `rgba(242,239,234,.12)` no escuro e `rgba(15,27,35,.12)` no papel.

**Escala tipográfica PP Mori (fluida)**

| Token | Tamanho | Peso | Entrelinha | Tracking | Uso |
|---|---|---|---|---|---|
| `display-xxl` | `clamp(56px, 9vw, 152px)` | 200 | 0,92 | -0,04em | Herói (uma frase) |
| `display-xl` | `clamp(44px, 6vw, 96px)` | 200 | 0,98 | -0,035em | Abertura de seção |
| `display-lg` | `clamp(36px, 4.2vw, 64px)` | 200 | 1,04 | -0,03em | Títulos de área e páginas internas |
| `h2` | `clamp(28px, 2.8vw, 40px)` | 400 | 1,12 | -0,02em | Subtítulos |
| `h3` | 24px | 400 | 1,2 | -0,01em | Itens de lista grande, perguntas do FAQ |
| `lead` | `clamp(20px, 1.6vw, 24px)` | 200 (ou 200 itálico) | 1,4 | 0 | Lead editorial (Apple lead-airy, Oura lead) |
| `body-lg` | 19px | 400 | 1,55 | 0 | Texto das páginas de área |
| `body` | 17px | 400 | 1,6 | -0,005em | Padrão |
| `small` | 15px | 400 | 1,5 | 0 | Notas, rodapé |
| `meta` | 13px | 400 + `tnum` | 1,4 | +0,01em | Datas, nº de artigo, OAB |
| `eyebrow` | 12px | 600, caixa-alta | 1,2 | +0,12em | Taxonomia ("§ 3 · ÁREAS") |
| `button` | 15px | 600 | 1 | +0,01em | Botões |

Regras:
- **Extralight só de 32px para cima no papel.** No escuro, o texto claro "engorda" por irradiação, e o 200 aguenta a partir de uns 28px.
- **Itálico com parcimônia:** no máximo uma palavra ou expressão por título, para a "voz de sentimento".
- **Tracking negativo só no display; positivo só na caixa-alta pequena.** Nunca caixa-alta em parágrafo.
- Medida: 60–68ch no corpo e 18–22ch no display.
- Ativar `tnum` (e `lnum`, se existir) em números. **A verificar no arquivo licenciado:** se a PP Mori tem `tnum`, `ss01` e frações (rodar `fontTools`/`pyftsubset --layout-features=*` ou abrir no wakamaifondue.com). O Fonts In Use credita o desenho original a **Caio Kondo e Satsuki Arakaki (Inari Type, 2020)** e a revisão de 2022 à Pangram Pangram. Ela já tem uso brasileiro de peso: o rebrand do **GNT (Globo, 2024)**. Diacríticos e pontuação exagerados (descrição da MaxiBestOf) ficam ótimos em ã, õ, ç e §.
- Licença: comprar a **licença web** da Pangram Pangram (a versão de teste não cobre uso comercial). Se for adquirir a versão **variável**, ela permite um 250 para display no papel, que fica entre 200 e 400.

**Espaço, grade, raio, sombra**
- Base de 4px; escala `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192`. Seções: `padding-block: clamp(96px, 14vh, 192px)` (Mercury e Oura).
- Grade de 12 colunas no desktop (gutter de 24px, margem `clamp(20px, 5vw, 80px)`, máximo de 1440px) e de 4 colunas no mobile (gutter de 16px). **A composição é assimétrica:** texto da coluna 2 à 7 e número ou ornamento na coluna 1 ou 9–12. Nada de tudo centralizado.
- Raio: **0 em seções, imagens e cards; 2px em inputs e botões** (evoca a placa usinada); 50% só em controles circulares (play, botão de fechar, ponteiro). Nada de pílula. Isso diferencia o site do SaaS genérico e conversa com Runway e Lamborghini.
- Sombra: **nenhuma na interface.** Uma exceção no sistema todo, a "luz de placa": `box-shadow: 0 0 0 1px rgba(201,163,91,.35), 0 0 48px -12px rgba(201,163,91,.45)`, usada só nas placas das sócias e, se tanto, no monograma.

**Estados**
- Link: sublinhado de 1px que se desenha da esquerda (`scaleX 0→1`, 240ms) na cor de destaque do fundo (latão no escuro, latão-tinta no papel).
- Botão primário: no escuro, fundo latão com texto noite (7,39:1); no papel, fundo noite com texto papel. Hover: só a cor do fundo muda, um degrau (Lamborghini). Pressionado: `translateY(1px)`.
- Foco: `outline: 2px solid` com `outline-offset: 3px`, **latão no escuro e noite no papel** (latão no papel reprova os 3:1 exigidos para elementos não textuais).
- Desabilitado: opacidade de .4 e cursor `not-allowed`, sem mudar o tom.

**Motion (tokens)**
- Durações: `micro 120ms` (cor e opacidade), `ui 240ms` (sublinhado, acordeão), `reveal 600–900ms` (títulos), `hero 1100–1400ms` (entrada). Animações scrubbed não têm duração; ficam presas ao scroll.
- Curvas: revelação em `expo.out` / `cubic-bezier(.16,1,.3,1)`; transição de estado em `cubic-bezier(.65,0,.35,1)` / `power2.inOut`. **Proibido usar bounce, elastic ou back.**
- Distância de movimento: no máximo 16–24px em translate. Fora isso, máscara e `clip-path`. **Stagger** de 0,04–0,08s, com no máximo 6 itens animados por grupo.
- Lenis: `lerp: 0.1` (ou `duration: 1.1`), `smoothWheel: true`, toque nativo (`syncTouch: false`).
- **Densidade:** a home é baixa (uma ideia por viewport, como na Apple); as páginas de área têm densidade de documento (sumário lateral, parágrafos numerados).

```css
:root{
  --noite:#0F1B23; --noite-0:#0B141A; --noite-2:#15242E; --noite-3:#1C2E3A;
  --papel:#F2EFEA; --papel-2:#EAE5DC; --branco:#FFFFFF;
  --latao:#C9A35B; --latao-tinta:#7A5C24; --carvalho:#CDB894;
  --tinta-2:#5B6670; --nevoa:#9AA6AE;
  --hair-papel:rgba(15,27,35,.12); --hair-noite:rgba(242,239,234,.12);
  --ease-out:cubic-bezier(.16,1,.3,1); --ease-io:cubic-bezier(.65,0,.35,1);
  --t-micro:120ms; --t-ui:240ms; --t-reveal:800ms;
  --r-0:0; --r-1:2px;
  --font:"PP Mori", ui-sans-serif, system-ui, sans-serif;
}
```

---

## 2. Referências reais (2024–2026)

> **Método e limite.** Os prêmios, datas, tags, paletas e tecnologias abaixo foram conferidos nas páginas do Awwwards, nos estudos de caso dos estúdios e no conteúdo dos próprios sites (via WebFetch). Não abri os sites num navegador renderizado; o que vem marcado como *(a conferir)* é inferência a partir da marcação ou das tags e precisa ser checado no navegador antes de virar decisão.

### Escritórios de advocacia e legal

**1. Ario Law Firm (Ucrânia): [ario.law/en](https://ario.law/en/)**
Menção Honrosa no Awwwards em **25/05/2026** (Ira Gritsay, Igor Veremsky, Anna Tashkinova). Tags: GSAP, Animation, Transitions, 3D. Paleta binária `#020202 / #FFFFFF`.
- O que tem de notável: herói com vídeo atrás de um **H1-manifesto longo** ("We enjoy the law, adore the drive, crisis situations motivate and changes inspire us"), preloader e **navegação numerada 01–05**. As práticas aparecem como cards numerados com "Head of Practice" e tamanho da equipe (dado concreto, não adjetivo). Tem transições entre páginas e um elemento 3D na seção de práticas *(a conferir)*.
- O que levar: o manifesto como H1 e a numeração como navegação. Não levar: o preloader.

**2. Hafnia Law (Copenhague): [hafnialaw.com](https://hafnialaw.com/)**
Menção Honrosa em **09/02/2024** (Yellow Umwelt). Tags: Horizontal Layout, Minimal, Big Background Images, Clean. Paleta `#ECECEC / #262523`.
- O que tem de notável: H1 curtíssimo ("In good company") sobre vídeo e um aviso de "Scroll". **Split scroll** na página de expertise e uma **"Horizontal Library"** como componente. Blocos numerados em ordem **decrescente (03, 02, 01)**, como contagem regressiva. Pessoas aparecem como coletivo (foto de equipe), não como grade de rostos.
- O que levar: o split scroll para as páginas de área (sumário fixo à esquerda, texto rolando à direita) e a numeração como narrativa.

**3. Burkhalter Rechtsanwälte (Suíça): [drpb.ch](https://drpb.ch/)**
Indicado no Awwwards em **10/03/2026** (TBS Agency, direção de arte de Pascal Hegemann). Tags: Typography, Transitions, Clean. A descrição fala em "Swiss law firm redefined through Swiss design precision", **"liquid glass navigation"**, "Swiss Typography System" e nota 100 de performance.
- O que tem de notável: H1 "Rechtliche Expertise. Menschlich vermittelt." (expertise jurídica, comunicada de forma humana: a mesma tensão do nosso público). **Contadores** (locais, equipe, anos; o HTML renderiza "0", o que indica count-up), uma **linha do tempo por anos (1922 → 2026)** e as práticas como **seis rótulos-link**, sem cards.
- O que levar: o tom do H1, a linha do tempo como prova de solidez (permitida pela OAB) e a meta de performance 100 com WordPress.

**4. Joseph Law: [forthetimes.law](https://www.forthetimes.law)**
Menção Honrosa em **02/04/2025** (Milan Webionics). Feito em Next.js. Tags: **Luxury**, Animation, Fullscreen, 3D. Paleta registrada: **`#072428`**, um azul-petróleo-noite muito próximo do nosso azul-noite.
- O que tem de notável: posicionamento "luxo" para advocacia, com telas cheias e 3D *(a conferir; o site bloqueia leitura automática)*.
- O que levar: a prova de que um azul-noite profundo sustenta uma leitura de luxo jurídico sem preto.

**5. GRLICA LAW (Suíça, cripto/IP): [grlicalaw.com](https://grlicalaw.com)**
Menção Honrosa em **27/02/2024** (CreativeCom). Tags: Parallax, Scrolling, Single page, 3D. Paleta `#311760 / #020201`.
- O que tem de notável: página única e narrativa, com parallax e 3D.
- O que levar: só o formato de página única como argumento. Não levar: o violeta e o 3D, que soam "tech/cripto" e são exatamente o que devemos evitar.

**6. ROEH Law & Tax (México/global): [roeh.com/en](https://www.roeh.com/en)**
Menção Honrosa em **07/01/2025** (Montalvo Wire), em Next.js, tag Parallax. Paleta `#E53F51 / #373A36`.
- O que levar: um único acento quente sobre neutro escuro, a mesma lógica do latão sobre azul-noite.

**7. Harvey (IA jurídica): [harvey.ai](https://www.harvey.ai/)**
É a referência de "premium jurídico" no software. A `theme-color` é **`#1F1D1A`**, um quase-preto quente. Títulos curtos e assertivos ("Build a Frontier Legal Organization"), **captura do produto como herói**, logos em **grade estática** (não carrossel), bloco de números e seção de segurança e conformidade com selos.
- O que levar: o quase-preto quente (o nosso azul-noite cumpre o papel) e a seção de **conformidade como argumento de confiança**. A nossa equivalente é uma seção sobre ética e sigilo (CED/LGPD), sem selos falsos.

**8. Legora (IA jurídica): [legora.com](https://legora.com/)**
Herói em vídeo ("Legal work, without limits."), uma **seção em abas ancoradas** que explica o produto em sete camadas, **tiles verticais por prática** (M&A, Litigation, Tax…) que se expandem e uma **grade de certificações** (ISO 42001, ISO 27001, SOC 2, GDPR, HIPAA).
- O que levar: as **práticas como tiles verticais que expandem** são uma alternativa forte à grade de três cards. Funcionaria bem para as 10 áreas.

**9. Mattos Filho (Brasil): [mattosfilho.com.br](https://www.mattosfilho.com.br/)**
É o benchmark nacional (Chambers: Brazil Law Firm of the Year). No herói, uma **foto noturna de cidade em longa exposição com rastros de luz**, sem botão de ação. Tem o **Único**, portal editorial com categorias e tags por prática, números grandes (+1200 profissionais, 1,7 bi de receita em 2025, +16 mil horas pro bono), um buscador de profissionais por prática e escritório, e um **aviso contra golpe pelo WhatsApp** ("o escritório não solicita pagamentos ou dados por aplicativos").
- O que levar: o **aviso antigolpe** (muito relevante para um público de médicos, alvo frequente de fraude), o portal editorial como motor de autoridade e a noite urbana como metáfora. Não levar: a densidade de um escritório *full service*, porque B&F é boutique.

### Saúde premium

**10. Neko Health: [nekohealth.com](https://www.nekohealth.com/)** (estudo de caso: [14islands.com/neko](https://14islands.com/neko/))
Feito pela 14islands em React, Next.js, **WebGL e Three.js/R3F**, com Sanity. Ganhou **Lovie Gold (2023)** e Site of the Day no CSS Design Awards e na FWA. Segundo o estudo de caso, esgotou as vagas das clínicas em horas e passou de 350 mil cadastros.
- O que tem de notável: **nuvens de pontos em movimento sobrepostas a pessoas**, que mostram a tecnologia do escaneamento de forma humana. Fotografia com direção de arte própria. A narrativa vai de preocupações concretas (pele, coração, corpo) ao benefício.
- O que levar: **traduzir o técnico em imagem humana**. Para nós, sem WebGL: a "grade de prontuário" e a linha de ECG fazem esse papel em SVG leve.

**11. Function Health: [functionhealth.com](https://www.functionhealth.com)**
Menção Honrosa em **09/07/2024** (Aaron McGuire, Stas Bondar, Victor Niculici). Paleta **`#FEF9EF / #C07858`** (creme e terracota, quente e nada "hospitalar"). Elementos destacados: **"Tracked Overtime"** (linha do tempo animada em Lottie), **Marquee** e **"People Biomarker Cards"**.
- O que levar: o creme com um acento terroso confirma o caminho papel + latão. O **dado acompanhado ao longo do tempo** inspira a linha do tempo do protocolo de atendimento.

**12. Pomegranate Health (Reino Unido): [pomegranate.health](https://pomegranate.health/)**
Menção Honrosa em **26/07/2025** (Wondermake), com Vue.js, **Anime.js e Rive**. Tags: Microinteractions, Transitions, Illustration. Paleta **`#FFF9EE / #3A001D`** (papel e um vinho quase preto). Elementos destacados: "Load & Scroll", "Menu", **"FAQ Accordion"** e "Rive Animation".
- O que levar: o **FAQ como peça de design** (lá premiado como elemento) e a paleta papel + tinta escura quente, que é exatamente o nosso esquema com outra matiz.

*Complementares, para consulta:* **HEVA Health** ([hevahealth.com](https://www.hevahealth.com/)), Site of the Day em 26/07/2024, paleta `#fdfdf1 / #39442b`, com o elemento "Data Flow". **Bevel Health** ([bevel.health](https://www.bevel.health/)), Menção Honrosa em 11/05/2026, em Webflow, com visualização de dados. **Brasil Salomão e Matthes** ([brasilsalomao.com.br](https://brasilsalomao.com.br/pt-BR)), site lançado em 01/03/2026 com o conceito "clareza com sofisticação" (Sheyar). Serve de régua do mercado brasileiro, que ainda é estático: espaço livre para B&F se destacar.

### Padrões que se repetem nas referências
1. **H1-manifesto** sobre fotografia ou vídeo escuro (Ario, Hafnia, Burkhalter, Mattos Filho).
2. **Numeração como navegação e narrativa** (Ario 01–05, Hafnia 03→01).
3. **Práticas sem grade de cards:** lista de rótulos (Burkhalter), lista densa (Mattos Filho), tiles expansíveis (Legora).
4. **Linha do tempo e "dado ao longo do tempo"** como prova sóbria (Burkhalter, Function).
5. **Conformidade e sigilo como argumento** (Harvey, Legora, o aviso antigolpe do Mattos Filho).
6. **Paletas de duas cores** com um neutro quente e uma tinta escura (Hafnia, Function, Pomegranate, HEVA).
7. **O FAQ e a microinteração** viraram peça premiada (Pomegranate).

---

## 3. Brief de motion e interação (15 padrões, priorizados)

Infraestrutura comum (vale para todos):

```js
// Lenis + ScrollTrigger num único relógio
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const lenis = reduce ? null : new Lenis({ lerp: 0.1, smoothWheel: true });
if (lenis) { lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
const mm = gsap.matchMedia();  // todos os padrões abaixo ficam dentro de mm.add({...})
mm.add({ desk:'(min-width: 900px) and (pointer: fine)', mob:'(max-width: 899px)',
         rm:'(prefers-reduced-motion: reduce)' }, ctx => { /* ... */ });
```

- Desde o **GSAP 3.13 (abril de 2025), todos os plugins são gratuitos**, inclusive para uso comercial: SplitText, DrawSVG, MorphSVG e ScrollSmoother. O SplitText 3.13 trouxe `mask`, `autoSplit` (refaz a divisão no resize e quando a fonte carrega) e `aria-label`/`aria-hidden` automáticos.
- **CSS scroll-driven animations** (`animation-timeline: view()`) rodam no Chrome 115+ e no Safari 26+. No Firefox estável ainda dependem de flag (junho de 2026), então só como melhoria progressiva dentro de `@supports`, com o estado final visível por padrão.
- **Regra de ouro:** o conteúdo nasce visível no HTML e no CSS, e o JS só acrescenta o movimento. Se o JS falhar, nada fica com `opacity: 0`.
- Um interruptor **"Reduzir animações"** no rodapé grava a preferência no `localStorage`, desliga o Lenis e passa o `mm` para o ramo `rm`.

### P0: essenciais (definem a identidade)

**1. Do pulso ao parágrafo: ECG → linha de assinatura**
- **Onde:** começa no herói e reaparece como fio condutor. Ao fim do herói, a linha vira o filete sob o manifesto; no rodapé, vira a linha de assinatura sob "Borges & Fidélis".
- **O que faz:** um traçado fino de latão cruza o herói como uma linha de base de monitor, com **um único complexo QRS** (não um monitor inteiro). Com o scroll, o pico se achata (morph) numa reta perfeita, a "linha onde se assina".
- **Por que serve:** diz em um gesto que a vida clínica vira documento jurídico, sem martelo nem estetoscópio. É o logotipo em movimento do conceito "Advogando para Médicos".
- **Implementação:**
  ```js
  gsap.from('#ecg', { drawSVG: '0%', duration: 1.4, ease: 'expo.out' });
  gsap.to('#ecg', { morphSVG: '#reta', ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 40%', scrub: 0.6 } });
  ```
  Dois `<path>` com o mesmo número de pontos facilitam o morph. Use `vector-effect: non-scaling-stroke` para manter 1px em qualquer largura.
- **Acessibilidade e reduced motion:** o SVG leva `aria-hidden="true"`. Com reduced motion, mostra a reta estática (ou o ECG estático), sem desenho nem morph.
- **Mobile e desempenho:** é SVG puro com custo desprezível. No mobile, o morph acontece por tempo (1,2s), não por scrub, para não disputar com a rolagem por toque.

**2. Manchetes reveladas por máscara de linha**
- **Onde:** todos os títulos `display-*`.
- **O que faz:** cada linha sobe por trás de uma máscara invisível, como texto saindo da linha de base de uma folha.
- **Por que serve:** é a assinatura editorial sóbria. Dá à PP Mori Extralight o peso de cerimônia sem fade genérico.
- **Implementação:**
  ```js
  SplitText.create('.display', { type: 'lines', mask: 'lines', autoSplit: true,
    onSplit: s => gsap.from(s.lines, { yPercent: 110, duration: .9, stagger: .07, ease: 'expo.out',
      scrollTrigger: { trigger: s.elements[0], start: 'top 85%', once: true } }) });
  ```
- **Acessibilidade e reduced motion:** o SplitText 3.13 aplica `aria-label` no elemento e `aria-hidden` nas linhas. Com reduced motion, troca por opacidade de 0 a 1 em 200ms, ou nada.
- **Mobile e desempenho:** `once: true`, sem revert a cada passagem. O `autoSplit` refaz a divisão quando a PP Mori termina de carregar, o que evita quebras erradas.

**3. Glossário em duas colunas: Medicina ↔ Direito**
- **Onde:** uma seção nova, "Falamos as duas línguas", entre a triagem e as áreas (ou em "O escritório").
- **O que faz:** duas colunas de termos rolam em sentidos opostos. À esquerda, o vocabulário clínico (Anamnese, Prontuário, Consentimento, Intercorrência, Plantão, Sindicância); à direita, o jurídico (Instrução, Prova documental, Termo, Nexo causal, Responsabilidade, Processo ético). Na linha central de latão, os pares se encontram e o par alinhado acende.
- **Por que serve:** é o argumento central da boutique em forma de interação: "entendemos a sua rotina e a traduzimos em defesa". É original e memorável.
- **Implementação:**
  ```js
  gsap.to('.col-med', { yPercent: -50, ease: 'none', scrollTrigger: { trigger: '.glossario', pin: true, scrub: true, end: '+=150%' } });
  gsap.fromTo('.col-dir', { yPercent: -50 }, { yPercent: 0, ease: 'none', scrollTrigger: { /* mesmo trigger */ } });
  // o par na linha central recebe .is-aligned via ScrollTrigger.create({ onUpdate })
  ```
- **Acessibilidade e reduced motion:** no DOM, os pares ficam em `<dl>` (`<dt>` Medicina / `<dd>` Direito), na ordem certa para o leitor de tela. O movimento é só visual. Com reduced motion, vira uma tabela de duas colunas estática.
- **Mobile e desempenho:** **sem pin no mobile.** Lista intercalada (termo clínico → termo jurídico) com o filete desenhando entre os dois. Anime só `transform`.

**4. Índice das áreas como sumário de código**
- **Onde:** a seção Áreas, com as 10 áreas.
- **O que faz:** em vez de cards, linhas grandes de sumário: "Art. 1º — Defesa no CRM e processo ético-profissional", com filete pontilhado até a página ("········ 04"). No hover ou foco, a linha se indenta 12px e uma **prévia retangular** (foto ou placa) aparece recortada por `clip-path` e segue o ponteiro com inércia.
- **Por que serve:** parece um código ou um índice de tratado, cultura comum aos dois mundos. É escaneável para quem tem pressa.
- **Implementação:**
  ```js
  const qx = gsap.quickTo('.preview', 'x', { duration: .5, ease: 'power3' }), qy = gsap.quickTo('.preview', 'y', { duration: .5, ease: 'power3' });
  list.addEventListener('pointermove', e => { qx(e.clientX); qy(e.clientY); });
  // entrada: gsap.fromTo('.preview', { clipPath: 'inset(50% 0 50% 0)' }, { clipPath: 'inset(0% 0 0% 0)', duration: .5 })
  ```
- **Acessibilidade e reduced motion:** cada linha é um `<a>` com texto completo. A prévia é decorativa (`aria-hidden`) e responde ao `:focus-visible` (aparece ancorada à direita, sem seguir nada). Com reduced motion, a prévia fica fixa à direita e só faz crossfade.
- **Mobile e desempenho:** no toque não há prévia flutuante. Vira acordeão com miniatura inline. Imagens em `loading="lazy"` e pré-carregadas no `pointerenter`.

**5. Triagem "O que aconteceu?" como ficha clínica**
- **Onde:** a triagem interativa que já existe na home.
- **O que faz:** a triagem vira uma **ficha** com cabeçalho de prontuário ("Ficha nº ____ · Data ____"). Cada escolha marca a caixa com um traço desenhado (DrawSVG) e acrescenta uma linha datilografada ao "resumo do caso" à direita. O último passo carimba a ficha com "Encaminhado a: Defesa no CRM" e oferece o contato.
- **Por que serve:** o médico reconhece o formato (anamnese) e se sente atendido, não vendido. É o ponto de conversão da página.
- **Implementação:**
  ```js
  gsap.fromTo(check, { drawSVG: '0%' }, { drawSVG: '100%', duration: .25, ease: 'power2.out' });
  gsap.from(newLine, { clipPath: 'inset(0 100% 0 0)', duration: .5, ease: 'steps(24)' }); // efeito de máquina de escrever
  gsap.from('.carimbo', { scale: 1.15, opacity: 0, rotate: -4, duration: .35, ease: 'power4.out' });
  ```
- **Acessibilidade e reduced motion:** `fieldset`/`legend` e `input type=radio` reais, com o progresso anunciado por `aria-live="polite"` ("Passo 2 de 4"). Com reduced motion, sem `steps()` nem carimbo: tudo aparece de uma vez.
- **Mobile e desempenho:** o resumo do caso passa a ficar abaixo das perguntas. `data-lenis-prevent` se o painel tiver rolagem interna.
- **Cuidado OAB:** a triagem orienta e encaminha. Não promete resultado nem dá parecer.

**6. Régua milimetrada: progresso e navegação**
- **Onde:** fixa na borda esquerda do desktop. No mobile, vira um filete horizontal sob o header.
- **O que faz:** uma régua vertical com marcas de 1mm e 5mm (em latão a 30%). As seções da home são as marcas maiores, rotuladas §1 … §9. Um cursor de latão desce com o progresso de leitura; no hover, a régua se expande e mostra o nome das seções, que funcionam como âncoras.
- **Por que serve:** é precisão de instrumento (régua, escala) e organização de código (§) ao mesmo tempo. Mostra que a página tem começo, meio e fim, o que acalma quem chega aflito.
- **Implementação:**
  ```js
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: s => gsap.set('.regua-cursor', { scaleY: s.progress }) });
  // marcas: background: repeating-linear-gradient(to bottom, var(--latao) 0 1px, transparent 1px 8px)
  links.forEach(a => a.addEventListener('click', e => { e.preventDefault(); lenis?.scrollTo(a.hash, { offset: -80 }); }));
  ```
- **Acessibilidade e reduced motion:** é um `<nav aria-label="Seções desta página">` com links reais. Com reduced motion, a rolagem é instantânea e o cursor se move sem suavização.
- **Mobile e desempenho:** `scaleY`/`scaleX` com `transform-origin`, sem layout. Escondida abaixo de 900px (fica o filete de 2px).

### P1: elevam o nível

**7. Numeração "Art. / § / inciso" sticky**
- **Onde:** abertura de cada seção da home e cabeçalhos das páginas de área.
- **O que faz:** cada seção tem um número em `display-xl` Extralight latão ("§ 3") preso na coluna 1 enquanto o conteúdo rola. Ao trocar de seção, o número rola como um odômetro (o dígito sai por cima e o novo entra por baixo).
- **Por que serve:** a numeração de dispositivo legal vira **elemento gráfico próprio**. É a "tipografia de lei" no lugar da balança.
- **Implementação:** `position: sticky; top: 20vh` na coluna. Na troca: `gsap.fromTo(newDigit, { yPercent: 100 }, { yPercent: 0, duration: .5, ease: 'expo.out' })` dentro de um contêiner com `overflow: clip`.
- **Acessibilidade e reduced motion:** o número fica no `<h2>` com uma parte visual escondida para o leitor de tela (`aria-hidden`), porque "parágrafo três" falado não ajuda. Com reduced motion, a troca é seca.
- **Mobile e desempenho:** no mobile o número fica inline acima do título, sem sticky.

**8. Protocolo de atendimento em scroll horizontal pinado**
- **Onde:** "Como trabalhamos".
- **O que faz:** cinco etapas como um protocolo clínico (01 Escuta → 02 Análise documental → 03 Estratégia → 04 Atuação → 05 Acompanhamento) correm na horizontal enquanto a seção fica presa. A linha de ECG do padrão 1 costura as etapas e "pulsa" uma vez em cada uma.
- **Por que serve:** o médico pensa em protocolo e linha de cuidado. Ver o caminho inteiro reduz a ansiedade sobre "o que vem depois".
- **Implementação:**
  ```js
  const track = document.querySelector('.protocolo-track');
  gsap.to(track, { x: () => -(track.scrollWidth - innerWidth), ease: 'none',
    scrollTrigger: { trigger: '.protocolo', pin: true, scrub: 1, end: () => '+=' + track.scrollWidth, invalidateOnRefresh: true } });
  ```
- **Acessibilidade e reduced motion:** a lista é `<ol>` e, ao receber foco por Tab, cada etapa chama `lenis.scrollTo` até a posição correspondente (nada fica inalcançável). Com reduced motion, sem pin: a lista é vertical.
- **Mobile e desempenho:** **nunca pin abaixo de 900px.** Vira uma lista vertical com a linha desenhada por DrawSVG com scrub. Limite de **dois pins** na home inteira (este e o glossário).

**9. Placas que acendem (sócias)**
- **Onde:** a seção das sócias, com as fotos das placas iluminadas do escritório.
- **O que faz:** ao entrar na viewport, uma varredura de luz atravessa o nome gravado na placa, como a retroiluminação ligando. Em seguida o retrato se revela de dentro para fora (`clip-path: inset`). Esse é o único lugar do site com "luz de placa" (a sombra-exceção do sistema).
- **Por que serve:** usa um ativo real e exclusivo do escritório (as placas), e não um ícone. Transmite presença física e instituição.
- **Implementação:**
  ```css
  .placa-nome{ mask-image:linear-gradient(100deg,#000 40%,rgba(0,0,0,.35) 50%,#000 60%); mask-size:300% 100%; }
  ```
  ```js
  gsap.fromTo('.placa-nome', { maskPosition: '100% 0' }, { maskPosition: '0% 0', duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: '.socias', start: 'top 70%', once: true } });
  ```
- **Acessibilidade e reduced motion:** as placas são imagens com `alt` contendo os nomes e a OAB. Com reduced motion, aparecem acesas e estáticas.
- **Mobile e desempenho:** a máscara anima a posição (custo baixo). Fotos em AVIF com `srcset`.

**10. Papel milimetrado / grade de ECG como textura**
- **Onde:** fundo das seções de papel (grade de 1mm/5mm em azul-noite a 4%) e das seções escuras (grade de ECG de 5mm em latão a 5%).
- **O que faz:** é a textura do site no lugar de gradientes e ruído. Em transições-chave, a grade se desenha de cima para baixo (as linhas aparecem em sequência), como papel sendo impresso.
- **Por que serve:** remete ao papel de eletrocardiograma e à folha de processo ao mesmo tempo. Dá rigor sem ilustração.
- **Implementação:** CSS puro, `background-image: linear-gradient(var(--hair) 1px, transparent 1px), linear-gradient(90deg, var(--hair) 1px, transparent 1px); background-size: 8px 8px, 8px 8px` (com uma segunda camada de 40px mais forte). Para a revelação, `mask-image` linear com `mask-size` animado.
- **Acessibilidade e reduced motion:** a textura é decorativa e não afeta o contraste (mantida abaixo de 6%). Com reduced motion, aparece estática.
- **Mobile e desempenho:** sem imagem, só gradiente. Desligar em telas muito pequenas se pesar no raster (testar em Android de entrada de linha).

**11. Transições entre páginas (View Transitions)**
- **Onde:** de um item do índice de áreas para a página da área, e de um artigo para o próprio artigo.
- **O que faz:** o título da linha clicada se transforma no H1 da página nova (elemento compartilhado), e o resto faz um crossfade curto.
- **Por que serve:** continuidade é sensação de cuidado. O usuário não "perde o fio".
- **Implementação:** num site multipágina (MPA), `@view-transition { navigation: auto; }` com `view-transition-name: area-crm` no título de origem e no H1 de destino. Numa SPA, `document.startViewTransition(() => router.go(url))`. Duração de 350ms com `--ease-io`.
- **Acessibilidade e reduced motion:** `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*) { animation: none } }`. O foco vai para o H1 da página nova.
- **Mobile e desempenho:** navegadores sem suporte simplesmente navegam. Sem bibliotecas extras (Barba, Swup).

**12. Faixa de normas (marquee pausável)**
- **Onde:** entre "O escritório" e as sócias, ou no topo do rodapé.
- **O que faz:** uma faixa lenta com as normas do dia a dia do cliente, em `meta` tnum: "Res. CFM 2.217/2018 (Código de Ética Médica) · Res. CFM 2.336/2023 (publicidade médica) · Lei 13.709/2018, art. 11 (dados sensíveis) · CDC, art. 14, §4º · Lei 12.842/2013 (Ato Médico) · Prov. OAB 205/2021". Cada item é um link para o conteúdo do site que explica a norma. **Revisar a lista com as sócias.**
- **Por que serve:** demonstra domínio técnico sem autopromoção (é compatível com a OAB) e é um substituto inteligente do "marquee de logos de clientes", que aqui seria inviável por sigilo.
- **Implementação:** duplicar o conteúdo e usar `gsap.to('.marquee-track', { xPercent: -50, repeat: -1, duration: 60, ease: 'none' })`. Opcionalmente, a velocidade acompanha o scroll via `lenis.velocity` (bem pouco).
- **Acessibilidade e reduced motion:** **WCAG 2.2.2 (Pausar, Parar, Ocultar):** movimento automático com mais de 5 segundos precisa de um **botão de pausa visível**. Pausar também no hover e no foco. A segunda cópia leva `aria-hidden`. Com reduced motion, vira uma lista estática que quebra linha.
- **Mobile e desempenho:** `transform` apenas e `will-change` só enquanto estiver visível (IntersectionObserver).

**13. FAQ como parecer**
- **Onde:** Dúvidas, na home e na página dedicada.
- **O que faz:** cada pergunta é um `h3` numerado ("§ 1º"). Ao abrir, a resposta se desdobra como uma folha (altura animada por `grid-template-rows: 0fr → 1fr`) e um filete de latão desenha a margem esquerda, como a margem de um parecer.
- **Por que serve:** a dúvida jurídica do médico ganha a forma de documento: séria, citável e compartilhável (cada pergunta tem âncora e botão "copiar link").
- **Implementação:**
  ```css
  .resp{ display:grid; grid-template-rows:0fr; transition:grid-template-rows var(--t-ui) var(--ease-io); }
  [open] .resp{ grid-template-rows:1fr; }
  .resp>div{ overflow:hidden; }
  ```
  Use `<details>/<summary>` nativos. O filete é `scaleY` de 0 a 1 em 300ms.
- **Acessibilidade e reduced motion:** `details` já é acessível. Com reduced motion, `transition: none`. Inclua o JSON-LD `FAQPage`.
- **Mobile e desempenho:** zero JS obrigatório.

### P2: acabamento

**14. Números em odômetro (somente dados institucionais)**
- **Onde:** a seção Números.
- **O que faz:** os algarismos tnum rolam dígito por dígito até o valor (e não interpolam 0 → 120, como o contador genérico). Uma legenda `meta` explica a fonte do número.
- **Por que serve:** é preciso como um instrumento de medida e não grita.
- **Implementação:** uma coluna de 0–9 por dígito e `gsap.to(col, { yPercent: -10 * d, duration: 1.2, ease: 'expo.out', delay: i * .06 })`.
- **Cuidado OAB:** **só dados institucionais** (anos de atuação, estados atendidos, áreas, artigos publicados). **Nada de "casos ganhos", "taxa de êxito" ou "clientes satisfeitos".**
- **Acessibilidade e reduced motion:** o valor final vai num `<span class="sr-only">` e o odômetro fica `aria-hidden`. Com reduced motion, o número aparece direto.

**15. Ponteiro contextual + CTA magnético (só desktop com `pointer: fine`)**
- **Onde:** o CTA principal "Falar com o escritório", o índice de áreas e o protocolo horizontal.
- **O que faz:** o cursor nativo continua. Só nesses alvos aparece um rótulo pequeno ao lado ("Abrir", "Arraste", "Ler"), num círculo de 56px com borda de latão. O CTA principal se desloca no máximo 6px na direção do ponteiro.
- **Por que serve:** dá um toque de cuidado tátil sem virar brinquedo.
- **Implementação:** `gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3' })` com `dx * 0.15`, limitado a ±6px; volta a 0 no `pointerleave`.
- **Acessibilidade e reduced motion:** não substituir o cursor do sistema e nunca esconder o foco. Com reduced motion ou ponteiro de toque, desativar tudo.
- **Mobile e desempenho:** é removido no `mm` do mobile (nem chega a ser registrado).

### Onde cada padrão entra na home

| Seção (estrutura atual) | Padrões |
|---|---|
| Herói com as sócias (escuro) | 1 (ECG nasce), 2, 6 (régua aparece) |
| Triagem "O que aconteceu?" | 5 |
| Falamos as duas línguas (nova) | 3, 10 |
| Áreas | 4, 7, 11 (para as páginas de área) |
| O escritório (papel) | 2, 10, 12 |
| Números | 14 |
| Sócias com as placas (escuro) | 9 |
| Como trabalhamos | 8 (+ linha do 1) |
| Dúvidas | 13 |
| Conteúdos | 2, 11 |
| Contato e rodapé (escuro) | 1 (assinatura), 15, botão "Reduzir animações" |

### Orçamento de desempenho
- **No máximo 2 pins na home e nenhum pin no mobile.** Nenhum WebGL nem canvas: tudo é SVG e CSS.
- JS de motion: GSAP core + ScrollTrigger + SplitText + DrawSVG + MorphSVG + Lenis, cerca de 50–60 KB gzip somados (conferir no bundle). Carregar com `defer`; o herói pode ter o primeiro desenho do ECG em CSS (`stroke-dashoffset`) antes do JS.
- **LCP < 2,5s** no 4G: foto do herói em AVIF com `fetchpriority="high"` e PP Mori 200 + 400 com `preload` (woff2, subset latin com U+00C0–00FF para o português). Ajustar o fallback com `size-adjust` para CLS ≈ 0.
- **INP < 200ms:** nada de `scroll` listener próprio (só o ScrollTrigger) e `quickTo`/`quickSetter` para o ponteiro.
- Testar em um Android intermediário com a CPU 4× mais lenta no DevTools. Se cair abaixo de 50 fps, desligar primeiro o 10 (textura animada), depois o scrub do 1.

---

## 4. Elementos gráficos próprios (medicina + direito sem clichê)

1. **A linha contínua (pulso → parágrafo → assinatura).** Um único traço de latão de 1px é o elemento de marca. Pode ser exportado para papelaria, assinatura de e-mail e capa de PDF.
2. **§ como ornamento-sistema.** É o glifo da PP Mori em Extralight gigante (40–60vh) cortado pela borda da tela nas seções escuras. Também serve de marcador de lista e de favicon alternativo.
3. **Numeração de dispositivos:** "Art. 1º", "§ 2º", "inciso III", "alínea b" como hierarquia de títulos e de navegação.
4. **Papel milimetrado e grade de ECG:** a textura do site (padrão 10).
5. **Régua e escala:** a régua de progresso (padrão 6) e réguas curtas como divisores de seção, com uma marca maior a cada 5.
6. **Ficha e carimbo de protocolo:** um cabeçalho de ficha ("Ficha nº · Data · Encaminhamento") e um carimbo tipográfico retangular com borda de 1px ("PROTOCOLADO · 16·10·2026") usados na triagem e nos artigos. **Não imitar** carimbo oficial do CRM, da OAB ou de tribunal.
7. **Tarja de sigilo:** na seção de LGPD e sigilo, palavras sensíveis do exemplo aparecem cobertas por barras azul-noite que deslizam para o lado no hover ou foco, revelando termos genéricos ("paciente", "diagnóstico"). É uma metáfora visual do sigilo médico e profissional. Com reduced motion, as barras ficam abertas.
8. **O "&" como ponte:** o e-comercial de "Borges & Fidélis" em Extralight itálico gigante, como elemento de ligação entre "Medicina" e "Direito" no glossário (padrão 3).
9. **Margem de parecer:** um filete vertical de latão à esquerda dos blocos de texto longos (padrão 13), como a margem de petição.
10. **Coordenadas e metadados em `meta` tnum:** cantos de seção com microinformação real ("Uberlândia · MG · 18°55′S 48°17′O", "OAB/MG ·····", "Atualizado em 16·10·2026"). Dá textura editorial verdadeira, sem decoração vazia.

---

## 5. Anti-padrões: o que evitar

**Visual "feito por IA" ou template**
1. Gradientes roxo-azul, mesh, aurora e texto em gradiente. *Em vez disso:* superfícies chapadas e a grade milimetrada.
2. **Grade de 3 cards iguais** (ícone + título + duas linhas), repetida em toda seção. *Em vez disso:* sumário, lista, split scroll, tiles verticais.
3. Ícones lineares genéricos (Lucide, Heroicons) para as áreas: balança, martelo, estetoscópio, escudo, cadeado, coração com pulso. *Em vez disso:* número de dispositivo e tipografia.
4. Emojis, ✓ verdes, selos "Novo" e "sparkles".
5. Glassmorphism e blur pesado em cards. O blur fica, no máximo, na nav sobre a foto do herói, discreto.
6. Bento grid colorido estilo SaaS, cantos de 16–24px, sombras em cards, botões em pílula com glow.
7. Fotos de banco: aperto de mão, Têmis, martelo, médico de braços cruzados, mão de luva segurando estetoscópio, cidade genérica em vídeo.
8. Dourado em degradê metálico, serifas tipo Trajan, molduras e arabescos de "luxo jurídico". O latão é **fosco e chapado**.
9. Ilustração 3D "clay", isométrica, blobs, personagens.
10. Tudo centralizado: H1 centralizado + dois botões + ícone animado de mouse "scroll". Composição simétrica em todas as seções e o mesmo padding em tudo.

**Tipografia**
11. Misturar uma serifa com a PP Mori "para dar seriedade". A seriedade vem da escala, do Extralight e da numeração.
12. Extralight em corpo pequeno ou em texto sobre foto clara. Caixa-alta em parágrafos. Tracking positivo em display ou negativo em caixa-alta pequena.
13. Itálico decorativo em toda parte e aspas gigantes ornamentais.
14. Números sem `tnum` em prazos, artigos e anos (os dígitos dançam).

**Motion**
15. Fade-up de 40px em todo parágrafo, stagger em listas longas, bounce, elastic e back.
16. Scroll-jacking que trava a página, pins longos (mais de 200% de altura) e qualquer pin no mobile.
17. Cursor "blob" que segue o mouse com `mix-blend-mode: difference` e esconde o cursor do sistema.
18. **Preloader com porcentagem.** Quem chega com um processo ético no CRM não quer esperar uma animação.
19. Parallax em fotos de pessoas (distorce as sócias) e zoom contínuo em imagens.
20. Marquee sem botão de pausa (reprova o WCAG 2.2.2) e animação que ignora `prefers-reduced-motion`.

**Conteúdo e conformidade (OAB e sigilo)**
21. Contadores de "casos ganhos", "98% de êxito" ou "+5.000 clientes" (vedados e com cara de marketing).
22. Depoimentos, estrelas e "o que nossos clientes dizem" (vedados). **Logos de clientes** também: sigilo do cliente médico.
23. Títulos vazios: "Soluções jurídicas completas", "Excelência e compromisso", "Seu sucesso é nossa missão". Tríades de efeito ("Ética. Estratégia. Resultado.").
24. Botão verde de WhatsApp flutuando e pulsando no canto. *Em vez disso:* contato persistente e discreto no header ("Falar com o escritório") mais o **aviso antigolpe** à maneira do Mattos Filho.
25. "Consulta grátis", contagem regressiva, urgência e pop-ups de captura de e-mail.
26. Referências legais inventadas ou genéricas ("Lei nº XXXX"). Toda norma citada deve ser real, revisada pelas sócias e com link para o conteúdo que a explica.

---

## 6. Fontes

**Catálogo:** `/home/claude/_awesome/README.md`; `design-md/{runwayml,mercury,oura,apple,stripe,linear.app,framer,lamborghini}/DESIGN.md`.

**Referências e prêmios**
- [Ario Law Firm, Awwwards](https://www.awwwards.com/sites/ario-law-firm) · [ario.law](https://ario.law/en/)
- [Hafnia Law, Awwwards](https://www.awwwards.com/sites/hafnia-law) · [hafnialaw.com](https://hafnialaw.com/)
- [Swiss Precision in Law (Burkhalter), Awwwards](https://www.awwwards.com/sites/swiss-precision-in-law) · [drpb.ch](https://drpb.ch/)
- [Joseph Law, Awwwards](https://www.awwwards.com/sites/joseph-law) · [forthetimes.law](https://www.forthetimes.law)
- [GRLICA LAW, Awwwards](https://www.awwwards.com/sites/grlica-law) · [grlicalaw.com](https://grlicalaw.com)
- [ROEH Law & Tax, Awwwards](https://www.awwwards.com/sites/roeh-law-tax) · [roeh.com](https://www.roeh.com/en)
- [Awwwards, categoria Law](https://www.awwwards.com/websites/law/) · [Awwwards, categoria Health](https://www.awwwards.com/websites/health/)
- [Harvey](https://www.harvey.ai/) · [Legora](https://legora.com/) · [Mattos Filho](https://www.mattosfilho.com.br/)
- [Neko Health, estudo de caso da 14islands](https://14islands.com/neko/) · [Neko na Sanity](https://www.sanity.io/projects/neko) · [nekohealth.com](https://www.nekohealth.com/)
- [Function Health, Awwwards](https://www.awwwards.com/sites/function-health) · [Tracked Overtime, Awwwards](https://www.awwwards.com/inspiration/tracked-overtime-function-health)
- [Pomegranate Health, Awwwards](https://www.awwwards.com/sites/pomegranate-health) · [HEVA Health, Awwwards](https://www.awwwards.com/sites/heva-health) · [Bevel Health, Awwwards](https://www.awwwards.com/sites/bevel-health)
- [Brasil Salomão e Matthes lança novo site (Migalhas, 02/03/2026)](https://www.migalhas.com.br/quentes/450894/brasil-salomao-e-matthes-lanca-novo-site-e-reforca-maturidade-digital)

**Técnica e tipografia**
- [GSAP 3.13: todos os plugins gratuitos e novidades do SplitText](https://gsap.com/blog/3-13/)
- [Suporte a CSS scroll-driven animations em 2026](https://www.buildmvpfast.com/blog/css-scroll-driven-animations-replace-js-2026) · [Chrome for Developers: scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations)
- [PP Mori no Fonts In Use](https://fontsinuse.com/typefaces/127055/mori) · [PP Mori na MaxiBestOf](https://maxibestof.one/typefaces/mori)
