---
id: R-20261105-155914-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:59:14-04:00
---
# D-T0039d: motor de sync grava no disco antes de mudar a memória (toda fila), com testes nos 3 armazenamentos

## Contexto
T-0039, defeito D-T0039d (R-20261105-152330-testes): `gravarFila` do motor de sync mudava a fila em memória antes de gravar no disco. Com o disco cheio, o item ficava fantasma: estava na tela e saía no próximo envio, mas sumia se o app fechasse. Valia para todo `enfileirar`/`alterar`/`descartar`.

## O que fiz
- packages/platform-sdk/src/motor-sync.ts: agora o disco é gravado primeiro e a memória (e os ouvintes) só muda depois. Vale para a fila de itens, os aceitos, a fila de arquivos, a limpeza pendente e os módulos ativos. Se a gravação falhar, memória e disco ficam como estavam.
- As mudanças rodam uma por vez (`emSerie`) e cada uma calcula a lista nova sobre o estado do momento. A ordem FIFO e a idempotência pelo UUID do aparelho valem também com chamadas simultâneas: dois `enfileirar` do mesmo id gravam um só, e o que entra ou sai durante o push não se perde.
- Fila + aceitos: grava primeiro a lista que ganha o item. Falha entre as duas gravações = item nas duas listas (reenvio idempotente), nunca em nenhuma.
- A troca de geração (ADR 0021) passou a gravar a fila antes dos aceitos. Antes, se o app caísse no meio, perdia o aceito que voltava para a fila.
- Pontos conferidos: enfileirar, alterar, descartar, marcar falha (push sem rede), resultado do push, liberarAceitos, enfileirarArquivo/descartarArquivo, envio de arquivos, aplicarModulosAtivos, confirmarLimpeza, limparAparelho e carregar.
- A API pública e os contratos não mudaram (sem ADR).

## Testes
- Novo: packages/platform-sdk/src/motor-sync.gravacao.test.ts, com 9 casos nos 3 armazenamentos (27 testes). Cobre: disco cheio em enfileirar/alterar/descartar, falha no meio de 3 enfileirar simultâneos, mudanças com o push em andamento, aceito gravado com a fila falhando, aceitos falhando, marcar falha com disco cheio, troca de geração com disco cheio, arquivos e módulos.
- SDK: 37 arquivos, 509 testes verdes; lint e typecheck (tsconfig e tsconfig.web) verdes.
- apps/mobile: typecheck, lint e 229 testes verdes.
- tests/modulos/etapa-pendente-app-t0039.test.ts: o F-02 agora passa, então o `it.fails` fica vermelho até o testes trocar para `it`. Pedido ao testes em R-20261105-155126 (encerra o R-20261105-152330).
- `verificar engenheiro-software`: OK.

## Pendências
- O testes precisa virar o F-02 para `it` (sem isso a suíte tests/ fica vermelha).
- E-08 e E-09 do mesmo arquivo também estão vermelhos como `it.fails`: são D-T0039b/c (modulo-core e testes), não deste ajuste.
- Comportamento antigo mantido: um item descartado ou alterado enquanto o push está em andamento pode já ter chegado ao servidor. O descarte vale no aparelho.
- Entra no lote seguinte ao M2. Sem commit.
