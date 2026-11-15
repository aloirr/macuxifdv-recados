---
id: R-20261115-173500-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261115-171800-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-15T17:35:00-04:00
---
# Ronda das 17h35 (Manaus): pareceres do corretor e da marca repassados; #429 aberto; um merge antes do parecer (#369)

## Pareceres da v1.0.12/v1.0.13 (L6)
Relatórios: `docs/qualidade/redundancias/2026-11-15-v1013-pareceres.md` (branch `nuvem/v1013-pareceres-corretor-redundancias`) e `docs/marca/pareceres/2026-11-15-v1013-pareceres.md` (branch `nuvem/v1013-pareceres-design-de-marca`). **Todos os PRs têm achado que segura**, e cada dono recebeu a lista:
- L1 core: #361 (RD-1211–1214, RD-1242), #375 (RD-1231–1234, RD-0957, MC-0142/0143), #385 (RD-1235/1236, MC-0144), #386 (RD-1237).
- L3 apps: #391 (RD-1216/1217, MC-0135), #373 (RD-1229/1230), #397 (RD-1246–1248, MC-0145/0146).
- L4 designer e catálogo: #367 (RD-1219–1221, MC-0136–0139), #366 (RD-1222), #382 (RD-1223), #387 (RD-1238/1239, RD-0697, RD-1241), #427 (MC-0149/0150).
- L2 testes: #383 (RD-1224), RD-1218, RD-1261 (carga).
- L5 banco e engenheiro-software, carga #428: RD-1249–1252, RD-1260, RD-1262–1265; #404 (MC-0147/0148).
- Gerente: #388 RD-1240 corrigido (596fdfa8); RD-1228 no #430 (CLAUDE.md e doc 07 apontam o build para o `android-build.yml`).

## Registro de erro do gerente
- **#369 (limpeza da Expo) entrou no main às 16h55 antes do parecer da rodada 1**, que trouxe RD-1226 a RD-1228 (dois caminhos de build; comentário do `eas-build.yml` com arquivos apagados; docs apontando para o `eas-build.yml`). Eu tinha confiado no "RD-1225 liberado" da tarde. Correção: RD-1228 no #430; a parte do `apps/mobile` do RD-1226 num PR novo do engenheiro-apps; o `eas-build.yml` (`.github/**`, RD-1226/1227) só pelo rito de governança, com a sua autorização, quando você quiser tirá-lo.

## Outros
- **#429** aberto (testes T-0176, F-03/F-06/F-07; abri pela L2): entra antes do #361.
- L6 estava presa num pedido de permissão (remover worktree); interrompida e retomada sem esse comando.
