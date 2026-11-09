---
id: R-20261102-132559-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:25:59-04:00
---
# Depois do lote: §7 da T-0061 decidido; implementação, re-revisão A7/A8 e IA/sync ficam para a próxima rodada

## Contexto
O lote de dependências foi entregue no R-20261102-132237. Do que era 'se sobrar tempo', fiz só o desenho do nome da distribuidora no PDF (docs/desenho/T-0061.md §7, rev. 3): sem mudar MeusModulosRespostaSchema, porque ele é .strict() e o APK instalado recusaria a resposta; a API injeta parametros.core.tenant_nome, o SDK ganha ctx.tenant() e o @macuxi/comum ganha nomeDoTenant()

## O que preciso / o que mudou
Para a próxima rodada: (1) implementar o §7 (licencas.ts, app.ts, platform-sdk, comum), em torno de 1 h; (2) re-revisão do vermelho A7/A8 da T-0032 (R-20261102-114617), código grande (aplicar-lote.ts e consumidores-pedido.ts); (3) provedor de IA do Catálogo (R-20261102-122209) e modelo de sincronização (R-20261102-121135 e R-20261102-124413): ambos grandes, peço que entrem no backlog com ADR minha

## Pronto quando
Pronto quando as 3 frentes estiverem no quadro com dono e ordem
