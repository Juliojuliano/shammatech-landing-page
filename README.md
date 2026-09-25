# Shammatech — Landing Page

Landing page institucional da **Shammatech**, empresa de tecnologia e automação. Construída com HTML5 semântico, Tailwind CSS compilado localmente e JavaScript puro, sem dependência de CDN em produção.

🔗 **Site publicado:** https://juliojuliano.github.io/shammatech-landing-page/

## Seções

- Hero com mascote animado e CTA duplo (orçamento / ver serviços)
- Serviços (landing pages, automação n8n, sistemas web, integrações via API, SEO, suporte)
- Sobre a empresa com números
- Processo de trabalho em 4 etapas
- Depoimentos de clientes
- FAQ em accordion
- Formulário de contato com validação em tempo real e proteção anti-spam (honeypot)
- Botão flutuante de WhatsApp

## Stack

- HTML5 semântico
- [Tailwind CSS](https://tailwindcss.com/) compilado localmente (sem `<script>` de CDN em runtime)
- JavaScript ES6+ vanilla (sem dependências externas de runtime)

## Estrutura do projeto

```
├── index.html               # Estrutura e conteúdo da página
├── assets/
│   ├── css/
│   │   └── tailwind.css     # CSS gerado pelo Tailwind (não editar à mão)
│   └── img/
│       └── mascote-shammatech-robo.jpg   # Mascote oficial da marca
├── src/
│   └── input.css            # Fonte do Tailwind (@tailwind base/components/utilities)
├── styles.css                # Estilos complementares ao Tailwind (accordion, foco, scrollbar)
├── script.js                 # Menu mobile, FAQ, validação do formulário
└── tailwind.config.js         # Cores da marca, fontes e animações
```

## Como rodar localmente

Pré-requisito: Node.js 18+ (apenas para compilar o CSS do Tailwind; a página final não precisa de Node para funcionar).

```bash
npm install
npm run build:css     # gera assets/css/tailwind.css
npm run serve         # sobe um servidor local em http://localhost:5500
```

Durante o desenvolvimento, use `npm run watch:css` para recompilar o Tailwind automaticamente a cada alteração no HTML/JS.

## Configurando para produção

Antes de publicar para uso real do cliente, atualize em [`index.html`](index.html):

- E-mail, telefone e número de WhatsApp (atualmente placeholders)
- O envio do formulário em [`script.js`](script.js) está simulado (`setTimeout`) — substitua pela chamada real a um endpoint, webhook do n8n ou serviço de formulário (ex: Formspree)
- Links de redes sociais no rodapé (atualmente `#`)

## Deploy

O site é publicado automaticamente via **GitHub Pages** a partir da branch `main`. Como o CSS já vem compilado e comitado em `assets/css/tailwind.css`, não é preciso nenhum passo de build no servidor. Também pode ser hospedado em Netlify, Vercel ou qualquer servidor HTTP estático, sem nenhum ajuste adicional.

## Changelog

- **Correção de bug:** o Tailwind era carregado via `<script src="https://cdn.tailwindcss.com">` em runtime. Quando esse CDN falha ou é bloqueado (firewall corporativo, bloqueador de anúncios, rede restrita), a página quebrava completamente (erro `tailwind is not defined` e site sem estilo nenhum). Trocado por uma build local compilada e comitada, igual ao projeto da Adonai Fotocine — elimina esse ponto único de falha.
- **Mascote:** adicionado o mascote oficial (robô) na seção Hero e como imagem de Open Graph, em `assets/img/mascote-shammatech-robo.jpg`.
