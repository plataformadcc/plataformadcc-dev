# plataformaDCC-dev starter

Repositório base para devs integrarem e testarem jogos localmente antes de enviar para a plataforma oficial.

Este starter possui apenas:
- catalogo local estatico
- pagina de listagem de jogos
- pagina de execucao via iframe sandbox

Nao possui Firebase, autenticacao, admin, parental, categorias ou classificacao indicativa.

## 1. Pre-requisitos

- Node.js 20+
- npm 10+

## 2. Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Suba o servidor local:

```bash
npm run dev
```

3. Acesse:

```text
http://localhost:3000
```

## 3. Como adicionar seu jogo

1. Crie a pasta do jogo em:

```text
public/_games/[slug]/
```

Exemplo:

```text
public/_games/meu-jogo/
```

2. Coloque o entrypoint em:

```text
public/_games/meu-jogo/index.html
```

3. Adicione o jogo no catalogo local em games.config.ts:

```ts
export const games = [
  {
    slug: 'jogo-exemplo',
    name: 'Jogo Exemplo',
    description: 'Jogo de demonstracao para validar a estrutura.',
    compatibility: ['pc'],
  },
  {
    slug: 'meu-jogo',
    name: 'Meu Jogo',
    description: 'Descricao do meu jogo.',
    compatibility: ['pc', 'cell'],
  },
]
```

4. Abra seu jogo pela rota Nuxt:

```text
http://localhost:3000/games/meu-jogo
```

## 4. Estrutura minima

```text
plataformadcc-dev/
|- public/
|  |- _games/
|  |  |- jogo-exemplo/
|  |  |  |- index.html
|- app/
|  |- app.vue
|  |- pages/
|  |  |- index.vue
|  |  |- games/
|  |     |- [slug].vue
|  |- components/
|     |- GameCard.vue
|     |- GameContainer.vue
|- server/
|  |- middleware/
|     |- game-direct-access.ts
|- games.config.ts
|- nuxt.config.ts
|- package.json
|- tsconfig.json
|- README.md
```

## 5. Contrato do jogo no iframe

O jogo roda em iframe com sandbox. Considere as regras:

- Deve funcionar com entrypoint local em /_games/[slug]/index.html
- Nao deve depender de login da plataforma
- Nao deve tentar acessar APIs privadas da plataforma
- Deve tratar responsivamente desktop e mobile
- Evite popup/download automatico sem acao do usuario

Permissoes do iframe:
- allow-scripts
- allow-same-origin
- allow-popups
- allow-forms
- allow-pointer-lock

## 6. Acesso direto aos arquivos de jogo

O middleware server/middleware/game-direct-access.ts redireciona acesso direto como:

```text
/_games/meu-jogo
/_games/meu-jogo/
/_games/meu-jogo/index.html
```

para:

```text
/games/meu-jogo
```

## 7. Checklist antes de submeter para a plataforma oficial

- O jogo abre em /games/[slug]
- O index.html do jogo esta em public/_games/[slug]/index.html
- O slug no games.config.ts bate com o nome da pasta
- O jogo funciona sem backend externo obrigatorio
- O jogo nao quebra em tela pequena
- O jogo nao depende de recursos removidos (auth/admin/parental)

## 8. Jogo de referencia

Use public/_games/jogo-exemplo como base. Ele contem instrucoes adicionais para padrao de estrutura do jogo.

## 9. Fluxo de contribuicao

### 9.1 Fork e branch

1. Faca um **fork** deste repositório para a sua conta no GitHub
2. Crie uma branch com o padrao:

```text
plataformadcc-[slug]-[nomedoDev]
```

Exemplos:

```text
plataformadcc-meu-jogo-joaosilva
plataformadcc-space-shooter-mariaoliveira
```

3. Implemente seu jogo seguindo as secoes 3, 4 e 5 deste README
4. Valide o checklist da secao 7
5. Abra um **Pull Request** da sua branch para `main` neste repositório

### 9.2 Resumo rapido

```bash
# Clone seu fork
git clone https://github.com/seu-usuario/plataformadcc-dev.git
cd plataformadcc-dev

# Crie a branch
git checkout -b plataformadcc-meu-jogo-nomedoDev

# Instale dependencias
npm install

# Rode localmente
npm run dev

# Commite e envie
git add -A
git commit -m "feat: adiciona jogo meu-jogo"
git push origin plataformadcc-meu-jogo-nomedoDev
```
