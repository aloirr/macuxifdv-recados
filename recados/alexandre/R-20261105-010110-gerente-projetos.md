---
id: R-20261105-010110-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T01:01:10-04:00
---
# Status da 1h: lote 3, #91–#93 e lote B no main (b0e0462); demo atualizada; build em andamento

## Contexto
Status da 1h da noite autônoma de 04→05/11 (seu pedido: status à 1h, 3h e 5h).

## Entrou no main (regra do doc 07 e regra A)
- **Lote 3** aab84fa..312c2a3: T-0073 passo 7 (parâmetros do Início no BKO), coordenação (T-0078/T-0079, travas da nuvem, anexos em docs/produto/referencias/).
- **PRs do visual (regra A, update-branch + CI verde + head novo):** #91 promotor → 7f97cd2; #92 treinamento → 0be65bf; #93 pesquisa → ae7b7ce. Revisões do designer-ux e do engenheiro-software sem 🔴 publicadas nos PRs.
- **Lote B** ae7b7ce..b0e0462 (15 commits, CI 41969439746 verde no commit exato, verificar 15/15, revisões sem 🔴): expo-haptics 57.0.3 (lockfile só com ele) e vibração; T-0079 completa (geracao_base 0022, SDK, API, aparelho, ADR 0021); T-0078 parte de API (/v1/saude com banco/outbox/5xx, métricas) + banco (0024 resumo_outbox e funções de LGPD, conferência de RLS) + testes (log sem dado pessoal, carga sem banco: 20 aparelhos p95 302 ms, 50 aparelhos p95 688 ms, 0 erros); T-0039 (checkout revalidado na API); T-0073 positivação do mês (0023) e 🟡 do passo 7 (o pull agora leva as três chaves do Início — defeito real achado pelo teste); T-0077 item 6 (fora dos 90 dias) e acabamento de Pedidos; ícones camera/inbox no kit; 🟡 de UX de promotor/treinamento/pesquisa; Gestor com parado_min do tenant; T-0024 passo 1.

## Builds
CI do main e deploy da demo no b0e0462 concluídos com sucesso (demo — publicar verde; api-demo /v1/saude 200). Build de preview Campo e Gestão do b0e0462 em andamento com o engenheiro-apps; links por recado assim que terminar.
Novo: o app não tem o expo-sqlite instalado (achado da T-0008). Decidi instalar com as regras da janela do haptics (engenheiro-software, dono do lockfile, só essa dependência no diff), para a tela de medição rodar no próximo build.

## Travou / bloqueado (e o que fiz)
- **Docker do PC desligado:** testes de banco só rodam no CI (todos os lotes passaram lá). d40267d (backup no deploy) segue bloqueado: precisa do stack isolado.
- **#94 (visual do Core):** sem a marca [PRONTO PARA MERGE]; `modules/core/app/**` segue travado, então o acabamento das telas do Core espera.
- **T-0008 P4/P7:** medição no aparelho. Fiz o engenheiro-apps preparar uma tela oculta de diagnóstico (20 mil SKUs, 500 clientes, busca p95) para você rodar no APK de manhã.
- **Lotes A e A2 vermelhos** (lint, testes desatualizados, uma migração que deixei fora por engano): corrigidos pelos donos e absorvidos no lote B.
- **D-L1a (LGPD):** erro do Postgres que vira 500 grava valores da linha (ex.: e-mail) no log — com o engenheiro-software agora, prioridade. D-C1a (rota do script de carga) idem.

## % por sprint (tarefas concluídas no quadro)
Sprint 0 100% · Sprint 1 94% (T-0008 aguarda o aparelho) · Sprint 2 93% (T-0024 em andamento, T-0039 em teste) · Sprint 3 100% · Sprint 4 80% (T-0071, T-0072, T-0073 em fechamento) · Sprints 5–8 100% · Sprint 9: 0/6 concluídas, mas T-0076, T-0077, T-0079 e T-0039 já em teste e T-0078 com a maior parte no main.

## Decisões para você (premissas que tomei)
1. Vibração desligada com "reduzir movimento" (seguindo o seu R-20261104-231036; o guia foi alinhado).
2. "A faturar" inclui enviado ao ERP e integrado sem faturamento.
3. T-0039: motivo desativado depois do checkout é aceito (para não perder visita feita offline).
4. T-0079: o pedido fantasma 000011 só some com o APK novo + um --recriar, ou limpando os dados do app uma vez.
5. T-0024: consumidores importam o contracts do dono por caminho relativo (evita ciclo de pacotes); o Conector passa a levar o platform-sdk no bundle.
6. T-0078: retenção do backup 7 × 30 dias (G1) e termo de uso do dado do ERP (G3) — seus.

## Pronto quando
Próximo status às 3h.
