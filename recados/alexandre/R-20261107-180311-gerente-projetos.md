---
id: R-20261107-180311-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:03:11-04:00
---
# T-0094: cole o complemento na sessão N5; confirme P2, P5–P8; qual provedor de e-mail (SMTP)

## Contexto
O desenho da T-0094 está pronto (docs/desenho/T-0094.md e ADR 0032, proposta). A fatia B (banco, migração 0040) já começou. Preciso de três coisas suas.

1) N5 NA NUVEM: COLE ESTE COMPLEMENTO na sessão da N5. Se ela ainda não foi aberta, cole junto com o prompt do R-20261107-165654.
Motivo: a fila deixa de ser o pg-boss, que não está instalado e não grava na mesma transação da senha. Ela passa a ser uma tabela de saída de e-mail, gravada na mesma transação.
"Ajuste da T-0094 N5 (engenheiro-software local, docs/desenho/T-0094.md §10): não use pg-boss. A fila é a outbox de e-mail plataforma.email_saida (tabela da migração 0040 do banco-dados; não crie migração). A porta no SDK é ServicoEmail { disponivel(): boolean; enfileirar(db: ClienteBanco, m: MensagemEmail): Promise<'enfileirado'

## O que preciso / o que mudou
'indisponivel'> }, com MensagemEmail { modelo: 'acesso_inicial'

## Pronto quando
'nova_senha'; usuario_id; para; dados: { nome, empresa_nome, codigo_empresa, login, senha, validade_horas: number | null, apps: AppComLogin[], motivo?: 'esqueci' | 'redefinida' }; chave_idempotencia }. enfileirar só faz um insert pela conexão recebida (a da transação do tenant), com para+dados cifrados em AES-256-GCM (chave HKDF-SHA256 de MACUXI_JWT_SEGREDO, info 'macuxi.email_saida.v1', AAD id | tenant_id | modelo) e on conflict na chave de idempotência. O despachante em apps/api/src/email roda como macuxi_worker com for update skip locked (modelo: apps/api/src/despachante.ts), decifra, envia, grava enviado_em e zera a carga; falha = tentativas+1 com espera crescente; esgotou ou passou de expira_em = falhou_em, ultimo_erro (código) e carga zerada. Sem adaptador configurado, disponivel()=false e enfileirar devolve 'indisponivel' sem gravar. Nada de e-mail, nome ou senha em log. Não mexa em packages/platform-sdk/src/api.ts nem perfis.ts: a injeção de ctx.email é da fatia S local. Leia docs/desenho/T-0094.md §10 depois do próximo pull."

2) PREMISSAS PARA CONFIRMAR. Se não responder, seguimos assim:
- P2 (corrigida): hoje só o admin cria usuários e redefine senhas no BKO; o analista não. Dar ao analista é uma linha.
- P5: o admin inicial (a senha master do portal) troca a senha no 1º uso, no BKO. A senha master não vence e não vai por e-mail.
- P6: "Esqueci a senha" cria uma senha temporária paralela, e a atual continua valendo até a pessoa usar a temporária. Assim, quem só sabe o código da empresa e o e-mail não consegue trancar o usuário para fora.
- P7: o BKO redefine a senha de todos os perfis, menos a do admin e a própria. O admin recupera a dele pelo "Esqueci a senha".
- P8: "Esqueci a senha" pede o código da empresa e o e-mail, como o login.

3) SECRETS DE E-MAIL. O envio real precisa de um servidor SMTP (MACUXI_SMTP_*: host, porta, usuário, senha, remetente). A lista exata vem no desenho da N5.
- Sem eles, nada quebra: o sistema não envia e avisa "indisponível". A demo pode usar o adaptador de arquivo para testar.
- Para o e-mail chegar de verdade na demo, diga qual provedor quer: o SMTP do seu domínio, Brevo, Amazon SES ou outro.
- Nenhum secret de cifra novo: a chave sai da que já existe.
