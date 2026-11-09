---
id: R-20261101-031740-modulo-integracao
de: modulo-integracao
para: [alexandre]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T03:17:40+00:00
---
# Resposta à revisão R-20261031-193859 (T-0013): itens 1 a 6 tratados na T-0023, 7 é do engenheiro

## Contexto
Esta é a resposta a R-20261031-193859-engenheiro-software (e à correção R-20261031-193920-engenheiro-software). Não pude usar --responde-a/--encerra porque esses recados existem só no origin/main, ainda ausentes desta árvore; o gerente-projetos encerra o assunto ao integrar a branch.
Resposta à revisão do engenheiro da T-0013 (R-20261031-193859, linhas corrigidas em R-20261031-193920), tratada na T-0023. Itens localizados pelo conteúdo. Conector: 230 testes passando e 2 pulados (Oracle real); `@macuxi/integracao` 123 testes; lint, typecheck e `pnpm fronteiras` verdes.

## O que foi feito, item a item
🟡 1 FEITO. `apps/conector/src/log/mascara.ts` (mascararValor): chave sensível com valor numérico agora também vira `***`; só boolean passa. Teste em `test/segredos-log.test.ts` com `{ latitude: -3.1, cpf: 12345678901, cliente: { telefone, longitude } }`, todos mascarados; `linhas: 12` (contador) segue passando.
🟡 2 FEITO. `src/sincronizador.ts`: com `temMais` e `m.repetidas === pagina.length`, a entidade é bloqueada com a mensagem "a leitura não avança…" (agora numa constante única, reaproveitada no bloqueio antigo), `log.erro('entidade_bloqueada')` e o motivo no estado/`status`. Sem `temMais` o comportamento antigo (sem novidade, sem bloqueio) foi mantido. Teste em `test/sincronizacao.test.ts`: bloqueia, o log.erro sai uma vez e o ciclo seguinte volta "bloqueada: a leitura não avança" sem consultar o ERP de novo. Destravar: `conector retomar <entidade>`.
🟡 3 FEITO. `src/pedidos.ts` (gravar): se `local.tentativas > 0` ou `local.erro` preenchido (erro de conexão não conta tentativa mas deixa o erro), roda `numeroErp` ANTES de gravar; se vier número, só marca `gravado`, enfileira `integrado` e não grava (log `pedido_ja_existia_no_erp`). Extraí `numeroGravado` e `confirmarGravacao`, usados também no caminho normal. Testes em `test/pedidos.test.ts`: falha de conexão depois do COMMIT (a consulta numeroErp dentro da transação cai, o ERP já tinha gravado) não duplica; o primeiro envio não faz a consulta prévia; o fake de ERP agora só devolve o número depois do cabeçalho (como o real), o que também fortaleceu o teste "ERP fora do ar". Coberto também em `test/integracao.pg.test.ts` com PostgreSQL real e INSERT SEM `ON CONFLICT`, onde sem a defesa a unicidade do pedido_uuid quebraria. Limite documentado: queda do processo exatamente entre COMMIT e a anotação local não deixa rastro; só o SQL idempotente do cliente cobre essa janela.
🟢 4 FEITO (mantido, documentado). O Conector roda em Node 22 no cliente (`scripts/empacotar.mjs` mira node22; doc exige 22.13+), onde o `node:sqlite` ainda emite o aviso; remover a troca de `emitWarning` poluiria o log do serviço do cliente. Ficou como está, com comentário em `src/util/sqlite.ts` dizendo que é só para Node 22, inerte no Node 24 e a remover quando o Node 22 sair do suporte, e a restauração no `finally`. Registrado em conector.md §Requisitos.
🟢 5 FEITO. `src/hub/cliente.ts`: nova `esperaRetryAfter` (segundos inteiros/decimais ou data HTTP via Date.parse; ausente, inválido, zero ou data passada dá `undefined` e vale o backoff; o teto continua o `maxMs` do retry). Opção `agora` no ClienteHub para teste. `test/hub-retry-after.test.ts` (4 testes, incluindo o cliente esperando 20 s por uma data HTTP).
🟢 6 FEITO (como aviso). Na verdade o padrão da CONFIG já é `criptografar: true`; o risco é `criptografar: false` em host remoto. Novo `src/erp/transporte.ts` (`hostEhLocalOuLan`, `avisoTransporteErp`: localhost, loopback, 10/172.16-31/192.168, link-local, IPv6 ULA, nome curto e .local/.lan/.intranet não avisam). `testar-conexao` imprime `[aviso]` (não falha) e o início do serviço registra `erp_sem_criptografia` com a sugestão de `criptografar: true` (postgres ssl, sqlserver encrypt, oracle tcps) ou VPN. Vale para os três drivers porque a checagem é na config, não no driver. O padrão não mudou. Não há assistente interativo no Conector, então testar-conexao e o log são os pontos. Testes: `test/transporte.test.ts` (22) e `test/operacao.test.ts`.
🟢 7 NÃO FEITO, como combinado: turbo.json é da raiz/engenheiro. Para o engenheiro: a T-0023 está pronta para ir ao main; os testes de banco do Conector usam MACUXI_PG_EXIGIR, MACUXI_PG_AUTO_SUBIR, MACUXI_PG_HOST, MACUXI_PG_PORTA, MACUXI_PG_ADMIN_USUARIO e MACUXI_PG_ADMIN_SENHA.

## Pronto quando
Itens 🟡 1 a 3 corrigidos e 🟢 4 a 6 atendidos; docs em `docs/modulos/integracao/conector.md` atualizados (requisitos/Node, criptografar, idempotência de pedidos, máscara de log, Retry-After, bloqueio, testar-conexao). `node scripts/coord.mjs verificar modulo-integracao`: sem violação (o pnpm-lock.yaml aparece só como arquivo de outro dono, fora do commit).
