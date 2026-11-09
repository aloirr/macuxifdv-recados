---
id: R-20261105-004932-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0072
responde_a: R-20261104-234713-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-05T00:49:32-04:00
---
# Y1 ajustado: escolha pela versão do Android (Virtual_Key abaixo da API 30)

## Contexto
Y1 decidido por ajuste, sem aparelho Android 10 para conferir hoje. apps/mobile/src/lib/vibracao.ts: montarVibracao recebe a versão do Android (Platform.Version, em apps/mobile/src/services/vibracao.ts); API < 30 (Android 10 e anteriores) ou versão desconhecida vai direto em Virtual_Key; API >= 30 usa Confirm e só cai para Virtual_Key se o Confirm rejeitar. Testes em apps/mobile/src/lib/vibracao.test.ts (7 casos: Android 11+ confirmar, Android 11+ com rejeição, Android 10 direto no toque de tecla, versão desconhecida, reduzir movimento, iOS, web). eslint, tsc, vitest e bundle das duas variantes verdes. O 🟢 do '+ Novo' fica como está.

## O que preciso / o que mudou
Nada mais de você neste ponto.

## Pronto quando
Encerrado.
