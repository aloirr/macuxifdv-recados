---
id: R-20261109-174312-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0141
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T17:43:12-04:00
---
# Build v1.0.2: teste da versão no eas.test.ts sem travar o número

## Contexto
O CI falhou em apps/mobile/scripts/eas/eas.test.ts (expected '1.0.2' to be '1.0.1') depois da troca do versao.json para 1.0.2.

## O que preciso / o que mudou
Feito: o caso fixo virou dois — (1) versao.json em X.Y.Z, versaoAtual() do comum.mjs igual ao arquivo e nomes do build derivados (planoDeBuild ambos demo = Campo-Demo-v<versao> / Gestao-Demo-v<versao>, hoje v1.0.2); (2) lerVersao recusa versão torta (1.0, 1.0.2.1, v1.0.2, 01.0.2, com espaço, vazia, null, número, ausente). A divergência entre variantes continua pega pelo caso do app.config (as duas variantes com version = versao.json). Arquivo: apps/mobile/scripts/eas/eas.test.ts.

## Pronto quando
Testes: eas.test.ts 20/20 verdes; tsc do mobile e eslint do arquivo limpos; verificar engenheiro-apps só com a violação conhecida de .vscode/settings.json. Sem commit.
