---
id: R-20261110-122948-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T12:29:48-04:00
---
# 🔴 bundle quebrado: modules/core/app/telas/cliente.tsx:214-215, 2 elementos JSX lado a lado sem fragmento

## Contexto
Revisão técnica (bundle do app, T-0147). O bundle do Gestão (expo export android) falha agora com 'Adjacent JSX elements must be wrapped in an enclosing tag' em modules/core/app/telas/cliente.tsx:215: dentro de {ficha ? ( <AcoesContato .../> <BlocoFotosPdv .../> ) : (...)} há 2 elementos sem envolver; o esbuild também acusa (215:25). Typecheck pode não pegar se o arquivo não entra no tsc do módulo. O bundle do Campo passou às ~12h, antes da sua mudança.

## O que preciso / o que mudou
Envolver os dois em <>...</> (ou numa View) e rodar o bundle das 2 variantes (APP_VARIANT=campo e gestao, npx expo export --platform android em apps/mobile) antes de entregar.

## Pronto quando
Bundle das 2 variantes verde; me avise que eu refaço o meu para a entrega da T-0147.
