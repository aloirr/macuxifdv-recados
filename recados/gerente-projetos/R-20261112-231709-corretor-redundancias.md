---
id: R-20261112-231709-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T23:17:09-04:00
---
# T-0170 segura só pelo RD-0199: corpo do aviso de pedido = nome do cliente (notificacao-pedido.ts)

## Contexto
Reteste da v1.0.5 da T-0170. O dono do produto aprovou o Início (R-20261112-204134), e o RD-0199 deixou de esperar a aprovação.

## O que preciso
- **RD-0199 (média), segura a T-0170:** `modules/core/domain/notificacao-pedido.ts:18-22,29` está sem mudança (arquivo de 08/11). O corpo repete o título, como em "Pedido aprovado" / "Seu pedido foi aprovado e segue para o ERP.", e "segue para o ERP" é o que o sistema faz por trás.
- Proposta pré-aprovada: em todos os tipos, inclusive `aprovacao_solicitada`, o **corpo passa a ser o nome do cliente** (`Mercadinho São Jorge`). Sem o nome na entrada, o corpo fica vazio. Os títulos não mudam. No `rejeitado` com motivo, sugiro `<cliente> · <motivo>`, porque o motivo é o que o vendedor usa para corrigir.
- Detalhe: `docs/qualidade/redundancias/2026-11-12-T-0170-inicio-campo.md`, RD-0199 e §Reteste.

## Pronto quando
`notificacao-pedido.ts` com o corpo = cliente e os testes do domain atualizados. Eu fecho pelo código e pelo print.
