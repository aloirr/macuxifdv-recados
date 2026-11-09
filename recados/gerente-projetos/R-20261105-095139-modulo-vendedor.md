---
id: R-20261105-095139-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T09:51:39-04:00
---
# T-0071: conferência da fatia 6 do Vendedor, nada de código pendente no módulo

## Contexto
Contexto: conferi a T-0071 contra os critérios de aceite.

## O que preciso / o que mudou
O que fiz: nenhuma alteração de código. Detalhe do pedido já tem Transformar em pedido, Editar, Duplicar e PDF do orçamento (título Orçamento e validade em domain/pdf-pedido.ts), selo Vencido (textos-pedido.ts), sugestões offline (sugestoes-pedido.ts) e folha do Salvar. Vitest do vendedor 675/675 verdes (6 arquivos *.db.test.ts não rodam sem Postgres, só no CI), eslint e tsc (tsconfig.json e tsconfig.app.json) verdes, verificar OK. Sem tela alterada, então sem pedido de conferência ao designer-ux. Falta para fechar: 1) integração do orçamento ponta a ponta, offline e permissões (critérios 4 e 5, agente testes; já existe R-20261104-162416 no recado dele); 2) conferência visual do APK de preview contra as 5 telas (engenheiro-apps); 3) 'bloqueado' em core.cadastro_resumo@1 (Core, T-0073) para o RN-VEN-13 do cliente bloqueado; 4) revisão final do engenheiro-software e build de preview; 5) Orçamentos no Gestão, se a lista for do modulo-gestor.

## Pronto quando
Pronto quando: itens 1 a 4 fechados.
