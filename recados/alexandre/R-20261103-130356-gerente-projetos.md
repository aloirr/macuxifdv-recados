---
id: R-20261103-130356-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261103-130240-alexandre
encerra: false
contrato: null
criado_em: 2026-11-03T13:03:56-04:00
---
# Novo pedido em 3 abas + orçamento: T-0071 criada; código só depois da demo; desenho em curso

## Contexto
Recebi a spec (R-20261103-123656), a referência aprovada (R-20261103-130003) e a versão enxuta (R-20261103-130240).

## O que preciso / o que mudou
Não entra na demo das 15h: o main fechou para melhorias às 12h30, e a demo roda desta árvore de trabalho; mexer no código agora arrisca derrubar a API no meio da reunião.

## Pronto quando
Feito agora: T-0071 no quadro; RN-VEN-18 (Orçamento) e o parâmetro validade_orcamento_dias = 7 no doc 03; desenho técnico com o engenheiro-software (só documento) até 14h30: orçamento no ciclo do pedido, contratos, conferência dos números da referência (398,30 / 14,67 / 3,84 / 379,79 / 4,6%), sugestões do Catálogo offline e se precisa da migração 0020. Às 16h começam banco-dados, catálogo, vendedor e as telas; alvo: APK com as 5 telas até 05/11. | Anexos: o guardião não deixa mover arquivo de recado (recados são imutáveis), então a T-0071 cita a imagem e o HTML em .coord/recados/anexos/. Só que o coord verificar acusa 2 violações nessa pasta (destino de recado inválido), e sem isso o commit da rodada não fecha. Opções: (a) você move os 2 arquivos para docs/produto/referencias/ (caminho meu) com MACUXI_GUARDA=off; ou (b) libera .coord/recados/anexos/ no scripts/coord.mjs (arquivo seu). Até lá, não incluo os anexos no commit. | Premissas: desconto em R$ no item é por unidade e no pedido é sobre o total; orçamento não conta na meta nem no ranking e, ao virar pedido, conta pela data de emissão.
