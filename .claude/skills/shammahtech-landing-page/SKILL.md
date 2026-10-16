---
name: shammahtech-landing-page
description: Fluxo de trabalho para editar e publicar a landing page da Shammahtech (HTML estático + Tailwind, repositório juliojuliano/shammatech-landing-page). Use sempre que o pedido envolver a landing page, o site ou o domínio shammahtech.com.br, o mascote Shammy (GIF, vídeo ou imagens), o logo, textos do site, "abrir artefato/prévia para eu ver", PR ou merge desse repositório, ou deploy na Vercel. Use mesmo que o usuário não cite o nome da skill, por exemplo "troca a imagem do Shammy", "acrescenta esse domínio", "melhora o GIF" ou "faz merge do PR".
---

# Landing page da Shammahtech

Site estático em `index.html` com Tailwind compilado (`assets/css/tailwind.css`), `styles.css` e `script.js`. Não há framework. O usuário fala português do Brasil: responda em português, de forma curta e com passos claros.

## Regras de marca (erro comum)

- O nome é **Shammahtech**, tudo junto, em qualquer texto, alt, título ou e-mail.
- O logo tem duas cores (`Shammah` + `<span class="text-brand-400">tech</span>`). Dentro de um `<a class="flex gap-2">`, texto solto e `<span>` viram itens separados do flex e aparecem com espaço. Envolva o nome inteiro em um único `<span>`: `<span>Shammah<span class="text-brand-400">tech</span></span>`.
- Domínio: **shammahtech.com.br** (Registro.br, publicado, expira 23/08/2028). E-mail de contato: `contato@shammahtech.com.br`. Já estão no canonical, `og:url`, bloco de contato e rodapé. O `og:image` ainda aponta para `juliojuliano.github.io`; troque para o domínio novo só quando o site estiver no ar nele.
- Mascote: **Shammy** (robô azul e branco com detalhes laranja). Arquivos em `assets/img/`.

## Fluxo de trabalho

1. Leia o `index.html` antes de mexer e faça edições pequenas e pontuais.
2. Se usar uma classe Tailwind nova, recompile: `npm run build:css` (rode `npm ci` antes se faltar `node_modules`). Sem isso a classe não aparece, porque o CSS é compilado e versionado.
3. Confira em navegador (Playwright com `/opt/pw-browsers/chromium`, servindo com `python3 -m http.server <porta>`), em 1280 px e 390 px. A página já tem ~4 px de overflow horizontal no celular, vindo de brilhos decorativos do Hero; não é regressão sua.
4. Commit na branch designada da sessão, push e PR **em rascunho**; depois assine o PR (`subscribe_pr_activity`). Mensagens de commit em português.
5. Gere a prévia (abaixo) e publique como artefato, para o usuário ver antes de decidir.
6. **Não faça merge sem o usuário pedir.** Quando pedir: tire o PR do rascunho (`update_pull_request draft=false`) e faça merge com `squash`.
7. Se a branch já teve PR mergeado, recomece-a de `origin/main` (`git checkout -B <branch> origin/main`) e use `--force-with-lease` no push; o histórico antigo já foi mergeado.

## Vercel

O usuário pediu explicitamente para **não** publicar na Vercel até avisar. Não chame ferramentas da Vercel por conta própria. Ao fazer merge na `main`, avise que, se o projeto estiver ligado ao repositório, a Vercel pode publicar sozinha. Para ativar o domínio lá será preciso apontar o DNS do Registro.br para ela.

## Prévia para o usuário (artefato)

O artefato precisa ser um arquivo único. Rode:

```bash
python3 .claude/skills/shammahtech-landing-page/scripts/build_preview.py <saida>/preview.html
```

O script embute CSS, JS e imagens/vídeos como `data:`, remove `<html>/<head>/<body>` (o publicador já cria o esqueleto) e preserva as classes do `<body>` num `<div>` de fora. Depois publique com `Artifact` (`file_path` da saída; use `url` para atualizar o mesmo link; `icon` só na primeira vez). Carregue antes a skill `artifact-design`. O link é privado: diga isso ao usuário.

Detalhes que já deram problema:
- O artefato só embute o vídeo **WebM** (o MP4 duplicaria o peso); o script já cuida disso.
- Se o comando `pkill -f` casar com o próprio comando do shell, ele mata a sessão do Bash e o resto do comando não roda. Prefira guardar o PID e usar `kill <pid>`.
- Se o `Artifact` responder "Version N" igual à anterior, o arquivo pode não ter mudado; confirme que o script rodou antes.

## Mídia do Shammy

Leia `references/midia-shammy.md` ao trocar, melhorar ou adicionar GIF, vídeo ou imagens do mascote. Resumo: o GIF original é só 320×569, e GIF nítido fica pesado (9 MB). A solução adotada foi vídeo curto em loop (`<video autoplay loop muted playsinline>`, WebM + MP4, GIF como reserva). O script `scripts/optimize_shammy.sh` repete o tratamento.

## Estado atual do site (referência)

- Hero: vídeo do Shammy em loop, com `poster` e GIF de reserva.
- Bloco final (CTA "Pronto para tirar seu projeto do papel?"): foto estática do Shammy sorrindo de olhos fechados (`assets/img/shammy-final.jpg`), ao lado do texto no desktop e acima dele no celular.
- Seções: Hero, Serviços, Shammy, Sobre, Processo, Depoimentos, FAQ, Contato, CTA final, rodapé.

## Ao terminar

Diga em poucas linhas o que mudou, o que não foi testado (por exemplo Safari/Firefox ou celular real), os links do PR e da prévia, e pergunte se quer merge. Não repita a explicação técnica inteira.
