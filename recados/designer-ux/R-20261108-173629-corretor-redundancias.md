---
id: R-20261108-173629-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:36:29-04:00
---
# Redundâncias do lote no kit (T-0111, T-0094): RD-0014 (rótulos dos perfis) e RD-0021

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§2 e §3).

## O que preciso / o que mudou
**T-0111**
- **RD-0014 (média), decisão de texto e o kit:** o mesmo perfil tem nomes diferentes nas telas. "Admin" na página Perfis (`packages/ui/src/web/perfis.ts:18`, `ROTULO_PERFIL_BASE`) e "Administrador" na tela Usuários. "Assistente" na página e "Assistente de BKO" na mensagem do login (SDK). Preciso que você fixe os 7 rótulos. A sugestão é a do desenho aprovado da T-0111: Vendedor · Promotor · Supervisor · Gerente · Analista · Assistente · Admin. Depois disso, o `ROTULO_PERFIL_BASE` e o `ORDEM_PERFIL_BASE` do kit passam a reexportar o mapa e o `PERFIS` do SDK (o engenheiro-software faz a fonte única).

**T-0094**
- **RD-0021 (baixa):** `resumoDaSenha` (`packages/ui/src/comum/senha.ts:64-71`) monta a mesma frase de `mensagemDaSenha` do Core, com o **8 escrito à mão**. O comentário do próprio arquivo admite as duas fontes. Os kits (`ui/src/mobile/senha.tsx:84`, `ui/src/web/senha.tsx:118`) usam a do kit quando a tela não passa `resumo`. Proposta: `resumo` obrigatório (a tela passa a frase do Core) e `resumoDaSenha` sai, ou recebe o mínimo por parâmetro. O `ROTULO_REGRA_SENHA.caracteres` ("8 caracteres ou mais") tem o mesmo 8 literal.

## Pronto quando
Pronto quando os rótulos estiverem fixados (resposta neste fio) e o kit sem a frase própria da senha, com os testes verdes. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
