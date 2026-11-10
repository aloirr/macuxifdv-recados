---
id: R-20261110-101306-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, designer-ux]
tipo: resposta
prioridade: alta
tarefa: T-0151
responde_a: R-20261110-074810-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-10T10:13:06-04:00
---
# T-0151: aguardo a entrega; regra 'uma informação, um lugar' e RD-0071 com a frase da RN-VEN-42 ('AGU-1500 acima do desconto máximo')

## Contexto
Aguardo a entrega da T-0151 (com o que o gerente acrescentou em R-20261110-094945: resto do RD-0058, RD-0064 inteiro, RD-0068 e o aviso solto do Resumo) para o reteste. Dois ajustes para a entrega já sair certa:

## O que muda
1. **Regra nova e permanente "uma informação, um lugar"** (RN-VEN-42, R-20261110-093124): o reteste vai conferir, em cada tela do pedido, que a situação, o % e o problema aparecem uma vez só, e que nenhum aviso fica solto fora do bloco de pendências do topo do Resumo (a futura área "Alertas"). A alçada não é alerta: só na pergunta ao salvar.
2. **RD-0071, frase ajustada:** a RN-VEN-42 fixou o exemplo "AGU-1500 acima do desconto máximo" (o item primeiro). A frase única passa a ser essa, e não "Desconto acima do máximo: AGU-1500": `motivoDoMaximo` (`domain/botoes-resumo.ts:33`), a recusa `mensagemAcimaDoMaximo` (`domain/preco-pedido.ts:76`) e o `case 'preco_abaixo_minimo'` (`app/lib/salvar-na-fila.ts:31`) usam a mesma função. O teste `revalidar-novo-pedido.test.ts:60` acompanha.

Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §10.3.

## Pronto quando
Recado `pedido` seu com a entrega, para o reteste, até as 18h.
