---
id: R-20261107-192039-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T19:20:39-04:00
---
# Revisão final T-0093 + Core da T-0095: 🔴 typecheck da raiz (T-0094 pela metade nos contracts) e mistura com a 0040; portal 🟢; T-0095 com 3 🟡

Contexto: revisão final da T-0093 (fatia R) e da parte do Core da T-0095 que entra no mesmo lote (aviso R-20261107-182829-gerente-projetos). Portal (modules/core/domain/senha.ts, domain/super-admin.ts, api/super-admin.ts, seguranca-plataforma.ts, super-admin-repositorio.ts, contracts/plataforma.ts): 🟢 sem achados que bloqueiem. Conferi: mesma resposta e mesmo número de conferências para e-mail inexistente e senha errada; 423 antes de tudo e também para e-mail inexistente; chave HMAC do e-mail normalizado; precedência do super-admin; lista só com as empresas que conferiram; token sem typ recusado; tid/sub batem com a sessão viva; nada de e-mail, senha ou token em log nem em auditoria; listarEmpresas lendo razao_social (R-20261107-165858) ok.

O que preciso:
🔴 1. Typecheck da raiz vermelho no @macuxi/core: modules/core/web/lib/usuarios.test.ts:5 — o UsuarioItem de teste não tem trocar_senha, senha_expira_em e sem_senha, que o contracts/usuarios.ts passou a exigir (T-0094, em andamento). Ou o teste ganha os três campos, ou a mudança do contrato sai do working tree até a T-0094 fechar. E no typecheck do apps/api (que compila o Core): modules/core/api/convite-aceite.ts:10, :34, :66, :68, equipe-csv.ts:17-19, :136, :163, :259-260 e api/index.ts:13 usam AceitarConviteRequest(Schema), AceitarConviteResposta, RenovarConviteRequestSchema, UsuarioConviteParamsSchema, ConviteEmitido, CODIGOS.conviteInvalido/senhaFraca/usuarioSemConvite, que saíram dos contracts (a T-0094 tirando o convite da Equipe pela metade). Isso segura o lote da T-0093.
🔴 2. Mistura da T-0094 no working tree: modules/core/api/autenticacao.ts, repositorio.ts, seguranca.ts, email.ts (novo), contracts/usuarios.ts, manifest.ts e domain/matriz.ts já leem ou gravam colunas da 0040 (trocar_senha, sessao_versao, email_saida). Sem a 0040 no mesmo commit, o login do BKO quebra (coluna inexistente). Diga ao gerente, por arquivo, o que é T-0094 e se dá para separar; se não der, o lote espera a T-0094 (fatias B e C) e a minha revisão dela.
🟡 3. T-0095, modules/core/api/consumidores-erp-vendedor.ts:25 e :64 (avisarDesligadoNoBko): a notificação é idempotente só por evento_id; cada carga nova do ERP (completa ou periódica) que traz o vendedor desligado como ativo gera um aviso novo para TODOS os admins. Avise uma vez por desligamento (ex.: só quando o erp_alterado_em muda, ou marque o aviso dado) e teste com duas cargas.
🟡 4. T-0095, consumidores-erp-vendedor.ts:74 (adoção por e-mail) e :81 (on conflict): o usuário sem external_id adotado ganha ativo = true sem olhar desligado_no_bko_em; um vendedor desligado no BKO volta ativo pela adoção. Use decidirReativacaoDoErp também aqui (e no on conflict do insert).
🟡 5. T-0095, inativado (consumidores-erp-vendedor.ts:44, consumidores-erp.ts:42, consumidores-erp-produto.ts:28): grava erp_alterado_em com o ocorrido_em do Hub (relógio do Hub) e compara depois com o alterado_em do ERP (relógio do ERP). Com relógios defasados, uma atualização real do ERP logo depois da inativação pode ser ignorada. Registre o risco no doc do consumidor (RN-INT-02) ou não avance o erp_alterado_em quando a data vier do ocorrido_em.
🟢 6. A coluna é timestamptz(3): o alterado_em com microssegundos é arredondado no banco e o Date.parse trunca; a reentrega do MESMO evento pode cair em ignorar_antigo (inofensivo: mesmos dados). Só para saber.
Fronteira da T-0095: ok (o consumidor grava só em core.*, lê o contrato da Integração e notifica pelo Core).

Pronto quando: 🔴 1 e 2 resolvidos (typecheck da raiz verde e o lote sem dependência da 0040, ou com a T-0094 completa); 🟡 3 a 5 corrigidos com teste ou com a decisão registrada.
