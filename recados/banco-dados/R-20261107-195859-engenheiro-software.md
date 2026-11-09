---
id: R-20261107-195859-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:58:59-04:00
---
# T-0111: tabelas perfil, perfil_permissao e usuario_perfil, semeadura dos 7 perfis de fábrica e nenhum usuário sem perfil (0041 ou na 0040)

## Contexto
T-0111/T-0112 (decisões do dono R-20261107-185546 e R-20261107-173950 c; desenho aprovado em R-20261107-195349). O motor de permissões está no SDK: `packages/platform-sdk/src/permissoes-perfil.ts`, ADR `docs/decisoes/0033-motor-de-permissoes-por-perfil.md`, registro `.coord/contratos/permissoes.md`. Modelo: padrão de fábrica (chaves da plataforma no SDK + `perfis` das ações dos manifestos) e o banco guarda SÓ o que o tenant mudou. Perfil de fábrica: código = perfil base, não apaga. Perfil personalizado: código próprio, base imutável. Usuário com 1+ perfis. A API lê tudo a cada requisição junto com as licenças (`apps/api/src/licencas.ts`).

## O que preciso
Você decide se entra na 0040 (se ainda não foi ao main) ou numa 0041; recomendo 0041 em cima da 0040, para não prender o lote da T-0093/T-0094.
1. `plataforma.perfil`: colunas comuns (regra 5) + `codigo text` (regex `^[a-z][a-z0-9_]{1,39}$`, único por tenant entre os não apagados), `nome text`, `descricao text null`, `base text` (CHECK = PERFIS do SDK), `fabrica boolean`, `ativo boolean`. CHECK: `fabrica` implica `codigo = base`.
2. `plataforma.perfil_permissao`: colunas comuns + `perfil_id` (FK perfil), `chave text` (regex `^[a-z][a-z0-9_]*\.[a-z][a-z0-9_]*$`), `concedida boolean`, `nivel text null` (CHECK = `NIVEIS_ESCOPO` ∪ `NIVEIS_ALCADA` do SDK), `alvos text[] null` (códigos de perfil ou `*`). Única por (tenant, perfil, chave) entre os não apagados. NÃO semeie linhas aqui: tabela vazia = padrão de fábrica.
3. `plataforma.usuario_perfil`: colunas comuns + `usuario_id`, `perfil_id`; única por (tenant, usuario, perfil) entre os não apagados; índice por (tenant_id, usuario_id).
4. `plataforma.perfil_modulo`: o perfil passa a ser o CÓDIGO do perfil do tenant (sai o CHECK do enum; FK para o perfil). As linhas atuais já são códigos de perfis de fábrica.
5. Semeadura em TODOS os tenants (base e demo): os 7 perfis de fábrica (`codigo = base`, `nome` = `ROTULO_PERFIL` do SDK, `fabrica = true`, `ativo = true`) e um `usuario_perfil` para cada `core.usuario` (ativos e inativos) pelo `perfil` atual. No fim da migração, conferência: nenhum usuário sem perfil (raise se sobrar). `provisionar_tenant` e `sa_provisionar_tenant` criam os 7 e ligam o admin inicial ao Admin. Seeds: demo e fixture dois-tenants (com um usuário de 2 perfis, ex.: vendedor + promotor, para os testes do T-0112).
6. `core.usuario.perfil` fica por enquanto (perfil principal, vai no token): sugestão de garantia de que ele está entre os perfis do usuário (decida a forma).
7. RLS como `perfil_modulo` (o `macuxi_app` lê e escreve no tenant; o worker não precisa; o portal só por `sa_*` se precisar). Auditoria fica no Core (plataforma.auditoria).
8. Teste estático: CHECKs batem com `PERFIS`, `NIVEIS_ESCOPO`, `NIVEIS_ALCADA` e `CODIGO_PERFIL_RE` do SDK (como o `estatico.test.ts` faz com `PERFIS`).

## Pronto quando
Migração up/down + Drizzle + seeds + testes do `@macuxi/db` verdes no CI, e recado para mim e para o modulo-core com os nomes exatos (tabelas, colunas, índices). Eu ligo a leitura por requisição na API; o Core liga a escrita e a página.
