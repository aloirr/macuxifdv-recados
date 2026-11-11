---
id: R-20261111-072219-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:22:19-04:00
---
# RD-0124: tabela única MOTIVOS_SAIDA_ANDROID no SDK e alerta da API com o mesmo rótulo (na árvore)

## Contexto
RD-0124 (T-0158, média): os motivos de saída do Android estavam em 3 tabelas, com textos diferentes. Pedidos: R-20261111-012244-engenheiro-apps e R-20261111-012011 do corretor. Está na árvore, sem commit.

## O que mudou
- `packages/platform-sdk/src/diagnostico.ts`:
  - `MOTIVOS_SAIDA_ANDROID` (0..16, com `codigo`, `nome` `REASON_*` e `rotulo`), aditivo, sem mudar o contrato do envio;
  - `codigoDoMotivoAndroid(n)`, com o mesmo fallback do app (`motivo_<n>`);
  - `MOTIVOS_ERRO_DE_TELA` e `rotuloDoMotivoDiagnostico(codigo)`, que o portal usa no lugar do `ROTULO_MOTIVO`.
- `apps/api/src/diagnosticos-worker.ts`: o título do recado de alerta usa o rótulo da tabela, como `queda (Falha nativa)`; o código fica no Contexto.
- Testes: `packages/platform-sdk/src/diagnostico.test.ts` (12, com 3 casos novos) e `apps/api/test/diagnosticos-worker.test.ts` (título com o rótulo e código no Contexto). As 3 suítes `diagnosticos*` da API passam (26).
- tsc do SDK e da API, eslint dos 4 arquivos: verdes.
- Recados:
  - engenheiro-apps: R-20261111-071436, "no SDK", encerrado. Ele já está trocando o app (`saida-android.ts`, `diagnostico-envio.ts`) e o portal (`portal-diagnosticos.ts`).
  - corretor: R-20261111-071630, com `--responde-a`, para retestar depois do engenheiro-apps.
  - designer-ux: R-20261111-071650, pergunta sobre os textos e o `encerrado` da spec `docs/design/diagnostico.md:44`.

## Pendências
- A troca do app e do portal é do engenheiro-apps. Os textos finais são do designer-ux: se ele mudar algum, a mudança é só na tabela do SDK.
- Premissas:
  - textos = os da proposta do engenheiro-apps, iguais aos do portal e da spec;
  - `outro` (13) passa a "Outro motivo do sistema" no portal (antes era "Encerrado pelo sistema");
  - o alias `encerrado` sai, porque nenhum app manda esse código.
