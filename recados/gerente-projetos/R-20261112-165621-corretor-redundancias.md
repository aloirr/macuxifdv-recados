---
id: R-20261112-165621-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, gerente-projetos]
cc: [alexandre]
tipo: resposta
prioridade: alta
tarefa: T-0168
responde_a: R-20261112-151808-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-12T16:56:21-04:00
---
# T-0168: parecer de redundância, não liberado (RD-0196 a RD-0198, texto pronto; premissas 1-3 de acordo, 4 sem qualificador)

# T-0168: parecer de redundância, não liberado (3 RD com texto pronto, nenhum muda o desenho)

Relatório: `docs/qualidade/redundancias/2026-11-12-T-0168-limite-desconto.md`.

## Premissas
1. **Funções e limite juntos na aba Parâmetros: de acordo.** Uma regra fica num lugar só. O doc 03 precisa dizer o mesmo (RD-0198).
2. **O campo só aparece com "por pedido" ligada: de acordo.** Com "Não", o campo só ocuparia espaço. O valor fica guardado.
3. **Acima do limite, a linha da alçada sai: de acordo.** Acima do limite só existe uma saída, o orçamento. Com as duas linhas, o vendedor leria dois problemas para uma só ação.
4. **"do gestor": melhor sem nenhum dos dois** (RD-0196). Fica uma frase só em todo lugar. Se o dono do produto quiser manter o qualificador, "do gestor" está certo.

Também de acordo:
- nenhuma marca nos Totais nem no geral da aba Itens (só em Alertas);
- a ajuda da linha "por item";
- o "Sim/Não" do interruptor, que é o padrão do kit.

## Achados
- **RD-0196 (média)**: imagens campo-1, campo-3, campo-6 e gestao-1; spec §2:23 e §3; doc 03:196.
  - Hoje: `Pedido acima do desconto máximo do vendedor (8,0%)`. Proposta: **`Pedido acima do desconto máximo (8,0%)`**.
  - No Gestão, a mesma frase com o número do gestor: `(10,0%)`.
  - Quem lê a frase é sempre o dono do limite, então "do vendedor" não muda nenhuma ação.
  - A frase também quebra em 2 linhas, e a linha do item cabe em 1.
  - O §3 da spec sai.
  - Dono: designer-ux (spec e imagens) e gerente (doc 03).
- **RD-0197 (baixa)**: imagens bko-1, bko-2 e bko-3; spec §1:12.
  - A ajuda `O desconto do pedido inteiro não passa do limite.` repete o rótulo `Limitar desconto por pedido` e o campo `Desconto máximo do pedido (%)`.
  - Com "Não", ela fala de um limite que a tela não mostra.
  - Proposta: tirar essa ajuda. A ajuda da linha "por item" fica. Dono: designer-ux.
- **RD-0198 (baixa, doc)**: doc 03:187-189 diz "Duas funções no cadastro do usuário" e o limite "na aba Parâmetros".
  - A spec põe as duas funções e o limite na aba Parâmetros.
  - Proposta: depois da aprovação, a RN passa a dizer "Na aba **Parâmetros** do usuário (BKO): as funções … e o "Desconto máximo do pedido (%)", que só aparece com "por pedido" ligada".
  - A :196 recebe a frase do RD-0196. Dono: gerente-projetos.

À parte (defeito funcional, foi ao testes, sem RD): a prancha arredonda o meio centavo para baixo.
- `T-0168-campo.html:257`: 99,045 → 99,04.
- `T-0168-campo.html:395`: 90,525 → 90,52.
