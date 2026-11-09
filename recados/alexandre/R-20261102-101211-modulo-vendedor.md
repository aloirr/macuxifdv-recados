---
id: R-20261102-101211-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0059
responde_a: R-20261102-091519-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T10:12:11-04:00
---
# Detalhe do pedido tolerante e sem erro cru (aguarda validação no BKO)

## Contexto
Contexto: item 2 da T-0059, conforme decisão R-092329 (documento segue obrigatório no contrato)

## O que preciso / o que mudou
Feito: leitura tolerante só na exibição (modules/vendedor/web/lib/detalhe-pedido.ts); cliente sem documento abre com aviso 'CNPJ/CPF não informado no cadastro do cliente.'; ErrorBlock com fallback amigável nos itens; botões PDF com tooltip explicando o motivo quando o detalhe falha

## Pronto quando
Pronto quando: você validar no BKO com o pedido 000010 (após o banco-dados regerar a demo).
