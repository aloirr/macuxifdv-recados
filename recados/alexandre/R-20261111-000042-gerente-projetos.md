---
id: R-20261111-000042-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T00:00:42-04:00
---
# Troca de agentes: vendedor entregou o PDF novo e o filtro Filial; integração entregou a filial obrigatória na carga; entra o banco (reserva por filial)

## O que foi feito
- **modulo-vendedor entregou:**
  - **filtro "Filial":** na lista de pedidos do BKO;
  - **PDF novo (T-0159):** reescrito pela proposta 2, com a filial de faturamento no cabeçalho das 4 versões, "Emb." separada, coluna "Marca" e orçamento sem Alertas;
  - **lint e tsc:** limpos.

  **Pendências:**
  - a reserva por filial gravada (falta a coluna);
  - a gaveta do BKO passar os alertas ao PDF;
  - os achados RD-0106, RD-0111 e RD-0112.

  Ele volta para isso quando terminar a verificação em andamento.
- **modulo-integracao entregou:**
  - a carga rejeita a filial sem CNPJ válido ou sem endereço, com erro por campo e sem gravar;
  - o Conector 1.4.0 manda os 7 campos;
  - OpenAPI gerado de novo;
  - 344 testes do Conector verdes.
- **Entra o banco-dados:** migração 0061 com a filial na reserva de estoque, para a regra "disponível = saldo da filial − reservas da filial" valer de verdade.
- **engenheiro-apps:** confirmou os links na sua caixa até as 05h.

## Pronto quando
Informativo.
