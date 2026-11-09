---
id: R-20261107-201930-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T20:19:30-04:00
---
# T-0094 W: revisão de UX do ciclo de senha (BKO, portal e shell do app) pelo checklist do §9

## Contexto
T-0094 fatia W pronta para a revisão de UX pelo checklist do §9 de docs/design/ciclo-de-senha.md (aviso R-20261107-182915).

## O que revisar
BKO (apps/web):
- `components/login-screen.tsx`: Entrar com o link "Esqueci a senha" (`login.esqueci`, 14/600, alvo de 44 px) abaixo do Entrar; 403 `SENHA_A_TROCAR` vai à "Crie sua senha" sem texto; 410 com o texto do §1; aviso de volta em `info` (`login.aviso`). As três etapas na mesma moldura (marca + coluna de 400 px), sem trocar de rota.
- `components/ciclo-senha.tsx`: "Crie sua senha" (título 28/800, subtítulo pelo motivo, "<e-mail> · <código>", "Senha nova" com o olho que mostra os dois campos, "Repita a senha", `RegrasDaSenha` com `repeticao`, `id="senha-regras"` e os `aria-describedby` do §2, "Salvar e entrar"/"Salvando…", "Voltar ao login"; sem internet em `warning` no topo pelo `navigator.onLine`) e "Esqueci a senha" (pedido, confirmação em `info` sempre igual, "Não chegou?…", único botão "Voltar ao login"; erros embaixo do botão; 429 em minutos). "Senha criada." no `useToast` ao entrar.
- `lib/ciclo-senha.ts`: todos os textos (TEXTOS_CRIE_SENHA, TEXTOS_ESQUECI, TEXTOS_LOGIN_SENHA).
- RN-CORE-33 durante o uso: 403 `PERFIL_SEM_BKO` (ou sessão antiga de perfil sem BKO) encerra a sessão e volta ao Entrar com `mensagemPerfilForaDoApp(perfil, 'web')` em `info`; sem perfil, "Seu perfil não tem acesso ao backoffice.". Saiu o Notice antigo do app-shell que listava os perfis do BKO.
- **Proposta de texto nova (sem spec)**: os links de convite antigos (`/convite`) viraram um aviso (`components/aviso-link-antigo.tsx`, textos em `TEXTOS_LINK_ANTIGO`): título "Este link não vale mais", texto "Agora o acesso chega por e-mail, com uma senha temporária. Se ela não chegou, use "Esqueci a senha" na tela de entrada ou fale com o administrador da sua empresa.", botão "Ir para a entrada". Aprove ou mande o texto.
Portal (config.):
- `components/portal/tela-entrar.tsx`: 403 `SENHA_A_TROCAR` com o texto do §7; linha "Esqueceu a senha? Use "Esqueci a senha" no backoffice.".
- `components/portal/passo-empresa.tsx`: "Passe esta senha ao administrador. No primeiro acesso ao backoffice, ele cria a dele.".
- `components/portal/cartao-equipe.tsx`: sem convites (lista, CSV, Renovar e trava de saída saíram); resultado do Gravar com "<n> acessos enviados por e-mail." (1: singular; 0: sem a linha) dentro do aviso de sucesso; 503 `EMAIL_INDISPONIVEL` com o texto do §6 em `danger`. Texto do cabeçalho do cartão trocado (proposta): "Ninguém recebe senha no arquivo: cada pessoa nova recebe uma senha temporária por e-mail e cria a dela no primeiro acesso."
App (apps/mobile, telas do modulo-core):
- `src/app/login.tsx`: login → "Crie sua senha" → app e login → "Esqueci a senha" na mesma rota (nada abre antes); voltar do Android nessas etapas volta ao login; `semInternet` = modo sem sinal do app.
- "Senha criada." no Início: `AvisoRodape` + vibração leve (`src/components/aviso-pos-login.tsx`).

## Pronto quando
Revisão com 🔴/🟡/🟢 por recado; os textos novos sem spec (aviso do link antigo e cabeçalho do cartão Equipe) aprovados ou trocados.
