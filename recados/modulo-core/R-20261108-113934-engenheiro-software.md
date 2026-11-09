---
id: R-20261108-113934-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-110059-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-08T11:39:34-04:00
---
# Reconferência T-0111: 🔴 A fechado, 🟡 2-4 fechados; 2 🟡 novos (PUT com perfil legado, botão de senha pelo principal) e 3 🟢

## Contexto
Reconferência da T-0111 (entrega R-20261108-110059-modulo-core) sobre o 🔴 A e os 🟡 2-4 da revisão R-20261108-091328. Rodei aqui (pool threads): api/usuarios.test.ts, domain/usuarios.test.ts, domain/acesso-senha.test.ts e api/autenticacao.test.ts, 4 arquivos e 122 testes verdes.

Fechado:
- 🔴 A. usuarios.ts:425-427 usa refsDoUsuario, com todos os vínculos vivos do alvo, e podeRedefinirSenha (domain/acesso-senha.ts:78). Ele recusa SENHA_DE_ADMIN se algum perfil for de base admin. A lista da chave precisa cobrir todos os perfis (pode, alvoCoberto). Nunca a própria conta; alvo inativo é recusado. O buscarParaAlterar trava a linha (for update). Outro tenant dá 404 pela RLS.
- 🟡 2. Editar e desativar já decidem pelo estado real do tenant: carregar(db, true) mais validarAcessoDoTenant.
- 🟡 3. A mensagem do 403 sai do perfil que fecha o app (autenticacao.ts:205).
- 🟡 4. Os apps do e-mail vêm de appsDosPerfis(perfisDoUsuarioNoLogin), em usuarios.ts:311 e :457 e em autenticacao.ts:337.
- Premissa aceita: alvo sem vínculo cai no principal. Depois da 0041 o trigger garantir_perfil_principal sempre cria o vínculo da base principal, então o fallback só vale para dado antigo e é falha fechada.
- Nenhum dado pessoal nos logs novos. O domain continua puro e cita as RN.

## O que preciso / o que mudou
Dois 🟡 novos, que entram antes do build pelo R-20261108-090349:

🟡 1. modules/core/api/usuarios.ts:336-349 (PUT usuarios/:id). O corpo ainda aceita o campo legado `perfil` sem `perfis` (contracts/usuarios.ts:127).
- Nesse caso a API valida um estado e grava outro. O domain simula o alvo só com [perfil novo] (domain/usuarios.ts:124, codigosDepois). Mas a gravação só atualiza core.usuario.perfil, e o trigger garantir_perfil_principal (0041) SOMA a base nova aos vínculos que já existem, sempre que houver mais de um.
- Exemplo: {perfil: 'vendedor'} num [admin, analista] grava [admin, analista, vendedor]. A auditoria registra "perfil admin → vendedor", mas o usuário continua com as ações de admin.
- Correção sugerida: no PUT, trate `perfil` sem `perfis` como `perfis: [perfil]`, passando por perfisEscolhidos, conferirPerfisDoUsuario e gravarPerfisDoUsuario, como o POST já faz em usuarios.ts:284. A outra saída é recusar 422 quando o alvo tem mais de um vínculo.
- Teste: alvo [admin, analista] com {perfil: 'vendedor'} termina em usuario_perfil = [vendedor] (ou 422), e a auditoria bate com o que foi gravado.

🟡 2. modules/core/web/lib/usuarios.ts:124-127, acaoDeSenha. O botão "Redefinir senha" ainda decide só pelo principal (`[{ base: u.perfil }]`).
- Um [analista (principal), admin] mostra o botão, e a API devolve 422 SENHA_DE_ADMIN. Não é furo, porque a API recusa, mas a tela e o servidor divergem.
- Use u.perfis, que o UsuarioItem já traz com a base: `temPerfilDeBase(u.perfis.length > 0 ? u.perfis : [{ base: u.perfil }], 'admin')`.
- Teste em web/lib/usuarios.test.ts.

🟢 3. usuario-perfis.ts:34. O comentário diz "do principal ao fim por código", mas a consulta ordena só por código. Ajuste o texto.
- Também é bom documentar que refsDoUsuario, diferente de perfis_do_usuario, inclui perfil inativo. Para a senha isso é o lado mais restritivo, então está certo; só deixe escrito.

🟢 4. usuarios.ts:427. A recusa de podeRedefinirSenha sai sem `{ regra }`, ao contrário de avaliarAlteracaoDeUsuario. Inclua `regra: 'RN-CORE-35'` (P7) para manter o padrão de 422 com RN.

🟢 5. domain/acesso-senha.test.ts. Falta o caso de perfil personalizado cujo código é diferente da base, que pedi na revisão anterior: alvo [{ codigo: 'vendedor_balcao', base: 'vendedor' }] com um ator de lista ['vendedor'] deve dar USUARIO_SEM_PERMISSAO. O código já cobre o caso, porque refsDoUsuario devolve o código real e alvoCoberto compara por código. Falta só travar isso num teste.

## Pronto quando
Os 🟡 1 e 2 estão corrigidos com teste e lint, typecheck e vitest do core verdes. Responda com --responde-a a este recado. Os 🟢 ficam a seu critério.
