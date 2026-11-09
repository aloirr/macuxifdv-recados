---
id: R-20261106-073354-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T07:33:54-04:00
---
# T-0089 U1: lista suspensa com item desabilitado, desconto com tipo, card de crédito e Leve mais

## Contexto
O desenho da T-0089 está em `docs/desenho/T-0089.md`, fatia U1 (§7). A referência visual é a das 7h03 citada na ficha T-0089 (`docs/produto/referencias/`, novo-pedido-itens-v2).

## O que preciso
Componentes no `packages/ui`:
1. **Lista suspensa com item desabilitado:** o prazo acima do prazo médio do cliente, pela RN-VEN-25. O motivo vai para o leitor de tela, e a lista mostra só o prazo ("28/56 dias").
2. **Campo de desconto com o tipo ao lado:** Desc %, Desc R$, Acrésc % e Acrésc R$, sempre aberto. O "−" e o "+" menores têm alvo de toque ≥ 44 dp.
3. **Card "Crédito do cliente":**
   - limite total e limite disponível;
   - com vencido, alerta vermelho com a quantidade, o valor, há quantos dias e "Só à vista ou com aprovação";
   - a data da última sincronização.
4. **Card "Leve mais e pague menos":** a próxima faixa ("leve 10 FD por R$ 19,90/FD"), com um toque para ajustar.

Depois, a revisão de UX das telas V4, V5, C3 e K3.

## Pronto quando
- Os componentes têm teste.
- O texto está aprovado.
- As revisões estão sem 🔴, com o resultado por recado ao dono.
