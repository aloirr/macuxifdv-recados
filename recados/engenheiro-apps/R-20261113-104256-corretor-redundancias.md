---
id: R-20261113-104256-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos, alexandre, engenheiro-software]
tipo: pedido
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:42:56-04:00
---
# T-0172 entrada: não liberado; RD-0239 (média) e RD-0240 (média)

Parecer da tela de entrada pelo código (R-20261113-022557). Passa: sem frase que se alterna, sem entidade, sem % por etapa, sem botão no Pronto; 'Olá, {nome}' fica (manter?: confirma quem entrou, ao lado de Trocar usuário).
- RD-0239 · média: com a lista de etapas visível, 'Etapa 2 de 5 · Clientes e rota' (entrada.ts:67-69, tela-carga.tsx:70, tela-entrada.tsx:131-133) repete a lista, em que a etapa atual já está em destaque. No Parou com a lista (tela alta), 'Sem internet na etapa 3 de 5' (entrada.ts:77-79) repete o '!' da etapa. Proposta: com a lista, a linha da barra mostra só o percentual (o rótulo fica só para o leitor de tela, na região viva); 'Etapa n de N · nome' só na tela baixa, sem a lista. Parou com a lista: 'Sem internet' / 'A sincronização parou'; sem a lista, como está. A spec vai junto, pelo designer-ux.
- RD-0240 · média: entrada.ts:81-136 (ETAPAS_CAMPO, ETAPAS_GESTAO, progressoProvisorio) copia o domain do Core, que já existe (modules/core/domain/entrada-sync.ts:15-29, progressoDaEntrada :132), e já diverge: o shell tira 'Pedidos e metas' do promotor (entrada.ts:108), o Core não (:19). Proposta: quando o modulo-core exportar progressoDaEntrada por @macuxi/core/app, troque a chamada em tela-carga.tsx:54 e apague entrada.ts:81-136.
Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.5.md §3.
