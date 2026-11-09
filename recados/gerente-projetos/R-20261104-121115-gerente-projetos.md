---
id: R-20261104-121115-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [gerente-projetos]
tipo: bloqueio
prioridade: alta
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T12:11:15-04:00
---
# Status 12h (04/11): sem build de APK até 01/12 (cota Free da Expo esgotada) e merge travado pelo tempo do gh; #84 pronto; PRs #85–#90 abertos

## Contexto
Status das 12h de 04/11, pedido na retomada.

## 🔴 Bloqueio 1: sem build de APK até 01/12
A Expo recusou o build de preview do 297dc60 (R-20261104-120724-engenheiro-apps): a conta `macuxifdv` gastou os builds Android do plano gratuito deste mês. Isso vale para o teste de hoje **e para o APK de 05/11**. O worktree limpo, o `eas.json` (com `api-demo`) e o bundle das duas variantes estão OK. Opções, todas decisão sua:
- **(a)** assinar o plano pago da Expo na conta `macuxifdv`. O engenheiro-apps dispara os dois builds de novo a partir de 297dc60, em 30–60 min. É o mais rápido e não muda nada no projeto;
- **(b)** usar outra conta Expo. Exige trocar owner, projectId e credenciais, então o build deixa de sair do 297dc60 puro;
- **(c)** gerar o APK no próprio PC com o Android SDK (`eas build --local` ou gradle). Precisa da sua autorização e de conferir se o SDK está instalado. Com o PC lento como está hoje, leva horas.

## 🔴 Bloqueio 2: merge travado pelo tempo do gh
- O guardião confere o PR pelo `gh` em até 20 s, mas aqui o `gh` leva 25 s ou mais só para iniciar. O Docker também travou.
- O **#84** (T-0073, head 4c3d72d) está em dia com o `main`, `ci-ok` verde e sem governança: pronto, mas o merge foi recusado 2 vezes pelo guardião. Não contornei.
- Saídas: reiniciar o PC; você fazer o merge pelo site (squash, título "T-0073: boas-vindas (Início) e recado do dia (#84)", corpo "Agente: modulo-core"); ou aumentar o tempo do guardião (`.claude/hooks/guarda-bash.mjs`, seu).

## PRs abertos (um dono por PR, regra A)
- #85 Gestor, card de aprovações (063056d)
- #86 Vendedor, 🔴 da UX e PUT do orçamento (826f9b6)
- #87 Core, corrida em medidas (ba53ab3)
- #88 Catálogo, estoque no pull (b780895)
- #89 coordenação (501843a)
- #90 governança, passo dos timers no `ci.yml` (1ff5443). Precisa do seu recado "autorizo o merge do PR #90 no commit 1ff5443…" com o SHA completo do head.
- O PR do testes (P4 e regressão da UX, commit local 7fcf535) abre depois do #86 e do #88.
- O d40267d (backup no deploy) fica local até repetir o stack isolado, que hoje está impedido pelo Docker travado.

## T-0071, T-0073 e backlog
- **Revisão de UX da T-0071 fechada**, sem 🔴 (R-20261104-112541). Os 🟡 finais (detalhe que carrega sem fim, avisos) estão com o modulo-vendedor, com limite de 60 min.
- **testes:** regressão da UX 7/7 e sugestões offline 5/5, sem defeito de produção.
- **Início no shell (T-0073):** começa assim que o #84 entrar no `main`.
- **Backlog:** positivação acumulada do mês com clientes distintos (banco-dados, opção 3), depois do APK.

## ADR 0020 (resumo para aprovação)
1. VM da Magalu com um Docker Compose (api, worker, bko, Postgres interno, cloudflared).
2. Nenhuma porta aberta: HTTPS pelo túnel. SSH só por chave, fail2ban, atualizações automáticas.
3. Imagens no GHCR, publicação automática a cada merge verde no `main` e recriação manual da base demo.
4. Segredos gerados na VM ou vindos só dos secrets; nada no repositório.
5. Fotos no bucket por um adaptador S3 sem SDK, com isolamento por tenant. Backup diário `pg_dump` por 7 dias. Produção terá ADR própria.

## Pronto quando
Você escolher (a), (b) ou (c) para o APK e destravar o merge (opção 1, 2 ou 3 do bloqueio 2).
