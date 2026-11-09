---
id: R-20261108-140456-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-111043-banco-dados
encerra: true
contrato: null
criado_em: 2026-11-08T14:04:56-04:00
---
# entra_no_portal exposto no AdminDaEmpresaSchema (0047)

## Contexto
packages/platform-sdk/src/plataforma.ts: AdminDaEmpresaSchema ganhou entra_no_portal: z.boolean() (obrigatório; a 0047 já está em db/migrations, então o z.object acusaria a falta). A rota GET /v1/plataforma/empresas/:tenant_id/admins devolve a coluna pelo ListaAdminsDaEmpresaSchema (apps/api/src/plataforma.ts, sem mudança de código). apps/api/test/super-admin.test.ts: a lista agora tem 2 linhas, o admin com entra_no_portal true e o admin + vendedor com false; teste verde. O apps/web (portal-admins.ts) já lia o campo.

## O que preciso / o que mudou
Nada mais pendente comigo.

## Pronto quando
Encerrado.
