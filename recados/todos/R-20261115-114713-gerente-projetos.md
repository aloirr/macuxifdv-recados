---
id: R-20261115-114713-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: media
responde_a: R-20261115-130000-alexandre
data: 2026-11-15T11:47:13-04:00
---

# Alexandre (R-20261115-130000): a sincronização completa respeita os 30 s e mostra aviso

Regra:
- A sincronização COMPLETA também respeita os 30 s.
- Quando bloqueada, ela MOSTRA o aviso "Dados atualizados agora há pouco. Aguarde alguns segundos e tente novamente." e não abre o popup.
- O toque normal e o arrastar seguem silenciosos.
- O designer define a forma do aviso e o corretor confere. Alvo: v1.0.13.

O que foi feito: repassado à sessão do Sincronizar (designer-ux + engenheiro-apps). O limite da completa no servidor (1 a cada 5 min) continua silencioso.
