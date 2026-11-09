---
id: R-20261107-175957-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T17:59:57-04:00
---
# T-0094 fatia C: domain, contratos, login/troca/esqueci, BKO de usuários, CSV sem convite, superficie bko

## Contexto
Desenho da T-0094 em docs/desenho/T-0094.md e ADR 0032 (proposta). RN-CORE-32, RN-CORE-33 e RN-CORE-34. SDK já tem (aditivo): `APPS_COM_LOGIN`, `AppComLogin`, `CODIGO_PERFIL_FORA_DO_APP`, `SUPERFICIES_ROTA`, `CODIGO_PERFIL_SEM_BKO`, `perfilUsaSuperficie` e `RotaModulo.superficie`. O e-mail chega por `ctx.email: ServicoEmail` (§10; fatia S + N5); até lá use um falso em memória nos testes.

## O que preciso (fatia C)
1. **Domain (teste antes, citando a RN):** `SENHA_TEMPORARIA_HORAS = 72`, `validadeDaSenhaTemporaria`, `avaliarSenhaDoLogin` (`ok | trocar | vencida | errada`, regras do §3.3), `validarSenhaNova(nova, email, igualAUsada)`, `podeRedefinirSenha(ator, alvo)` (alvo ≠ próprio, ≠ admin, ativo: P7), `gerarSenhaTemporaria(aleatorio)` (12 caracteres, sem ambíguos, sempre letra, número e especial), `podeAcessarBko` sobre `perfilUsaApp(perfil, 'web')` do SDK (some `PERFIS_DO_BKO`), `usuario.ver` sem o supervisor.
2. **Contratos (§12):** `LoginSenhaRequestSchema.app` opcional; códigos `SENHA_A_TROCAR`, `SENHA_TEMPORARIA_VENCIDA`, `PERFIL_FORA_DO_APP`; `DetalhesSenhaATrocarSchema`; `ROTA_TROCAR_SENHA` + `TrocarSenhaRequestSchema`; `ROTA_ESQUECI_SENHA` + `EsqueciSenhaRequestSchema`; `RedefinirSenhaRequestSchema.senha` opcional + `RedefinirSenhaRespostaSchema`; `UsuarioItemSchema` + `trocar_senha`, `senha_expira_em`, `sem_senha`; `CriarUsuarioRespostaSchema` com `email_acesso`; `ImportarEquipeResposta` sem convites (`acessos_enviados`, `email_acesso`); saem os de convite.
3. **API:** login (§3: sempre 2 conferências; 403 `PERFIL_FORA_DO_APP` e `SENHA_A_TROCAR`, 410 vencida, só depois da senha certa e sem sessão); `POST /v1/auth/senha/trocar` (§4, devolve `SessaoResposta`); `POST /v1/auth/senha/esqueci` (§5: 202 sempre igual, 5/15 min por IP, 3/h por chave, 15 min no banco, hash de descarte); claim `sv` no token e conferência no `autenticar` e no `refresh` (§7); criar, redefinir e desativar no BKO (§6) com e-mail na mesma transação e auditoria sem senha; Equipe por CSV com senha gerada, 503 `EMAIL_INDISPONIVEL` antes de gravar sem e-mail (§9); remover convite (`convite-aceite.ts`, `seguranca-convite.ts`, rotas `equipe/convites*`); login do portal ignora conta com `trocar_senha` e responde 403 `SENHA_A_TROCAR` se só sobrar ela (§8.1); marcar `superficie: 'bko'` nas rotas do Core que só o BKO usa (§8: usuários, equipes, Equipe por CSV, licenças, parâmetros, cadastros; não marcar `equipe/hierarquia`, aprovações e o que o Gestão usa).
4. **Telas do Core:** Usuários do BKO (§6: senha inicial com `RegrasDaSenha` e "Gerar senha", aviso do e-mail, etiquetas "Troca de senha pendente" e "Sem senha", "Redefinir senha"/"Enviar acesso" sem admin e sem o próprio); no app, `TelaCrieSuaSenha` e `TelaEsqueciSenha` em `modules/core/app/components` (apresentação, como a `TelaLogin`; o shell faz a navegação) e o `lib/login` tratando os códigos novos. Textos do designer-ux.

## Pronto quando
Testes: cada ramo do `avaliarSenhaDoLogin` com relógio injetado (71 h 59 vale, 72 h não); sempre 2 conferências (contagem); `SENHA_A_TROCAR` não abre sessão nem grava `ultimo_login_em`; `PERFIL_FORA_DO_APP` só depois da senha certa; trocar exige a senha atual e recusa repetir a usada; esqueci = 202 idêntico (existe, não existe, inativo, bloqueado, outra empresa), sem repetir em 15 min, limites por IP e chave; senha antiga vale depois do esqueci e descarta a temporária; reset recusa admin e o próprio; token com `sv` antigo = 401 na hora; CSV sem e-mail = 503 sem gravar; nenhuma senha, e-mail ou token em log, evento ou auditoria. Lint, typecheck e test do @macuxi/core verdes. Entra no main junto com a 0040 (banco-dados).
