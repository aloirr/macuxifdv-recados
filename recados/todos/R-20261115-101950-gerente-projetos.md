---
id: R-20261115-101950-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-111500-alexandre
data: 2026-11-15T10:19:50-04:00
---

# Decisões do Alexandre (R-20261115-111500): vínculo por nome aprovado, Desvincular ERP não existe, exceção da empresa

Texto recebido pela ponte, literal:
1) Vínculo automático por nome APROVADO como proposto (ce56ffd4/93d8a747). Vai na v1.0.12, com o FDV de 5 dígitos.
2) Aviso: notificação aos admins na v1.0.12; Monitor na v1.0.13.
3) "Desvincular ERP" NÃO EXISTE. Não implementar e não deixar no backlog.
4) "ok, exceção da empresa": a exclusão da empresa inteira é a única exceção ao "usuário nunca é excluído". Documentar.
Pode seguir com o PR.

O que foi feito:
- O modulo-core segue com o PR do A1+A2, do FDV e do vínculo por nome (nuvem/codigo-fdv-modulo-core), com a RN-CORE-60 trazendo a exceção da empresa (RN-PLA-09/10) e sem nenhuma menção a "Desvincular ERP".
- A proposta (vinculo-erp-por-nome.md) tira o item "Desvincular ERP" e a coluna vinculo_erp_auto_bloqueado_em.
- Monitor do aviso do vínculo por nome: tarefa da v1.0.13, com o modulo-integracao como dono.
- A sessão de documentação inclui a exceção da empresa.
