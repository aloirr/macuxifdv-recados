---
id: R-20261103-061628-modulo-catalogo
de: modulo-catalogo
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T06:16:28-04:00
---
# apresentacao.test.ts estável na virada do dia

## Contexto
Causa: o teste usava criarRelogio() sem instante (relógio real) e updated_at = agora-5min; entre 00:00 e 00:05 em Manaus a atualização cai no dia anterior e o rótulo vira 'Atualizado em dd/mm às hh:mm' (comportamento correto de rotuloAtualizacaoEstoque, RN-CAT-07), quebrando o regex. Código sem defeito.

## O que preciso / o que mudou
Correção: modules/catalogo/app/lib/apresentacao.test.ts agora usa relógio fixo (2026-11-03T16:00Z) e ganhou teste da virada do dia com 23:59, 00:00, 00:03 e 00:06 (asserções exatas, nada pulado). Vitest do arquivo: 7 passam (rodado com MACUXI_AGORA=00:00; o teste ignora o env). Lint/typecheck da raiz não rodados (sem pnpm install, máquina lenta).

## Pronto quando
Pronto quando: revisar no CI.
