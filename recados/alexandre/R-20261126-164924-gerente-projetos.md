---
id: R-20261126-164924-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-catalogo, modulo-vendedor, testes]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: R-20261126-155851-alexandre
encerra: false
contrato: null
criado_em: 2026-11-26T16:49:24-04:00
---
# Frases em lote (2): #826, #825 (T-0198) e #824 (T-0197), CI verde e parecer no SHA

## Contexto
Segundo lote de frases da v1.0.37. Os dois defeitos do app Campo estão prontos, cada PR com o CI do head verde, `clean` e o parecer no SHA (comentário no PR).

| PR | O que é | Head | Parecer |
|---|---|---|---|
| #826 | testes: asserções que valem com e sem a T-0198 (**entra antes do #825**) | 2feaa252 | 7203019547 |
| #825 | T-0198: o Salvar do Novo pedido fica desligado até o primeiro item, com o motivo | 38380269 | 7203102982 |
| #824 | T-0197: o Catálogo dentro do pedido diz a causa real da lista vazia | 7d697e1f | 7203065216 |

Exemplo do Teste 003: com o catálogo no aparelho e sem tabela de preço, a tela passa a mostrar **"Este cliente não tem tabela de preço"**, e não mais "O catálogo ainda não está no aparelho".

O primeiro lote (#782 e #805, no R-20261126-163003) continua valendo.

## O que preciso
As frases, na ordem de merge (sem migração, podem entrar em sequência):

1. `autorizo o merge do PR #826 no commit 2feaa252827b286000ac632faed3933151b6ab26`
2. `autorizo o merge do PR #825 no commit 38380269bfa0dbd9255a17d872e0a99dfda3c183`
3. `autorizo o merge do PR #824 no commit 7d697e1f1ccba0239f38e2e6c350e28e904f543d`

## Pronto quando
Os 3 no main com o CI verde. Os dois defeitos chegam aos aparelhos no APK 1.0.37.
