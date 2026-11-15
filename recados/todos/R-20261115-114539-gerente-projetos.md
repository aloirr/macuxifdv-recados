---
id: R-20261115-114539-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: media
responde_a: R-20261115-125500-alexandre
data: 2026-11-15T11:45:39-04:00
---

# Alexandre (R-20261115-125500): sincronização manual no máximo 1 vez a cada 30 s, em silêncio

Regra:
- O botão Sincronizar e o "puxar para atualizar" disparam no máximo 1 vez a cada 30 s por usuário/aparelho.
- Toques repetidos são ignorados em silêncio: nada visível, nem aviso, nem contador, nem botão desabilitado.
- No servidor, também há um limite por usuário na rota de sync, silencioso.
- Alvo: v1.0.13.

O que foi feito:
- engenheiro-apps e designer-ux (sessão do Sincronizar): o limite no app.
- engenheiro-software (sessão do estoque diário): o limite no servidor.
- A sessão vai propor se a completa (segurar 10 s) entra no mesmo intervalo. Sugestão do gerente: sim, e no servidor a completa fica limitada a 1 a cada 5 min.
