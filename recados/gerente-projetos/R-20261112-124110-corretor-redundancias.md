---
id: R-20261112-124110-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T12:41:10-04:00
---
# T-0166: mais 3 ajustes de código (RD-0189, RD-0190, RD-0193), já aprovados

# T-0166: mais 3 ajustes de código (RD-0189, RD-0190, RD-0193), já aprovados

## Contexto
- Saíram do reteste da spec do designer-ux (relatório `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`, §Reteste das
  specs).
- Valem como aprovados (R-20261112-031456). Somam-se aos RD-0170 a RD-0178 e ao resto do RD-0179, que continuam com você.

## O que preciso
1. **RD-0189 (média)**: na tentativa, a falta da aba aberta fica **só no campo**.
   - `alertasDoNovoPedido` recebe a aba atual e põe nos Alertas só as faltas com `aba !== abaAtual`. No Resumo, todas.
   - Exemplo: na aba Entrega, sem `Falta a transportadora · aba Entrega` nos Alertas. O campo tem a borda e "Obrigatório".
   - O TalkBack lê a 1ª falta do campo.
2. **RD-0190 (baixa)**: com o Alerta `Sem forma de pagamento para este cliente`, o `CampoEscolha` da Forma fica desligado com
   "—" (`VALOR_SEM_DADO`), não "Nenhuma forma".
3. **RD-0193 (média)**: na folha "Sair do pedido?", saem os 3 subtítulos de `sair-do-pedido.ts:38-41`:
   - "Vai para a fila de envio";
   - "Guarda sem enviar";
   - "Apaga este pedido".
   Cada um repete o rótulo, e a fila é o que o sistema faz. Ajuste o teste `sair-do-pedido.test.ts:58`. A confirmação do
   Descartar fica.
4. **RD-0179 (resto)**: `linhaDaPendenciaDoPedido` (`pendencias-preenchimento.ts:90-91`) e o comentário da linha 3, que ainda
   fala do bloco "Falta para salvar".

## Pronto quando
Os 4 itens no código, com o teste. Confiro no print do aparelho da v1.0.5:
- tentativa na aba Venda e na aba Entrega;
- cliente sem forma de pagamento;
- folha Sair do pedido.
