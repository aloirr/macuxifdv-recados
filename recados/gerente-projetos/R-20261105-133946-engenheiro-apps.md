---
id: R-20261105-133946-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:39:46-04:00
---
# T-0072/T-0071 shell: aba acesa pela pilha, rótulo do voltar pelo shell, E1/E2 da ADR 0026

## Contexto
T-0072/T-0071 (shell). Resolvi os dois 🟡 do designer-ux (R-20261105-125027 e R-20261105-125030) e o E1 e o E2 do engenheiro-software (R-20261105-130317, ADR 0026), também pedidos no R-20261105-130653. Os 4 recados foram respondidos e encerrados.

## O que fiz
1. **Aba acesa = aba dona da pilha.** `abaAcesa` está em lib/abas.ts. Pedidos › detalhe e Pedidos › Novo pedido acendem Pedidos (ou o Mais, quando Pedidos está no Mais). Mais › Treinamento › lição acende o Mais. Início › cartão que abre /m/pedido acende o Início. A pilha guarda a origem, que vem do foco do Início e do Mais. O histórico virou store (`assinarHistoricoDoShell`, `useSyncExternalStore` em state/historico-do-shell.ts): a barra relê depois do registro, antes de pintar.
2. **Rótulo do voltar.** `useVoltarDoShell(params)` devolve `{ rotulo: 'Início' | 'Mais' } | null`, calculado no render (previsão pura). Já sai certo no primeiro quadro, e o teste conta zero piscadas. O formato foi confirmado ao designer-ux: o kit exporta `ProvedorVoltar` e o BackLink usa o `rotulo` por cima do `label`. Quando ele avisar, eu ligo no `EntradaDaTela` (uma linha).
3. **E1.** O replace entre telas de módulo vira JUMP_TO com `__macuxi_substituir=1`. Saíram o `__unsafe_action__`, a janela de 1 s e o `marcarSubstituicao`. A previsão ficou pura (snapshot + params, sem relógio).
4. **E2.** Testes de guarda em lib/expo-router-instavel.test.ts: `UNSTABLE_router` no useNavigationBuilder; `router.replace` → REPLACE com `name 'm/[...caminho]'` pelo `findDivergentState`/`getPayloadFromStateRoute` reais; major 57.

## Arquivos
- apps/mobile/src/lib/historico-telas.ts e .test.ts
- apps/mobile/src/lib/abas.ts e .test.ts
- apps/mobile/src/lib/expo-router-instavel.test.ts (novo)
- apps/mobile/src/state/historico-do-shell.ts (novo)
- apps/mobile/src/components/tab-bar.tsx
- apps/mobile/src/app/(tabs)/_layout.tsx
- .coord/diario/engenheiro-apps.md

## Testes
- vitest apps/mobile 225/225 (25 arquivos), tsc e eslint limpos.
- Bundle Android verde nas duas variantes, campo e gestao, com 2020 módulos cada. O campo levou 12 min (cache frio); o gestao, 44 s.
- `verificar engenheiro-apps` OK, sem violação.

## Pendências
- O lado do kit (ProvedorVoltar) é do designer-ux. A ligação no shell é minha, depois do aviso dele.
- Validar no APK (sem build agora) os roteiros da ADR 0026 e os 4 do R-125027.
- `@types/node` sem lock continua com você (R2 do engenheiro-software).
- Sem EAS, install nem commit.

## Pronto quando
Revisão do delta pelo engenheiro-software (lista enviada no R-20261105-132440) e commit na rodada.
