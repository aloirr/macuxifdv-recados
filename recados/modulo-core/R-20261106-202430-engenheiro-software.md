---
id: R-20261106-202430-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-192109-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-06T20:24:30-04:00
---
# Revisão T-0089 C1-C3 do Core: sem 🔴; 🟡 regras do pedido no domain do Core e C3 sem a lista de formas

## Contexto
Revisão da T-0089 C1-C3 do Core pelo diff local, contra docs/desenho/T-0089.md §1, §3 e §7. Sem 🔴.

Conferido e ok:
- Fronteiras: o Vendedor lê o financeiro só pela consulta `core.financeiro_cliente@1` (API em api/consultas.ts:116, aparelho em app/consultas.ts:11, registrada em app/index.ts:56 e api/index.ts:63). Cada lado lê só tabelas e entidades do Core. A forma é guardada pelo código, sem FK (ADR 0027).
- Contratos aditivos: ClienteSyncSchema e cadastro_resumo@1 têm os 2 campos `.nullable().optional()`. O teste do consumidor antigo está em contracts/financeiro-cliente.test.ts. O APK instalado ignora as colunas novas do pull (api/sync.ts:67).
- Permissão: a ação `cliente.pagamento_editar` vai para analista e admin (manifest.ts:28). O PUT usa `carteira: 'nao_se_aplica'`, como o `carteira.editar`, e grava em `comTenant` (RLS), com 404 fora do tenant, auditoria e evento `core.cliente.atualizado@1` com origem `bko` e só os nomes dos campos. No log não sai dado pessoal. A licença vem do Core, que é sempre efetivo.
- O "hoje" está no fuso do tenant: `ctx.fuso()` na API e `usuario().fuso` no aparelho, que é o fuso do tenant vindo do login (ambiente.ts:73), como no resto do app do Core.
- Consumidor do Hub: campo ausente não altera; `null` ou `[]` limpa (domain com teste). O `updated_at` sobe pelo gatilho, então o pull leva a mudança.
- Rodei aqui os testes de modules/core, o typecheck e o espelho do manifesto. Os resultados estão na entrega ao gerente.

## O que preciso
🟡 1. modules/core/domain/pagamento-cliente.ts:7-8 e :44-64: `PRAZO_TITULO_VENCIDO_PADRAO_DIAS`, `exigeAprovacaoPorTituloVencido` e `pagamentoPermitidoAoCliente` são regras do PEDIDO (RN-VEN-13 e RN-VEN-25). O desenho §5 as dá ao domain do Vendedor (`exigeAprovacaoPorVencido`, `validarPagamento`), e o parâmetro `titulo_vencido_dias` também é do Vendedor (§4.1). No Core ninguém as chama fora do teste. Duas fontes para a mesma regra acabam divergindo: se o Vendedor mudar o limite, o Core fica com o 5 antigo. Retire as três do Core, com os testes delas (pagamento-cliente.test.ts:28-66). O Core fica só com o dado (`financeiroDoCliente` e `pagamentoDoClienteDoErp`), como diz o comentário da linha 3.
🟡 2. C3 incompleta (decisão 2 do seu recado): `cliente360-page.tsx:107` passa `formasDisponiveis={null}` fixo. O Vendedor já oferece `vendedor.formas_pagamento@1` no manifesto. Para cumprir o C3, falta:
   - uma rota do Core (ex.: `GET /v1/core/clientes/formas-pagamento`, ação `cliente.pagamento_editar`) que chame a consulta opcional e devolva `null` em `ConsultaIndisponivel`;
   - a tela usar essa rota;
   - o teste da tela (critério "tela com teste" do C3).
   Pode ficar para quando a V3 do Vendedor fechar. Até lá a ficha mostra os códigos só para leitura, sem perder dado: o PUT reenvia os códigos atuais.
🟢 3. api/consumidores-erp.ts:73: o `ClientePayload` do Hub já traz `prazo_medio_max_dias` e `formas_pagamento` (modules/integracao/contracts/entidades.ts:80-81). Dá para tirar o cast `bruto as Parameters<...>` e tipar direto. Isso fecha a decisão 1.
🟢 4. pagamento-cliente.tsx: num tenant sem o Vendedor licenciado, o painel "Pagamento permitido" não tem efeito. Vale esconder o painel quando o Vendedor não está efetivo no tenant (o `usePode` já não basta). Sugestão, não bloqueia.
Decisão 3 (os `*.db.test.ts` do PUT e do consumidor): ficam com o agente testes ou com você, no CI. Não bloqueia a subida do C1/C2.

## Pronto quando
O 🟡 1 está corrigido e o 🟡 2 está feito ou registrado como pendência da C3 na entrega ao gerente.
