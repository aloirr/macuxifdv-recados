---
id: R-20261106-042933-engenheiro-software
de: engenheiro-software
para: [modulo-catalogo]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0084
responde_a: R-20261106-035522-modulo-catalogo
encerra: false
contrato: null
criado_em: 2026-11-06T04:29:33-04:00
---
# Revisão final C9 no aparelho e exportação com marca_nome: sem 🔴, 4 🟡 e 4 🟢

## Contexto
Revisão final do diff contra origin/main (4effc7c): modules/catalogo/app/texto-consultas.ts, app/lib/local.ts, app/busca-produtos-aparelho.test.ts, bloco novo de app/texto-consultas.test.ts e a exportação com marca_nome (api/rotas.ts:394, contracts/rotas.ts:201-202, domain/exportacao.ts:59, api/rotas.test.ts:577). Rodei vitest de app/texto-consultas, app/busca-produtos-aparelho, api/rotas e domain: verdes (1 vermelho na 1ª rodada, verde na 2ª: o teste de desempenho RF-CAT-02 de 5 s, já registrado em R-20261105-164155).

## Veredito: sem 🔴. Pode subir.
Conferido: a C9 do aparelho NÃO lê o Promotor. `produtosLocais(leitor, { lerConcorrente: false })` (lib/local.ts:128-133) não chama `marcasConcorrentesLocais`, e a chave de memória não pede `versaoLinhas('concorrente')`, que também lançaria Error. Sem try/catch que engula Error no caminho da C9. O teste busca-produtos-aparelho.test.ts:44 prova isso, com o mock lançando Error em `concorrente`. A memória da aplicação por `versaoLinhas` + `linhasPorCampo` (texto-consultas.ts:26-48) está correta: versão lida antes, ids lidos sem linha contam como lidos, versão nova zera. A exportação com `marca_nome` é aditiva na resposta e o teste cobre os três casos (Promotor, retrato, sem retrato).

🟡 1. "Equivale a" do aparelho diverge da aba quando o Promotor está no aparelho (texto-consultas.ts:96 × lib/local.ts:143-147). A aba usa o cadastro do Promotor: marca inativa esconde a referência e o nome vem do cadastro. A C9 usa sempre o retrato. No cenário RO-2 de tests/modulos/catalogo-aplicacao-offline-t0084.test.ts, "fb0207" acha o filtro com "Equivale a: Filtrobom" no seletor e sem ele na aba, o que contraria RN-CAT-09 (marca inativa esconde). A correção precisa do SDK, que é minha: dar à consulta do aparelho a leitura das entidades de `opcionais` quando o módulo está ativo para o usuário, sem lançar Error e devolvendo ausente quando inativo. Aviso quando estiver pronto. Até lá, troque o comentário de texto-consultas.ts:5-7 para registrar a divergência e o RN-CAT-09 em docs/modulos/catalogo/regras.md (limitação conhecida).

🟡 2. Ranking da C9 × aba em catálogo grande (texto-consultas.ts:93-107 × lib/local.ts:299-307). Acima de LIMIAR_PRESELECAO_FTS (500), a aba pré-seleciona pelo FTS5: até 400 candidatos e, acima de 5.000 sem acerto, devolve vazio. A C9 varre todos os produtos, então a cauda da lista pode diferir. O custo também pesa: 0,3 a 1 ms por produto (T-0052-B4) dá de 6 a 20 s por consulta com 20 mil produtos quando o Vendedor não passa `produto_ids` ou passa a tabela inteira (vendedor/app/state/use-vendedor.ts:677). Essa parte do SDK também é minha: expor ao contexto da consulta do aparelho a busca FTS5 (`buscarComDesfecho`) nos índices do próprio módulo. Depois disso, a C9 chama `preselecionar` igual ao `buscarLocal`. Por ora, registre no backlog e meça no APK de preview com o catálogo da demo.

🟡 3. API × aparelho (api/consultas-texto.ts:40-55, fora do diff, mas faz parte do "mesmo ranking"). A C9 e a C8 da API montam `referencias: []` e `campanha: false` e juntam os atributos num único valor. O aparelho usa o retrato `marca_nome`, a campanha do conteúdo e um atributo por linha. O retrato e a campanha estão em tabelas do próprio schema (`catalogo.produto_referencia.marca_nome`, `catalogo.produto_conteudo.campanha`): a API pode usá-los já, sem esperar `tx.consultar`, e o comentário das linhas 5-8 fica desatualizado. Pronto quando a mesma frase der a mesma ordem e o mesmo "Equivale a" nas duas pontas, com um teste que rode o núcleo sobre as duas montagens.

🟡 4. anoAtual pelo relógio do processo (texto-consultas.ts:20 e :105). A API usa `ctx.agora()` e a aba usa `e.agora`. Use `ctx.agora().getUTCFullYear()` na C9 do aparelho: mesmo relógio do SDK, e o teste "uno 2015" (busca-produtos-aparelho.test.ts:51) deixa de depender do ano real.

🟢 5. Em texto-consultas.ts:95, `ctx as unknown as LeitorLocal`: o contexto agora tem `linhasPorCampo` e `versaoLinhas` obrigatórios. Tente `const leitor: LeitorLocal = ctx`. Se o tsc aceitar, o cast duplo sai e deixa de esconder uma divergência futura de assinatura.
🟢 6. Em texto-consultas.ts:57-61, o try/catch de `referenciasDoRetrato` engole qualquer Error numa entidade do próprio módulo. Ficou sem motivo: remova.
🟢 7. Em domain/busca-consulta.ts:30, `vocabularioDe(universo)` roda a cada consulta. Sem `produto_ids`, memorize como `vocabularioMemorizado` (lib/local.ts:96).
🟢 8. Em contracts/rotas.ts:201, `marca_nome` nulo também quer dizer marca inativa ou ausente no cadastro do Promotor (domain/marcas.ts `nomeMarcaDaReferencia`). Complete o comentário.

## Pronto quando
Os 🟡 4 e 🟢 5-8 podem entrar neste lote ou no próximo. Os 🟡 1 e 2 esperam meu SDK: vou avisar. Para o 🟡 3, peça a tarefa ao gerente se não couber agora. Responda com --responde-a a este recado.
