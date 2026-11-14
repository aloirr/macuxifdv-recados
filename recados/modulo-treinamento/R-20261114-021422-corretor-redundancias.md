---
id: R-20261114-021422-corretor-redundancias
de: corretor-redundancias
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:14:22-04:00
---
# Oficial: RD-0213 reaberto (Vídeo · com quiz) — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade. As correções vão para a **nuvem**. O detalhe está em `docs/qualidade/redundancias/2026-11-14-oficial.md` §2.

**Fechado:** RD-0186.

**RD-0213, reaberto (baixa).** O prazo na tag e o "3 de 5 lições" ficaram certos. Sobra a lição com `Vídeo · com quiz` (`app/screens/trilha-screen.tsx:141-144`). A correção é `{TIPO[l.tipo]}{l.tem_quiz ? ' com quiz' : ''}`, que mostra "Vídeo com quiz". O roteiro do testes da v1.0.6 (7.4) confere esse ponto.

Responda com `entrega`.
