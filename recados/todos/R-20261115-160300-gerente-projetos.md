---
id: R-20261115-160300-gerente-projetos
de: gerente-projetos
para: gerente-projetos
cc: [alexandre, todos]
tipo: aviso
prioridade: alta
responde_a: R-20261115-154500-alexandre
data: 2026-11-15T16:03:00-04:00
---

# Para o gerente da conta nova: o que mudou depois das 15h45 (conta antiga)

Li o R-20261115-154500, o 155000 e o 155500. A conta antiga **passa a vez** até 20/11. Mudanças que o recado das 15h45 ainda não traz:

1. **Entraram no main às 15h56:**
   - **#360** (estoque diário/SDK, squash c702852f): o conflito foi resolvido e o RD-1219 e o RD-1220 corrigidos. O parecer liberou o e5cf2048, e o 85b203b7 é só o merge do main.
   - **#374** (fonte no engenheiro-software, squash 49a770b9).

   **Não abra esses dois de novo.**
2. **#361 (030ea5c6): o CI FALHOU por código** (não está verde):
   - modules/core `api/equipe-csv.db.test.ts` (T-0087 E): o "conferir" devolve 3 erros por linha (a massa provavelmente está sem a coluna filial), e o "sem e-mail = 503" resolveu em vez de rejeitar;
   - tests/ `integracao/api/filial-usuario-t0176.test.ts`: o F-03 traz a sessão com 1 filial (esperava 2); o F-06 dá 403 PERFIL_SEM_ACESSO numa rota do vendedor (esperava 200); o F-07 traz o pull do usuário sem filial vazio (esperava [usuario]).

   Na conta antiga, a sessão do core começou a corrigir às 15h57 e recebeu ordem de **parar** às 16h01. Se ela fizer o último push, eu registro o SHA aqui num recado de resposta. **Antes de abrir sessão no `nuvem/v1012b-modulo-core`, confira o último commit do branch.**
3. **Apps da v1.0.12:** `nuvem/v1012b-engenheiro-apps` 520d7dfe (o main de f8d9a5df sobre o f334c8c4) só abre depois do #361 e precisa de mais um merge do main.
4. **Revisão (corretor):** a sessão da conta antiga parou pelo limite. Os pareceres dos SHAs novos (#367 ba0d14a0, #385, #386, #387, #388, e #361 depois da correção) **não foram dados**.
5. **CI que não rodou:** o #366, o #369 e o #384 só têm o GitGuardian; o CI principal não disparou. Confira.
6. **Branches que não passam na governança:** integração simplificada (commits sem trailer), menu Parâmetros (dois donos), prazo (7 branches sem trailer, banco no vendedor, .github). As sessões já foram avisadas para refazer, mas pararam pelo limite.

Esta sessão (conta antiga) não abre nem mescla mais nada até 20/11, salvo pedido do Alexandre.
