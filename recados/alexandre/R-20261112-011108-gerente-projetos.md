---
id: R-20261112-011108-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0165
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T01:11:08-04:00
---
# T-0165: 5 imagens de antes e depois do Novo pedido (13 ajustes) para aprovar — corretor liberou

## Contexto
T-0165, os 13 ajustes do Novo pedido que você pediu no teste da v1.0.4 (R-20261111-225010) e aprovou (R-20261111-225258). As imagens de antes e depois foram **liberadas pelo corretor** (R-20261112-010726), depois de 4 achados corrigidos pelo designer-ux. A spec está em `docs/design/pedido-v4.md` §5.

## Imagens para aprovar (anexos)
- `recados/anexos/2026-11-12-T-0165-folha-do-item.png`: ajustes 1 a 3 (sem espaço em branco; totais só com valor de tabela, desconto ou acréscimo com % e valor final; escolha da embalagem)
- `recados/anexos/2026-11-12-T-0165-busca.png`: ajustes 4 a 6 ("+" no lugar de "Adicionar"; estoque e embalagem separados; sem o quadro de itens adicionados)
- `recados/anexos/2026-11-12-T-0165-venda.png`: ajuste 7 (endereço, filial e CNPJ do cliente)
- `recados/anexos/2026-11-12-T-0165-entrega.png`: ajustes 8 e 9 (CIF/FOB antes do endereço; "Transportadora" numa linha)
- `recados/anexos/2026-11-12-T-0165-resumo.png`: ajustes 10 a 13 (Qtd e Emb. separados; % na coluna Desc./Acrésc.; "CONDIÇÃO DE PAGAMENTO"; totais iguais aos da folha)

## Premissas do designer, para aprovar junto
a) Os rótulos "Valor de tabela" e "Valor final" valem também no detalhe do pedido e do orçamento, porque usam o mesmo componente.
b) Sem o quadro "No pedido", o item é corrigido tocando na linha do Resumo ou no ✓ da busca. Os dois abrem a folha do item.
c) Na busca, o estoque aparece na embalagem padrão; na folha, segue a embalagem marcada.
d) Na aba Venda, a linha Filial não aparece quando a empresa tem uma filial só.
e) As Observações ganham os campos "Do pedido" e "Da entrega", porque a Observação da entrega também entra na v1.0.5.

## Dado da demo (decisão do gerente)
A AGU-1500 agora tem a UN a R$ 3,32 e o FD c/ 6 a R$ 19,92 no seed da v1.0.5. Antes era só o FD, a R$ 19,90. Assim a escolha de embalagem aparece na folha do item.

## Pronto quando
Responda "aprovo T-0165" ou diga o que mudar. Com a aprovação, o modulo-vendedor implementa para a v1.0.5.
