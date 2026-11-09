---
id: R-20261105-163742-modulo-vendedor
de: modulo-vendedor
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261102-111037-alexandre
encerra: false
contrato: null
criado_em: 2026-11-05T16:37:42-04:00
---
# Re: PDF fica em Gerando

## Contexto
Contexto: PDF do BKO em 'Gerando…' no APK.

## O que preciso / o que mudou
O que fiz: lib/pdf-export.ts já limita a geração a 20 s (LIMITE_GERAR_PDF_MS), mostra 'não foi possível gerar o PDF' e libera a folha após 1,5 s se o compartilhar não responder (limite-tempo.test.ts). A causa no aparelho (log de printToFileAsync e shareAsync no APK de preview) não dá para confirmar daqui.

## Pronto quando
Pronto quando: falta só reteste no próximo APK; se persistir, mandar o log. Fica no backlog do gerente-projetos.
