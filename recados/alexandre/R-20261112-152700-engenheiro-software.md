---
id: R-20261112-152700-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:27:00-04:00
---
# T-0168: desenho e contratos do limite de desconto prontos; pedidos enviados aos 5 donos

## Contexto
T-0168 (RN-VEN-11a), escopo do engenheiro-software: desenho técnico e contratos. Os pedidos aos donos já foram com o contrato e só valem depois da aprovação da simulação.

## O que fiz
- `docs/desenho/T-0168.md`:
  - dado em `core.usuario`: `desconto_limita_item` (padrão true), `desconto_limita_pedido` (padrão false) e `desconto_maximo_pedido_permil` (int 0..1000, décimos de %), com 2 constraints e o padrão pelo `default`;
  - contratos Zod: `LimiteDescontoSchema` e `LIMITE_DESCONTO_PADRAO` no Core, usuário do BKO, entidade de sync nova `usuario` (campos com padrão), `core.cadastro_resumo@1` aditivo e o código `desconto_pedido_acima_limite` (422);
  - domínio `modules/vendedor/domain/limite-desconto.ts` com tabela de 21 casos, inclusive o exemplo 5%/8% e o pedido em nome;
  - quem chama: o app offline e a API (envio, correção, Transformar); orçamento não trava; o limite é sempre o do autor (gestor no pedido em nome).
- Registro em `.coord/contratos/modulos.md`.
- Pedidos enviados: banco-dados R-20261112-151014, modulo-core R-20261112-151024, modulo-vendedor R-20261112-151025, modulo-gestor R-20261112-151041, testes R-20261112-151051.
- Ordem: banco-dados ∥ contratos do Core → domínio do Vendedor ∥ API e BKO do Core → API e app do Vendedor → Gestor → testes. Horas: banco 1, core 4, vendedor 5,5, gestor 1, testes 2. Total ≈ 13,5 h, caminho crítico ≈ 9 h depois da aprovação.

## Premissas e pontos para o gerente
1. Nome `_permil` no lugar de `_pct`, porque no repositório `_pct` é sempre % decimal. O valor é o pedido: inteiro em décimos.
2. Comparação pelo desconto efetivo EXATO, o mesmo da alçada, sem folga. Um efetivo de 8,04% trava com limite de 8,0%, embora a tela mostre 8,0%. Se o dono preferir o valor exibido, a mudança fica numa linha da `pedidoAcimaDoLimite`.
3. Edição com a ação `usuario.editar` de hoje (admin), sem ação nova.
4. A frase segue a simulação: "do vendedor (8,0%)", e "do gestor" no pedido em nome.
5. Possível defeito de hoje, a conferir pelo modulo-vendedor com teste: a API parece recusar `preco_abaixo_minimo` também no orçamento, contra a RN-VEN-11. O `tipo` novo do `revalidarPedido` corrige.
6. A carga do ERP e o CSV da Equipe não tocam nas 3 colunas.
7. Sem ADR, porque tudo é aditivo. Sem commit.

## Pronto quando
Simulação aprovada → o gerente libera os 5 pedidos. Faço a revisão final de cada entrega.
