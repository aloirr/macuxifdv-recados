---
id: R-20261109-142803-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0142
responde_a: R-20261109-135905-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-09T14:28:03-04:00
---
# T-0142: id de 'Outros produtos' aceito no parâmetro no

## Contexto
Contexto: no era limitado a 40 caracteres

## O que preciso / o que mudou
Feito: contracts/rotas.ts ganhou NoHierarquia (uuid, outros:<uuid> de 43, sem-linha, por regex) nas duas rotas; catalogo-page.tsx mostra ErrorBlock com Tentar de novo quando a hierarquia falha, sem cair para todos os produtos; teste em api/rotas.test.ts cobre outros:, sem-linha e id inválido (400)

## Pronto quando
Pronto quando: lint, typecheck e test do @macuxi/catalogo verdes (936 passaram)
