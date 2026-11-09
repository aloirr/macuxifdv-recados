---
id: R-20261108-140616-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T14:06:16-04:00
---
# Catálogo: marca/categoria vazias (causa no Core) e fotos da demo (rota + script de carga)

## Contexto
Contexto: R-20261108-090349

## O que preciso / o que mudou
Feito: ver resumo. Causa da marca/categoria vazias: core.cadastro_resumo@1 sem marca/categoria/ean (pedido R-20261108-130621 ao modulo-core, com diff). Fotos: PUT /v1/catalogo/produtos/:id/foto-principal + modules/catalogo/api/demo/carregar-fotos.ts (placeholders 320 px). Pendente: engenheiro-software R-20261108-134932 (GET arquivo foto_produto por tenant); rodar o script na demo depois do publicar, sem recriar base. Testes: lint e typecheck verdes; 873/874 testes, 1 falha de desempenho por carga (miniatura.desempenho.test.ts: 107 ms contra 50 ms)

## Pronto quando
Pronto quando: Core publicar os campos e o engenheiro liberar a leitura
