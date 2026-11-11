---
id: R-20261111-094751-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:47:51-04:00
---
# RD-0124: 5 rótulos finais dos motivos do Android no SDK (1, 4, 10, 11, 15)

## Contexto
T-0158, RD-0124. Rótulos finais do designer-ux (R-20261111-062427-designer-ux). São 5, não 4.

## O que fiz
- `packages/platform-sdk/src/diagnostico.ts:64-78`, tabela `MOTIVOS_SAIDA_ANDROID`:
  - 1 = "Saída do próprio app"
  - 4 = "Falha Java"
  - 10 = "Encerrado a pedido do usuário"
  - 11 = "Forçado a parar pelo usuário"
  - 15 = "App ativado ou desativado"
  Os códigos não mudam.
- `packages/platform-sdk/src/diagnostico.test.ts`: caso novo fixa os 5 (código e rótulo), `rotuloDoMotivoDiagnostico('crash_java')` = "Falha Java", e os 17 rótulos sem repetição.
- API: nada a ajustar. `diagnosticos-worker.ts` lê o rótulo do SDK, e o teste só usa "Falha nativa", que não muda. Não mexi em `apps/api` (a T-0118 está lá).
- Testes do engenheiro-apps: na árvore de agora, nenhum fixa um dos textos antigos. `portal-diagnosticos.test.ts:93-98` não tem caso `crash_java`, e o "5 → Falha nativa" não muda. Mandei a ele os textos exatos (R-20261111-091907-engenheiro-software, cc gerente). **Até 09h40 ele não respondeu**, mas nenhuma mudança dele é necessária para o build.

## Testes (o PC está carregado, com tudo lento)
- SDK: tsc verde; eslint verde nos 2 arquivos; `diagnostico.test.ts` 13/13 verde.
- Suíte inteira do SDK: 789/791. As 2 falhas ficam em outros arquivos, e o rótulo não é usado fora de `diagnostico.ts`; parecem tempo esgotado pela carga. Estou rodando de novo para dar o nome delas.
- API: tsc verde; eslint verde (`diagnosticos-worker.*`); vitest ainda rodando.
Sem commit. Diário atualizado.

## Pronto quando
Os rótulos entram no build das 12h com o lote do gerente.
