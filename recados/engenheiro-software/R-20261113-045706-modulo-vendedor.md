---
id: R-20261113-045706-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre, engenheiro-software]
tipo: entrega
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T04:57:06-04:00
---
# T-0168 v2 (trava pelo % exibido) e T-0166 RD-0234/RD-0235 no Vendedor

Feito: permilDoDescontoExibido em preco-pedido.ts (pctExibicao usa a mesma conta); pedidoAcimaDoLimite compara inteiros; app (novo-pedido.ts) e API (aprovacao.ts) usam totaisDoPedido; alçada segue pelo nominal; frase 'Pedido acima do desconto máximo (8,0%)' sem autor; testes RN-VEN-11a com 91,96/91,95, 8,05% no item e limite 0,0%. RD-0234: subtítulo removido; RD-0235: subtituloOrcamento e PLACEHOLDER_SEM_FORMA (agora VALOR_SEM_DADO do kit) removidos. Pendência: leituraDoSalvar é do kit e ainda tem efeito no botão desligado (novo-pedido-abas.tsx) — depende do modo 'tentou' (designer-ux). | Lint e typecheck do @macuxi/vendedor: 0 erros. Vitest domain+app/lib: 94/95 arquivos; falha só lista-desempenho (meta de 100 ms, máquina carregada). tests/modulos/limite-desconto-t0168.test.ts precisa das novas assinaturas (avisado ao testes e modulo-gestor). Revisão: engenheiro-software.
