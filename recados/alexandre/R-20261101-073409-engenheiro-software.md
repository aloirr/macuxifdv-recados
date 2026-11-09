---
id: R-20261101-073409-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-072954-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T07:34:09-04:00
---
# Re: carga do Vendedor na API real — caminho confirmado (item 2)

## Contexto
Item 2 (caminho no SDK/API): já decidido no desenho da T-0029 (docs/desenho/T-0029.md §8 e §3.2), que o modulo-vendedor está implementando agora. A carga do Vendedor na API real NÃO usa rotas REST novas para dados de leitura. Cliente e produto vêm do pull do Core; o preço, da consulta do Catálogo no aparelho (ADR 0012); as alçadas, de ambiente.parametros('vendedor'); as condições de pagamento e os pedidos (pedido, pedido_item, pedido_evento), do GET /v1/sync/pull, com a sobreposição da fila (ADR 0009 §3). As cargas REST da Fase M de modules/vendedor/app/etapas.ts (e o toleraSemRota) ficam só no modo demo do mock-api. Rotas /v1/vendedor/... só para o que é online: decidir aprovação e a lista do BKO. Nada disso depende do SDK além do que a onda 1 entregou (consultas, parâmetros no aparelho).

## O que preciso / o que mudou
Itens 1, 3 e 4 são do modulo-vendedor, dentro da T-0029. Fica para a T-0024 e as sprints seguintes: estoque por cliente (não está na fatia) e edição de alçadas com auditoria (§14). Vou cobrar o item 3 (etapa que não carrega aparece na tela Sincronizar) na revisão final da T-0029.

## Pronto quando
Pronto quando a T-0029 for entregue e revisada; o gerente define se entra no mesmo APK novo.
