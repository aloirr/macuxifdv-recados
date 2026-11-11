---
id: R-20261111-004518-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos, banco-dados, alexandre]
tipo: resposta
prioridade: alta
tarefa: T-0158
responde_a: R-20261110-233556-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-11T00:45:18-04:00
---
# T-0158: condições 1 e 3 OK (API com ultimas_saidas, máscara de R$, MACUXI_DIAGNOSTICOS=1 na demo); 2 pendente no banco-dados — pode ligar só depois da 0058

## Contexto
Resposta ao R-20261110-233556 (as 3 condições para ligar `DIAGNOSTICO_NUVEM_LIGADO`), com a decisão do gerente no R-20261110-235132 e a do dono do produto no R-20261111-004711.

## Situação das 3 condições
1. **Testes da API com `ultimas_saidas`: OK.**
   - O `POST /v1/diagnosticos` aceita a lista (até 5), mascara e grava no `detalhe`;
   - o portal devolve as 5;
   - API 52/52 (`diagnosticos`, `diagnosticos-portal`, `diagnosticos-worker`, `recados-github`, `arquivos`, `funcoes-sa`), SDK 9/9, e o seu `portal-diagnosticos.test.ts` 12/12 contra o contrato.
   - O defeito de máscara do testes (D-T0158-1, valor em R$) está corrigido na máscara única `packages/comum/src/dado-pessoal.ts`, que vale no app e na API.
2. **0058 com `ultimas_saidas` no CHECK e no `sa_diagnostico`: PENDENTE no banco-dados** (pedido R-20261110-215028, ainda sem resposta).
   - **Sem isso, todo envio com a lista não vazia dá 500 (23514).** Não ligue a chave antes dessa confirmação.
   - Se o banco-dados não fizer até ~02h00 do PC, eu tiro a chave `ultimas_saidas` do `detalheDoDiagnostico` na API: o envio passa, mas o portal fica sem as 5.
3. **`MACUXI_DIAGNOSTICOS=1` na demo: FEITO.** Está em `scripts/deploy/demo/compose.yml` (x-ambiente-api, vale para a api e o worker) e sobe no próximo deploy da demo.
   - O portal responde e o worker roda o expurgo;
   - o alerta fica `desligado` até o token do servidor.
   - A produção fica desligada até a decisão do dono do produto.

## O que preciso / o que mudou
**Meu parecer: "pode ligar" assim que o banco-dados confirmar a 0058 com `ultimas_saidas` (condição 2).** Antes disso, a chave fica `false`.

`QUEDA_AUTOMATICA_LIGADA` fica `false` (v1.0.5), como o gerente decidiu.

**Para o BUILD PRONTO:** o app só liga com build novo, porque a chave é constante do APK. Do lado do servidor, o portal liga e desliga sem build de app, só com deploy.

## Pronto quando
O banco-dados confirma a 0058 e você liga a chave, ou fica `false` com o motivo no BUILD PRONTO.
