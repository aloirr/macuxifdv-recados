---
id: R-20261110-215042-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [banco-dados, gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:50:42-04:00
---
# T-0158: contrato com as 5 saídas do Android (saidas_android) e sinal para ligar DIAGNOSTICO_NUVEM_LIGADO

## Contexto
T-0158 entra no build das 05h de Manaus (R-20261110-212608). O dono do produto aprovou as imagens com a mudança 2 (R-20261110-192152): **o envio leva as 5 últimas saídas do Android** (motivo, horário e ponto da falha, `ultimasSaidas` do `macuxi-saida`) e o último erro; o portal mostra as 5 no bloco "Saída do Android". O contrato de hoje (`packages/platform-sdk/src/diagnostico.ts`) só tem `saida_android` (1 objeto, sem `quando`). Nada disso foi commitado ainda (SDK, rota, 0058 e seed estão `??` na árvore), então dá para trocar sem nova versão.

## O que preciso
1. **Contrato (SDK)** — proposta, troque se preferir outra forma, só me diga:
   - `DiagnosticoSaidaAndroidSchema` ganha `quando: z.string().datetime()` e a `pilha` cai para `texto(2000)` (5 × 4000 estoura os 32 KB do corpo com o resto);
   - `DiagnosticoEnvioSchema`: `saida_android` vira **`saidas_android: z.array(DiagnosticoSaidaAndroidSchema).max(5)`** (mais nova primeiro; `[]` = nenhuma ou APK sem o módulo). Na `queda`, a saída que motivou é a de `quando = ocorrido_em` (o app garante que ela está na lista);
   - `DiagnosticoDetalheSchema`: idem `saidas_android` (array).
2. **API** (`apps/api/src/diagnosticos.ts`): máscara em `descricao`/`pilha` de cada item; `detalhe` grava `saidas_android`.
3. **banco-dados** (cc): o CHECK da 0058 (`detalhe - array['erro','saida_android','sync']`) e o `sa_diagnostico` passam a `saidas_android`; seed `dois-tenants.ts` e `db/testes/diagnostico.test.ts` acompanham.
4. **Ligar a chave do app** (`DIAGNOSTICO_NUVEM_LIGADO`): preciso que você diga, por resposta, quando `POST /v1/diagnosticos` + `GET /v1/plataforma/diagnosticos[/:id[/print]]` estiverem no `servidor.ts` com teste verde **e** com `MACUXI_DIAGNOSTICOS=1` no `.env` da demo pelo deploy (senão o app manda e fica "Na fila" com 404). Hoje vejo `diagnosticosPortal` no `servidor.ts`; a rota do app (`POST`) depende do mesmo flag?
5. **Alerta automático** (`QUEDA_AUTOMATICA_LIGADA` do app = v1.0.5): só ligo se você confirmar que o worker de alerta + o patch de governança do remetente `diagnostico` estão prontos e aprovados pelo dono do produto. Sem isso fica desligada.

Eu já estou ajustando o app (5 saídas, sem a linha "Vai junto", textos finais da imagem) e fazendo o Portal › Diagnósticos (`apps/web/app/config/diagnosticos`) contra este contrato proposto; troco o nome do campo se você escolher outro.

## Pronto quando
SDK com `saidas_android` (ou a forma que você escolher) na árvore com teste verde, até ~01h30 do relógio do PC, e uma resposta sua dizendo: rota pronta e testada + flag da demo ligado (aí ligo `DIAGNOSTICO_NUVEM_LIGADO`), e se o alerta está pronto (aí ligo `QUEDA_AUTOMATICA_LIGADA`).
