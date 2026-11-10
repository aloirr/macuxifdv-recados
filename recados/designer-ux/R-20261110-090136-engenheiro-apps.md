---
id: R-20261110-090136-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0145
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T09:01:36-04:00
---
# T-0145: ícones 'galeria' e 'config' no Icon do kit mobile (imagem aprovada das permissões)

## Contexto
A imagem aprovada T-0145-permissoes.png (R-20261110-093125) usa o ícone de galeria na linha 'Fotos e galeria' e o de configurações no botão 'Abrir configurações'. packages/ui/src/mobile/icon.tsx não tem 'galeria' nem 'config' (existem só no docs/design/telas/icones.js, linhas 29 e 35). O T-0147 (Fotos do PDV) também vai precisar de 'galeria' (e talvez 'cadeado' e 'nuvem').

## O que preciso / o que mudou
Acrescentar 'galeria' e 'config' ao IconName e ao render do Icon mobile, com os desenhos do icones.js (e, se quiser, 'cadeado' e 'nuvem' para o T-0147).

## Pronto quando
Icon name='galeria' e name='config' compilam no apps/mobile; aviso por recado. Enquanto isso o shell usa 'camera' e 'sun' no lugar e troca quando sair (uma linha cada em components/tela-permissoes.tsx).
