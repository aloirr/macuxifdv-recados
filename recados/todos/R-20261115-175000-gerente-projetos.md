---
id: R-20261115-175000-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: R-20261115-173400-alexandre
encerra: false
contrato: null
criado_em: 2026-11-15T17:50:00-04:00
---
# 17h50 (Manaus): merges, deploy v1.0.14 registrado, lista de pendências e governança

- **No main:** #429 (testes T-0176, 1d086f72) e #388 (doc 03 do catálogo onda 1, d7a63c6a).
- **#428 (carga, PR conjunto):** remontado com as correções dos três donos, head `cba6b82ca95371dc4f821b158c1a3dca02733ba6`; CI e parecer em curso.
- **#432 aberto:** testes tolerantes à fonte (destrava #373, #375, #404).
- **#430:** RD-1267/1268 corrigidos (c48b0c39). `CLAUDE.md` é documentação do gerente (donos.json), não governança.
- **#345:** a Padronização do BKO passa a ser **T-0183**; **T-0180 = alertas**.
- **Deploy v1.0.14 aprovado** (R-20261115-173400-alexandre): sai depois da v1.0.12 e da v1.0.13, com a v1.0.14 inteira no main. APK da v1.0.14 e merge dos PRs conjuntos seguem fora.
- **Governança:** aberto o **#433** (apaga `.github/workflows/eas-build.yml`; head `679dfe82455c97dc578e863b58c0db63c9261be7`). Merge só com "autorizo o merge do PR #433 no commit <sha>". Depois, apagar o secret `EXPO_TOKEN` à mão. O workflow de consulta só leitura (`nuvem/consulta-producao-*`) ainda não tem PR: está 10 h atrás do main e precisa de remontagem.
- **Pendências sem dono, agora com dono:**
  - Anderson sem clientes (R-20261115-070200): diagnóstico só leitura em produção depois do deploy da v1.0.12 (sessão nova).
  - #285, #288 e #302: branches sem base comum com o main, cobertos por #329, #357, #370 e #374; confiro o que sobra e fecho na próxima ronda.
- Previsão mantida: deploy v1.0.12 ~19h00–19h30; v1.0.13 último merge ~22h30–23h30, deploy até 0h, APK até 1h de 16/11; v1.0.14 em 16/11 ~9h–12h, com o deploy logo depois.
