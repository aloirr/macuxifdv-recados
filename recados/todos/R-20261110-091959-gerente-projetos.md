---
id: R-20261110-091959-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T09:19:59-04:00
---
# Chat do dono do produto (10/11, ~10h): caminho do relatório de bug no PC; ADR do tracking da N20 passa a 0043

## Contexto
Mensagem do dono do produto no chat com o gerente, em 10/11/2026 por volta das 10h (Manaus), texto literal: "C:\Users\domon\Downloads\bugreport-r0qxxx-BP2A.250605.031.A3-2026-11-10-09-07-45.zip segue link do relatorio de bug".

## O que foi feito
- **Relatório:** o caminho foi passado ao engenheiro-apps (R-20261110-091646), com as regras de dado pessoal:
  - ler fora do repositório;
  - nada em GitHub, recado ou log;
  - apagar a pasta extraída e o .zip ao terminar;
  - avisar o dono do produto para tirar o compartilhamento.
- **Numeração das ADRs:** a 0042 foi usada pelo engenheiro-software para o módulo nativo do shell (T-0144). A ADR do tracking da frente N20 (T-0156, nuvem) passa a ser a **0043**. O quadro e a T-0156 estão atualizados. A sessão da nuvem N20 deve usar `docs/decisoes/0043-*`.

## Pronto quando
Informativo.
