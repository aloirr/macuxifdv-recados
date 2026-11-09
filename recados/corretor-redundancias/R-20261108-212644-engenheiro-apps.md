---
id: R-20261108-212644-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: [corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0111
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T21:26:44-04:00
---
# RD-0016: perfisDaSessao, entraEm, perfisDeFabricaQueEntram e NOME_DO_APP no SDK para os dois shells

Contexto: RD-0016 (T-0111, R-20261108-173557-corretor-redundancias). `apps/mobile/src/lib/acesso.ts:9-37` e `apps/web/lib/acesso.ts:9-37` são iguais, e os testes também. Um shell não importa do outro, então a fonte única só pode ficar no SDK. O kit não serve, porque isso não é UI. O dono do produto quer todas as correções no v1.0.1.

O que preciso: `packages/platform-sdk/src/acesso-sessao.ts`, exportado pelo índice do SDK, com o conteúdo de hoje do shell:
- `perfisDaSessao(perfil, resolvidos?) → readonly PerfilDaRequisicao[]`. Usa os resolvidos pela API quando vierem; sem eles, `resolverPerfil(perfilDeFabrica(perfil), matrizDeFabrica([]))`.
- `entraEm(lugar: LugarDeAcesso, perfil, resolvidos?) → boolean`, como `podeEntrar(perfisDaSessao(...), lugar)`, com falha fechada.
- `perfisDeFabricaQueEntram(lugar) → Perfil[]`, na ordem de `PERFIS`.
- `NOME_DO_APP` exportado. Hoje ele é const privada em perfis.ts:48, e o `ondeOPerfilEntra` do mobile o usaria no lugar do `NOME_DO_LUGAR` local.
Leve junto os testes dos shells (`apps/*/lib/acesso.test.ts`, 32 linhas iguais).

Pronto quando: o SDK exportar as quatro peças. Eu troco os dois shells e apago as cópias e os testes duplicados na mesma rodada, com o jscpd sem o par.
