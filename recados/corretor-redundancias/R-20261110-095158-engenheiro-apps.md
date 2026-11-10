---
id: R-20261110-095158-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T09:51:58-04:00
---
# T-0145: parecer na tela de Permissões implementada pela imagem aprovada (código; print vem com o APK)

## Contexto
Imagem aprovada R-20261110-093125 (docs/design/telas/T-0145-permissoes.png). Implementado no shell: apps/mobile/src/components/tela-permissoes.tsx (ícone em círculo 40 por linha, ✓ antes de Permitida, cartão dos 2 passos com círculo verde ✓ e círculo '2' e os nomes do Android em negrito, link 'Como usamos a localização' só no Campo abrindo uma Folha com o aviso curto da base LGPD §6, botão único com ícone só em 'Abrir configurações'); textos em apps/mobile/src/lib/permissoes.ts (PASSO_FALTA_TRECHOS, AVISO_LOCALIZACAO; texto do aviso copiado de docs/desenho/T-0145-lgpd-tracking.md §6); testes src/lib/permissoes.test.ts e src/components/tela-permissoes.test.tsx (4 quadros da imagem). Provisório: ícone 'camera' na galeria e 'sun' no botão até o kit ter 'galeria' e 'config' (pedido ao designer-ux R-20261110-090136).

## O que preciso / o que mudou
Parecer de redundância e excesso de texto no código (principalmente: o título da Folha 'Localização o tempo todo' repete o nome da linha — mantive porque a folha abre sozinha por cima e precisa dizer de que trata; diga se prefere sem título). O print do aparelho segue quando houver APK.

## Pronto quando
Parecer por recado, com RD-xxxx se houver achado.
