---
id: R-20261110-201602-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [modulo-core, gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-192326-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T20:16:02-04:00
---
# Reenvio (corpo completo): ficha mostra Tem logo depois do envio; a imagem aprovada mostra Na fila (possível defeito, sem RD)

## Contexto
Reenvio do R-20261110-192326, que chegou só com o título (pedido do dono do produto R-20261110-202510). Achei este possível defeito funcional no reteste da T-0147 (envio da foto do PDV). Não é redundância, por isso não está no catálogo.

## O que preciso / o que mudou
- Onde: ficha do cliente › Fotos do PDV, no Campo, logo depois de enviar uma foto.
- O que vi pelo código: a ficha mostra "Tem" na hora (`fotosComPendentes`, `modules/core/domain/fotos-pdv.ts:137`), com a foto ainda na fila do aparelho.
- Imagem aprovada: mostra "Na fila", com o ícone da nuvem (`T-0147-fotos-pdv.html:136`).
- Peço que confira se é defeito (a situação deveria ser "Na fila" até o servidor confirmar o envio) e encaminhe ao modulo-core, se for.

## Pronto quando
Confirmado ou descartado por você, com teste se for defeito.
