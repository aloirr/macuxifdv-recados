---
id: R-20261113-170748-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T17:07:48-04:00
---
# Abrir na nuvem: N-D (servidor da T-0170) e N-H (RD de Pesquisa e Treinamento); M0 no main

## Contexto
O M0 da v1.0.5 está no main (68c6d5d4, R-20261113-165223). As frentes N-D e N-H da nuvem esperavam por ele. A regra vale: uma sessão, um agente, um PR. Corte da v1.0.6 às 18h30: o que não fechar vai para o Oficial de sábado.

## O que preciso
Abra na nuvem, a partir do main, as duas frentes abaixo. O prompt é o do `docs/desenho/v1.0.5-nuvem-prompts.md`, copiado aqui sem alteração.

## N-D — Servidor da T-0170: migrações, Drizzle, rotas e provedores do sync (depois de M0, N-A e N-B no main)

```text
Você faz duas partes, nesta ordem: primeiro como banco-dados, depois como modulo-core, numa sessão da nuvem do Macuxi FDV.
Leia o CLAUDE.md e siga as regras inegociáveis (toda tabela com id, tenant_id, created_at, updated_at, deleted_at,
external_id e RLS enable + force).

Tarefa: T-0170, servidor das tarefas, da frase do dia, do avatar e da Performance. Desenhos: docs/desenho/tarefas-consultor.md
§3 a §6, docs/desenho/inicio-frase-avatar-pedidos.md §1 e §2, docs/desenho/performance-produtividade.md §5, §6 e §7.
Contratos e domain já estão no main (N-A e N-B): use-os pelo caminho relativo.

Branch: nuvem/T-0170-core-servidor, a partir do main com o commit do lote (as migrações 0062 e 0063 têm de estar lá).
Commits por parte: "T-0170: ..." com "Agente: banco-dados" e, depois, com "Agente: modulo-core".

Caminhos exclusivos:
- banco-dados (NOVOS): db/migrations/0064_core_tarefa.{up,down}.sql, 0065_core_frase_avatar.{up,down}.sql e
  0066_core_meta_produtividade.{up,down}.sql (meta_produtividade, deslocamento_dia vazio e itens_por_pedido no CHECK de
  core.meta.indicador); db/testes/t0170-*.db.test.ts;
- banco-dados (TRAVADOS pela nuvem durante a frente): modules/core/db/nuvem.ts (espelho Drizzle) e docs/banco/core.md;
- modulo-core (NOVOS): modules/core/api/tarefas.ts, frases.ts, avatar.ts, performance.ts e metas-produtividade.ts, os
  provedores de sync em modules/core/api/sync-t0170.ts (funções exportadas, sem registrar) e os testes ao lado.

Critérios:
1. Migrações aditivas com up e down; as 30 frases padrão carregadas nos tenants existentes e no provisionar_tenant,
   de forma idempotente; RLS testado entre dois tenants; únicos vivos com deleted_at.
2. drizzle-x-banco.test.ts e estatico.test.ts verdes. Os testes de banco rodam no CI (stack-isolado.yml), nunca com Docker local.
3. Rotas /v1/core/... validadas por Zod; toda rota checa perfil, escopo de carteira e licença do Core; erro de negócio
   422 com o código da RN; escrita idempotente pelo id gerado no aparelho; log pino sem dado pessoal.
4. pnpm --filter @macuxi/core e pnpm --filter @macuxi/db: lint, typecheck e test verdes.

Não tocar fora disso: nada de api/index.ts, sync.ts, manifest.ts, contracts/index.ts, seeds (db/seeds), SQLite do aparelho
nem arquivo existente fora dos dois travados. O registro das rotas, das entidades de sync, a seed da demo e o SQLite são
do PC, na costura. Ao terminar cada parte, mande entrega ao gerente-projetos com cópia ao engenheiro-software, com a lista
do que a costura precisa registrar.
```

## N-H — RD de Pesquisa e Treinamento e as consultas da tarefa de pesquisa (depois de M0)

```text
Você faz duas partes numa sessão da nuvem do Macuxi FDV: como modulo-pesquisa e como modulo-treinamento. Leia o CLAUDE.md
e siga as regras inegociáveis.

Tarefas: T-0171 (listas do corretor, docs/qualidade/redundancias/2026-11-12-T-0171-listas.md: RD-0212 e RD-0213, aprovados
pelo Alexandre em R-20261112-210236) e T-0170 (consultas da tarefa de pesquisa, docs/desenho/tarefas-consultor.md §4.3).

Branch: nuvem/T-0171-rd-pesquisa-treinamento, a partir do main com o commit do lote. Commits por parte, com
"Agente: modulo-pesquisa" e "Agente: modulo-treinamento".

Caminhos exclusivos:
- modulo-pesquisa: modules/pesquisa/app/screens/pesquisas-screen.tsx (RD-0212) e, NOVOS, as consultas
  pesquisa.questionarios_para_tarefa@1 (API) e pesquisa.resposta_local@1 (aparelho) em arquivos próprios, com testes;
- modulo-treinamento: modules/treinamento/app/screens/treinar-screen.tsx e trilha-screen.tsx (RD-0213).

Critérios:
1. RD-0212: disponível = título + "N perguntas"; respondida = título + "Volta em dd/mm"; sem as tags que repetem o título da seção.
2. RD-0213: o prazo na tag ("Atrasada há 3 dias", "Vence amanhã"), a linha "3 de 5 lições", sem "Abra a trilha para ver o que falta.".
3. As consultas com Zod, licença da Pesquisa checada e o mesmo domain nos dois canais.
4. lint, typecheck e test verdes nos dois pacotes.

Não tocar fora disso: nada de manifest.ts (o registro das consultas e o espelho do manifesto são feitos no PC),
modules/pesquisa/app/lib/formulario.ts, responder-screen.tsx nem outro arquivo existente. Ao terminar cada parte, mande
entrega ao gerente-projetos com cópia ao corretor-redundancias e ao engenheiro-software.
```

## Pronto quando
As duas sessões estão abertas e os caminhos foram avisados ao gerente para travar no quadro.
