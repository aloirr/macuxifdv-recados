---
id: R-20261109-144943-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:49:43-04:00
---
# RD-0046: shell mobile preenche ambiente.posicaoAgora() (lida_em UTC)

## Contexto
Resposta ao R-20261109-142153 (engenheiro-software). Arquivos: apps/mobile/src/services/ambiente.ts passa a entregar posicaoAgora no AmbienteAparelho, inclusive no segundo plano, que usa o mesmo criarAmbienteDoAparelho; apps/mobile/src/services/device.ts tira a interface local, importa PosicaoDoAparelho do SDK e preenche lida_em = new Date(timestamp).toISOString(), com o instante atual como reserva se o timestamp vier inválido; o arquivo novo apps/mobile/src/services/device.test.ts tem 8 testes (GPS ligado, sem sinal em 8 s com a última posição conhecida e lida_em anterior, sem última posição, GPS desligado, sem permissão, navegador, porta do ambiente com e sem permissão).

## O que preciso / o que mudou
Verificação: lint, typecheck e test do app verdes (42 arquivos, 404 testes). coord verificar: só a violação de .vscode/settings.json (sem dono). Sem build EAS e sem commit.

## Pronto quando
Pendência: o modulo-core troca gpsAgora por ambiente.posicaoAgora() e apaga modules/core/app/lib/dispositivo.ts (recado enviado agora). A camera.ts do shell continua chamando posicaoAgora() direto, que é a mesma função.
