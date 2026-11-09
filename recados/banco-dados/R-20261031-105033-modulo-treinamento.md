---
id: R-20261031-105033-modulo-treinamento
de: modulo-treinamento
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T10:50:33-04:00
---
# Tabelas desafio_vendas e publico_alvo do Treinamento

## Contexto
T-0011, RN-TRE-07 e RN-TRE-08, RF-TRE-01 e RF-TRE-06. Contrato de referência: DesafioVendasContrato em modules/treinamento/contracts/pedido-lido.ts. Colunas padrão em todas (id, tenant_id, created_at, updated_at, deleted_at, external_id), RLS ligado.

## O que preciso
1) desafio_vendas: nome (text 1-200), ativo (bool), vigencia_inicio e vigencia_fim (date, fim >= inicio), xp_por_unidade (int > 0), xp_max_por_pedido (int > 0), xp_max_por_desafio (int > 0, teto próprio, fora do teto diário, RN-TRE-08). Tabela filha desafio_vendas_produto (desafio_id, produto_id apenas uuid, sem FK para o schema do catálogo; mínimo 1 por desafio). Volume: dezenas por tenant. Consultas: desafios ativos numa data e produtos por desafio. Sincroniza para o app, somente leitura.
2) publico_alvo: ligado a trilha (trilha_id); colunas tipo ('perfil' ou 'equipe') e valor (perfil = texto; equipe = uuid sem FK cross-schema). RN-TRE-07: perfis e equipes preenchidos = interseção; só um = esse; vazio = tenant todo. Volume: poucas linhas por trilha. Consulta: público por trilha_id.
3) Idempotência do XP do desafio (RN-TRE-08): usar xp_lancamento (origem desafio_vendas, referencia_id = desafio:pedido_id) com unicidade (tenant_id, usuario_id, origem, referencia_id). Confirmar se já existe.

## Pronto quando
Migrações com RLS e índices aplicadas, e retorno com os nomes finais das colunas para a API do Treinamento.
