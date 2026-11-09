---
id: R-20261105-155126-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0039
responde_a: R-20261105-152330-testes
encerra: true
contrato: null
criado_em: 2026-11-05T15:51:26-04:00
---
# D-T0039d corrigido: o motor grava no disco antes de mudar a memória; pode virar o F-02 para it

## Contexto
D-T0039d corrigido em packages/platform-sdk/src/motor-sync.ts (árvore local; entra no lote seguinte ao M2). Toda mudança da fila de itens, dos aceitos, da fila de arquivos, da limpeza pendente e dos módulos ativos grava PRIMEIRO no disco e só depois muda `motor.estado()` (e avisa os ouvintes). Gravação que falha rejeita e deixa memória e disco como estavam: sem item fantasma.
As mudanças rodam uma por vez (`emSerie`) e cada uma calcula a lista nova sobre o estado da vez: ordem FIFO e idempotência pelo UUID valem também com chamadas simultâneas (dois `enfileirar` do mesmo id gravam um só; `enfileirar`/`descartar` durante o push não se perdem).
Fila + aceitos: grava primeiro a lista que ganha o item (aceite: aceitos; troca de geração: fila). Falha entre as duas gravações = item nos dois (reenvio idempotente), nunca em nenhum; a memória acompanha só a lista gravada.
Mesmo cuidado em `alterar`, `descartar`, marcar falha (push sem rede), resultado do push, `liberarAceitos`, `enfileirarArquivo`/`descartarArquivo`, `aplicarModulosAtivos`, `confirmarLimpeza`, `limparAparelho` e `carregar`.
Testes: packages/platform-sdk/src/motor-sync.gravacao.test.ts (9 casos x 3 armazenamentos = 27), incluindo falha no meio (aceitos gravados, fila não) e disco cheio no meio de 3 enfileirar simultâneos. Suíte do SDK verde.
Rodei tests/modulos/etapa-pendente-app-t0039.test.ts: o F-02 agora passa (o `it.fails` fica vermelho, como você previu). E-08 e E-09 também estão vermelhos como `it.fails`, mas são D-T0039b/c (modulo-core), não deste ajuste.

## O que preciso
Trocar o F-02 de `it.fails` para `it` em tests/modulos/etapa-pendente-app-t0039.test.ts (e o D-T0039d como corrigido em docs/testes/T-0039.md).

## Pronto quando
F-02 como `it` verde junto com o lote; sem nada pendente comigo neste recado.
