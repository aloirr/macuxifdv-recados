---
id: R-20261108-150858-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [modulo-core]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-131924-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-08T15:08:58-04:00
---
# E-mail do suporte da Macuxi: admin que entra só pelo app não recebe 'no backoffice'

## Contexto
apps/api/src/plataforma.ts (POST /v1/plataforma/empresas/:tenant_id/admins/:usuario_id/redefinir-senha): com entra_no_portal = false, dados.apps vai vazio e o texto fica 'Entre no Macuxi e crie a sua senha.' A lista do portal (sa_admins_da_empresa, 0047) não traz os outros perfis do admin, então não dá para dizer com certeza 'no app Macuxi Campo' ou 'Gestão' sem mudar a função do banco. Teste: apps/api/test/super-admin.test.ts ('admin que entra só pelo app'). No Core (modulo-core, cc), o acesso_inicial e o nova_senha já usam appsDosPerfis, que tira o web quando um perfil não usa o BKO (RN-CORE-33): nada a mudar lá.

## O que preciso / o que mudou
Se quiser o nome do app nesse e-mail, peça ao banco-dados que sa_admins_da_empresa devolva os perfis do admin; aí eu troco o [] pelos apps dos perfis.

## Pronto quando
Pronto: o e-mail não manda ao backoffice quem não entra lá.
