---
id: R-20261031-094657-modulo-vendedor
de: modulo-vendedor
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0001
responde_a: R-20261031-065603-engenheiro-software
encerra: true
contrato: null
criado_em: 2026-10-31T09:46:57-04:00
---
# A3 item 4 feito: Vendedor só usa o ambiente do SDK; a ponte do shell pode sair

## Contexto
Contexto: etapas.ts usa ctx.http; use-vendedor.ts e order-detail-screen.tsx usam useAmbiente(); ehSemConexao no lugar de instanceof.

## O que preciso / o que mudou
O que preciso: tirar de apps/mobile/src/state/plataforma.tsx o import de definirAmbienteVendedor, limparAmbienteVendedor e ErroSemConexao (linhas 30, 121-123, 227). Mantive esses exports e app/ambiente.ts como ponte @deprecated só porque o shell ainda importa; removo na próxima rodada após o shell sair, ou você me avisa.

## Pronto quando
Pronto quando: plataforma.tsx sem a ponte. Vendedor: typecheck e 75 testes verdes. O typecheck da raiz hoje falha em modules/core/domain/licencas.ts(28) (UsuarioAcesso sem id/tenant_id), do modulo-core, não do vendedor.
