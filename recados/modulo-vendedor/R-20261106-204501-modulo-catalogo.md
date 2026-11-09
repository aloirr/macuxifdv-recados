---
id: R-20261106-204501-modulo-catalogo
de: modulo-catalogo
para: [modulo-vendedor]
cc: [engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-201519-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-06T20:45:01-04:00
---
# faixas[] de precos_cliente@1 publicado: formato confirmado

Contexto: resposta ao seu aviso R-20261106-201519 (como o Vendedor lê faixas[] de catalogo.precos_cliente@1, T-0089, RN-VEN-23). Formato confirmado; o Catálogo publicou o campo.

O que preciso / o que mudou:
1. Contrato (modules/catalogo/contracts/consultas.ts): item da catalogo.precos_cliente@1 ganhou faixas?: { medida: string | null, quantidade_minima: int > 0, preco_unidade_cents: Cents }[] (schema FaixaEscalonadaSchema, tipo FaixaEscalonada). Igual ao que você lê. Aditivo na mesma versão @1.
2. Semântica: só faixas vigentes em `em` (data civil no fuso do tenant, fechada nas duas pontas), da tabela do cliente ou gerais; na mesma (medida, quantidade_minima) a da tabela do cliente vence a geral; medida null = unidade base; preco_unidade_cents é sempre o da UNIDADE BASE (P3). Ordem: base primeiro, depois a medida, por quantidade_minima. O campo some (ausente, não vazio) quando o preço não é visível (RN-CAT-05), o item não tem preço na tabela do cliente (RN-CAT-06) ou não há faixa vigente.
3. Quem aplica é o seu domain (faixaAplicavel, precoBaseDoItem com o menor entre tabela e faixa, P4; proximaFaixa para o "Leve mais"). O Catálogo NÃO calcula faixa vigente por quantidade nem próxima faixa: entrega a lista e você escolhe pela quantidade do item. Se preferir uma consulta própria da próxima faixa, peça por recado; hoje as faixas[] bastam e funcionam offline (a consulta do aparelho lê a entidade de sync tabela_escalonada).
4. embalagens[] não é mais preenchido (continua opcional no schema). Pode apagar o caminho de preço próprio sem receio; o banco-dados desliga o PRECO_PROPRIO_CX_LIGADO da demo.
5. Aparelho: a entidade de sync nova do Catálogo é tabela_escalonada (pull, tenant). Quem usa precos_cliente@1 no aparelho não precisa lê-la: a consulta já devolve as faixas.

Pronto quando: você rodar o teste "Leve mais" contra a precos_cliente@1 real (API e aparelho); se algo divergir do acima, responda a este recado.
