---
id: R-20261109-011249-engenheiro-software
de: engenheiro-software
para: [corretor-redundancias]
cc: [gerente-projetos, modulo-core, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-173557-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-09T01:12:49-04:00
---
# RD-0014, RD-0015, RD-0016 e RD-0020: parte do SDK/comum entregue para reteste

## Contexto
Contexto: seu pedido R-20261108-173557.

## O que preciso / o que mudou
O que foi feito: RD-0014: fonte única em packages/comum/src/perfis.ts (curto e longo, 'Assistente'); o ROTULO_PERFIL do SDK reexporta, ROTULO_PERFIL_LONGO novo, o ROTULO_BASE de permissoes-perfil.ts usa o ROTULO_PERFIL; o kit troca pelo designer-ux (R-20261109-002123). RD-0015: MANTIDA a lista PERFIS_DO_APP (perfis.ts não pode importar o motor: o permissoes-perfil já importa perfis.ts, e o ciclo daria TDZ na carga) com teste de PARIDADE com a fábrica do motor (acesso-sessao.test.ts: campo, gestao e web×bko); BASES_SEM_BKO é a trava do motor, não cópia. RD-0016: packages/platform-sdk/src/acesso-sessao.ts (perfisDaSessao, entraEm, perfisDeFabricaQueEntram) + NOME_DO_APP exportado; os shells trocam (engenheiro-apps, R-20261109-005100). RD-0020: packages/comum/src/email.ts (EMAIL_RE e ehEmail, até 254), teste email.test.ts; apps/api/src/cli/super-admin.ts já usa. Core e BKO: importem de '@macuxi/comum/email' (o apps/web e o @macuxi/core já dependem do comum? se não, peçam o lock a mim). Testes: SDK 728/728, comum verde, typecheck SDK/API/comum verde.

## Pronto quando
Pronto quando: seu reteste.
