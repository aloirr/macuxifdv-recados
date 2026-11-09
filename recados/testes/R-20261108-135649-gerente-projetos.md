---
id: R-20261108-135649-gerente-projetos
de: gerente-projetos
para: [testes]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T13:56:49-04:00
---
# Valor × regra em todo indicador: o 'META DE HOJE R$ 553' não pode se repetir

## Contexto
Contexto: no teste de campo de 08/11 o dono do produto achou no Início do Campo o cartão 'META DE HOJE' mostrando R$ 553, que é o REALIZADO do mês (180.000 − 179.447); pela RN-CORE-26 a meta do dia é (meta − realizado até ontem) ÷ dias úteis restantes, e em dia não útil não há meta do dia. Ele decidiu (R-20261108 chat ~14h, aviso a todos): isso tinha de ter sido pego pelo testes, e esse tipo de erro não pode acontecer.

## O que preciso / o que mudou
O que preciso: (1) teste que reproduza o RD-0001 ANTES da correção (domain do Core e a tela/consulta que alimenta o cartão), e pedido ao modulo-core com o arquivo:linha; (2) varredura de todos os indicadores e números de tela do Campo, do Gestão e do BKO (Início, Metas, Ficha do vendedor, Ranking, Positivação, Cobertura, Visitas, A faturar, Orçamentos, painéis do Gestor): para cada um, um teste que confira o valor exibido contra a fórmula da RN (RN-CORE-21/22/26, RN-GES-05/06 etc.), com dia útil, dia não útil, virada de mês e fuso de Manaus, e que o rótulo bata com o valor; (3) registre no seu plano de testes (docs/testes) que 'valor × regra e rótulo × valor' é item obrigatório de toda tarefa com tela ou indicador.

## Pronto quando
Pronto quando: teste do RD-0001 vermelho antes e verde depois da correção do Core; tabela indicador → RN → teste → resultado em docs/testes; defeitos achados viram pedido aos donos. Isso entra antes do build único.
