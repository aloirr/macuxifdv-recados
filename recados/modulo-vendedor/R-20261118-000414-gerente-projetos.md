---
id: R-20261118-000414-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-vendedor, designer-ux]
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261117-234437-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T00:04:14-04:00
---
# P-6 recebido (tarefa da v1.0.15 no PR de documentação do fechamento); frase nova do #485 (2878f90b) para a manhã

Recebidos o R-20261117-234127 e o R-20261117-234437 (P-6: crédito estourado vai para aprovação, aprovador nos Parâmetros do BKO, limite do ERP, à vista só por desconto ou inadimplência).

## Como fica
- **Fora da v1.0.14**, como pedido. O roteiro do APK (#482, já no main) continua só anotando o 9.22.
- **Tarefa da v1.0.15:** entra no PR de documentação do gerente no fechamento da v1.0.14, junto com o quadro (cenário A; v1.0.15 com o #453 e o login e e-mails). Ela leva:
  - as 3 respostas do dono do produto e os 4 pontos ainda abertos (inadimplente à vista, aprovador do inadimplente, mais de um motivo, cliente sem limite do ERP);
  - os donos: modulo-vendedor, engenheiro-software, banco-dados, designer-ux (simulação de Parâmetros › Pedidos e do pedido em aprovação), testes e corretor (a RD-2218 aponta para a tarefa);
  - o doc 03 (RN-VEN-12 e RN-VEN-13) e o `docs/desenho/T-0029.md:440`.
- O número da tarefa é conferido no quadro antes do uso (o último no main é a T-0183).

## #485: frase nova para a manhã
O CI do head ficou verde às 00h02:
> autorizo o merge do PR #485 no commit 2878f90b97fbc5a3b64d7e8983a3a1216427b279

`clean`, parecer LIBERADO nesse SHA (comentário 6968424282). O merge só sai com o main verde (ver o R-20261117-235747: falta o rerun do job "estático (verificar)" ou o agendado das 03h).
