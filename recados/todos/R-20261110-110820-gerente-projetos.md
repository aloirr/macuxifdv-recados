---
id: R-20261110-110820-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:08:20-04:00
---
# v1.0.3 às 21h com as telas aprovadas (T-0150, T-0148, T-0145, T-0147, T-0153): status às 18h, corte do lote às 19h30

## Contexto
O dono do produto aprovou as imagens v2 (Resumo, detalhe e Itens com a área Alertas) e as 5 premissas (R-20261110-114411). A **v1.0.3 passou para as 21h de hoje** (R-20261110-114412) e deve levar, se der, todas as telas aprovadas. O que não estiver pronto **e verificado** até o corte fica para a v1.0.4 de quarta, sem segurar o build.

## Horários de hoje
- **18h:** cada dono manda ao gerente o que vai caber e o que não vai. O gerente leva isso ao recado diário.
- **19h30, corte do lote:**
  - só entra o que tiver testes verdes do que foi tocado, parecer do corretor sem achado e revisão do engenheiro sem 🔴;
  - o gerente monta o lote às 19h30 e roda o CI e o stack isolado;
  - com tudo verde, push, demo publicada e build EAS às ~20h30;
  - o que quebrar o CI sai do lote e vai para a v1.0.4.
- **21h:** BUILD PRONTO.

## Quem faz o quê
- **modulo-vendedor:**
  - **primeiro** a tela Pedidos e os RD que já estão com você;
  - **depois** a T-0150 (Resumo e detalhe com Alertas, situação só no Histórico) e a T-0148 (aba Itens com popup e Alertas), conforme `docs/design/pedido-v4.md` §0/§0.1 e as imagens `docs/design/telas/T-0150-*.png` e `T-0148-itens.png`, já **aprovadas**;
  - premissas aprovadas: RN-VEN-42 (a) a (e) no doc 03.
- **engenheiro-apps:**
  - a correção da T-0144 (já feita);
  - a tela de permissões conforme a imagem aprovada (T-0145);
  - o badge fora da aba Pedidos (RD-0078);
  - o RD-0072 e o RD-0073;
  - a captura por câmera ou galeria das fotos do PDV (T-0147, se der).
- **modulo-core:** a ficha das fotos do PDV já está pronta (T-0147); falta só o push, quando o SDK e a captura chegarem.
- **engenheiro-software:**
  - **prioridade 1:** o `consultar` no SDK (R-20261110-110150), porque sem ele o preço da filial lança erro;
  - depois, o SDK das fotos e as revisões.
- **banco-dados:** o modelo de entrada de pedidos do Conector (R-20261110-104924) e a fixture da CNH com o gerente (🟡 do engenheiro).
- **corretor e testes:** parecer e testes de cada entrega assim que chegar, com prioridade para o que entra às 19h30.

## Pronto quando
O BUILD PRONTO da v1.0.3 às 21h, com a lista do que entrou e do que ficou.
