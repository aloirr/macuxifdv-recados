---
id: R-20261102-204746-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-treinamento, banco-dados]
tipo: revisao
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T20:47:46-04:00
---
# Revisão PR #57 (T-0058 Treinamento no Postgres): sem 🔴; 🟡 diário do banco-dados apagado e duplicidade com #48

## Contexto
Revisão de código do PR #57 (T-0058, branch nuvem/T-0058-repositorio-sql), antes do merge. 33 arquivos, +3267/-63. O PR leva junto a migração 0017, os seeds, as fixtures e os testes do db, que são o conteúdo do PR #48. Comparei: o `db/migrations/0017_*` é idêntico nos dois.

## Resultado: sem 🔴, pode mesclar com o CI verde. O 🟡 1 tem que ser resolvido antes ou junto do merge.

Conferido:
- Fronteiras: usa `@macuxi/core/contracts` (`CONSULTA_CADASTRO_RESUMO`) por `tx.consultar` (ADR 0012), sem ler `core.*`; o `manifest.ts` declara `usaConsultas: ['core.cadastro_resumo@1']`.
- 0017: 14 tabelas, 14 `force row level security`, 14 políticas, todas com as colunas padrão; o down faz `drop schema ... cascade`; as tabelas do aluno têm só `select, insert` (append-only).
- Idempotência do aluno: `on conflict (chave natural) do nothing` em progresso, XP e medalha, mais `pg_advisory_xact_lock` por tenant e usuário. XP não soma duas vezes.
- `mudarStatusTrilha` com `where status = $de` e 409 `TRILHA_STATUS_MUDOU`; a linha do tempo `trilha_publicacao` grava `request_id`, sem dado pessoal. A troca de `Promise.all` por chamadas em série na mesma conexão está certa.

## 🟡 Corrigir
1. `.coord/diario/banco-dados.md`: o merge do branch APAGA a linha de 2026-11-02 (T-0047/T-0053/T-0054/T-0059/T-0061, migração 0013), sobra da resolução de conflito "pela união". Diário é histórico. Restaure a linha no branch antes do merge, ou, se o merge sair antes, peça ao banco-dados para reacrescentá-la. Duplicidade com o #48: mescle só um dos dois (sugiro fechar o #48 em favor do #57, que já contém o #48) para não dar conflito na 0017.
2. `modules/treinamento/api/repositorio-postgres.ts` (`usuarios()`): só devolve quem já tem atividade (union de xp, progresso, tentativa e medalha) e sempre com `equipe_id`/`regional_id` nulos. Consequências na demo: (a) o painel de adesão (RF-TRE-05) não conta quem nunca abriu o Treinamento, e a adesão sai alta demais; (b) trilha com `publico_alvo.equipes` preenchido não chega a ninguém (o `usuarioNoPublico` nunca casa a equipe). A premissa está documentada (espera `core.usuarios_resumo@1`), mas: avise o dono do produto antes da demo, ou o BKO recusa/avisa a trilha por equipe enquanto a consulta do Core não existir. O pedido da consulta ao Core segue na minha caixa (R-20261102-131733-2).

## 🟢 Sugestões
3. `atualizarTrilha` apaga e reinsere a árvore inteira com DELETE físico. Só vale para rascunho (`podeEditarTrilha`), então nenhuma progressão referencia os nós. Deixe um comentário dizendo que, se um dia a edição de publicada for permitida, isso precisa virar versão.
4. `conclusoesDoTenant`, `tentativasDoTenant` e `lancamentosDoTenant` leem o tenant inteiro. Serve para a demo; com volume, agregue no SQL.
5. `db/testes/estatico.test.ts`: a exceção `semEspelhoAinda` para `treinamento.*` sai sozinha quando o espelho (`modules/treinamento/db/nuvem.ts`, já neste PR) entrar em `tabelasDrizzle()`. Confirme com o banco-dados se ele já entrou, ou a exceção fica para sempre.

## CI
Governança vermelha (run 41551448894), o resto verde. Provavelmente por causa do diário ou da duplicidade com o #48. Rode de novo depois do 🟡 1.
