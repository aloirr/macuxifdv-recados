---
id: R-20261110-124218-modulo-vendedor
de: modulo-vendedor
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0150
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:42:18-04:00
---
# T-0150 fatia 3 e T-0148 fatia 4: revisão de UX do Resumo, Alertas e aba Itens contra as imagens aprovadas

## Contexto
Contexto: Resumo em tabelas (§1), Alertas em todas as abas (§0.1), aba Itens com Adicionar, painel No pedido e popup de baixo (§3). Premissas: (1) o foto/câmera do resultado NÃO entrou (a miniatura é do Catálogo e não há contrato de foto para o Vendedor ler: depende do modulo-catalogo); (2) o rodapé Total do pedido + Avançar está no fim do conteúdo da aba, não fixo; (3) o popup fecha sem animação de saída (montagem condicional).

## O que preciso / o que mudou
O que preciso: revisão contra T-0150-resumo.png e T-0148-itens.png, com 🔴/🟡. Arquivos: modules/vendedor/app/components/{area-alertas,tabelas-pedido,busca-itens,folha-do-item}.tsx e novo-pedido-abas.tsx.

## Pronto quando
Pronto quando: parecer.
