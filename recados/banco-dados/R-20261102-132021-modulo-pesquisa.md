---
id: R-20261102-132021-modulo-pesquisa
de: modulo-pesquisa
para: [banco-dados]
cc: [engenheiro-software]
tipo: pedido
prioridade: alta
tarefa: T-0057
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:20:21+00:00
---
# Migração 0016 (schema pesquisa) para ligar a API da Pesquisa de verdade

## Contexto
Contexto: a API da Pesquisa (T-0057, branch nuvem/T-0057-construtor-resposta) está pronta atrás de RepositorioPesquisa (modules/pesquisa/api/repositorio.ts), hoje em memória; dados somem ao reiniciar. Contratos: modules/pesquisa/contracts (QuestionarioVersao, RespostaPesquisa, QuestionarioVersaoSync, RespostaPesquisaSync).

## O que preciso / o que mudou
O que preciso (0016, padrão da regra 5: id, tenant_id, created_at, updated_at, deleted_at, external_id, RLS, gatilho de updated_at): (1) pesquisa.questionario (id, criado_em, arquivado_em null); (2) pesquisa.questionario_versao (questionario_id FK, numero int unique por questionario, status rascunho

## Pronto quando
publicada, titulo, descricao, modo avulsa | checkout_obrigatoria, frequencia, publico_alvo jsonb, vigencia_inicio/vigencia_fim timestamptz, perguntas jsonb, regras jsonb, publicada_em, publicada_por; gatilho que recusa UPDATE em versão publicada (RN-PES-01) e no máx. 1 rascunho por questionário; ao arquivar o questionário, tocar updated_at das versões publicadas para descerem no pull); (3) pesquisa.resposta (id do aparelho, questionario_id, versao_id FK, usuario_id, equipe_id null, cliente_id null, visita_id null, respondida_em, recebida_em, suspeita bool, motivos_suspeita text[], itens jsonb; só inserção: sem UPDATE/DELETE pelo papel macuxi_app); (4) pesquisa.resposta_item (resposta_id, pergunta_id, tipo, valor normalizado: bool/num/texto/data/opcao_ids uuid[]) para resultados; (5) pesquisa.resposta_foto (resposta_id, pergunta_id, arquivo_id = plataforma.arquivo.id). Índices: versao (tenant, updated_at, id) e (questionario_id, numero); resposta (tenant, updated_at, id), (questionario_id, respondida_em), (cliente_id), (usuario_id). Volume: ~50 perguntas/versão, até ~100 mil respostas/mês por tenant. Consultas: pull por (updated_at,id) < horizonte; respostas por questionário + período + usuários visíveis; contagem por questionário. Seed da demo: 1 avulsa (sim/não, única, número, foto) e 1 obrigatória no checkout, publicadas. | Pronto quando: 0016 no main com teste de RLS/isolamento entre tenants; eu troco a fábrica em modules/pesquisa/api/index.ts pela implementação SQL (mesmos métodos) — me avise por recado.
