# plataformaDCC-dev

A [PlataformaDCC](https://plataforma-dcc.vercel.app/) é um repositório de jogos voltados para crianças.

Este repositório é a base de integração para desenvolvedores testarem jogos localmente antes de submeter para a plataforma oficial.

---

## Pré-requisitos

- Node.js 20+
- npm 10+

---

## Passo a passo para submeter um jogo

### 1. Fork

Acesse [github.com/plataformadcc/plataformadcc-dev](https://github.com/plataformadcc/plataformadcc-dev) e clique em **Fork**.

### 2. Clone e branch

```bash
git clone https://github.com/SEU-USUARIO/plataformadcc-dev.git
cd plataformadcc-dev

git checkout -b plataformadcc-[slug]-[seuNome]
```

Exemplos de nome de branch:
```
plataformadcc-space-shooter-joaosilva
plataformadcc-multiplicacao-rapida-mariaoliveira
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Adicione seu jogo

Crie a pasta do jogo em `public/_games/`:

```
public/_games/
└── seu-jogo/
    ├── index.html   ← entrypoint obrigatório
    ├── assets/      ← scripts, imagens, estilos
    └── README.md    ← objetivo pedagógico e controles
```

O **slug** é o nome da pasta: minúsculas, sem espaços, com hífens. Exemplo: `multiplicacao-rapida`.

### 5. Registre no catálogo

Abra `games.config.ts` na raiz e adicione seu jogo:

```ts
export const games: GameConfig[] = [
  // ... outros jogos
  {
    slug: 'seu-jogo',
    name: 'Nome do Jogo',
    description: 'Descrição curta do jogo.',
    compatibility: ['pc'], // 'pc' | 'cell'
  },
]
```

### 6. Teste localmente

```bash
npm run dev
```

Confirme que seu jogo aparece no catálogo e roda em `http://localhost:3000/games/seu-jogo`.

### 7. Commit e Pull Request

```bash
git add -A
git commit -m "feat: adiciona jogo seu-jogo"
git push origin plataformadcc-seu-jogo-seuNome
```

Abra um **Pull Request** da sua branch para `main` neste repositório.

---

## Contrato do jogo no iframe

O jogo roda em iframe sandbox. Certifique-se de que:

- O entrypoint é `public/_games/[slug]/index.html`
- Funciona sem backend externo obrigatório
- Não coleta dados pessoais nem usa trackers
- É responsivo (desktop e mobile)

---

## Checklist antes de abrir o PR

- [ ] Pasta criada em `public/_games/[slug]/`
- [ ] `index.html` presente e abrindo sem erros
- [ ] Slug em `games.config.ts` bate com o nome da pasta
- [ ] Jogo funciona em `http://localhost:3000/games/[slug]`
- [ ] `README.md` dentro da pasta com objetivo pedagógico e controles
- [ ] Branch com padrão `plataformadcc-[slug]-[seuNome]`

---

## Referência

Abra `http://localhost:3000/games/jogo-exemplo` para ver um exemplo completo do fluxo de submissão.
