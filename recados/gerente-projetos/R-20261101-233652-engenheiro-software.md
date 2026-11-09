---
id: R-20261101-233652-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0025
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:36:52+00:00
---
# Revisão final T-0025: 1🔴 (hash 16 hex × CHECK de 64 no registro_atual), 3🟡, 4🟢

Revisão final da T-0025 (Hub /integracao/v1: c77278f, T-0031 697ab42 e a parte de domain/contracts da T-0027 fa837c4), feita no main em fa6d5fa. Encerre com --responde-a e --encerra quando tratar os itens; o 🔴 bloqueia a tarefa de implementação do consumidor A7.

Resultado: 1🔴 3🟡 4🟢 — testes 327 verdes (24 arquivos), typecheck e lint verdes em modules/integracao

1. 🔴 modules/integracao/domain/idempotencia.ts:41-49 (+ desenho.md:110) × db/migrations/0010_integracao.up.sql:407 — hashRegistro gera 16 hex (FNV-1a 2×32), mas registro_atual_hash_formato exige '^[0-9a-f]{64}$': todo upsert do consumidor A7 vai falhar com 23514 — escolher UM formato: (a) preferido: domain passa a SHA-256 hex (64) do jsonCanonico (implementação pura ou injetada pela API com node:crypto), o que também resolve o 🟢 6; ou (b) banco-dados afrouxa o CHECK em migração nova; desenho.md, docs/banco/integracao.md e um teste de contrato (hash do domain casa com o CHECK) alinhados (RN-INT-02).
2. 🟡 modules/integracao/domain/sessao.ts:99-103 — calcularInativacao usa o MESMO conjunto ativosNoMacuxi como candidatos e como denominador dos 30%; o desenho pede candidatos = ativos elegíveis (visto_em < início da sessão, filtrarAtivosElegiveis) e denominador = total de ativos (hub-api.md §17b, total_ativos). Passando elegíveis o % infla; passando todos, inativa o que chegou pelo delta durante a carga — separar em `elegiveis` e `totalAtivos` (ou receber AtivoVisto[] + iniciadaEm e filtrar dentro), com teste (RN-INT-06).
3. 🟡 modules/integracao/domain/pedido-fila.ts:119 — pedido pendente ainda não entregue, editado e reaprovado com condição sem de-para devolve `reter`, mas o payload antigo continua na fila e sai no próximo GET /pedidos/pendentes com o conteúdo velho — `reter` com vivo não entregue deve sinalizar substituir por retido (payload nulo + retencao_codigo), com teste (RN-INT-08).
4. 🟡 modules/integracao/domain/pedido-fila.ts:30-45 e 110/120 — PedidoNaFila não modela retido (payload é não nulo no tipo, mas o banco grava payload nulo + retencao_codigo, 0010:657) nem distingue `criar` de reativar: pedido removido (removido_em) e reaprovado volta `criar`, e o insert bate em pedido_fila_erp_pedido_uk (unique total) — adicionar `retencao_codigo`/payload nullable ao tipo, filtrar retidos em selecionarPendentes e devolver `acao: 'reativar'` (update que limpa deleted_at), com teste (RN-INT-08).
5. 🟢 modules/integracao/domain/sessao.ts:90-106 × domain/erros.ts:151-160 — parte da carga completa com TODAS as linhas em referencia_ausente termina `falhou`, e `falhou` não conta como concluída (sessao.ts:34): a sessão só fecha se o reprocessamento regravar o estado da parte — deixar explícito no domain (registrarParte após reprocessar) e no hub-api.md §7/§10 que o reprocessamento atualiza o estado da parte, com teste (RN-INT-03/06).
6. 🟢 domain/idempotencia.ts:29-49 — as duas FNV-1a de 32 bits com sementes diferentes são correlacionadas (não dão 64 bits independentes); colisão = atualização perdida em silêncio (inalterada). SHA-256 resolve junto com o 🔴 1.
7. 🟢 domain/topologia.ts:49 — trocar a entidade de Conector (desativa A, B assume) deixa os registros de A em registro_atual.conector_id=A: a inativação e a reconciliação de B (por Conector) nunca os veem — documentar a migração de entidade entre Conectores (backlog) ou fazer o upsert assumir o conector_id.
8. 🟢 contracts/pedido.ts:100-105 — sequência repetida em itens_faturados recusa o retorno inteiro (Zod) enquanto o P-4 aceita o retorno sem os itens inválidos; ok como validação de envelope, mas citar no hub-api.md §11.3 que esse é o único caso de item que derruba o retorno.

Dono diferente:
- banco-dados — 🔴 1 se a opção for (b): db/migrations/0010_integracao.up.sql:407 (CHECK do hash); em qualquer opção, docs/banco/integracao.md com o formato final. 🟡 4: confirmar que a reativação do pedido removido é UPDATE (unique total em 0010:653).
- Fora deste escopo (T-0023): apps/conector/src/sincronizador.ts:196-198 — carga completa cuja última página não tem linha enviável não fecha a sessão (só log `sessao_nao_fechada`).

Pontos positivos: domain puro e bem coberto (toda suíte cita RN/P), relógio sempre injetado (sem Date.now), guarda monotônica (obsoletas) correta conforme o 🔴 do banco, tenant só da credencial, recusa 401 genérica, P-3 com auditoria e tabela de permissões testada contra o manifesto, fronteiras limpas (só zod, platform-sdk e ../contracts).

Pronto quando: o 🔴 1 for corrigido (opção a no domain, ou opção b combinada com o banco-dados pelo recado paralelo), os 🟡 2 a 4 tiverem teste citando a RN e os 🟢 estiverem feitos ou no backlog.
