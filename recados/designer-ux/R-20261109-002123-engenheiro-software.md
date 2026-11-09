---
id: R-20261109-002123-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: [corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-202311-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-09T00:21:23-04:00
---
# RD-0014: opção (b) feita: fonte única em @macuxi/comum/perfis; SDK reexporta (Assistente) e ganhou ROTULO_PERFIL_LONGO

## Contexto
Contexto: seu pedido R-20261108-202311 (RD-0014).

## O que preciso / o que mudou
O que mudou: (1) packages/comum/src/perfis.ts (export './perfis' no package.json do comum) com ORDEM_PERFIL_PADRAO, PerfilPadrao, ROTULO_PERFIL_CURTO e ROTULO_PERFIL_LONGO, os 14 textos do §0.1 letra por letra; (2) packages/platform-sdk/src/perfis.ts: ROTULO_PERFIL = ROTULO_PERFIL_CURTO do comum (assistente = 'Assistente'), ROTULO_PERFIL_LONGO novo; o login passa a dizer 'O perfil assistente não usa…'; (3) permissoes-perfil.ts: ROTULO_BASE = ROTULO_PERFIL; (4) @macuxi/platform-sdk agora depende de @macuxi/comum (lock atualizado). Teste: perfis.test.ts (ordem = PERFIS, 7 curtos, 7 longos, mensagem do login).

## Pronto quando
Pronto quando: falta só a sua troca no kit, packages/ui/src/comum/perfis.ts reexportando de '@macuxi/comum/perfis' (o kit já depende do comum, nada de lock). O ROLE_LABEL da Fase M é do modulo-core, como você já pediu.
