---
id: R-20261110-114603-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:46:03-04:00
---
# T-0158: plataforma.diagnostico (sequência de protocolo, RLS, grants por coluna) e sa_listar_diagnosticos/sa_diagnostico para o macuxi_portal

## Contexto
Contexto: desenho docs/desenho/T-0158.md §4 e ADR 0043 (proposta). Diagnóstico do aparelho (botão Enviar diagnóstico na v1.0.4; queda automática na v1.0.5), lido só pelo super-admin no portal; retenção de 90 dias (LGPD).

## O que preciso / o que mudou
O que preciso: (1) migração de plataforma.diagnostico com as colunas da tabela do §4 (comuns da regra 5; protocolo bigint unique da sequência global plataforma.diagnostico_protocolo_seq; checks de origem, app e alerta_situacao) e os índices do §4; (2) RLS forçado: macuxi_app só insert e select no próprio tenant; macuxi_worker select, delete e update SÓ das colunas alerta_* (grant por coluna) em todos os tenants; nenhum grant direto ao macuxi_portal; (3) funções SECURITY DEFINER com EXECUTE só para macuxi_portal: sa_listar_diagnosticos(p_sid uuid, p_filtro jsonb) returns jsonb (só super-admin; cliente = 42501; sessão vencida = 28000; filtros versao, modelo, tenant_id, motivo, origem, de, ate, cursor keyset (recebido_em, id), 50 por página, nome da empresa por join em plataforma.tenant) e sa_diagnostico(p_sid uuid, p_id uuid) returns jsonb (detalhe + chave_armazenamento do print); (4) se plataforma.arquivo tiver CHECK de módulo, aceitar 'plataforma'; (5) espelho Drizzle em db/esquema/plataforma.ts, inclusão das 2 sa_* na lista de conformidade (apps/api/test/funcoes-sa.ts é meu: me mande os nomes que eu incluo) e docs/banco/plataforma.md e lgpd.md (90 dias, apagamento de fato pelo worker).

## Pronto quando
Pronto quando: migração com up/down, testes de banco (RLS entre 2 tenants, macuxi_app sem update/delete, sa_listar recusa o admin do cliente) verdes no CI até terça à noite, para a API da v1.0.4 testar em cima.
