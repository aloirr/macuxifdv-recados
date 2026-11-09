---
id: R-20261107-144142-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:41:42-04:00
---
# Diff dos anexos de recado (.coord/recados/anexos/** → alexandre) pronto em docs/desenho/anexos-dono.diff

## Contexto
Pedido do Alexandre (07/11): o dono de .coord/recados/anexos/ é ele; finalizar a pendência do R-20261104-185608-gerente-projetos. Hoje os 4 anexos (R-20261106-alexandre-filtro-periodo.{png,html} e R-20261106-alexandre-novo-pedido-itens-v2.{png,html}) caem no regex de recado do scripts/coord-lib.mjs, dão "destino de recado inválido: anexos" em todo verificar e o CI de governança reprova.

## O que fiz
Diff pronto, não aplicado (arquivos de governança do Alexandre): docs/desenho/anexos-dono.diff (5 arquivos, +157 −7). `git apply --check` limpo no main (bf9df526).
1. .coord/donos.json: regra `.coord/recados/anexos/**` → alexandre antes de `.coord/contratos/**` e de `.coord/**`, mais uma frase na "descricao" (anexo não é recado).
2. scripts/coord-lib.mjs: nova `ehAnexoDeRecado(caminho)`. `donoDaMudanca` trata o anexo como `{tipo:'comum', dono: donoDe(...)}` antes do regex de recado. `podeAlterar` (usado pelo guarda-donos) pula o ramo de recado para anexo e aplica a regra comum. Resultado: o alexandre cria e altera; os outros recebem "pertence a alexandre. só o Alexandre altera este arquivo".
3. .claude/hooks/guarda-bash-lib.mjs: a checagem própria "recado existente = imutável" não vale para anexo (sem isso, o alexandre não alteraria um anexo existente pelo Bash). No `comoDesfazer`, um anexo novo de outro agente sai com `rm`, como arquivo comum; um recado novo continua sem rm. O guarda-donos.mjs não precisa de mudança, porque usa o podeAlterar.
4. Testes: 5 novos em scripts/coord-verificar.test.mjs: regra no donos.json real; funções puras; anexo do alexandre não viola (sem agente, `verificar alexandre`, branch alexandre/* com anexo alterado); anexo de outro agente viola (`--base` e `--por-commit`; sem `--base` aparece em "Outros donos"); recado normal igual (exceção, destino inválido, imutável). Mais 1 em .claude/hooks/guarda-bash.test.mjs (Bash e comoDesfazer), com a regra no fixture.

## Resultado na cópia temporária
Worktree em C:/macuxifdv-anexos, com o diff aplicado do arquivo por `git apply` e os 4 anexos copiados. Já foi removido.
- `node --test scripts/*.test.mjs`: 69 testes, 68 ok, 0 falha, 1 pulado (o skip de Windows que já existia).
- guarda-bash.test.mjs: 35 testes, 34 ok na rodada paralela. A falha foi o teste de desempenho (2,5 s), por carga; sozinho, ele e o teste novo passam (2/2).
- guarda-agente, guarda-recado, guarda-gh e brechas-governanca: verdes. guarda-merge e guarda-merge-mcp: 2 falhas ("gh fora do ar ... falha fechada"), que acontecem igual no main SEM o diff. É coisa do ambiente (gh instalado e online) e não tem a ver com os anexos.
- `node scripts/coord.mjs verificar` com os 4 anexos: OK, código 0, nenhum anexo acusado (aparecem com dono alexandre). `verificar alexandre`: OK.

## Pendências e como aplicar
- Quem aplica é o Alexandre (ou a sessão dele): `git apply docs/desenho/anexos-dono.diff`. O commit precisa do trailer "Agente: alexandre", porque mexe em .claude/**, donos.json e coord*.mjs (brecha 1 do CI). Os 4 anexos podem ir no mesmo commit: no `--por-commit` são do alexandre. Commit do gerente-projetos com anexo viola por desenho (arquivo de outro dono).
- Não simulei o commit com o trailer alexandre na cópia: o guardião bloqueou, com razão. O caso está coberto pelos testes, em repositório temporário.
- docs/desenho/anexos-dono.diff pode ser apagado depois de aplicado.
