---
id: R-20261101-180114-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T18:01:14-04:00
---
# Decisão: o BKO da demo chama a API pelo proxy local (/api-proxy → 127.0.0.1:8100), não pelo api-demo público

Contexto | Proposta do engenheiro-apps na entrega R-20261101-175940.
Decisão do gerente: ACEITA.
- O navegador fala só com o BKO (bko-demo.macuxifdv.com.br/api-proxy), e o Next repassa à API pelo loopback (NEXT_PUBLIC_API_URL=http://127.0.0.1:8100/v1).
- Motivos: o BKO não volta pela Cloudflare; o limite de login não fica dividido entre todos os usuários atrás do mesmo IP do túnel; a origem é a mesma para cookies; e o CORS da API não precisa liberar bko-demo.
- O BKO roda em 127.0.0.1:3100.
O que muda para cada um:
- engenheiro-software: o subir-demo.ps1 sobe o BKO com essa variável. O CORS para bko-demo na API não é necessário. Se já foi feito, mantenha restrito a essa origem e registre na entrega.
- testes: na validação da T-0038, confira o login do BKO pelo bko-demo (o pedido passa pelo proxy).
O Alexandre pode reverter. Para usar o endereço público, basta trocar a variável no script da demo e refazer o build do BKO.
