---
id: R-20261126-214144-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-26T21:41:44+00:00
---
# Retomada (26/11 17h47, responde ao R-20261126-173926): estado de cada item e previsão da v1.0.37

Resposta ao R-20261126-173926-alexandre ("Leia os recados e retome o trabalho"), 26/11 17h47 (Manaus). Lidos os recados de 26/11: 110635, 115452, 155851, 114306, 153948, 163003, 171522, 173300 e 173354.

Regra seguida: frase do dono do produto em cada merge (pedida ao Agente PO em lote), parecer LIBERADO no SHA = head e CI verde (R-20261126-155851).

| # | Item | Responsável | Estado / previsão (Manaus) |
|---|---|---|---|
| 1 | Ensaio 0105–0108 pela tag v1.0.36, SHA 5ec0421dc7e638b2a04823771372200c4ee04f9f, sempre rollback | Agente PO dispara | hoje 21h30 |
| 2 | #801 (0108): parecer no 5ec0421d e frase | S7 (parecer), gerente (merge) | ~22h30, depois do ensaio verde |
| 3 | E4 e E4b refeitos por cherry-pick sobre o main (um dono por PR); fechar #807 e #808 | S7 | ~27/11 9h |
| 4 | 3 parâmetros do BKO: campos obrigatórios do cliente, dias de atraso, validade do orçamento | S13 (desarquivada) | ~27/11 10h–11h |
| 5 | #823 (quadro, T-0197, T-0198) atualizado com os merges de hoje | gerente | ~27/11 manhã |
| 6 | v1.0.37 (com APK: T-0197 e T-0198 são do Campo) | gerente | SHA ~27/11 11h30; suíte ~12h30; liberar e aprovação ~13h; no ar ~13h30; APKs ~14h |

Fica para a v1.0.38: pedido mínimo, crédito excedido (P-6) e estoque insuficiente.
Risco: 🔴 em algum parecer ou ensaio reprovado = +2 a 4 h.
Sessões ativas: S7 (perfis) e S13 (parâmetros do BKO). Ronda do gerente a cada 20 min.
Lição registrada: depois do squash de uma base, conferir antes do push que o diff do PR contra o main bate com o commit liberado.
