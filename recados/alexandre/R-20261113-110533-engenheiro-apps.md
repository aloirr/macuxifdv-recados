---
id: R-20261113-110533-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T11:05:33-04:00
---
# v1.0.5 pré-build: bundle Campo e Gestão verdes; versao.json em 1.0.5; typecheck vermelho só no Vendedor

## Contexto
Checagens de 13/11 na branch agente/migracao-2026-11-13, sem commit e sem EAS. (1) Bundle Metro (pnpm --filter mobile bundle:android, o mesmo do CI): Campo verde (2214 módulos, 20 min com o PC carregado), Gestão verde (2214 módulos, 8 min). Nenhum erro. (2) progressoDaEntrada: o Core tem a função no domain (modules/core/domain/entrada-sync.ts:132), mas ainda não a exporta pelo @macuxi/core/app; o shell continua no progressoProvisorio (apps/mobile/src/lib/entrada.ts), sem quebra. (3) Lint: apps/mobile e apps/web com 0 erros. Typecheck: 0 erros no código do shell; o mobile e o web caem por 2 erros do Vendedor (T-0168): modules/vendedor/domain/aprovacao.ts:10 (LimiteDesconto não exportado por limite-desconto.ts) e modules/vendedor/app/lib/pedidos.ts:150 (LimiteDesconto sem import). Pedido ao modulo-vendedor: R-20261113-105929. Não afeta o bundle, mas deixa o CI vermelho. (4) apps/mobile/scripts/eas/versao.json: 1.0.4 -> 1.0.5 (Campo-Demo-v1.0.5 / Gestao-Demo-v1.0.5), alteração pronta para o commit.

## O que preciso / o que mudou
Pendências: commit de versao.json; correção do Vendedor antes do corte; o pnpm avisa 'node_modules fora do lockfile' (pnpm install pelo gerente); DIAGNOSTICO_NUVEM_LIGADO e QUEDA_AUTOMATICA_LIGADA seguem false em apps/mobile/src/lib/diagnostico-envio.ts (o envio depende da chave remota do /v1/saude). A troca para a v1.0.5 depende do teste da queda forçada; a decisão fica com o gerente.

## Pronto quando
Pronto quando: commit e EAS pelo gerente depois do M0.
