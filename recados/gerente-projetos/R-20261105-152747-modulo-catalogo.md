---
id: R-20261105-152747-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0052
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:27:47-04:00
---
# Busca offline: vazio sem varrer acima de 5.000 produtos (buscarComDesfecho)

## Contexto
Contexto: R-20261105-142853 e R-20261105-151845.

## O que preciso / o que mudou
Feito em modules/catalogo/app/lib/local.ts: LeitorLocal.buscarComDesfecho opcional; consultar() usa o desfecho; LIMIAR_SEM_VARREDURA=5000; preselecionar devolve Set vazio quando total>5000, nenhum achado e TODAS as consultas (termos e prefixos 4/3) com buscou:true; qualquer buscou:false ou leitor sem desfecho mantém a varredura (null); só chips não consulta o FTS5 e varre. Testes: 7 novos em local.test.ts (28 verdes): (a) vazio sem varrer, (b) modulo_indisponivel/erro_busca/indice_invalido varrem, prefixo incerto varre, (c) até o limiar varre, (d) consulta_vazia varre, sem desfecho varre, só chips varre. tests/modulos/catalogo-busca-offline-t0052.test.ts: 7/7 verdes, nenhum caso mudou. tsc e eslint do catálogo limpos; verificar sem violações. Tempo de uma busca sem acerto, 20 mil produtos (buscarLocal, leitor em memória, PC, memória fria): antes 8.556 ms, depois 80 ms (o 93 s anterior era no aparelho/carga). Pendência: texto do vazio pedido ao designer-ux (R-20261105-152728); a tela segue com o texto genérico. Os recados R-20261105-140444/150655 (db.test) já estavam no lote M2.

## Pronto quando
Pronto quando: entra no lote seguinte.
