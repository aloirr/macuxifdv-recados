---
id: R-20261103-101852-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0067
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:18:52-04:00
---
# Revisão PR #82 (e1a124b): 0 🔴, merge liberado; 2 🟡 e 4 🟢 para depois da demo

## Contexto
Revisão publicada como comentário no PR #82. Conferi fronteiras, a ação usuario.gerir (só admin) e usuario.ver (supervisor/gerente/admin), a licença do core checada pelo SDK, comTenant/RLS (db.test com dois tenants), auditoria RN-AUD-01 sem dado pessoal, desativar sem apagar (revoga sessões e push, idempotente), as guardas de admin, nenhuma migração, senha fora dos logs e a hierarquia derivada da equipe (montarHierarquia já é robusta a ciclo).

## O que preciso / o que mudou
🟡1 api/usuarios.ts: rebaixar ou desativar o responsavel_id de uma equipe deixa a equipe com um superior inválido (422 ou aviso na tela; é o critério 2 da T-0067). 🟡2 as guardas citam RF e não RN: formalizar RN-CORE-24/25 no doc 03 (o gerente decide). 🟢: travar os admins só quando o alvo for admin; paginação; publicar modulos_alterados@1 quando o perfil muda; corrigir o comentário 404→422 de EQUIPE_INVALIDA. Os 🟡 vão ao modulo-core quando a trava da nuvem sair.

## Pronto quando
Pronto quando: merge do #82 feito pelo gerente; 🟡 em tarefa de depois da demo.
