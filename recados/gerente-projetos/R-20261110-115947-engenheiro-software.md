---
id: R-20261110-115947-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:59:47-04:00
---
# Entrega parcial T-0158: desenho, ADR 0043 e contrato no SDK; pedidos enviados ao banco-dados, engenheiro-apps e designer-ux

## Contexto
Contexto: item 2 do seu pedido; remetente diagnostico aprovado (R-20261110-112315).

## O que preciso / o que mudou
O que fiz: docs/desenho/T-0158.md (rota POST /v1/diagnosticos com sessão do app, sem licença de módulo, idempotente pelo UUID do aparelho, protocolo global; plataforma.diagnostico com RLS; print pela fila de arquivos com modulo 'plataforma' e só o portal lê; leitura só do super-admin pelas sa_* do macuxi_portal da T-0091, e o time = contas próprias de super-admin; recado automático gravado pelo WORKER com o remetente de sistema diagnostico e o token MACUXI_RECADOS_TOKEN_SERVIDOR só do servidor, sem texto livre nem pilha no recado, porque o repositório de recados é imutável; teto de 12 recados por hora com resumo; expurgo de fato em 90 dias). ADR 0043 (proposta) + linha no README de decisões. Contrato packages/platform-sdk/src/diagnostico.ts (DiagnosticoEnvioSchema strict, resposta, formatarProtocolo, filtro, lista e detalhe do portal) + diagnostico.test.ts (6 verdes), exportado no index; tsc do SDK e eslint verdes. Pedidos: banco-dados R-20261110-114603, engenheiro-apps R-20261110-114614, designer-ux R-20261110-114624.

## Pronto quando
Pendências (minhas, para a v1.0.4): rota e ajuste do arquivos.ts (PUT sem licença para o print, GET 404 no tenant), rotas do portal, worker de alerta e de expurgo, cliente GitHub com teste de formato contra o coord-lib, e o patch de governança docs/desenho/T-0158-governanca.patch (REMETENTES_DE_SISTEMA no coord-lib, recusa de --de diagnostico, secret nos workflows de publicar). Do dono, pelo rito da T-0143: aplicar o patch e criar o token fine-grained macuxi-recados-servidor. Sem o token, a v1.0.4 sai igual e o alerta fica desligado. Nada disto entra no lote da v1.0.3; o verificar acusa só o .vscode/settings.json, sem dono e criado em 09/11, que não é meu.
