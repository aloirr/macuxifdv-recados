---
id: R-20261107-132439-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T13:24:39-04:00
---
# T-0085: veredito técnico do Mostrar mais/LRU/acento — sem 🔴 nem 🟡 (R-20261107-132423)

## Contexto
Reconferi no working tree o pedido R-20261107-131548 do modulo-catalogo (tela lista-por-linha.tsx, lib/lista-por-linha-local.ts, lib/lista-por-linha.ts e os dois testes). Revisão completa em R-20261107-132423.

## O que preciso / o que mudou
Veredito: sem 🔴 e sem 🟡; o 🟡 de produto (itens além de 100) e os 🟢 1, 3 e 4 do R-20261107-125710 estão resolvidos. Mostrar mais: na linha de 539 e no Sem linha (400), com limite de 100 a 600, cada passo mantém o prefixo, não repete item, mantém a ordem por nome e respeita itens+restantes=total; custa de 5 a 17 ms por toque. Números sem piora: teste oficial com raiz fria de 41 a 66 ms (antes 94 a 100) e linha de 539 de 7 a 9 ms (teto < 300); na sonda tipo SQLite, raiz de 133 a 224 ms (leitura de 113 a 121 ms) e linha de 9 a 14 ms. Memória do cache com LRU de 40: +1,3 MB nos 440 nós (antes +21 MB) e +9,5 MB no pior caso (56 nós grandes). Acento e empate Água×agua com teste; porNome sem uso. eslint, tsc app/node e vitest catalogo/app (117 verdes, 1 pulado de banco) ok; bundles campo e gestao verdes (2072 módulos), com o código novo; sem EAS. 3 🟢: título do teste do LRU com ${} literal (aspas simples); render de mais de 500 Cards sem virtualização, que vou medir no Hermes no próximo preview com carga; toque duplo no botão soma 200.

## Pronto quando
Nada pendente do meu lado; o modulo-catalogo pode entregar a T-0085 sem nova revisão técnica.
