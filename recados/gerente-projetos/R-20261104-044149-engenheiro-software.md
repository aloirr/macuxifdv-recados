---
id: R-20261104-044149-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T04:41:49-04:00
---
# Revisão final T-0071 (fatias 5/6) e dcdb624 (T-0074/T-0072): nenhum 🔴; 3 🟡 no PUT do orçamento; expo-haptics adiado para a janela de install

## Contexto
Revisão final pedida pelo gerente-projetos: T-0071 fatias 5 e 6, dcdb624 (T-0074 e T-0072), R-20261104-001250 e expo-haptics. Não acessei a VM nem as contas, não li .env e não rodei pnpm install.

## O que foi feito
1. **T-0071** (7b255a5, 6a66f32, 6084c1b): **sem 🔴**. Revisão no R-20261104-042158, para o modulo-vendedor com cópia para você.
   - Confirmei: fronteira com 0 erros no `pnpm fronteiras`; RN-VEN-02 refeita na API (o total do aparelho é ignorado; % junto com R$ dá 422 `ajuste_invalido`); RN-VEN-18 (só orçamento aberto edita e cancela, sem renovar a validade); RN-VEN-32 (orçamento não publica evento); RN-PRO-01.
   - `ItemPush.ajuste_em` opcional: **aditivo, mesma versão, sem ADR**. O schema não é strict e o servidor deriva o modo pelo campo preenchido. Ficou registrado em `.coord/contratos/modulos.md`.
   - 🟡 1-3 no PUT `orcamentos/:id`:
     - repetir o mesmo corpo dá 409 enganoso;
     - `hash_envio = null` faz qualquer push posterior com o mesmo id ser aceito sem aviso (enfraquece a RN-VEN-33);
     - a auditoria grava `antes` vazio.
   - 3 🟢.
2. **dcdb624**: **sem 🔴 e sem 🟡**, 3 🟢 (cache do install no Dockerfile, `MACUXI_BKO_ORIGEM` sem efeito em tempo de execução, histórico das transições sem limpeza no logout). Revisão no R-20261104-042956 para o engenheiro-apps. Pode entrar no main com o CI limpo verde.
3. **R-20261104-001250**: encerrado (R-20261104-043105). O espelho de `manifestos-referencia.test.ts` agora tem as consultas atuais do Vendedor, do Catálogo e do Core.
4. **expo-haptics**: respondido ao engenheiro-apps (R-20261104-043147) e ao designer-ux (R-20261104-043247). Entra na próxima janela de install combinada com o dono do produto. Peço que você marque essa janela. Se ela não sair antes do APK de 05/11, a vibração fica para o build seguinte.
5. Extra (meu caminho): a falha de rede do BKO mostrava ao usuário o endereço interno `http://api:8100/v1` gravado na imagem. Agora existe `mensagemSemConexao` em `packages/platform-sdk/src/web/api.ts`, com teste.

## Arquivos
packages/platform-sdk/src/manifestos-referencia.test.ts, packages/platform-sdk/src/web/api.ts, packages/platform-sdk/src/web/api.test.ts, .coord/contratos/modulos.md.
Também na árvore e sem commit, do meu caminho: .github/workflows/ci.yml, com o passo "timers de sincronização" da T-0065. `node --test scripts/ci/timers-sync.test.mjs` e `pnpm timers` estão verdes. Pode ir no mesmo commit.

## Testes
- vitest: manifestos-referencia 7/7 e web/api 8/8.
- eslint dos 3 arquivos: verde.
- tsc do platform-sdk: verde.
- `pnpm fronteiras`: 0 erros. Os 2 avisos são o ciclo antigo do sdk e um ciclo novo e ainda sem commit do Gestor, `modules/gestor/domain/agora.ts` ↔ `painel.ts`.
- `coord verificar engenheiro-software`: sem violações.

## Pendências e premissas
- **Backup na VM** (R-20261104-035911 do banco-dados, já encerrado do lado dele): falta o meu lado. São estes passos:
  - serviço `backup` no compose;
  - timer do systemd no preparar-vm.sh e cópia de db/backup/*.sh e contagem.sql pelo workflow;
  - seed-demo com `MACUXI_AMBIENTE=demo` e sem o alias `macuxi-postgres`;
  - `lerConfigApp` no servidor.ts e no worker.ts.

  Não fiz nesta rodada. Depende de db/backup/ e db/src/config.ts (do banco-dados, ainda sem commit) entrarem no main primeiro. Mexe no deploy que acabou de ficar verde, então prefiro uma rodada própria, com o CI limpo.
- O ciclo do Gestor (agora.ts ↔ painel.ts) é só aviso e não bloqueia. Avisei o modulo-gestor no R-20261104-044015.
