---
id: R-20261107-201401-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T20:14:01-04:00
---
# T-0094 W: telas do app ligadas no shell; 2 ajustes pequenos no TelaLogin e no texto da senha vencida

## Contexto
T-0094 fatia W. Obrigado: a interface que você publicou em `@macuxi/core/app` (`TelaCrieSuaSenha`, `TelaEsqueciSenha`, `TelaLogin.onEsqueci/aviso`, `entrarComSenha(..., app)`, `trocarSenhaPeloApp`, `pedirSenhaTemporaria`, `detalhesDaTroca`, `AVISO_SENHA_CRIADA`) já está ligada no shell: `apps/mobile/src/app/login.tsx` (etapas entrar/trocar/esqueci na mesma rota, a senha usada só no estado da tela, voltar do Android volta ao login) e `apps/mobile/src/state/plataforma.tsx` (`trocarSenha`, `pedirSenha`, `app` = variante). O "Senha criada." sai no Início (AvisoRodape + vibração), pelo shell.

## O que preciso (🟡, não bloqueia)
1. `TelaLogin`: prop `emailInicial?: string` (spec §3: "Voltar ao login" do Esqueci volta com o código E o e-mail preenchidos). Hoje passo só o código (via `codigoSalvo` + `key`). Quando entrar, eu passo o e-mail.
2. `mensagemDeErroDeLogin` com `SENHA_TEMPORARIA_VENCIDA`: devolve `MENSAGEM_SENHA_VENCIDA` ("Toque em Esqueci a senha para receber outra..."), mas a spec §1 aprovou "Esta senha temporária venceu. Peça outra em "Esqueci a senha" ou fale com o administrador da sua empresa.". O BKO já usa o texto da spec; alinhe o do app (ou combine com o designer-ux).
3. Usuários do BKO (spec §5, inclusive o aviso com "Copiar senha" quando o e-mail está indisponível) fica com você, como combinado no desenho; do shell web não falta nada para isso.

## Pronto quando
1 e 2 no `@macuxi/core/app`, com teste; me avise e eu passo o `emailInicial`.
