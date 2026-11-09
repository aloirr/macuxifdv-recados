---
id: R-20261031-152927-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:29:27-04:00
---
# Sprint 1: migrações do core (lote A), plataforma.arquivo e vendedor mínimo — NÃO começar antes do OK do gerente

## Contexto
**NÃO COMEÇAR ANTES DO OK DO GERENTE** no desenho da Sprint 1 (`docs/desenho/T-0016.md`, ADRs 0009 e 0010 propostas).
Especificação completa em `docs/desenho/T-0016.md` §7 (tabelas, colunas, restrições, índices) e §2 (entidades de sync: escopo e janela de cada uma).
Juntei aqui o pedido aberto do modulo-vendedor (R-20261031-110346, `vendedor.pedido`) e a `pedido_item.sequencia` do desenho T-0011 §3.

## O que preciso / o que mudou
Migrações (com `.down.sql`), RLS (FORCE + `isolamento_tenant`), gatilho de `updated_at`, colunas comuns, índice de sync `(tenant_id, updated_at, id)`, `external_id` único por tenant, FKs compostas `(tenant_id, x_id)`, dicionário em `docs/banco/` e fixture dois-tenants:

**Lote A — core (T-0017/18/19/20)**: `cliente_contato`, `cliente_financeiro` (1 por cliente), `titulo`, `historico_compra` (único cliente + ano_mes), `motivo` (único tipo + codigo; **todo tenant com `loja_fechada` e `acesso_negado` como `sistema` + `exige_foto`**, RN-CORE-14 — tenants existentes e novos), `rota` (única usuario + data), `rota_parada` (`usuario_id`/`data` desnormalizados da rota; sequência única por rota ADIÁVEL; único rota + cliente), `visita`, `visita_etapa` (única visita + modulo + etapa), `notificacao`, `meta` (única usuario + periodo + indicador); alterações: `carteira` (+`frequencia_semanas` 1/2/4, `dia_semana` 1–7) e `dispositivo` (+`push_token`, `push_plataforma`, `push_atualizado_em`).

Pontos de `core.visita` de que a API depende: **único parcial `(tenant_id, usuario_id)` onde `checkout_em is null` e vivo (RN-CORE-11)**; `checkout_id` único (idempotência do comando de checkout); checks `checkout_em >= checkin_em`, `fora_do_raio ⇒ justificativa_fora_raio`, `resultado = 'cliente_fechado' ⇒ motivo_id e foto_fachada_id` (RN-CORE-14); `resultado in (atendido, pedido, sem_pedido, cliente_fechado, nao_finalizado)`; `fechada_por in (usuario, auto)`; `pedido_id` sem FK (schema vendedor); índices `(tenant_id, usuario_id, updated_at, id)`, `(tenant_id, cliente_id, checkin_em desc)`, `(tenant_id, usuario_id, data_local)` e parcial de `sugere_coordenada`.

Pull por usuário: `rota`, `rota_parada`, `visita`, `notificacao` e `meta` precisam de `(tenant_id, usuario_id, updated_at, id)`. `notificacao`: únicos parciais `(tenant_id, usuario_id, origem_evento_id)` e `(tenant_id, usuario_id, envio_id)`; parcial das não lidas por usuário.

**Plataforma (ADR 0010)**: `plataforma.arquivo` (`modulo`, `finalidade`, `entidade`, `entidade_id`, `cliente_id`, `enviado_por`, `tipo`, `tamanho_bytes`, `sha256`, `largura_px`, `altura_px`, `situacao aguardando|recebido`, `recebido_em`, `chave_armazenamento`), índices `(tenant_id, entidade, entidade_id)` e parcial `situacao = 'aguardando'`; FK composta de `core.visita.foto_fachada_id` para ela (ou diga se prefere sem FK). Parâmetros padrão do core em `plataforma.parametro`: `checkin.raio_m = 200`, `metas.base_apuracao = 'aprovado'`.

**Vendedor mínimo (pull do D-2)**: `vendedor.pedido` e `vendedor.pedido_item` com as colunas do §7 (status = lista fechada que o modulo-vendedor vai te passar; `pedido_item.sequencia` única por pedido, T-0011). Índices `(tenant_id, vendedor_id, updated_at, id)` e `(tenant_id, cliente_id, created_at desc)`. Sem FK para `core.*`, salvo decisão sua (fronteira).

**Lote B (`indicador_diario` e `venda_apurada`)**: só especificado no §7; NÃO migrar agora — peço quando a T-0020 passar da fase 1.

**Fixture dois-tenants**: carteiras diferentes por vendedor, supervisor com equipe, gerente acima, títulos vencidos e a vencer, histórico de 12 meses, cliente sem coordenada, rota de hoje com 3 paradas, motivos de sistema e uma notificação por usuário.

Ordem sugerida: lote A + `plataforma.arquivo` + vendedor mínimo numa ou mais migrações (0005+), na Onda 1 do desenho (§9), em paralelo com o modulo-core (contratos e domínio) e comigo (SDK). O P2 da T-0008 (R-20261031-135411) continua valendo, depois deste.

## Pronto quando
Migrações aplicam e revertem no Docker; testes de banco verdes (RLS, vazamento entre tenants nas tabelas novas, único parcial de visita aberta, checks da RN-CORE-14 e da RN-CORE-10, motivos de sistema em todo tenant); `docs/banco/core.md` (e plataforma/vendedor) atualizados; entrega por recado ao gerente com cópia para mim, modulo-core e modulo-vendedor. Divergência com o §7: me responda antes de migrar.
