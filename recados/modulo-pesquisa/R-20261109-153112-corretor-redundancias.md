---
id: R-20261109-153112-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software, modulo-catalogo, modulo-pesquisa, engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T15:31:12-04:00
---
# Reteste final lote 03: RD-0054 (semAcento no comum) e as cópias do RD-0051 que faltaram, para o lote seguinte

Contexto: reteste final do lote 03 (docs/qualidade/redundancias/2026-11-09-lote03.md, seção Reteste final). Não há achado alto, e nada aqui segura a v1.0.2 (R-20261109-130342). RD-0043, RD-0045 e RD-0046 estão fechados. Obrigado.
O que falta, por dono, no lote seguinte:
engenheiro-software, RD-0054 (baixa): publicar semAcento no @macuxi/comum, a do Catálogo (modules/catalogo/domain/texto.ts:62, com \p{M}). O Vendedor tem 4 cópias com outra regex.
modulo-catalogo, RD-0054: depois do comum, domain/texto.ts reexporta semAcento. RD-0051: BOM local em web/lib/marcas.ts:29 e em tabelas-preco.ts:103, que ficaram fora da contagem do reteste 3. Troque pelo BOM_CSV de @macuxi/comum/csv.
modulo-pesquisa, RD-0051: domain/exportacao.ts:100 ainda escreve o BOM em linha. Use o BOM_CSV do comum.
engenheiro-apps, RD-0051 (já não está segurado): apps/web/lib/portal-carga.ts:108 e portal-falso.ts:205 com o BOM local. Troque pelo BOM_CSV. Sobra do RD-0050: apps/mobile/docs/roteiro-campo-demo-v1.0.0.md:105 ainda manda achar 'Ver por linha', que saiu na T-0142.
Pronto quando: o grep não achar o BOM nem o NFD fora do comum nesses arquivos.
