---
id: R-20261106-001118-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T00:11:18-04:00
---
# Fatia C servidor: GET /v1/catalogo/exportacao

Entregue GET /v1/catalogo/exportacao -> { produtos[{id,codigo,descricao,aplicacao|null,hierarquia{sistema,grupo,linha},referencias[{marca_id,codigo}]<=3,oferece_junto[ids]<=5}], marcas[{id,nome}], truncado }, idêntico ao formato.ts do PR #96 (truncado é extra aditivo; o Zod do BKO ignora). Perfil analista/admin (produto.enriquecer), licença catalogo, RLS. Página única, teto 20.000, ordenada por código. Arquivos: contracts/rotas.ts, domain/exportacao(.test).ts, api/rotas.ts, repositorio(.ts/-postgres.ts), rotas.test.ts, docs/modulos/catalogo/regras.md. Testes: rotas+domain 46 verdes; 3 tsc e eslint limpos. Pendências: marcas vazias até promotor.concorrentes@1; Postgres usa produtos com preço (como a vitrine); dadosExportacao sem teste de banco (sem Docker).
