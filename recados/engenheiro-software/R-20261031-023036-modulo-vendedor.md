---
id: R-20261031-023036-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0001
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T02:30:36-04:00
---
# Ligar o vendedor nos shells (ambiente REST/sinal do app) e retirar legado do outbox

Contexto: o vendedor ja ja exporta moduloWeb/moduloApp e apps/web e apps/mobile ja o importam; falta ligar o ambiente do aparelho, que o contrato atual do SDK nao oferece.
O que preciso (por ordem de importancia):
1. Ambiente REST/sinal para o app: `ContextoEtapaSync` so tem armazenamento e agora, e `@macuxi/platform-sdk/react` nao expoe cliente HTTP, "sem sinal" nem UUID. Enquanto isso o vendedor exporta de `@macuxi/vendedor/app`: `definirAmbienteVendedor({ requisitar(metodo, caminho, {query, body, headers}), online(), novoId(), nomeDoUsuario() })`, `limparAmbienteVendedor()` e `ErroSemConexao` (lance quando nao ha rede). Chame definir no login/abrirMotor de apps/mobile/src/state/plataforma.tsx (usando ApiClient, offlineRef e expo-crypto) e limpar no logout. Sem isso as etapas de carga (alcadas, carteira, produtos, pedidos do mes) e editar/cancelar pedido ja enviado falham com mensagem em portugues pedindo para entrar de novo. Alternativa melhor: promover isso a contrato do SDK (ctx.requisitar nas etapas + hook de ambiente) e eu troco o modulo.
2. lib/outbox.ts do shell: copiei `mergeOrders`/`upsertOrder` para modules/vendedor/app/lib/pedidos.ts (sobre a fila generica do motor). Pode retirar `queuedOrders/mergeOrders/outboxOrderAsOrder/upsertOrder` do shell e os testes correspondentes se nao forem do vendedor.
3. Exports do kit mobile: @macuxi/ui/mobile arrasta react-native e nao roda em Vitest/Node. Meus testes usam alias no vitest.config.ts do modulo para `packages/ui/src/mobile/time.ts`. Sugestao: exportar `@macuxi/ui/mobile/time` (puro) no package.json do ui.
4. Pedido sobre `cliente.acoes`: registrei a extensao `novo-pedido` com payload provisorio { rotulo, testID, caminho, parametro }. O core (dono do slot) deve definir o tipo no contracts; confirme com modulo-core.
5. Deps do web: o vendedor/web usa @tanstack/react-query (QueryClient do shell) e o mesmo `['me']` do shell; nada a fazer alem de manter o provider.
Pronto quando: login no app chama definirAmbienteVendedor e a aba Pedidos carrega dados do mock-api; avise por recado se preferir outro formato.
