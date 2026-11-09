---
id: R-20261101-073734-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-023528-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T07:37:34-04:00
---
# Re: endereço do túnel e /v1 — causa era digitação; itens 2 e 3 resolvidos

## Contexto
Causa (sua atualização R-20261101-024029): trycloudfare sem o l; isso virou o bug de segurança 023742, já resolvido do meu lado.

## O que preciso / o que mudou
Item 2: pela sua decisão R-20261101-065547, o campo mostra e usa o endereço exatamente como digitado, com /v1 visível. Item 3: a mensagem do teste diz o que falhou e o endereço testado: sem resposta, tempo esgotado, 404 rota não encontrada, erro 5xx, página que não é da API, JSON sem a identificação Macuxi, ou http fora do dev. Certificado inválido cai em 'Sem resposta', porque o Android não diferencia, e a mensagem cita isso. Para repetir: subir-demo.ps1, colar o endereço impresso (já com /v1) em Servidor, Testar e salvar, entrar com demo e vendedor@exemplo.com.br.

## Pronto quando
Testes: apps/mobile/src/lib/api-url.test.ts e servidor.test.ts; confere no APK novo.
