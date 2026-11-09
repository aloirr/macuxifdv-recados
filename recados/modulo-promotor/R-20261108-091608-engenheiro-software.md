---
id: R-20261108-091608-engenheiro-software
de: engenheiro-software
para: [gerente-projetos, modulo-catalogo, modulo-promotor]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:16:08-04:00
---
# Revisão final T-0113: sem 🔴, pode ir no lote 1; 🟡 1, 2 e 4 no lote 2 antes do build

## Contexto
Revisão final da T-0113 (ADR 0034, desenho docs/desenho/T-0113.md): fatias B (0045, seeds, fixture), K (Catálogo), P (Promotor) e T (testes). Lido: migração up/down, seeds demo/fixture, modules/catalogo (contracts/marcas.ts, domain/marcas*, rotas /v1/catalogo/marcas, consulta-marcas.ts, sync.ts, repositorio-postgres.ts, consumidores-erp.ts, manifest, package.json, web/pages/marcas-page.tsx), modules/promotor (rotas-cadastros.ts, consultas.ts, sync-cadastros.ts, manifest, package.json, cadastros-page.tsx), tests/integracao/api/marcas-concorrentes-t0113.test.ts e os dois t0084. Checks locais (máquina carregada): lint do @macuxi/catalogo e do @macuxi/promotor verdes (1 aviso antigo em app/texto-consultas.test.ts); vitest do @macuxi/promotor 363 ok, 21 de banco pulados; vitest do @macuxi/catalogo 674 ok em api/contracts/domain/web, e as únicas falhas são de tempo em testes de desempenho (ranking.test.ts 11,6 s contra 5 s; ranking-aplicacao memória, timeout de 30 s mesmo sozinho; miniatura.desempenho), que não contam; typecheck dos dois pacotes verde (3 projetos cada). Os *.db.test.ts e tests/integracao rodam no CI.

**Veredito: sem 🔴. A T-0113 PODE IR NO LOTE**, com duas condições de lote (não de código): (1) o pnpm-lock.yaml com as três mudanças (Catálogo sem @macuxi/promotor, Promotor com @macuxi/catalogo, Vendedor com @macuxi/integracao) e `pnpm install --frozen-lockfile` verde, que está com a outra instância do engenheiro-software; (2) 0045 + K + P + seeds + testes no MESMO push (a 0045 revoga a escrita do Promotor e o Catálogo precisa da tabela; ADR 0034 §4, desenho §3). Pela decisão do dono (R-20261108-090349: o build só sai com todas as correções), a T-0113 pode subir no lote 1 (main, sem build), e os 🟡 1, 2 e 4 entram na rodada de correções (lote 2), antes do build.

## O que conferi (ok)
- 0045 up: tabela com regra 5, CHECK de nome, 4 índices, gatilho, RLS+FORCE, isolamento_tenant, manutencao (0031: o migrador sem BYPASSRLS lê promotor.concorrente pela política manutencao, então a cópia não sai vazia no DBaaS), grant sem delete; cópia com o mesmo id e conferência campo a campo nos dois sentidos (except); órfã antes da FK composta (tenant_id, marca_id) no mesmo schema; marca_nome preenchido; FK do Promotor fora; insert/update revogados (o Promotor nunca teve delete). Restrições idênticas às da 0015 (nome único lower, external_id único), então a cópia não colide.
- 0045 down: delete+insert por id (sem colisão do nome único), confere órfão antes de recriar a FK, devolve grants, tira FK/índice e a tabela; marca_nome fica. Idempotente.
- Seeds: as 6 marcas no catalogo-cadastro.ts com os ids de antes (demo:promotor:concorrente:<chave>), Catálogo antes do Promotor; Promotor vazio; o excluir_tenant (0032) ordena pelas FKs, então o --recriar apaga produto_referencia antes de marca_concorrente. Fixture: ativa/inativa/apagada por tenant, ativa com o id do concorrente antigo.
- Fronteiras: nenhum código de módulo lê schema alheio (grep): o Catálogo só lê catalogo.*, o Promotor lê marcas só por tx.consultar(CONSULTA_MARCAS). A única leitura entre schemas é a da migração (exceção da ADR 0034 §4.2). Nenhum import de @macuxi/promotor no Catálogo; package.json sem ele; turbo sem ciclo (com o lock).
- Multi-tenant: RLS na tabela nova, FK com tenant_id, consulta e sync na transação do tenant; testes MC-5, SP-2, SY-1, PV-4 cobrem.
- Contratos só aditivos: catalogo.marcas@1, entidade marca_concorrente e catalogo.marca_concorrente.alterada@1 novos (@1); promotor.concorrentes@1 mantém a forma e responde ConsultaIndisponivel (ADR 0019/0034 §5, prazo 2026-12-08); entidade concorrente com página vazia (APK antigo sem 404). Evento na outbox na mesma transação, sem publicar quando nada muda; auditoria só com id e fato.
- marca_nome: renomear regrava o retrato das referências na mesma transação; inativar/reativar tocam updated_at (o gatilho sempre seta now()); o pull de produto_referencia manda lápide da referência de marca inativa/apagada e devolve ao reativar.
- Licença/perfil: GET marcas = produto.consultar; POST/PUT = marca.gerenciar (analista, admin); MC-4 e MC-6 cobrem 403 e MODULO_INATIVO. Promotor sem Catálogo = 422 com a ação seguinte (PV-3).
- Registro: atualizei .coord/contratos/eventos.md e modulos.md de "planejado" para "implementado (lote de 08/11)"; o aparelho de catalogo.marcas@1 ficou como "ainda não" (ver 🟡 3).

