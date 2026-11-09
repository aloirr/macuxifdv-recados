---
id: R-20261104-234131-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0079
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:41:31-04:00
---
# T-0079 pronta para lote: revisão final sem 🔴/🟡 (SDK, API, 0022 do banco, limpeza do Vendedor); lerConfigApp pode subir com o CI

## Contexto
T-0079 (app percebe a base recriada). Entrega parcial anterior: R-20261104-232313. Agora com a revisão final.

## O que preciso / o que mudou
**Revisão final T-0079: sem 🔴 e sem 🟡.** Um 🟢 ao modulo-vendedor (R-20261104-233945: apagar baseFoiRecriada/planoBaseRecriada, que repetem a regra do SDK; não bloqueia).

Arquivos do lote T-0079:
- engenheiro-software: docs/decisoes/0021-geracao-da-base-no-sync.md (proposta) e README.md; docs/desenho/T-0079.md; packages/platform-sdk/src/{geracao-base.ts, geracao-base.test.ts, motor-sync.ts, motor-sync.geracao.test.ts, sync.ts, novidades.ts, sync-simulado.ts, index.ts}; apps/api/src/{banco.ts, sync.ts}; apps/api/test/geracao-base.test.ts.
- banco-dados (R-20261104-232418): db/migrations/0022_plataforma_geracao_base.*, db/seeds/demo/demo.ts, db/backup/restaurar-vm.sh e LEIA-ME, db/esquema/plataforma.ts, docs/banco/plataforma.md, db/testes/{geracao-base,seed-demo,backup}.test.ts.
- modulo-vendedor (R-20261104-232802): modules/vendedor/app/etapas.ts (+ .test), modules/vendedor/domain/base-recriada.ts (+ .test).
- Pendente: testes (R-20261104-232253, ponta a ponta com Postgres). Pode entrar depois, em outro lote.

Testes meus: platform-sdk 404/404 (31 arquivos); apps/api 147 passados, 55 de banco pulados (Docker desligado no PC; rodam no CI); tsc do SDK (node e web) e da API verdes; eslint dos arquivos tocados limpo; verificar sem violação. Os testes de banco da 0022 só rodam no CI (Docker do PC desligado).

Premissas: o campo não vai no /me/modulos nem no login (o APK lê com .strict(); ADR 0021 §3). O APK de 05/11 não tem o motor novo: o efeito vem no próximo build. A 1ª geração vista é adotada sem limpar; o fantasma atual do Lucas sai no próximo --recriar depois do APK novo, ou com "Limpar dados" uma vez.

Separação dos commits (pergunta do gerente): o trecho `lerConfigApp` de apps/api/src/servidor.ts e apps/api/src/worker.ts (d40267d) **pode subir com o CI**: `lerConfigApp` já está no main (db/src/config.ts:123 em HEAD) e não depende da VM. Só scripts/deploy/demo/{compose.yml, implantar.sh, preparar-vm.sh} e scripts/demo/LEIA-ME.md esperam o stack isolado. Atenção: servidor.ts e worker.ts agora também têm o log de métricas da T-0078 (abaixo); se for separar, os dois arquivos vão inteiros num lote só (T-0078 + lerConfigApp), que não depende da VM.

Sem dependência nova; nada de pnpm install.

## Pronto quando
Lote T-0079 no main com CI verde (inclui os testes de banco da 0022 no CI).
