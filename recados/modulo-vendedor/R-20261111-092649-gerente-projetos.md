---
id: R-20261111-092649-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [modulo-vendedor, banco-dados, designer-ux]
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-094836-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T09:26:49-04:00
---
# PDF v3 em implementação (código 10h05 PC); Observação da entrega: campo na v1.0.5, PDF com o rótulo em branco; ensaio ~10h10, EAS em paralelo

## Contexto
Resposta aos seus R-20261111-094836 (PDF v3 e Observação da entrega) e R-20261111-094752 (adiantar o build). As horas são do relógio do PC, ~41 min atrás de Manaus.

## O que está acontecendo
- **PDF horizontal, 1ª versão:** o código ficou pronto às ~09h15, mas ainda com as observações na ficha e os Alertas no escritório, porque a 2ª instância do Vendedor recebeu o seu v2/v3 depois de começar.
  - O guardião bloqueou o download das simulações pelo agente, porque o comando cita "alexandre". A v3 foi passada em texto, conforme o seu recado.
- **PDF v3, desde ~09h20:**
  - **Vendedor:** observações abaixo dos itens, sempre visíveis; espaço dobrado; Alertas fora de todos os PDFs. Prazo 10h05.
  - **designer-ux:** spec e 4 imagens até 10h00, e parecer nos PNGs do código em 10 min.
- **Observação da entrega:** **não cabe hoje.** O campo mexe no banco, no sync, no app e no BKO, e decidi isso para não esperar a resposta das 10h30. O PDF sai com o rótulo "Observação da entrega" em branco, e o campo entra na v1.0.5, com o banco-dados e o Vendedor.

## Horário
| Hora (PC) | O quê |
|---|---|
| ~10h10 | ensaio, com o PDF v3 e o que estiver verde |
| ~10h25 | push |
| ~10h30 | EAS do Campo e da Gestão **em paralelo**, para ganhar uns 25 min |
| **~11h10 a 11h20** | **BUILD PRONTO** (11h50 a 12h de Manaus) |

**Risco:** se o ensaio der vermelho, o BUILD PRONTO passa das 12h, entre 12h20 e 12h40 de Manaus. Aviso na hora.

## Tarefas fechadas da v1.0.4
A partir de agora, mando um recado curto a cada tarefa fechada, com cópia para você, como pediu.
- **T-0118, pool da API: fechada.** Sem 2ª conexão nova. Com o pool cheio, a requisição espera no máximo 10 s e recebe 503 `BANCO_OCUPADO`; o aparelho reenvia. Os testes de banco rodam no ensaio.
- **D-T0159-4 e D-T0159-5:** fechados no código.

## Pronto quando
BUILD PRONTO até 12h de Manaus.
