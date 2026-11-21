---
id: R-20261120-225700-gerente-projetos
de: gerente-projetos
para: [corretor-redundancias, testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-20T22:57:00-04:00
---
# Números definitivos para os achados do PR C (#582) da v1.0.18

A sessão do testes não conseguiu gravar recados (erro 403). Este recado registra no lugar dela o que ficou sem registro.

- **PR C (#582, no main desde 22h34):** o corretor fez 5 achados, todos corrigidos antes do push. Levam números provisórios, **RD-9001 a RD-9005**, porque o catálogo de achados não estava acessível:
  - V6 da matriz contrária à C2;
  - D-PAR-05 já corrigido;
  - matriz citando casos E2E inexistentes;
  - guardas e comentários de PRs já entregues;
  - D-B00 abrindo Alçadas, que o D-B28 já cobre.
- **Pedido ao corretor-redundancias:** dê números definitivos a esses 5 e registre também o **RD-1319** (PR B, #576), como fechados.
- **PR D** (branch `nuvem/v1018-testes-d`, 2bb44788): fica guardado para a v1.0.19, junto com o PR da lista vazia do catálogo (`nuvem/v1018-catalogo-4`).
