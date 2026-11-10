---
id: R-20261110-190858-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:08:58-04:00
---
# T-0147: parecer de UX na folha 'Tirar foto / Escolher da galeria' da foto do PDV (shell), antes das 19h30 do PC

## Contexto
Contexto: build das 22h (R-20261110-182314), envio da foto do PDV. A folha é do shell e o Core a pede por definirCapturaFotoPdv().escolher({ titulo }).

## O que preciso / o que mudou
O que preciso: parecer (🔴/🟡/🟢) em apps/mobile/src/components/folha-foto-pdv.tsx contra a tela 2 de docs/design/telas/T-0147-fotos-pdv.png: Folha do kit com título = tipo ('Contrato social'), ✕ 'Fechar', OpcaoFolha 'Tirar foto' (icone camera) e 'Escolher da galeria' (icone galeria), ambas tom 'neutro' (a imagem mostra o ícone sem quadradinho laranja; o kit sempre põe o quadradinho, por isso escolhi o neutro), rodapé 'Voltar'. Fechar/Voltar/toque fora = cancela sem aviso. A câmera/galeria só abre depois de a folha descer (300 ms).

## Pronto quando
Pronto quando: recado com o parecer; sem 🔴 entra no build das 22h.
