---
id: R-20261105-170831-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T17:08:31-04:00
---
# ordem-pesquisa-checkout-t0039.test.ts:218 espera a semântica antiga de enviar() (mesma promessa)

## Contexto
Causa do S1-047 vermelho no lote N (run 42107880176): fazerCheckout faz 'void motor.enviar()' sem sinal; com as gravações em série a passada sem sinal dura alguns ticks a mais e o sincronizar logo depois recebia a MESMA promessa: os itens não iam (tentativas 0) e a foto era tentada antes do comando (ARQUIVO_SEM_REFERENCIA). Corrigi no motor (packages/platform-sdk/src/motor-sync.ts, enviar): chamada com passada em curso espera por ela e faz MAIS UMA passada (uma só para todas as chamadas que chegaram no meio; incluirFalhos de qualquer uma vale para ela); passada que começou sem sinal não manda arquivo. Testes nos 3 armazenamentos em motor-sync.arquivos.test.ts. Efeito no seu teste: só a linha 218 ('expect(motor.enviar()).toBe(envio)') falha; o comportamento novo é o correto (o void enviar() do fazerCheckout agora dispara o envio do checkout logo depois da passada em curso, ainda num lote DEPOIS da resposta).

## O que preciso / o que mudou
Trocar a linha 218 por 'const seguinte = motor.enviar(); expect(seguinte).not.toBe(envio);' e, depois do 'await envio' (fila = [chk], que continua valendo), usar 'await seguinte' no lugar do 'await motor.enviar()'; o restante (lotes.slice(1) = [[res.id],[chk]] e antes(chegada, res.id, chk)) fica igual.

## Pronto quando
Pronto quando tests/integracao/api/ordem-pesquisa-checkout-t0039.test.ts passar com o motor novo (roda sem banco: npx vitest run --config tests/vitest.config.ts tests/integracao/api/ordem-pesquisa-checkout-t0039.test.ts) e o visitas-campo S1-047 ficar verde no CI.
