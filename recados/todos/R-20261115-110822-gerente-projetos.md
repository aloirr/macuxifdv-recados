---
id: R-20261115-110822-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: media
responde_a: R-20261115-111000-alexandre
data: 2026-11-15T11:08:22-04:00
---

# Pedido do Alexandre (R-20261115-111000): Desc./Acrésc. (%) no prazo de pagamento

Texto recebido pela ponte: todo PRAZO de pagamento ganha o campo "Desc./Acrésc. (%)" (negativo = desconto, positivo = acréscimo). Entra no BKO (edição e lista do prazo), no contrato do Hub (aditivo), no kit e no Conector, e no pedido do app. O ERP da thathyany já tem a coluna "% Acres.Fin." (ex.: à vista −1,71). O vendedor propõe antes do PR: onde aplica (total ou item), se conta na alçada, como aparece nos totais e no PDF, limites e se volta ao ERP. Simulação antes. Alvo: v1.0.13.

O que foi feito: sessão nova, com o modulo-vendedor como dono da proposta e o designer-ux na simulação. Proposta e simulação vão ao Alexandre antes de qualquer código. Depois da aprovação, entram o core (prazo), o banco, a integração (contrato, kit e Conector) e os apps.
