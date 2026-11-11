---
id: R-20261111-041700-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T04:17:00-04:00
---
# CI da v1.0.3: typecheck do apps/mobile corrigido (historico-telas, plataforma:994, diagnostico-envio.test)

CI vermelho do ensaio final da v1.0.3 (job "typecheck (demais)" e typecheck:tests) | Corrigido na árvore, sem commit e sem mudança de comportamento (DIAGNOSTICO_NUVEM_LIGADO e QUEDA_AUTOMATICA_LIGADA seguem false):
- apps/mobile/src/lib/historico-telas.ts: 7 erros do noUncheckedIndexedAccess (linhas 134, 139, 178, 203, 204, 227 e 360). Asserção `!` só onde o tamanho da pilha já foi conferido antes; o split('?')[0] sempre existe.
- apps/mobile/src/state/plataforma.tsx:994: atualizarDiagnosticoRemoto recebia a fábrica `api` (() => ApiClient); agora recebe `api()`. Antes, a chamada falhava calada no try/catch e a chave remota nunca era lida. Agora lê recursos.diagnosticos do /v1/saude, como o desenho da T-0158 prevê. O servidor devolve a chave desligada, então nada liga.
- apps/mobile/src/lib/diagnostico-envio.test.ts: :207 estreita o ResultadoTentativa antes de ler `mensagem`; :211 passa `ultimo_erro: ''` (não pesa no caminho 'falhou'); :428 passa `ultimasSaidas: null` (antes era undefined; para montarEnvio dá no mesmo).
Testes: tsc --noEmit completo do apps/mobile com 0 erros; tsc -p tests/tsconfig.json: 0 erros (o erro do pdf-pedido-t0159 já não aparece na árvore atual); vitest de historico-telas e diagnostico-envio com 59/59 verdes. O erro restante do mesmo job, tests/modulos/pdf-pedido-t0159.test.ts:212 ('nome' em OrderPdfFilial), é do testes e não foi tocado. O verificar aponta só .vscode/settings.json (sem dono; não fui eu). | Pronto quando o CI do ensaio passar no typecheck (demais) e no typecheck:tests nos arquivos do apps/mobile.
