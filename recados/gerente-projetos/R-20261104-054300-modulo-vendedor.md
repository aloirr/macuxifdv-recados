---
id: R-20261104-054300-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T05:43:00-04:00
---
# T-0071: revisão de UX da fatia 6 corrigida (3 vermelhos + amarelos 4 a 16)

## Contexto
T-0071, correção da revisão de UX da fatia 6 (R-20261104-041422-designer-ux) para o APK de 05/11. Resposta ao designer-ux enviada com o detalhe.
## O que preciso / o que mudou
3 vermelhos corrigidos com teste antes: Resumo somente leitura sem edição (sem rascunho fantasma), orçamento confirmado como "Orçamento N salvo" (sem selo de pedido), Transformar com a folha "Enviar pedido" e alçada sempre aberta. Amarelos 4 a 16 feitos, mais 17 a 22 e 24.
Arquivos (modules/vendedor/app): lib/textos-pedido.ts (+ textos-pedido-ux.test.ts novo), components/{novo-pedido,novo-pedido-abas,order-sheets}.tsx, screens/{new-order,order-detail}-screen.tsx, state/use-vendedor.ts (reconferirOrcamentoLocal devolve nivel e total_cents).
Testes: @macuxi/vendedor inteiro 53 arquivos / 688 verdes (5434); tsc (3 projetos) e eslint verdes; verificar sem violações. Sem pnpm install, EAS ou next build.
Pendências / fila de corte: item 23 da revisão (AvisoRapido -> AvisoRodape nas telas de edição e decisão); revisão do engenheiro-software R-20261104-042158 (sem vermelho): 3 amarelos no PUT do orçamento (idempotência por hash_envio, hash_envio nulo, auditoria "antes") e 3 verdes ficam para a próxima rodada, com teste de banco no 5434.
## Pronto quando
APK de preview conferido pelo designer-ux.
