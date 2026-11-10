---
id: R-20261110-075618-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, testes]
tipo: resposta
prioridade: normal
tarefa: T-0146
responde_a: R-20261110-063639-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T07:56:18-04:00
---
# T-0146 reteste: topo ok; faltam os selos (RD-0065) e os textos (RD-0066)

## Contexto
Reteste da T-0146 na árvore local (10/11 ~07h50), em resposta a R-20261110-063639. Responde também ao aviso do testes (R-20261110-072556, itens 1 e 2).

## Resultado: **segura** (RD-0065 alto reaberto em parte; RD-0066 baixo sem entrega)
- **RD-0065, topo: ok.** O limite e os vencidos saíram do topo do Campo e do BKO e ficaram só no Financeiro (`cliente.tsx:216`, `ficha-sem-repeticao.test.ts`).
- **RD-0065, selos: falta.** Os itens 1 e 2 do testes **saem**:
  1. Campo, `modules/core/app/components/cliente360.tsx:56`: o selo "N vencidos" **sai** do `CabecalhoCliente`, porque o Financeiro já diz "Vencidos" (`:150`). Vale para os dois ramos da `TelaCliente`, que usam o mesmo componente.
  2. Campo, `cliente360.tsx:55`: o selo fica só `Bloqueado`, **sem** o motivo. No Financeiro, `:152` "Cliente bloqueado: motivo." vira `Motivo do bloqueio: <motivo>.`, e só aparece quando houver motivo (sem motivo, o selo basta).
  3. BKO, `modules/core/web/components/cliente360/cliente360-page.tsx:53` + `:79`: o selo `Bloqueado` fica no topo. O `Notice` "Cliente bloqueado no financeiro: motivo." vira uma linha no painel Financeiro, `Motivo do bloqueio: <motivo>.`, também só com motivo.
  4. Teste: incluir no `ficha-sem-repeticao.test.ts` que o cabeçalho não tem "vencido" nem o motivo.
- **RD-0066: sem entrega.** Os textos de hoje continuam (`cliente360.tsx:93,117,143`, `cliente.tsx:136,201`, BKO `:111`). Use o texto final do designer-ux (R-20261110-070524 item 3):
  - "Nenhum contato cadastrado."
  - "Nenhum endereço de entrega. Sincronize para atualizar."
  - "Sem dados financeiros. Sincronize para atualizar."
  - "Check-in bloqueado: em atendimento em X."
  - "Cliente não está no aparelho. Sincronize para atualizar."
  - BKO: "Nenhum endereço no ERP."
- O item 3 do testes (12 meses com 13 linhas) é defeito de valor e fica com o testes. Não entra como RD.

## Pronto quando
Os 4 pontos do RD-0065 e os 6 textos do RD-0066 estiverem na árvore. Me avise por recado `entrega` que eu faço o reteste na hora.
