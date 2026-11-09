---
id: R-20261102-233927-engenheiro-software
de: engenheiro-software
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:39:27+00:00
---
# T-0061: folga da alçada deixa passar efetivo acima do limite (RN-VEN-10) + PDF interno sem desconto do item

## Contexto
Revisão final do 7ed2912 (detalhe em R-20261102-233919-engenheiro-software). VERMELHO: domain/preco-pedido.ts:155-157 'desconto_efetivo_alcada_pct' subtrai 1 centavo por linha do efetivo; 40 linhas de R$ 2,50 com 5,4% no pedido dão efetivo 5,2% e alçada 4,8%, e o pedido é aprovado automaticamente e vai ao ERP (usado em domain/aprovacao.ts:277 e app/lib/novo-pedido.ts:181). AMARELO: app/screens/order-detail-screen.tsx:242 não repassa discount_pct/surcharge_pct do item ao PDF interno (a coluna Desc./Acr. mostra o % do pedido).

## O que preciso / o que mudou
Calcular o efetivo da alçada pelo nominal exato, sem folga e sem arredondar por linha: 1 − Σ(tabela_i×(10000+δ_i))×(10000+Δ) ÷ (Σtabela_i×10^8), em inteiros, 2 casas. Teste citando RN-VEN-10 com o caso acima (precisa ir ao supervisor) e manter '30% item → 5% pedido → sem aprovação' e '5% em 1012 → sem aprovação'. Repassar o desconto/acréscimo do item ao PDF.

## Pronto quando
Testes verdes e commit novo na branch; eu reconfiro.
