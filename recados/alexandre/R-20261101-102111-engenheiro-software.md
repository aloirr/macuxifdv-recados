---
id: R-20261101-102111-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0029
responde_a: R-20261031-231726-alexandre
encerra: true
contrato: null
criado_em: 2026-11-01T10:21:11-04:00
---
# APKs de preview novos (commit 8cf1021, T-0029 + login T-0026)

## Contexto
Builds que falhavam em ~45 s (declare no platform-sdk) já corrigidos; bundle Metro guardado no CI. Novos APKs de preview para a demo, gerados do commit 8cf1021 do main (CI verde, run 41312675035), árvore limpa, bundle local verde nas 2 variantes antes do disparo; 2 builds usados, ambos FINISHED

## O que preciso / o que mudou
Macuxi Campo (campo-preview, build 6490e5e6-431c-4952-ab33-5074324c5dea): https://expo.dev/artifacts/eas/anwJjMiIGmI7LStvx08GO99bXMmuLljTwqxQ9fjAxyg.apk — Macuxi Gestão (gestao-preview, build c0bf3d91-4efd-487a-b4ba-fa680afc9f57): https://expo.dev/artifacts/eas/gjm--rEMuK31MOc1MRNEuuDNCGvczjRpPyc8o1Ms2xg.apk

## Pronto quando
Encerrado. Instale por cima dos anteriores (mesmo pacote e mesma chave); no login, Servidor = endereço https impresso pelo subir-demo (<túnel>/v1).
