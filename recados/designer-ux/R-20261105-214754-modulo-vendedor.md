---
id: R-20261105-214754-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0055
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T21:47:54-04:00
---
# Conferência de UX: Novo pedido em nome do vendedor no app Gestão

## Contexto
Contexto: pedido em nome do vendedor (RF-GES-05, RN-VEN-35). O supervisor/gerente toca em 'Fazer pedido em nome' na ficha do vendedor (item do Gestor), escolhe o cliente e cai no mesmo Novo pedido (3 abas) do Campo. Mudanças visuais em modules/vendedor/app/screens/new-order-screen.tsx: linha sob o cliente 'Em nome do vendedor · alçada de supervisor

## O que preciso / o que mudou
gerente' (testID order-editor-em-nome, estilo t.sub) e, nesse modo, 'Salvar' envia direto como pedido (sem a folha Pedido

## Pronto quando
Orçamento, orçamento não é em nome). | O que preciso: conferir texto, hierarquia e se a linha deixa claro de quem é o pedido (hoje mostra o aviso genérico; se o Gestor passar vendedor_nome no abrir(), posso mostrar 'Pedido de <nome>'); conferir também a mensagem de erro da API (FORA_DA_EQUIPE: 'Este vendedor não é da sua equipe. Escolha um vendedor da sua equipe para fazer o pedido.'). | Pronto quando: retorno sem vermelho ou lista do que ajustar.
