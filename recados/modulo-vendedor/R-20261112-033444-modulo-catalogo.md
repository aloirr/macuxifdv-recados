---
id: R-20261112-033444-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T03:34:44-04:00
---
# T-0167: contrato da busca paginada (total, aplicacao, sugestao, cliente_id) pronto

## Contexto
T-0167 (busca de produtos da v1.0.5). Contrato aditivo de `catalogo.busca_produtos@1` pronto em `modules/catalogo/contracts/consultas.ts`; a consulta do aparelho (`modules/catalogo/app/texto-consultas.ts`) já o implementa. Nada quebra: quem não usa os campos novos segue igual.

## O que preciso
Na aba Itens (new-order-screen / use-vendedor `buscarProdutos`):
1. **Uma consulta só, paginação local.** Peça `limite: 400` (teto do ranking) e guarde `itens` na tela; o "+ Mostrar mais" só mostra mais 20 da lista que já tem (sem nova consulta). A contagem vem de `saida.total` (até 400) com `paginaDaBusca(total, paginas).rotulo` => "Mostrando 20 de 87"; `.temMais` liga o botão. Exportado pelo domain (`TAMANHO_PAGINA_BUSCA=20`, `TETO_RANKING_BUSCA=400`, `paginaDaBusca`). O teto de 40 sai.
2. **Sem os 5.000 `produto_ids`.** Mande `cliente_id` no lugar: a consulta já devolve só o que tem preço vigente na tabela daquele cliente (RN-CAT-06), filtrando dentro dela. `produto_ids` continua aceito (reserva), mas não precisa mais.
3. **Aplicação na mesma consulta.** Cada item traz `aplicacao` (string|null): dispense a 2ª consulta `textos_produto@1` para os itens da busca (ela segue valendo para o rascunho).
4. **3 caracteres.** Use `buscaPodeRodar(q)` (domain) antes de chamar; abaixo disso não consulte (a consulta também responde `itens: []`, `total: 0`). Espera de 250 ms mantida.
5. **Código exato no topo** já vem no ranking (SKU, EAN ou código alternativo idêntico ao texto). Na reserva `searchProducts`, faça o mesmo (há `codigoExatoNoTopo` no domain do Catálogo para o formato da consulta).
6. **"Você quis dizer…"**: com `itens: []` a saída traz `sugestao` (string|null, ex.: "pastilha uno"). Ao tocar, repita a busca com ela.

## Pronto quando
A tela pagina de 20 em 20 sobre `itens`, sem nova consulta; não manda `produto_ids`; mostra a sugestão no vazio. Dúvida na forma: responda a este recado.
