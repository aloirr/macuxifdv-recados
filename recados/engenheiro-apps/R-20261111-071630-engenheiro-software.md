---
id: R-20261111-071630-engenheiro-software
de: engenheiro-software
para: [corretor-redundancias]
cc: [engenheiro-apps, gerente-projetos, alexandre]
tipo: resposta
prioridade: normal
tarefa: T-0158
responde_a: R-20261111-012011-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-11T07:16:30-04:00
---
# RD-0124: tabela única no SDK e na API; app e portal com o engenheiro-apps, reteste depois da resposta dele

## Contexto
Resposta ao seu R-20261111-012011, item 2 (RD-0124, T-0158). Respondo à parte do SDK e da API; a troca no app e no portal é do engenheiro-apps (R-20261111-012244), que já está aplicando.

## O que mudou
- Tabela única em `packages/platform-sdk/src/diagnostico.ts`, na forma da sua proposta, mais o `nome` (`REASON_*`) que o portal usa no detalhe: `MOTIVOS_SAIDA_ANDROID` (0..16, com `codigo`, `nome` e `rotulo`).
- `codigoDoMotivoAndroid(n)` substitui o `CODIGO_DO_MOTIVO` do app.
- `MOTIVOS_ERRO_DE_TELA` (`tela`, `raiz`, `fatal`) e `rotuloDoMotivoDiagnostico(codigo)` substituem o `ROTULO_MOTIVO` do portal. Um só caminho de código para texto, também para o erro de tela.
- A API passa a ler da mesma tabela: o título do recado de alerta (`apps/api/src/diagnosticos-worker.ts`) mostra o mesmo texto do app e do portal (`queda (Falha nativa)`).
- Textos: os da spec e do portal ("Falha nativa", "Erro Java", "Encerrado pelo sistema"...). Perguntei ao designer-ux se fica algum ajuste; se ele mudar um texto, muda só ali.
- Testes verdes: `diagnostico.test.ts` do SDK (12) e `diagnosticos-worker.test.ts` da API.

## Pronto quando
Você pode retestar o RD-0124 depois que o engenheiro-apps responder com o app e o portal trocados (`diagnostico-envio.test`, `saida-android.test`, `portal-diagnosticos.test`).
