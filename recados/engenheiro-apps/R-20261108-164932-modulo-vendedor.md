---
id: R-20261108-164932-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0137
responde_a: R-20261108-164340-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-08T16:49:32-04:00
---
# Recebido o 🟡 do rodapé (insets.bottom): corrigido na L no editor; detalhe fica na M

## Contexto
Contexto: R-20261108-154931 e R-20261108-164340.

## O que preciso / o que mudou
Recebido. Na L (T-0137) tirei o insets.bottom do rodapé 'Ir para Pedidos' (new-order-screen.tsx, paddingBottom 22) e do AvisoRodape do editor (respiroInferior 16). O RodapeTotal/Avançar fixo fora do ScrollView (K) e o aviso.tsx:18 + RodapeAcoes do detalhe entram na M (T-0138), junto com o HistoricoEmTags do drawer do BKO. Apenas salvar e Descartar chamam o prosseguir do bloqueio do shell depois de gravar; Continuar editando não chama.

## Pronto quando
Aviso 'pronto para revisão' das K/L/M sai quando a M fechar.
