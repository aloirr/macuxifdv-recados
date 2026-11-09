---
id: R-20261107-100925-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T10:09:25-04:00
---
# Portal na demo: texto pronto para o dono do produto (secret DEMO_SUPERADMIN_CONVITE, rota config-demo., ordem)

## Contexto
R-20261107-103434, item 2: o portal de implantação vai funcionar na demo. A parte dos scripts está pronta: o `scripts/deploy/demo/preparar-vm.sh` gera as chaves da plataforma na VM. Faltam três coisas que nenhum agente faz: o secret, o ok nos diffs de governança e a rota no túnel. Falta também um ajuste no apps/web, que pedi ao engenheiro-apps (R-20261107-100839). Nenhum agente cria nem lê o valor do convite.

## O que preciso
Repasse ao dono do produto o texto abaixo, sem mudar nada:

---
**Portal de implantação na demo: o que você faz (uns 10 minutos)**

1. **Gere o convite no seu PC.** No Git Bash, rode:
   `openssl rand -base64 48`
   - O comando imprime uma linha de 64 caracteres. O código exige 32 ou mais.
   - Copie a linha inteira, sem espaços e sem quebra de linha.
   - Guarde a linha no seu cofre de senhas: você vai digitá-la no 1º acesso.
   - Não mande o valor a ninguém, nem a um agente.

   Se não tiver o Git Bash, use o PowerShell:
   `[Convert]::ToBase64String([Security.Cryptography.RandomNumberGenerator]::GetBytes(48))`

2. **Crie o secret no GitHub.** Abra Settings → Environments → **DEMO_SSH_KEY** → Add environment secret.
   - Nome exato: **`DEMO_SUPERADMIN_CONVITE`**
   - Valor: a linha do passo 1.
   - Crie no environment DEMO_SSH_KEY, o mesmo dos outros secrets da demo (DEMO_SSH_KEY, DEMO_S3_*). Não crie como secret de repositório.

3. **Dê o ok nos dois diffs de governança (.github).** O gerente aplica os diffs e publica depois do seu ok.
   - `docs/desenho/T-0091-demo-portal.diff`: o "demo — publicar" passa a ler o secret e a gravá-lo na VM (modo 600). A produção já faz isso com o PROD_SUPERADMIN_CONVITE. O diff também confere o endereço do portal.
   - `docs/desenho/T-0091-stack-isolado.diff`: as conferências do CI para o papel do portal. Este diff você já viu.

4. **Crie a rota no túnel.** No painel da Cloudflare, abra Zero Trust → Networks → Tunnels → **macuxi-demo-nuvem** → Public Hostname → Add.
   - Subdomain: **`config-demo`**
   - Domain: `macuxifdv.com.br`
   - Service: **HTTP**, URL **`bko:3100`**, o mesmo serviço do bko-demo.
   - O endereço fica `config-demo.macuxifdv.com.br`.
   - Não use `config.demo`. O certificado gratuito da Cloudflare não cobre dois níveis de subdomínio.

5. **Publique a demo.** Espere o gerente avisar que os diffs e o ajuste do apps/web entraram. Então abra Actions → "demo — publicar" → Run workflow, no `main`.
   Confira no log do workflow:
   - "config-demo: ok (portal)";
   - "portal: chaves da plataforma ok";
   - "portal: convite do 1º acesso presente".

6. **Faça o 1º acesso.** Abra `https://config-demo.macuxifdv.com.br/` e clique em Primeiro acesso.
   1. Preencha o e-mail, o nome, a senha (12 caracteres ou mais) e o código de convite do passo 1.
   2. Cadastre o TOTP: leia o QR no app autenticador e digite o código de 6 dígitos.
   3. Guarde os códigos de recuperação.

   Depois do 1º cadastro, o primeiro acesso se fecha.

**Ordem:** secret → ok nos diffs → rota no túnel → publicar a demo → 1º acesso. A rota pode ser criada a qualquer momento antes do passo 6.

Depois do 1º acesso, você pode apagar o secret `DEMO_SUPERADMIN_CONVITE`. Ele só vale para o 1º acesso, e a próxima publicação tira o convite da VM.
---

## Pronto quando
1. O dono do produto confirmou o secret, deu o ok nos dois diffs e criou a rota `config-demo` no túnel.
2. Você aplicou os diffs com `git apply` dos dois arquivos. O `git apply --check` passa nos dois, juntos ou separados.
3. O engenheiro-apps entregou o R-20261107-100839, e você publicou a demo.

Critério final: o login do super-admin abre em `config-demo.macuxifdv.com.br` sem 503, e o 1º acesso com convite e TOTP funciona.
