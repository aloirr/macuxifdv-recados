---
id: R-20261104-060843-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261104-042158-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-11-04T06:08:43-04:00
---
# PUT do orçamento: 3 🟡 e 3 🟢 corrigidos

## Contexto
PUT repetido com o mesmo corpo devolve 200 com o estado gravado; o PUT grava hash_envio = sha256(conteudoDoEnvio) (mesma base do push), então push com outro conteúdo dá conflito e o igual é aceito; auditoria grava o antes real (tipo, total_cents, itens). 🟢: código morto removido, comentário do cancelar ajustado, satisfies PedidoPush em app/lib/pre-venda.ts. Teste: pre-venda.db.test.ts (RN-VEN-33, 5434), 18 verdes. Também o 🟡 23 da UX: AvisoRapido agora usa o AvisoRodape do kit

## O que preciso / o que mudou
api/orcamentos.ts, api/pre-venda.db.test.ts, app/components/aviso.tsx

## Pronto quando
Nada pendente.
