---
id: R-20261128-000424-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [engenheiro-software, modulo-integracao, modulo-vendedor, banco-dados, designer-ux, testes, corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0208
responde_a: R-20261127-235610-alexandre
encerra: false
contrato: null
criado_em: 2026-11-28T00:04:24-04:00
---
# 63 A: T-0208 e ADR 0077 reservadas (ST/IPI do ERP, v1.0.44, simulação antes); 64 A com o PO, sem apagar os 2 branches da v1.0.43 nem o #870

## Contexto
Resposta ao R-20261127-235610-alexandre, decisões 63 A e 64 A.

## 63 A: ST e IPI só vêm do ERP
- **Tarefa:** reservada a **T-0208**, "ST e IPI vindos do ERP no pedido e no PDF, sem cálculo no FDV". Os donos são o engenheiro-software (ADR e contrato), o banco-dados, o modulo-integracao, o modulo-vendedor, o designer-ux, o testes e o corretor.
- **ADR:** reservada a **0077**. Hoje a mais alta é a 0076. O engenheiro-software escreve o contrato com o ERP e onde os valores ficam guardados.
- **Ordem:** primeiro a ADR, depois a simulação do pedido e do PDF, que vai ao Alexandre pelo PO. As 3 suposições do PO (valor sem imposto igual ao de hoje, ST e IPI em linhas próprias, "calculado pelo ERP" no offline) vão nela para ele confirmar. Só depois vem o PR.
- **Versão:** v1.0.44, junto com a T-0200, a T-0202 c e d, a T-0203, a T-0204 e a T-0207. Não passa na frente da v1.0.42 nem da v1.0.43.
- **Previsão por etapa:** sai quando a v1.0.43 fechar, como as outras da v1.0.44.
- **No quadro:** a T-0208 entra no próximo PR do gerente. O #870, do quadro desta noite, já subiu, e não faço um segundo push nele.

## 64 A: branches antigos
Fica com o PO, como decidido. Um cuidado: **não apague** `nuvem/v1043-modulo-core-perfis` nem `nuvem/v1043-modulo-catalogo-rn-cat-22`, que não têm PR e são a v1.0.43. Também não apague `agente/v1042-quadro-gerente-projetos`, o #870, que está aberto. Pela trava do PO (só branch com PR mesclado e head igual), nenhum dos três seria apagado.

## Estado às 00h05 de 28/11
- **#870** (quadro, `.coord/`, 1 commit, `Agente: gerente-projetos`):
  - head efdf94bb4e38b906d7d25bc00d9734a6697964e4;
  - CI 46105398845 verde;
  - verificar --base, --por-commit e brechas OK.
  - Falta o parecer do corretor no head antes do merge.
- **Actions:** continua com 403 no teste das 00h03. O liberar da v1.0.42 espera a liberação (passo exato no R-20261127-235023).

## Pronto quando
A T-0208 estiver no quadro e a ADR 0077 aberta pelo engenheiro-software, na ordem da v1.0.44.
