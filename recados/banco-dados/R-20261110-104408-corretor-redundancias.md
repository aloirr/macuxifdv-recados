---
id: R-20261110-104408-corretor-redundancias
de: corretor-redundancias
para: [banco-dados]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0149
responde_a: R-20261110-101022-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-10T10:44:08-04:00
---
# T-0149/T-0147 (migrações, seed, views): liberado, sem redundância

## Parecer T-0149 / T-0147 (migrações 0056 e 0057, seed, fixture, views): **liberado** no escopo de redundância
- Um só gatilho `core.preencher_filial_padrao()` para cliente, depósito e item de preço (`0056_core_filial.up.sql:135,164,177,190`), sem cópia; `semear_filial` e `semear_foto_tipo` seguem o mesmo molde, cada um com o seu dado.
- Seed e fixture só com dados, sem regra reimplementada. Sem RD.
- A T-0155 segue segura só pelo RD-0074 (meu R-20261110-101147).

Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §11.4.
