---
id: R-20261112-075005-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0167
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T07:50:05-04:00
---
# T-0167 Catálogo: busca paginada (lista_completa/total/aplicacao/sugestao), código exato, 3 letras, auditoria e medição

## Contexto
T-0167, lado do Catálogo (busca de produtos da v1.0.5). Sem commit.

## O que foi feito
- **Auditoria** com achados e números: `docs/modulos/catalogo/busca-desempenho.md` (seção "Auditoria da busca de produtos no aparelho").
- **Contrato aditivo** de `catalogo.busca_produtos@1` (`contracts/consultas.ts`; `limite` segue com máximo 200 para não mexer nos testes atuais): entrada `cliente_id` (vendáveis na tabela do cliente, no lugar dos até 5.000 `produto_ids`) e `lista_completa: true` (lista ranqueada inteira, até 400); saída `total`, `sugestao` e `aplicacao` por item (descrição 2 na mesma consulta).
- **Domain** (`domain/busca-consulta.ts`): `buscaPodeRodar` (3 caracteres), `TAMANHO_PAGINA_BUSCA` 20, `TETO_RANKING_BUSCA` 400, `paginaDaBusca` ("Mostrando 20 de 87"), `codigoExatoNoTopo` (SKU, EAN ou código alternativo em 1º; única mudança de ordem), `sugerirTermo` ("Você quis dizer…"), `buscarComTotal`. `buscarParaConsulta` (API) segue igual.
- **Aparelho** (`app/texto-consultas.ts`): consulta abaixo de 3 caracteres devolve vazio sem ler o catálogo; filtro do cliente corre só sobre os candidatos do FTS5; sugestão só quando nada casou.
- **Testes novos:** `domain/busca-paginada.test.ts` (11) e `app/busca-paginada-aparelho.test.ts` (11: 4 campos, paginação, total, código/EAN/alternativo, 3 letras, sugestão, vendável do cliente). Testes atuais da busca passam sem alteração. Benchmark `app/desempenho-busca.test.ts` ganhou a medição dos 20 primeiros, do "+ Mostrar mais", do código exato e da sugestão (envs `MACUXI_APLICACAO`, `MACUXI_TIMEOUT_MS`).
- **Lint** 0 erros (1 aviso antigo em `texto-consultas.test.ts`), **typecheck** 0 erros, vitest do pacote: 75 arquivos verdes; 2 falham só por tempo na máquina saturada (`domain/ranking-aplicacao.test.ts` memória, 38 s; `app/lib/miniatura.desempenho.test.ts`, 2,3 s contra 50 ms), arquivos que não toquei.

## Medição (honesta)
O PC estava saturado (tsc de 15+ min; controle "ranking por produto" 2,9 ms contra 0,3 ms de referência). Com 20 mil produtos (SQLite/FTS5 real): "+ Mostrar mais" (fatia local) p95 28,8 ms; consulta de 400 custa ~+30% sobre a de 20; código exato em 1º ok; sugestão 1ª vez 18 s nesta máquina, 2ª 482 ms. **A meta de p95 < 300 ms nos 20 primeiros NÃO ficou comprovada** (a aba, sem alteração, deu 19 s na mesma rodada); precisa de rodada com a máquina livre e do teste no aparelho do dono do produto. Se estourar no aparelho, próximo passo: calcular o "Serve em" só da página aberta.

## Pendências
- modulo-vendedor: recados R-20261112-033444 e R-20261112-042537 (usar `lista_completa`, `cliente_id`, `aplicacao`, `total`, `sugestao`, `buscaPodeRodar`, `paginaDaBusca`; reserva `searchProducts` com código exato no topo).
- engenheiro-software: pergunta R-20261112-043413 (SDK expor o vocabulário `catalogo__busca_vocab`). Hoje a sugestão usa os termos de nome, marca e categoria do catálogo em memória.
- `node scripts/coord.mjs verificar modulo-catalogo` acusa só `.vscode/settings.json` (sem dono, não é meu).

## Pronto quando
Gerente aceita a entrega e o modulo-vendedor liga a paginação.
