---
id: R-20261106-025013-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T02:50:13-04:00
---
# T-0087 P revisão pré-6h: lote pode ir à verificação; push espera 1 🔴 do Core (login durante bloqueio) e o 🟡 limitePct da Integração

## Contexto
T-0087 fatia P: revisão antes do lote das 6h (Core super-admin, 0035, Integração do portal, ADR 0029) e decisão sobre o lote único.

## O que fiz
1. 🔴 de fronteira do Core (R-20261106-014054) conferido e ENCERRADO: domain/super-admin.ts sem node:crypto, primitivas em api/seguranca-plataforma.ts com vetores do RFC 6238; node scripts/fronteiras.mjs = 0 erros (3 avisos antigos do gestor).
2. Core super-admin (R-20261106-023032): 🔴 NOVO em modules/core/api/super-admin.ts:188-199. Com o super-admin bloqueado, senha errada = 401 sem contar e senha certa = 423: dá para testar senhas sem limite de conta e o 423 confirma a certa. Correção: 423 para qualquer senha enquanto bloqueado (o teste api/super-admin.test.ts:307-313 muda junto). Mais 1 🟡: o repositório falso do teste não imita a sa_registrar_falha. E 2 🟢. O resto foi aprovado: TOTP cifrado AES-GCM com AAD, convite em tempo constante e de uso único, JWT próprio com timingSafeEqual, sessão conferida no banco, passo atômico, recuperação de uso único, 503 sem segredos, nada em log.
3. 0035 (R-20261106-023136, errata de linhas R-20261106-023204): aprovada sem 🔴 nem 🟡. Grants só ao macuxi_app, DEFINER com search_path fixo, RLS forçado sem política, auditoria append-only e preservada pela excluir_tenant, down volta à 0029.
4. Integração (R-20261106-023301): o 🟡 do limitePct segue aberto (aplicar-lote.ts:441 e :460 usam o padrão, não o parâmetro do tenant). A correção do ctx.parametros (R-20261106-024446) não fecha esse ponto. PATCH de conectores com superAdmin: ok.
5. ADR 0029: reescrevi o último item das Consequências com o limite da credencial do macuxi_app (as funções sa_* abrem sessão sem senha nem TOTP; a barreira é a credencial; a trilha sa.sessao.aberta é gravada pelo banco). Status: continua "proposta" até o Alexandre aceitar. Não bloqueia verificação nem deploy, porque o down da 0035 desfaz.
6. API (meus caminhos): o 28000 das sa_listar_tenants/sa_provisionar_tenant vira 401 NAO_AUTENTICADO (apps/api/src/plataforma.ts, comSessaoViva). Token de plataforma válido numa rota de tenant sem superAdmin agora vai à auditoria_plataforma (apps/api/src/app.ts, preparar; era o 🟢 do testes). Testes em apps/api/test/super-admin.test.ts (+3).

## Lote único
Pode ir à branch de verificação JÁ: seguimento A/B, portal, apps/web, db/ com 0034 + 0035 e a conformidade do testes (entregue em R-20261106-021812). O CI dos testes de banco é o critério. O PUSH no main espera 2 correções: o 🔴 do login (modulo-core) e o 🟡 do limitePct (modulo-integracao). As duas são pequenas e não mexem em contrato nem em banco.

## Testes
apps/api: tsc e eslint verdes; vitest 212 ok (58 de banco pulados, CI). verificar engenheiro-software: OK, sem violações. Não toquei .coord/contratos nem o pnpm-lock.yaml.

## Pendências
- LINK_DOWNLOAD_CONECTOR fica null no lote.
- Revisão linha a linha das telas do portal fica para depois do lote. A passada de arquitetura não achou 🔴 (R-20261106-023415).
