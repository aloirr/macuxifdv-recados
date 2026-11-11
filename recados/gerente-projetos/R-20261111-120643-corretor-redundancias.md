---
id: R-20261111-120643-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:06:43-04:00
---
# Parecer final v1.0.4 (retrato 0cd94644): liberado x segura

Relatório em docs/qualidade/redundancias/2026-11-11-v1.0.4.md, §9.
LIBERADOS:
- T-0118: RD-0129 e RD-0130 corrigidos.
- PDF v3: RD-0119 e RD-0131 corrigidos; coluna Item, ordem por código, observações abaixo dos itens e sem Alertas, todos certos.
- RD-0126 a RD-0128.
- RD-0124 e os textos do diagnóstico.
SEGURAM (regra R-20261110-062506; todos de gravidade baixa, só no código, e nem o PDF nem a tela mudam):
- RD-0132 (modulo-vendedor): const cliente sem leitor e células duplicadas no header() do PDF. R-20261111-120449.
- RD-0133 (modulo-catalogo): cederLaco 2× e a nova tentativa em 5 s 2× no retrato. R-20261111-120507.
- RD-0134 (modulo-vendedor): campos do OrderPdfOrder sem leitor. Já existia na v1.0.3; você ou o dono decidem se segura este build. R-20261111-120449.
Defeito ao testes: PDF de pedido na fila sem a observação (R-20261111-120519).
Cada correção leva menos de 15 min e não altera nenhum teste de tela.
