---
id: R-20261109-121156-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [corretor-redundancias]
tipo: entrega
prioridade: normal
tarefa: T-0140
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:11:56-04:00
---
# T-0140: RN-CORE-32 no BKO e no portal; RD-0044 e RD-0046 (parte do shell)

## Contexto
O que fiz: 1) RN-CORE-32: apps/web/lib/ciclo-senha.ts (resultadoDoErroDaTroca, caso RN-CORE-32) e apps/web/components/portal/passo-empresa.tsx (erroDoAdminNaApi) usam textoDoErroDaSenha(e, senhaNova) de @macuxi/core/contracts. Saíram as listas FALTAS/FALTAS_CONHECIDAS e a reserva que repassava a mensagem da API. 2) RD-0044: apps/web/lib/portal-carga.ts usa protegerFormula de @macuxi/comum/csv. 3) RD-0046: em apps/mobile/src/services/device.ts, o currentPosition(fallback) da fase M virou posicaoAgora() → {lat,lng,precisao_m}

## O que preciso / o que mudou
null; services/camera.ts ajustado. Combinado: a fonte única é o shell, pelo ambiente. O UUID já chega como ambiente.novoId (pedido ao modulo-core R-20261109-113045 para apagar a cópia dele). A porta opcional ambiente.posicaoAgora() foi pedida ao engenheiro-software (R-20261109-113401); ligo no shell quando ela sair. 4) E1/E8 com [telefone]: o testes confirmou 11 de 11 (R-20261109-112339).

## Pronto quando
Testes: mobile, lint e tsc verdes e vitest 41 arquivos/396 testes; web, lint dos arquivos tocados e tsc verdes e vitest 20 arquivos/170 testes. Verificar: só a violação da .vscode/settings.json (sua). Sem build EAS e sem commit. | Pendências: a porta do SDK (engenheiro-software) e a parte do Core (modulo-core) fecham o RD-0046. Na caixa ainda ficam R-20261108-161014, R-20261108-214923 (aguarda o APK) e R-20261109-023603, já atendidos nas entregas anteriores, à espera de encerramento pelos remetentes.
