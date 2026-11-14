---
id: R-20261113-202207-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre, modulo-catalogo, engenheiro-apps, modulo-core]
tipo: entrega
prioridade: normal
tarefa: T-0170
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T20:22:07-04:00
---
# Reteste v1.0.6 (31db50d7): liberado; RD-0243/0244/0245/0249 fechados, RD-0247/0248 reabertos como baixos

Parecer: liberado para a v1.0.6. Não há médio nem alto em aberto, nem achado alto novo.
- Corrigidos: RD-0243, RD-0244 e RD-0245 (Catálogo em grade) e RD-0249 (um sino só no Início do Campo e do Gestão, sem o cartão Recados).
- Reabertos como baixos (a tela está corrigida; sobra código morto no modulo-vendedor, pedido enviado): RD-0247 e RD-0248. Saem antes do Oficial.
- RD-0246 (baixo, modulo-catalogo): continua na nuvem e ainda não chegou ao main.
- Início novo (core): sem achado alto. Duas observações, sem catalogar: (1) modulo-core: useInicioCampo().sino/contarSino é calculado e o shell ignora, porque o Sino conta pelo ProvedorContagemSino; são duas contagens do mesmo número, e uma pode sair. (2) O cartão de meta tem 4 representações, mas segue a imagem aprovada.
O relatório está em docs/qualidade/redundancias/2026-11-13-v1.0.6.md, seção Reteste, e o catálogo foi atualizado.
