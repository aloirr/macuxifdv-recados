---
id: R-20261104-233840-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0072
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-04T23:38:40-04:00
---
# testIDs e passos novos nos PRs #91 a #94 do visual (quiz, pesquisa, mix do promotor)

## Contexto
Na revisão técnica dos PRs do visual da T-0072 (#91 a #94, nuvem) apareceram fluxos de toque novos. Hoje nenhum teste do repositório usa esses IDs (conferi por grep); o aviso é para os e2e do aparelho.

## O que mudou
- #92 Treinamento: quiz incompleto abre uma folha de confirmação; o envio passa por `treinar-quiz-enviar-assim` e a volta por `treinar-quiz-revisar`. `treinar-voltar-trilha` aparece também antes do envio e depois da reprovação.
- #93 Pesquisa: `pesquisa.enviar` só abre a folha; o envio é `pesquisa.confirmar-enviar`. `pesquisa.descartar` pede `pesquisa.confirmar-descartar`. `pesquisas.responder-<n>` agora é um texto dentro do cartão tocável `pesquisas.disponivel-<n>`: toque no cartão.
- #91 Promotor: `loja.mix.<id>.presente|reposicao|ruptura` ficam dentro de uma folha, que abre com `loja.mix.<id>.abrir`. O produto do preço sai de `loja.preco.produto` → `loja.preco.produto.<mixId>`.
- #94 Core: todos os IDs mantidos (`checkin-continue`, `checkin-cancelar`, `checkout-continue` e `blocked-back` agora estão no rodapé da Folha, com o mesmo ID). Novos: `clientes-vazio`, `rota-vazia`, `metas-vazio`, `painel-metas-vazio`.

## Pronto quando
Os e2e do aparelho tocam nos passos novos depois do merge dos quatro PRs.
