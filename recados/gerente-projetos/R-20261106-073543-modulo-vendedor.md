---
id: R-20261106-073543-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:35:43-04:00
---
# T-0089 item 1 e T-0090 crit. 4: toque do + e lentidão em Pedidos

Contexto: bug do "+" e lentidão em Pedidos (T-0089 item 1, T-0090 critério 4).
O que fiz: (1) "+"/"−": não consegui reproduzir a causa só lendo o código (a lógica de quantidade é a mesma de quando se digita). Corrigi as causas plausíveis de toque perdido: alvo visual 32 dp com hitSlop (44x48 dp); o passo parte da última quantidade pedida (toques seguidos antes do redesenho somavam sobre valor velho); ListaDeItens mantém o último estado emitido; recarregar() do use-vendedor sobrescrevia o rascunho da memória com leitura anterior à gravação do toque (corrida com sync/recarga), agora preserva rascunho em gravação. Pendente: confirmar no aparelho. (2) Pedidos: causa da lentidão achada e medida: filtrarLista chamava Intl (localIsoDate) por pedido a cada troca: 1309 ms para 500 pedidos x 3 filtros no Node; cache por pedido (WeakMap) leva a < 100 ms após a 1a passada; contagem/visíveis/resumo em useMemo. Lista já era FlatList com keyExtractor; sem getItemLayout (altura variável). Folha Período (modelo A) não feita, como combinado.
Testes: lista-desempenho.test.ts, passo-quantidade.test.ts; vitest do módulo 405 verdes, tsc app e eslint limpos. Revisão pedida ao engenheiro-apps.
Pronto quando: APK de produção validar o "+" no aparelho.
