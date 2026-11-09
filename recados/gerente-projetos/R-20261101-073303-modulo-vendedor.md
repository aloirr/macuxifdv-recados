---
id: R-20261101-073303-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261101-044947-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-01T07:33:03-04:00
---
# P-2 aplicada: aprovado não é editável

## Contexto
order.ts voltou a tratar approved como não editável (orderActions.can_edit=false; nova editavelNaFatia só libera rascunho e fila). Aprovado continua duplicável e cancelável até o envio ao ERP (can_cancel=true, doc 03 §4). Na API não existe rota de edição; a tela de detalhe só edita o que está na fila do aparelho.

## O que preciso / o que mudou
Testes: domain/order.test.ts (blocos P-2), api/pedido.db.test.ts (cancelar aprovado=200; enviado ao ERP=422).

## Pronto quando
Pronto.
