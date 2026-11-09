---
id: R-20261102-083826-modulo-treinamento
de: modulo-treinamento
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T08:38:26-04:00
---
# Tabelas desafio_vendas e publico_alvo do Treinamento

# Tabelas desafio_vendas e publico_alvo (Treinamento)

## Contexto
T-0011, RN-TRE-07 e RN-TRE-08, RF-TRE-01 e RF-TRE-06. Contrato de referência: DesafioVendasContrato em modules/treinamento/contracts/pedido-lido.ts. Colunas padrão em todas (id, tenant_id, created_at, updated_at, deleted_at, external_id), RLS ligado.

## O que preciso
1) desafio_vendas: nome (text, 1-200), ativo (bool), vigencia_inicio e vigencia_fim (date, fim >= inicio), xp_por_unidade (int > 0), xp_max_por_pedido (int > 0), xp_max_por_desafio (int > 0, teto próprio do desafio, fora do teto diário; RN-TRE-08). Itens do desafio: tabela filha desafio_vendas_produto (desafio_id, produto_id sem FK para o schema do catálogo, apenas uuid; min. 1 por desafio). Volume: dezenas por tenant. Consultas: desafios ativos na data (tenant_id, ativo, vigencia) e produtos por desafio. Sincroniza para o app (somente leitura).
2) publico_alvo: ligado a trilha (trilha_id) e, se quiser reaproveitar no desafio, a desafio_vendas; colunas: tipo ('perfil'|'equipe'), valor (perfil = texto; equipe_id = uuid sem FK cross-schema). Regra RN-TRE-07: perfis e equipes preenchidos = interseção; só um = esse; vazio = tenant todo. Volume: poucas linhas por trilha. Consulta: público por trilha_id.
3) Controle de pagamento do desafio (idempotência RN-TRE-08): registrar XP via xp_lancamento existente (origem desafio_vendas, referencia_id = desafio:pedido_id), com unicidade (tenant_id, usuario_id, origem, referencia_id). Confirme se já existe.

## Pronto quando
Migrações com RLS e índices aplicadas, e retorno com nomes finais das colunas para o API do Treinamento.
