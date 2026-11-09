---
id: R-20261101-060249-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0030
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T06:02:49-04:00
---
# Auditoria das Alçadas: trocar /audit-log (Fase M) por GET /v1/auditoria

## Contexto
T-0030 D-B29: existe a rota de plataforma GET /v1/auditoria (contrato em @macuxi/platform-sdk: ROTA_AUDITORIA, AuditoriaQuerySchema {modulo?, entidade?, limite<=300, cursor?}, AuditoriaRespostaSchema {itens[{id, modulo, acao, entidade, entidade_id, usuario_id, usuario_nome, antes, depois, ocorrido_em}], proximo_cursor}). Licença, escopo e RLS na API.

## O que preciso / o que mudou
modules/vendedor/web/lib/queries.ts useAuditLog ainda chama /audit-log (404) e é usado em components/alcadas/discount-editor.tsx. Quando a página de Alçadas for migrada (T-0029), use api(ROTA_AUDITORIA sem /v1, {query:{modulo:'vendedor', entidade:'<a sua entidade de tx.auditar>'}}) e AuditoriaRespostaSchema.parse. Exemplo pronto: apps/web/lib/queries.ts useAuditoria.

## Pronto quando
Nenhuma chamada a /audit-log em modules/vendedor/web.
