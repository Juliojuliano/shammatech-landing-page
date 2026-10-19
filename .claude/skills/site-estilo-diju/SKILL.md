---
name: site-estilo-diju
description: Cria sites de página única para pequenos negócios e escritórios (cafeteria, advocacia, loja, clínica, serviços locais) no estilo dos projetos DiJu — HTML/CSS/JS puro, sem build, responsivo, acessível, com identidade própria por negócio. Use sempre que o pedido for "faça um site para X", "landing page do meu cliente", "site institucional", "site de cardápio", ou quando o usuário citar os sites cafeteria-diju ou diju-advocacia como referência, mesmo sem dizer "skill".
---

# Site de página única no estilo DiJu

Referências reais (repositórios `Juliojuliano/cafeteria-diju` e `Juliojuliano/diju-advocacia`, publicados no GitHub Pages). Este documento resume o que os dois têm em comum para repetir a qualidade em novos negócios, sem copiar a identidade visual de um deles.

## 1. Princípios

1. **Zero dependência.** HTML + CSS + JS puro. Sem framework, sem build, sem Tailwind. Abre com duplo clique em `index.html` e publica no GitHub Pages (Settings → Pages → `main` / root).
2. **Uma identidade por negócio.** Cada site tem paleta, par de fontes e tom de voz próprios, escolhidos a partir do ramo. Nunca reaproveite as cores de outro cliente.
3. **Conteúdo honesto.** Se um dado não foi informado (telefone, endereço, OAB, preços), use valor de exemplo **claramente fictício** e liste-o no README numa tabela "trocar antes de publicar". Nunca invente depoimentos com nome completo, selos, prêmios ou números que pareçam reais.
4. **Funciona sem rede.** Toda imagem externa precisa de fallback; ilustrações e logos preferencialmente em SVG dentro do repositório.
5. **Acessível e leve por padrão.** Semântica correta, foco visível, contraste suficiente, `prefers-reduced-motion` respeitado.

## 2. Antes de escrever código — levantar dados

Pergunte (ou deduza e marque como exemplo) só o que muda o resultado:

- Nome, ramo, cidade/bairro, ano de fundação.
- Endereço, telefone/WhatsApp, e-mail, horário, Instagram.
- Lista de produtos/serviços (com preços, se for comércio).
- Tom desejado (acolhedor, sóbrio, moderno).
- Se há fotos próprias. Sem fotos: SVG ou fotos de banco com fallback (ver seção 6).

Se o pedido for vago, avance com exemplos marcados em vez de bloquear numa lista de perguntas.

## 3. Estrutura de arquivos

Dois formatos, escolha pelo tamanho:

**Arquivo único** (negócio simples, ~25 KB — modelo `cafeteria-diju`):

```
index.html     # <style> e <script> embutidos
README.md
```

**Com assets** (muitas seções, mais conteúdo — modelo `diju-advocacia`):

```
index.html
assets/css/styles.css
assets/js/main.js
assets/img/            # marca, favicon, ilustrações em SVG
robots.txt
sitemap.xml
README.md
```

README sempre inclui: como ver, como publicar no GitHub Pages, seções do site, e a tabela de dados de exemplo a substituir.

## 4. Design system (tokens em `:root`)

Defina **tudo** como variável CSS e use só elas no restante do arquivo.

```css
:root{
  /* cores: 1 cor de marca escura, 1 acento, fundo claro, texto, texto suave, linha */
  --ground:#FBFAF6; --paper:#F2EFE7; --ink:#1D1A16; --muted:#6B645A; --line:#DCD6CA;
  --brand:#1F3B2D; --brand-ink:#FBFAF6;  /* texto sobre a cor de marca */
  --accent:#A87A22;
  --ok:#2F7A4E; --err:#B23A2E;           /* estados de formulário */

  --display:"Gloock",Georgia,serif;       /* títulos */
  --body:"Karla",system-ui,sans-serif;    /* texto */

  --wrap:1160px;
  --gutter:clamp(16px,4vw,40px);          /* lateral fluida */
  --header-h:64px;
}
```

Regras de estilo observadas nos dois sites:

