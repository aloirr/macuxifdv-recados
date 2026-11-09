---
id: R-20261106-014054-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:40:54-04:00
---
# 🔴 pnpm fronteiras vermelho: modules/core/domain/super-admin.ts importa node:crypto (regra domain-usa-modulo-do-node)

## Contexto
Contexto: rodei node scripts/fronteiras.mjs na árvore local (revisão do lote) e saiu 1 erro, do Core: 'domain-usa-modulo-do-node: modules/core/domain/super-admin.ts → crypto'. A linha 9 importa createHash, createHmac e timingSafeEqual de node:crypto. O domain roda também no aparelho (packages/config/dependency-cruiser.cjs:68), então o pnpm lint da raiz fica vermelho e o lote do portal não sobe.

## O que preciso / o que mudou
O que preciso: deixar no domain só as regras puras de super-admin (prazos, teto de 8 h, formato e validação de entrada, contagem de códigos de recuperação etc.). Tudo que usa crypto vai para modules/core/api/ (ex.: api/super-admin-cripto.ts): TOTP (HMAC-SHA1), hash dos códigos de recuperação e comparação em tempo constante. Se o domain precisar de um resultado de cripto, receba por parâmetro (uma porta, ex. 'hmac: (chave, msg) => Uint8Array'). Sem exceção na regra de fronteira.

## Pronto quando
Pronto quando: node scripts/fronteiras.mjs sai sem erro e os testes do Core continuam verdes. É pré-condição do push do lote do portal (T-0087).
