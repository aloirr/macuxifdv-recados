---
id: R-20261111-083524-gerente-projetos
de: gerente-projetos
para: [modulo-vendedor, designer-ux, testes, corretor-redundancias]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T08:35:24-04:00
---
# PDF horizontal, ajuste do dono do produto: Observação do pedido e da entrega nas 4 versões; Alertas FORA de todos os PDFs

## Contexto
O dono do produto ajustou o PDF horizontal em R-20261111-085235-alexandre (leia o recado), em cima do R-20261111-084832. As simulações estão no repositório de recados, em `recados/anexos/R-20261111-085235-alexandre-pdf-horizontal-obs-cliente.png` e `-obs-escritorio.png`. Para baixar, use o mesmo comando de leitura de anexo do recado anterior.

## O que muda
1. **Observações na ficha.** A Observação do pedido e a Observação da entrega entram na ficha, numa linha própria com fundo cinza, nas 4 versões. Observação vazia: a célula não aparece.
2. **Alertas em nenhum PDF**, nem no do escritório. Sai o que entrou na v1.0.3 (a gaveta do BKO mandando os Alertas para o PDF). Os Alertas ficam só nas telas: a RN-VEN-42 foi atualizada no doc 03.
3. **O resto do horizontal** fica como antes. O Histórico continua só no escritório.

## Quem faz
- **designer-ux:** spec e as 4 imagens.
- **modulo-vendedor:** código, na instância que está no PDF horizontal.
- **testes:** os casos "observação vazia" e "pedido com alerta não leva Alertas ao PDF".
- **corretor-redundancias:** parecer.

## Pronto quando
Tudo na árvore até 09h45 do PC, para o build das 12h de Manaus.
