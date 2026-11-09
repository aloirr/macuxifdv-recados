---
id: R-20261108-054931-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T05:49:31-04:00
---
# Nuvem: 3 frentes que adiantam trabalho fora do caminho do build (N10 feriados, N11 telas do Vendedor, N12 Gestão) — prompts para colar

Três frentes da nuvem que adiantam trabalho sem tocar no lote local. O lote tem mais de 400 arquivos fora do main, então a nuvem não acelera o build. Os caminhos ficam reservados no quadro. Os PRs entram DEPOIS do build único (a sua condição 4: nada em andamento nas telas na hora do build).

Regras comuns, já dentro de cada prompt: trailer único "Agente: <dono>"; nada em .coord/; sem force push; título com [PRONTO PARA MERGE <sha>] com o ci-ok verde.

=== N10 — T-0105 (parte) feriados no calendário de dias úteis (dono: engenheiro-software)
Branch: nuvem/T-0105-feriados · Caminhos: packages/comum/src/calendar*.ts e um feriados*.ts novo.
PROMPT:
"Você é o agente engenheiro-software do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0105 (parte: feriados), frente N10 da nuvem. Crie a branch nuvem/T-0105-feriados a partir do main. Trabalhe SÓ em packages/comum/src/calendar*.ts e num arquivo novo packages/comum/src/feriados*.ts (e testes). Nada em .coord/, banco, API ou módulos. Leia CLAUDE.md e .coord/tarefas/T-0105.md. Entregue: os feriados nacionais do Brasil (fixos e móveis: Carnaval segunda e terça, Sexta-feira Santa, Corpus Christi, calculados pela Páscoa) como função pura por ano; o calendário de dias úteis aceitando uma lista extra de feriados do tenant (data civil AAAA-MM-DD, no fuso do tenant), sem saber de onde ela vem; o prazo em dias úteis (usado no prazo de aprovação do Gestor, RN-GES-03) passando a pular feriados quando a lista for informada, e mantendo o comportamento atual quando não for. Testes cobrindo 2026–2030, a virada de ano e o fuso de Manaus. Rode pnpm --filter @macuxi/comum lint, typecheck e test. Commit 'T-0105: feriados nacionais e do tenant no calendário de dias úteis' com o trailer único 'Agente: engenheiro-software'. PR para main; com o ci-ok verde, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N11 — T-0101 (parte das telas) Vendedor: seletor da RN-VEN-35 e acabamento visual (dono: modulo-vendedor)
Branch: nuvem/T-0101-vendedor-telas · Caminhos: modules/vendedor/app/** (só telas e lib do app).
PROMPT:
"Você é o agente modulo-vendedor do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0101 (parte das telas), frente N11 da nuvem. Crie a branch nuvem/T-0101-vendedor-telas a partir do main. Trabalhe SÓ em modules/vendedor/app/**; não mexa em api, domain, contracts nem db do Vendedor (o time local mexe neles agora) e nada em .coord/. Leia CLAUDE.md, .coord/tarefas/T-0101.md e a RN-VEN-35 no docs/produto/03-regras-de-negocio.md. Entregue: 1) no pedido em nome do vendedor (app Gestão), o seletor de clientes mostrando só a carteira do vendedor dono, e a busca mostrando 'Cliente da carteira de <vendedor>' para cliente de outra carteira, em vez de esconder (use os dados que o app já tem; se faltar campo, pare e descreva no PR); 2) o acabamento visual das revisões de UX R-20261104-200432, 200745 e 201427 que for do Vendedor (Pedidos: destaque do número buscado e o resto listado nelas), com os componentes do kit @macuxi/ui. Testes de componente e de lib. Rode pnpm --filter @macuxi/vendedor lint, typecheck e test. Commit 'T-0101: seletor da RN-VEN-35 e acabamento visual de Pedidos' com o trailer único 'Agente: modulo-vendedor'. PR para main; com o ci-ok verde, título com [PRONTO PARA MERGE <sha>]. Sem force push."

=== N12 — T-0102 (parte do Gestão) aviso da etapa pendente no app Gestão (dono: modulo-gestor)
Branch: nuvem/T-0102-gestao-etapa · Caminhos: modules/gestor/** (app e domain do Gestor).
PROMPT:
"Você é o agente modulo-gestor do Macuxi FDV (repositório aloirr/macuxifdv). Tarefa T-0102 (parte do Gestão: etapa pendente), frente N12 da nuvem. Crie a branch nuvem/T-0102-gestao-etapa a partir do main. Trabalhe SÓ em modules/gestor/**; nada em .coord/, no Core, no banco nem em outros módulos. Leia CLAUDE.md, .coord/tarefas/T-0102.md e docs/design/checkout-pendencia.md (§2.2). Entregue o aviso da etapa pendente no app Gestão (§2.2), com os dados que o Gestor já recebe por contrato. Se o Gestor não tiver as visitas da equipe com etapas_pendentes no contrato atual, NÃO invente: descreva no PR o campo que falta no contrato do Core e implemente o aviso atrás de uma função pura testada, que liga quando o campo existir. Testes. Rode pnpm --filter @macuxi/gestor lint, typecheck e test. Commit 'T-0102: aviso da etapa pendente no app Gestão' com o trailer único 'Agente: modulo-gestor'. PR para main; com o ci-ok verde, título com [PRONTO PARA MERGE <sha>]. Sem force push."
