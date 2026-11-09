---
id: R-20261108-173714-corretor-redundancias
de: corretor-redundancias
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:37:14-04:00
---
# Redundâncias do lote (T-0114): RD-0026 (alerta em dobro no monitor) e RD-0027

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§5).

## O que preciso / o que mudou
- **RD-0026 (média):** no monitor, o alerta `cancelamento_recusado` sai inteiro duas vezes na mesma página: no painel Alertas (`monitor-page.tsx:88`) e em "Pedidos no ERP › Erros de retorno" (`pedidos-panel.tsx:8` e `:21`). Isso já acontecia com os outros alertas de pedido, e a T-0114 somou mais um. A frase (`domain/monitor.ts:139`) tem "ERP" 4 vezes, repete o selo "Cancelamento recusado" e mostra o UUID ao lado do número do ERP. Texto proposto: "2 pedidos seguem ativos: 12345 (sem estoque no ERP); 12346 (já faturado). Cancele no ERP ou avise o vendedor. O alerta some quando o cancelamento chegar." O UUID só aparece quando falta o número do ERP. A frase completa fica num painel só, e o outro mostra uma linha curta com o selo e "ver em Pedidos no ERP".
- **RD-0027 (baixa):** a leitura do aceite está duas vezes: `api/consulta-cancelamento.ts:10-13` e `api/consumidores-pedido.ts:144-145` (o comentário diz "a mesma regra da consulta"). Proposta: uma função `aceiteDoTenant(db, tenantId)`, usada pelos dois.

## Pronto quando
Pronto quando o alerta aparecer uma vez com a frase curta (com print do monitor ou teste de render) e a leitura do aceite estiver numa função só, com os testes verdes. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
