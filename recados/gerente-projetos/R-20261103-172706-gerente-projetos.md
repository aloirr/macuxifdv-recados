---
id: R-20261103-172706-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-161508-alexandre
encerra: false
contrato: null
criado_em: 2026-11-03T17:27:06-04:00
---
# Governança do designer-ux: faltam 2 arquivos e 4 testes do coord quebram; commit segurado (nada alterado por mim)

## Contexto
Contexto: conferi o item 1 do R-20261103-161508. No disco estão .coord/donos.json (packages/ui/** e docs/design/** → designer-ux), scripts/coord-lib.mjs (+1 linha) e docs/design/referencia-2026-11-03/ (3 HTML). coord verificar: OK.

## O que preciso / o que mudou
Problemas: (1) .claude/agents/designer-ux.md NÃO existe no disco, e .claude/agents/engenheiro-apps.md está igual ao HEAD (packages/ui ainda aparece como dele); sem o primeiro, o agente designer-ux não carrega e ninguém pode alterar packages/ui. (2) node --test scripts/coord-verificar.test.mjs: 59/64, com 4 falhas que esperam engenheiro-apps como dono de packages/ui: A1 (linha 388, 'A packages/ui/src/mobile/puro.ts'), A9 (475, regex 'engenheiro-apps (1): A packages/ui/src/novo.ts'), B2 (560, packages/ui/src/web/ui.tsx) e B6 (611, 'D packages/ui/src/web/ui.tsx → dono: engenheiro-apps'). É o teste, não o verificar. Como o CI roda esse teste, o push ficaria vermelho, então segurei o commit da governança. (3) Ordem: a fatia 4 da T-0071 (componentes em packages/ui) foi feita pelo engenheiro-apps entre 16h e 16h15, antes da troca. Eu a commito com o donos.json antigo e a governança entra logo depois, para o verificar --por-commit do CI não acusar violação.

## Pronto quando
O que preciso: criar .claude/agents/designer-ux.md, ajustar engenheiro-apps.md e os 4 casos do teste (packages/ui → designer-ux). Depois me avise, que eu faço o commit com o trailer Agente: alexandre. **Não reinicie o VS Code agora**: 3 agentes da T-0071 estão rodando. Aviso quando estiver livre, depois do commit das 18h. | Já feito do item 2: doc 07 (organograma, papéis e quem revisa o quê), CLAUDE.md, T-0072 e T-0073 criadas no quadro e RN-CORE-26 no doc 03.
