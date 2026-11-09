---
id: R-20261031-193823-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0021
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:38:23+00:00
---
# T-0021 entregue: domínio, contracts e manifesto do Catálogo

## Contexto
T-0021 (Catálogo: domínio — vitrine, busca, preço e estoque visíveis; sem banco e sem telas). Branch nuvem/T-0021-catalogo-dominio. Não existe .coord/tarefas/T-0021.md: o pedido veio do Alexandre pelo gerente.

## O que fiz
- docs/modulos/catalogo/regras.md: cada regra com exemplo e RF/RN de origem, parâmetros do tenant com padrão e as premissas P-1..P-11.
- modules/catalogo/domain (funções puras, testes escritos antes, nomes `it('RN-CAT-..'/'RF-CAT-..')`): texto.ts (normalização, medidas canônicas, plural simples, sinônimos nos dois sentidos e de várias palavras), consulta.ts (interpretação sem LLM: marca, categoria, faixa de preço, estoque, ordenação, medidas, EAN com dígito verificador, SKU), ia.ts (portas PortaInterpretacaoLlm/PortaRespostaLlm/PortaEmbeddings, validação do que o LLM devolve, mesclagem, contingência offline/limite/falha), ranking.ts (textual com prefixo e erro de digitação + semântico + boosts + filtros + desempate determinístico), preco.ts (tabela condição/cliente/padrão, vigência, promoção UTC, arredondamento inteiro), estoque.ts (por filial, faixas, sem número exato, hora/defasagem), limite-ia.ts (limite diário no fuso do tenant + chave/validade de cache com tenant), pergunte.ts (contexto só do tenant, citação obrigatória, rejeição de fonte inexistente/de outro tenant/sem fonte), parametros.ts, index.ts.
- relevancia.test.ts: 24 consultas de referência com resultado esperado (catálogo de 24 produtos).
- modules/catalogo/contracts/busca.ts (novo, exportado em index.ts): ParametrosCatalogo, PrecoVisivel, EstoqueVisivel, ItemVitrine, Sinonimo, FiltrosInterpretados, ConsultaBusca, ResultadoBusca, FonteCatalogo, PerguntaCatalogo, RespostaCatalogo. Único ajuste em contrato existente: StockByBranch.updated_at opcional/nulo (compatível).
- modules/catalogo/manifest.ts: retirado integracao.produto.atualizado@1 de consome (pedido R-20261031-123834); `acoes` declaradas; `admin` incluído em `perfis`. package.json não precisou de `./domain` (promotor e pesquisa também não exportam; os módulos usam import relativo).

## Testes e checagens
- Módulo: 206 testes (14 arquivos) verdes; `pnpm --filter @macuxi/catalogo lint`, `typecheck` e `test` verdes; `pnpm fronteiras` sem violação; `node scripts/coord.mjs verificar modulo-catalogo --base origin/main` sai 0 (26 arquivos, nenhuma violação).
- Raiz: `pnpm lint` e `pnpm typecheck` verdes (18/18). `pnpm test`: tudo verde (16 de 17 tarefas turbo + test:tests 127 passados / 103 pulados) EXCETO modules/core api/autenticacao.test.ts (login, refresh, bloqueio), que falha no ambiente Linux/Node 22 (< 24.7), como o gerente avisou; sem relação com o Catálogo.

## Premissas / perguntas de produto para o Alexandre (detalhe e justificativa em regras.md)
- P-1 O doc 03 §2 não tem linha do Catálogo. Assumi: produto.consultar e produto.perguntar para vendedor, promotor, supervisor, gerente, analista, assistente e admin; produto.enriquecer, sinonimo.gerenciar, destaque.gerenciar e busca.ver_sem_resultado só analista e admin. Por isso `admin` entrou em `perfis` do manifesto. Sugiro acrescentar a linha na matriz do doc 03 (e ao espelho .coord/contratos/modulos.md e manifestos-referencia.test.ts do SDK, que ainda listam o catálogo sem admin e sem acoes).
- P-2 Categoria só vira filtro com palavra de apoio ("categoria", "linha"); marca por vocabulário do tenant dispensa a palavra.
- P-3 Preço: cliente com tabela e item fora dela = sem preço (sem fallback para a tabela padrão); tabela da condição prevalece sobre a do cliente quando tem o item; vigências simultâneas = início mais recente, empate maior preço; várias promoções = a de menor preço final, sem somar.
- P-4/5/6 Estoque: faixa "baixo" até 10 unidades; número exato visível por padrão (tenant pode esconder); "desatualizado" após 24 h. Vendedor sem filial vinculada não vê estoque.
- P-7 Limite de IA: a chamada ao provedor conta mesmo se falhar; cache, offline e busca simples não contam. Limite 0 desliga a IA.
- P-8/9/10 Cache 10 min só para consultas repetidas (recomendo cachear a interpretação, não resultado com preço/estoque); pesos do ranking (semântico 0,4; estoque 0,10; mais vendido 0,10; campanha 0,05); Pergunte com até 6 fontes / 6.000 caracteres.

## Pendências
- Fora do escopo desta tarefa: api/ia (implementações das portas, rotas /v1/catalogo), telas do app e páginas do BKO, banco (`vendas` recentes, destaque/campanha e `busca_log` precisam de desenho do banco-dados), FTS5 no aparelho (T-0008).
- Sem ajuste em arquivos fora do escopo; nada quebrou fora do módulo (o único vermelho é o do Core, de ambiente).
