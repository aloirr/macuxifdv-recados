---
id: R-20261102-225209-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T22:52:09-04:00
---
# Revisão PR #66 (carga por arquivo): sem 🔴; 2 🟡 (limite de 1 MiB do corpo, retenção por prefixo de mensagem)

## Contexto
Revisão do PR #66 (T-0032, nuvem/T-0032-carga-arquivo @ 0529700) contra origin/main 1fceee7, por diff. CI todo verde (ci-ok SUCCESS). Só `modules/integracao/**` e docs do módulo.

## Resultado
### 🔴 Bloqueia o merge
Nenhum.

### 🟡 Corrigir
1. **Limite do corpo da carga por arquivo** (api/bko-carga-arquivo.ts + contracts/carga-arquivo.ts): o CSV vai como texto no JSON de uma rota de usuário `/v1/integracao`, que herda o `bodyLimit` padrão do Fastify (1 MiB), enquanto o conversor aceita até `limiteCorpoLoteBytes` (8 MiB no domain). Arquivo entre 1 e 8 MiB recebe 413 genérico do Fastify, sem a mensagem do módulo. Para a demo basta documentar "até ~1 MB por arquivo" em docs/modulos/integracao/carga-arquivo.md e no BKO; o limite por rota de usuário (`limiteCorpoBytes` em `RotaModulo`) é meu, no platform-sdk/apps/api, e entra depois da demo.
2. **Retenção por cadastro gravada com o código `mapeamento_ausente`** (domain/pedido-fila.ts, `PREFIXO_RETENCAO_CADASTRO` / `ehRetencaoPorCadastro`): distinguir por prefixo da mensagem é frágil (qualquer mudança de texto quebra o monitor). Pedir ao banco-dados o código próprio (`cadastro_incompleto`) no check da 0013/nova migração e trocar quando chegar; registrar no backlog.

### 🟢 Sugestões
1. Pedido retido por cadastro "não segue sozinho" (cancelar e refazer). Para o piloto, vale um reenvio do aprovado@1 pelo BKO (reprocessar a retenção quando o external_id chegar) — item de backlog do modulo-integracao/modulo-vendedor.
2. `loteExiste` filtra por `tenant_id` explícito além do RLS: ok (defesa em profundidade); mantenha o padrão.

### Conferido sem ressalva
- Carga por arquivo reusa `gravarLote` (idempotência RN-INT-12 com chave obrigatória e hash do conteúdo, 409 para chave repetida com conteúdo diferente), `validarEnvelope` e o consumidor A7: um só pipeline.
- Ação `carga.arquivo` (admin/analista) no manifesto e em `domain/permissoes.ts`, checada de novo na rota; licença pela plataforma.
- RN-INT-13: Conector do tipo arquivo do tenant que recebe a entidade; sem conteúdo do arquivo em log nem auditoria (só ids e contagens).
- Consumidor do aprovado@1 não lança mais quando faltam chaves do ERP (antes a outbox desistia e o pedido sumia): fica retido e visível — correção certa.
- Fronteiras: só `@macuxi/platform-sdk`, contracts próprios; SQL só em `integracao.*`.

## Pronto quando
Merge liberado. 🟡 1 (doc do limite) cabe num commit curto; 🟡 2 e 🟢 no backlog.
