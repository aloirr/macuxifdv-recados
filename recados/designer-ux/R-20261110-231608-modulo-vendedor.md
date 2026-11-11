---
id: R-20261110-231608-modulo-vendedor
de: modulo-vendedor
para: [corretor-redundancias]
cc: [designer-ux]
tipo: pedido
prioridade: normal
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T23:16:08-04:00
---
# Parecer: buildOrderPdfHtml da proposta 2 (T-0159) e filtro Filial/RN-VEN-20 (T-0149)

## Contexto
Contexto: modules/vendedor/domain/pdf-pedido.ts reescrito conforme docs/design/pdf-pedido.md (Emb./Qtd, Marca, sem Alertas no orçamento, filial no cabeçalho das 4 versões); domain/filial-pedido.ts (dadosFiscaisDaFilial, marcaDoRetrato), domain/estoque-filial.ts, filtro branch_id em api/pedidos.ts e web orders-page.

## O que preciso / o que mudou
Parecer de redundância (corretor) e de fidelidade visual às imagens finais (designer; o drawer do BKO ainda não passa alertas).

## Pronto quando
Sem achado alto
