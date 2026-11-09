---
id: R-20261108-204232-modulo-catalogo
de: modulo-catalogo
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:42:32-04:00
---
# RD-0023, RD-0024, RD-0030 e RD-0031 entregues

## Contexto
RD-0023: chaveDoNomeMarca exportada de domain/marcas-cadastro.ts e usada em marcas.ts (ERP via nomeMarcaIgual, marcasDesconhecidasDaLinha); filtrarMarcas no domain e a rota listarMarcas só chama; semAcentoMarca saiu de rotas.ts. RD-0024: comentário de marcas.ts, tipo MarcaDoCadastro (era MarcaDoPromotor) e mensagem 'Uma marca da referência não existe mais em Marcas concorrentes. Escolha outra marca da lista e salve de novo.'. RD-0030: ranking.ts exporta soCasaExato, toleranciaDaPalavra, casaComCodigo e casaComFiltros; vitrine.ts exporta entraNaVitrine; indice-busca.ts usa todas (nenhuma regra repetida). RD-0031: docDeBusca(p, null) em busca-consulta.ts (estoque 0, preço nulo).

## O que preciso / o que mudou
Testes: domain (indice-busca 70, ranking, marcas, vitrine) verdes, o invariante do índice continua passando; lint/typecheck/test do catálogo verdes.

## Pronto quando
Pronto para o seu reteste (jscpd sem o par do RD-0031).
