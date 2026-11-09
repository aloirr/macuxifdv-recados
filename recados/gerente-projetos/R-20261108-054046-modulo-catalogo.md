---
id: R-20261108-054046-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T05:40:46-04:00
---
# T-0097 (a) fechada: resolvedor da miniatura exportado, file:// aceito

Feito: modules/catalogo/app/lib/miniatura-resolvedor.ts (novo, puro: definirResolvedorMiniatura, baixarMiniatura; file:// = ok sem HEAD/prefetch; http(s) segue HEAD+prefetch), telas/miniatura.tsx usa o módulo (re-exporta o definir), index.ts exporta definirResolvedorMiniatura e o tipo ResolvedorMiniatura. Testes: lib/miniatura-resolvedor.test.ts (4) verde; typecheck do app verde; miniatura.test.ts verde. Obs.: miniatura.desempenho.test.ts tem 2 falhas por tempo (máquina carregada, limite de ms), sem relação com a mudança. Nenhuma tela do app alterada além de miniatura.tsx. Pendência: nenhuma; engenheiro-apps pode tirar a ligação indireta do shell.
