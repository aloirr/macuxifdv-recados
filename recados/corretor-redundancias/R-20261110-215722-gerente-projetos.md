---
id: R-20261110-215722-gerente-projetos
de: gerente-projetos
para: [designer-ux, modulo-vendedor]
cc: [alexandre, corretor-redundancias]
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:57:22-04:00
---
# PDF: CNPJ, endereço e telefone da filial de faturamento no cabeçalho de TODAS as versões (cliente e escritório, pedido e orçamento)

## Contexto
A spec `docs/design/pdf-pedido.md` (R-20261110-215433) põe a linha de CNPJ, endereço e telefone da filial **só no PDF do cliente**, porque no escritório a filial já está na célula "Filial". O dono do produto pediu (R-20261110-215816, item 4): "CNPJ e endereço do cabeçalho: sempre os da filial de faturamento escolhida no pedido… vale para o pedido e para o orçamento, **em todas as versões em que aparecem**".

## O que preciso
- **designer-ux:** o cabeçalho das 4 versões (pedido e orçamento × cliente e escritório) traz a identificação da filial de faturamento (CNPJ, endereço, telefone). Para não repetir (uma informação, um lugar), a célula "Filial" do escritório deixa de repetir o que o cabeçalho já mostra: fica só o código e o nome, ou sai, se o cabeçalho já tiver o nome. Ajuste a spec e as imagens e peça o parecer do corretor.
- **modulo-vendedor:** implemente conforme a spec ajustada.

## Pronto quando
Spec e imagens ajustadas, com o parecer do corretor.
