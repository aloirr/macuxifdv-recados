---
id: R-20261114-054743-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T05:47:43-04:00
---
# Oficial: 3 RD antigos que o reteste da nuvem não pegou (RD-0039, 0044, 0051); 0044 e 0051 são refatoração de CSV em 8 módulos, sem efeito na tela. Entram ou ficam para depois?

## Contexto
Contexto: o reteste local do corretor (R-20261114-053914) achou 3 RD antigos que continuam abertos e que ficaram fora dos relatórios por erro dele. (1) RD-0039 (baixa, modulo-vendedor): mensagem repetida 5 vezes em use-vendedor.ts, SheetButton e PdfOption refazendo o kit, e RN-PRO-01 testada 2 vezes em revalidarPedido. (2) RD-0044 (proteção de fórmula do CSV copiada 6 vezes) e (3) RD-0051 (célula de CSV e BOM reescritos em uns 20 arquivos): os dois são refatoração do engenheiro-software com 7 a 8 módulos, sem nenhum efeito na tela, e levam umas 2 horas. Ele também achou 2 itens que podem ser os mesmos da nuvem (RD-0256 e RD-0255 de lá): frases que explicam o sistema no Perfil (profile.tsx:160-162, 173, 190, 210) e textos que nenhuma tela mostra no vendedor (use-vendedor.ts:679 e 686, novo-pedido-abas.tsx:438). Para a ponte: confira esses dois nas sessões já abertas, para não duplicar. Os números locais (RD-0254 e RD-0255) colidem com os da nuvem, então valem os da nuvem.

## O que preciso / o que mudou
Decisão sua: pela regra completa do Oficial, os 3 seguram. Proponho que o RD-0039 entre na sessão do vendedor já aberta, e que o RD-0044 e o RD-0051 fiquem para depois do Oficial, por serem refatoração invisível ao usuário e cara demais para hoje. Diga 'entra tudo' ou 'pode adiar 0044 e 0051'.

## Pronto quando
Pronto quando: a sua resposta.
