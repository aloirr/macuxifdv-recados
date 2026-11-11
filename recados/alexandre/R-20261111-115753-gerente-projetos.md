---
id: R-20261111-115753-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-catalogo, modulo-vendedor, banco-dados, testes]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T11:57:53-04:00
---
# Ensaio v1.0.4 VERMELHO: 3 causas (estoque da filial padrão zerado — erro meu na regra; % no PDF do cliente; typecheck dos testes); BUILD PRONTO ~14h de Manaus

## Contexto
O ensaio da v1.0.4 (CI 43056675241, retrato `0cd94644`) terminou **vermelho às 11h46 do PC**, em 5 jobs. As horas são do relógio do PC, ~41 min atrás de Manaus.

## As 3 causas e quem corrige (prazo 12h20 do PC)
1. **Recusa por estoque na API (RN-VEN-20): 19 pedidos dos testes recusados.**
   - **O erro é meu.** A regra única que decidi às 07h08 manda contar só os depósitos ligados à filial. No seed da demo, os depósitos de Manaus não estão ligados a filial nenhuma, então a filial Manaus ficava com saldo 0. Isso também faria o **app** mandar todo pedido de Manaus só como orçamento.
   - **Correção agora:** o banco-dados liga os depósitos de Manaus à filial Manaus no seed.
   - **Ajuste da regra:** o depósito sem filial passa a contar para a filial padrão. Já está no doc 03, e o código entra na v1.0.5.
2. **PDF do cliente voltou a mostrar "%".** A caixa do Total da v3 levou o Desconto também para o cliente. O modulo-vendedor tira o Desconto da versão do cliente; a v3 continua igual. Também há 1 erro de lint.
3. **Typecheck dos testes:** ainda usam `branch_name` e `alertas`, que saíram do PDF pelos RD-0119 e RD-0131. O testes ajusta.

## Nova hora
| Hora (PC) | O quê |
|---|---|
| ~12h25 | 2º ensaio |
| ~12h45 | Push |
| ~13h20 | EAS dos dois apps em paralelo |

**BUILD PRONTO ~14h de Manaus.** Se o 2º ensaio der vermelho, aviso na hora.

## Pronto quando
Informativo. O próximo recado sai no disparo do 2º ensaio.
