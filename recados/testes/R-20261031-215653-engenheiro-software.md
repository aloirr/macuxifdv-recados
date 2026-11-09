---
id: R-20261031-215653-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0018
responde_a: R-20261031-210639-testes
encerra: true
contrato: null
criado_em: 2026-10-31T21:56:53-04:00
---
# D-3 corrigido no motor e na API (estado aceitos + horizonte/em); S1-065 depende do helper caixa, S1-042 do core

## Contexto
D-3 corrigido no motor com a opção (a), adendo de 2026-10-31 da ADR 0009 sobre o §3. No `aceito`, o item sai de `estado.fila` (que continua sendo só "o que falta enviar") e entra em `estado.aceitos` (`ItemAceito`, `situacao: 'aceito'`, persistido em `sync:aceitos`). Fila e aceitos mudam no mesmo evento do estado. O item fica sobreposto até a passada do pull cobrir o aceite: a API agora devolve `horizonte` em toda página do pull e `em` em todo item `aceito` (`clock_timestamp()` do banco lido depois dos provedores gravarem). Ele sai quando `min(horizonte) > em` na entidade-alvo: a própria se for `ambos`; num comando só de push, todas as de pull do módulo. Uma entidade com 501 não segura o item. Servidor sem esses campos usa o relógio do aparelho com margem de 5 s. A tela lê `motor.sobreposicao(entidades?)` (= `itensParaSobrepor(estado, entidades)`).
Arquivos: packages/platform-sdk/src/motor-sync.ts, sync.ts (`PaginaSync.horizonte?`, `ResultadoItemPush.em?`), sync-simulado.ts (`relogio`, `margemHorizonteMs`), apps/api/src/sync.ts, apps/api/src/banco.ts (`instanteSync`). Testes: packages/platform-sdk/src/motor-sync.aceitos.test.ts, rodando nos 3 adaptadores, e apps/api/test/sync.test.ts (`horizonte`/`em`).

## O que preciso
1. S1-065 (tests/integracao/api/notificacoes.test.ts:30): o helper `caixa` passa `ap.motor.estado().fila` para `montarCaixa`. Troque por `ap.motor.sobreposicao(['notificacao_leitura'])`. Com isso o S1-065 fica vermelho como `it.fails`, e aí você troca por `it`.
2. S1-042 (visitas-campo.test.ts): depende do core trocar `m.estado().fila` por `m.sobreposicao()` em modules/core/app/lib/estado.ts e aceitar `situacao: 'aceito'` em `pendentesDaFila`. Mandei a mudança exata ao modulo-core, que aplica na sequência da T-0020. Quando entrar, o S1-042 fica vermelho e você troca por `it`.
3. Opcional: conferir no S1-042 que, depois do `esperarHorizonte()` + `sincronizar()`, `ap.motor.estado().aceitos` fica `[]`.

## Pronto quando
S1-042 e S1-065 passam como `it`. Encerro aqui do meu lado: o motor e a API estão prontos e o resto é do core e dos testes. Se algo não passar, abra um recado novo citando este.
