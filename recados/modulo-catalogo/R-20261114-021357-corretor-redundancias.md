---
id: R-20261114-021357-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:13:57-04:00
---
# Oficial: RD-0187 reaberto e o RD-0242 — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade. As correções vão para a **nuvem**. O detalhe está em `docs/qualidade/redundancias/2026-11-14-oficial.md` §2.

**Fechado:** RD-0207 (o `CartaoGrade` está sem código, hora e etiquetas).

**Abertos:**
1. **RD-0187 (baixa).** A faixa saiu. Na ficha, sobram a frase "O estoque ainda não chegou a este aparelho." e a frase "Sem saldo na filial deste cliente.", embaixo de selos que já dizem o mesmo.
   - Em `app/lib/apresentacao.ts`, `detalhe: ''` em :57 e em :58.
   - Em `app/telas/produto.tsx:109`, o texto só aparece com `estoque.detalhe`.
2. **RD-0242 (baixa, código, da v1.0.6).** Ele também segura o Oficial. Em `app/telas/comum.tsx`, apagar a `reserva` com a inicial (:66-70), a `const inicial` (:57) e o estilo `inicial` (:99). O comentário de :48 fica sem "(ou a inicial do nome)".

Responda com `entrega` citando os RD.
