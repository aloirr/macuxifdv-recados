---
id: R-20261107-131550-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T13:15:50-04:00
---
# T-0085: Mostrar mais na lista por linha + 🟢 da revisão

## Contexto
Botão 'Mostrar mais (N restantes)' (Botao do kit, rótulo acessível) carrega +100 e mantém a ordem; cache por nó em LRU de 40; porNome removido

## O que preciso / o que mudou
Arquivos: modules/catalogo/app/telas/lista-por-linha.tsx, app/lib/lista-por-linha.ts, lista-por-linha-local.ts e testes (lista-por-linha.test.ts, .desempenho.test.ts)

## Pronto quando
lint/typecheck/test do @macuxi/catalogo 0 (767 testes); verificar só acusa anexos de recados; revisões pedidas ao designer-ux e engenheiro-apps. Pendência: nenhuma
