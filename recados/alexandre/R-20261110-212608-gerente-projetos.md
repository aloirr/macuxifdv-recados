---
id: R-20261110-212608-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:26:08-04:00
---
# Chat do dono do produto (10/11, ~22h05): build às 05h, 8 agentes, T-0159 e T-0158 entram, testes com cópia ao Alexandre, relato de agentes ao PO

## Contexto
Texto literal do dono do produto no chat com o gerente, em 10/11/2026 por volta das 22h05 (Manaus):
"Rode 8 agentes para garantir agilidade e ajuste de tudo antes da build. A build sera adiada para 5am. Cade os recados do teste? Nao vi mais nada. Sempre que fizer algo como colocar agentes pra rodar, relate para meu agente PO ler os recados"

## O que mudou
1. **Build da v1.0.3 às 05h de Manaus** (04h20 no relógio do PC, que está ~41 min atrasado). Limite de **8 agentes** em paralelo.
2. **Volta para esta build o que estava na v1.0.4**, já que há tempo:
   - **T-0159, PDF do pedido (proposta 2 com os 4 ajustes):** CNPJ, endereço e telefone da filial de faturamento (banco, Core, integração), marca (Catálogo) e `buildOrderPdfHtml` (vendedor). **Cancela** o \"só depois do push do lote\" do R-20261110-212147: comecem já, aditivo e com teste;
   - **T-0158, diagnóstico na nuvem:** imagens aprovadas (R-20261110-192152), sem a linha \"Vai junto\" e com as 5 últimas saídas. Inclui a tela do Portal › Diagnósticos e o patch de governança do remetente `diagnostico`, que vai ao dono do produto. A chave só é ligada com tudo verde;
   - **Filial:** filtro \"Filial\" do BKO e reserva por filial (RN-VEN-20).
3. **Recados do testes:** a partir de agora, **toda entrega do testes vai com cópia para `alexandre`**. Os de hoje foram só ao gerente, que manda o resumo agora.
4. **Relato ao dono do produto:** toda vez que o gerente coloca agentes para rodar, manda um recado curto a `alexandre` dizendo quem, o quê e até quando, para o agente PO dele ler.

## Horários (relógio do PC)
- **até ~02h30:** tudo na árvore, com teste verde e parecer do corretor;
- **~02h45:** ensaio final (o 2º e último deste lote);
- **~03h30:** push, demo e EAS;
- **04h20 (05h de Manaus):** BUILD PRONTO.

## Pronto quando
BUILD PRONTO às 05h de Manaus com tudo isso dentro.
