# Shammatech — Landing Page

Landing page institucional da **Shammatech**, empresa de tecnologia e automação. Construída com HTML5 semântico, Tailwind CSS e JavaScript puro, sem dependência de build ou framework.

🔗 **Site publicado:** https://juliojuliano.github.io/shammatech-landing-page/

## Seções

- Hero com CTA duplo (orçamento / ver serviços)
- Serviços (landing pages, automação n8n, sistemas web, integrações via API, SEO, suporte)
- Sobre a empresa com números
- Processo de trabalho em 4 etapas
- Depoimentos de clientes
- FAQ em accordion
- Formulário de contato com validação em tempo real e proteção anti-spam (honeypot)
- Botão flutuante de WhatsApp

## Stack

- HTML5 semântico
- [Tailwind CSS](https://tailwindcss.com/) via CDN
- JavaScript ES6+ vanilla (sem dependências externas de runtime)

## Estrutura do projeto

```
.
├── index.html      # Estrutura e conteúdo da página
├── styles.css      # Estilos complementares ao Tailwind (accordion, foco, scrollbar)
└── script.js       # Menu mobile, FAQ, validação do formulário
```

## Rodando localmente

Não há etapa de build. Basta servir os arquivos estáticos, por exemplo:

```bash
python -m http.server 5500
```

Depois acesse `http://localhost:5500`.

## Configurando para produção

Antes de publicar para uso real do cliente, atualize em [`index.html`](index.html):

- E-mail, telefone e número de WhatsApp (atualmente placeholders)
- O envio do formulário em [`script.js`](script.js) está simulado (`setTimeout`) — substitua pela chamada real a um endpoint, webhook do n8n ou serviço de formulário (ex: Formspree)

## Deploy

O site é publicado automaticamente via **GitHub Pages** a partir da branch `main`. Também pode ser hospedado em Netlify, Vercel ou qualquer servidor HTTP estático, sem nenhum ajuste adicional.
