---
id: R-20261101-044224-4-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:42:24+00:00
---
# T-0025: desenho do Hub /integracao/v1, contratos HTTP e domínio de ingestão

## Contexto
T-0025 (Sprint 2, frente nuvem; branch `nuvem/T-0025-hub-api-desenho`): desenho do Hub `/integracao/v1`, contratos HTTP e domínio de ingestão. Não existe `.coord/tarefas/T-0025.md`; a especificação foi o prompt do gerente. Sem rotas, migrações nem telas.

## O que fiz
**Documento** `docs/modulos/integracao/hub-api.md` (novo; `desenho.md` e `conector.md` ganharam ponteiros): cada endpoint (método, corpo, respostas, erros com HTTP e `codigo`), chave de API por Conector (HMAC, mostrada uma vez, rotação com convivência da anterior de 24 h, revogação, sem vazar o motivo da recusa), `Idempotency-Key` por lote, limites (corpo 8 MiB/1 MiB, 5.000 linhas, 500 inválidas, taxa por Conector), sinal de vida e política de versão (mínima bloqueia com 426, recomendada avisa), ingestão staging → validação → aplicação por dependência, linhas inválidas e a exceção da RN-INT-01, trava de inativação (RN-INT-06) com confirmação no BKO, fila de pedidos (confirmação idempotente, `itens_faturados`, cancelado do ERP), reconciliação, monitor, multi-tenant/RLS/privacidade, diagramas em texto e a seção 17 "Entregas para implementação" (a: rotas, b: tabelas/RLS, c: telas).
**Contratos** (`modules/integracao/contracts`): `hub.ts` (cabeçalhos, `ErroHub`, `RecusaLote`, `RecusaRetorno`, queries, `RespostaReconciliacao`, tabela `ROTAS_HUB`), `bko.ts` (conectores, chave, política, lotes, monitor, inativação, mapeamento, pedidos), acréscimos compatíveis em `lote.ts` (códigos de envelope, `InativacaoLote`, `repetido`, `erros_total`), `pedido.ts` (`PedidoAprovadoParaFila`) e `eventos.ts` (`LoteRecebidoEvento`, interno). Nenhum export existente foi removido ou alterado de forma incompatível (RN-INT-09; sem ADR).
**Domain** (testes escritos antes; citam RN): `lote-idempotencia`, `credencial`, `conector-versao`, `limites`, `linhas-invalidas`, `inativacao`, `aplicacao`, `pedido-fila`, `monitor`, mais mudanças em `envelope` (exceção RN-INT-01), `erros` (`invalidas_conector`), `sessao` (omitidas) e `parametros`. **Manifesto**: ações do BKO (`monitor.ver`, `lote.reprocessar`, `mapeamento.editar`, `conector.gerenciar`, `inativacao.decidir`), evento interno `integracao.lote.recebido@1`, versão 0.2.0.

## Testes e checks
`@macuxi/integracao`: **274 testes** (eram 123; +151), 21 arquivos, todos verdes; lint e typecheck do módulo verdes. Raiz: `pnpm lint`, `pnpm typecheck`, `pnpm fronteiras` e `pnpm test` verdes (com Node 24; no Node 22 o `core` falha em argon2id, requisito do repositório). `node scripts/coord.mjs verificar modulo-integracao --base origin/main` sai 0 (38 arquivos, só do meu escopo). Testes de banco foram pulados (sem Docker no ambiente). `pnpm-lock.yaml` não mudou.

## Divergências com o Conector (apps/conector/src/hub não foi alterado)
Compatível campo a campo (tabela na seção 16 do doc). Riscos/divergências a tratar fora daqui: **D-1** linhas descartadas pelo Conector (sem `external_id`/`alterado_em`, ou modo `descartar`) não viajam e, numa carga completa, o registro pode ser inativado; **D-2** página só com linhas inválidas: o Conector não envia, o Hub agora aceita; **D-3** `external_id` de linha inválida até 200 no Conector x 100 no contrato; **D-4** 426/409 em `POST /lotes` bloqueiam a entidade no Conector (sugiro tratar 426 como pausa); **D-5/D-6/D-7** menores (erros truncados em 1.000, data da reconciliação local do Conector, `conector_id` do corpo é só informativo).

## Perguntas de produto (decisão do gerente/Alexandre; propostas entre parênteses)
P-1 lote só com linhas inválidas termina `concluido_com_erros` (proposto) ou `falhou`? P-2 "lote parado" da RN-INT-06 = lote concluído e só a inativação pendente (proposto)? P-3 confirmar inativação e gerenciar chaves só `admin` (proposto)? P-4 retorno com `itens_faturados` inválidos recusado inteiro (422, como na T-0011) ou aceito sem os itens? P-5 convivência da chave anterior 24 h? P-6 um Conector por entidade por empresa na reconciliação? P-7 pedidos para um só Conector por empresa (`recebe_pedidos`)? Também: registrar no doc 03 as emendas às RN-INT-01/03/06/08 e as **RN-INT-10..12 propostas** (credencial, política de versão, limites/idempotência do lote) e os parâmetros novos; os testes citam "RN-INT-10/11/12 (proposta)".

## Premissas
Outbox como fila de aplicação (evento interno); o Vendedor publicará o pedido aprovado com `*_external_id` (pedido ao `modulo-vendedor`, cc engenheiro); reconciliação por (Conector, entidade); a rota de Conector exige ADR nova (pedido ao engenheiro).

## Pendências / próximos passos
Rotas (engenheiro, A1-A12), migrações (banco-dados, 17b), evento do Vendedor, telas do BKO (`modules/integracao/web`, 17c), carga por arquivo (RF-INT-03), Conector v1.2 (D-1/D-2/D-4). Recados em aberto na minha caixa não são da T-0025 (R-...123752 itens_faturados já foi atendido na T-0023 e agora validado no domain; R-...173203 testes intermitentes do Conector fica para a tarefa do Conector).
