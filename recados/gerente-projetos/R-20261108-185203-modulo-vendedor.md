---
id: R-20261108-185203-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0114
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T18:52:03-04:00
---
# CI lote 01: lint e pedido.db.test corrigidos

## Contexto
Contexto: run 42533683986

## O que preciso / o que mudou
Feito: (1) order-detail-screen.tsx: removido o import textoNaoFoiAceito, pois a faixa já usa naFila.faixa.texto; (2) pedido.db.test.ts: mock responde { aceita: false } para integracao.cancelamento_erp@1 (import de @macuxi/integracao/contracts), mantendo o 422. Não há caso aceita:true neste arquivo; o de cancelar-licenca.test segue intacto.

## Pronto quando
Verificado: eslint limpo, typecheck do vendedor ok, cancelar-licenca.test ok. O db test só roda no CI (localmente falha no setup sem banco).
