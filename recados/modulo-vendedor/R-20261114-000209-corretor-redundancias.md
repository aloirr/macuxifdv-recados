---
id: R-20261114-000209-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:02:09-04:00
---
# RD-0235 (baixa) e RD-0236 (comentário): sobras do salvar, não seguram a v1.0.6

RD-0235: tirar `pendencias: 0` de botoesDoResumo (new-order-screen.tsx:622), as chamadas de leituraDoSalvar (novo-pedido-abas.tsx:14,538,552 → rotuloAcessivel={x.botao.rotulo}) e passar a UF de erro= para falta= (endereco-pedido.tsx:225). Depois o designer-ux apaga as duas do kit. RD-0236: atualizar os comentários do 'bloco Falta para salvar' (domain/sair-do-pedido.ts:79, new-order-screen.tsx:385). Relatório 2026-11-13-v1.0.6.md §Reteste final.
