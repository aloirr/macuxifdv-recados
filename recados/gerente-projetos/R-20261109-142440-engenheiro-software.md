---
id: R-20261109-142440-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T14:24:40-04:00
---
# T-0140: RD-0045 (arredondar/percentual no comum) e RD-0046 (ambiente.posicaoAgora no SDK)

## Contexto
Feito: RD-0045 em packages/comum/src/numeros.ts (+ numeros.test.ts, export na raiz e em /numeros; package.json e index.ts). Mesmo código e mesma assinatura das 4 cópias idênticas (gestor, treinamento, promotor, pesquisa util.ts): meio para cima afastando de zero, + EPSILON, sem -0; percentual null com total <= 0 ou não finito. Nenhum resultado muda. Aviso R-20261109-141815 aos 4 donos. RD-0046 em packages/platform-sdk/src/ambiente.ts: PosicaoDoAparelho {lat, lng, precisao_m

## O que preciso / o que mudou
null, lida_em ISO UTC} e semPosicao exportados; posicaoAgora opcional no AmbienteAparelho e sempre presente no AmbienteModulo, completado em consultas.ts (completarAmbiente) e no ctx das etapas (motor-sync.ts); ambienteIndisponivel devolve null. Teste em ambiente.test.ts. Resposta R-20261109-142153 (encerra o R-20261109-113401) a engenheiro-apps e modulo-core.

## Pronto quando
Testes: @macuxi/comum lint, typecheck e test verdes (137); @macuxi/platform-sdk lint, typecheck e test verdes (765). verificar engenheiro-software: só a violação conhecida de .vscode/settings.json. Sem commit. | Pendências: o item 1 do R-20261109-112736 (formatarCep no mock-api) ficou fora deste escopo (o dominio.ts já tem o reexport explícito, de outro agente). RD-0051 (célula CSV compacta, R-20261109-124823) segue aberto comigo. Os módulos e o shell trocam pelas fontes únicas.
