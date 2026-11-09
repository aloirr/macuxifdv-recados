---
id: R-20261102-225039-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-treinamento]
tipo: revisao
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:50:39-04:00
---
# Revisão PR #63 (Treinamento no Postgres): sem 🔴; 2 🟡 (usuários só com atividade, filtro do pull após o limit)

## Contexto
Revisão do PR #63 (T-0058, nuvem/T-0058-repositorio-sql-limpo @ 084b377) contra origin/main 1fceee7, por diff (sem testes de banco locais). CI: governança, lint, testes dos pacotes e de integração verdes; typecheck ainda sem conclusão quando olhei — conferir antes do merge.

## Resultado
### 🔴 Bloqueia o merge
Nenhum.

### 🟡 Corrigir
1. **Usuários só "com atividade"** (api/repositorio-postgres.ts, `usuarios()`): a lista vem da união de xp/progresso/tentativa/medalha + `core.cadastro_resumo@1`, com `equipe_id`/`regional_id` nulos e `ativo = true`. Efeitos: (a) o painel de adesão (RF-TRE-05) não conta quem nunca começou — o denominador encolhe e a adesão aparece inflada; (b) ranking/painel por equipe ficam vazios; (c) usuário inativo segue no ranking. Aceitável para a demo se o painel avisar "base parcial"; o certo é a consulta `core.usuarios_resumo@1` (pedido R-20261102-131733-2 ao modulo-core). Registrar como pendência no quadro.
2. **Pull de `trilha` filtra depois do `limit`** (api/sync.ts:107-110 sobre `trilhasDesde`): rascunho e trilha fora do público são descartados após a página de `limite` linhas. Página inteira descartada = página vazia, que o motor pode tomar como fim do pull. Hoje é raro (poucas trilhas), mas mova o filtro de status para o SQL (`status <> 'rascunho' or deleted_at is not null`) ou devolva o cursor da última linha lida.

### 🟢 Sugestões
1. `inserirTrilha`/`inserirArvore` gravam `tenant_id` vindo de `ctx.usuario.tenant_id`; o padrão dos outros módulos é `plataforma.tenant_atual()` (o RLS `with check` já protege, então é só consistência).
2. Árvore regravada por delete+insert a cada edição de rascunho: ok para o volume do BKO; se a trilha crescer, comparar por id.

### Conferido sem ressalva
- Tudo dentro de `ctx.comTenant` (RLS); nenhum SQL fora de `treinamento.*`; usuários pelo Core via `tx.consultar` (ADR 0012, regra 1).
- Aluno append-only com `on conflict do nothing` pela chave natural + `pg_advisory_xact_lock(tenant:usuário)`: reenvio não duplica XP (idempotência).
- Publicar/arquivar com update condicional ao status anterior (409 `TRILHA_STATUS_MUDOU`) e linha do tempo `trilha_publicacao`; carimbos do banco devolvidos na resposta.
- Consultas em série na mesma conexão da transação (correto com `pg`).
- Cursor do pull em microssegundos `(updated_at, id)`, incluindo removidas.

## Pronto quando
Typecheck do PR verde. 🟡 1 e 2 podem ir em PR seguinte (registrar no quadro).
