---
id: R-20261107-091304-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0091
responde_a: R-20261107-080049-gerente-projetos
encerra: true
contrato: null
criado_em: 2026-11-07T09:13:04-04:00
---
# Diff do stack-isolado corrigido: sonda por login falso (401 CREDENCIAIS_INVALIDAS); portal na demo: sim, com as 2 chaves no preparar-vm e secret de convite

## Contexto
Resposta ao R-20261107-080049. A sonda antiga não provava o pool: `GET /v1/plataforma/empresas` sem token dá 401 antes de tocar o banco. Corrigi o `docs/desenho/T-0091-stack-isolado.diff`. O `.github` não foi editado. O `git apply --check` passa no working tree de hoje.

## O que mudou no diff
1. **Sondas (demo e produção):** `POST /v1/plataforma/auth/login` com credencial falsa (`sonda-ci@example.com`). Só passa com HTTP 401 e `"codigo":"CREDENCIAIS_INVALIDAS"`. Esse 401 só sai depois de duas coisas: o `config()` do `modules/core/api/super-admin.ts` validar as chaves e o `paraLogin` e o `auditar` rodarem pelas `plataforma.sa_*` no pool do `macuxi_portal`. Qualquer 503 reprova, seja `PORTAL_INDISPONIVEL` ou banco fora, e a mensagem mostra o status e o corpo. Efeito colateral: 1 linha `sa.login.falha` na auditoria do banco efêmero do CI, sem e-mail. O limite do login é 10 por 5 min e a sonda usa 1.
2. **Chaves no CI:** `MACUXI_JWT_SEGREDO_PLATAFORMA` e `MACUXI_CHAVE_TOTP` entram nas listas de variáveis geradas (demo e produção) e na máscara do log. O padrão `*SEGREDO` não pegava `*_SEGREDO_PLATAFORMA`, então o segredo não seria mascarado.
3. **Stack isolado da demo:** sem as chaves da plataforma, o login dá 503 `PORTAL_INDISPONIVEL` e a sonda nova reprovaria, com razão. Por isso o diff inclui um trecho no `scripts/deploy/demo/preparar-vm.sh`, que é meu: duas linhas `acrescentar`, iguais às do preparar-vm da produção (`openssl rand -hex 48` e `openssl rand -base64 32`). Elas são idempotentes e nunca regeneram. A chave do TOTP não pode mudar depois do 1º cadastro. Não apliquei esse trecho direto no script: ele vai junto com o do `.github` num único `git apply`, para a sonda e as chaves entrarem juntas.

## O portal deve funcionar na demo?
**Sim.** A demo é onde o dono do produto mostra o BKO, e o portal é parte dele. Os dados da demo são fictícios e o super-admin fica fora dos tenants (ADR 0029). Hoje o portal na demo está em 503 sem dizer o motivo.
- Com o trecho do preparar-vm, o próximo `demo-publicar` gera as duas chaves no `.env` da VM. Login, TOTP e sessão passam a funcionar. O worker também lê o `.env`, como já acontece na produção, e isso é aceitável porque o worker não abre sessão de super-admin sem o pool do portal.
- **1º acesso:** sim, precisa de um convite. `primeiroAcesso` chama `config(true)`, que exige `MACUXI_SUPERADMIN_CONVITE` com 32 caracteres ou mais. Sem ele, dá 503. Proposta, que mexe no `.github` e por isso fica para depois do ok: secret opcional `DEMO_SUPERADMIN_CONVITE` no environment `DEMO_SSH_KEY`. O `demo-publicar.yml` o grava no `segredos.env` da VM (a api já lê esse arquivo), do mesmo jeito que o `producao-publicar.yml` faz com o `PROD_SUPERADMIN_CONVITE`. O dono do produto escolhe o valor e o usa uma vez só, porque depois do 1º super-admin a rota responde 410. Não recomendo gerar o convite na VM: ninguém o leria sem SSH.
- Se a resposta for "não", basta tirar da proposta o trecho do preparar-vm e a sonda da demo. A sonda da produção fica.

## Pronto quando
O diff está em `docs/desenho/T-0091-stack-isolado.diff`. Falta a decisão do dono do produto sobre aplicar o diff e criar o secret `DEMO_SUPERADMIN_CONVITE`.
