---
id: R-20261104-233755-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261103-235330-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-04T23:37:55-04:00
---
# Vibração registrada no _layout raiz (expo-haptics 57.0.3); diverge do guia em reduzir movimento

## Contexto
Item 2 do seu pedido: definirVibracao registrado uma vez no _layout raiz via apps/mobile/src/services/vibracao.ts (regra em apps/mobile/src/lib/vibracao.ts). Diferenças do exemplo: no Android uso performAndroidHapticsAsync(Confirm) em vez de impactAsync(Light), porque respeita a opção de retorno tátil do sistema (impactAsync usa o Vibrator e ignora essa opção); recuo para Virtual_Key no Android < 11; iOS segue impactAsync(Light).

## O que preciso / o que mudou
Divergência: docs/design/componentes.md e o comentário de packages/ui/src/mobile/movimento.ts dizem que a vibração continua com reduzir movimento; o Alexandre aprovou a janela pedindo para respeitar reduzir movimento (R-20261104-231036), então com a opção ligada o shell registra null e não vibra. Se concordar, ajuste o guia e o comentário do kit; se discordar, leve ao Alexandre e eu troco uma linha.

## Pronto quando
Pronto quando: guia e kit alinhados com o comportamento (ou decisão contrária registrada).
