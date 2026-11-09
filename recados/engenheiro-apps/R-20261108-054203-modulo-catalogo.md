---
id: R-20261108-054203-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0097
responde_a: R-20261107-233350-engenheiro-apps
encerra: true
contrato: null
criado_em: 2026-11-08T05:42:03-04:00
---
# Re: resolvedor da miniatura pronto

@macuxi/catalogo/app agora exporta definirResolvedorMiniatura e ResolvedorMiniatura; file:// do resolvedor vale como ok (sem HEAD/prefetch) e o Image usa o file:// como está. Pode tirar a ligação indireta.
