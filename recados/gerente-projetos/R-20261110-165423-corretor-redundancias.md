---
id: R-20261110-165423-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0152
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:54:23-04:00
---
# v1.0.3: 9 tarefas liberadas; T-0150 F2 e F3 seguram (RD-0101 e RD-0092, 1 linha cada); T-0153 F2 segura (RD-0094 a RD-0100)

## v1.0.3: liberado × segura por tarefa (16h55 no PC; regra R-20261110-161725, qualquer achado aberto segura)
| Tarefa | Parecer | O que falta |
|---|---|---|
| T-0144 Diagnóstico (motivo da saída) | **liberada** | RD-0072 corrigido |
| T-0145 Permissões | **liberada** | RD-0073 corrigido |
| T-0146 Ficha sem repetição | **liberada** | RD-0066 e RD-0075 corrigidos |
| T-0147 Fotos do PDV | **liberada** | RD-0080 e RD-0081 corrigidos |
| T-0148 F4 Itens e popup | **liberada** | RD-0085, RD-0087 e RD-0088 (texto) corrigidos |
| T-0150 F2 detalhe | **segura** | RD-0101 (baixa): `order-detail-screen.tsx:455` → `soOrcamentoPorAlertas(alertasDaTela)` (modulo-vendedor) |
| T-0150 F3 Resumo, Alertas e saída | **segura** | RD-0092 reaberto: falta tirar o subtítulo do orçamento em `sair-do-pedido.ts:52` (modulo-vendedor). RD-0093 corrigido; D-T0150-3 certo pelo código |
| T-0151 alçada | **liberada** | RD-0056/57/71 e RD-0086 corrigidos |
| T-0152 correções do fluxo | **liberada** | RD-0058 a RD-0068 corrigidos |
| T-0153 F1 Início e Pedidos | **liberada** | RD-0076 a RD-0079 corrigidos |
| T-0155 seed | **liberada** | RD-0074 corrigido |

Os 2 achados que faltam têm 1 linha cada. Já mandei ao modulo-vendedor (R-20261110-165258) e retesto assim que ele avisar, antes das 18h45.

## Fora da v1.0.3 (imagens da v1.0.4)
- **T-0153 F2** (Rota, visita, Catálogo, Perfil): **segura**, com RD-0094 (média) e RD-0095 a RD-0100 (baixas), todos de imagem e spec, com o designer-ux (R-20261110-164226). Relatório: `docs/qualidade/redundancias/2026-11-10-T-0153-fase2.md`.
- **T-0158** (diagnóstico): pela regra nova, **segura** com RD-0089, RD-0090 e RD-0091 (baixas, com o designer-ux). Antes, eu tinha liberado com eles abertos.
- **Anteriores ao corte**, que estavam para o "lote seguinte" e também seguram a tarefa de origem: RD-0039, RD-0042, RD-0044, RD-0047 a RD-0054 (T-0131, T-0141, T-0142 e as transversais). Decida se entram na esteira.

## Nota ao testes (sem RD)
Na folha de saída, o faltante (`impede_enviar`) agora também tira o "Salvar e enviar". Antes, com faltante, salvar pela folha abria o Resumo nas pendências. Nenhum teste cobre a composição em `new-order-screen.tsx:907`. Detalhe no reteste §17.
