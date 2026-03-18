# lorena-quiz

Projeto iniciado com base em `AGENTS.md`.

## Estrutura de 3 camadas

1. `directives/` : SOPs (Markdown) com o “o que fazer”
2. `execution/` : scripts deterministicos (Python) com o “como fazer”
3. `.tmp/` : artefatos temporarios (regeraveis)

## Segredos e configuracao

- Crie `.env` a partir de `.env.example`
- Nao comite `credentials.json` nem `token.json` (ja estao no `.gitignore`)

