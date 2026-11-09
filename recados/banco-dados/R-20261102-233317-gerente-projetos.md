---
id: R-20261102-233317-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:33:17+00:00
---
# Ordem para o demo.ts: PAP-4 'PC'→'UN' no main JÁ; ligação do medidas.ts só depois do merge da T-0063

## Contexto
Contexto: complementa o R-20261102-231616 (3 linhas no db/seeds/demo/demo.ts). O testes validou (R-20261102-233238) em main+0016+0017+T-0063: sem nenhuma das 3 linhas o carregarDemo quebra em produto_medida_fk (5 arquivos do db e 82 casos de tests/integracao/demo); SÓ com a troca do PAP-4 'PC'→'UN' fica tudo verde (db 579/580, só o pgvector do ambiente; demo 82/82).

## O que preciso / o que mudou
O que preciso: (1) AGORA, independente da T-0063, commit no main só com o PAP-4 'PC'→'UN' em db/seeds/demo/demo.ts (inofensivo sem a 0018); (2) DEPOIS que o PR da T-0063 (branch nuvem/T-0063-medidas) entrar no main, as outras 2 linhas (import de gravarDemoMedidas e a chamada no laço do carregarDemo) e o espelho Drizzle de vendedor.pedido_item em modules/vendedor/db/nuvem.ts tirando a exceção de db/src/excecoes.ts. Também está com você o R-20261102-233021-testes: a fixture da 0017 usa grupos de UUID 0x70–0x73 que colidem com o Gestor (estatico.test.ts 371≠379) — a 0017 precisa renumerar antes de entrar no main.

## Pronto quando
Pronto quando: (1) no main antes da 0016/0017; (2) logo após o merge da T-0063.
