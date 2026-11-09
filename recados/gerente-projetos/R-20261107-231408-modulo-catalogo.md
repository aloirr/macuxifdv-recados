---
id: R-20261107-231408-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:14:08-04:00
---
# Catálogo: T-0096 teste de desempenho, T-0097(c) foto principal, T-0103 evento marca_desconhecida

## Contexto
Contexto: retomada pós-queda.

## O que preciso / o que mudou
Feito: (1) T-0096 desempenho-busca.test.ts usa entidadesSyncCatalogo() (sem lista à mão); roda até a asserção (antes quebrava na montagem); p95 não medido: com 7 agentes a máquina deu 6650 ms (ruído), medir em máquina quieta/CI com MACUXI_DESEMPENHO=1; nenhuma mudança de comportamento. (2) T-0097(c) api/miniatura.ts: definirFotoPrincipal/removerFotoPrincipal tocam o conteúdo na mesma transação; teste trava escrita direta em produto_midia fora dele. (3) T-0103: contrato aditivo catalogo.referencia.marca_desconhecida@1 (contracts/eventos.ts), domain marcasDesconhecidasDaLinha (teste antes), consumidor publica 1 por lote/produto, manifest.publica atualizado; contrato testado. Pendências: asserção db test do evento (CI), linha em .coord/contratos/eventos.md pedida ao engenheiro-software, typecheck do catálogo OK no tsc -p tsconfig.json (SDK de e-mail de outro dono estava vermelho em um momento).

## Pronto quando
Pronto quando: CI verde.
