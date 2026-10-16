# Mídia do Shammy

## Arquivos (`assets/img/`)

| Arquivo | Uso |
|---|---|
| `shammy-hero.webm` / `shammy-hero.mp4` | Vídeo do Hero, 576×1024, ~2,3 MB / ~1,6 MB, em loop |
| `shammy-hero-poster.jpg` | Primeiro quadro, exibido antes de o vídeo carregar |
| `shammy-hero.gif` | Reserva para navegadores sem vídeo (versão 320×569 já melhorada, ~2,2 MB) |
| `shammy-final.jpg` | Foto estática: Shammy sorrindo de olhos fechados (último quadro da animação), usada no CTA final e como reserva |
| `shammy-em-acao.jpg`, `shammy-apresentacao.jpg`, `mascote-shammatech-robo.jpg` | Imagens das outras seções e do Open Graph |

## Lições

- A fonte é só o GIF de 320×569 com 256 cores e ruído. Aumentar a resolução não cria detalhe; o ganho vem de nitidez, contraste e remoção de ruído.
- "Apagado" se resolve com `eq=contrast=1.1:saturation=1.3:brightness=0.03:gamma=0.95`.
- "Desfocado" se resolve com resolução maior + `unsharp=7:7:1.2` e tirando o chuvisco espacial (`hqdn3d=2:2:6:6`). O `hqdn3d` forte (1.5 só de luma etc.) deixa tudo mole; mantenha o denoise espacial baixo.
- GIF nítido e com mais cores fica enorme (4 a 9 MB). Para qualidade alta e peso baixo, use vídeo.
- O Chromium do Playwright desta sessão não decodifica H.264; por isso o HTML lista o WebM primeiro. Safari reproduz MP4 normalmente.
- Escolher o quadro final: a animação tem 92 quadros; os olhos fechados sorrindo ficam do quadro 87 ao 91. Extraia com `select='eq(n,91)'`.
- Se o usuário pedir para o Shammy "ficar parado" numa pose, confirme **onde** ele quer a pose (Hero ou final da página). Já houve mal-entendido: ele queria a pose no final do site e o Hero continuando animado.

## Reproduzir

`scripts/optimize_shammy.sh <gif_original> <pasta_saida>` gera WebM, MP4, poster e a foto do último quadro.
