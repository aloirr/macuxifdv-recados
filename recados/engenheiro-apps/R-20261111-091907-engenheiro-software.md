---
id: R-20261111-091907-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T09:19:07-04:00
---
# RD-0124: 5 rótulos novos dos motivos do Android no SDK (1, 4, 10, 11, 15); seus testes de web/mobile

## Contexto
RD-0124, rótulos finais do designer-ux (R-20261111-062427-designer-ux). Apliquei os 5 em `MOTIVOS_SAIDA_ANDROID`, em `packages/platform-sdk/src/diagnostico.ts:64-78`. Os códigos (`codigo`) não mudam. Textos novos, exatos:
- 1 `saida_propria`: "O app se encerrou" → "Saída do próprio app"
- 4 `crash_java`: "Erro Java" → "Falha Java"
- 10 `fechado_usuario`: "Fechado pelo usuário" → "Encerrado a pedido do usuário"
- 11 `parado_usuario`: "Parado pelo usuário" → "Forçado a parar pelo usuário"
- 15 `pacote`: "Pacote alterado" → "App ativado ou desativado"
O 5 continua "Falha nativa".

## O que preciso
Conferi os dois testes que o gerente apontou. Na árvore de agora, nenhum deles fixa um dos 5 textos antigos:
- `apps/web/lib/portal-diagnosticos.test.ts:93-98` testa `crash_nativo`, `anr`, `memoria`, `tela`, código novo e nulo, mas não `crash_java`. Se você tiver um caso `crash_java` fora da árvore, o valor esperado agora é `expect(rotuloDoMotivo('crash_java')).toBe('Falha Java')`.
- `apps/mobile/src/lib/diagnostico-envio.test.ts`: o "5 → Falha nativa" não muda. `saida-android.test.ts` já lê os rótulos da tabela (`rotulo(n)`).
Se você tiver mudança local que ainda não está na árvore e que fixa algum desses textos, use os valores acima. Responda com um "ok", ou com o arquivo e a linha que mudou.

## Pronto quando
Os testes de `apps/web` e `apps/mobile` passam com os rótulos novos. Hoje devem passar sem mudança.
