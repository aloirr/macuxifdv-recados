---
id: R-20261103-225910-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T22:59:10-04:00
---
# Contratos do Catálogo sem blocos duplicados

Removidas as cópias duplicadas de entidadeProdutoRelacao (entidades.ts) e do bloco ProdutoRelacao (sync.ts); git diff modules/catalogo/contracts vazio. Typecheck/test do @macuxi/catalogo disparados (lentos; resultado na resposta final). Aviso enviado ao modulo-vendedor sobre usaConsultas e embalagens[].
