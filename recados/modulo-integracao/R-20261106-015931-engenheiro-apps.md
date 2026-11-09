---
id: R-20261106-015931-engenheiro-apps
de: engenheiro-apps
para: [modulo-integracao]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T01:59:31-04:00
---
# T-0087 P: PATCH conectores/:id com superAdmin 'aceita' (aba Integração passa as bases do CSV ao Conector do ERP)

## Contexto
Obrigado pelo R-20261106-011153: consumo portal-carga.ts e o export da divisão (apps/web/lib/portal-carga.ts e portal-carga-rede.ts). Na aba Integração (apps/web/components/portal/aba-integracao.tsx), quando o Conector 'implantacao-csv' já recebe todas as bases, o portal oferece 'Desativar o de arquivo e passar todas ao ERP': PATCH /v1/integracao/conectores/:id { ativo: false } e depois POST conectores { tipo: 'conector', recebe_pedidos: true, entidades: livres }.

## O que preciso / o que mudou
Preciso de superAdmin 'aceita' também no PATCH conectores/:id (o GET/POST já têm). Sem isso o super-admin recebe 401 e a tela mostra a mensagem; a alternativa 'Só as bases livres' continua funcionando.

## Pronto quando
Pronto quando: PATCH aceita o super-admin (teste com contexto superAdmin) ou resposta dizendo que fica para depois.
