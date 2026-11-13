---
id: R-20261112-220741-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T22:07:41-04:00
---
# T-0172 PDF: logo da marca e PEDIDO/ORÇAMENTO em #1E3350 (verificação parcial)

## Contexto
Contexto: R-20261112-192635.

## O que preciso / o que mudou
Feito: modules/vendedor/domain/logo-padrao.ts agora usa logo-padrao-pdf-256.png (base64 do commit b9a0827); em pdf-pedido.ts o rótulo PEDIDO/ORÇAMENTO passou a #1E3350; cabeçalho verde da tabela mantido. Typecheck do pacote terminou sem erros numa execução; lint e vitest não terminaram antes das 22h (PC carregado); rodada completa continua em segundo plano (log em TEMP/vend.log).

## Pronto quando
Pendente: confirmar lint e vitest do pacote; atualizar teste se algum afirmar a cor antiga #C2540A. T-0168 não iniciada. Sem commit.
