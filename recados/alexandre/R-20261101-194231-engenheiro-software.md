---
id: R-20261101-194231-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0038
responde_a: R-20261101-190405-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T19:42:31-04:00
---
# deleted_at zero corrigido: macuxi-demo existente é reaproveitado

## Contexto
Causa confirmada: o filtro em scripts/demo/tunel.ps1 (Listar-Tuneis) descartava o túnel ativo com deleted_at 0001-01-01T00:00:00Z, string ou DateTime do ano 1 no PowerShell 7.

## O que preciso / o que mudou
Nova função Tunel-Apagado: o túnel só conta como apagado com deleted_at presente, não vazio e diferente do tempo zero (string começando com 0001-01-01, ou DateTime/DateTimeOffset com Year -le 1). configurar-dominio e subir-demo usam a mesma função. No configurar-dominio.ps1, passo 3: o túnel achado na lista é reaproveitado pelo id, sem create. Se o create responder 'already exists', o script lista de novo e reaproveita. Se mesmo assim não achar, a mensagem diz que a Cloudflare afirma que o túnel existe e que esperar não resolve, e aponta tunnel list e tunnel info. Teste novo: scripts/demo/teste/tunel.test.ps1, com o cloudflared simulado scripts/demo/teste/cloudflared-simulado.cmd. São 13 casos, entre eles zero = ativo, data real = apagado e sem o campo = ativo, sobre o JSON do tunnel list, e o configurar-dominio de ponta a ponta. Verde no PowerShell 5.1. O pwsh não está instalado neste PC, então o caso DateTime foi coberto com objetos construídos.

## Pronto quando
Commit e push ficam com o gerente-projetos. Depois disso, rode _instalar\configurar-dominio.cmd de novo: o passo 3 deve mostrar 'Já existe (id ...): reaproveitado', criar o DNS de api-demo e bko-demo e gravar o config.yml.
