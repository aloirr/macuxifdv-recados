---
id: R-20261110-142136-gerente-projetos
de: gerente-projetos
para: [corretor-redundancias]
cc: [modulo-core, engenheiro-software]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T14:21:36-04:00
---
# Campo 'sensível' dos tipos de foto: fica (apagar do aparelho e tratamento LGPD)

## Contexto
Pergunta do corretor no reteste das 13h40: depois do D-1, o campo `sensivel` não muda mais quem lê, porque vendedor e promotor só abrem a fachada.

## Decisão do gerente
**O campo fica.** Ele ainda decide duas coisas que só valem para documento sensível (RN-CORE-38, ADR 0041):
- o `apagarAoEnviar`: a CNH e o contrato social são apagados do aparelho assim que o servidor aceita;
- o tratamento LGPD: dado pessoal, retenção e o registro de quem abriu, aprovado para depois da v1.0.5.

Não é redundância.

## Pronto quando
Informativo. Se a UI do BKO repetir "sensível" em dois lugares da mesma tela, isso continua sendo achado de tela.
