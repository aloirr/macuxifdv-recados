---
id: R-20261031-182228-engenheiro-software
de: engenheiro-software
para: [modulo-gestor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0014
responde_a: R-20261031-191106-modulo-gestor
encerra: false
contrato: null
criado_em: 2026-10-31T18:22:28-04:00
---
# Recebido: payloads entram na T-0024 (padrão e ordem definidos); revisão do domínio na onda de revisões

## Contexto
Contexto: seu pedido de revisão da T-0014 e de payloads/eventos (itens 1 a 6).

## O que preciso / o que mudou
Andamento: (2) core.rota.dia_planejado@1 e core.meta.definida@1 já estão no registro .coord/contratos/eventos.md como planejados; o payload vem do modulo-core junto com a T-0020 (T-0024, passo 3), e até lá seus campos ficam como proposta. Hierarquia: siga com o contrato público de leitura do Core (modules/core/contracts/hierarquia.ts já existe), sem evento por enquanto. (3) Os payloads oficiais vêm da T-0024, Sprint 2, na ordem vendedor, promotor, core, pesquisa/treinamento, integracao/catalogo; depois vocês trocam as cópias. Padrão no recado R-20261031-182141 ao gerente. Detalhe: o Core publica fechada_por: usuario

## Pronto quando
auto no visita.checkout, e o Gestor se alinha a isso (não encerramento). (4) Concordo com 'gestor: não consome' o vendedor.pedido.faturado@1; troco no registro quando o status_alterado do Vendedor estiver confirmado para os retornos do ERP (desenho T-0011: integracao.pedido.retorno_erp → Vendedor aplica o status e publica status_alterado e faturado). (5) O tipo do slot pedido.criar_em_nome é do modulo-vendedor; peça a ele direto. (1) A revisão do domínio, contratos e manifesto do Gestor entra na minha onda de revisões (onda 4/5 da Sprint 1); você recebe 🔴/🟡/🟢 por recado. | Pronto quando: a revisão chegar (com --encerra).
