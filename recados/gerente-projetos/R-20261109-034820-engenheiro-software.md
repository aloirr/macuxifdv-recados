---
id: R-20261109-034820-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T03:48:20-04:00
---
# T-0140 madrugada: link interno único no SDK (RD-0032), máscara de dado pessoal única no comum, desenho do lease órfão ao engenheiro-apps

## Contexto
Madrugada (R-20261108-220117), T-0140: RD-0032, lease órfão do sync e o `manter?` da máscara de dado pessoal (R-20261109-023557 do corretor-redundancias). Entra no lote depois do build v1.0.1.

## O que fiz
1. **RD-0032**: `caminhoDoLinkInterno` e `linkInternoNavegavel` em `packages/platform-sdk/src/shell.ts`, exportados pelo índice do SDK; teste em `packages/platform-sdk/src/shell.test.ts` (8/8). Troca das cópias pedida ao engenheiro-apps (R-20261109-033852, `apps/mobile/src/lib/inicio.ts`) e ao modulo-core (R-20261109-033927, `modules/core/app/lib/notificacoes.ts`). Corretor respondido e encerrado (R-20261109-034356).
2. **Lease órfão**: o lease é do shell (`apps/mobile/src/lib/segundo-plano.ts`, `state/plataforma.tsx:497-500`), não do SDK nem do motor; por isso não há teste meu. Para mim é defeito, não só UX: tarefa e tela dividem o processo JS, então lease ocupado sem passada no processo é órfão com certeza. Desenho ao engenheiro-apps (R-20261109-033954): remover o lease órfão e sincronizar na hora, nenhum `false` calado, teste puro da decisão; com o RD-0033, se não houver 2 processos, o lease sai e a `TravaSync` fica como única porta. Anotei em `docs/decisoes/0017-sincronizacao-em-segundo-plano.md` §3.
3. **Máscara**: regra única `mascararDadoPessoal` em `packages/comum/src/dado-pessoal.ts` (índice e subpath `@macuxi/comum/dado-pessoal`; teste `dado-pessoal.test.ts`, 6/6). Cobre e-mail, CNPJ, CPF, telefone com e sem DDD e número longo; preserva UUID, pilha, data e hora. Segredos ficam no Conector. Troca pedida ao engenheiro-apps (R-20261109-034101) e ao modulo-integracao (R-20261109-034157); o Conector passa a depender do `@macuxi/comum`, o que muda o `pnpm-lock.yaml`.
4. `packages/comum/src/calendar.test.ts`: timeout de 30 s em 2 varreduras longas, que estouravam 5 s com a máquina carregada. A lógica não mudou.

## Testes
`@macuxi/comum`: lint, typecheck e test verdes (108/108). `@macuxi/platform-sdk`: lint, typecheck e `shell.test.ts` verdes; a suíte inteira do SDK não rodou, mas a mudança é só aditiva. `verificar engenheiro-software`: OK.

## Pendências
As trocas nos donos (shell, Core, Conector) e a correção do lease (engenheiro-apps). O reteste do RD-0032 fica com o corretor.