- **Par tipográfico:** uma fonte display (serifada ou de personalidade) só em títulos e uma sans legível no corpo. Carregue do Google Fonts com `preconnect` + `display=swap` e sempre declare fallback de sistema.
- **Escala fluida** com `clamp()` em títulos e espaçamentos de seção (`padding-block:clamp(56px,8vw,110px)`), em vez de muitos breakpoints.
- **Layout:** `.wrap` centralizado com `max-width` + `padding-inline:var(--gutter)`. Seções alternam fundo (`--ground`, `--paper`, cor de marca) para criar ritmo.
- **Botões:** dois tipos — `solid` (cor de marca) e `ghost`/outline. Cantos pouco arredondados na cafeteria (2px) e mais suaves na advocacia (6–12px); escolha um raio e mantenha.
- **Cor de marca como seção cheia:** uma seção de destaque (cardápio, "como trabalhamos") em fundo de marca com texto `--brand-ink`, usando `color-mix(in srgb, var(--brand-ink) 70%, transparent)` para textos secundários.
- **Tema escuro opcional** (usado na cafeteria): redefina os tokens em `@media (prefers-color-scheme:dark)` com `:root:not([data-theme="light"])` e também em `:root[data-theme="dark"]`; defina `color-scheme:dark`; dê a `body` um `background` explícito.
- **Movimento discreto:** revelar blocos ao rolar (IntersectionObserver + classe `is-visible`), transições de ~200 ms, e bloco `@media (prefers-reduced-motion:reduce)` desligando tudo.

## 5. Estrutura de seções

Ordem típica; remova o que não se aplica ao ramo.

| # | Seção | Notas |
|---|---|---|
| 1 | Cabeçalho fixo (`position:sticky`) | Logo/nome, navegação por âncoras, botão "Menu" no celular, CTA principal. Ganha borda ao rolar. |
| 2 | Hero | `h1` com a promessa em uma frase, subtítulo curto, 2 botões (ação principal + secundária), 2–3 fatos (horário, endereço, "1ª consulta sem compromisso"). |
| 3 | Destaques / Áreas | Grade de 3–6 cartões com ícone SVG ou foto, título e uma linha. |
| 4 | Conteúdo principal do ramo | Cardápio com abas (comércio) ou "Como trabalhamos" em 4 etapas (serviço). |
| 5 | Sobre / A casa / Equipe | História curta e humana; equipe com avatar SVG de iniciais (nunca foto falsa). |
| 6 | Prova social | Só se houver. Em protótipo, rótulo e iniciais ("R. Almeida") e avise no README que são de exemplo. |
| 7 | FAQ | `<details name="faq">` nativo, ícone +/−, sem JS. |
| 8 | Contato / Visite | Endereço, horário (hoje destacado), telefone, e-mail, mapa (link "Abrir no Google Maps"; `iframe` opcional), formulário. |
| 9 | CTA final + rodapé | Rodapé com marca, navegação, contato e `© <ano atual>`. Botões flutuantes: voltar ao topo e WhatsApp. |

`section[id]{scroll-margin-top:var(--header-h)}` para as âncoras não ficarem sob o cabeçalho fixo.

## 6. Imagens

- Foto de banco (Unsplash) só com fallback. Padrão da cafeteria:

```html
<div class="ph" data-alt="Cappuccino DiJu">
  <img loading="lazy" src="…" alt="Cappuccino com desenho na espuma">
</div>
```
```css
.ph{position:relative;background:var(--paper);overflow:hidden}
.ph img{width:100%;height:100%;object-fit:cover}
.ph.fail img{display:none}
.ph.fail::after{content:attr(data-alt);position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:var(--muted)}
```
```js
document.querySelectorAll('.ph img').forEach(img=>{
  const fail=()=>img.parentElement.classList.add('fail');
  if(img.complete&&img.naturalWidth===0)fail();
  img.addEventListener('error',fail);
});
```
- Sempre `alt` descritivo, `width`/`height` ou `aspect-ratio` (evita salto de layout), `loading="lazy"` abaixo da dobra e `fetchpriority="high"` só na imagem do hero.
- Marca, favicon e ilustrações: SVG no repositório. Imagens decorativas com `alt=""` e `aria-hidden`.
- **Prévia no visualizador de artefatos do Claude:** imagens e iframes de outros domínios são bloqueados. Isso é limite da prévia, não defeito do site; para conferir imagens use o GitHub Pages.

## 7. JavaScript — o que incluir

Envolver em IIFE (`(()=>{ … })()`), sem variáveis globais. Módulos pequenos e independentes:

- **Cabeçalho:** classe `scrolled` quando `scrollY > 8`.
- **Menu mobile:** botão com `aria-expanded` e `aria-controls`, fecha com `Esc`, ao clicar em link e ao passar de um breakpoint; trava o scroll do `body` quando aberto.
- **Âncoras suaves** com compensação do cabeçalho; respeitar `prefers-reduced-motion`.
- **Revelar ao rolar** (IntersectionObserver com `unobserve` depois de revelar; sem IO, mostrar tudo).
- **Específicos do ramo:** status "aberto agora" calculado por tabela de horários e atualizado a cada minuto; filtro de cardápio por abas (`role="tablist"`, `aria-selected`); destaque da linha do dia na tabela de horários.
- **Link de WhatsApp** montado em JS a partir de uma `CONFIG` única no topo do arquivo:

