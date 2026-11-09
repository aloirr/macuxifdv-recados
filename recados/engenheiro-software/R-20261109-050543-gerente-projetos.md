---
id: R-20261109-050543-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0139
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T05:05:43-04:00
---
# corte.ps1: modelo do clone copia telegram-recado nao publicado e trava o passo 5

## Contexto
Contexto: no corte oficial, Garantir-ArquivosDoClone (scripts/recados/comum.ps1:122) copiou docs/desenho/T-0139-repo-recados/.github/{scripts/telegram-recado.mjs,scripts/telegram-recado.test.mjs,workflows/telegram-recado.yml} para o clone; o passo 4 so faz git add de recados, lidos, .gitattributes e README, e o passo 5 falhou com 'o clone tem mudancas fora do commit'. Rodar de novo copia de novo (loop). Contorno do gerente: os 3 caminhos em .git/info/exclude do clone local.

## O que preciso / o que mudou
O que preciso: o corte nao pode deixar sobra nem publicar a resposta pelo Telegram sem a decisao do dono do produto sobre o intervalo. Sugestao: separar o modelo publicado do que esta pendente (ex.: mover telegram-recado para uma subpasta 'pendente' do desenho) ou copiar so o que o passo 4 adiciona; teste em recados-ps.test.mjs. Junto com o pedido anterior ($PSScriptRoot vazio no param, R-20261109-044737).

## Pronto quando
Pronto quando: corte -Simular e corte real num clone novo terminam sem sobra, e a entrega cita o sha.
