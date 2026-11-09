---
id: R-20261102-103953-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0059
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T10:39:53-04:00
---
# Entrega da rodada: revisões T-0032 (1🔴 A7/A8) e T-0042 (0🔴), desenho T-0060/T-0061 + ADR 0016, motor da T-0059 retoma a carga + ADR 0017

## Contexto
Rodada de 02/11 do engenheiro-software: revisões finais da T-0032 e da T-0042, desenho da T-0060/T-0061 (prioridade do R-20261102-094239) e a parte do motor da T-0059.

## O que fiz
1. **Revisão T-0032** (R-20261102-095157): 1🔴 — consumidores A7 (aplicar lote) e A8 (pedido aprovado → fila) não existem; o lote nunca sai de `recebido` e o critério "lote só de inválidas termina concluído com erros" não é demonstrável. Decisão sua: modulo-integracao entrega A7/A8 antes de fechar, ou os 2 critérios vão para tarefa nova (recomendo, pelo prazo). 3🟡 (BKO mostra a política gravada e não a efetiva; textos do piso em hub-api.md:312 e bko-politica.ts:4-6), 3🟢. Confirmados: 🔴 T-0023 lado Hub (e Conector 1.2.1), 🔴 T-0025 SHA-256, decisão do piso 1.2.1 fechada (R-210419 e R-233748 encerrados), PR #24 sem 🔴. `@macuxi/integracao` 386/386.
2. **Revisão T-0042** (R-20261102-095308): 0🔴, aprovada; 🟡 o Core ainda lê `plataforma.tenant` na carteira (carteira.ts:35). Meu lado resolvido: `ServicosCore.carteira(usuario, banco, opcoes?: OpcoesServicoCarteira)` com `{ agora, fuso }` da requisição (packages/platform-sdk/src/api.ts, apps/api/src/app.ts, teste em apps/api/test/app.test.ts, 40/40). Varredura de relógio sem achados.
3. **Desenho T-0060/T-0061**: docs/desenho/T-0060.md, docs/desenho/T-0061.md, ADR 0016 (proposta: pedido ao ERP ampliado no v1; quantidade sempre na unidade base fora do Vendedor; pedido com CX/frete/acréscimo/endereço só vai a Conector ≥ 1.3.0, sem subir o piso geral). Premissas de schema confirmadas. `@macuxi/comum/documento` (CNPJ/CPF com DV, `completarCnpj` para a demo; 6 testes). Pedidos com os nomes finais: banco-dados R-100400, modulo-core R-100401, modulo-integracao R-100403, modulo-vendedor R-100405, modulo-catalogo R-100406.
4. **T-0059 (motor)**: causa do "recomeça do zero" = ressincronização de escopo carteira sem versão guardada zerava o cursor. Agora `sync:ressinc:<e>` (gravado antes de cada página) e `sync:carga` (carga inicial: entidades/etapas concluídas + coberturas D-3) → retoma da página seguinte e pula o concluído; `EstadoMotorSync.carga` (entidade, modulo, concluidas, total, paginas, retomada) para a tela; `CARGA_VAZIA` exportado. ADR 0017 (proposta): segundo plano com expo-background-task (delta a cada ≥ 15 min, só com carga inicial feita, rede e sessão; 60 s). 🟢 do engenheiro-apps: `errorMessage` do web nunca devolve JSON do Zod.

## Arquivos (meus)
packages/platform-sdk/src/{motor-sync.ts, motor-sync.retomada.test.ts, api.ts, react/index.tsx, web/api.ts, web/api.test.ts}; packages/comum/{package.json, src/index.ts, src/documento.ts, src/documento.test.ts}; apps/api/{src/app.ts, test/app.test.ts}; docs/desenho/T-0060.md, docs/desenho/T-0061.md; docs/decisoes/0016-pedido-ao-erp-ampliado-no-v1.md, 0017-sincronizacao-em-segundo-plano.md; .coord/diario/engenheiro-software.md.

## Testes
platform-sdk: motor 116/116 (5 arquivos, inclui retomada 24 casos), web/api 7/7, typecheck verde; comum documento 6/6 + typecheck; api app.test 40/40 + typecheck; lint dos arquivos tocados limpo; typecheck do web verde. `node scripts/coord.mjs verificar engenheiro-software` OK.

## Pendências
- Typecheck do **mobile** só falha em apps/mobile/src/components/tela-carga.test.tsx:49 (falta `carga: CARGA_VAZIA`, arquivo do engenheiro-apps; pedido R-20261102-103858). É condição do commit.
- Seu OK nas ADRs 0016 e 0017 (propostas) e a decisão do 🔴 da T-0032.
- T-0059 item 4 (tempo da carga da demo pelo túnel) fica para o próximo APK de preview.
- Caixa antiga não tratada nesta rodada (gestor T-0014, CODEOWNERS T-0005, T-0037 pós-merge, ia_timeout_ms, lockfile do Gestor/Conector): sigo na próxima.