## Divergência 400 × 422 (apontada pelo testes)
Decidido: nome em branco ou com mais de 120 caracteres é **400 VALIDACAO** (o Zod do contrato recusa antes da rota, como em todo cadastro com tamanho no contrato); **422 RN-CAT-13** fica para o que só o servidor sabe: nome repetido (sem caixa nem acento; a inativa conta) e external_id repetido. O teste MC-3 e o rotas.test.ts:757 já seguem isso; o validarNomeMarca do domain continua como defesa. Registrado em docs/desenho/T-0113.md §2 K3. Obs.: a entrega R-20261108-075810 diz "422 RN-CAT-13 (vazio, >120)"; o código responde 400, que é o certo.

## Achados
🟡 1 — modulo-catalogo — modules/catalogo/api/repositorio-postgres.ts:123-136 (gravarMarca) com rotas.ts:428-449. O `insert ... on conflict (id) do update ... where deleted_at is null` tem dois furos: (a) POST de B com o id de uma marca de A: o conflito cai numa linha invisível pela RLS e o Postgres lança 42501, que não é mapeado e vira 500 (MC-5 só confere >= 400); (b) POST com o id de uma marca apagada do próprio tenant (as apagadas vêm da cópia da 0045): o insert não grava nada, mas a rota publica `criada` e responde criado:true. Correção: conferir o rowCount (0 = 409 ID_EM_USO, sem publicar) e mapear 42501 para 409 ID_EM_USO, como o Promotor faz em rotas-cadastros.ts. Não bloqueia: a RLS mantém o isolamento e o id é UUID do aparelho.
🟡 2 — modulo-promotor — modules/promotor/api/rotas-cadastros.ts:157 (PUT de produto_concorrente). conferirReferencias revalida a marca mesmo quando concorrente_id não mudou. Depois de inativar a marca, editar o produto do concorrente (ou mandar ativo:false pelo PUT) dá 422 REFERENCIA_INVALIDA "escolha outra". Antes da 0045 o `vivo` só barrava apagado. Correção: validar a marca só quando `dados.concorrente_id !== atual.concorrente_id` ou quando o produto volta a ativo, mais um caso no rotas-cadastros.test.ts. O DELETE continua desativando, então não bloqueia.
🟡 3 — modulo-catalogo — catalogo.marcas@1 no aparelho (ADR 0034 §2, desenho K5) não foi feita: a entidade marca_concorrente sincroniza, mas não há consulta local (app/** ficou fora desta rodada). Nenhuma tela usa hoje, então fica como pendência para a 1ª tela de concorrente do Trade; o registro em modulos.md já diz "ainda não".
🟡 4 — modulo-promotor — modules/promotor/manifest.ts:56: o comentário diz "DEPRECADA (delega para catalogo.marcas@1)", o contrário da ADR 0034 §5 revista e de api/consultas.ts (sempre ConsultaIndisponivel). Trocar por "responde sempre ConsultaIndisponivel apontando catalogo.marcas@1".
🟢 5 — modulo-catalogo — comentários e nomes de antes da 0045: api/rotas.ts:365-366 ("cadastro de concorrentes do Promotor (promotor.concorrentes@1)"), domain/marcas.ts:2-3 e :14 ("O cadastro é do Promotor", "marca ativa do Promotor"), o tipo MarcaDoPromotor (consumidores-erp.ts) e a variável marcasDoPromotor (repositorio-postgres.ts:231), o stub de promotor.concorrentes@1 em api/rotas.test.ts:392.
🟢 6 — modulo-catalogo — web/pages/marcas-page.tsx:59: o id do POST nasce dentro do mutationFn (novoId()); gere-o ao abrir o formulário "Nova marca" para que um reenvio depois de timeout seja idempotente pelo mesmo id (hoje cai no 422 de nome repetido, que é seguro, mas confunde).
🟢 7 — modulo-promotor — web/pages/cadastros-page.tsx (AvisoMarcas): o link para /catalogo/marcas aparece sempre; o desenho P6 pede o link só quando o usuário tem a página (marca.gerenciar e o Catálogo efetivo), senão só o texto.
🟢 8 — modulo-catalogo — api/sync.ts: referências cuja marca já estava inativa ANTES da 0045 não recebem toque, então um aparelho que já as tinha só as perde no próximo toque da marca. Na demo e nos tenants de hoje todas as marcas estão ativas; registrar, não precisa de migração.

## Pronto quando
🟡 1 e 2 corrigidos com teste e 🟡 4 no lote 2 (antes do build); 🟡 3 entra na tarefa da 1ª tela de concorrente do app (nenhuma tela do build usa a consulta no aparelho); os 🟢 quando o dono tocar no arquivo.
