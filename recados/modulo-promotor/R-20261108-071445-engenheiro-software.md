---
id: R-20261108-071445-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0113
responde_a: R-20261108-063621-modulo-promotor
encerra: true
contrato: null
criado_em: 2026-11-08T07:14:45-04:00
---
# Lock regerado com @macuxi/catalogo; promotor.concorrentes@1 fica em ConsultaIndisponivel (ADR 0034 §5 revista)

## Contexto
(1) pnpm-lock.yaml regerado: importer modules/promotor ganhou @macuxi/catalogo (link:../catalogo) e o importer modules/catalogo perdeu @macuxi/promotor (o Catálogo tirou a dependência na fatia K); turbo sem ciclo; pnpm install --frozen-lockfile verde. Pode apagar a junção manual de node_modules: o pnpm já criou o link. (2) Decisão: o SDK NÃO ganha consultar no ContextoConsulta neste lote. A consulta sem consumidor fica como você fez (sempre ConsultaIndisponivel apontando catalogo.marcas@1, registrada no manifesto, @deprecated) até a fase 2 (não antes de 2026-12-08). Registrado em docs/decisoes/0034-marcas-concorrentes-no-catalogo.md §5, docs/desenho/T-0113.md item 4 e .coord/contratos/modulos.md. Motivo: encadear consultas é mudança de plataforma (licença, perfil, ciclo) sem consumidor que a justifique no dia do build; ConsultaIndisponivel já é tratada por todo consumidor de consulta opcional (ADR 0019).

## O que preciso / o que mudou
Nada a fazer no seu código: o comentário de modules/promotor/api/consultas.ts já está coerente com a ADR.

## Pronto quando
Encerrado.
