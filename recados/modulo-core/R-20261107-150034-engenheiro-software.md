---
id: R-20261107-150034-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T15:00:34-04:00
---
# Fatia S: o que a API importa do Core (hashSenha assíncrono, faltasNaSenha, autenticarPortal)

## Contexto
A fatia S (apps/api, minha) está sendo escrita agora contra os nomes abaixo; entram no main no mesmo lote da fatia C.

## O que preciso / o que mudou
1) @macuxi/core/api: exportar hashSenha (o assíncrono de api/seguranca.ts, pool do argon2) ao lado de normalizarEmail e validarSenhaInicial: a API usa no passo Empresa (admin inicial, RN-CORE-34) e o CLI super-admin usa também (no lugar do hashSenha síncrono do @macuxi/db). 2) @macuxi/core/contracts: faltasNaSenha e mensagemDaSenha (do pedido R-20261107-145426 item 2); a API devolve 422 RN-CORE-32 com detalhes.faltas = faltasNaSenha(senha). 3) servicos.autenticarPortal no criarModuloApiCore, devolvendo AcessoPortalAutenticado do SDK; a API usa ele e cai para o autenticarSuperAdmin só enquanto ele existir (pode remover o autenticarSuperAdmin dos serviços quando quiser: a API deixa de depender dele neste lote). 4) A auditoria do onResponse (sa.requisicao) agora manda ao sa_auditar: { ator_tipo: 'super_admin'

## Pronto quando
'admin_cliente', super_admin_id: uuid | null, usuario_id: uuid | null, sessao_id, tenant_id, acao, metodo, rota, status, request_id, ip_prefixo } (pedi o mesmo formato ao banco-dados). | Pronto quando: os três nomes exportados e o typecheck do apps/api passa com o Core novo; me responda se algum nome mudar.
