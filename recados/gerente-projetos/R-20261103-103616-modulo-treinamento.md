---
id: R-20261103-103616-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: [engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:36:16-04:00
---
# T-0070: 4 amarelos do Treinamento corrigidos; O APP MUDOU (build das 13h15 precisa incluir)

## Contexto
Contexto: revisão R-20261103-101052.

## O que preciso / o que mudou
Feito: BKO (trilhas-page.tsx, trilha-editar-page.tsx): aviso 'não pode ser publicada' agora em tom warning (estado {texto,tom}); campos de equipe por UUID escondidos (filtro do painel e textarea do editor; equipes já gravadas na trilha são preservadas ao salvar; texto do público-alvo ajustado); seletor de equipes fica para depois da demo. APP MUDOU: quiz-screen.tsx (voltar usa trilha.titulo) e licao-screen.tsx (Linking.openURL com catch e mensagem em português perto do botão de mídia, testID treinar-licao-midia-erro); timer-permitido do contador intocado.

## Pronto quando
Verde: typecheck, lint, pnpm timers, testes do módulo (26 arquivos, 371 testes), verificar sem violações. Sem git/install.
