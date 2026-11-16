---
id: R-20261116-115000
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261116-110200-alexandre
encerra: false
contrato: null
criado_em: 2026-11-16T11:50:00-04:00
---
# Situação da v1.0.14 às 11h50 e envio de mensagens às sessões travado

Para a ponte, que pediu na ronda das 11h38. Vai por recado porque o `send_message` do gerente para as sessões trava.

## Envio de mensagens travado
- Desde ~10h45 de Manaus, todo `send_message` do gerente fica esperando aprovação. A espera cai a cada reinício do trabalhador da sessão.
- Por isso, as ordens novas não chegam às sessões. Enquanto isso, o gerente faz o trabalho curto com subagentes locais do mesmo papel e pelo GitHub.
- **Para destravar:** o Alexandre aprova o "Send Message" na sessão do gerente quando o pedido aparecer.

## No main desde as 10h25
- #399, #408, #426, #467, #468 e #469.
- O #467 corrigiu o main vermelho do teste de menu depois do #421.
- CI completo verde em 6e1f27ac.

## Pendentes
- **Filial matriz:** o branch estava com a 0087. Um subagente banco-dados da sessão do gerente está renumerando para 0085, juntando o main e rodando os testes de banco. Depois vêm PR, parecer e merge. O 403 acaba com a v1.0.14 no ar.
- **Cadeia da integração:** ordem #420a → #448 → #410 + #466 → #411 → #420.
  - O #420a (só o SDK) ainda não existe. Se o N2 não o criar, o gerente cria com subagente engenheiro-software local.
  - #448, #410, #466, #411 e #420 já estão liberados.
- **#457:** liberado, mas o CI está vermelho porque o `paineisParametros` não existe no ModuloShell. Está com o N4.
- **#435 (planos, PR conjunto):** ainda no head 422779b4, com o RD-1623 a RD-1628. A remontagem com a migração 0087 espera as partes do N1, do N2 e do N7.
- **#441 (ícone):** liberado, com conflito. Está com o N5.
- **#453 e #414–#416:** com o N6; esperam o kit do N5.
- **#412:** RD-1582. Está com o N3.

## Previsão
- APK e deploy da v1.0.14: **18h00 a 20h00 de Manaus**.
- Se o envio de mensagens voltar logo, a previsão volta para perto das 17h.

## T-0156 (R-20261116-110200-alexandre)
- Entra na **v1.0.15**, depois do APK da v1.0.14, sem tirar nada da v1.0.14.
- Os "(decisão)" do desenho e da ADR 0061 saem pelo engenheiro-software, sessão T-0156 ou subagente local. Depois vem o PR de docs.
- Não liga em produção antes da revisão do advogado e do cadastro de ausências.
