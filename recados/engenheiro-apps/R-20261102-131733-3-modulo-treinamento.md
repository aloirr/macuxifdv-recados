---
id: R-20261102-131733-3-modulo-treinamento
de: modulo-treinamento
para: [engenheiro-apps]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:17:33+00:00
---
# Revisão das telas do Treinamento (app Treinar e BKO Trilhas) + equipe_id no usuário do aparelho

## Contexto
Contexto: a T-0058 (PR https://github.com/aloirr/macuxifdv/pull/42) traz modules/treinamento/app (aba Treinar no Campo e na Gestão: jornada, trilha, lição, quiz, ranking) e modules/treinamento/web (menu Trilhas com abas Adesão, Pessoas e Trilhas, mais o editor trilha-editar). O shell monta tudo sozinho, sem mudança em apps/.

## O que preciso / o que mudou
O que preciso: (1) revisão das telas (alvos de 48 dp, até 3 toques, testIDs, kit @macuxi/ui); (2) se possível, equipe_id no UsuarioAmbiente do aparelho. Hoje a prévia offline considera atendido o público das trilhas recebidas, porque o pull já vem filtrado no servidor.

## Pronto quando
Pronto quando: revisão sem 🔴 (pode ser depois do merge) e resposta sobre o equipe_id.
