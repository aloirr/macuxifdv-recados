---
id: R-20261107-004540-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T00:45:40-04:00
---
# T-0088 A1: 🟡 1/2 do engenheiro-software e 6 🟡 de UX aplicados; apps/mobile verde, bundles verdes, sem EAS

## Contexto
T-0088 A1: ajustes das revisões do engenheiro-software (R-20261107-002655: sem 🔴, 🟡 1 e 🟡 2) e do designer-ux (R-20261107-002124: 6 🟡), com o SDK que aceita qualquer id no nome do banco (a demo também vai para o SQLite).

## O que fiz
- 🟡 1, que bloqueava o push: o teste `lib/armazenamento-aparelho.test.ts` segue a regra nova. A demo (`u-vend-01`, sem tenant) abre o SQLite `macuxi-u-h<32 hex>-t-demo.db`, e a reserva `ids_invalidos` só vale para a sessão sem id de usuário. Não criar arquivo nas reservas continua protegido.
- 🟡 2: textos de `ids_invalidos` ("sessão sem id de usuário") e o comentário de `services/armazenamento.ts`.
- 🟢 3 do engenheiro: fecha o arquivo SQLite quando a sessão sai ou troca de usuário ou de tenant durante a abertura.
- UX: textos neutros para todos os perfis (sem "pedidos", RN-PRO-01) e "nada se perde se o app fechar". TalkBack: o layout esconde o que fica por baixo, o título é anunciado, a barra tem `rotulo` e o aviso usa `anunciar`. "Tentar de novo" carrega na própria tela e mostra a linha da 2ª falha. O botão "Enviar o detalhe ao suporte" usa o Share, com e-mail e números mascarados.

## Arquivos
apps/mobile/src/lib/armazenamento-aparelho.ts e .test.ts, src/components/preparo-aparelho.tsx e .test.tsx, src/state/plataforma.tsx, src/app/_layout.tsx, src/services/armazenamento.ts (comentário), src/components/area-segura.test.tsx (aceita `<Stack` seguido de quebra de linha). O Prettier da raiz (110 colunas) foi aplicado nos arquivos tocados, e o diff de plataforma.tsx e _layout.tsx cresceu por formatação.

## Testes
apps/mobile: eslint e tsc limpos, vitest 29 arquivos / 261 testes verdes, bundle Android de campo e gestao verde (9,06 MB cada). Nenhum build EAS. `verificar engenheiro-apps`: todos os meus arquivos OK. As 4 "violações" listadas são anexos do dono do produto em `.coord/recados/anexos/` (destino sem dono), não são minhas.

## Pendências
- A2 com o build liberado pelo gerente: conferir no Diagnóstico da demo "SQLite (macuxi-u-h…-t-demo.db)" e medir o tempo da passagem com 20 mil produtos (se passar de uns 15 s, o designer sugeriu "Com muitos produtos, pode levar alguns minutos.").
- Reconferência de UX pelo código, se o designer-ux quiser.
