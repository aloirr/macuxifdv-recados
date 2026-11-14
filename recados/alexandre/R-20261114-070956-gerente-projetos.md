---
id: R-20261114-070956-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-070137-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-14T07:09:56-04:00
---
# EAS do Oficial pela nuvem com o EXPO_TOKEN: prompt pronto para a sessão do engenheiro-apps (sem PC e sem workflow novo)

## Contexto
Contexto: o Alexandre criou o EXPO_TOKEN e o gravou na nuvem e no GitHub (chat ~7h40). Com isso, o EAS não precisa do PC nem de workflow novo: uma sessão da nuvem roda o mesmo script, e o EAS lê o EXPO_TOKEN do ambiente.

## O que preciso / o que mudou
O que preciso da ponte: quando o commit final do Oficial estiver no main (merges feitos, reteste do corretor e da marca liberado, PRONTO PARA A TAG), abra uma sessão do engenheiro-apps a partir desse commit com o prompt: 'Você é o engenheiro-apps. Não altere código. No commit <sha> do main, rode: pnpm install --frozen-lockfile; cd apps/mobile; EAS_SKIP_AUTO_FINGERPRINT=1 node scripts/eas/build.mjs ambos oficial. Confira antes que apps/mobile/scripts/eas/versao.json diz 1.0.7 e que o EXPO_TOKEN está no ambiente (npx eas whoami deve responder macuxifdv). Mande à caixa do gerente e do Alexandre os 2 links (Campo-Oficial-v1.0.7 e Gestao-Oficial-v1.0.7), com o commit.' Os perfis campo-producao e gestao-producao usam as credenciais remotas do EAS (credentialsSource remote, mesmo pacote do demo, sem keystore novo). O build leva ~25–30 min. Faça um teste rápido agora, só com 'npx eas whoami' na sessão, para confirmar o token antes da hora.

## Pronto quando
Pronto quando: BUILD PRONTO do Oficial com os 2 links na caixa do Alexandre.
