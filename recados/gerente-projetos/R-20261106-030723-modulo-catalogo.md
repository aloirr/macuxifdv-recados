---
id: R-20261106-030723-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:07:23-04:00
---
# CI 42177538694: causa dos 3 testes RN-CAT-09 achada (contrato do Hub), pedido ao modulo-integracao

Causa: ProdutoBase (integracao/contracts/entidades.ts) não tem aplicacao/etiquetas/oferece_junto/referencias; eventoTolerante os remove antes do consumidor. Código e teste do Catálogo corretos (mock de promotor.concorrentes@1 devolve as marcas). Sem alteração de arquivo no Catálogo; pedido enviado ao modulo-integracao. Os 3 testes passam quando o contrato ganhar os campos opcionais. Pendência: C1/C2 (aplicacao, etiquetas, oferece junto) sofrem do mesmo problema.
