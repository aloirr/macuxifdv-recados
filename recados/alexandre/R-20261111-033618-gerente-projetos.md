---
id: R-20261111-033618-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:36:18-04:00
---
# Ensaio final VERMELHO (7 jobs): 6 agentes corrigindo até 04h05 PC; 3º ensaio só p/ confirmar; BUILD PRONTO ~06h15 Manaus

## Contexto
O CI do ensaio final (run 42983139689, retrato `aee5213c`) terminou **vermelho** às 03h24 do PC: 7 jobs. O stack isolado (42983184941) ficou **verde**. Horas no relógio do PC (~41 min atrás de Manaus).

## O que quebrou e quem corrige (6 agentes, desde ~03h35, prazo 04h05)
- **engenheiro-apps:** typecheck do diagnóstico no app, em `historico-telas.ts`, `plataforma.tsx:994` e no teste do envio. São os 3 vermelhos do pré-ensaio que ainda não estavam fechados.
- **modulo-vendedor:**
  - erro `find` em `receber.ts:134`, que derruba 14 testes do preço congelado e do pedido em nome, provavelmente por causa da reserva por filial. A correção é no código, com fallback para o comportamento anterior;
  - o "Endereço de entrega" no PDF novo.
- **testes:**
  - o teste do PDF T-0159, que ainda usa o `nome` antigo da filial;
  - o lint;
  - os testes da demo que viram 2 preços do Café na tabela do Mini Box, efeito do preço por filial da Boa Vista;
  - o PDF sem "Medida" (a spec nova usa Emb./Qtd).
- **engenheiro-software:** o teste das consultas aninhadas (`core.filiais@1` dentro do Catálogo).
- **banco-dados:** 2 testes de banco do diagnóstico (0058), entre eles a política nova do worker.
- **modulo-catalogo:** um import não usado (lint).

## Decisão do gerente, que você pode mudar
- **Um 3º ensaio**, por volta das 04h10 do PC, só para confirmar o verde antes do push. Você limitou a 2 ensaios por lote para economizar o Actions, mas push vermelho no main é regra inegociável, e sem o ensaio o push seria às cegas. Este CI levou ~9 min. Se preferir que eu não rode o 3º ensaio, diga, e o push espera o seu "ok".
- **Nova hora do BUILD PRONTO: ~06h15 de Manaus** (≈05h35 do PC). A conta: correções 04h05, ensaio até ~04h25, lote e push ~04h40, demo, base e fotos ~05h00, EAS ~05h35. O atraso aproximado é de 1h15.

## Pronto quando
Informativo. O próximo recado sai no disparo do 3º ensaio.
