---
id: R-20261104-232805-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0077
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:28:05-04:00
---
# Entrega: T-0079 aparelho, T-0077 item 6 e acabamento de Pedidos (pronto para lote)

## Contexto
Contexto: tarefa do gerente (T-0079 aparelho, T-0077 item 6, backlog Acabamento)

## O que preciso / o que mudou
Feito (só modules/vendedor): (1) T-0079: domain/base-recriada.ts, etapa com aoTrocarGeracao em app/etapas.ts. (2) Item 6: a rota GET /v1/vendedor/pedidos já aceitava from/to, q, escopo, licença e 403 do promotor; criei o parâmetro por_status=1 (emitido OU mudou de status no período, via updated_at) em contracts/index.ts e api/pedidos.ts; app/lib/consulta-periodo.ts consulta até 5 páginas com sinal fora dos 90 dias, sem sinal mostra Disponível com conexão; orders-screen.tsx ligada. Teste: api/listagem-periodo.test.ts (6, sem banco). Falta um caso de banco para o por_status no CI (pedido.db.test.ts, Docker desligado aqui). (3) Acabamento: Y11 número destacado em mono, G1 nome (primeiro nome) e seta separados, G2 accentTint no ativo, G3 Folha Filtrar por vendedor com linhas de 52 dp e check, chip ativo com 0 no lugar da ordem, Hoje só texto, bordas lineStrong em busca, período, vendedor e grade

## Pronto quando
Testes: vitest do módulo 675 verdes, 93 de banco pulados; eslint e os tsc app, api e web limpos; verificar sem violações | Pendências: caso de banco do por_status e teste de render da tela (nenhum feito); mock-api não conhece por_status (parâmetro opcional, sem efeito); aviso ao Gestão: o seletor virou Folha (testIDs orders-vendedor-* mantidos, orders-vendedor-opcoes agora é o ScrollView dentro da Folha). Sem commit.
