# plataformadcc-dev

A [PlataformaDCC](https://www.plataformadcc.com.br/) é uma plataforma de jogos educacionais para crianças, sem anúncios e sem coleta de dados, criada como Trabalho de Conclusão de Curso em Ciência da Computação na UFRR.

Este repositório é o **kit do desenvolvedor**. Com ele você:

- roda o seu jogo na sua máquina, nas **mesmas condições da produção**: o mesmo `sandbox` do iframe e a mesma política de segurança;
- envia o código do jogo para análise por **pull request**.

---

## Como funciona a publicação

```
Você                                        Equipe da PlataformaDCC
───────────────────────────────────         ───────────────────────────────
1. Conta de dev na plataforma       ──►     aprova o seu perfil de dev
2. Jogo pronto e testado aqui
3. PR para a branch `submissoes`
4. Envio do jogo na plataforma      ──►     Enviado
                                            Em homologação          (testa em ambiente separado)
                                            Aprovado em homologação
                                            Publicado               (o jogo vai ao ar)
```

- Você acompanha cada etapa, com a data, no **painel do desenvolvedor**.
- A equipe pode recusar o jogo em qualquer etapa. Nesse caso, o painel mostra **em qual etapa e por quê**. Corrija e envie de novo.
- **Seu PR não é mesclado neste repositório.** Ele serve para a equipe revisar o código. Depois da análise, o PR é fechado, e o jogo segue para a plataforma pelo caminho interno de publicação. Assim este repositório continua limpo para quem chegar depois.

---

## Passo a passo

### 1. Crie sua conta de desenvolvedor

1. Crie uma conta em [plataformadcc.com.br](https://www.plataformadcc.com.br/auth).
2. Abra **Menu → Área Dev** e preencha o pedido de acesso: GitHub, instituição, vínculo e uma apresentação curta.
3. Aguarde a aprovação. Sem o perfil de desenvolvedor aprovado, a plataforma não aceita envio de jogos.

Você pode fazer os passos 2 a 5 enquanto espera.

### 2. Fork, clone e branch

Faça um **Fork** deste repositório no GitHub e depois:

```bash
git clone https://github.com/SEU-USUARIO/plataformadcc-dev.git
cd plataformadcc-dev
git checkout -b plataformadcc-[slug]-[seuNome]
npm install
```

Exemplo de branch: `plataformadcc-multiplicacao-rapida-mariaoliveira`.

Pré-requisitos: Node.js 20+ e npm 10+.

### 3. Adicione o jogo

```
public/_games/
└── seu-jogo/          ← o nome da pasta é o slug
    ├── index.html     ← entrada obrigatória
    ├── assets/        ← scripts, imagens, sons, fontes
    └── README.md      ← objetivo pedagógico, controles e créditos
```

O **slug** usa letras minúsculas, números e hífens, com 3 a 50 caracteres. Exemplo: `multiplicacao-rapida`. Ele precisa ser **o mesmo** na pasta, no `games.config.ts` e no formulário de envio.

Depois, registre o jogo em `games.config.ts` para ele aparecer no catálogo local:

```ts
{
  slug: 'seu-jogo',
  name: 'Nome do Jogo',
  description: 'Descrição curta do jogo.',
  compatibility: ['pc'], // 'pc' e/ou 'cell'
},
```

### 4. Teste localmente

```bash
npm run dev
```

Abra `http://localhost:3000/games/seu-jogo`, jogue do começo ao fim e **deixe o console do navegador aberto (F12)**. Se aparecer `Refused to ...`, a política de segurança bloqueou algo, e na produção vai bloquear também. Veja as regras técnicas abaixo.

### 5. Abra o pull request para `submissoes`

```bash
git add public/_games/seu-jogo games.config.ts
git commit -m "feat: adiciona jogo seu-jogo"
git push origin plataformadcc-seu-jogo-seuNome
```

No GitHub, abra o PR da sua branch **para a branch `submissoes`**, e não para `main`. O modelo do PR traz um checklist; preencha tudo.

### 6. Envie o jogo na plataforma

Já com o perfil de dev aprovado, abra **Área Dev → Publicar novo jogo** e preencha:

- nome, descrição, categorias, classificação indicativa e compatibilidade;
- **o mesmo slug** da pasta;
- a imagem de capa: PNG, JPEG ou WebP, até 5 MB;
- **o link do seu pull request**.

A partir daí, acompanhe as etapas no painel.

---

## Regras técnicas (o que a produção bloqueia)

O jogo roda num `iframe` com `sandbox`, numa origem própria e com uma Content Security Policy restritiva. Na prática:

| Pode | Não pode |
|---|---|
| Arquivos da própria pasta: JS, CSS, imagens, sons, fontes | Carregar qualquer coisa de outro domínio: CDN, Google Fonts, APIs |
| `<style>` e `style="..."` inline | `<script>` inline ou `onclick="..."` no HTML. Coloque o JS num arquivo `.js` |
| `localStorage` para recordes do próprio jogo | `eval`, `new Function` ou templates compilados em tempo de execução |
| `data:` e `blob:` em imagens, áudio e workers | Abrir popups, trocar a página principal, `alert()` |
| Formulários dentro do próprio jogo | Enviar dados para fora da plataforma |

Precisa de uma biblioteca (Phaser, Vue, Tailwind…) ou de uma fonte? **Copie o arquivo para dentro da pasta do jogo** e use o caminho relativo.

Além disso, o jogo **não pode** coletar dados pessoais, usar trackers ou anúncios, nem depender de backend externo.

## Critérios de conteúdo

- Adequado à classificação indicativa declarada (Livre, 10, 12, 14 ou 16 anos), sem violência explícita nem conteúdo impróprio.
- Objetivo pedagógico ou recreativo claro, descrito no `README.md` do jogo.
- Funciona no computador e, se declarado, no celular.
- **Direitos autorais:** personagens, músicas, fontes e imagens precisam ser seus ou ter licença que permita o uso. Cite as licenças no `README.md` do jogo.

---

## Privacidade

Ao criar a conta, você aceita a [Política de Privacidade](https://www.plataformadcc.com.br/privacy). Se um dia excluir sua conta, você escolhe, para cada jogo publicado, entre excluí-lo ou cedê-lo à plataforma.

Dúvidas: **plataformadcc@gmail.com**.
