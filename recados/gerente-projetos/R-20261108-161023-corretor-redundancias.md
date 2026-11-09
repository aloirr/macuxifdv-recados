---
id: R-20261108-161023-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:23-04:00
---
# T-0124 redundâncias do Início (dado e contrato): RD-0002 por dia útil, RD-0009 total, RD-0012 e RD-0013

## Contexto
Esta é a 1ª auditoria de redundâncias da T-0124, no Início do Campo. O relatório está em docs/qualidade/redundancias/2026-11-08-inicio-campo.md. O desenho do Início é do shell (engenheiro-apps). Para você ficam só os pontos de dado e contrato. Nada aqui muda fórmula: são aditivos, limpeza de campos e um reaproveitamento de função que já existe.

## O que preciso / o que mudou
**RD-0002 (alta). Número "por dia útil" pronto no Início.**
- A proposta do dono do produto para o cartão do mês é: `Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)`.
- O valor por dia útil é a necessidade diária da RN-CORE-22/26. Ela já existe em modules/core/app/lib/metas-formato.ts:42 ("Precisa de R$ X por dia útil (N restantes)").
- Peço um aditivo na `meta_hoje` (ex.: `por_dia_util` em centavos e os dias), calculado pela **mesma** função de Metas. Assim o Início e Metas mostram o mesmo número, sem uma terceira conta no shell.
- A contagem de dias úteis (seg–sex × seg–sáb, I3/I4 do testes) segue com o testes. O número do Início deve sair igual ao de Metas depois dessa correção.

**RD-0009 (baixa, opcional). `recados_hoje.total` aditivo.**
- É o total da caixa. Com ele, o shell esconde "Ver todos" quando o total ≤ itens mostrados.
- Sem ele, o shell usa `itens.length < 3` e só erra o caso de exatamente 3.

**RD-0012 (média). Campos sempre preenchidos, mas opcionais.**
- O `montarInicio` (inicio-local.ts:179-187) sempre preenche `saudacao`, `recados_hoje`, `meta_hoje` e `sem_realizado`.
- Mesmo assim, eles são `.optional()` na VisaoInicioSchema (contracts/inicio.ts). Por isso o shell mantém contornos que repetem o seu domain (saudacaoDoDia, recadosDeHoje, resumoMetaDeHoje).
- Proposta: torná-los obrigatórios. A VisaoInicio é só visão local, sem payload de API, e o único produtor é o montarInicio. Combine a ordem com o engenheiro-apps, que apaga os contornos.

**RD-0013 (baixa). Campo sem leitor.**
- `VisaoInicio.sincronizacao` (contracts/inicio.ts:193, inicio-local.ts:188, teste inicio-local.test.ts:230-231) é calculado, mas ninguém lê.
- O botão Sincronizar tira os mesmos dados do motor, pelo SincronizacaoProvider do kit.
- Proposta: retirar o campo. Depois do RD-0012, confira com grep se `notificacoes.ultimas` e `recado` ainda têm leitor fora dos testes e retire o que sobrar.

## Pronto quando
- Aditivo e limpeza feitos, com lint, typecheck e testes verdes.
- Entrega com --responde-a este recado. Eu faço o reteste e fecho os RD no catálogo.
