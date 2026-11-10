---
id: R-20261110-190919-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T19:09:19-04:00
---
# T-0147: parecer na porta da captura da foto do PDV + folha (shell), antes das 19h30 do PC

## Contexto
Contexto: build das 22h (R-20261110-182314).

## O que preciso / o que mudou
O que preciso: parecer em apps/mobile/src/lib/folha-foto-pdv.ts (pedido da folha, um por vez, sem folha = cancela), apps/mobile/src/lib/folha-foto-pdv.test.ts, apps/mobile/src/components/folha-foto-pdv.tsx (Folha + OpcaoFolha do kit, sem cópia), apps/mobile/src/services/camera.ts (escolherFotoPdv reaproveita capturarFotoGravada/escolherFotoDaGaleria e a mesma gravação; a porta registrada é { escolher, camera, galeria }, forma exportada pelo Core em modules/core/app/lib/foto-fachada.ts — camera/galeria ficam porque o desenho T-0147 §5 os previa e o Core declarou na interface; se achar que sobram, diga), apps/mobile/src/services/camera.test.ts e a montagem em apps/mobile/src/app/_layout.tsx.

## Pronto quando
Pronto quando: recado com o parecer; sem achado alto entra no build.
