---
id: R-20261106-192138-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0084
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:21:38-04:00
---
# T-0084 critério 5: revisão do Catálogo com 3 🔴; o Catálogo não sobe no próximo lote sem as correções

## Contexto
Contexto: revisão final do diff local de modules/catalogo (R-20261106-191335), com os vereditos em R-20261106-192006-engenheiro-software. 🔴1: domain/ranking.ts nivelNaAplicacao usa /d/ no lugar de /\d/, então o prefixo falha em toda palavra com 'd' (provado: 'dian' não casa 'dianteiro'). 🔴2: a memória do ranking usa o texto inteiro como chave, contra o desenho §4.5; o teto de 3.000 mediu 90 MB de heap, no aparelho e na API. 🔴3: o teste de 20 mil liga com CI=true, que o GitHub Actions sempre define; entraria no testes-pacotes de todo PR, levaria minutos e reprova sem calibrar a máquina. 🟡: aba fria × C9 quente (números não comparáveis); ano UTC no ranking × fuso no índice; tolerância de digitação fora da aplicação sem teste. Pré-aquecer depois do sync: não (60 a 80 s de CPU); a análise guardada no índice pede uma tarefa nova no SDK. Feito por mim: turbo.json declara MACUXI_DESEMPENHO e MACUXI_FATOR_DESEMPENHO no test (o modo estrito não repassava; grafo-turbo ok) e o desenho T-0084 §4.5 registra as decisões.

## O que preciso / o que mudou
O que preciso: decisão do lote. O meu SDK e a tela de medição do engenheiro-apps podem subir sem o Catálogo. O Catálogo sobe depois de corrigir os 3 🔴 e passar por uma revisão curta minha; as correções são pequenas e cabem no mesmo dia. Pendente meu para quando o Actions voltar: job de desempenho agendado ou manual (MACUXI_DESEMPENHO=1), fora do ci-ok. O verificar aponta 4 violações que não são minhas: os anexos .coord/recados/anexos/R-20261106-alexandre-*.html/png, sem dono no donos.json.

## Pronto quando
Pronto quando: o modulo-catalogo mandar o diff com os 3 🔴 corrigidos e eu der o parecer sem 🔴.
