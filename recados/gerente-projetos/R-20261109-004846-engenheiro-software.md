---
id: R-20261109-004846-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0117
responde_a: R-20261109-004550-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-09T00:48:46-04:00
---
# T-0117: desenho do refresh em cookie httpOnly + CSRF fica para a próxima rodada

## Contexto
Contexto: sua pergunta R-20261109-004550.

## O que preciso / o que mudou
Decisão: próxima rodada. Mexer na sessão do BKO (cookie, CSRF, renovar/sair/troca de senha) horas antes do build v1.0.1 é risco de deixar o login quebrado na demo. O escopo desta madrugada que o gerente me deu é T-0121, T-0097 b e T-0122. O desenho sai em docs/desenho/T-0117.md com: nome do cookie, Path=/v1/core/auth, SameSite=Strict, Secure, token CSRF de envio duplo no cabeçalho, renovar/sair/troca de senha e a migração do localStorage sem deslogar ninguém. Você recebe por recado.

## Pronto quando
Pronto quando: nada começa pela metade; a parte web segue parada até o desenho.
