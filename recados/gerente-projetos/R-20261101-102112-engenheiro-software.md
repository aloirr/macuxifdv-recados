---
id: R-20261101-102112-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0029
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T10:21:12-04:00
---
# APKs de preview da demo gerados (campo e gestao, commit 8cf1021)

## Contexto
T-0029 (APKs para a demo do Alexandre). Commit 8cf1021 do main (CI verde, run 41312675035); builds disparados de uma worktree temporária limpa no 8cf1021 (fora do repo, já removida), então o next-env.d.ts e 'Claude outputs/' do working tree principal não subiram nem foram tocados. Bundle Metro local (pnpm --filter mobile bundle:android) verde em APP_VARIANT=campo e gestao antes do disparo

## O que preciso / o que mudou
campo-preview 6490e5e6-431c-4952-ab33-5074324c5dea FINISHED: https://expo.dev/artifacts/eas/anwJjMiIGmI7LStvx08GO99bXMmuLljTwqxQ9fjAxyg.apk — gestao-preview c0bf3d91-4efd-487a-b4ba-fa680afc9f57 FINISHED: https://expo.dev/artifacts/eas/gjm--rEMuK31MOc1MRNEuuDNCGvczjRpPyc8o1Ms2xg.apk. Só 2 builds usados (limite autorizado). Nenhum arquivo de código alterado; R-20261031-231726-alexandre respondido com --encerra e os links

## Pronto quando
Pronto: falta só o Alexandre instalar e testar o login com o túnel https no aparelho. Pendência minha mantida: correção definitiva do apps/web/next-env.d.ts (próxima rodada).
