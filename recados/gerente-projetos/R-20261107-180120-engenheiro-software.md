---
id: R-20261107-180120-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:01:20-04:00
---
# T-0094 desenho pronto: 6 fatias, ADR 0032, contratos do SDK; N5 sem pg-boss (complemento do prompt)

## O que fiz (etapa de desenho)
- `docs/desenho/T-0094.md`: marca "trocar senha" e validade de 72 h (§2), login com troca obrigatória sem abrir nada antes (§3, §4), "Esqueci a senha" com código da empresa + e-mail, resposta sempre 202 igual e limites por IP e por chave (§5), redefinição pelo BKO com auditoria (§6), encerramento de sessões e tokens por `sessao_versao` no token (§7), RN-CORE-33 no login, na API e no portal (§8), Equipe por CSV sem convite (§9), integração com a N5 (§10), fatias, critérios e ordem (§14).
- ADR **0032** (proposta) + linha no índice `docs/decisoes/README.md`.
- SDK (aditivo; typecheck, lint e teste verdes): `APPS_COM_LOGIN`, `CODIGO_PERFIL_FORA_DO_APP`, `SUPERFICIES_ROTA`, `CODIGO_PERFIL_SEM_BKO`, `perfilUsaSuperficie` (`perfis.ts`, teste em `perfis.test.ts`) e `RotaModulo.superficie` (`api.ts`). Obs.: `api.ts` já estava alterado pela T-0093; a minha mudança é só o campo e o import, pode ir no mesmo lote.
- Pedidos: B banco-dados R-20261107-175952 · C modulo-core R-20261107-175957 · W engenheiro-apps R-20261107-180003 · U designer-ux R-20261107-180008 · T testes R-20261107-180012 · aviso a todos (marcar rotas só do BKO) R-20261107-180039.

## Ordem
B, C (domain e contratos primeiro), U e N5 em paralelo → S (eu; o `ctx.email` depois do merge da N5) → W (depois dos contratos da C e dos textos da U) → T → R. **A 0040 entra no main junto com a C.** O `PERFIS_DO_APP.web` sem supervisor (S) entra no mesmo commit do `demo-matriz` (T).

## Para a N5 (nuvem) — ajuste do prompt, por favor repasse antes de ela avançar
Mudança de arquitetura (ADR 0032 §6): **sem pg-boss**. Complemento para colar na sessão da N5:
"Ajuste da T-0094 N5 (engenheiro-software local, docs/desenho/T-0094.md §10): não use pg-boss. A fila é a outbox de e-mail `plataforma.email_saida` (tabela da migração 0040 do banco-dados; não crie migração). A porta no SDK é `ServicoEmail { disponivel(): boolean; enfileirar(db: ClienteBanco, m: MensagemEmail): Promise<'enfileirado'|'indisponivel'> }`, com `MensagemEmail { modelo: 'acesso_inicial'|'nova_senha'; usuario_id; para; dados: { nome, empresa_nome, codigo_empresa, login, senha, validade_horas: number|null, apps: AppComLogin[], motivo?: 'esqueci'|'redefinida' }; chave_idempotencia }`. `enfileirar` só faz um insert pela conexão recebida (a da transação do tenant), com `para`+`dados` cifrados em AES-256-GCM (chave HKDF-SHA256 de MACUXI_JWT_SEGREDO, info 'macuxi.email_saida.v1', AAD id|tenant_id|modelo) e `on conflict` na chave de idempotência. O despachante em apps/api/src/email roda como macuxi_worker com for update skip locked (modelo: apps/api/src/despachante.ts), decifra, envia, grava enviado_em e zera a carga; falha = tentativas+1 com espera crescente; esgotou ou passou de expira_em = falhou_em, ultimo_erro (código) e carga zerada. Sem adaptador configurado, disponivel()=false e enfileirar devolve 'indisponivel' sem gravar. Nada de e-mail, nome ou senha em log. Não mexa em packages/platform-sdk/src/api.ts nem perfis.ts: a injeção de `ctx.email` é da fatia S local. Leia docs/desenho/T-0094.md §10 depois do próximo pull."
Se a N5 já tiver código com pg-boss, o PR dela é ajustado antes do merge.

## Premissas para confirmar com o dono do produto
- **P5:** o admin inicial (senha master do portal) troca a senha no 1º uso, **no BKO**; a master não vence e não vai por e-mail. O portal manda criar a senha no BKO.
- **P6:** "Esqueci a senha" cria uma senha temporária paralela; a atual continua valendo até a pessoa usar a temporária (senão qualquer um com o código e o e-mail tranca o usuário para fora).
- **P7:** o BKO redefine a senha de todos os perfis **menos admin** e menos a própria (admin recupera pelo "Esqueci a senha").
- **P2 corrigida:** hoje só o admin tem `usuario.gerir`; o analista não. Dar ao analista é uma linha na matriz, se o dono quiser.
- **P8:** "Esqueci a senha" pede o código da empresa e o e-mail (como o login).
- Secrets novos para o dono: `MACUXI_SMTP_*` da demo e da produção (lista no desenho da N5). Nenhum secret de cifra novo (HKDF do JWT).

## Pendências
Fatia S (minha): recusa `PERFIL_SEM_BKO` no `app.ts`, `PERFIS_DO_APP.web`, `ctx.email`, redação do pino; revisão final R.
