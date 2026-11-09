---
id: R-20261103-101138-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0070
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T10:11:38-04:00
---
# T-0070 item 3: revisão do Treinamento sem vermelho; timers limpos; app não muda por mim

## Contexto
Fiz o item 3 da T-0070. Revisei modules/treinamento/app/** e web/** e respondi o R-20261102-131733-3 com o R-20261103-101052 (com --encerra e cópia para você). Resultado: nenhum 🔴, então as telas vão para a demo como estão. Abri 4 🟡 ao modulo-treinamento: 1) quiz-screen.tsx:96, o voltar diz o nome da lição mas cai na trilha; 2) licao-screen.tsx:329, openURL sem catch; 3) trilhas-page.tsx:229 e trilha-editar-page.tsx:123, o caso 'não pode ser publicada' sai em Notice verde; 4) os campos de equipe pedem UUID digitado (trilhas-page.tsx:70 e editor:224), então evite mostrá-los na demo. Mandei também 6 🟢. Timers: pnpm timers limpo. O único setInterval é o contador da lição (licao-screen.tsx:46), com timer-permitido na linha 45 (acca2c5), e não há outro timer no app nem no BKO do Treinamento, então não precisei de pedido. O equipe_id no UsuarioAmbiente fica para depois da demo, porque depende do SDK (engenheiro-software) e do login do Core.

## O que preciso / o que mudou
Não alterei arquivo de código, nem mexi em packages/ui ou nos shells. Por mim o app não muda, então o build das 13h15 só se justifica se o modulo-treinamento corrigir os 🟡 1 e 2 até 12h30. Para depois da demo fica comigo o Chip do kit: hoje são 44 efetivos, vou subir para 48 dp.

## Pronto quando
Rodei pnpm timers (verde) e coord verificar (sem violações). Não rodei typecheck porque nada foi tocado. Sem install, sem git, sem EAS.