```js
const CONFIG={ WHATSAPP_NUMBER:"5511000001234", FORM_ENDPOINT:"" };
const href="https://wa.me/"+CONFIG.WHATSAPP_NUMBER+"?text="+encodeURIComponent("Olá! Vim pelo site e gostaria de mais informações.");
document.querySelectorAll("[data-whatsapp-link]").forEach(a=>a.href=href);
```

### Formulário de contato

- `novalidate` no `<form>`; validação própria com mensagens em português por campo (nome ≥ 3 letras, e-mail por regex simples, telefone ≥ 10 dígitos, mensagem mínima, consentimento).
- **Honeypot** anti-spam: campo oculto (`tabindex="-1"`, `autocomplete="off"`); se preenchido, ignora em silêncio.
- Feedback em `role="status" aria-live="polite"`, com estados de sucesso, erro e informativo.
- Envio via `fetch` para `CONFIG.FORM_ENDPOINT` (Formspree ou similar). **Se o endpoint estiver vazio, diga a verdade:** "formulário ainda não conectado; fale pelo WhatsApp". Nunca simule sucesso de um envio que não aconteceu (a cafeteria usa um `setTimeout` de demonstração; em site entregue ao cliente, troque por endpoint real ou pelo aviso honesto).
- Botão desabilitado e texto "Enviando…" durante o envio; restaurar no `finally`.
- Aviso de consentimento (LGPD) com checkbox obrigatório quando coleta dados pessoais.

## 8. Acessibilidade e responsivo

- `lang="pt-BR"`, um único `h1`, hierarquia de títulos sem pular nível, `<header>`, `<nav aria-label>`, `<main>`, `<footer>`.
- Link "Pular para o conteúdo" no início do `body` (usado na advocacia).
- `:focus-visible` com contorno na cor de acento; áreas de toque ≥ 44 px no celular.
- `<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">`; testar em 320 px, 390 px, 768 px e 1280 px. Sem rolagem horizontal.
- Grades colapsam: 4 → 2 → 1 colunas (pontos típicos 960 px e 480 px); navegação vira botão "Menu" abaixo de ~820 px.
- Contraste mínimo 4,5:1 para texto; não use só cor para indicar estado.

## 9. SEO e metadados

- `<title>` com nome + ramo + cidade; `<meta name="description">` em 1–2 frases com cidade e serviços.
- `theme-color`, favicon SVG, `canonical` apontando para a URL do GitHub Pages.
- Open Graph básico (`og:type`, `og:title`, `og:description`, `og:locale="pt_BR"`).
- `robots.txt` e `sitemap.xml` quando usar o formato com assets.
- Textos de exemplo de e-mail/telefone usam domínio e número claramente fictícios (`(11) 00000-1234`).

## 10. Linguagem

Português do Brasil, frases curtas e diretas, "você". Para serviços jurídicos e de saúde: sem promessa de resultado, sem garantias, sem "o melhor"; descreva o processo e o que esperar. Para comércio: foque no produto, no horário e em como chegar.

## 11. Fluxo de entrega

1. Levantar dados (seção 2) e escolher paleta e fontes.
2. Montar `index.html` (e assets) seguindo as seções acima.
3. **Testar de verdade:** abrir em largura de celular e desktop, percorrer o menu, o filtro/abas, o FAQ e o formulário (campos vazios, e-mail inválido, caminho de sucesso). Conferir o console sem erros.
4. Criar o README com a tabela de dados de exemplo.
5. Publicar em branch, abrir PR em rascunho e só depois do aval do cliente ativar o GitHub Pages.
6. Se o usuário pedir um link para testar, publique uma prévia privada; avise que imagens/mapas externos não aparecem no visualizador.

## 12. Checklist final

- [ ] Todos os dados fictícios listados no README.
- [ ] Nenhuma imagem externa sem fallback; `alt` em todas.
- [ ] Tokens em `:root`, sem cores soltas no CSS.
- [ ] Menu mobile, âncoras e formulário testados.
- [ ] `prefers-reduced-motion` e `:focus-visible` presentes.
- [ ] Título, descrição, canonical e OG preenchidos.
- [ ] Ano do rodapé dinâmico.
- [ ] Formulário não simula envio inexistente.
