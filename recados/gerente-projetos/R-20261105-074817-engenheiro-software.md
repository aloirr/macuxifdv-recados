---
id: R-20261105-074817-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0083
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T07:48:17-04:00
---
# T-0083 comando com import estático (verde) + revisões finais T-0039 e T-0081 sem 🔴

# T-0083 (comando com import estático) + revisões finais T-0039 e T-0081: sem 🔴

## Contexto
Pedido do gerente nesta rodada: fechar o comando da T-0083 com o reexport do Core (R-20261105-071929) e fazer a revisão final da T-0039 (alerta de etapa pendente no Gestão) e da T-0081 (Farol de clientes).

## O que fiz
**T-0083**
- `apps/api/src/cli/tenant.ts`: a política vem por import estático de `@macuxi/core/api` (`POLITICA_DO_CORE = { normalizarEmail, validarSenhaInicial }`). Saíram `politicaDoCore` e o caminho "sem política"; `DepsTenant.politica` agora é obrigatória.
- A cópia de `HOSTS_LOCAIS`/`ehBancoLocal` trocada pelo export de `@macuxi/db` (R-20261105-072635).
- Bug corrigido: `limparMensagem` trocava o nome curto do admin dentro do texto. Com nome "A", a mensagem saía "[omitido] senha precisa...". Agora valores com menos de 3 caracteres não são trocados.
- `apps/api/test/cli-tenant.test.ts`: teste novo com a política REAL do Core e asserções da limpeza com nome curto.
- `docs/desenho/T-0083.md` §6 atualizado.
- Fumaça do `pnpm tenant:criar` de verdade, com senha fraca: a política do Core recusou antes de abrir o banco, e o import em tempo de execução pelo tsx funcionou.
- A criação do admin no banco fica com o `cli-tenant.banco.test.ts` (0029) e o `tests/integracao/multitenant/onboarding-t0083.test.ts` no CI.

**T-0039: sem 🔴** (R-20261105-074610 ao modulo-gestor)
- 🟡1: alerta resolvido continua na aba. O Core nunca apaga a notificação na baixa. Pedido R-20261105-074615 ao modulo-core: `deleted_at` pelo `envio_id`. Até lá, o Gestor aplica a janela de 30 dias.
- 🟡2: o tipo `NotificacaoPendencia` está duplicado; usar `Pick<NotificacaoSync>`.
- 🟡3: detecção por título, que perde o caso do vendedor sem nome. Aguarda o `subtipo` (já pedido ao banco-dados).
- 3 🟢.
- Também encerrei G-3 e Q-1 do testes.

**T-0081: sem 🔴** (R-20261105-074619 ao modulo-core)
- Conferidos RN-CORE-28, `farol.ver`/`parametro.farol`, licença, escopo e multi-tenant: estão OK.
- 🟡1: injeção de fórmula no CSV (`csvDoFarol`).
- 🟢:
  - sonda da fonte com `usuario_ids: []`;
  - mês futuro revalidado na API e aviso no mês passado;
  - `to_char` → faixa de datas e `push`;
  - teste com usuário inativo.

## Testes
- apps/api, sem banco real: 183 verdes e 15 pulados (os `*.banco.test.ts`, que rodam no CI). eslint e tsc do apps/api verdes.
- gestor: 10/10. core farol: 44/44.
- `verificar engenheiro-software`: OK.

## Pendências
- CI verde do lote, com os testes de banco da 0029 e do farol.
- Os 🟡 dos donos.
- Minhas: levar o helper de CSV seguro para `@macuxi/comum` e propor `ctx.moduloAtivo(id)` no SDK.
