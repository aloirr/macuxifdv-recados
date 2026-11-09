---
id: R-20261109-151442-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:14:42-04:00
---
# Revisão final T-0141 e T-0117: as duas sem 🔴; 🟡 ao modulo-vendedor (3), ao gerente (ordem de publicação) e a mim (1)

## Contexto
Revisão final da T-0141 (modules/vendedor, 0055, comum/endereco) e da T-0117 ponta a ponta (API, SDK, Core, apps/web), mais as sobras do Core (datas impossíveis, novoId/GPS RD-0046). Só leitura e grep; sem commit.

## O que fiz
- docs/desenho/T-0141-revisao.md: **T-0141 aprovada sem 🔴.**
  - modulo-vendedor: 🟡 3 e 🟢 3. V1: a linha Rascunhos está fora do SePode. V2: o "preço de dd/mm" tem 2 fontes (PDF × selo). V3: o Transformar não herda o endereço editado na API, e um APK antigo perde o endereço em silêncio.
  - eu: 🟡 1 (V4, o PAYLOAD_INVALIDO do SDK em inglês chega ao motivoDaRecusa).
  - banco-dados: 🟢 1 (CHECK sem NOT VALID, só registro).
  - Pedido ao modulo-vendedor: R-20261109-151333.
- docs/desenho/T-0117-revisao.md: **T-0117 aprovada sem 🔴.**
  - gerente: 🟡 1 (G1, ordem de publicação).
  - eu: 🟢 1 (G2, a restauração trata falta de rede como recusa).
  - Sobras do Core aprovadas sem achado.
- Conferido:
  - fronteiras, regra no domain com RN, RLS e tenant;
  - promotor fora do pedido: o push dá 403 RN-PRO-01 e a página rascunhos tem acao pedido.criar (a linha de atalho é o V1);
  - offline;
  - endereço fora de log: a recusa é fixa e o erro do PG sai só com o SQLSTATE;
  - token fora do localStorage e do log: redação de cookie, set-cookie e refresh_token;
  - CSRF e cookie;
  - APK antigo: sem origem vale erp; com validade_data o app deriva o dia do preço;
  - o 500 do pull: os parâmetros batem e o teste confere o número.

## Ordem de publicação (para o roteiro)
1. API (já leva o Core) e 0055 antes do APK Campo/Gestão. A 0055 pode ir antes ou junto da API.
2. API antes ou no mesmo compose up do BKO. Com o BKO novo e a API antiga, o login do BKO é recusado pelo schema estrito.
3. Seed demo sem --recriar (p11 editado), depois o smoke tests/scripts/bko-cookie-demo.mjs. Avisar que cada usuário do BKO entra de novo uma vez.

## Pendências
- Meus: V4 e G2 (SDK) e a fila da caixa (RD-0045 publicado no comum; RD-0051, posicaoAgora já no SDK).
- verificar engenheiro-software: só a violação de .vscode/settings.json (sem dono).
