---
id: R-20261107-200614-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T20:06:14-04:00
---
# T-0111 etapa 1: ADR 0033 e motor de permissões no SDK (chaves, fábrica, pode, limites travados, ctx.usuario.perfis); pedidos ao banco-dados e ao modulo-core; lotes

## Contexto
T-0111 etapa 1 (o MOTOR, não a página), junto com a T-0094. Decisões R-20261107-185546 e R-20261107-173950 c; aviso R-20261107-191310; ok do desenho em R-20261107-195349.

## O que fiz
1. **ADR 0033** (proposta) `docs/decisoes/0033-motor-de-permissoes-por-perfil.md` + linha no README; registro novo `.coord/contratos/permissoes.md`.
   - Chaves estáveis: as da plataforma no SDK (`acesso.campo|gestao|bko|portal`, `dados.escopo` com nível, `usuario.criar|editar|desativar`, `senha.redefinir` com perfis-alvo, `perfil.gerir`); as dos módulos são as ações que já existem no manifesto, agrupadas por área (pedidos, catálogo, trade, pesquisa, treinamento, metas, clientes, gestão, integração). Nenhum nome muda.
   - Padrão de fábrica = plataforma + `perfis` do manifesto; o banco guarda só o que o tenant mudou (ação nova chega a todos sem migração).
   - Perfil de fábrica (código = base) × personalizado (base imutável, herda onde entra, escopo e ações).
   - Multiperfil: união; RN-CORE-33 e RN-PRO-01 pela regra mais restritiva.
   - Limites travados: RN-CORE-33, RN-PRO-01, escopo ≤ base, senha nunca do próprio nem de admin, último admin com gestão, autogestão, RN-CORE-32 sem chave que a desligue.
   - Consulta a cada requisição em `ctx.usuario.perfis`, sem JWT; licença antes da permissão; `superficie: 'bko'` passa a consultar `acesso.bko`.
2. **SDK** `packages/platform-sdk/src/permissoes-perfil.ts` (novo, exportado): `pode(perfis, chave, alvo?)`, `nivelPermitido`, `escopoDosPerfis`, `podeEntrar`, `combinarPerfis`, `resolverPerfil`, `matrizDeFabrica`, `catalogoDePermissoes`, `travaDaChave` (cadeado), `validarPerfil` e `validarAcessoDoTenant` (limites, funções puras). Integração: `UsuarioDaRequisicao.perfis`, `ContextoBase.permissoes` (catálogo + matriz para o Core), `exigirPermissao` (403), `verificarAcao`/`criarPermissoes` consultam o motor quando há perfis, `verificarAcesso` aceita qualquer base, `validarConjunto` recusa manifesto com chave da plataforma, `uniaoDosModulosDosPerfis` (T-0112).
3. **API** (`apps/api/src/app.ts`, `licencas.ts`): preenche `ctx.usuario.perfis` por requisição (hoje o perfil de fábrica do token, comportamento idêntico; super-admin = Admin de fábrica) e `ctx.permissoes`; RN-PRO-01 da rota vale se QUALQUER perfil for promotor; `LicencasUsuario.perfis` pronto para a leitura do banco.
4. **Recados**: banco-dados R-20261107-195859 (tabelas `plataforma.perfil`, `perfil_permissao`, `usuario_perfil`, `perfil_modulo` por código, semeadura dos 7 perfis e de `usuario_perfil` em todos os tenants, nenhum usuário sem perfil; recomendei 0041 em cima da 0040, decisão dele); modulo-core R-20261107-195914 (trocar `usuario.gerir` e as checagens fixas da T-0094 pelas chaves; limites por `validarAcessoDoTenant`; login por `podeEntrar`).

## Testes
- platform-sdk: lint, typecheck e test com código 0 (661 testes; 29 novos em `permissoes-perfil.test.ts`, inclusive equivalência fábrica × manifesto em todas as ações × perfis).
- apps/api: typecheck e eslint dos arquivos tocados com 0; testes sem banco das rotas (app, sync, super-admin, consultas, conector, auditoria, arquivos, conteúdo) 171 verdes. `coord verificar engenheiro-software` OK. Sem Docker.

## Lotes (proposta)
- **Lote 1, com a T-0094:** SDK + ADR + API (feito); modulo-core fatia C troca as checagens fixas (pedido enviado); banco-dados 0041; depois dela, eu ligo a leitura dos perfis em `licencasDoBanco` e a `superficie: 'bko'` por `acesso.bko` (fatia S).
- **Lote 2, a página (ok do dono):** Core rotas `/v1/core/perfis` + contratos + auditoria + campo Perfis múltiplo + escopo por `escopoDosPerfis` + `promotor_ve_pedidos`/`promotor_ve_preco_estoque` migrados para chaves; designer-ux spec; engenheiro-apps `GET /v1/me/modulos` com as chaves efetivas e shell escondendo pelo servidor (eu publico o campo no contrato); níveis por ação (pedido, aprovar, metas) por módulo; testes: suíte de permissão multi-tenant e multiperfil.

## Pendências e decisões para você/o dono
1. **Registrar RN-CORE-35 "Limites dos perfis de acesso"** no doc 03 (último admin, autogestão, alvo de senha admin, perfis de fábrica, base imutável). O código já usa `RN-CORE-35`.
2. **Confirmar com o dono:** pela regra mais restritiva, **vendedor + promotor NÃO cria pedido** (RN-PRO-01 pelo perfil promotor), coerente com o esclarecimento do doc 03. Se ele quiser que esse usuário venda, a troca é uma linha em `combinarPerfis`.
3. Premissas: `acesso.bko` de fábrica já sem o supervisor (RN-CORE-33); `PERFIS_DO_APP` fica como legado do shell até a fatia S/lote 2. Não mexi em `PERFIS_DO_APP` (fatia S da T-0094, com o teste `demo-matriz`).
4. A ADR 0033 está como proposta; aceite pelo seu ok.
