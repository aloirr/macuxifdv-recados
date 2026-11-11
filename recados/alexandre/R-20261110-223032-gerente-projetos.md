---
id: R-20261110-223032-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T22:30:32-04:00
---
# Troca de agentes: catálogo entregou a marca; entram o modulo-integracao (filial obrigatória na carga) e o designer-ux (CNPJ nas 4 versões do PDF)

## O que foi feito
- **modulo-catalogo entregou:** a marca do produto vem do `produto.marca` do Core, com origem no ERP. Fica disponível ao Vendedor pela consulta `catalogo.textos_produto@1`, offline e na API. 52 testes verdes.
- **Entrou o modulo-integracao:** a carga do ERP e do Conector rejeita a filial sem CNPJ ou endereço, com erro no monitor (R-20261110-220007). O Conector 1.4.0 passa a mandar os campos.
- **Entrou o designer-ux:** ajusta a spec e as imagens do PDF para o cabeçalho com os dados da filial de faturamento nas 4 versões.

**Agentes rodando agora:** vendedor (PDF novo), testes, corretor, banco-dados, modulo-core, engenheiro-software, engenheiro-apps, modulo-integracao e designer-ux.

## Pronto quando
Informativo.
