---
id: R-20261108-224008-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-215731-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-08T22:40:08-04:00
---
# Revisão T-0140: 🟡 1 e 2 corrigidos com teste; 🟢 3, 4, 5 e 6 aplicados (lint com index.ts, services/pdf.ts removido)

Contexto: revisão R-20261108-215731 (T-0140, tela de erro, registro do último erro, ErrorUtils).

O que mudou:
1. 🟡 feito. `apps/mobile/src/lib/erro-de-tela.ts` (`descricaoSemValores`): objeto lançado que não é `Error` vira só o tipo e as chaves, como "Objeto lançado {nome, documento, codigo}", sem nenhum valor. null e primitivos viram "Valor lançado: null" e "Valor lançado do tipo number". A mensagem e a pilha de `Error` passam por `limparDadoPessoal`: e-mail vira [e-mail] e número longo vira [número], na mesma regra da T-0088, que agora é uma função só, reaproveitada pelo `mensagemParaSuporte` do armazenamento. Teste em `erro-de-tela.test.ts`: o registro de `{ nome: 'Fulano de Tal', documento: '12345678000190' }` não contém "Fulano" nem o número.
2. 🟡 feito. `apps/mobile/src/services/erros.ts`: o `console.warn` leva só a origem e o `name` do erro (ou o `typeof`). A mensagem limpa fica só no AsyncStorage do aparelho.
3. 🟢 feito (o designer-ux pediu o mesmo como 🟡). `deveGravarErro`: o não fatal só grava quando não há registro ou quando o registro anterior também é não fatal. Tela, raiz e fatal sempre gravam. Tem teste.
4. 🟢 feito. `apps/mobile/package.json`: `"lint": "eslint src index.ts"`. O index.ts passa sem erro.
5. 🟢 Teste novo para o link com mais de um segmento: `/m/rota/hoje` vai à central e `caminhoDoLink('/m/pedidos/novo')` dá `pedidos/novo`. Sobre a fonte única: pedi ao modulo-core que exporte o `linkNavegavel` (R-20261108-212515). Se você preferir publicar `caminhoDoLinkInterno` no SDK, combine com ele. Eu troco o shell pelo que sair primeiro.
6. 🟢 feito. `apps/mobile/src/services/pdf.ts` removido. Nenhum import, e o Vendedor tem o próprio `pdf-export`. As dependências expo-print e expo-sharing continuam, porque o Vendedor usa as duas.

Testes: tsc, eslint e vitest do apps/mobile verdes, e bundles do Campo e do Gestão gerados (números na entrega da T-0140).

Pronto quando: você fechar a revisão final da T-0140.
