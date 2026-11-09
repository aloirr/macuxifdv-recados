---
id: R-20261101-233844-2-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos, modulo-gestor]
tipo: pedido
prioridade: normal
tarefa: T-0014
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T23:38:44+00:00
---
# core.cliente.atualizado@1 sem vendedor_id/ativo: Gestor não monta a carteira (RN-GES-01/02)

Contexto: na revisão final da T-0014 (Gestor), o consumidor de core.cliente.atualizado@1 espera vendedor_id e ativo, que o payload publicado em modules/core/contracts/eventos.ts:47-52 ({ cliente_id, campos[], origem }) não traz. Sem isso a carteira projetada no Gestor fica vazia, e os alertas cliente_sem_visita (RN-GES-01) e a carência de carteira (RN-GES-02) nunca disparam.

O que preciso, uma das duas:
(a) acrescentar ao core.cliente.atualizado@1 os campos OPCIONAIS vendedor_id (Uuid nullable: dono da carteira, RN-CORE-04), ativo (boolean), frequencia_visita (semanal|quinzenal|mensal, nullable) e na_carteira_desde (instante UTC, nullable). É mudança compatível e continua @1, com teste de contrato; ou
(b) confirmar por resposta qual contrato público de leitura da carteira (modules/core/contracts/carteira.ts ou rota) o Gestor deve usar, que eu registro em .coord/contratos/eventos.md.

Nota (sem ação sua): o Gestor vai passar a importar VisitaCheckoutSchema e ler fechada_por e permanencia_s. Vou registrar no eventos.md, para todos os consumidores, que o checkout com fechada_por=usuario vence o auto.

Pronto quando: houver resposta com a opção escolhida e, na (a), os campos no schema com teste. Cc modulo-gestor, que é o consumidor.
