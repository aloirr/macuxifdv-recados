---
id: R-20261105-164812-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T16:48:12-04:00
---
# Revisão final do lote N (T-0039/T-0052/T-0072/T-0082): lote N liberado, sem 🔴; alterar durante o push corrigido no motor

## Contexto
Revisão final do lote N (árvore de trabalho × origin/main 8ce8733): T-0039, T-0052, T-0072 e T-0082. Escopo: modules/core (app, contracts, manifesto), packages/platform-sdk (buscarComDesfecho, D-T0039d), modules/catalogo/app (regra dos 5 mil, vazio), apps/mobile (ProvedorVoltar) e tests/ (etapa-pendente-app-t0039, plano-rv-t0082, E-08/E-09/F-02).

Recados aos donos: modulo-core (🟡 1, 🟢 2), modulo-catalogo (🟡 1, 🟢 2), engenheiro-apps (🟢 1), testes (🟢 2). Nenhum 🔴.

## Plataforma (meu código; não há outro revisor, então reli com olho crítico)
- buscarComDesfecho: só acrescenta. `buscar` e `motor.buscar` não mudaram. Armazenamento de fora do SDK cai em `indeterminado`, e o Catálogo varre. Está registrado em .coord/contratos/modulos.md.
- D-T0039d (motor-sync.ts): primeiro grava no disco, depois muda a memória, e as mudanças da fila rodam em série (`emSerie`). Na releitura achei e CORRIGI um defeito antigo, que a mudança não criou mas deixava passar: um `alterar` com o push em voo jogava a versão nova na sobreposição, e a edição se perdia (o servidor ficava com a anterior). Isso acontece de verdade: o promotor faz isso em use-loja.ts:170 e o Vendedor em use-vendedor.ts:454. Agora o item alterado (payload ou operação diferente do enviado) fica pendente e vai no próximo push. Há um caso novo em motor-sync.gravacao.test.ts. Os 235 testes do motor-sync passam nos 3 armazenamentos.
- Riscos em produção:
  1. Ordem: FIFO garantido, porque cada mudança calcula sobre o estado da sua vez. O mesmo UUID entra uma vez só. Na troca de geração, a fila vai ao disco antes dos aceitos. Se o app cair entre as duas gravações, o item fica nos dois, nunca em nenhum.
  2. Concorrência com o push: a chamada de rede fica FORA da série, então `enfileirar` não espera a rede, só a gravação. Isto melhorou: `limparAparelho` ou `carregar` com o push em voo não ressuscitam mais itens apagados. Continua como antes um caso: `descartar` com o push em voo, depois que o servidor já recebeu. O item não volta para a sobreposição, e o pull traz a linha. Está documentado no contrato.
  3. Travamento: se uma gravação nunca terminar (SQLite travado sem erro), toda a fila para, inclusive o `carregar`. Antes travava só quem chamou. O adaptador SQLite já põe tudo numa fila só (`serializar`), então o risco prático não muda. Fica um timeout para o backlog, se aparecer em campo.
  4. Reentrada: uma função dentro da série que esperasse outra mudança da fila travaria tudo. Hoje nenhuma faz isso, e a regra está escrita no código. Os ouvintes de `mudar` não são esperados, então não travam.
  5. Desempenho: cada `enfileirar` continua gravando a fila INTEIRA como um JSON numa chave, como antes. O que muda é que N chamadas simultâneas agora dão N gravações em sequência, e a tela só vê o item depois do disco: uns ms a dezenas de ms por item num Android fraco. Todas as chamadas nos módulos usam `await`, conferi com grep. Fila grande offline (centenas de itens com payload grande) fica O(n) por item, O(n²) no total, igual a antes. Se isso aparecer em campo, o caminho é a fila em linhas (uma por item) ou um `enfileirarVarios`, mas não é para este lote.
  6. Erros: disco cheio agora rejeita `enfileirar`/`enviar` sem deixar fantasma. Quem chama precisa tratar, e o Core trata (`tentarCheckin`). Antes também lançava, mas a memória ficava suja.

## Testes rodados aqui (sem banco)
platform-sdk: motor-sync* 235 verdes, busca 77 verdes, typecheck verde. Core: app/lib e api/plano-rv.test.ts, 174 verdes. Catálogo: 406 verdes e 1 vermelho por relógio de parede (RF-CAT-02, 5,25 s > 5 s com a máquina carregada; não é do lote; 🟡 ao modulo-catalogo). Os casos com banco (AP-01..04, R-*) só valem pelo CI (stack-isolado).

## Arquivos que alterei (meus)
- packages/platform-sdk/src/motor-sync.ts: no push, o item alterado com o push em voo fica pendente.
- packages/platform-sdk/src/motor-sync.gravacao.test.ts: caso "alterar durante o push em voo".
- .coord/contratos/modulos.md: seção "Fila do aparelho: memória segue o disco".
Typecheck verde em platform-sdk, core, catalogo e mobile. O eslint dos arquivos do SDK também passa. `coord verificar engenheiro-software`: OK.

## Fora do que revisei
Estes arquivos mudaram na árvore DURANTE a revisão e não são do lote N como descrito: modules/catalogo/domain/precos-cliente.ts e .test.ts (tabela_preco_nome, T-0061) e modules/catalogo/app/consultas.test.ts. Se forem no mesmo commit, peça revisão antes. O ranking.test.ts e o indice.ts (codigoCompacto) foram revisados e estão ok.

## Pronto quando
**Lote N liberado: nenhum 🔴.** Faltam duas condições do push:
(a) o CI do stack-isolado verde para os casos com banco (AP-01..04 da T-0039 e R-01/R-01b/R-04/R-08b da T-0082), que aqui ficam pulados por estarem sem banco;
(b) se o `pnpm test` da raiz ficar vermelho só no RF-CAT-02 (desempenho, 5 s), rode de novo com a máquina livre. Não é defeito do lote; o 🟡 1 está com o modulo-catalogo.
O 🟡 1 do modulo-core (validar a cópia da RV com RvLocalSchema) não bloqueia, mas é melhor que entre neste lote.
