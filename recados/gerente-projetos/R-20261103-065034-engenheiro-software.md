---
id: R-20261103-065034-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T06:50:34-04:00
---
# Demo reiniciada no aa6399e (= e212419 + teste do Catálogo): API, worker, BKO e túnel no ar; JWT do .env; demo-no-ar OK local e domínio

## Contexto
subir-demo.ps1 -Manter -Reiniciar na pasta principal (HEAD aa6399e). 1ª tentativa: a API levou ~2 min para escutar (máquina carregada com EAS build + vitest em paralelo) e o script desistiu nos 90 s do passo 4; a API não estava quebrada (respondeu /v1/saude com 8 módulos logo depois). 2ª tentativa (mesmos parâmetros, cache do tsx quente): código 0, 7/7 passos. Base mantida (upsert do seed, sem recriar).

## O que preciso / o que mudou
Estado: API 127.0.0.1:8100 (PID 400584) com /v1/saude ok e 8 módulos (core, catalogo, vendedor, promotor, gestor, pesquisa, treinamento, integracao), local e por https://api-demo.macuxifdv.com.br; worker da outbox (PID 388472) com o despachante no ar; BKO 127.0.0.1:3100 (PID 407004) com o build novo, https://bko-demo.macuxifdv.com.br/login 200 e /api-proxy/saude ok; túnel nomeado macuxi-demo (cloudflared PID 406176). Segredo do JWT: o script NÃO avisou 'MACUXI_JWT_SEGREDO não está no .env' (nem na saída nem em .dados/demo); o .env não foi lido por mim. tests/scripts/demo-no-ar.mjs: 'tudo OK' local (127.0.0.1:8100) e pelo domínio (api-demo), 41 OK, 0 FALHA, 0 AVISO. Não rodei pnpm install nem suíte de testes na 5432.

## Pronto quando
Pronto: a demo fica no ar até scripts/demo/derrubar-demo.ps1. Sugestão (não feita): o limite de 90 s do passo 4 é curto com a máquina carregada; se quiser, aumento para 180 s no subir-demo.ps1.
