---
id: R-20261031-153023-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0016
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T15:30:23-04:00
---
# T-0016 entregue: desenho da Sprint 1, ADRs 0009/0010 (propostas) e pedidos ao banco, core e vendedor

## Contexto
T-0016 (desenho da Sprint 1). Só documentação e recados; nenhum código alterado. Aguarda a sua revisão (critério 3) antes de disparar a implementação.

## O que preciso / o que mudou
**Arquivos**
- `docs/desenho/T-0016.md` — desenho das T-0017, T-0018, T-0019, T-0020 e T-0008 parte 2: contratos Zod e eventos, rotas `/v1/core/*` por `definirModuloApi`, registro de 17 entidades de sync (direção, conflito, escopo, janela, idempotência), schema por módulo (§7), telas por dono (app e BKO), critérios de teste, ondas e riscos.
- `docs/decisoes/0009-sync-de-escrita-escopo-e-entidades-sem-provedor.md` (proposta): comando = entidade push-only com id próprio (`visita_checkout`, `notificacao_leitura`); `schemaLinha`; sobreposição da fila na tela; `versao_escopo` no pull com ressincronização (cliente que entra traz o histórico, cliente que sai some do aparelho); janelas de tempo; `ctx.usuariosVisiveis()`; **D-2**: motor pula 501 e trata `SYNC_NAO_IMPLEMENTADO` no push como retentável.
- `docs/decisoes/0010-fotos-e-arquivos-enviados-pelo-aparelho.md` (proposta): `PUT/GET /v1/arquivos/:id` de plataforma, `plataforma.arquivo` criado pelo módulo na transação do comando, bytes atrás de uma porta (disco local; S3 com ADR própria) e fila de arquivos no motor depois do push.
- `.coord/contratos/eventos.md`: payloads de `core.visita.checkin@1`, `core.visita.checkout@1` e `core.cliente.atualizado@1`; novo `core.notificacao.criada@1` (planejado); `integracao.titulo.atualizado@1` passa a ter o Core como consumidor (dono do título, doc 04). `.coord/contratos/extensoes.md`: aba Pedidos (Vendedor), card de notificações e slot de servidor `visita.etapas_checkout` (planejados).

**Plano (ondas, máx. 3 agentes)**: Onda 1: banco-dados (lote A + `plataforma.arquivo` + vendedor mínimo), modulo-core (contratos e domínio puro) e engenheiro (E1–E3 + P1 da T-0008, **depois do merge da T-0015**, que mexe nos mesmos arquivos). Onda 2: core T-0017, vendedor (pull de pedido), engenheiro E4 (arquivos). Onda 3: core T-0018 + BKO, engenheiro T-0008 P3/P5, testes. Onda 4: core T-0019 e depois T-0020 fase 1, E5/E6. Caminho crítico: modulo-core. A meta da sprint (modo avião com rota e check-in) depende só de T-0017 + T-0018 + E1–E4.

**Pedidos enviados** (todos com "NÃO começar antes do OK do gerente", cópia para você): R-20261031-152927 (banco-dados: migrações §7), R-20261031-152928 (modulo-core: o que é dele nas 4 tarefas), R-20261031-152928-2 (modulo-vendedor: pull de pedido/pedido_item, status para o banco). Resposta ao testes sobre o D-2: R-20261031-152942 (decisão (a) + provedores reais).

**Decisões que peço a você**
1. Aprovar ou ajustar as ADRs 0009 e 0010 e o desenho.
2. **Despachante da outbox** (ADR 0007): sem ele nenhum evento é consumido, então a notificação por evento (T-0019) e o realizado de vendas (T-0020) ficam de fora. Sugiro abrir uma tarefa minha para a Sprint 2 (a T-0021 já é do Catálogo).
3. T-0020 na Sprint 1 só na fase 1 (meta, domínio RN-CORE-20..22, cobertura real); o lote B do banco fica para depois.
4. E6 (refresh do BKO em cookie httpOnly e `trustProxy`) entra na Sprint 1 como item meu de backlog? Sugiro que sim, na Onda 4.

**Pendências/dependências externas**: E5 (expo-notifications), P4 e P7 da T-0008 (expo-sqlite) dependem do build EAS do Alexandre. A T-0008 §3.2 citava Node 22.13; vale o 24.7 (R-20261031-151810).

**Premissas**: dados de cliente, financeiro, títulos e histórico vêm de fixture na Sprint 1 (Hub na Sprint 2); fuso = `plataforma.tenant.fuso`; raio de 200 m como parâmetro; sem edição de cliente/contato no BKO; o promotor usa rota e visita com o resultado `atendido`; pedido offline fica `pendente` até a Sprint 4; sem dependência nova fora das já autorizadas.

## Pronto quando
Você revisar e aprovar (ou pedir ajustes); com o OK, avise banco-dados, modulo-core e modulo-vendedor para começarem a Onda 1. Recados abertos meus que ficam com a outra instância (T-0015): D-1 e O-3. A revisão do guardião v2 (R-20261031-190117-2-alexandre) ainda está pendente comigo.
