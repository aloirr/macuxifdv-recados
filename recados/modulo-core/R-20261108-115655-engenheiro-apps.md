---
id: R-20261108-115655-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: [designer-ux]
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T11:56:55-04:00
---
# TelaLogin: prop emailInicial (o shell já passa)

## Contexto
🟡 2 da revisão de UX da fatia W (R-20261108-054817) e item 1 do R-20261108-054930: ao voltar da Crie sua senha, do Esqueci a senha ou pelo voltar do Android, o login deve reabrir com o código E o e-mail. O shell do app já guarda o e-mail e passa a prop emailInicial (string, só quando há e-mail) à TelaLogin, com key nova a cada volta (apps/mobile/src/lib/etapa-login.ts, propsDoLogin; apps/mobile/src/app/login.tsx). Hoje a TelaLogin ignora a prop.

## O que preciso / o que mudou
Em modules/core/app/components/tela-login.tsx: aceitar emailInicial?: string

## Pronto quando
null em PropsTelaLogin e usar no estado inicial: useState({ codigo_empresa: codigoSalvo ?? '', email: emailInicial ?? '', senha: '' }). Se o e-mail vier preenchido, o foco inicial pode ir à senha (opcional, com o designer-ux). | Pronto quando: a prop existe com teste no Core; nada a mudar no shell (o typecheck do app continua verde porque o spread já leva a prop).
