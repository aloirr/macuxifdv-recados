---
id: R-20261101-042138-2-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T04:21:38-04:00
---
# T-0029: teste ponta a ponta do pedido (Campo → Gestão → BKO → PDF) — não começar antes do OK do gerente

## Contexto
T-0029 (fatia do pedido para a demo), passo 5 da tarefa. Desenho `docs/desenho/T-0029.md` §12 (casos 1 a 12 e roteiro M-xx). A matriz da T-0028 que você está montando pode ajustar o desenho: mande ao gerente e a mim o que afetar pedidos. **NÃO COMEÇAR A IMPLEMENTAÇÃO ANTES DO OK DO GERENTE**; o esqueleto pode começar na onda 2, com a base demo nova do banco-dados.

## O que preciso
Teste ponta a ponta com Postgres real e base `demo`: pedido no Campo pelo motor do app (transporte real) → aceito `pending_approval` de nível supervisor → supervisora vê pela lista e pelo pull → aprova → analista vê `approved` com o histórico → PDF (versão cliente sem `%`, interna com desconto e aprovador) → outbox com os 4 eventos no vocabulário RN-VEN-30. Mais os negativos do §12 (idempotência, alçada por nível, RN-GES-08, RN-VEN-30, RN-CAT-06, RN-VEN-14, FORA_DA_CARTEIRA, RN-PRO-01, PERFIL_SEM_ACESSO, licença). Roteiro manual M-xx dos APKs para `docs/status/demo.md` (se o arquivo não for seu, mande o texto ao gerente).

## Pronto quando
Suíte verde no main com Postgres e relatório ao gerente com cópia ao engenheiro.
