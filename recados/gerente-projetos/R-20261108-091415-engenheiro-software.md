---
id: R-20261108-091415-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:14:15-04:00
---
# T-0111 NÃO vai no lote como está: 🔴 A senha de admin (Core), 🔴 B it.fails do D-MP1 (testes), 🔴 C D-MP2 aberto (banco)

## Contexto
Revisão final da T-0111 (entrega R-20261108-071028-modulo-core). Detalhe dos itens ao Core no recado de revisão R-20261108-091328-engenheiro-software. Verificações locais: lint do @macuxi/core 0 erros (2 avisos antigos de hora fixa), vitest do @macuxi/core 1353 passando (273 skipped, os de banco), pnpm typecheck da raiz 19/19, verificar engenheiro-software OK; testes de banco e de integração só no CI.

## O que preciso / o que mudou
Veredito: a T-0111 NÃO vai no lote como está. Três 🔴 bloqueiam o lote:
🔴 A (modulo-core) modules/core/api/usuarios.ts:418 — redefinição de senha avalia só o perfil principal do alvo: usuário [analista, admin] (principal analista) tem a senha redefinida, inclusive com senha informada, por quem tem senha.redefinir de analista/todos — tomada de conta de admin. Correção curta (perfis reais do alvo) + teste.
🔴 B (testes) D-MP1 está RESOLVIDO no código (autenticacao.ts:201 lê plataforma.perfis_do_usuario e decide com podeEntrar): os 4 it.fails '[D-MP1 aberto]' de tests/integracao/api/multiperfil-api-t0094.test.ts (linhas 217, 223, 243, 256) passam a reprovar o CI. Trocar por it no mesmo lote.
🔴 C (banco-dados) D-MP2 continua aberto: nenhuma migração depois da 0042 muda plataforma.sa_contas_para_login (0040) nem as reconferências (sa_abrir_sessao_portal, sa_escolher_empresa, sa_sessao_valida). Com a página gravando usuario_perfil e mostrando o interruptor "Portal de implantação" (acesso.portal), admin + vendedor entra no portal e revogar acesso.portal no perfil Admin não tem efeito no portal — contra RN-CORE-35. Saídas: (1) banco-dados entrega a correção (pedido R-20261108-062613-testes) neste lote e o testes troca o it.fails do MP-06d portal; ou (2) se não couber, o lote sai com a T-0111 só se o modulo-core travar no domain/API a combinação admin + outro perfil de base e esconder a linha acesso.portal da página até a correção — decisão sua (ou do Alexandre).
🟡 no Core (não bloqueiam): estado do tenant em editar/desativar usuário só pelo principal e pela fábrica (o COMMIT da 0041 segura o caso grave), mensagem do PERFIL_FORA_DO_APP pelo principal, apps do e-mail só do principal.

## Pronto quando
A, B e C resolvidos (ou C pela saída 2) e o CI verde na branch de verificação; aí a T-0111 entra no lote. Reviso o ajuste do 🔴 A assim que o Core avisar.
