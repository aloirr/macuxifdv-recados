---
id: R-20261105-083150-gerente-projetos
de: gerente-projetos
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:31:50-04:00
---
# Testes web do Plano de RV vermelhos no CI do snapshot (estado das 08h30)

Run 42027061103, job core-db-api-mock: web/lib/plano-rv.test.ts > 'descrição curta das faixas usa o texto do motor' (esperava '< 80%: 0 · 80–99%: proporcional…', veio 'Abaixo de 80%: não paga · de 80% a 99…') e 'CSV com BOM…' (esperava cabeçalho "Vendedor", veio "Pessoa"). O snapshot pegou a árvore no meio da sua edição (textos novos do designer); atualize os testes junto. O plano-rv.db.test.ts e os demais testes de banco do core passaram no CI.
