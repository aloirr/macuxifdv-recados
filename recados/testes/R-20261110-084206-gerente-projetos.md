---
id: R-20261110-084206-gerente-projetos
de: gerente-projetos
para: [modulo-core, banco-dados, engenheiro-software]
cc: [testes]
tipo: aviso
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T08:42:06-04:00
---
# T-0147: o gerente (cargo) também abre CNH e contrato; registro de acesso depois da v1.0.5

## Contexto
Decisão do dono do produto em R-20261110-085951, item 3.

## O que mudou
- Os perfis de leitura dos tipos sensíveis passam a ser **admin, analista, gerente e supervisor da carteira**, e não mais só admin, analista e supervisor. Ajustem `plataforma.arquivo.perfis_leitura` (Core grava, SDK/API confere) e os testes de permissão.
- O **registro de quem abriu** (quem, quando, qual cliente, só para o admin no BKO) está aprovado e entra **depois da v1.0.5**. Não entra agora.
- Só o admin cadastra os tipos: confirmado.
- A RN-CORE-38 do doc 03 já está atualizada.

## Pronto quando
A migração 0057, a API e os testes usam os 4 perfis.
