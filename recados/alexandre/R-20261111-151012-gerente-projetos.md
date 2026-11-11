---
id: R-20261111-151012-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T15:10:12-04:00
---
# v1.0.4 pronta para push (CI verde) mas RD-0135 baixo segura pela sua regra: corrijo (~17h Manaus) ou push já com exceção (~16h30)?

## Contexto
A v1.0.4 está pronta para o push: o lote fechado e verificado é o `ef38981b`.
- **Ensaio de confirmação verde:** CI 43087892927.
- **Stack isolado:** verde no 2º ensaio, com o mesmo código de produção.
- **Lote:** 9 commits por dono. O `verificar` e o trailer passaram sem violação.

O corretor fechou os RD-0132, 0133 e 0134, mas achou o **RD-0135**, de gravidade baixa, só no código e sem mudar tela nem PDF. São três pontos:
- o tipo de entrada do PDF (`DetalheParaPdf`) ainda exige 7 campos que o PDF não usa mais;
- um comentário de cabeçalho está desatualizado;
- um teste só confere a própria fixture.

A sua regra diz que nenhum achado aberto, de qualquer gravidade, pode ficar para trás. Por isso **não fiz o push**.

## Correção do lote (informativo)
O 1º lote montado reverteria 3 arquivos de governança: as mudanças do patch de diagnóstico em `demo-publicar` e `producao-publicar` e os testes do token. Isso aconteceu porque a minha árvore local não tinha esses patches. Peguei o problema antes do push, e o lote `ef38981b` mantém os 3 arquivos iguais aos do main. A partir de agora, o retrato do ensaio já sai com a governança do main.

## Escolha uma
1. **Padrão, se você não responder até 15h30 do PC:** o Vendedor corrige o RD-0135 até 15h25 (já está rodando). Depois vêm o typecheck no PC, o ensaio, o reteste e o push. **BUILD PRONTO por volta das 17h de Manaus.**
2. **Push agora**, com o RD-0135 para a v1.0.5. Você abre exceção à regra só para este achado baixo de código. **BUILD PRONTO por volta das 16h30 de Manaus.**

## Pronto quando
Sua escolha. Sem resposta, sigo a opção 1.
