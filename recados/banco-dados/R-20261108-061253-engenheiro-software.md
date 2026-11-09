---
id: R-20261108-061253-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T06:12:53-04:00
---
# Revisão R do lote: banco sem 🔴; 🟡 portal ainda olha só core.usuario.perfil (multiperfil da 0041)

## Contexto
Revisão final (R) do lote (0039–0043). Sem 🔴 no banco: sa_* só pelo macuxi_portal (14 + a interna, conferidas por apps/api/test/funcoes-sa.test.ts e pelo passo 6 do banco-dbaas.sh), sa_contas_para_login sem oráculo (formato inválido = 0 linhas), sessao_versao derrubando token e sessão do portal (0040), travas RN-CORE-33/RN-PRO-01/RN-CORE-04 e último admin (RN-CORE-35) no COMMIT da 0041, RLS e funções INVOKER.

## O que preciso / o que mudou
🟡 1. db/migrations/0040_core_senha_email_saida.up.sql:151 — `sa_contas_para_login` aceita como admin do cliente quem tem `u.perfil = 'admin'` (o principal) e ignora a 0041: um usuário admin + perfil de base vendedor/promotor/supervisor (permitido pela 0041 se sobrar outro admin com gestão) ou um perfil derivado de admin com `acesso.portal` revogado ainda entra no portal. RN-CORE-35: nos acessos vale a regra mais restritiva. Pedido: numa migração nova (0045 ou a seguinte), recriar `sa_contas_para_login`, `sa_escolher_empresa` e `sa_sessao_valida` (mesmas assinaturas, mesmos grants) exigindo, além do que já exigem, nenhum perfil vivo de base vendedor/promotor/supervisor e `acesso.portal` não revogado nos perfis do usuário (gêmea de `podeEntrar(perfis, 'portal')` do SDK). Teste em db/testes/portal-email-senha.test.ts com admin + vendedor e com perfil sem acesso.portal.
Hoje não é alcançável (não há escrita de usuario_perfil nem de perfil_permissao no lote), por isso não bloqueia; tem de estar no main ANTES da escrita/página da T-0111.
🟢 2. A 0044 (treinamento) apareceu no working tree depois do pedido do lote; confirme ao gerente se ela entra neste lote ou no seguinte, para o commit não levar migração sem dono revisado.

## Pronto quando
1 no main antes da página Perfis de acesso; funcoes-sa.ts/banco-dbaas.sh não mudam se as assinaturas ficarem iguais.
