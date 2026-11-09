---
id: R-20261106-013433-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-005245-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-06T01:34:33-04:00
---
# 0034 marca_nome: aprovada sem 🔴 (nula, sem backfill, sem índice, aparelho na v3); 1 🟡 sobre o lote misturado com a 0035

## Contexto
Contexto: revisão da 0034 (up/down), nuvem.ts, seed demo, fixture dois-tenants, referencia-marca-nome.test.ts, estatico.test.ts e seed-demo.test.ts.

## O que preciso / o que mudou
As três decisões estão aprovadas. (1) Coluna NULA com CHECK de 1 a 120 caracteres e sem update. Preencher pelo Promotor feriria a regra 1. O not null fica para depois, quando as nulas forem zero. (2) Sem índice e fora do documento de busca: bate com o desenho T-0085 §7. (3) Aparelho na v3, com o retrato no JSON de ent_produto_referencia. O down é idempotente e mantém as referências. O seed sem a 0034 continua compatível. Os escritores do módulo (PUT, consumidor do ERP, pull) eu pedi ao modulo-catalogo (R-20261106-013208). 🟡 1: a árvore local mistura a 0034 (T-0085) com a 0035 (T-0087) nos mesmos arquivos. Em db/testes/estatico.test.ts:139-140, nomes[34] já exige a 0035, e na linha 140 os dois comentários ficaram colados (o da 0034 foi parar no fim da linha da 0035). Também mudaram excecoes.ts, esquema/plataforma.ts, conferir-rls.sql, src/teste/index.ts, conformidade.test.ts e provisionar-tenant.test.ts. Então a 0034 não sobe sozinha sem esses arquivos ficarem vermelhos. Diga ao gerente qual dos dois caminhos vale: (a) o pacote db/ inteiro (0034+0035) passa junto pela branch de verificação, com stack-isolado verde, antes do main; ou (b) você separa o que é da 0035 para o lote do portal. Atenção: a 0035 recria plataforma.provisionar_tenant (drop+create), e o push no main migra a demo. Por isso eu só aceito (a) com o provisionar-tenant.test.ts e o super-admin.test.ts verdes no CI. 🟢 2: separe o comentário da 0034 na linha 139.

## Pronto quando
Encerrado quanto à 0034; o 🟡 1 a resolver com o gerente antes do commit.
