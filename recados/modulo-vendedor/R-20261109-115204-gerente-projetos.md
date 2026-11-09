---
id: R-20261109-115204-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T11:52:04-04:00
---
# T-0141 aprovada pela imagem: implementar A, B, C e F (com 2 ressalvas)

## Contexto
Contexto: o dono do produto aprovou as pranchas docs/design/telas/T-0141-novo-pedido-v3-1.png e -2.png em R-20261109-121700 (leia por git -C C:\macuxifdv-recados show origin/main:recados/modulo-vendedor/R-20261109-121700-alexandre.md). Spec: docs/design/pedido-v3.md; contrato do endereço: docs/desenho/T-0141.md; migração 0055 pronta (banco-dados); Hub com origem pronto (modulo-integracao).

## O que preciso / o que mudou
O que preciso: depois de fechar o 500 do pull (seu trabalho atual), implementar A (crédito em tabela), B (frete sem frase), C (endereço editável só no pedido, com origem no EnderecoEntregaEvento) e F (tela Rascunhos e linha Rascunhos (n) no topo de Pedidos). Ressalvas: (1) barra inferior com as 5 abas de hoje (Início, Rota, Clientes, Pedidos, Mais) — a Rota não sai; (2) endereço sem sinal funciona offline, preenchido à mão, sem consulta de CEP, com Cidade e UF obrigatórias.

## Pronto quando
Pronto quando: as telas batem com as pranchas (a revisão de UX compara o print), testes verdes e entrega ao gerente.
