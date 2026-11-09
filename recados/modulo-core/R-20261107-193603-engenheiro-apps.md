---
id: R-20261107-193603-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:36:03-04:00
---
# T-0094 W: interface das telas do app (TelaCrieSuaSenha, TelaEsqueciSenha, link no TelaLogin) e funções trocarSenha/pedirSenhaTemporaria

## Contexto
T-0094 fatia W (pedido R-20261107-180003; spec docs/design/ciclo-de-senha.md §1 a §3; desenho docs/desenho/T-0094.md §3, §4, §5, §7, §11). O shell do app (apps/mobile) liga login → "Crie sua senha" → app e login → "Esqueci a senha" com as telas do Core em `@macuxi/core/app` (sua fatia C). Para eu ligar sem depender de detalhe interno, proponho a interface abaixo; mude o que quiser e me responda com a final.

## O que preciso (em `modules/core/app`, exportado no `app/index.ts`)
1. `entrarComSenha(post, campos, aparelho, app?)`: aceita `app: AppComLogin` e manda no corpo (`LoginSenhaRequestSchema.app`). O shell passa a variante (`'campo' | 'gestao'`). Até lá o shell injeta `app` no corpo pelo `post` dele.
2. `trocarSenha(post, { codigo_empresa, email, senha_atual, senha_nova }, aparelho, app?) => Promise<SessaoResposta>` (POST `/auth/senha/trocar`, `TrocarSenhaRequestSchema`, resposta `SessaoRespostaSchema` tolerante, como o `entrarComSenha`).
3. `pedirSenhaTemporaria(post, { codigo_empresa, email }) => Promise<void>` (POST `/auth/senha/esqueci`, `EsqueciSenhaRequestSchema`; 202 = ok).
4. `detalhesDaTroca(erro) => DetalhesSenhaATrocar | null`: lê o 403 `SENHA_A_TROCAR` (`codigo` + `detalhes` do `ErroHttp` do SDK); `null` para qualquer outro erro. O shell usa para decidir a navegação.
5. `TelaLogin`: props novas opcionais `onEsqueci?: (c: { codigo_empresa: string; email: string }) => void` (link "Esqueci a senha" abaixo do Entrar, `testID="login.esqueci"`, alvo >= 44 px, spec §1), `emailInicial?: string` e `avisoInicial?: string | null` (o texto com que a "Crie sua senha" ou a "Esqueci" voltam ao login, mostrado no lugar do erro). Quando o `onEntrar` resolver sem erro (o shell navegou para a troca), a tela não mostra nada. `mensagemDeErroDeLogin` com `SENHA_TEMPORARIA_VENCIDA` = texto da spec §1.
6. `TelaCrieSuaSenha` (spec §2): props `{ codigoEmpresa: string; email: string; motivo: 'primeiro_acesso' | 'senha_temporaria'; semInternet?: boolean; onSalvar: (senhaNova: string) => Promise<void>; onVoltarAoLogin: (mensagem?: string) => void }`. A tela NÃO recebe a senha atual: ela fica com o shell, só em memória (nunca SecureStore/AsyncStorage/log). `onSalvar` lança o erro da API (`ErroHttp`/`ErroSemConexao` do SDK) e a tela faz o que a tabela do §2 manda (422 RN-CORE-32 destaca; 422 RN-CORE-34 limpa; 401/410/423/429/403 PERFIL_FORA_DO_APP chamam `onVoltarAoLogin(texto)`; sem internet fica). Sucesso: o shell abre a sessão e navega; a tela só mostra "Salvando…". O "Senha criada." (AvisoRodape) e a vibração ficam com o shell, na tela inicial.
7. `TelaEsqueciSenha` (spec §3): props `{ codigoEmpresa: string; email: string; onPedir: (c: { codigo_empresa: string; email: string }) => Promise<void>; onVoltarAoLogin: (c: { codigo_empresa: string; email: string }) => void }`. A tela valida (vazio, e-mail), mostra a confirmação sempre igual e trata 429 (`retry_after_s`), sem internet e 5xx pelos textos do §3.
8. testIDs que o shell e os testes usam: `crie-senha.tela`, `crie-senha.nova`, `crie-senha.repita`, `crie-senha.salvar`, `crie-senha.voltar`, `esqueci.tela`, `esqueci.codigo-empresa`, `esqueci.email`, `esqueci.enviar`, `esqueci.confirmacao`, `esqueci.voltar`.
9. Nada de `declare` em campo de classe (Babel do Metro).

## Pronto quando
Os itens acima exportados de `@macuxi/core/app` com testes das regras puras (`detalhesDaTroca`, mensagens) e `pnpm --filter @macuxi/core typecheck` verde; me responda com a interface final. Eu ligo as rotas `crie-sua-senha` e `esqueci-senha` do shell e rodo os bundles campo e gestao. Enquanto isso, o shell já guarda as credenciais da troca só em memória e manda `app` no login.
