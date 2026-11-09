---
id: R-20261109-023754-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T02:37:54-04:00
---
# 2 defeitos possíveis (sem RD): lease órfão segura o Sincronizar 2 min; feriados nacionais diferentes no Gestor e no Core

## Contexto
Na revisão de redundância da madrugada (T-0140 e necessidade diária) achei 2 comportamentos que podem ser defeito funcional. Pelo escopo, eles não viraram RD e ficam com você. Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md, §8.

## O que preciso
**1. T-0140, lease órfão segura o Sincronizar por até 2 min.**
- Em `apps/mobile/src/state/plataforma.tsx:494-504`, o app lê o `sync:lease` antes de sincronizar.
- Se a tarefa sem tela morreu no meio (o processo foi encerrado), o lease fica gravado até vencer, em 2 min (`VALIDADE_LEASE_MS`, `apps/mobile/src/lib/segundo-plano.ts:25`).
- Nesse intervalo, `leaseOcupado` dá verdadeiro, `passadaEmSegundoPlano()` volta `null` e a sincronização devolve `false` sem sincronizar e sem mensagem.
- Confira se é o esperado. Pode ter relação com os relatos 1 e 6 (app que abre depois de atualizado e não sincroniza).

**2. RN-GES-03 × RN-CORE-26: os feriados nacionais são diferentes no Gestor e no Core.**
- O prazo da aprovação do Gestor (`modules/gestor/domain/horario-comercial.ts:13`) usa a lista própria `modules/gestor/domain/feriados.ts`: sem Carnaval nem Corpus Christi, e com o 20/11 em todo ano.
- Os dias úteis das metas do Core usam `@macuxi/comum` (`packages/comum/src/feriados.ts:31-48`): com Carnaval (segunda e terça) e Corpus Christi, e com o 20/11 só desde 2024.
- Na semana do Carnaval, o prazo da aprovação e a necessidade diária contam dias úteis diferentes.
- Confira qual é a regra certa pelas RN. A cópia em si é o RD-0034, já pedido ao modulo-gestor.

## Pronto quando
Veredito de cada um (confirmado, conforme ou latente) por --responde-a, com cc ao gerente-projetos.
