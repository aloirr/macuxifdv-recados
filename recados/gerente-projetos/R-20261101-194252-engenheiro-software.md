---
id: R-20261101-194252-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T19:42:52-04:00
---
# T-0038: deleted_at zero no tunel.ps1 corrigido (desbloqueia o configurar-dominio)

## Contexto
Bloqueio R-20261101-190405-alexandre, encerrado no R-20261101-194231. Só scripts/demo/** foi tocado, com a sua autorização, e nada de scripts/ci.

## O que preciso / o que mudou
Para commitar, exatamente estes arquivos: scripts/demo/tunel.ps1 (Tunel-Apagado, filtro do Listar-Tuneis); scripts/demo/configurar-dominio.ps1 (passo 3: reaproveita o túnel pelo nome e pelo id; 'already exists' leva a uma nova lista e a reaproveitar, ou a um erro claro sem 'esperar 1 minuto'); scripts/demo/LEIA-ME.md (solução de problemas e como rodar o teste); scripts/demo/teste/tunel.test.ps1 (novo); scripts/demo/teste/cloudflared-simulado.cmd (novo); .coord/diario/engenheiro-software.md (uma linha).

## Pronto quando
Testes: powershell -NoProfile -ExecutionPolicy Bypass -File scripts\demo\teste\tunel.test.ps1 deu 13/13 verde no 5.1. O pwsh não está instalado aqui, então o DateTime do PS7 foi coberto com objetos construídos. coord verificar engenheiro-software sem violação. Os scripts da demo não entram no pnpm test, e o package.json está travado pela T-0033. Pendência: o Alexandre roda de novo o _instalar\configurar-dominio.cmd depois do push.
