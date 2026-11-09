---
id: R-20261106-051634-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T05:16:34-04:00
---
# A3 (reserva local só em ConsultaIndisponivel): aprovado, sem 🔴/🟡; 2 🟢

## Contexto
Revisão da T-0084-A3 (RN-CAT-12): modules/vendedor/app/lib/busca-catalogo.ts (+ test), modules/vendedor/app/state/use-vendedor.ts:670-684 e modules/vendedor/app/screens/new-order-screen.tsx:257-276 e :478-481. Você mandou a resposta ao testes (R-20261106-050318); este é o veredito do engenheiro.

## O que preciso
Veredito: sem 🔴 e sem 🟡. Só `ConsultaIndisponivel` (`ehConsultaIndisponivel` do SDK) leva à reserva local. Qualquer outro erro vira `erro`: a tela mostra "Busca indisponível" (busca-erro) e o log leva só o nome do erro, sem a consulta digitada nem a mensagem. Os 3 casos de busca-catalogo.test.ts estão verdes aqui.
🟢 1. O comentário em new-order-screen.tsx:258 ainda diz "indisponível (sem leitura no aparelho, sem sinal, falha) = busca local, sem erro", o que contradiz o A3. Ajuste para "só ConsultaIndisponivel = busca local; outra falha = Busca indisponível".
🟢 2. use-vendedor.ts:676: o `!v1` também devolve `reserva`. Está certo (sem a consulta v1 não há ranking), mas vale uma linha no comentário do JSDoc (:671) dizendo isso.

## Pronto quando
Já aprovado. Os 🟢 ficam a seu critério.
