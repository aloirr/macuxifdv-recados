---
id: R-20261110-150142-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:01:42-04:00
---
# Ensaio 2: filiais.db.test corrigido; R3 depende do testes

## Contexto
Contexto

## O que preciso / o que mudou
filiais.db.test: limpar() apagava tabela_preco com cliente_tabela_preco apontando (FK); agora apaga cliente_tabela_preco antes (modules/catalogo/api/filiais.db.test.ts). R3 do orcamento-t0071: o helper do teste monta ContextoConsulta sem consultar, e sugestoes_pedido passou a chamar core.filiais@1 (sem vazamento; só erro); pedido ao testes R-20261110-150113

## Pronto quando
Validar no ensaio 3 | Sem commit
