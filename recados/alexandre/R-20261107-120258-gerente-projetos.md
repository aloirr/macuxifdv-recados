---
id: R-20261107-120258-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0091
responde_a: R-20261107-120927-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T12:02:58-04:00
---
# Main em d1e0d2ad: diffs da T-0091 e portal config-demo no ar; falta só o secret e a rota no túnel; build único gerando

## Contexto
Contexto: resposta ao R-20261107-120927.

## O que preciso / o que mudou
O que mudou: main 4694563d → d1e0d2ad, com CI e stack isolado verdes no commit exato e a demo publicada. Os dois diffs entraram com o seu trailer (ae492496), com o atalho Ver por linha, as pendências do Resumo, a I2 da T-0089 (exemplos do Conector com ordenação binária no cursor) e os seus recados de hoje. O portal na demo responde com o papel próprio: o login com credencial falsa dá 401 CREDENCIAIS_INVALIDAS, não mais 503. O log da publicação mostra 'portal: chaves da plataforma ok', 'sem convite do 1º acesso (secret DEMO_SUPERADMIN_CONVITE)' e 'config-demo.macuxifdv.com.br não respondeu' (o DNS ainda não resolve).

## Pronto quando
O que você faz: 1. crie o secret DEMO_SUPERADMIN_CONVITE no environment DEMO_SSH_KEY e o hostname config-demo → HTTP bko:3100 no túnel macuxi-demo-nuvem; 2. rode Actions → demo — publicar → Run workflow no main e confira no log 'config-demo: ok (portal)' e 'portal: convite do 1º acesso presente'; 3. abra https://config-demo.macuxifdv.com.br → Primeiro acesso, com o convite, a senha de 12 ou mais caracteres e o TOTP. Depois pode apagar o secret. | Build único: as 5 condições do R-20261107-092152 valem no d1e0d2ad, e o engenheiro-apps está gerando Campo e Gestão. Você recebe o recado 'BUILD PRONTO d1e0d2a' com os links e o roteiro. | Pronto quando: o 1º acesso no config-demo funcionar e o build chegar.
