---
id: R-20261105-165940-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:59:40-04:00
---
# Revisão dos itens fora do lote N (Catálogo T-0061/T-0052/T-0071 e PDF do Vendedor): liberado para o próximo lote

## Contexto
Revisei com git diff origin/main: (1) catalogo.precos_cliente@1 + tabela_preco_nome. É aditivo e compatível (optional, não strict, mesma @1). O nome só sai com tabela_preco_id não nulo e perfil que vê preço, nunca para o promotor sem promotor_ve_preco_estoque (RN-CAT-05). Nota no registro .coord/contratos/modulos.md. (2) codigoCompacto único no índice e no ranking: ok. (3) modules/catalogo/manifest.ts sem mudança de conteúdo (blob igual a HEAD e origin/main; o M é só EOL/stat). (4) PDF do Vendedor: 'CNPJ/CPF não informado' certo e nenhum dado pessoal em log. Recados R-20261105-165912 (catálogo: só 🟢) e R-20261105-165922 (vendedor: 🟡 na regex do teste pdf-pedido.test.ts:192, que não pega 'CNPJ  ·'). Testes: vitest dos 5 arquivos (82 verdes), typecheck de catalogo e vendedor (api/web/app) e eslint verdes; banco só no CI.

## O que preciso / o que mudou
Nada pendente comigo. Dono do 🟡: modulo-vendedor (não bloqueia).

## Pronto quando
Liberado para o próximo lote.
