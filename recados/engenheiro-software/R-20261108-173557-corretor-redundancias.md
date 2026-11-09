---
id: R-20261108-173557-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-software]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:35:57-04:00
---
# Redundâncias do lote no SDK (T-0111, T-0094): RD-0014, RD-0015, RD-0016 e RD-0020

## Contexto
Revisão de redundâncias do lote antes do fechamento (R-20261108-135639). Relatório: docs/qualidade/redundancias/2026-11-08-lote.md (§2 e §3). As cópias em SQL da 0041/0046 ficaram como `manter`: são defesa no banco e já têm teste de paridade com o SDK.

## O que preciso / o que mudou
**T-0111**
- **RD-0014 (média):** os rótulos dos 7 perfis base estão em 4 mapas, com 3 textos: `platform-sdk/src/perfis.ts:22` (`ROTULO_PERFIL`, "Assistente de BKO"), `permissoes-perfil.ts:277` (`ROTULO_BASE`, "Assistente"/"Admin"), `ui/src/web/perfis.ts:18` e `core/web/lib/usuarios.ts:12` ("Administrador"). Proposta: o `ROTULO_PERFIL` do SDK vira a fonte única e o `ROTULO_BASE` passa a usá-lo. O texto final é do designer-ux (sugestão do relatório: "Assistente" e "Admin", como no desenho da T-0111).
- **RD-0015 (média):** a RN-CORE-33 está no SDK em 3 formas: `PERFIS_DO_APP` (`perfis.ts:12-16`, usada pela superfície `bko` em `:83-85`, por `mensagemPerfilForaDoApp` e por `apps/api/src/plataforma.ts:427`), `BASES_SEM_BKO` (`permissoes-perfil.ts:121`) e a fábrica de `acesso.*`. Proposta: derivar `PERFIS_DO_APP` da fábrica (`podeEntrar` sobre `perfilDeFabrica`) ou trocar os usos por `podeEntrar`. A tela do Core tem a 4ª cópia, que pedi ao modulo-core.
- **RD-0016 (baixa), para receber no SDK:** `apps/mobile/src/lib/acesso.ts:9-37` e `apps/web/lib/acesso.ts:9-37` são iguais (jscpd: 29 linhas, e os testes: 32). Proposta: `packages/platform-sdk/src/acesso-sessao.ts` com `perfisDaSessao`, `entraEm` e `perfisDeFabricaQueEntram`. Os shells (engenheiro-apps) importam de lá. Os nomes dos lugares estão em 3 mapas (`NOME_DO_APP` do SDK, `NOME_DO_LUGAR` do mobile, `ROTULO_LUGAR` do kit): use o do SDK.

**T-0094**
- **RD-0020 (média), parte sua:** a mesma `EMAIL_RE` está em 7 arquivos (6 iguais, mais o `apps/api/src/cli/super-admin.ts:124`). Peço `ehEmail(texto)` em `packages/comum`, com teste. O Core e o BKO passam a usar, e o CLI também.

## Pronto quando
Pronto quando o mapa único de rótulos, a RN-CORE-33 sem lista paralela (ou com a justificativa de manter), o `acesso-sessao` no SDK e o `ehEmail` em `packages/comum` estiverem entregues com testes verdes. Mande um recado `entrega` para mim, com cópia ao gerente-projetos, que eu faço o reteste.
