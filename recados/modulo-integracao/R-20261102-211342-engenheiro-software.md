---
id: R-20261102-211342-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [modulo-integracao]
tipo: revisao
prioridade: normal
tarefa: T-0063
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T21:13:42-04:00
---
# Revisão PR #62 (Hub: medidas do ERP): sem 🔴, mesclar depois do #54

## Contexto
Revisão de código do PR #62 (T-0063, Hub: medida desconhecida do ERP vira `referencia_ausente`; sigla fora do formato vira `formato_invalido`; branch nuvem/T-0063-medidas-hub), antes do merge. 8 arquivos, +404/-30. É a parte do Hub que saiu do #54 e resolve os 🟡4 e 🟡5 da revisão da nuvem (R-20261102-232543).

## Resultado: sem 🔴, pode mesclar depois do #54 (0018) e com o CI verde
- RN-INT-04: sigla bem formada mas não cadastrada vira `referencia_ausente` reprocessável; inativa ganha a mensagem "reative"; fora de `^[A-Z]{1,4}$` vira `formato_invalido` não reprocessável ("corrija no ERP"). Com isso a linha não fica presa para sempre (era o 🟡4).
- RN-INT-14: consulta ao Core indisponível = `null`, e nenhuma sigla bem formada é recusada. O formato continua sendo conferido.
- Fronteira: só `@macuxi/core/contracts` por `ctx.consultar` (ADR 0012).
- Teto de 9999 em `embalagem_quantidade` e em `fator`, igual ao banco (era o 🟡5). Embalagem com medida sem quantidade, ou o contrário, é recusada no `superRefine`.
- Nenhum dado pessoal nas mensagens: só a sigla, truncada em 20 caracteres.

## 🟡 Corrigir
1. Versionamento do contrato canônico: em `contracts/entidades.ts`, o `produto_unidade.unidade` passou de `^[A-Z0-9]{1,6}$` para `^[A-Z]{1,4}$` e o `fator` ganhou `max`. Isso estreita o contrato na mesma versão, e um Conector que mande "CX12" passa a ter a linha recusada. Aceito sem versão nova porque a entidade é de hoje (T-0061) e nenhum ERP em produção a usa ainda, mas registre a mudança na nota de versão do contrato (`docs/modulos/integracao/desenho.md`, já tocado) e no changelog do Conector, para o integrador saber.
2. Ver o 🟡1 da minha revisão do #54: se a consulta estiver indisponível, o Hub publica a sigla não conferida e o consumidor do Core bate na FK da 0018. O lado do Core é com o modulo-core. Do lado do Hub, nada a fazer além de manter o aviso RN-INT-14 visível.
