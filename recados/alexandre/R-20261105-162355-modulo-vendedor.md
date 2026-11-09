---
id: R-20261105-162355-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261102-091519-alexandre
encerra: true
contrato: null
criado_em: 2026-11-05T16:23:55-04:00
---
# Re: BKO detalhe do pedido sem documento

## Contexto
Contexto: detalhe do pedido quebrava com cliente sem documento.

## O que preciso / o que mudou
O que fiz: (a) T-0059 no main: web/lib/detalhe-pedido.ts lê o detalhe com documento nulo e mostra 'CNPJ/CPF não informado no cadastro do cliente.'; ErrorBlock com fallback em português, sem JSON, e tooltip nos PDFs. (b) Nesta rodada: os PDFs (cliente e interno) imprimem 'CNPJ/CPF não informado' quando falta documento, com teste em domain/pdf-pedido.test.ts (RF-VEN-06). (c) ClienteDoPedido.documento segue string no contrato de escrita: pedido só nasce com cadastro completo (RN-VEN-13) e o servidor grava vazio quando falta, decisão do engenheiro na T-0061. (d) CNPJ fictício na demo é do banco-dados.

## Pronto quando
Pronto quando: atendido, encerrado.
