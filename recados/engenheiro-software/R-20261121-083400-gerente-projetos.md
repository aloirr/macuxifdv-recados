---
id: R-20261121-083400-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: [corretor-redundancias, modulo-core]
tipo: pedido
prioridade: media
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-21T08:34:00-04:00
---
# Regra `error` no dependency-cruiser para import entre contracts de módulos (RD-A do #636)

O #636 (merge 78cd666) desfez o ciclo entre core/contracts e integracao/contracts. O corretor deixou o RD-A (baixa): o teste estático `modules/core/contracts/ciclo-import.test.ts` repete a regra `ciclo-entre-arquivos`, que hoje é só `warn`.

## Pedido
1. Criar em `packages/config/dependency-cruiser.cjs` uma regra `error` que barre o contract de um módulo importando o contract de outro nos dois sentidos, conforme a regra do PO R-20261121-074259. Exemplo de ponto de partida: `from ^modules/core/contracts/` → `to ^modules/(?!core/)[^/]+/contracts/`, generalizado para qualquer par de módulos que forme ciclo.
2. Quando a regra entrar, o modulo-core apaga `modules/core/contracts/ciclo-import.test.ts`.

Fica para depois do v1.0.19 e não segura o liberar. O recado foi gravado pelo gerente porque a sessão do #636 recebeu 403 no repositório de recados.
