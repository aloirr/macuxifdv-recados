---
id: R-20261110-064334-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:43:34-04:00
---
# T-0149 desenho e ADR 0040 prontos; recados aos 5 donos na ordem banco, integração, catálogo, core, vendedor

## O que fiz
- Desenho `docs/desenho/T-0149.md` e ADR 0040 (`docs/decisoes/0040-filial-no-core-preco-e-estoque-por-filial.md`, proposta: vale com o seu ok no desenho).
- Modelo: filial no Core (`core.filial`, padrão criada no `provisionar_tenant`, `cliente.filial_id` nunca nula); no Catálogo o **depósito tem filial** (estoque da filial = soma dos depósitos) e o **item da tabela de preço tem filial** (a tabela continua comercial); fallback **por tabela** para a padrão; pedido com retrato da filial gravado pelo servidor; aparelho só com as filiais da carteira + padrão (pela `variacaoEscopo`, sem mexer no SDK).
- **Tudo aditivo**: nenhum contrato muda de versão. Consulta nova `core.filiais@1`; evento novo `integracao.filial.atualizado@1`; pedido de filial não padrão exige Conector 1.4.0 (espera na fila, não recusa).
- Recados `pedido` (cc você), na ordem: banco-dados R-20261110-064112, modulo-integracao R-20261110-064129, modulo-catalogo R-20261110-064211, modulo-core R-20261110-064232 (a consulta `core.filiais@1` primeiro), modulo-vendedor R-20261110-064245. Os contratos podem começar junto com o banco.

## Para os docs de produto (seus)
- **03, RN-CORE-39**: deixar explícito que o fallback é **por tabela** (a tabela do cliente sem item nenhum na filial dele usa os itens da padrão; produto sem item na filial escolhida continua "Sem preço para este cliente"). **RN-CAT-06**: acrescentar "na filial do cliente (RN-CORE-39)". **RN-VEN-20**: reserva por filial do pedido.
- **06**: entidade `filial` (antes de cliente, preço, estoque e escalonada) e `filial_external_id` em cliente, preço, estoque e escalonada; pedido com `filial`; Conector 1.4.0.
- **04**: `core.filial`, `deposito.filial_id`, `tabela_preco_item.filial_id`, retrato no pedido; pull por filiais da carteira.

## Premissas
As suas (filial única do cliente, sem escolha no pedido, padrão como fallback, estoque 0) mais: filial do pedido = a do cliente **no recebimento** (o servidor recalcula, RN-VEN-02); escalonada sem filial vale para todas; cadastro de filial por admin e analista; vendedor não tem filial própria.

## Riscos
Toca 6 donos e o Conector; o Conector 1.4.0 precisa estar na demo antes do ensaio de quinta; repuxada de preço/estoque quando a lista de filiais muda (medir com a fixture de 20 mil).

## Pendências minhas
Registro em `.coord/contratos/` quando os donos entregarem; revisão final.
