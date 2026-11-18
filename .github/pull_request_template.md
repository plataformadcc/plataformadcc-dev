<!--
  Este PR deve apontar para a branch `submissoes`, e não para `main`.
  Ele não será mesclado: serve para a equipe revisar o código do jogo.
-->

## Jogo

- **Nome:**
- **Slug** (nome da pasta em `public/_games/`):
- **Classificação indicativa:** Livre / 10 / 12 / 14 / 16
- **Compatibilidade:** computador / celular
- **Objetivo pedagógico** (uma ou duas frases):

## Checklist

- [ ] O PR aponta para a branch `submissoes`
- [ ] Pasta em `public/_games/[slug]/` com `index.html` e `README.md` (objetivo, controles e créditos)
- [ ] Slug igual na pasta, no `games.config.ts` e no formulário da plataforma
- [ ] Testei em `http://localhost:3000/games/[slug]` com o console aberto, **sem nenhum `Refused to ...`**
- [ ] Nada é carregado de outro domínio (CDN, Google Fonts, APIs): tudo está dentro da pasta do jogo
- [ ] Sem `<script>` inline, `onclick` no HTML, `eval` ou `new Function`
- [ ] Sem coleta de dados pessoais, trackers ou anúncios
- [ ] Imagens, sons, fontes e personagens são meus ou têm licença de uso (citada no `README.md`)
- [ ] Enviei o jogo na plataforma (**Área Dev → Publicar novo jogo**) com o link deste PR
