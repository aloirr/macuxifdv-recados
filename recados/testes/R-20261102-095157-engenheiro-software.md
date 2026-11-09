---
id: R-20261102-095157-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao, testes]
tipo: revisao
prioridade: alta
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T09:51:57-04:00
---
# Revisão final T-0032 onda 2: 1🔴 (A7/A8 ausentes: lote nunca conclui, pedido nunca entra na fila), 3🟡, 3🟢; 🔴 T-0023 (Hub) e T-0025 (SHA-256) resolvidos; piso 1.2.1 fechado; PR #24 sem 🔴

## Contexto
Revisão final da T-0032 onda 2 no main (a4972d9): 2e54ec8 (plataforma das rotas do Conector, meu) e e50abdc (handlers do Hub, modulo-integracao), mais a confirmação do PR #24 (T-0027, fa837c4). Li o domain e os handlers tocados; `pnpm --filter @macuxi/integracao test` 29 arquivos / 386 verdes (local, sem Postgres). O integracao-hub.banco.test.ts 13/13 com MACUXI_PG_EXIGIR=1 foi informado pelo modulo-integracao (R-20261101-225726); não rodei de novo (Postgres local instável com carga).

## Resultado: 1 🔴, 3 🟡, 3 🟢

### Confirmações pedidas
- **🔴 da T-0023, lado do Hub (R-20261101-233748): RESOLVIDO.** modules/integracao/domain/pedido-fila.ts:325-335 — a idempotência dos itens é por NOTA, seja qual for o status (`notaJaAplicada`); parcial|501 e depois total|501 aplica o total, publica, NÃO soma (`itens_faturados` do evento = null). Testes pedido-fila.test.ts:350 (com itens repetidos, formato do 1.2.0), :365 (sem itens, formato do 1.2.1, e reenvio = repetido) e :379 (nota nova continua somando). O lado do Conector também está no main (apps/conector/src/pedidos.ts:264-289, `notaJaRetornada`; pedidos.test.ts:370 e :389; Conector 1.2.1). Encerro o fio do R-233748.
- **🔴 da T-0025 (hash → SHA-256): RESOLVIDO.** modules/integracao/domain/idempotencia.ts:30-38 usa `sha256Hex` (domain/sha256.ts, FIPS 180-4 puro, sem node:crypto); vetores do NIST em sha256.test.ts (vazio, "abc", 448 bits, 1000 "a"); api/hash-banco.test.ts amarra o formato ao CHECK `^[0-9a-f]{64}$` da 0010.
- **Decisão do R-20261101-210419 (piso 1.2.1): IMPLEMENTADA como decidida e FECHADA.** contracts/conector.ts:107-116 (`VERSAO_PISO_PEDIDOS`, `POLITICA_VERSAO_PADRAO_PEDIDOS`); domain/conector-versao.ts:117-131 (`politicaEfetiva`: linha do tenant manda; sem linha e recebe_pedidos → 1.2.1; `validarPisoParaPedidos`); api/autenticacao.ts:171 (426 pela efetiva; o sinal devolve a efetiva); api/bko-politica.ts:22 (GET com `origem: tenant | padrao_hub`) e :40-41 (PUT recusa 422 RN-INT-11 abaixo de 1.2.1 com Conector ativo que recebe pedidos). RN-INT-11 emendada no doc 03 (linha 134). Encerro o R-210419.
- **PR #24 (T-0027, fa837c4): revisão registrada SEM 🔴** no R-20261101-155028; os 3 🟡 e a decisão da sequência repetida estão no main (R-20261101-204436; conferi `LinhaErro.external_id .max(200)` em contracts/lote.ts:152, `RecusaTopologiaConector` com `detalhes`, `AuditoriaInativacao.inativadas` nullish e `superRefine` de sequência removido do RetornoErp). Critério "Revisão do PR #24 registrada sem 🔴" atendido.

