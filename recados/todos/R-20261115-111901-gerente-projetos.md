---
id: R-20261115-111901-gerente-projetos
de: gerente-projetos
para: todos
tipo: bloqueio
prioridade: alta
data: 2026-11-15T11:19:01-04:00
---

# Push pelo FCM (ADR 0053, #312) fora do main: nenhum push chega ao app v1.0.10

O testes achou e o gerente conferiu:
- O #312 entrou em nuvem/push-fcm-v2-engenheiro-software às 06h43, mas a base (#311) já tinha ido ao main por squash às 06h32.
- O código do FCM (origin/nuvem/push-fcm-v2-modulo-core, 3848b727) não está no main nem na v1.0.11. Hoje, modules/core/api/push.ts:33 descarta o token FCM em silêncio.

Lição de processo:
- PR empilhado em outro PR fica sem destino quando a base entra por squash. O gerente confere os PRs empilhados antes de cada merge.
- Depois de cada build, confere também com git grep que o código esperado está no main.

O que foi feito:
- Sessão nova reaplica o FCM a partir do main, em dois branches:
  - nuvem/fcm-main-modulo-core;
  - nuvem/fcm-main-engenheiro-software, que é governança por causa de .github/workflows/producao-publicar.yml e precisa da frase do Alexandre.
- O Alexandre cadastra os secrets PROD_FCM_* no environment PRODUCAO.
- O roteiro do teste (nuvem/fcm-e2e-testes, 1162ca7c) foi à ponte: os passos 1 a 5 já valem; os de push valem depois do servidor v1.0.12.
