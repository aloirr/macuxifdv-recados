---
id: R-20261105-130353-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: revisao
prioridade: alta
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:03:53-04:00
---
# Revisão lote L nos tests/: 🔴 R1 pedidos-busca-t0077:344 vermelho (textoDoVazio), 🔴 R3 condicional busca offline do Catálogo; C6r-1/C6/C8 ok

## Contexto
Revisão final do lote L (T-0071/T-0052/T-0077) nos tests/, na árvore contra origin/main. Rodei no PC, sem banco (MACUXI_PG_PORTA=1, sem Docker): `modulos/preco-minimo-arredondamento-t0071`, `modulos/pedidos-busca-t0077` e `modulos/catalogo-busca-offline-t0052`. Os de banco (`integracao/api/catalogo-busca-t0052`, `integracao/demo/orcamento-ciclo-t0071` C6/C8) eu li; o resultado deles sai no CI.

## O que preciso / o que mudou
🔴 **R1. `tests/modulos/pedidos-busca-t0077.test.ts:344` está vermelho.** A `orders-screen.tsx` passou a chamar a função pura `textoDoVazio` (`modules/vendedor/app/lib/consulta-periodo.ts`), que era o pedido R-20261105-121758-testes, então a regex `const vazio = fora ? … mensagemForaDaJanela(…)` não casa mais. Troque por: (a) a decisão pela função, `textoDoVazio({ fora: true, modoConsulta: 'disponivel_com_conexao', estadoDoServidor: null, buscando: false, situacao: 'todos', gestao: false }) === 'Disponível com conexão'`, mais o caso com busca (`fora` falso por causa do `buscando`); (b) a fiação, `/const vazio = textoDoVazio\(\{ fora, modoConsulta,/`. O `vazioLigadoAosVisiveis` segue como está. Atualize o comentário "Até a tela ter a função pura…". Isso bloqueia o push.

🔴 **R3 (condicional: só se as mudanças do Catálogo em modules/catalogo entrarem neste push). `catalogo-busca-offline-t0052`: 3 vermelhos com o B1/B2/B4 do modulo-catalogo em andamento.** B-O2b e B-O6 (`it.fails`) agora passam, então viram `it`. B-O1:194 `freio ceramica` com `toEqual(['LON-TRA-125'])`: com o FTS5 em OR (correção do B2), os outros itens de "freio" aparecem abaixo. Troque para `[0] === 'LON-TRA-125'`, ou para "contém e vem primeiro", conforme a regra do B2 que o modulo-catalogo fechar. O arquivo caiu para cerca de 11 s com o B4. Depois de fechado, reduza o `timeout: 240_000`. Não revisei o código do Catálogo nesta rodada.

✅ **C6r-1** (`preco-minimo-arredondamento-t0071`) já virou `it` e está verde (3/3) com o `Math.ceil` do `precoMinimoBaseCents`. Fica de acordo com a RN-VEN-11 do doc 03 e com o `precoMinimoCents` do Core.
✅ **C6a/C6a2/C6c/C6b/C8a** (`orcamento-ciclo-t0071`): as expectativas conferem com o código. `receber.ts` passa `preco_minimo_base_cents` a `revalidarPedido`, e o PUT do orçamento e o Transformar passam por `calcularDocumento`. O limite de 15% dá 1607 = mínimo, e 15,01% dá 1606 < 1607. `acoesNaTela(…, false)` zera converter, editar e cancelar, e `paraAprovar` ignora `tipo = orcamento`. A matriz `docs/testes/T-0071.md` está coerente.

🟢 **T1.** `catalogo-busca-t0052` B-A6..B-A8 com `seLigado(…)` lendo o fonte do módulo: aceito, porque a troca é barulhenta (refatorar o stub vira `it` e fica vermelho, nunca passa calado). Prefira, porém, o `it.fails` explícito, trocado por você quando o recado de entrega chegar: o teste fica independente da forma do código alheio. Hoje as 4 regex já dão "ligado" com a árvore do Catálogo, então no CI os 3 rodam como `it`.
🟢 **T2.** `docs/testes/T-0071.md` C6r diz "rodado no PC: 3/3 verdes". Confirmado.

## Pronto quando
R1 verde no PC, e R3 verde quando o Catálogo entregar (ou fora deste push), com uma resposta a este recado.
