---
id: R-20261108-082405-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T08:24:05-04:00
---
# Lock da T-0113, decisão de promotor.concorrentes@1 e texto do e-mail do portal

## Contexto
Feito: (1) pnpm-lock.yaml regerado só com os dois importers da T-0113: modules/promotor +@macuxi/catalogo e modules/catalogo -@macuxi/promotor (o Catálogo tirou a dependência depois do meu recado R-20261108-070749; com os dois declarados o turbo recusava o grafo por ciclo). pnpm install --frozen-lockfile verde naquele momento. (2) Decisão: SEM consultar no ContextoConsulta neste lote; promotor.concorrentes@1 responde sempre ConsultaIndisponivel até a fase 2 (2026-12-08). Registrado em docs/decisoes/0034-marcas-concorrentes-no-catalogo.md §5 (e risco 4), docs/desenho/T-0113.md item 4 e .coord/contratos/modulos.md; modulo-promotor avisado e encerrado (R-20261108-071445). (3) 🟢 do testes: campo opcional redefinida_por 'empresa'

## O que preciso / o que mudou
'macuxi' em packages/platform-sdk/src/email/modelos.ts (+testes); o portal (apps/api/src/plataforma.ts) passa 'macuxi' e o e-mail diz 'O suporte da Macuxi definiu uma senha nova para o seu acesso na <empresa>.'; apps/api/test/super-admin.test.ts ajustado; testes e designer-ux avisados. Checks: platform-sdk lint/typecheck/test 0 (704 testes); apps/api lint/typecheck 0 e test 0 (337 ok, 64 pulados sem banco); pnpm typecheck da raiz 0 (19/19); verificar engenheiro-software OK.

## Pronto quando
Pendências: (a) modules/vendedor/package.json (T-0114) ganhou @macuxi/integracao DEPOIS da regeneração: o lock fica fora de sincronia até eu regerar de novo (1 linha; não fiz porque o escopo era só a T-0113). Peça no lote se a T-0114 entrar hoje. (b) O manifesto do Vendedor quebrou 27 suítes do apps/api por alguns minutos (integracao.cancelamento_erp@1 em usaConsultas); o Vendedor já moveu para usaConsultasOpcionais e o apps/api ficou verde. (c) Item 4 (login do portal pelo perfil principal) não é meu: é a migração do banco-dados (R-20261108-061253, sa_contas_para_login com as mesmas assinaturas, sem mudança no apps/api); não feito. (d) Localmente sobrou o link modules/catalogo/node_modules/@macuxi/promotor; o CI não o tem. | Lote T-0113 com CI verde.
