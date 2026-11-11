---
id: R-20261110-223850-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T22:38:50-04:00
---
# Troca de agentes: Core entregou a filial com CNPJ e endereço obrigatórios; volta para o RD-0109 e o tsc completo

## O que foi feito
- **modulo-core entregou (R-20261110-223643):**
  - `core.filiais@1` e o pull da filial passam a trazer CNPJ, endereço e telefone;
  - o BKO e a API recusam a filial sem CNPJ válido (dígito verificador) ou sem endereço;
  - o consumidor do ERP grava os campos válidos;
  - 23 testes de domain e API verdes.

  **Premissa dele:** editar só a situação ou a filial padrão de uma filial antiga, sem os dados, passa; qualquer outra mudança no cadastro exige CNPJ e endereço.
- **O Core volta agora** para o RD-0109 (comentários das fotos do PDV que contradizem o "Na fila" e um filtro repetido) e para o tsc completo e o lint do módulo.

## Pronto quando
Informativo.
