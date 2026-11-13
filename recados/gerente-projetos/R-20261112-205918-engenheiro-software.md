---
id: R-20261112-205918-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0170
responde_a: R-20261112-204134-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T20:59:18-04:00
---
# T-0170: desenho técnico da aba Performance (Resultados e Produtividade)

## Contexto
Pedido do Alexandre aprovado em R-20261112-204134-alexandre (§1 Início e §5 Performance). Desenho feito na nuvem, num caminho exclusivo, sem código, migração, contrato nem tela.

## O que fiz
Criei `docs/desenho/performance-produtividade.md` na branch `nuvem/T-0170-performance-desenho`:
https://github.com/aloirr/macuxifdv/tree/nuvem/T-0170-performance-desenho/docs/desenho/performance-produtividade.md

O documento cobre:
1. **Fórmulas:** os 4 Resultados e os 12 indicadores de Produtividade, com o arredondamento, o fuso do tenant e os dias úteis (semana do Core, feriados nacionais e do tenant).
2. **Casos de borda:**
   - dia sem check-in;
   - check-in sem check-out, e a visita fechada na virada do dia (não conta como check-out);
   - visita que atravessa o almoço;
   - cliente sem coordenada e check-in sem GPS.
3. **Fonte de cada dado:**
   - visita e rota pelo pull;
   - vendas, positivação e itens pela consulta do Vendedor, sem ler tabela de outro módulo;
   - km pelo resumo diário do rastreamento (T-0156). Até ele existir, os 2 cards de km ficam "—", sem estimativa por linha reta.
4. **Metas de produtividade no BKO:**
   - tabela nova `core.meta_produtividade`, com a ordem usuário > equipe > empresa > padrão do FDV e vigência por mês;
   - aba Produtividade em Metas e RV;
   - faixas de cada indicador e permissões (gerente, analista e admin).
5. **Onde calcula:**
   - a Produtividade no aparelho, offline;
   - nos Resultados, o realizado vem da API (`GET /v1/core/performance`), com cópia offline;
   - período fora da janela, só na API;
   - a janela do pull de visita, rota e paradas passa a cobrir o mês passado inteiro;
   - contratos Zod em `modules/core/contracts/performance.ts` (proposta).
6. **Regras novas:** RN-CORE-41 a 46 (calendário, Resultados, Produtividade, almoço e jornada, metas, km), com a numeração a confirmar pelo gerente.
7. **Plano por agente, com ordem, horas e riscos:**
   - cerca de 70 h, sem o rastreamento;
   - 3 a 4 dias de esteira depois das decisões;
   - não cabe na v1.0.5 sem atrasá-la. Vai na v1.0.6.

## Decisões para o Alexandre (sem resposta, o time segue a recomendação)
- **D1. Hoje é dia decorrido ou restante?** A imagem usa "DU 9 de 20 · 11 restantes". Assim, na manhã do último dia útil a Meta/dia some, mas ainda dá para vender o dia todo.
  - **Recomendo:** hoje conta nos restantes, a regra que o sistema já usa: "12 restantes".
  - **Efeito na imagem:** a Meta/dia de faturamento passa de R$ 8,7 k para R$ 8,0 k.
- **D2. "Item" em Itens por pedido:** recomendo contar produtos diferentes no pedido (o mix), não a soma das quantidades.
- **D3. Visitas nos Resultados:** hoje a meta conta só as visitas da rota. Recomendo contar todas, extras incluídas. A rota já tem a cobertura e o % fora de rota.
- **D4. Feriados nacionais:** recomendo que contem sempre, e o BKO cadastra os locais.
  - **Atenção:** muda a meta do dia e a RV de novembro (02/11 e 20/11 deixam de ser úteis).
- **D5. Metas de produtividade sem cadastro:** recomendo um padrão do FDV com os valores das imagens. A jornada líquida não aparece nas imagens: proponho 8h00.
- **D6. Nome do card "Faturamento":** com a meta do tipo pedido, o número é a venda aprovada, não o faturado. Recomendo "Faturamento" ou "Vendas" conforme o tipo da meta.
- **D7. Hoje, Ontem e Esta semana:** recomendo meta proporcional aos dias úteis do período. Hoje usa a meta do dia. A Meta/dia aparece só em Este mês e em Hoje.

**Observação:** os números das imagens são ilustrativos. Em 12/11/2026, com segunda a sexta e os feriados, é o DU 8 de 19. A imagem de Produtividade não tem o card da Jornada líquida: o designer-ux inclui.

## Pendências
- **Gerente:**
  - levar D1–D7 ao Alexandre;
  - criar as tarefas da §9 do desenho;
  - gravar as RN-CORE-41 a 46 no doc 03.
- **Commit:** só o documento, sem código, então lint, typecheck e testes não se aplicam. `node scripts/coord.mjs verificar engenheiro-software` deu OK.
- **Km:** depende da T-0156 (rastreamento) e da revisão jurídica da T-0145.

## Pronto quando
Decisões D1–D7 respondidas e as tarefas da §9 no quadro.
