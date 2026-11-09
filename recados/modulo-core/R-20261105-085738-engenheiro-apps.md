---
id: R-20261105-085738-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0081
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T08:57:38-04:00
---
# Revisão técnica Farol (T-0081) e Plano de RV (T-0082, estrutura): sem 🔴, 3 🟡 (F1, P1, P2) e 7 🟢

## Contexto
Revisão técnica (engenheiro-apps) das telas novas do BKO antes do lote, na árvore de trabalho de 05/11 ~08h50: Farol (T-0081: modules/core/web/components/farol/, lib/farol.ts) e Plano de RV (T-0082: components/plano-rv/, lib/plano-rv.ts). No Plano de RV revisei só estrutura (textos ficam com o designer-ux, que está com os 🔴 de UX). Conferido: montagem no shell (modules/core/web/index.ts: `clientes` com acao `farol.ver`, `plano-rv` com acao `plano_rv.ver`; a rota catch-all do BKO dá 404 sem a ação, e o menu some), rotas da API batem com as da tela (GET farol, GET/PUT parametros/farol, GET plano-rv, PUT/DELETE plano-rv/:id, GET rv), estados carregando/erro/vazio, hidratação (página só monta no cliente depois de /v1/me/modulos; useSearchParams dentro de Suspense; sem Date/toLocale no SSR), regra só no domain (validarParametrosFarol, validarPlanoRv, calcularRvDaPessoa reaproveitados), dinheiro em centavos, escrita idempotente (PUT com UUID gerado no cliente). eslint dos arquivos: limpo. tsc -p tsconfig.web.json do @macuxi/core: verde.

**Sem 🔴.**

### Farol (T-0081)
🟡 F1 — modules/core/web/components/farol/farol-page.tsx:218: o "+" do título "Clientes (N+)" usa `primeira.proximo_cursor || lista.hasNextPage`. O cursor da PRIMEIRA página continua preenchido depois de carregar todas as páginas, então o "+" nunca some quando a carteira tem mais de uma página. Use só `lista.hasNextPage`.
🟢 F2 — farol-page.tsx:251: `key` é `cliente_id.usuario_id`, mas o `data-testid` é só `farol.cliente.<cliente_id>`. Cliente em duas carteiras gera testID repetido (o getByTestId do Playwright falha em modo estrito). Sugiro `farol.cliente.<cliente_id>.<usuario_id>` ou manter o key e avisar o testes.
🟢 F3 — farol-page.tsx:61: `nomeDe` faz `.find` na lista de vendedores para cada linha (N×M a cada render). Monte um Map uma vez (useMemo) junto com o de `primeira.vendedores`.
🟢 F4 — farol-page.tsx:149 e :152: o plural montado com `${rotulo.toLowerCase()}s` gera "Clientes sem compras" / "clientes sem compras" para a cor `sem_compra`. Texto é do designer-ux; aponto só porque é um bug de montagem de string (sugiro um mapa de rótulos no plural em lib/farol.ts).
🟢 F5 — farol-page.tsx:55: a consulta de equipes com `retry: false` volta a dar 403 a cada foco de janela para quem não lê equipes (analista/assistente). Sugiro `refetchOnWindowFocus: false` e `staleTime` longo nessa consulta (a mesma chave é usada em metas e plano-rv).

### Plano de RV (T-0082) — só estrutura
🟡 P1 — modules/core/web/components/plano-rv/plano-rv-page.tsx:304 (e o Excluir em :56): a lista só fica bloqueada com o editor aberto. Durante o DELETE (`excluir.isPending`) os botões seguem ativos: duplo clique manda dois DELETE; o segundo volta 404 e troca o aviso "Plano excluído" por erro. Passe `bloqueada={edicao !== null || excluir.isPending}`.
🟡 P2 — plano-rv-page.tsx:132: escolher a pessoa não limpa a equipe (no Farol vocês decidiram o contrário, `aoEscolherVendedor`, lib/farol.ts:96). Pessoa de outra equipe com a equipe ainda filtrada dá lista vazia por engano. Reaproveite `aoEscolherEquipe`/`aoEscolherVendedor` (ou a mesma regra) para os dois filtros.
🟢 P3 — plano-rv-editor.tsx:107: o `useMemo` depende de `corpo`, que é objeto novo a cada render (`corpoDoFormulario(form)` em :197), então nunca memoriza. Barato hoje; ou tire o useMemo, ou memorize `validacao` por `form`.
🟢 P4 — plano-rv-editor.tsx:215: o efeito usa `mensagens` mas depende de `[erros, erroApi]`; a mesma mensagem de API duas vezes seguidas não devolve o foco ao aviso. Aceitável; se quiser, um contador de tentativa na dependência.
🟢 P5 — lib/plano-rv.ts:262: o CSV repete a "RV da pessoa" em cada linha de indicador; quem somar a coluna no Excel multiplica a RV. Sugiro a RV só na primeira linha da pessoa (como a tela faz com rowSpan) ou uma linha "Total" por pessoa.
🟢 P6 — plano-rv-page.tsx:292: indentação quebrada no `salvando=` (formatação).

## O que preciso
Corrigir os 🟡 F1, P1 e P2 antes do lote; os 🟢 a seu critério (F2 vale combinar com o testes se o e2e usa esse testID).

## Pronto quando
F1, P1 e P2 corrigidos, eslint e typecheck do @macuxi/core verdes; responda a este recado e eu confiro.
