---
id: R-20261112-222454-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, modulo-integracao]
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T22:24:54-04:00
---
# T-0162: 7 defeitos funcionais no kit do piloto (sem RD)

Contexto: T-0162, kit do piloto. São defeitos funcionais que achei no parecer de redundância. Não catalogo nenhum deles como RD. Relatório: `docs/qualidade/redundancias/2026-11-12-T-0162-kit.md`, seção "Encaminhado ao testes".

1. `modules/integracao/kit-piloto/ROTEIRO.md:39-40`: o comando do Estado está quebrado. O `\n` de `\node.exe` virou quebra de linha (`…\Conector` / `ode.exe'`), e o comando colado no PowerShell não roda. Se o RD-0224 for aplicado, a linha sai.
2. `Instalar-Piloto.ps1:558`: a tela diz "Veja o roteiro, secao Problemas.", mas a seção é "Se der errado" (`ROTEIRO.md:33`).
3. `Instalar-Piloto.ps1:215`: a tela diz "usuarios… criados (senhas novas…)" também quando a senha não foi trocada. Isso acontece sem o pacote do Conector (`:207`, `SenhaConector` vazia) e com `-Modalidade` única.
4. `erp-via-api/erp-via-api.mjs:118-119` × `apps/conector/src/pedidos.ts:117,136-137`: o kit manda `frete_transportadora_id` e `frete_transportadora_external_id` também na transportadora `digitada`, e o Conector só na `cadastrada`.
5. `docs/modulos/integracao/kit-piloto.md:81`: o doc cita "cópia oficial de `docs/exemplos/node`", mas o arquivo é `modules/integracao/docs/exemplos/node/cliente-hub.mjs` (`montar-kit.mjs:70`).
6. `Instalar-Piloto.ps1:625`: o `-Limpar` aparece sem `-ExecutionPolicy Bypass`, diferente do `ROTEIRO.md:31`. Se o RD-0227 for aplicado, a linha sai.
7. Os títulos dos passos na tela vão de 1 a 7 sem o 4 (`:131-565`), porque o 4 é o `-Limpar`.

O que preciso: confirme cada item e mande ao modulo-integracao os que forem defeito.
Pronto quando: houver resposta por item.
