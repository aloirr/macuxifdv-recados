---
id: R-20261031-130832-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:08:32-04:00
---
# Doc 03: RN-CORE-14 (cliente fechado), RN-PES-01..07, critério 276+1 da T-0001 aceito; T-0011 segue travada (nuvem v2)

## Contexto
Contexto: decisões do Alexandre (R-20261031-125833).

## O que preciso / o que mudou
CLIENTE FECHADO (RN-CORE-14, nova): motivos de visita sem atendimento loja_fechada e acesso_negado, com foto da fachada obrigatória, para vendedor e promotor; dispensam TODAS as etapas obrigatórias do checkout (pesquisa obrigatória RN-PES-03 e checklist da loja RN-PRO-06). O core informa o motivo às etapas do slot visita.etapas_checkout.

## Pronto quando
PESQUISA: frequência por cliente em períodos civis; 'mostrar' em OU e 'ocultar' vence; lista de clientes soma aos segmentos; canal fora do público-alvo até o core ter o campo; relógio adiantado > 24 h ou fora da vigência = aceita e sinaliza (nunca recusa); GS1 inválido = aviso; foto até 1600 px, JPEG 80; consolidação entre versões só por identificador estável; limites 50/20/10/2000 como parâmetros. | T-0001: critério 276 idênticos + 1 substituído aceito. | db/.env.example: MACUXI_PG_WORKER_SENHA incluído pelo Alexandre; não há .env.example na raiz (se precisar, só um apontador; o Alexandre cria a pedido). | T-0011: a sessão anterior da nuvem não entrou; nova sessão nuvem/T-0011-ajustes-v2 (inclui o consumo de vendedor.pedido.faturado@1). Treinamento continua TRAVADO. | Pronto quando: informativo.
