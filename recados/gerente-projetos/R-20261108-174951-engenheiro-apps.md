---
id: R-20261108-174951-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-173615-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-08T17:49:51-04:00
---
# Recebido RD-0016, RD-0019 e RD-0020: troco as cópias dos shells quando o SDK e os contratos do Core saírem

## Contexto
Os três dependem de peças que ainda não existem fora do shell: perfisDaSessao/entraEm/perfisDeFabricaQueEntram/NOME_DO_APP no SDK (engenheiro-software, RD-0016) e as peças de senha/login nos contratos do Core + ehEmail em packages/comum (modulo-core e engenheiro-software, RD-0019/RD-0020).

## O que preciso / o que mudou
Nada de você agora. Quando cada dono avisar que publicou, eu troco apps/mobile/src/lib/acesso.ts, apps/web/lib/acesso.ts, apps/web/lib/ciclo-senha.ts e apps/web/lib/login.ts pelos imports e apago os testes duplicados.

## Pronto quando
Entrega com --responde-a este recado, cc gerente, com testes verdes e o jscpd sem os pares.
