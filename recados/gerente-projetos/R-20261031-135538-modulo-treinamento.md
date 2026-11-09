---
id: R-20261031-135538-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0011
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:55:38+00:00
---
# T-0011 Treinamento: domínio, contracts e manifesto entregues na nuvem


## Contexto
T-0011 rodou na nuvem (branch nuvem/T-0011-treinamento-dominio), escopo só modules/treinamento/{domain,contracts,manifest.ts} e docs/modulos/treinamento/. Sem db/app/web/api. O número T-0011 estava livre; o arquivo .coord/tarefas/T-0011.md e a linha do quadro ficam com o gerente (não foram criados nesta rodada, a pedido do Alexandre).

## O que mudou
- docs/modulos/treinamento/regras.md: fórmula, exemplo numérico e RF/RN de cada regra; parâmetros do tenant com padrão.
- domain (TDD, 186 testes em 14 arquivos): trilha/progresso e pré-requisitos (RF-TRE-01/02); quiz com nota, 70%, 3 tentativas/dia no fuso, intervalo, melhor × última (RN-TRE-02); XP append-only com teto diário e idempotência por id e chave natural (RN-TRE-01/04); streak, níveis e medalhas (RF-TRE-03); validação offline no servidor, 30 s (RN-TRE-04); ranking por período/escopo, só ativos, desempate XP → quem atingiu primeiro (RN-TRE-03); adesão do mês (RF-TRE-05, público vazio = null); desafio de vendas (RF-TRE-06) idempotente por pedido.
- contracts Zod: progresso, tentativa, lançamento de XP, medalha do usuário, ranking, adesão, parâmetros, eventos treinamento.licao.concluida@1 e treinamento.medalha.conquistada@1, e PedidoCriadoLido (leitura tolerante de vendedor.pedido.criado@1, sem importar o Vendedor).
- manifesto: 12 ações. Aluno (vendedor/promotor/supervisor/gerente): licao.concluir, quiz.responder, trilha.baixar_offline. ranking.ver: aluno + analista/admin. adesao.ver e notas.ver: supervisor/gerente/analista/admin. trilha.criar/editar/publicar, quiz/desafio/medalha.gerenciar: analista/admin. admin entrou em perfis; sync ganhou xp_lancamento, medalha_usuario, ranking_periodo.
- Checks: pnpm lint (fronteiras 0 violações), typecheck 16/16, test 16/16 após merge da main; verificar modulo-treinamento --base origin/main = 0.

## Premissas para o Alexandre decidir
1. Teto diário 200 XP (lição/quiz/trilha/streak); desafio de vendas fora do teto; teto esgotado grava lançamento de 0.
2. XP de acerto do quiz pago na 1ª tentativa mesmo se reprovada.
3. Streak conta lição ou tentativa de quiz; paga 1x/dia min(2×dias, 20).
4. Refazer quiz aprovado é permitido sem XP; aprovado continua aprovado; padrão: melhor nota.
5. Intervalo entre tentativas = 0 (desligado) por padrão.
6. Desempate: XP → quem atingiu primeiro → trilhas concluídas → nome → id.
7. Faixas de nível 0/100/250/450/700/1000/1400/1900/2500/3200; medalhas padrão: primeira trilha, nota 100, 7 dias seguidos.
8. Público-alvo: perfis E equipes; vazio = tenant todo; ranking padrão só vendedor e promotor (configurável).
9. Semana do ranking: segunda a domingo.
10. Payload lido do pedido: pedido_id, vendedor_id, criado_em, itens[produto_id, quantidade]; XP = xp_por_unidade com teto xp_max_por_pedido.
11. 30 s mínimos para todo tipo de lição.

## Pendências
- modulo-vendedor: confirmar payload de vendedor.pedido.criado@1 (ainda não definido no contrato do Vendedor).
- banco-dados: tabelas desafio_vendas e publico_alvo (fora do doc 04) e entidades novas de sync.
- Fora do escopo: certificado PDF (RF-TRE-08), quiz por IA (RF-TRE-07), ajuste manual de XP, estorno de XP por pedido cancelado.
- engenheiro-software: a cópia do manifesto em packages/platform-sdk/src/manifestos-referencia.test.ts ficou defasada (sem admin e acoes); o teste passa.
- Revisão do engenheiro-software antes de fechar.

## Pronto quando
Gerente registra T-0011 no quadro/tarefas/backlog, encaminha as premissas ao Alexandre e pede a revisão do engenheiro.
