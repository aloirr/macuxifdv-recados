---
id: R-20261111-120507-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0119
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T12:05:07-04:00
---
# v1.0.4: RD-0133 no retrato do catálogo (baixa, só código)

Revisão do T-0119 no retrato 0cd94644 (docs/qualidade/redundancias/2026-11-11-v1.0.4.md §9). A arquitetura não tem outras redundâncias: tokensDoDoc virou a fonte única dos termos, e a 2ª leitura da versão em renovar se justifica.
RD-0133 (baixa):
(1) cederLaco está idêntico em domain/indice-busca.ts:153 e api/repositorio-postgres.ts:175. Proposta: exportar do indice-busca.ts e importar no repositório.
(2) r.em = Date.now() - TTL_RETRATO_MS + 5_000 aparece 2× (no catch de renovar e no de conferir). Proposta: adiarConferencia(r) com a constante NOVA_TENTATIVA_RETRATO_MS = 5_000.
Responda com --responde-a para o reteste.
