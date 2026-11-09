---
id: R-20261105-164056-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0082
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:40:56-04:00
---
# Revisão final lote N (core app/contracts/manifesto): sem 🔴; 🟡 1 validar a cópia da RV com RvLocalSchema

## Contexto
Revisão final do lote N (árvore de trabalho × origin/main 8ce8733), parte modules/core (app, contracts, manifesto). T-0039 (chip e aviso de etapa pendente, tentarCheckin) e T-0082 (Minha RV, etapa core-rv, rv.ver para vendedor e promotor). Conferi cartao-minha-rv.tsx (já com colors.dangerOnDark) e visit-sheets.tsx (BottomSheet com `rolavel`) no estado das 16h30; se mudarem depois disso, me avise que eu olho de novo. Testes do core (app/lib + api/plano-rv.test.ts) rodados: 19 arquivos, 174 verdes.

Sem 🔴.

Escopo da RV conferido na API (modules/core/api/plano-rv.ts:196-260): o `GET /v1/core/rv` recorta por `ctx.usuariosVisiveis()`. Para vendedor e promotor (escopo carteira), isso é só o próprio id (api/usuarios-visiveis.ts:16). `usuario_id` de outra pessoa dá 404 USUARIO_NAO_ENCONTRADO (metas.ts:118, `usuariosDoPainel`). `equipe_id` é cruzado com os visíveis (plano-rv.ts:216-218). O vendedor nunca vê a RV de outra pessoa. O R-01b e o R-08b (tests/integracao/api/plano-rv-t0082.test.ts) cobrem isso, inclusive em outro tenant.

## O que preciso
🟡 1. modules/core/app/lib/usar-minha-rv.ts:24: a cópia é lida com `ler<RvLocal>` sem validação, e `RvLocalSchema` (contracts/plano-rv.ts:100) não é usado em lugar nenhum. Uma cópia gravada por outra versão do app, ou corrompida, chega a `montarMinhaRv`, que lê `copia.painel.pessoas` e pode derrubar a tela Metas inteira (o cartão agora é a única RV da tela). Passe a cópia por `RvLocalSchema.safeParse` (ou `tolerante(RvLocalSchema)`, como na etapa) e trate a falha como `null`, que mostra "Sua RV ainda não foi calculada". Junte um caso em minha-rv.test.ts ou num teste do hook.
🟢 2. cargas.ts:89-111 (core-rv): se a resposta for 403 ou 404 (servidor antigo ou perfil mudado), o erro é engolido e a cópia anterior fica. Está certo, mas a cópia de um mês já virado continua aparecendo. Hoje a `nota` diz o mês, então é aceitável. Se quiser, mostre "de outubro" no título quando `painel.periodo` não for o mês corrente.
🟢 3. cliente.tsx:59: `new Date()` no render para o aviso funciona (só compara o dia). Pode ser o relógio do `useCore`, se existir, por coerência com o RN-CORE-23 (nenhum timer).

## Pronto quando
O 🟡 1 está no código com teste, e você me responde com --responde-a. Os 🟢 ficam a seu critério. O 🟡 não bloqueia o lote N se entrar na próxima rodada, mas prefiro que entre neste lote.
