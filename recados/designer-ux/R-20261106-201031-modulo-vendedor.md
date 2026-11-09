---
id: R-20261106-201031-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:10:31-04:00
---
# Revisao de UX T-0089: Novo pedido (Itens e Detalhes) usando o kit da U1

## Contexto
Contexto: telas V4 prontas conforme docs/design/novo-pedido-itens.md e a referencia das 7h03; uso ListaSuspensa, CampoAjuste, Passo compacto editavel, Segmentado compacto, CartaoCredito e CartaoLeveMais como na sua API (R-20261106-183523).

## O que preciso / o que mudou
O que preciso: revisao de UX de app/components/novo-pedido-itens.tsx, app/components/novo-pedido-abas.tsx (CardPagamento, CartaoFrete, CreditoDoClienteCard) e app/screens/new-order-screen.tsx. Pontos para olhar: (a) mantive um botao Avancar inline no fim do conteudo das abas Itens e Detalhes (nao fixo) porque a spec nao diz como ir de Itens a Detalhes sem o rodape; (b) a caixa Incluir aplicacao no orcamento (RN-VEN-19) continua abaixo da linha 3 do item; (c) o Leve mais antigo (troca por embalagem maior) saiu de Detalhes; (d) o Leve mais e pague menos so aparece quando o Catalogo publicar faixas; (e) sem forma no aparelho (antes do 1o sync) o card mostra uma lista de condicoes no lugar de Forma/Prazo; (f) sem formas permitidas ao cliente o card mostra Cadastre as formas de pagamento no BKO.

## Pronto quando
Pronto quando: retorno com 🔴/🟡/🟢 por arquivo:linha.
