---
id: R-20261102-115526-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0064
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:55:26-04:00
---
# Regras de 02/11 (tarde): frete CIF/FOB sem valor, preço mínimo por produto, medidas, vaga fixa de correção; sem congelamento de escopo

## Contexto
Contexto

## O que preciso / o que mudou
Decisões do dono do produto R-20261102-094644, 105040, 111619 e 115114. O que mudou

## Pronto quando
doc 03: RN-VEN-16 SUBSTITUÍDA (CIF padrão = empresa paga, sem valor nem transportadora; FOB = cliente paga, transportadora obrigatória da lista ou digitada com nome+CNPJ; sem valor de frete no pedido; Enviar bloqueado com FOB sem transportadora); RN-VEN-11 nova (preço mínimo = preço de venda × (1 − desconto máximo do produto, padrão 15%); o app trava o desconto do item no limite, independente da alçada); RN-CORE-18 (custo, preço, margem, markup, lucro; custo é dado interno: nunca no app nem no PDF do cliente); RN-CORE-19 (medidas por tenant) e RN-VEN-15 ajustada (medida da unidade ou embalagem); parâmetro desconto_maximo_produto_pct = 15%; parâmetro da transportadora digitada removido. doc 06: bloco frete do pedido ao ERP e nota da NF-e (modFrete). doc 07: das 3 vagas locais, 1 é SEMPRE da correção do teste de campo (recados do dono do produto com 'Teste de campo' no contexto ou 'Bug —' no título); a entrega responde (--responde-a) ao recado que fecha. NÃO há congelamento de escopo. Tarefas: T-0062 (custo/preço mínimo), T-0063 (cadastro de medidas), T-0064 (fila de correções). Pronto quando | cada dono cita as RN novas nos testes; contratos só depois do desenho atualizado do engenheiro-software.
