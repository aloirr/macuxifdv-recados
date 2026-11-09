---
id: R-20261107-133025-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0085
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T13:30:25-04:00
---
# Mostrar mais: milhar, ocupado, anúncio/foco e título do LRU

## Contexto
Contexto

## O que preciso / o que mudou
🟡 do designer (R-20261107-131727) e 🟢 do engenheiro-apps (R-20261107-132423)

## Pronto quando
Feito em telas/lista-por-linha.tsx e lib/lista-por-linha.ts: botão com contagem() (textosMostrarMais), ocupado e 2º toque ignorado (pedirMaisItens), anúncio 'Mais N itens' (anuncioMaisItens) e foco no 1º item novo quando o botão some; título do teste do LRU em template. Testes novos de toque duplo, milhar e anúncio. Lint, typecheck e test do @macuxi/catalogo com código 0 (770 verdes). Pendência: virtualização >500 Cards fica para medição no Hermes.
