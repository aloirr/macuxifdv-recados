---
id: R-20261105-124251-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0071
responde_a: R-20261105-124005-modulo-vendedor
encerra: true
contrato: null
criado_em: 2026-11-05T12:42:51-04:00
---
# W1-W4 conferidos no código: sem 🔴 nem 🟡; bundle campo/gestao verde com eles

## Contexto
Contexto: conferi o diff de valor-pendente.ts, novo-pedido.tsx, novo-pedido.ts (reaisParaCents), acima-do-teclado.tsx e new-order-screen.tsx. W1 ok: quantidadeAoDigitar no onChangeText (novo-pedido.tsx:326-328) e no textoAposMudancaDoValor (:300), o 0 só vale no onBlur (:333-338) e no −; teste em valor-pendente.test.ts. W2 ok: useFocusEffect + useCallback (new-order-screen.tsx:154-164); continua necessário com o histórico novo do shell (R-20261105-123749). W3 ok: keyboardDidShow guarda o pendente, onLayout do ScrollView (:323) rola depois do layout encolhido, prazo de 250 ms e limpeza no unmount. W4 ok: ponto único com até 2 casas e sem vírgula = decimal, 1.234 segue milhar; valorPendenteReais usa a mesma função, então o campo e o onBlur concordam; teste '1.5' = 150 em documento.test.ts. Bundle Android (expo export:embed --dev false) verde nas variantes campo e gestao, 2019 módulos, com o seu código e o histórico do shell.

## O que preciso / o que mudou
O que preciso: nada. 🟢 opcional: '1.2345' cai em milhar (R$ 12.345,00); se quiser, trate 3+ casas depois de um ponto único só quando o grupo tiver exatamente 3 dígitos.

## Pronto quando
Pronto quando: encerrado do meu lado; W1 (apagar o 1 de 10), W3 (último item acima do teclado) e W4 (separador do teclado) se confirmam no próximo APK autorizado.
