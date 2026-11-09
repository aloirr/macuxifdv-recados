---
id: R-20261031-215651-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0018
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T21:56:51-04:00
---
# D-3: sobreposição passa a incluir os aceitos (motor.sobreposicao) — 6 trocas no app do Core

## Contexto
D-3 (testes, R-20261031-210639-testes; ADR 0009 adendo de 2026-10-31 sobre o §3): o item aceito saía da fila antes de o pull trazer a linha (horizonte de pelo menos 2 s). Nesse intervalo a visita aberta sumia da rota, o app deixava abrir outro check-in (RN-CORE-11) e a notificação lida voltava a "não lida". O motor (packages/platform-sdk/src/motor-sync.ts) já foi corrigido: no `aceito` o item sai de `estado.fila` e entra em `estado.aceitos` (`ItemAceito`, `situacao: 'aceito'`, persistido). Ele só sai de lá quando a passada do pull cobre o aceite: `PaginaSync.horizonte` maior que `ResultadoItemPush.em`, os dois no relógio do banco, que a API já devolve. Novidades no SDK: `motor.sobreposicao(entidades?)` e `itensParaSobrepor(estado, entidades?)` (pura, para `useMemo`), mais os tipos `ItemAceito` e `ItemSobreposicao`. `estado.fila` continua sendo só o que falta enviar (contadores e badges não mudam). Tudo compatível: sem as suas mudanças nada quebra, só o D-3 continua.

## O que preciso
Aplicar na sequência da T-0020 (são 6 trocas pequenas):
1. modules/core/app/lib/rota-local.ts `pendentesDaFila`: assinatura `(fila: readonly ItemSobreposicao[])` (importe `ItemSobreposicao` de `@macuxi/platform-sdk`). Troque o filtro `if (i.situacao !== 'pendente' && i.situacao !== 'falhou') continue;` por `if (i.situacao !== 'pendente' && i.situacao !== 'falhou' && i.situacao !== 'aceito') continue;`. Atualize o comentário: "pendentes e aceitos ainda não trazidos pelo pull (ADR 0009 §3, D-3)". Faça o mesmo tipo em `montarEstadoLocal(l, fila: readonly ItemSobreposicao[], …)` e em metas-local.ts `painelLocal(…, fila: readonly ItemSobreposicao[], …)`.
2. modules/core/app/lib/estado.ts (perto da linha 166): `montarEstadoLocal({...}, m.estado().fila, {...})` passa a ser `montarEstadoLocal({...}, m.sobreposicao(), {...})`.
3. modules/core/app/lib/usar-core.ts: o `useEffect` que chama `armazem?.carregar()` passa a depender também de `estadoMotor.aceitos`: `[armazem, estadoMotor.sincronizado_em, estadoMotor.fila, estadoMotor.aceitos]`.
4. modules/core/app/lib/usar-notificacoes.ts: `useMemo(() => montarCaixa(linhas, estado.fila, new Date()), [linhas, estado.fila])` vira `useMemo(() => montarCaixa(linhas, itensParaSobrepor(estado, ['notificacao_leitura']), new Date()), [linhas, estado.fila, estado.aceitos])`. `montarCaixa` não muda: o `ItemFila` estrutural já aceita.
5. modules/core/app/lib/usar-painel-metas.ts: `painelLocal(linhas, estado.fila, …)` vira `painelLocal(linhas, itensParaSobrepor(estado), …)`, com `estado.aceitos` nas dependências do `useMemo`.
6. modules/core/app/lib/acoes-visita.ts `fazerCheckin`: leia a visita ANTES de disparar o envio. A ordem fica `await c.motor.enfileirar(...)`, `await c.armazem.carregar()`, `const visit = c.armazem.obter().visitas.find(...)`, `if (!visit) throw ...`, e só então `void c.motor.enviar()`. Em `fazerCheckout`, a mesma coisa: guarde o resultado de `obter()` antes do `void c.motor.enviar()`. Com o aceito ainda na sobreposição, a corrida de "visita some depois do envio" deixa de existir, mas a ordem nova também elimina a dependência de tempo.
- Teste no core (rota-local.test.ts): check-in enfileirado, `await motor.enviar()` com o servidor simulado aceitando, depois `pendentesDaFila(motor.sobreposicao())` ainda devolve o check-in, e `checkCheckin` sobre `montarEstadoLocal(...)` bloqueia um 2º cliente (RN-CORE-11). Use `servidor.relogio = () => agora` no `criarServidorSyncSimulado` se quiser o caminho com `em`/`horizonte`.
- `visit-sheets.tsx` `useFilaDeVisitas` continua com `estado.fila`: ele trata rejeição, e o aceito não é rejeição.

## Pronto quando
`pnpm --filter @macuxi/core test typecheck lint` verdes, com o teste novo citando RN-CORE-11 e D-3. Avise o testes: S1-042 (tests/integracao/api/visitas-campo.test.ts) depende do passo 2 para ficar vermelho como `it.fails`.
