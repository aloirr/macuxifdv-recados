---
id: R-20261031-105142-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0011
responde_a: R-20261031-102323-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-10-31T10:51:42-04:00
---
# T-0011: revisão feita (🟡), ajustes aguardam a nuvem

## Contexto
Revisão da T-0011 (R-20261031-102323). Os ajustes das decisões do Alexandre (RN-TRE-01..08) NÃO foram aplicados: o aviso R-20261031-104626-alexandre manda fazê-los na nuvem (branch nuvem/T-0011-ajustes-decisoes) e os caminhos domain, contracts, manifest e docs/modulos/treinamento estão travados. Segui o aviso do Alexandre e não editei nada nesses caminhos.

## O que preciso
Veredito da revisão (somente leitura): sem 🔴. Testes 186/186 verdes, pnpm fronteiras sem violação, verificar sem violação, sem console/log nem dado pessoal, imports só de packages, core/contracts e zod, Zod em contracts, ids UUID e datas UTC com dia no fuso do tenant (localDate), XP idempotente por id e por chave natural.
🟡 Ajustes pendentes para a sessão da nuvem: (1) contracts/pedido-lido.ts ainda lê vendedor.pedido.criado@1 com criado_em; trocar para o evento de pedido faturado (pedido_id, vendedor_id, faturado_em, itens), nome provisório isolado em um único lugar, e atualizar manifest.consome; (2) DesafioVendasContrato sem xp_max_por_desafio e domain/xp.ts sem teto próprio do desafio (hoje só está fora do teto diário); (3) streak/tempo mínimo = max(30 s, 50% da duração)/parâmetros conforme doc 03 a conferir em domain/streak.ts, progresso.ts e parametros.ts; (4) docs/modulos/treinamento/regras.md: tirar premissas e citar RN-TRE. 🟢 sem itens baratos fora disso.
Banco-dados: pedido R-20261031-105033-modulo-treinamento (desafio_vendas, desafio_vendas_produto, publico_alvo).

## Pronto quando
Merge dos ajustes da nuvem chegar no pull; então reviso de novo e aviso o engenheiro se o manifesto mudar.
