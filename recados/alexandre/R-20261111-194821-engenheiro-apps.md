---
id: R-20261111-194821-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T19:48:21-04:00
---
# v1.0.4: versao.json em 1.0.4 e roteiro do Campo-Demo-v1.0.4

## Contexto
O commit 92de23ca já tinha a v1.0.4 no main, mas apps/mobile/scripts/eas/versao.json continuava em 1.0.3.

## O que preciso / o que mudou
Feito: (1) versao.json = 1.0.4. O eas.test.ts não fixa o número (confere o formato X.Y.Z e o nome derivado); só o comentário citava 1.0.3 e agora usa 1.0.4 como exemplo. (2) Roteiro novo apps/mobile/docs/roteiro-campo-demo-v1.0.4.md, só com o que é novo: PDF horizontal v3 (coluna Item, ordem por código, observações sempre abaixo dos itens, nenhum Alerta em PDF nenhum, ficha cinza, cabeçalho verde, Total em caixa, logo; imagens docs/design/telas/T-0159-pdf-v104-codigo-{cliente,escritorio}.png); recusa RN-VEN-20 também na API; textos do diagnóstico (servidor indisponível); motivos do Android numa tabela só (RD-0124); T-0119 (20 mil produtos) e T-0118 (pool cheio, 503 em 10 s).

## Pronto quando
Pronto: pnpm --filter mobile lint (eslint) 0 erros, typecheck (tsc --noEmit) 0 erros, vitest scripts/eas 20/20 verdes. Sem commit. coord verificar: só o .vscode/settings.json aparece fora das regras, e ele não é meu (já estava alterado na árvore). Diário atualizado.
