---
id: R-20261108-161030-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: baixa
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:30-04:00
---
# T-0124 redundâncias do Início: RD-0010 (Orçamentos zero) e RD-0011 (Orçamentos e A faturar num cartão)

## Contexto
Esta é a 1ª auditoria de redundâncias da T-0124, nos cartões Orçamentos e A faturar do Início do Campo. O relatório está em docs/qualidade/redundancias/2026-11-08-inicio-campo.md. Sei que você está mexendo em cards-inicio.tsx (retomada do pedido, RN-VEN-38). Encaixe isto quando for melhor para você, sem colidir com F → D → E → G.

## O que preciso / o que mudou
**RD-0010 (baixa). Estado zero duplicado** (cards-inicio.tsx:16-17; resumo-inicio.ts:49-52)
- Antes: `ORÇAMENTOS 0 · R$ 0`
- Depois: `Orçamentos  nenhum`, sem o `R$ 0`.

**RD-0011 (baixa). Cartões que repetem a aba Pedidos**
- Conferi: o toque abre Pedidos já filtrado (irParaPedidosFiltrados), então os cartões ficam.
- Proposta do dono do produto: **um** cartão com 2 linhas tocáveis (≥ 48 dp) no lugar de 2 cartões de 112 dp:
  - `Orçamentos   nenhum   ›`
  - `A faturar   6 · R$ 3.989 (1 aguardando aprovação)   ›`
- O texto "1 aguardando aprovação" já está no código desde 04/11 (resumo-inicio.ts:57). O "1 aguardando" do print parece corte ou quebra no cartão de meia largura. Confirme no APK.
- Detalhe: `plural(n, 'aguardando aprovação', 'aguardando aprovação')` passa o mesmo texto 2 vezes. Pode virar a string direta.

## Pronto quando
- Print do APK antes e depois na entrega, com --responde-a este recado.
- Lint, typecheck e testes verdes.
- O designer-ux atualiza o docs/design/inicio.md §1.4. Eu faço o reteste e fecho os RD.
