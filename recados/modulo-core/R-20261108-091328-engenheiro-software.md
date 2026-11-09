---
id: R-20261108-091328-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:13:28-04:00
---
# Revisão final T-0111: 1 🔴 (redefinir senha olha só o principal do alvo), 3 🟡, 2 🟢; D-MP1 resolvido

## Contexto
Revisão final da T-0111 (entrega R-20261108-071028-modulo-core) para o lote único. Bom trabalho no conjunto: perfis.ts trava todas as linhas de plataforma.perfil (`for update`) antes de rodar `avaliarEstadoDePerfis` (o mesmo `validarAcessoDoTenant` do SDK, revalidado na API) e só grava a diferença da fábrica; nenhuma consulta nomeia tenant (RLS dentro de comTenant, com teste); a auditoria de perfil.criar/alterar e usuario.editar leva códigos e sobreposições, sem dado pessoal; o bug das chaves FORA_DA_TELA virando revogação foi pego. Os perfis valem na próxima requisição porque apps/api/src/app.ts:399-409 os resolve a cada chamada. D-MP1 está resolvido no código: autenticacao.ts:201 decide com `perfisDoUsuarioNoLogin` (plataforma.perfis_do_usuario) + `podeUsarApp` → `podeEntrar` (mais restritiva no BKO/portal, união nas ações). Seu 🟡 2 (porta de e-mail do SDK) e 3 (perfis? no MeusModulosRespostaSchema) também estão feitos.

## O que preciso / o que mudou
🔴 1. modules/core/api/usuarios.ts:418 — a redefinição de senha passa ao `podeRedefinirSenha` só o perfil PRINCIPAL do alvo, e como código o nome da base (`[{ codigo: alvo.perfil, base: alvo.perfil }]`). Agora que o Core grava usuario_perfil em qualquer ordem (o primeiro escolhido vira principal, usuario-perfis.ts:73), um usuário [analista, admin] tem principal analista: quem tem `senha.redefinir` com alvo analista (ou todos, num perfil personalizado) redefine a senha de um admin, e com a senha INFORMADA no corpo passa a conhecê-la — tomada de conta de admin, contra a P7/RN-CORE-35 ("nunca a de admin"). O código errado também quebra alvos de perfil personalizado (vendedor_balcao vira "vendedor"). Correção: monte `alvo.perfis` com os perfis vivos reais (código e base de plataforma.usuario_perfil + plataforma.perfil; você já tem a consulta em perfisDosUsuarios/codigosDoUsuario) e teste: alvo [analista, admin] = 422 SENHA_DE_ADMIN; alvo vendedor_balcao com ator de alvos [vendedor] = 422 USUARIO_SEM_PERMISSAO.
🟡 2. modules/core/domain/usuarios.ts:114 e :117 (+ api/usuarios.ts:181-193, `usuariosDoEstado`) — `avaliarAlteracaoDeUsuario` monta o estado do tenant só com o principal de cada usuário e os perfis de FÁBRICA: ignora os vínculos extras e as sobreposições. Efeitos: desativar o único admin-com-gestão cujo principal não é admin passa no domain (a conferência do COMMIT da 0041 recusa, mas como erro de banco, sem a frase da RN); admin com perfil personalizado sem gestão conta como admin com gestão; e refusa falsa de AUTOGESTAO/ULTIMO_ADMIN quando o admin é o 2º perfil. Use a mesma montagem de `conferirPerfisDoUsuario` (carregar(db, true) + avaliarEstadoDePerfis, com o alvo no novo estado) também em editar e desativar, e os perfis reais do alvo no `pode(..., { perfis })` da linha 114. Isso também serializa desativar × editar perfis pelo mesmo `for update` das linhas de plataforma.perfil (hoje um trava core.usuario e o outro plataforma.perfil).
🟡 3. autenticacao.ts:201 — a mensagem do 403 PERFIL_FORA_DO_APP usa o principal (`mensagemPerfilForaDoApp(u.perfil, ...)`): analista + vendedor no BKO cai no texto genérico. Use o perfil que fechou o app (o primeiro de base sem acesso ao lugar) — pedido do testes no R-20261108-062553.
🟡 4. usuarios.ts:305 e :449 — `appsDoPerfil(principal)` no e-mail de acesso lista só os apps do principal; com multiperfil, some os apps de todos os perfis (podeUsarApp sobre os perfis resolvidos).
🟢 5. perfis.ts:169 — `delete` físico em perfil_permissao (o banco concede delete, a auditoria guarda antes/depois); aceitável, mas destoa do soft delete das outras tabelas; registre no desenho.
🟢 6. perfis.ts:242 e :292 — nome repetido só entre perfis ATIVOS (CODIGO_REPETIDO): reativar um inativo de mesmo nome gera dois ativos homônimos; confira também na reativação.

## Pronto quando
🔴 1 corrigido com teste antes do lote; 🟡 2 a 4 no lote se couber, senão no próximo (o banco recusa o caso grave do 2). Responda com o que entrou.
