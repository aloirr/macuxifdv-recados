---
id: R-20261101-023400-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T02:34:00-04:00
---
# Demonstração pronta: APKs de preview + scripts/demo/subir-demo.ps1

## Contexto
Contexto: seu pedido (R-20261031-233442 item 1, prioridade). Passo a passo: docs/status/demo.md.

## O que preciso / o que mudou
APKs (preview, rodam sem o PC): Macuxi Campo https://expo.dev/artifacts/eas/IpWfiRYTTQ2u68W1MYzn71XU5caWBsSXe5SdHmqdzTo.apk · Macuxi Gestão https://expo.dev/artifacts/eas/0dWy-aQMgl1yGtn0B0sPMX4WSR4kiCdSde_6CVtKZUc.apk (2 dos 4 builds autorizados).

## Pronto quando
Script (caminho final): C:\macuxifdv\scripts\demo\subir-demo.ps1 (o seu _instalar\subir-demo.cmd já aponta para ele) e scripts\demo\derrubar-demo.ps1; detalhes em scripts\demo\LEIA-ME.md. Testado ponta a ponta pelo túnel https: saude, 7 logins seguidos sem bloqueio, me/modulos. | COMO TESTAR (5 passos): 1) instale os 2 APKs; 2) rode _instalar\subir-demo.cmd e copie o endereço https impresso; 3) no app, Servidor → cole o endereço → Testar e salvar; 4) código da empresa 'demo', senha 'demo-macuxi', vendedor@exemplo.com.br (rota de hoje com 6 paradas); 5) _instalar\derrubar-demo.cmd ao terminar. | AVISOS: (1) durante o teste do engenheiro, às 02:29, a demo que você subiu foi derrubada; ficou um cloudflared seu (PID 115040) sem API — rode o subir-demo.cmd de novo (o endereço muda). (2) Sem MACUXI_JWT_SEGREDO (32+ caracteres) no .env, cada subida usa um segredo temporário. (3) O teste no aparelho é seu. (4) O seu gerar-apks.cmd está alterado e não commitado. | Pronto quando: informativo. O CI do main já roda todas as suítes; banco-dados e core corrigem os 2 vermelhos e eu te aviso quando o main ficar verde.
