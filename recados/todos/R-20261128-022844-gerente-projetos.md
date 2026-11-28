---
id: R-20261128-022844-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-28T02:28:44-04:00
---
# Retome (02h00): core da v1.0.43 no main (#873, 47c11bcb, 1 h antes da previsão); quadro no main (#872); previsão da v1.0.43 e decisão do critério 9 da RN-CAT-22

## Mensagem do dono do produto
O Alexandre escreveu direto no chat do gerente-projetos (VS Code), às 02h00 de 28/11/2026, em Manaus. Texto literal:

> retome

## Feito a partir dele (02h00 a 02h30)
- **Ronda do time:**
  - parou entre 01h31 e 02h00 porque o notebook entrou em suspensão (eventos 42 e 107 do Kernel-Power);
  - liguei "acordar o computador para rodar" na tarefa e rodei uma rodada às 02h01;
  - se o notebook for desligado, a ronda para junto. Ela só existe nesta máquina.
- **4 pedidos abertos encerrados**, todos já entregues:
  - T-0196: o DECIMAL(13,4) no Conector (#810 e #812) e a quantidade decimal no Treinamento (#821), os dois na v1.0.36;
  - parecer e revisão do #771 (v1.0.37).
  - Recados R-20261128-020249, -020254, -020258 e -020303.
- **Quadro: #872 no main** (squash a91d5f33). O #870 foi fechado e substituído.
  - v1.0.40 a v1.0.42 no ar;
  - tarefas T-0200 a T-0209, todas abertas com escopo (122 A);
  - backlog dos passos manuais e a ronda.
  - Parecer do corretor no head com 2 achados de texto, já corrigidos.
- **v1.0.43, core: #873 no main** (squash **47c11bcb**, ~02h28). Entrou **1 h antes** da previsão das 03h30.
  - itens 2, 3 e 5 do R-20261127-144433;
  - pareceres no d2085d96: corretor LIBERADO (RD-3743, regra repetida do perfil efetivo, corrigido antes do merge), testes APROVADO, engenheiro-software e engenheiro-apps sem 🔴;
  - suíte com banco no notebook: core com 3566 testes, `tests/` com 88, apps/api com 14.

## Próximas etapas da v1.0.43 (estimativa do dono +15%, Manaus)
| Etapa | Dono | +15% | Previsão (28/11) |
|---|---|---|---|
| Aba de pedidos no app (lê `eu/leitura-de-pedidos`) | engenheiro-apps | 1h45 | 04h15 |
| T-0207 gestor (`nuvem/v1036-modulo-gestor-apuracao`): trazer para o main, testar e PR | modulo-gestor | 1h45 | 04h15, em paralelo, sem caminho comum |
| T-0207 core (`nuvem/v1036-modulo-core-base-vendas`), depois do #873, que já entrou | modulo-core | 1h45 | 06h00 |
| RN-CAT-22 (`desempenho-veiculo.test.ts`) | modulo-catalogo e testes | depende do critério 9 | **decisão abaixo** |
| T-0206 (filial do vendedor na carga) | modulo-integracao e modulo-core | escopo a fechar | previsão quando o escopo estiver fechado |
| T-0201 (jornada em PDF) | designer-ux | jornadas a confirmar | idem |
| Parecer novo do corretor no lugar do #792 e do #820 | corretor | 1h10 | 05h25 |
| Liberar da v1.0.43, aprovado do PO, publicar e APKs | — | ~1h | depois do último item |

A T-0207 era da v1.0.44. Com a correção já pronta e sem colisão, ela entra na v1.0.43. Se o PO preferir manter na v1.0.44, eu volto.

## Decisão para o PO: critério 9 da RN-CAT-22
O teste de desempenho do filtro por veículo derrubou o liberar da v1.0.41. O branch `nuvem/v1043-modulo-catalogo-rn-cat-22` (bde0d1dd) deixa o teste estável, mas o testes não aprovou porque falta o critério 9.
- **A (recomendada):** o teto de tempo do CI fica separado do teto do aparelho. O CI mede com folga para o runner compartilhado, e o teto de 900 ms do aparelho segue na medição do aparelho. Impacto: nenhum na tela, ~30 min.
- **B:** o teste sai do CI e fica só no roteiro do aparelho. Impacto: perde a proteção automática, ~10 min.

## Pronto quando
O PO escolher A ou B do critério 9. O resto segue sem espera.
