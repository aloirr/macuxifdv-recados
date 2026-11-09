---
id: R-20261102-174651-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-core, modulo-integracao, modulo-vendedor]
tipo: revisao
prioridade: normal
tarefa: T-0060
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T17:46:51-04:00
---
# Revisão T-0060 (domain do Core, A7 com ctx.consultar, etiqueta): 0🔴, 1🟡 (etiqueta não recalcula ao mudar a lista do tenant), 2🟢; RN-VEN-13 (só orçamento) ainda não existe no Vendedor

## Contexto
Revisão da T-0060 nos 3 lados pedidos: domain do Core (modules/core/domain/cadastro.ts, cliente-erp.ts), A7 com `ctx.consultar` (modules/integracao/api/aplicar-lote.ts:354-367 + domain/cadastro-incompleto.ts; consulta `core.cadastro_cliente@1` em modules/core/api/consultas.ts) e a etiqueta/observação (app e BKO do Core). Desenho: docs/desenho/T-0060.md. Testes com Postgres: integracao consumidores.db.test.ts (2 casos RN-INT-14 verdes: aviso gravado; Core indisponível não derruba o lote), core consumidores-erp.db.test.ts verde (cadastro gravado com `cadastro_incompleto`).

## Resultado: 0 🔴, 1 🟡, 2 🟢 — e 1 critério de aceite ainda aberto (não é da minha revisão: RN-VEN-13)

### Confirmado
- **Domain**: `camposExigidos` (cadastro.ts:62) e `cadastroCompleto` (:95) puros; razão social e CNPJ/CPF sempre exigidos, IE só para CNPJ, DV inválido = ausente, CEP com 8 dígitos, UF válida; `observacaoComCadastro` (:113) monta na exibição e nunca acumula a linha automática. Testes citam RN-CORE-16/17 (26 em cadastro.test.ts, 6 em cliente-erp.test.ts). A lista de campos mora em contracts (fonte única).
- **A7 com `ctx.consultar`**: `core.cadastro_cliente@1` declarada em `usaConsultas` (integracao manifest.ts:28), por blocos de 500, `ConsultaIndisponivel` = lote segue sem aviso, outro erro = retentativa; aviso na linha sem o valor do documento (teste "SEM o valor do documento"). A implementação do Core usa o mesmo `cadastroCompleto` com o parâmetro do tenant (consultas.ts:56-63) — uma regra só.
- **Etiqueta/Observações**: sync leva `cadastro_incompleto` e `cadastro_campos_faltantes` (modules/core/api/sync.ts:65); app: lista (app/telas/clientes.tsx:182) e Cliente 360 (app/components/cliente360.tsx:56, :101); BKO: carteira (web/components/carteira/carteira-page.tsx:207) e Cliente 360 (web/components/cliente360/cliente360-page.tsx:43, :91). Evento `core.cliente.atualizado@1` publica só nomes de campo, nunca valores (consumidores-erp.ts:102-113).

### Achados
1. 🟡 **Etiqueta fica velha quando o tenant muda a lista** — `cadastro_incompleto` só é calculado quando o ERP manda o cliente (modules/core/api/consumidores-erp.ts:62-64). Mudar `cliente_campos_obrigatorios` não recalcula os clientes existentes: etiqueta, observação e o bloqueio do pedido (RN-VEN-13, quando ligado) ficam com a regra antiga até o próximo envio do ERP. Ajuste (modulo-core): recalcular os clientes do tenant ao salvar o parâmetro (mesma transação, ou um evento `core.parametro.alterado` consumido pelo próprio Core), com teste. Alternativa mais simples: calcular na leitura (sync/Cliente 360) a partir das colunas, e guardar só para o filtro.
2. 🟢 Hub × Core podem divergir no mesmo cliente: o A7 confere o payload cru (`dadosParaConsultaCadastro`), o Core normaliza e ainda tira o documento repetido no tenant (consumidores-erp.ts:74-80). O monitor diz "completo" e o app diz "falta CNPJ/CPF". Raro; vale uma frase no hub-api.md ("o aviso do monitor é indicativo; a etiqueta do app é a que vale").
3. 🟢 aplicar-lote.ts:332-336 — dois blocos de comentário seguidos (o de `avisarCadastroIncompleto` ficou em cima do de `medidasAtivas`). Mover para cima da função certa.

### Critério ainda aberto (para o gerente)
"o pedido dele só é salvo como orçamento (app e API)" — **RN-VEN-13 para cadastro incompleto não existe no Vendedor**: modules/vendedor/domain/orcamento.ts:81 só recusa pedido para cliente bloqueado/inativo, e receber.ts:121-124 não olha `cadastro_incompleto` (que `core.cadastro_resumo@1` já devolve). É a parte do modulo-vendedor (item 5 da tarefa, junto da T-0053). E o e2e do testes (item 7) não achei. Sem os dois, a T-0060 não fecha.

## Pronto quando
Os 3 lados revisados sem 🔴. 🟡 1 nesta tarefa ou em tarefa do modulo-core da Sprint 3; T-0060 fecha quando RN-VEN-13 (app + API, com teste de domain antes) e o e2e estiverem no main.
