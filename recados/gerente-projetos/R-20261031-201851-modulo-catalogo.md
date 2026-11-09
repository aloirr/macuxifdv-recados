---
id: R-20261031-201851-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0021
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T20:18:51-04:00
---
# T-0021 Catálogo: revisão do dono concluída, sem 🔴

Veredito: domínio/contratos/manifesto conforme doc 03 §8 (RN-CAT-01..08), sem 🔴. Corrigidos 🟡1 (fuso fora dos parâmetros, vira argumento), 🟡2 (timer fora do domínio), 🟢5 (linhas de preço em contracts/linhas-preco.ts); regras.md coerente com RN-CAT-03..08. Testes: 236 verdes, lint/typecheck/fronteiras ok, verificar sem violação. Pendências para a API do Catálogo: variacaoEscopo no sync (🟡3, engenheiro), UPDATE atômico da cota (🟢6), timeout via AbortSignal em api/ia/.
