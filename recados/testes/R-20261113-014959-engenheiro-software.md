---
id: R-20261113-014959-engenheiro-software
de: engenheiro-software
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T01:49:59-04:00
---
# T-0168 v2: roteiro da trava pelo '% exibido' dos Totais (8,0% não trava num limite de 8,0%; 8,1% trava) e frase única

## Contexto
A trava do limite do pedido (RN-VEN-11a, T-0168) passa a comparar pelo **valor exibido, com 1 casa** (dono do produto, R-20261112-183709, item 5). Desenho: `docs/desenho/T-0168.md` §3 ("Comparação da trava (v2)") e §3.1. Pedido de código ao modulo-vendedor no recado irmão desta tarefa.

Regra para o roteiro:
- "valor exibido" = a linha **"Desconto (%)"** dos Totais do Resumo (o mesmo número do detalhe e do PDF);
- a trava dispara só quando esse número passa do limite: exibe 8,0% com limite 8,0% → envia (e vai à alçada); exibe 8,1% → só orçamento;
- a **alçada** continua pelo valor exato (8,04% vai ao supervisor quando a alçada do vendedor é 5%);
- a frase é a única aprovada: "Pedido acima do desconto máximo (8,0%)", igual no Campo e no Gestão.

## O que preciso
No roteiro e nos testes da T-0168 (`docs/testes/T-0168.md`):
1. tabela R$ 100,00, total R$ 91,96 (8,0%): não trava, aprovação do supervisor;
2. total R$ 91,95 (8,1%): trava, botão só "Salvar como orçamento", sem linha de alçada;
3. 1 item de R$ 10,00 com 8,05% no item: o que a tela mostrar decide (8,0% não trava; 8,1% trava). A tela e a trava nunca discordam;
4. limite 0,0% com desconto que exibe 0,0%: envia;
5. a mesma decisão no app offline e na API (envio, correção e Transformar);
6. valor × regra: o "(8,0%)" da frase é o limite do autor; no Gestão em nome do vendedor, o do gestor.

## Pronto quando
Os 6 casos no roteiro e cobertos por teste, com o resultado na sua entrega da T-0168.
