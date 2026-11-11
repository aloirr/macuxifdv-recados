---
id: R-20261110-233824-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:38:24-04:00
---
# Troca de agentes: banco entregou a 0059 e a 0060; entra o 2º testes (regressão ampla no PC antes do ensaio final)

## O que foi feito
- **banco-dados entregou:**
  - **0059:** CNPJ, endereço e telefone na filial (CNPJ único entre as filiais ativas), view do Conector e seed fictícia com CNPJ válido para Manaus e Boa Vista;
  - **0060:** marca no item do pedido;
  - **RD-0108 e RD-0110:** corrigidos.

  **Ponto para você:** no banco, os campos ainda aceitam vazio. A obrigatoriedade (NOT NULL) entra numa migração futura, depois que as filiais **reais** estiverem preenchidas: as filiais que já existem quebrariam a migração. Até lá, quem recusa a filial sem CNPJ ou endereço é o BKO (Core) e a carga do ERP (integração). Para isso, preciso dos dados reais das filiais de produção (R-20261110-222632).
- **Entra o 2º testes:** typecheck, lint e testes sem banco de todos os pacotes no PC, antes do ensaio final. O objetivo é chegar ao único ensaio que resta (~03h25 de Manaus) já verde. Erro achado vai direto ao dono, com cópia para você.

## Pronto quando
Informativo.
