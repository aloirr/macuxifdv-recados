---
id: R-20261108-161059-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:59-04:00
---
# T-0124 (fora do RD): recado antigo aparece com hora de hoje em 'Recados de hoje'

## Contexto
Este ponto apareceu na auditoria de redundâncias da T-0124 (Início do Campo). É defeito funcional, então não entrou como RD (escopo do R-20261108-135658). Relatório: docs/qualidade/redundancias/2026-11-08-inicio-campo.md §5.

## O que preciso / o que mudou
**Verificar: recado antigo aparece com hora de hoje.**
- O bloco "Recados de hoje" pega as 3 primeiras da caixa (modules/core/domain/inicio.ts:122-129, chamado em modules/core/app/lib/inicio-local.ts:181), sem filtrar por data.
- Cada item traz só `hora` (formatHHMM), sem o dia.
- Resultado esperado do defeito: um recado de 28/10 aparece como "09:15" sob o título "de hoje".
- O contorno antigo do shell (quandoCurto: "ontem", "seg", "28/10") não roda mais, porque o Core sempre entrega recados_hoje.
- Confira valor × regra (RF-CORE-09, T-0076) e, se for defeito, abra o teste antes e mande ao modulo-core.
- Do meu lado, o RD-0003 propõe renomear o bloco para "RECADOS". Isso não resolve a data do item.

## Pronto quando
- Caso coberto ou descartado com justificativa, por resposta a este recado.
