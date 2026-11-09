---
id: R-20261107-004448-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0088
responde_a: R-20261107-002655-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-07T00:44:48-04:00
---
# Re: T-0088 A1 — 🟡 1 e 🟡 2 aplicados, 🟢 3 também; testes do apps/mobile verdes com o SDK novo

## Contexto
Resposta à revisão do A1 da T-0088 (R-20261107-002655), com o SDK novo (arquivo.ts, adendo §10) no working tree.

## O que fiz
- 🟡 1: `apps/mobile/src/lib/armazenamento-aparelho.test.ts`, 1º caso do describe. Reservas `sem_sqlite`, `forcado` e `ids_invalidos` agora com `usuarioId: ''`, e nenhum arquivo criado nas três. A demo (`u-vend-01`, sem tenant) dá `tipo: 'sqlite'`, arquivo `/^macuxi-u-h[0-9a-f]{32}-t-demo\.db$/`, sem o id cru no nome, arquivo presente na pasta, instância diferente do AsyncStorage, `fecharTodos` no fim (no Windows o arquivo aberto travava o `rmSync`).
- 🟡 2: `TEXTO_MOTIVO_RESERVA.ids_invalidos` = "sessão sem id de usuário" (com teste); comentário de `services/armazenamento.ts` = "sessão sem id de usuário".
- 🟢 3 aplicado: `state/plataforma.tsx` (abrirMotor): se a sessão saiu ou trocou de usuário OU de tenant durante a abertura, fecha o arquivo SQLite aberto (`fecharArmazenamentoDoUsuario`) antes do `return`.
- 🟢 6: mantido (id pseudônimo, como você disse).
- Junto, os 6 🟡 de UX do designer-ux (R-20261107-002124): o "Tentar de novo" agora mantém a tela de erro com o botão carregando (guarda contra toque duplo), o erro só sai no sucesso, `erroArmazenamento` passou a ser `{ detalhe, falhouDeNovo }` e o contexto ganhou `tentandoAbrir`. Há também "Enviar o detalhe ao suporte" (Share do RN, sem dependência nova; `mensagemParaSuporte` mascara e-mail e sequências longas de dígitos) e o TalkBack: o View em volta do AreaSeguraSuperior recebe `importantForAccessibility='no-hide-descendants'` com a tela por cima.
- Prettier da raiz (.prettierrc.json, 110 colunas) aplicado nos arquivos que toquei: o diff de plataforma.tsx e _layout.tsx cresceu por formatação, sem mudança de lógica além do que está acima.

## Testes
apps/mobile: eslint e tsc limpos, vitest 29 arquivos / 261 testes verdes, bundle Android de campo e gestao verde. Sem build EAS.

## Pronto quando
Fica pendente conferir no aparelho, no A2, que o Diagnóstico da demo mostra "SQLite (macuxi-u-h…-t-demo.db)". Isso depende do build liberado pelo gerente.
