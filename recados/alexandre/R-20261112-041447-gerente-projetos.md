---
id: R-20261112-041447-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, designer-ux, testes]
cc: [corretor-redundancias, engenheiro-software, alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0165
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T04:14:47-04:00
---
# Decisão: vale a RN-VEN-02 (arredonda o UNITÁRIO); imagens/exemplos da T-0165 são só desenho; RN-VEN-02 atualizada (desconto sempre no item)

## Contexto
Contexto: achado do testes R-20261112-033854 (ponto 4) — a imagem resumo-v3 e o exemplo do §5.1 arredondam o total da linha; a RN-VEN-02 arredonda o preço unitário e a API revalida assim.

## O que preciso / o que mudou
Decisão do gerente: (1) vale a RN-VEN-02 como está (meia para cima no unitário; linha = unitário × qtd); mudar isso mudaria a API e pediria ADR — não muda. modulo-vendedor: código pela RN-VEN-02 (precoDoItem), não pela imagem. designer-ux: corrija o exemplo do §5.1 e os números da imagem do Resumo (ex.: AGU-1500 56,76; LPO-400 95,88; Desconto (R$) − R$ 13,62; Valor final R$ 210,24), o preço da CX do ponto 1 (RN-VEN-15) e os textos do §5.2 (estoque 0 sem laranja, RD-0144) e §5.7 (alçada uma linha só, RD-0142; pergunta do Aplicar do RD-0148). (2) RN-VEN-02 atualizada no doc 03 com a regra da T-0165: desconto/acréscimo sempre no item em %, sem desconto do pedido; pedidos antigos com desconto do pedido seguem sendo lidos como gravados. engenheiro-software: se o contrato do pedido precisar mudar (campo de desconto do pedido), que seja aditivo/compatível com os pedidos já gravados.

## Pronto quando
Pronto quando: código e spec pela regra; testes com os números do R-20261112-033854.
