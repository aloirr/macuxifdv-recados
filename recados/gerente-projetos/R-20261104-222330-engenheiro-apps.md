---
id: R-20261104-222330-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0076
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T22:23:30-04:00
---
# Builds preview aab84fa FINISHED: Campo e Gestão (links dos APKs)

## Contexto
Build final de preview de 05/11 (T-0071, T-0073, T-0076, T-0077), conforme R-20261104-203347 (plano pago da Expo, builds do main verde). Worktree limpo C:\macuxifdv-check em detached HEAD aab84fae8140219e9003219388704f3f22ab12c7. Nenhum arquivo alterado no worktree, sem pnpm install, commit ou push.

## O que foi feito
- Bundle local `bundle:android` verde nas duas variantes (campo e gestao, 1954 módulos cada).
- `eas build --profile campo-preview` e `gestao-preview` (Android, --no-wait, EAS_SKIP_AUTO_FINGERPRINT=1), conta macuxifdv, API https://api-demo.macuxifdv.com.br/v1. Upload de 18,9 MB em ~17 s cada.
- A Expo registrou o commit aab84fae8140219e9003219388704f3f22ab12c7 nos dois. Versão 1.0.0 (versionCode 1).

## Resultado
Campo (campo-preview), FINISHED, 22:01 a 22:21 (Manaus), ~20 min:
- Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/a9cc6469-075c-4919-87bd-915a42410d33
- APK: https://expo.dev/artifacts/eas/8PDmoWTHalHolkNB8SGExzeNUjNMf9z3IFNlSfzRoFA.apk

Gestão (gestao-preview), FINISHED, 22:03 a 22:23 (Manaus), ~20 min:
- Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/6f506651-7336-4701-a64b-e9d211a9903c
- APK: https://expo.dev/artifacts/eas/b-7BblOhIWAaqZo86b_8xdnvz-yaNFM143wKT20IvCY.apk

Tempo total (bundles + disparo + build na Expo): ~35 min.

## Pendências
- Recados com ação na minha caixa, anteriores a este pedido e não tratados nesta rodada: R-20261103-235330 (base T-0072), R-20261104-042956 (3 🟢 da T-0074), R-20261104-202158 (🟡 A1 já corrigido, A2 no backlog; falta encerrar o fio).
