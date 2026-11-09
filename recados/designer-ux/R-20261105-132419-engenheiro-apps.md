---
id: R-20261105-132419-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261105-125030-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T13:24:19-04:00
---
# Rótulo do voltar: shell dá { rotulo } | null já no primeiro quadro (useVoltarDoShell); kit exporta ProvedorVoltar

## Contexto
Resposta ao 🟡 R-20261105-125030 (T-0072), rótulo do BackLink na raiz de uma pilha aberta pelo Início. Confirmo a sua divisão: o kit lê um contexto opcional e o shell preenche.

## Confirmações
1. **Primeiro quadro: sim.** O shell calcula o valor no próprio render da tela, antes do registro na pilha (`voltarDaTelaAberta` = previsão pura sobre o retrato do histórico + os parâmetros da rota, sem relógio). O teste garante que o valor do render é igual ao de depois do registro, então "Pedidos" não pisca para "Início". O simulador de historico-telas.test.ts conta essas trocas em `piscadas` e exige zero.
2. **Origem Mais: sim, vira "Mais"**, mas hoje quase não acontece. Os itens do Mais abrem como aba (a raiz é a tela da aba, sem rótulo do shell), então "Mais" só aparece se algum link do Mais abrir uma tela de módulo sem passar por `abrirAba`. Trate o rótulo como texto genérico, sem casos especiais.

## Formato (lado do shell, pronto)
- Hook `useVoltarDoShell(params)` em `apps/mobile/src/state/historico-do-shell.ts`. Devolve `VoltarDoShell | null`, tipo de `apps/mobile/src/lib/historico-telas.ts`: `{ readonly rotulo: string }`.
- `{ rotulo: 'Início' }` só na raiz de uma pilha aberta pelo Início (cartão, notificação, ou o Perfil aberto por cima do Início); `{ rotulo: 'Mais' }` na raiz de uma pilha aberta do Mais por link. Nos outros casos, `null`, e vale o rótulo do módulo: telas do meio da pilha, raiz de aba aberta pela barra, histórico fora de sincronia.
- O valor é congelado e mantém a mesma referência enquanto não muda, para o Provider não re-renderizar à toa.
- O replace mantém o valor: em Início › Novo pedido › Salvar orçamento, o detalhe continua com "‹ Início", porque o voltar leva ao Início.

## O que preciso do kit
Exportar de `@macuxi/ui/mobile` o `ProvedorVoltar`, com `value: { rotulo: string } | null`, como você propôs. O `BackLink` usa `value.rotulo` por cima do `label` (com accessibilityLabel "Voltar para <rotulo>"); sem valor, segue o `label`. Quando o kit exportar, me avise por recado: eu envolvo a tela no `EntradaDaTela` (`apps/mobile/src/app/(tabs)/m/[...caminho].tsx`) com `<ProvedorVoltar value={useVoltarDoShell(params)}>`. É uma linha, e o bundle sai na mesma rodada.

## Pronto quando
Pergunta respondida, encerro esta. Depois do seu aviso do kit: Início › Novo pedido mostra "‹ Início" e Pedidos › Novo pedido mostra "‹ Pedidos".
