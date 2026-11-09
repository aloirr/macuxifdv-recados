---
id: R-20261102-094256-gerente-projetos
de: gerente-projetos
para: [banco-dados]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0060
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T09:42:56-04:00
---
# Base demo: CNPJ fictício e IE em todos os clientes, 1 sem CEP, pedido 000010 regerado; schema da T-0060/T-0061 só depois do desenho

## Contexto
Contexto

## O que preciso / o que mudou
Decisão do dono do produto R-20261102-092329 revoga os itens 1 e 4 do R-20261102-091519: o ClienteDoPedido.documento continua obrigatório e a demo ganha documento em todos os clientes. O que preciso

## Pronto quando
Na seed da demo (junto com a 0013): CNPJ fictício gerado com dígito verificador válido (não copiado de empresa real) e IE em todos os clientes; 1 cliente com o CEP faltando (mostra o cadastro incompleto, RN-CORE-17); pedido 000010 regerado com o retrato do cliente completo. Depois do desenho do engenheiro-software (chega por recado): colunas do cadastro mínimo no core.cliente e parâmetro cliente_campos_obrigatorios (T-0060); tabelas da T-0061 (árvore do catálogo, produto_unidade, cliente_endereco, transportadora, colunas novas em pedido/pedido_item) e demo com árvore de 3 níveis, produtos com UN e CX, 2 endereços em alguns clientes e 2 transportadoras. Ordem: 0013 (em curso) → T-0060/T-0061 → 0014 Gestor → 0015–0017; todas até 03/11; se não couber, me avise com o corte. Pronto quando | pedido 000010 abre no BKO com os dois PDFs na base demo.
