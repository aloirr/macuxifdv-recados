---
id: R-20261106-202434-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T20:24:34-04:00
---
# Revisão técnica do kit U1/T-0090: sem 🔴; 🟡 Segmentado compacto estica para 44 dp (flex: 1 no visual)

## Contexto
Revisão técnica do kit da T-0089 U1 e da T-0090 em packages/ui/src/mobile, pelo diff local: suspensa.tsx, filtro.tsx, periodo.ts, selecao.ts, cartoes-pedido.tsx, formulario.tsx (Segmentado e Passo compactos), navegacao.tsx e icon.tsx. Sem 🔴. vitest do @macuxi/ui: 157/157.
- Nenhum componente leva regra de negócio. A ListaSuspensa recebe `desabilitada` e `motivo` do módulo. O CartaoCredito e o CartaoLeveMais recebem valores já formatados e textos de `textosLeveMais` e `textoInadimplencia`. Na FolhaPeriodo, o módulo diz o que cada atalho vale. O "hoje" chega por parâmetro (sem relógio no kit). O `passoComTexto` só lê o texto em edição. Está tudo certo.
- A API do Segmentado e do Passo não mudou (as props novas são opcionais). Nenhuma tela quebra na compilação.

## O que preciso
🟡 1. formulario.tsx:124-131 e estilos :500-501: no compacto, o `Pressable` (`s.segAlvoCompacto`, coluna de 44 dp) envolve um `View` com `s.segItem` + `s.segItemCompacto`. O `s.segItem` tem `flex: 1`. No Yoga do RN, `flex: 1` vira `flexBasis: 0` e `flexGrow: 1` no eixo principal, que dentro do Pressable é a coluna. Com isso o `height: 30` é ignorado e o visual estica até 44 dp: o Segmentado compacto fica MAIS ALTO que antes (36), não mais baixo (30). Correção: `flex: 0` (ou `flexGrow: 0, flexBasis: 'auto'`) no `segItemCompacto`. A largura continua cheia pelo `alignItems: 'stretch'` do pai. Confira no aparelho, ou no inspetor de layout, nas 3 telas abaixo.
🟡 2. Impacto nas telas atuais (todas do modulo-vendedor; avise o dono, porque a linha muda de altura):
   - modules/vendedor/app/components/novo-pedido-itens.tsx:207 (medida UN|CX, `width: max(94, 47×n)`): com 2 medidas cabe (2×44+6 = 94). Com 3 medidas são 3×44+12 = 144 > 141, então transborda 3 dp. Antes eram 156 e já transbordava, então melhorou, mas ainda transborda. Sugestão: a largura vir do kit (ex.: exportar `larguraSegmentadoCompacto(n)`), para a tela não repetir a conta.
   - novo-pedido-abas.tsx:435 e :447 (tipo e modo do ajuste do pedido, `flex: 1`): a altura de layout passa de 36 para 44 dp, porque o alvo agora entra no layout e não é mais hitSlop. A linha do cartão cresce 8 dp. Está certo para o alvo, mas não é "mais baixo": acerte o texto da spec, se ela disser isso.
🟢 3. selecao.ts:188-189, `CONSEQUENCIA_VENCIDO` ("Só à vista ou com aprovação."): o texto descreve a consequência da RN-VEN-13, que é do Vendedor. Se a regra mudar, o kit fica com o texto velho. Como `consequencia` já é prop, prefira que o texto aprovado more no módulo, ou deixe claro no comentário que o módulo decide se o passa.

## Pronto quando
O 🟡 1 está corrigido e conferido no aparelho, e o 🟡 2 foi avisado ao modulo-vendedor (ou a largura sai do kit).
