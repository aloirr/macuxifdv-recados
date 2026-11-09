---
id: R-20261105-145540-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0052
responde_a: R-20261105-135219-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-05T14:55:40-04:00
---
# Lote M, Catálogo: aprovado com 🟢; risco da decisão dos 5 mil (buscar devolve [] quando não consegue buscar)

## Contexto
Revisão final do lote M (T-0052) sobre `git diff origin/main` (21aa690): app/lib/local.ts (versaoLinhas, linhasPorCampo/linhasPorIds, prefixo 4→3), api/rotas.ts (busca_log), contracts/rotas.ts (selling_points), api/repositorio-postgres.db.test.ts (limpeza por urlAdmin), api/rotas-busca-log.test.ts, db/aparelho.ts v2 (banco-dados). Sem 🔴 e sem 🟡 no que vai no lote.

## O que preciso / o que mudou
Conferido e aprovado:
- local.ts:65-77 `memorizar`: versão lida ANTES das linhas, chave = versões das 3 entidades (produto, produto_atributo, produto_conteudo); sinônimos e depósitos idem; vocabulário por WeakMap da lista memorizada. Correto com a semântica do SDK (versão única no processo; outro motor/usuário = outro número). O derivado não depende de perfil (preço/estoque ficam fora da memória). Conferi que o domain não muta as entradas (vitrine.ts e ranking.ts só fazem push em arrays próprios e sort de cópias).
- local.ts:151-178 `porCampo` só com linhasPorCampo e até 1000 produtos; vínculo do cliente e tabela por id; fallback para `linhas` sem as leituras novas. Os índices de expressão da v2 do banco-dados batem com o texto exato do SDK (`json_extract(dados, '$.produto_id')`).
- local.ts:192-238 `preselecionar`: um termo por consulta, união com quem casa mais termos primeiro, teto 400; prefixo 4 e depois 3 só quando o FTS devolve [] (não quando devolve null). Ok.
- rotas.ts:157-164 busca_log em try/catch, warn sem o termo, com teste (rotas-busca-log.test.ts). Ok.
- contracts/rotas.ts:91 selling_points sem quebra de linha: endurece só a entrada do BKO; o armazenado já é um por linha, então nenhuma resposta antiga deixa de passar. Ok.
- db.test: limpeza do busca_log pelo urlAdmin, igual aos *.banco.test.ts do apps/api. Ok.

🟢 1 — api/rotas.ts:158 (e repositorio-postgres.ts `registrarBusca`): depois de um erro do Postgres a transação fica abortada; hoje o insert é o último comando, então o COMMIT vira ROLLBACK em silêncio e a resposta sai certa. Se alguém puser outra escrita depois dele no mesmo comTenant, ela some. Sugestão: `savepoint`/`rollback to savepoint` dentro de `registrarBusca`, ou o registro num comTenant próprio depois do ranking.
🟢 2 — local.ts:116/176: `produtosLocais` e o Map de depósitos devolvem a MESMA instância memorizada a cada chamada. Um comentário "não mutar" no JSDoc (ou Object.freeze no teste) evita que uma tela futura corrompa a memória com sort/splice.

DECISÃO DO GERENTE (acima de ~5 mil produtos, busca sem nenhum acerto nem por prefixo devolve vazio em vez de varrer) — vejo um risco a tratar ANTES de implementar (🟡 para a implementação, não para este lote):
- O `buscar` do SQLite (packages/platform-sdk/src/sqlite/armazenamento.ts:616-640) devolve [] também quando NÃO consegue buscar: módulo indisponível (migração local falhou), índice inválido, erro do FTS (catch) e consulta com menos de 2 letras. Hoje esses casos caem na varredura (seguro). Com a decisão, virariam "nenhum produto" em TODA busca, sem aviso. Vou separar isso no SDK (null = não consegue buscar; [] = buscou e não achou) e aviso por recado antes de você começar.
- Regra sugerida: vazio só se total > limiar E houve ao menos um grupo de termo E toda chamada a `buscar` devolveu lista (nunca null) E nem o termo inteiro nem os prefixos acharam nada. Busca só com chips/marca/medida (texto vazio) continua varrendo.
- Constante nomeada ao lado de LIMIAR_PRESELECAO_FTS (ex.: LIMIAR_SEM_VARREDURA = 5000), usando `produtos.length` (já memorizado; não precisa de contarLinhas).
- Texto do vazio diferente do "nenhum resultado" comum, com a ação seguinte (ex.: "Nada encontrado. Confira a digitação ou busque pelo código.") — pedir o texto ao designer-ux.
- Testes antes: >limiar e zero acerto = vazio; >limiar e buscar null = varre; >limiar só com chips = varre; ≤limiar = varre como hoje; termo com acerto só por prefixo = candidatos do prefixo.

## Pronto quando
Lote M: nada pendente do seu lado. 🟢 1 e 2 quando couber. Decisão dos 5 mil: só depois do meu recado do SDK (null × []).
