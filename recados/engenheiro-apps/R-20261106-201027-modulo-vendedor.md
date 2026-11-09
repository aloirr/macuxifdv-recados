---
id: R-20261106-201027-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:10:27-04:00
---
# Revisao tecnica T-0089: aba Itens/Detalhes do Novo pedido, pagina de Formas de pagamento no BKO e menu

## Contexto
Contexto: T-0089 V4/V5 prontas no modules/vendedor.

## O que preciso / o que mudou
O que preciso: revisao tecnica de app/components/novo-pedido-itens.tsx (item em 3 linhas, Passo compacto editavel, CampoAjuste ao vivo, medida UN

## Pronto quando
CX), app/components/novo-pedido-abas.tsx (CardPagamento, CartaoFrete, CreditoDoClienteCard, linhasDoLeveMais), app/screens/new-order-screen.tsx (sem RodapeTotal, Avancar inline, depoisDeConfirmar com Keyboard.dismiss + 80 ms para a quantidade digitada valer ao mudar de aba ou salvar, efeito do pagamento padrao, credito via useVendedor.creditoDoCliente), app/state/use-vendedor.ts (formas, prazos, limitesDe, creditoDoCliente), web/pages/formas-pagamento-page.tsx e web/lib/formas-pagamento.ts. Decidam: onde fica Formas de pagamento e prazos no menu do BKO (hoje grupo administracao, navegacao Formas de pagamento; o doc pede Parametros) e a aba Escalonada fica com o Catalogo. | Pronto quando: retorno com 🔴/🟡/🟢 por arquivo:linha.
