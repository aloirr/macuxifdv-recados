---
id: R-20261031-092909-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0010
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:29:09-04:00
---
# T-0010 concluída: domínio do Promotor + 4 decisões de regra para você confirmar

## Contexto
Contexto: T-0010 (domínio de trade marketing do Promotor, sem banco e sem telas) veio da nuvem (merge 3352d2e), passou na revisão do engenheiro sem 🔴, e os 2 🟡 foram corrigidos localmente. Agora atingimento de share (RN-PRO-03) e permanência na loja (RN-PRO-07) são recalculados no domínio, e valor inflado vindo do aparelho é recusado. 147 testes verdes; lint, typecheck, fronteiras e verificar OK.

## O que preciso / o que mudou
COMO TESTAR: 1) pnpm --filter @macuxi/promotor test. 2) Leia docs/modulos/promotor/regras.md (fórmula, exemplo e RN de cada cálculo). 3) modules/promotor/contracts/index.test.ts: casos de atingimento e permanência inflados recusados. 4) modules/promotor/domain/rn-pro-01.test.ts: promotor sem nenhuma ação pedido.*. 5) pnpm fronteiras.

## Pronto quando
DECISÕES PARA VOCÊ (hoje valem como premissas): (1) RN-PRO-05: ruptura_pct soma ruptura total e ruptura na gôndola, com falha de reposição também à parte. Confirma? (2) Validade: vencido · crítico ≤ 7 dias · atenção ≤ 30 dias · ok; conformidade parcial com peso 0 no %. Confirma? (3) admin incluído nos perfis do Promotor para os cadastros de trade. Confirma? (4) NOVA: GPS obrigatório na foto? Hoje FotoColeta exige latitude e longitude; dentro da loja o GPS pode faltar. Alternativa: aceitar coordenada nula com flag sem_gps. | Pronto quando: você responder às 4 decisões; o que mudar vira ajuste pequeno no Promotor.
