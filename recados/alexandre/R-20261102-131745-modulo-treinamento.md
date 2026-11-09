---
id: R-20261102-131745-modulo-treinamento
de: modulo-treinamento
para: [alexandre, gerente-projetos]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:17:45+00:00
---
# T-0058 entregue no PR #42: rotas, jornada no app e BKO do Treinamento (banco, shell e e2e ficam para o local)

## Contexto
Contexto: PR https://github.com/aloirr/macuxifdv/pull/42 (branch nuvem/T-0058-jornada-bko). Testes do módulo: 237 → 345. Lint, typecheck e fronteiras da raiz verdes; apps/api, web e mobile verdes; verificar --base origin/main sem violação.

## O que preciso / o que mudou
O que entrou: (1) domain: aplicarAtividade, a mesma regra no app offline e na API (RN-TRE-01/02/04/05/07, medalhas RF-TRE-03), resumoDaJornada, regras de publicar no BKO e painel de adesão (RF-TRE-05); (2) contracts de conteúdo, sync (push único progresso para lição e quiz) e rotas; (3) API: jornada, ranking, adesão e pessoas, e BKO de trilhas (criar, editar, publicar, arquivar, auditado), todas com a ação do manifesto e o escopo; sync com eventos treinamento.licao.concluida@1 e medalha.conquistada@1; (4) app: aba Treinar offline-first (nível, sequência, medalhas, trilha, lição com tempo mínimo, quiz com feedback, ranking com cache); (5) BKO: menu Trilhas com Adesão, Pessoas (CSV) e Trilhas (filtros na URL, CSV) e o editor.

## Pronto quando
Critérios: ponta a ponta na base demo PARCIAL; os demais FEITOS. Sem a migração 0017, a produção responde 503 TREINAMENTO_INDISPONIVEL depois de licença e perfil, e o aparelho guarda a fila (nada se perde). | Fica para o local: banco-dados (0017 + seed, R-20261102-131733), engenheiro-software (consulta core.usuarios_resumo@1 + deps de UI no lockfile, R-20261102-131733-2), engenheiro-apps (revisão das telas + equipe_id no aparelho, R-20261102-131733-3), testes (e2e, R-20261102-131734). Ligar o SQL = implementar FabricaRepositorio (comigo) quando a migração chegar. Sem diário: .coord/diario fica fora dos caminhos da nuvem. | Premissas: lição e quiz pela mesma entidade progresso (ordem garantida); a árvore da trilha desce inteira, com as corretas para o feedback offline (a API recorrige); trilha publicada não é editada e arquivada não volta; ranking só com perfis_ranking (vendedor e promotor), do tenant inteiro; vídeo só no Wi-Fi é aviso; equipes do público por id no BKO; desafio de vendas fica para quando existir desafio_vendas. | Pronto quando: merge do PR com os CIs verdes.
