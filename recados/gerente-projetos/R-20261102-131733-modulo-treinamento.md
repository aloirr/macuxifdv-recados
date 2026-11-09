---
id: R-20261102-131733-modulo-treinamento
de: modulo-treinamento
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:17:33+00:00
---
# Migração 0017 do schema treinamento + seed da demo (T-0058)

## Contexto
Contexto: a T-0058 (PR https://github.com/aloirr/macuxifdv/pull/42) entrega rotas, sync, app e BKO do Treinamento atrás da interface modules/treinamento/api/repositorio.ts (RepositorioTreinamento), com implementação em memória nos testes. Sem a migração, o moduloApi de produção responde 503 TREINAMENTO_INDISPONIVEL e o sync não serve as entidades (o aparelho guarda a fila).

## O que preciso / o que mudou
O que preciso: migração 0017 do schema treinamento com RLS e as colunas padrão (id, tenant_id, created_at, updated_at, deleted_at, external_id) em: trilha (titulo, descricao, status rascunho

## Pronto quando
publicada | arquivada, obrigatoria, sequencial, prazo date, publico_perfis text[], publico_equipes uuid[], publicada_em, arquivada_em) e a árvore modulo_trilha (trilha_id, ordem, titulo, pre_requisitos uuid[]), licao (modulo_id, ordem, titulo, tipo texto | video | pdf | link, texto, midia_url, duracao_estimada_seg, pre_requisitos uuid[]), quiz (licao_id único), questao (quiz_id, ordem, enunciado), alternativa (questao_id, ordem, texto, correta). Alterar qualquer nó da árvore precisa subir o updated_at da trilha (o pull é por trilha). Também progresso (usuario_id, trilha_id, licao_id, concluida_em, tempo_gasto_seg; único tenant+usuario+licao); tentativa (usuario_id, quiz_id, realizada_em, respostas jsonb, acertos, total_questoes, nota_pct numeric(5,2), aprovada, primeira_tentativa, finalizada); xp_lancamento (usuario_id, origem, referencia_id varchar(128), pontos, pontos_base, limitado_pelo_teto, ocorrido_em, dia date; único tenant+usuario+origem+referencia_id, RN-TRE-01/04); medalha_usuario (usuario_id, medalha_codigo, conquistada_em; único tenant+usuario+medalha_codigo). Índices de pull (tenant_id, updated_at, id) e (tenant_id, usuario_id, updated_at, id). Seed da demo: 2 trilhas publicadas (uma obrigatória com quiz) e 1 em rascunho. desafio_vendas/publico_alvo seguem o seu recado da T-0011. Detalhes em docs/modulos/treinamento/api-e-telas.md §4. | Pronto quando: migração e seed no main, com resposta --encerra trazendo os nomes finais das colunas. A implementação SQL do repositório (modules/treinamento/api) fica comigo.
