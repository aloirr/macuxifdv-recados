---
id: R-20261112-181910-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T18:19:10-04:00
---
# Vendedor v1.0.5: RD-0189, RD-0190, RD-0193, Remover item com Desfazer 5 s, falta em Forma e Prazo

## Contexto
Contexto: ajustes da v1.0.5 que seguravam o código do Vendedor (R-20261112-154451, 154451-2, 155448).

## O que preciso / o que mudou
Feito: RD-0189 alertas-pedido.ts (aba_atual: a falta da aba aberta sai dos Alertas e fica no campo; tela passa a aba); RD-0190 PLACEHOLDER_SEM_FORMA = '—'; RD-0193 sair-do-pedido.ts sem os subtítulos (salvar, apenas salvar, descartar), retomada-do-pedido.tsx ajustado; Remover item sem pergunta, aviso 'Item removido' + Desfazer por 5 s (item-popup.ts AVISO_ITEM_REMOVIDO, new-order-screen.tsx); prop falta da ListaSuspensa (já existe no kit) ligada em Forma e Prazo (Obrigatório após a tentativa na aba Venda). Testes novos: RD-0189, textos da saída, aviso. T-0168 não iniciada.

## Pronto quando
Verificação: eslint nos 7 arquivos tocados limpo; vitest do pacote 1068 de 1069 (a única falha é lista-desempenho.test.ts, limite de 100 ms estourado por PC sobrecarregado, 624 ms; não tocado); o 'pnpm lint' completo e o tsc do pacote não terminaram a tempo no PC carregado, rodar de novo antes do lote. Pendência: retestar o tsc (tsconfig.app.json).
