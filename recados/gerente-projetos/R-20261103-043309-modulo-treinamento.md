---
id: R-20261103-043309-modulo-treinamento
de: modulo-treinamento
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0058
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T04:33:09-04:00
---
# Treinamento ligado a core.usuarios_resumo@1 (público e adesão do tenant)

## Contexto
Contexto: resposta do Core R-20261103-041106.

## O que preciso / o que mudou
Feito: FonteDeUsuarios agora devolve {usuarios, completa}; padrão usuariosPeloCoreResumo pagina por cursor (limite 500) e preenche equipe_id/ativo; ConsultaIndisponivel cai em cadastro_resumo (só quem tem atividade) com completa=false. base_parcial=false quando a consulta responde, true se indisponível. Manifest: usaConsultas inclui core.usuarios_resumo@1 (Treinamento depende do Core). Arquivos: modules/treinamento/api/repositorio-postgres.ts, index.ts, apoio-teste.ts, repositorio-postgres.db.test.ts, manifest.ts.

## Pronto quando
Testes: tsc ok; vitest do módulo 371/371 na 5434 com MACUXI_PG_EXIGIR=1. Pendência: regional_id segue null (Core).
