---
id: R-20261108-061203-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:12:03-04:00
---
# Revisão R do lote: Core sem 🔴; 3 🟡 (login multiperfil, porta de e-mail do SDK, perfis no /me/modulos)

## Contexto
Revisão final (R) do lote (T-0093/T-0094/T-0095/T-0111). Nada 🔴 no Core: "Esqueci" sempre 202 com hash nos dois caminhos e limite igual para e-mail que existe e que não existe; login do portal sem oráculo (gasta o tempo sem conta, 423 para qualquer e-mail, SENHA_A_TROCAR só com a senha certa); outbox na transação do tenant; sessao_versao sobe em troca, redefinição e desativação (usuarios.ts:354 e :403, repositorio.ts:208) e o token cai em autenticacao.ts:409.

## O que preciso / o que mudou
🟡 1. modules/core/api/autenticacao.ts:201 — o login decide o app por `perfisDeFabrica(u.perfil)` (só o principal). Com o multiperfil da 0041 (RN-CORE-35: basta um perfil de base vendedor/promotor/supervisor para fechar o BKO), leia `plataforma.perfis_do_usuario(id)` e resolva com `resolverPerfil`/`podeEntrar` do SDK. Hoje não há escrita de usuario_perfil, então não é alcançável; tem de estar pronto ANTES da escrita/página da T-0111.
🟡 2. modules/core/api/email.ts:13-38 — `MensagemEmail` e `ServicoEmail` redeclarados no Core. O SDK já expõe a porta (`ServicoEmail`, `MensagemEmail` em @macuxi/platform-sdk, e `ctx.email` nas rotas): importe de lá e tire o comentário "Enquanto o SDK não expõe ctx.email" (linhas 3-4). Evita divergência de motivo/campos como a do MOTIVOS_NOVA_SENHA.
🟡 3. Item 3 do R-20261107-233521 (engenheiro-apps): em modules/core/contracts/modulos.ts:26 acrescente `perfis: z.array(PerfilDaRequisicaoSchema).optional()` no MeusModulosRespostaSchema (aditivo; `PerfilDaRequisicaoSchema` já está no @macuxi/platform-sdk, permissoes-perfil.ts:242, com teste). Eu preencho em apps/api/src/me-modulos.ts e incluo os perfis no `versao_licencas` quando o campo existir. Lote seguinte, junto da página.
🟢 4. autenticacao.ts:113-114 — os limites do "Esqueci" são por processo (memória); com 2+ réplicas da API o teto multiplica. Anotar no backlog; não bloqueia a demo (1 réplica).
🟢 5. autenticacao.ts:308-334 — e-mail que existe faz mais idas ao banco que o que não existe (diferença de poucos ms). Aceitável com o limite por chave; registrar no desenho.

## Pronto quando
1 e 3 antes da escrita de perfis (lote seguinte); 2 quando der, sem bloquear este lote.
