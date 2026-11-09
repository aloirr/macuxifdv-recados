---
id: R-20261101-211348-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0042
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T21:13:48-04:00
---
# Entrega T-0042 (hora fixa do Vendedor) e T-0034 (regra 7 + 16 🟡 de tela)

## Contexto
Contexto

## O que preciso / o que mudou
T-0042: pedido.db.test.ts com relógio único (AGORA do banco no beforeAll, ctx e janela do pull), chave exata da fixture, caso novo de virada do dia (23:59/00:01 Manaus x São Paulo); pull.test.ts:174 com instante fixo; lint sem aviso hora-fixa. T-0034: páginas pedidos/pedido/novo-pedido (app) e pedidos/alcadas (web) com perfis = manifest.perfis, sem promotor; ordem 40; 16 🟡 de tela tratados (detalhe no recado ao engenheiro-apps R-20261101-211304 e na resposta encerrando o R-155135). Regra movida para o domain com teste: totais.ts, quantidade.ts; libs novas: acoes-pedido, validar-rascunho, lista-pedidos (testes). Arquivos: modules/vendedor/{domain,app,web,api/pedido.db.test.ts}.

## Pronto quando
Testes: vendedor 253/253 com Postgres, lint e typecheck verdes; verificar modulo-vendedor sem violação. Pendências: engenheiro-apps vira o it.fails e roda o bundle; varrer-relogio.mjs não concluiu em 170 s com a máquina carregada (lint já sem aviso hora-fixa no vendedor); 🟢 restantes listados no recado ao engenheiro-apps. Premissa: analista/assistente continuam com perfil nas páginas por constar do manifesto. | Pronto quando: revisão do engenheiro-apps e do engenheiro-software.
