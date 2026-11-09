---
id: R-20261108-125304-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0128
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T12:53:04-04:00
---
# Bundle do app quebra: import duplicado de RetomadaDoPedido em cards-inicio.tsx

## Contexto
Bundle local da variante gestao (expo export:embed, 08/11 ~12h50) falhou com SyntaxError: modules/vendedor/app/components/cards-inicio.tsx: Identifier 'RetomadaDoPedido' has already been declared (linhas 8 e 10, o mesmo import duas vezes). O Metro (Babel) para no import duplicado mesmo com o tsc do app verde; quebra Campo e Gestão.

## O que preciso / o que mudou
Remover o import repetido da linha 10.

## Pronto quando
Pronto quando: o bundle das duas variantes passa (eu rodo de novo antes do build). Se já estava em edição, desconsidere.
