---
id: R-20261107-095716-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T09:57:16-04:00
---
# T-0087 P: 🟡 do texto do completo com erros e 🟢 baratos das revisões de UX e de segurança

## Contexto
T-0087 P: ajustes finais das revisões R-20261107-093612 (designer-ux, 1 🟡 + 🟢) e R-20261107-094706 (engenheiro-software, 🟢). Só apps/web, sem mudar a lógica de login, TOTP, convite nem a lista branca do redirecionamento.

## O que fiz
- 🟡 1 do designer: troquei `TEXTO_COMPLETO_COM_ERROS` (components/portal/cartao-base.tsx:25) por "O registro de uma linha com erro continua como está, sem ser inativado. Se alguma linha com erro vier sem código, nada é inativado nesta carga." O aviso da conferência (282) e o diálogo (346) usam a constante. Alinhei a ajuda do modo Completo (lib/portal-carga.ts:50), que agora diz a mesma coisa.
- 🟢 2 do designer: as frases do 2º fator (TOTP incorreto, recuperação incorreta, 503 sem segredos) agora vêm de uma fonte só, lib/portal-api.ts. tela-entrar, cadastro-totp e tela-primeiro-acesso importam de lá, e a cópia em cadastro-totp saiu.
- 🟢 3 do designer: em `Passos` (cadastro-totp.tsx), a trilha com setas ficou com aria-hidden. O leitor de tela ouve "Passo N de 3: <nome>" por um sr-only. Quem vê a tela continua vendo o mesmo texto.
- 🟢 4 do designer: a entrada lê o retorno sem apagar (`lerRetornoPortal`) e só apaga depois do login (`apagarRetornoPortal`, nas duas saídas: código e cadastro do TOTP). Também apaga quando a /entrar redireciona porque já há sessão. Com isso, um F5 na entrada mantém a página de origem e o aviso. O `consumirRetornoPortal` continua existindo, composto das duas funções.
- 🟢 5 do designer e 🟢 4 do engenheiro: `salvarSessaoPortal` zera a marca de "Sair". Um "Sair" que a guarda não consumiu não esconde mais o aviso nem a volta da próxima expiração real. O caso é o clique com a sessão já nula, no Dialog de links por baixar.
- 🟢 1 do engenheiro: novo teste que trava a lista branca, com 23 casos ruins, entre eles '/\mal.com', %2F%2F, %2e%2e, javascript:, \n no fim, barra no fim, @, #a/../b, maiúsculas, espaços, limites de 64 e 20 e tipos não string. Também confere que o caso no limite ainda passa. Somei testes de ler sem apagar e da marca zerada ao salvar a sessão.

Arquivos: apps/web/components/portal/{cartao-base,cadastro-totp,tela-entrar,tela-primeiro-acesso}.tsx, apps/web/lib/{portal-api,portal-sessao,portal-carga}.ts, apps/web/lib/{portal-sessao,portal-telas}.test.ts.

Checks do apps/web, todos com código 0: eslint, typecheck, vitest (12 arquivos, 104 testes) e next build. `verificar engenheiro-apps` sem violação minha; as 4 que aparecem são os anexos em .coord/recados/anexos/, que não são meus.

## Pendências (para o backlog, 🟢 de segurança não feitos)
- cadastro-totp.tsx:124, "Copiar chave": o segredo TOTP vai para a área de transferência, que o histórico ou a nuvem do Windows pode guardar. Proposta: uma linha de ajuda "depois de colar no aplicativo, copie outro texto".
- tela-entrar e tela-primeiro-acesso: a página pública mostra "environment PRODUCAO" e o nome do secret PROD_SUPERADMIN_CONVITE. Não revela valor. Decidir se o texto fica mais genérico; hoje a frase está centralizada em lib/portal-api.ts.
- apps/web/lib/hosts-bko.test.ts:43: o regex do destino exige porta no NEXT_PUBLIC_API_URL. Trocar por /\/integracao\/v1\/openapi\.json$/ comparando com origemDaApi(API_URL).
- Limite por IP da rota pública atrás do rewrite do Next: a API vê o IP do BKO, salvo se o trustProxy confiar no X-Forwarded-For. É assunto do engenheiro-software, em apps/api.
- Fora daqui: 🟢 15 (Tabs, Progress e ButtonLink no kit, com o designer-ux) e 🟢 14 (lotes por entidade).

## Pronto quando
Commit da rodada com os checks da raiz verdes.
