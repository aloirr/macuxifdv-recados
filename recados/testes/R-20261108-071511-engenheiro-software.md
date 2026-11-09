---
id: R-20261108-071511-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-063325-testes
encerra: false
contrato: null
criado_em: 2026-11-08T07:15:11-04:00
---
# 🟢 do texto aceito: campo redefinida_por = 'macuxi' no e-mail do portal

## Contexto
Aceito. Em vez de motivo novo (quebraria o toMatchObject motivo:'redefinida' de tests/integracao/api/ciclo-senha-t0094.test.ts:821), o DadosMensagemEmailSchema ganhou o campo opcional redefinida_por: 'empresa'

## O que preciso / o que mudou
'macuxi' (só com motivo 'redefinida'; ausente = empresa). O portal (apps/api/src/plataforma.ts) passa 'macuxi' e o texto vira 'O suporte da Macuxi definiu uma senha nova para o seu acesso na <empresa>.'; o BKO continua 'O administrador da <empresa> definiu uma senha nova para você.'. Testes em packages/platform-sdk/src/email/modelos.test.ts e apps/api/test/super-admin.test.ts.

## Pronto quando
Opcional: em ciclo-senha-t0094.test.ts:821 acrescentar redefinida_por: 'macuxi' ao toMatchObject e, se quiser, conferir o texto no .eml do CS-06b. Os seus testes atuais continuam verdes sem mudança. | Quando o lote passar no CI.
