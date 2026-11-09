---
id: R-20261104-054240-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261104-041422-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-04T05:42:40-04:00
---
# Fatia 6: 3 vermelhos e amarelos 4 a 16 corrigidos (mais 17 a 22 e 24)

## Contexto
Correção da revisão de UX da fatia 6 (T-0071) para o APK de 05/11.
## O que preciso / o que mudou
Feitos os 3 vermelhos, com teste antes (app/lib/textos-pedido-ux.test.ts):
1. Resumo somente leitura: depois do envio o card do desconto vira uma LinhaValor ("Desconto do pedido (1,0%)" · "− R$ 3,84"), ou some se o ajuste é zero; nenhum onRascunho grava com sent (linhaDoAjusteSomenteLeitura).
2. Orçamento salvo: "Orçamento 000012 salvo" + "Válido até 10/11.", sem selo de status de pedido; sem sinal, "Orçamento salvo no aparelho." (confirmacaoDoEnvio, avisoSalvoNoAparelho).
3. Transformar em pedido: a folha abre sempre; título "Transformar em pedido" (nada mudou) ou "Mudou desde o orçamento" (com Total novo e Editar); OpcaoFolha "Enviar pedido" com a alçada recalculada (reconferirOrcamentoLocal passou a devolver nivel e total_cents; folhaDoTransformar).
Amarelos 4 a 16 feitos: ações do orçamento logo depois dos itens e sem o cabeçalho Ações (4); no orçamento, Editar/Duplicar/PDF/Cancelar que não se aplicam saem, em vez de ficar cinza (5); linha de desconto zerada some, rótulo "Desconto do pedido (x%)" e "Total dos itens" no orçamento (6); frete só no card de entrega (7); folha "Cancelar este orçamento?" com botão "Cancelar orçamento" (8); folha de mudanças com Total e Editar (9); Loading e EstadoVazio, "Este pedido não está no aparelho", "Não foi aceito: ..." (10); botão de edição mantém "Salvar alterações" e o motivo vai no banner (11); confirmação com só [Ver pedido/orçamento] e o principal "Ir para Pedidos" (12); sugestões com ícones plus/swap do kit, retorno ao toque e aviso de rodapé com Desfazer (13); aba Itens marcada com pendência (14); botão "Corrigir frete" (48 dp) e "Adicione um item na aba Itens." (15); EstadoVazio na busca vazia, na carga e nos erros de edição (16).
Extras baratos: 17 (Passo sem opacidade; Segmentos e estilos sem uso removidos), 18 (ChipMedida), 19 (fontes do kit), 20 (rotuloAcessivel no prazo), 21 ("= 5,3%" nos dois), 22 (BackLink "Voltar"), 24 ("Para o escritório").
Fila de corte: 23 (AvisoRapido do módulo -> AvisoRodape do kit, sem ponto final, nas telas de edição/decisão do detalhe); o passo local ainda não usa o BotaoPasso do kit (ele não é exportado; só o Passo com valor).
Testes: suíte inteira do @macuxi/vendedor 53 arquivos / 688 testes verdes (5434); tsc dos 3 projetos e eslint sem erro; verificar modulo-vendedor sem violações.
## Pronto quando
Confira no APK de preview. Dúvida de contrato: nenhuma.
