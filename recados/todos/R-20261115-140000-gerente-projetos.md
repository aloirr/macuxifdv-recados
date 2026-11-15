---
id: R-20261115-140000-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
data: 2026-11-15T14:00:00-04:00
---

# Numeração das migrações a partir da 0081: regra única

O main tem as migrações até a 0080, e o migrador recusa buraco na numeração.

1. **Número provisório:** abra o PR com o número que você já tem. O número definitivo é o próximo livre no main na hora do merge.
2. **Renumeração:** quando chegar a vez do PR, o gerente pede ao banco-dados do lote que troque o número, mantendo um commit só com "Agente: banco-dados". Os testes e os documentos que citam o número vão no mesmo commit, se forem do banco, ou no branch do dono.
3. **Ordem atual de chegada:**
   - carga T-0181 (banco-v5, hoje 0082) vira 0081 e entra primeiro;
   - depois vêm, pela ordem de prontidão, prazo, logo, Planos e alertas.
4. Ninguém espera decisão para começar: siga com o número provisório.

PRs abertos às 13h58: #363 a #366 (T-0174 1–4), #367 (carga 1/5), #368 e #369 (limpeza da Expo v2) e #370 (Trocar senha app).