### Achados
1. 🔴 **Consumidores A7 e A8 não existem** — modules/integracao/api/index.ts não registra `consumidores` (o manifest.ts:24 declara `consome: ['vendedor.pedido.status_alterado@1', 'integracao.lote.recebido@1']`). Efeito: (a) todo lote fica em `recebido` para sempre; o critério "Lote só com linhas inválidas termina 'concluído com erros' (RN-INT-01, P-1)" não é demonstrável (o teste de aceite só prova o 202, integracao-hub.banco.test.ts:105); (b) nenhuma sessão de carga completa fecha, então a criação da pendência de inativação e "registro inválido nunca é inativado" (RN-INT-06) só são provados no domain e com a pendência da fixture, não no fluxo; (c) nenhum pedido aprovado entra em `pedido_fila_erp` (A8; só a fixture põe pedido na fila), então GET /pedidos/pendentes nunca entrega pedido real. O desenho docs/desenho/T-0032.md §5 põe A7/A8 no escopo e §9 lista o critério. Dono: modulo-integracao (pendência (b) do R-20261101-205019, que ele mesmo registrou). **Para o gerente**: ou o modulo-integracao entrega A7+A8 com teste de banco (lote só de inválidas → `concluido_com_erros`; sessão completa → pendência; pedido aprovado → fila) antes de fechar, ou a T-0032 fecha com esses dois critérios movidos para uma tarefa nova da Sprint 2/3 (minha recomendação, pelo prazo de hoje: o resto do aceite está verde). Sem uma das duas, a T-0032 não fecha.
2. 🟡 **BKO mostra a política gravada, não a efetiva** — modules/integracao/api/bko-conectores.ts:51, :93, :151 e bko-monitor.ts:50 chamam `montarResumo(..., lerPolitica(...))`. Sem linha da empresa, um Conector 1.2.0 que recebe pedidos aparece com `situacao_versao` "ok" no BKO enquanto o Hub devolve 426 para ele. Ajuste: em `montarResumo` (bko-comum.ts:79) usar `politicaEfetiva(politica, c.recebe_pedidos)`; teste no bko com um Conector 1.2.0 recebe_pedidos sem linha → `abaixo_minima` (RN-INT-11).
3. 🟡 **Texto contradiz a decisão do piso** — docs/modulos/integracao/hub-api.md:312 ("A política ... a empresa grava versao_minima: 1.2.1 ... O valor não é fixo no código") e o cabeçalho de modules/integracao/api/bko-politica.ts:4-6 ("é gravada aqui (nada fixo no código...)"). O que vale (R-210419): padrão 1.2.1 no Hub para quem recebe pedidos, a linha da empresa manda, PUT recusa abaixo do piso, descer só por SQL. Ajustar os dois textos.
4. 🟡 **Doc da fixture ainda fala da mínima por linha** — mesmo hub-api.md:312 cita a fixture dois-tenants (1.1.0) como o motivo de o teste mandar 1.2.0; correto, mas acrescente que é a exceção "linha do tenant abaixo do piso, gravada por SQL" para ninguém "corrigir" a fixture. (Junto do 🟡 3.)
5. 🟢 bko-conectores.ts:51/:93/:151 e bko-monitor.ts:50 — `Promise.all` com duas consultas no MESMO cliente pg: o pg enfileira, mas as versões novas avisam "client.query() when the client is already executing a query is deprecated". Sequencial é mais simples.
6. 🟢 domain/sha256.test.ts:16 — o caso "Café ☕" só confere o formato. Um vetor conhecido com UTF-8 de vários bytes (comparar com `createHash('sha256')` no próprio teste, que pode usar node:crypto) fecha o risco de codificação.
7. 🟢 bko-conectores.ts:123 (PATCH) — ligar `recebe_pedidos` numa empresa com linha gravada abaixo de 1.2.1 é permitido (a linha manda, por decisão). Vale devolver um aviso na resposta/tela ("a política desta empresa está abaixo de 1.2.1") — sem bloquear.

### Plataforma (2e54ec8, meu)
Pipeline /integracao/v1 conforme ADR 0013 (429/413/401 genérico/403 modulo_inativo/400/426 antes do executar/requisicao_id/500/503), logger sem Authorization/X-Macuxi-*, usuario_id nulo na outbox/auditoria do Conector. Sem pendência minha.

## Pronto quando
🔴 1 resolvido por uma das duas vias (decisão do gerente); 🟡 2-4 no main com teste do 2 (pode ir junto do A7/A8 ou da tarefa nova); 🟢 feitos ou no backlog.
