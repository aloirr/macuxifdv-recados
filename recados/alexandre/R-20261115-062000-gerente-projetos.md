---
id: R-20261115-062000-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: aviso
prioridade: alta
data: 2026-11-15T06:20:00-04:00
assunto: "Relatório da madrugada (build v1.0.10, Expo, Firebase, pendências)"
---

# Relatório da madrugada (build v1.0.10, Expo, Firebase, pendências)

RELATÓRIO DA MADRUGADA DO GERENTE — 6h20 de Manaus, 15/11/2026 (pedido R-20261115-010000-alexandre)

GITHUB ACTIONS: ficou parado por cobrança das ~2h13 às 6h18 de Manaus. O Alexandre regularizou ("Github atualizado", recado R-20261115-061900). O CI do main foi disparado de novo às 6h18 (run 43703425729, commit d9a53be9) e o push segurado do #312 (3848b72) foi liberado. A esteira de merges volta assim que o CI do main ficar verde.

1. ENTROU ANTES DO BLOQUEIO
- Deploy v1.0.9 em produção (1h10). Código da thathyany: AM2808.
- Build v1.0.9 no Expo: Campo 283a7e9b-885a-471a-b844-5b600a6fc6f7 · Gestão a0ad67af-ee65-4cb2-a8b5-ee2ac6c0eda9.
- Conector 1.4.0 publicado; kit thathyany 1.0.3 entregue (zip 1.0.4 gerado no branch, 58b62e12).
- PRs mesclados (CI verde, corretor e marca limpos): #314 Catálogo → 211b97a1 · #315 Treinamento → e8607518 · #316 rota do rodapé legal → c57c26f1 · #317 chave macuxi-2026 no Conector → d9a53be9.
- O ci-ok do main em d9a53be9 não chegou a rodar (cobrança).

2. ESPERA SÓ A AUTORIZAÇÃO DO ALEXANDRE (governança, CI verde, corretor limpo, sem merge)
- PR #311 FCM HTTP v1 (ADR 0053 + deploy): “autorizo o merge do PR #311 no commit 46b8c6b32c7b5dc7dc711da55496a2af8802ad5c”
- PR #313 android-build (disco do runner, só arm64/armv7): “autorizo o merge do PR #313 no commit ce226c4848add8b98a8671941f4ed8aec51af54b”
- coord REST (scripts/coord-lib.mjs, dono alexandre): patch pronto, 27/27 testes; precisa de sessão rodando como alexandre para virar PR.
- Deploy v1.0.10: só com “aprovo deploy v1.0.10”, depois de #311 e do CI de volta.

3. PRONTO, ENTRA AGORA QUE O CI VOLTOU (SHA no branch)
- #312 FCM core: c7e8f2e6 no PR; correção do RD-0460 no commit 3848b72, push segurado até o Actions voltar. Entra depois do #311.
- App FCM (nuvem/push-fcm-engenheiro-apps) 891cd462: corretor limpo, PR a abrir.
- Início foto/cabeçalho shell v2 (nuvem/inicio-cabecalho-engenheiro-apps-v2) 96ff516.
- Rodapé shell v2 (nuvem/rodape-shell-engenheiro-apps-v2) 61594e0.
- Core bko-revisao a238186d: corretor limpo.
- Banco rodapé b1661fbe: limpo; entra antes de sa-listas.
- API sa-listas 337b2e5 e ações da empresa d0495c3 (RD-0462/RD-0464 corrigidos; RD-0463 vai ao próximo lote) — falta reteste do corretor.
- Portal Inativar/Backup/Excluir eb3f7d76 — falta reteste do corretor (RD-0454).
- Kit thathyany 58b62e12 + testes kit-ps1 75609a4d.
- Logo do cliente d832bc4a: corretor e marca liberados.
- #298 Vendedor a7f25a42 + testes FB-1 c7c628b.
- #302 e-mails de senha + testes 75fd4f84.
- #296 banco ações da empresa: depois de sa-listas.
- #285 login-senha: 3 testes esperam o comportamento antigo (donos a corrigir).
Ordem do corretor: #311 → #312 · banco rodapé → sa-listas → API → portal · kit-ps1 com o kit · #298 com FB-1.

4. EXPO E FIREBASE
- Checklist para inativar o Expo: docs/producao/expo-inativacao-checklist.md (commit 7feb6d2). Ainda não pode: o push depende do FCM direto (#311 + #312 + app), que precisa do CI e da v1.0.10 instalada nos aparelhos. Nenhum agente mexe na conta Expo.
- Firebase 100%: código pronto (#311/#312/app FCM); falta a autorização do #311, os merges, o build e o deploy v1.0.10.

5. PENDÊNCIAS E MOTIVO
- Autorização de #311 e #313 (Alexandre, número + SHA).
- “aprovo deploy v1.0.10” (Alexandre).
- coord REST: sessão como alexandre.
- Kit CEP/DV: depende do Hub.
- Por ordem da ponte: nenhuma sessão nova aberta; sessões concluídas arquivadas. thathyany-conector intocado.

DECISÕES QUE VOCÊ PRECISA TOMAR
1. Autorizar #311 e #313 (frases acima).
2. Dizer “aprovo deploy v1.0.10” depois do merge do #311/#312 e do build.
3. Abrir uma sessão como alexandre para o PR do coord REST (ou autorizar outro caminho).
