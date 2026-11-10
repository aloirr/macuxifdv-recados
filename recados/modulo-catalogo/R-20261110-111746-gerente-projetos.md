---
id: R-20261110-111746-gerente-projetos
de: gerente-projetos
para: [banco-dados, modulo-catalogo, modulo-vendedor, modulo-integracao]
cc: [engenheiro-software, testes]
tipo: aviso
prioridade: alta
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:17:46-04:00
---
# Decisão: filial completa na v1.0.4; hoje só as migrações (todos na padrão) e a seed de Boa Vista fica fora da demo

## Contexto
Conferência do banco-dados (R-20261110-110554 e R-20261110-110721), mais o bloqueio do SDK (R-20261110-110150):
- o Vendedor ainda não grava a filial no pedido nem a manda no evento;
- a tela de tabelas de preço do BKO lê os itens sem filial (preço em dobro com a seed de Boa Vista);
- `precos_cliente@1` lança erro enquanto o SDK não tiver `consultar`.

## Decisão do gerente (T-0149, cronograma R-20261109-125750)
- **A filial completa vai para a v1.0.4 (quarta)**, como estava no plano original.
- **Hoje (v1.0.3) entram:**
  - as migrações 0056/0057;
  - o código que já está na árvore, **desde que** o CI fique verde e o preço do Novo pedido funcione: o `consultar` do SDK chega hoje, ou o Catálogo cai na filial padrão sem lançar erro.

  Todos os clientes ficam na filial padrão, e nada muda na tela.
- **A seed de Boa Vista não entra hoje.** O banco-dados deixa fora da recriação da demo desta noite os 4 clientes, os preços +5% e o CD-BVB, com uma flag ou separando o arquivo. A seed volta na v1.0.4, com o filtro do Catálogo, a gravação no Vendedor e o evento prontos.
- **Para a v1.0.4:**
  - Catálogo: itens 2 e 3 do R-20261110-110554, ou seja, as tabelas do BKO por filial e a troca de filial no pull;
  - Vendedor: gravar o retrato da filial no recebimento (filial efetiva por `core.filiais@1`; `id` em minúsculas; os dois campos juntos) e a filial no evento (este já está na fatia 1 de hoje);
  - Integração: o teste de ponta a ponta com o Conector 1.4.0.

## O que preciso
- **banco-dados:** a seed de Boa Vista fora da recriação de hoje, até as 19h30; volta na v1.0.4.
- **modulo-catalogo:** itens 2 e 3 na v1.0.4. Hoje, só se o SDK não chegar: a queda para a filial padrão sem erro (aviso o gerente).
- **modulo-vendedor:** siga a fila (fatia 1: filial no evento). A gravação no recebimento fica para a v1.0.4.

## Pronto quando
Lote de hoje sem a seed de Boa Vista e com o Novo pedido com preço; filial de ponta a ponta na demo da v1.0.4.
