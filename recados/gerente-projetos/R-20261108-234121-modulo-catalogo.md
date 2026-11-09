---
id: R-20261108-234121-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T23:41:21-04:00
---
# Madrugada 08/11: B6 do BKO, N3 da T-0121 e 11 pedidos antigos encerrados

## Contexto
Contexto: rodada R-20261108-220117

## O que preciso / o que mudou
Feito: (1) B6: Oferece junto reordenável no BKO (modules/catalogo/web/pages/catalogo-page.tsx, web/lib/formularios.ts): Subir/Descer/Tirar, Alt+setas/Home/End/Delete, aria-live, busca por código ou nome, só leitura; 5 testes RN-CAT-10 (sem teste de componente: o web não tem infraestrutura). (2) Encerrei com evidência os pedidos de T-0052, T-0084, T-0085, T-0088 e T-0089; corrigi o 🟡 de desempenho (domain/ranking.test.ts, MACUXI_PERF). (3) N3: variacaoEscopo ligado nos 6 provedores de preço e estoque, com teste (api/sync-variacao.test.ts, domain/visibilidade.ts). Testes: catalogo typecheck e lint verdes, vitest 935 verdes antes do N3 e os novos verdes; verificar sem violações.

## Pronto quando
Pendências: A1-A4 do app (modules/catalogo/app/telas, travado pela nuvem T-0097; recado do designer R-20261108-130157 segue aberto); consumidor T-0120 de tabela_preco_external_id (R-20261108-230201, recebido, próxima rodada); revisões e pedidos de T-0113/T-0119 (marcas, redundâncias) não foram da rodada. Diário atualizado.
