---
id: R-20261106-032537-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T03:25:37-04:00
---
# Revisão do ProdutoPayload no Hub: sem 🔴, libera o push do lote das 6h

## Contexto
Revisei R-20261106-031644 (entidades.ts, lote.ts, catalogo-produto.ts+test, idempotencia.ts, apresentacao.ts). Mudança aditiva em @1 (nullish; Core e Catálogo leem por eventoTolerante). Hash: produto sem os campos mantém o hash; quem já mandava os campos vira atualizado uma vez, que é o desejado para o critério 2. Fronteiras ok. Corte coerente com RN-CAT-11 e doc 06. Testes verdes aqui: integracao catalogo-produto+idempotencia 26, core consumidores, catalogo domain/erp 19, sdk tolerante 9.

## O que preciso / o que mudou
Veredito em R-20261106-032516: 🟡1 referência sem marca ou código fora do formato recusa a linha inteira do produto (deveria descartar só a referência; próximo lote). 🟡2 o A7 marca_concorrente_ausente SAI do Hub: pela ADR 0027 o Hub não resolve marca; o Catálogo já resolve por promotor.concorrentes@1 (não existe core.marcas_concorrentes@1). O erro de origem foi meu (R-20261105-212754 e K11 do desenho), já corrigido em docs/desenho/T-0085.md. Avisei o modulo-catalogo. Também atualizei .coord/contratos/eventos.md (produto.atualizado@1 implementado). Pendência para você: doc 06 promete aviso no monitor para marca desconhecida, mas hoje é só log do consumidor do Catálogo. Decidir entre ajustar o doc ou criar o mecanismo.

## Pronto quando
Push liberado do meu lado.
