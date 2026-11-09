---
id: R-20261107-100951-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:09:51-04:00
---
# T-0091: portal na demo — chaves geradas no preparar-vm da demo, diff do demo-publicar (DEMO_SUPERADMIN_CONVITE), rota config-demo.

## Contexto
T-0091, portal de implantação na demo (R-20261107-103434, item 2).

## O que fiz
1. **Já aplicado nos scripts (meus caminhos):**
   - `scripts/deploy/demo/preparar-vm.sh` gera `MACUXI_JWT_SEGREDO_PLATAFORMA` (hex 48) e `MACUXI_CHAVE_TOTP` (base64 de 32 bytes) no `/opt/macuxi/.env`. A regra é a mesma da produção: o `acrescentar` grava uma vez e nunca regenera, o arquivo fica em modo 600 e o log mostra só o nome da variável. O `portal.env` continua só com a senha do `macuxi_portal`.
   - `scripts/deploy/demo/compose.yml`: a api já recebia o `.env` (chaves) e o `segredos.env` (convite). Atualizei os comentários e a lista de rotas, que agora inclui `config-demo.`. Não mudei nenhum serviço.
   - `scripts/deploy/demo/implantar.sh` ganhou a conferência "portal". Ela vê se as duas chaves existem e mede só o tamanho do convite, sem ler o valor. Avisa com `::warning::` se faltar chave ou se o convite tiver menos de 32 caracteres. Sem convite, escreve só uma linha de log, sem warning, para o stack-isolado continuar verde.
2. **Governança (.github não editado):**
   - `docs/desenho/T-0091-demo-portal.diff` (novo): o `demo-publicar.yml` lê `secrets.DEMO_SUPERADMIN_CONVITE` (environment `DEMO_SSH_KEY`) e, se o secret existir, grava `MACUXI_SUPERADMIN_CONVITE` no `segredos.env` pelo stdin, como a produção. Também confere `https://config-demo.macuxifdv.com.br/entrar`, só com warning.
   - `docs/desenho/T-0091-stack-isolado.diff`: tirei o trecho do `preparar-vm.sh`, que já foi aplicado, e atualizei o cabeçalho.
   - `git apply --check` passa nos dois, juntos ou separados.
3. **Endereço:** `config-demo.macuxifdv.com.br` → `http://bko:3100` no túnel `macuxi-demo-nuvem`. Tem um nível de subdomínio só, porque o certificado universal não cobre `config.demo.`.
   - O apps/web **não** reconhece esse host: `apps/web/lib/portal.ts:17` só aceita o prefixo `config.`, e falta o host em `HOSTS_DO_BKO_PADRAO`.
   - Mandei o pedido ao engenheiro-apps (R-20261107-100839), junto com o texto do convite na tela de 1º acesso, que hoje só cita o PROD_.
4. **Texto para o dono do produto:** R-20261107-100925.
5. **Desenho:** `docs/desenho/T-0091.md` §9.

## Testes
- `bash -n` nos três scripts: ok.
- `tests/integracao/demo/alerta-saude-t0078.test.ts`: 3/3 verdes. É o único teste dos scripts de deploy.
- `node scripts/coord.mjs verificar engenheiro-software`: as únicas violações são os 4 anexos de `.coord/recados/anexos/`, que não são meus.
- Sem Docker e sem SSH.

## Pendências
1. O dono do produto cria o secret, dá o ok nos dois diffs e cria a rota.
2. O engenheiro-apps faz o R-20261107-100839.
3. Você aplica os diffs e publica a demo.

Premissas:
- As chaves ficam no `.env`, e não no `portal.env`, pela regra da produção. O worker também lê o `.env`, como na produção.
- O convite vai no `segredos.env`, que também chega ao backup, ao seed e ao worker, como na produção. Ele só serve para o 1º acesso.

## Pronto quando
O login do super-admin abre em config-demo sem 503 e o 1º acesso com convite e TOTP funciona.
