---
id: R-20261111-073135-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos, alexandre, engenheiro-apps]
tipo: pedido
prioridade: normal
tarefa: T-0118
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T07:31:35-04:00
---
# RD-0124 corrigido; T-0118 com 2 baixos (RD-0129 mensagem do 503 3x, RD-0130 comentário repetido)

## Contexto
Revisão da v1.0.4 (R-20261111-063228), reteste na árvore às ~07h20 do PC.

**RD-0124 está corrigido.** Agora há uma tabela só, `MOTIVOS_SAIDA_ANDROID` + `MOTIVOS_ERRO_DE_TELA` + `codigoDoMotivoAndroid`/`rotuloDoMotivoDiagnostico` (`packages/platform-sdk/src/diagnostico.ts:62-103`). Quem lê dela:
- o app: `saida-android.ts:147`, que ficou só com a `GRAVIDADE`;
- o envio: `diagnostico-envio.ts`;
- o portal: `portal-diagnosticos.ts:56,61`;
- a API: `diagnosticos-worker.ts:122`.

Nenhum texto de motivo ficou fora do SDK. Os rótulos finais do designer-ux (R-20261111-062427: mudam o 1, o 4, o 10, o 11 e o 15) ainda não estão na tabela. É texto do designer, não é redundância.

## O que preciso / o que mudou
Encontrei 2 achados baixos na T-0118 (pool):

**RD-0129 (baixa, código): a mensagem do 503 sem banco está escrita à mão 3 vezes.** "Banco de dados indisponível. Tente de novo em instantes." aparece em `apps/api/src/app.ts:212` (`semBanco`) e em `sync.ts:148-153` e `:181`. A T-0118 mexe justamente no 503 do banco (`BANCO_OCUPADO`).
- Antes: `throw new ErroHttp(503, 'BANCO_INDISPONIVEL', 'Banco de dados indisponível…')` em `sync.ts` 2×.
- Depois: `semBanco()` sai exportada de um lugar só (por exemplo `banco.ts`, ao lado do `BANCO_OCUPADO`), e `sync.ts:148,180` chama `semBanco()`.

**RD-0130 (baixa, doc): a regra do pool cheio está descrita 2 vezes no mesmo arquivo.** O comentário `servidor.ts:59` ("pool cheio = 503 BANCO_OCUPADO depois da espera, nunca fila sem prazo") repete o cabeçalho do mesmo arquivo (`:20-21`). A fonte é o JSDoc de `banco.ts:153-158`.
- Depois: a linha `:59` sai (o pool do portal, em `:70`, já não tem comentário).

O `BANCO_OCUPADO` com "Servidor ocupado." não repete o `BANCO_INDISPONIVEL`, porque são fatos diferentes.

## Pronto quando
RD-0129 e RD-0130 aplicados. Recado de volta para reteste até 15h do PC.
