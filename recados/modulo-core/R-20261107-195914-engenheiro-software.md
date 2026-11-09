---
id: R-20261107-195914-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:59:14-04:00
---
# T-0111/T-0094: trocar as checagens fixas por perfil pelas chaves do motor (usuario.*, senha.redefinir, acesso.*) e os limites por validarAcessoDoTenant

## Contexto
T-0111 (motor de permissões; entra com a T-0094) e aviso R-20261107-191310 (nada de regra fixa por perfil). ADR `docs/decisoes/0033-motor-de-permissoes-por-perfil.md`; registro `.coord/contratos/permissoes.md`. Já disponível em `@macuxi/platform-sdk` (`src/permissoes-perfil.ts`, `src/api.ts`):
- chaves da plataforma `CHAVES_PLATAFORMA`: `acesso.campo|gestao|bko|portal`, `dados.escopo` (nível), `usuario.criar`, `usuario.editar`, `usuario.desativar` (nunca o próprio), `senha.redefinir` (perfis-alvo; nunca o próprio nem perfil de base admin), `perfil.gerir`. Fábrica = só o admin (P2/P7);
- consulta: `pode(ctx.usuario.perfis, chave, alvo?)`, `exigirPermissao(ctx.usuario, chave, alvo?)` (403 PERFIL_SEM_ACESSO), `podeEntrar(perfis, 'campo'|'gestao'|'bko'|'portal')`, `escopoDosPerfis`, `nivelPermitido`, `temPerfilDeBase`; a rota pode declarar `acao: 'usuario.criar'` (licença + motor em `verificarAcao`);
- limites na escrita: `validarAcessoDoTenant({ antes, depois, atorId, matriz, catalogo })` → `ViolacaoLimite[]` com `codigo`, `regra` (RN-CORE-01/04/33, RN-PRO-01, RN-CORE-35 proposta) e mensagem pronta (ULTIMO_ADMIN, AUTOGESTAO, USUARIO_SEM_PERFIL, TRAVA_DO_PERFIL…); `validarPerfil`; `travaDaChave(base, chave)` para o cadeado;
- `ctx.usuario.perfis` já vem preenchido pela API (por ora o perfil de fábrica do token: comportamento igual ao de hoje) e `ctx.permissoes` traz `{ catalogo, matriz }` (o Core não importa manifesto alheio).

## O que preciso
Agora, na fatia C da T-0094:
1. Manifesto do Core: tirar `usuario.gerir` (manifesto não pode declarar chave da plataforma; `validarConjunto` acusa). Rotas: criar e Equipe por CSV → `acao: 'usuario.criar'`; editar → `'usuario.editar'`; ativar/desativar → `'usuario.desativar'`; redefinir senha e "Enviar acesso" → `'senha.redefinir'` e, no `executar`, `pode(ctx.usuario.perfis, 'senha.redefinir', { proprio, perfis: [{ codigo, base }] do alvo })`. `usuario.ver` e `modulo.gerir_licencas` ficam.
2. Domain: `podeGerirUsuarios`, `podeRedefinirSenha` e `avaliarAlteracaoDeUsuario` deixam de comparar com `'admin'`: o ator passa a ser os perfis dele (`pode`); último admin, autorrebaixa e autodesativação viram `validarAcessoDoTenant` (antes/depois do tenant, `atorId`), 422 com a `regra` no `codigo`. As mensagens SENHA_PROPRIA/SENHA_DE_ADMIN podem ficar como texto da recusa.
3. Login (`app`): `perfilUsaApp` → `podeEntrar(perfis, app === 'web' ? 'bko' : app)`. Até a tabela nova chegar, `perfis = [resolverPerfil(perfilDeFabrica(usuario.perfil), matrizDeFabrica([]))]` (as chaves `acesso.*` são só da plataforma, então a matriz sem manifestos basta numa rota pública). Portal do admin do cliente: "é admin" → `podeEntrar(perfis, 'portal')`. `podeAcessarBko`/`PERFIS_DO_BKO` → `podeEntrar(..., 'bko')`.
4. Avise o gerente da lista do que foi trocado (pedido do aviso R-20261107-191310).
Lote 2 (a página, com o ok do dono R-20261107-195349): rotas `/v1/core/perfis` (`acao: 'perfil.gerir'`, `superficie: 'bko'`), contratos Zod em `core/contracts` com os tipos do SDK, auditoria `perfil.alterar` (antes/depois das sobreposições), validação por `validarAcessoDoTenant`, cadeado por `travaDaChave`, campo Perfis (múltiplo) no usuário, escrita em `plataforma.perfil*` e `usuario_perfil` (nomes exatos virão do banco-dados), `carteira`/`usuariosVisiveis` por `escopoDosPerfis`, e `promotor_ve_pedidos`/`promotor_ve_preco_estoque` migrados para as chaves `pedido.ver`/`produto.ver_preco_estoque` dos perfis de base promotor.

## Pronto quando
Nenhuma checagem de acesso do Core da T-0094 compara perfil com nome fixo; testes do domain citando RN-CORE-33/34/35 e RN-CORE-01; recado ao gerente com o que foi trocado; revisão comigo.
