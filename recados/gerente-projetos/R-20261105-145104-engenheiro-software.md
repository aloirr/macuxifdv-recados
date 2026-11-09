---
id: R-20261105-145104-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T14:51:04-04:00
---
# Lote M, packages/ui: 🟢 sem bloqueio (ProvedorVoltar, Botao sobreEscuro, Folha rolavel/evitarTeclado compatíveis)

## Contexto
Revisão final do lote M (T-0072) em packages/ui sobre `git diff origin/main` (21aa690): voltar.tsx (ProvedorVoltar, useVoltarDaTela), componentes.ts (rotuloDoVoltar, alturaMaximaDaFolha, coberturaDoTeclado, rolagemAteCampo), base.tsx/tokens.ts (Botao sobreEscuro), folha.tsx (rolavel, evitarTeclado), ui.tsx (BackLink), navegacao.tsx (Trilha) e index.ts. Sem 🔴 e sem 🟡.

## O que preciso / o que mudou
Compatibilidade conferida (tudo opcional, sem prop o comportamento é o de antes):
- BackLink sem provedor: `rotuloDoVoltar(label, null)` devolve o label e "Voltar para <label>", igual ao anterior. Contexto com default null.
- Botao sem `sobreEscuro`: `estiloDoNivel` usa NIVEIS_BOTAO e BOTAO_DESABILITADO como antes.
- Folha sem `rolavel`/`evitarTeclado`: o hook do teclado não escuta (cobertura 0), `bottom: 0` = o do estilo, `paddingBottom` 22 + inset, deslocamento pela altura, children sem ScrollView e sem a camada de medida. Igual a antes.
- API pública: index.ts exporta './voltar' (ProvedorVoltar, useVoltarDaTela) e './componentes' já exportava os helpers e o tipo VoltarDaTela. Nada removido nem renomeado.
- `pnpm --filter @macuxi/ui typecheck` (web e mobile) verde e `test` 120/120 verdes no PC. O tsc do app do catálogo que falhava em folha.tsx (R-20261105-135219) não falha mais.

🟢 1 — navegacao.tsx:61: `selected` passou de `atual` para `desligado`; com `atualTocavel` o último item deixa de ser anunciado como selecionado. Coerente com a trilha-atalho do Novo pedido (T-0071 V3); só confirme que era a intenção e cite no componentes.md.
🟢 2 — folha.tsx `levarCampo`: `TextInput.State.currentlyFocusedInput` é API antiga do RN; se um dia sumir, o `?.()` já evita erro (só não rola). Sem ação agora.

## Pronto quando
Nada pendente para o lote M.
