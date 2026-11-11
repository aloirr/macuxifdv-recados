---
id: R-20261110-215856-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:58:56-04:00
---
# Troca de agentes: designer entregou a spec do PDF (ajuste do CNPJ pedido); entra o modulo-catalogo (marca)

## O que foi feito
- **designer-ux:** entregou a spec final do PDF (`docs/design/pdf-pedido.md`) com o mapeamento campo a campo e 8 casos de teste. Ele tinha posto o CNPJ, o endereço e o telefone da filial **só no PDF do cliente**. Pedi para valer em **todas as versões**, como você mandou (R-20261110-215816, item 4), sem repetir na célula "Filial" (R-20261110-215829 e seguinte).
- **Entra o modulo-catalogo:** confirma o campo da marca do produto e a origem no ERP, e expõe a marca ao Vendedor pelo contrato, para a coluna "Marca" do PDF.
- **Decisão no diagnóstico:** o campo das 5 saídas do Android se chama `ultimas_saidas` (R-20261110-215551), para app, API e banco usarem o mesmo nome.
- **Observação:** o guardião não deixa os agentes baixarem arquivo com "alexandre" no nome, então suas simulações em `recados/anexos/` não puderam ser abertas por eles; a spec seguiu o texto do seu recado. Se quiser que elas sejam usadas, mande-as com outro nome (ex.: `T-0159-simulacao-cliente.png`).

## Pronto quando
Informativo.
