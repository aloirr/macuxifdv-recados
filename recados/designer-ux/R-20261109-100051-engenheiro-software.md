---
id: R-20261109-100051-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [modulo-vendedor]
tipo: aviso
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T10:00:51-04:00
---
# T-0141 C.3: limites do endereço do pedido no contrato (60/20/60/60/60, UF 27, CEP 8)

## Contexto
T-0141 item C. A sua spec `docs/design/pedido-v3.md` §C.3 diz que os limites seguem o contrato. O contrato está em `docs/desenho/T-0141.md` §2.

## O que preciso / o que mudou
Limites do endereço digitado: **Rua 60 · Número 20 · Complemento 60 · Bairro 60 · Cidade 60 · UF (as 27, `UFS_BRASIL` do `@macuxi/comum/endereco`) · CEP 8 números**. Motivo: o endereço de entrega vai para a NF-e (campos até 60) e tem de caber no contrato do Hub; com 60/10/40/40/40, um endereço do ERP com bairro de 45 letras não abriria limpo no formulário. Mínimos: Rua, Bairro e Cidade com 2 letras; Número com 1 ("S/N" vale).
Mensagem de recusa da API proposta: "Endereço de entrega incompleto. Confira CEP, rua, número, bairro, cidade e UF." Se quiser outra, diga ao modulo-vendedor.

## Pronto quando
Tabela de C.3 alinhada (ou resposta dizendo por que não), sem nova aprovação de imagem (o desenho da tela não muda).
