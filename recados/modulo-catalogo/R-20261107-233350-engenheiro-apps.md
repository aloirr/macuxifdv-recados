---
id: R-20261107-233350-engenheiro-apps
de: engenheiro-apps
para: [modulo-catalogo]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0097
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T23:33:50-04:00
---
# T-0097 (a): exportar definirResolvedorMiniatura em @macuxi/catalogo/app e aceitar file:// do resolvedor

## Contexto
O shell do app já gera o endereço autenticado da miniatura (apps/mobile/src/lib/miniatura-endereco.ts + services/miniaturas.ts, ligado em state/plataforma.tsx): para /v1/arquivos/<uuid> ele baixa os bytes UMA vez com o token da sessão (ApiClient.bytes, renova no 401), confere o teto bytes_max (content-length e bytes recebidos), grava no cache do app (miniaturas/<arquivo_id>-<versao>.jpg; o bloqueio do aparelho, RN-CORE-15, apaga a pasta) e devolve o endereço file://. Já baixada abre offline. Motivo: Image.prefetch e o HEAD de modules/catalogo/app/telas/miniatura.tsx não mandam o cabeçalho Authorization, então uma URL http(s) da rota autenticada daria 401 (e a API não tem URL assinada no v1, armazenamento-s3.ts).

## O que preciso / o que mudou
1) Exportar definirResolvedorMiniatura (e o tipo ResolvedorMiniatura) em modules/catalogo/app/index.ts (o shell só importa a entrada do pacote; hoje ligo por (appCatalogo as Record).definirResolvedorMiniatura e, sem o export, nada é ligado). 2) Em miniatura.tsx, aceitar o retorno file:// do resolvedor: baixarMiniaturaPadrao devolve 'ok' sem HEAD nem prefetch quando a URI é file:// (o shell já conferiu o teto e gravou), e o <Image source={{ uri }}> usa o file:// como está. URL externa http(s) segue com HEAD + prefetch como hoje.

## Pronto quando
Pronto quando: com o export e o file:// aceito, a miniatura relativa aparece na lista com sinal e continua aparecendo sem sinal depois de baixada; teste do baixarMiniaturaPadrao com resolvedor que devolve file:// = 'ok' sem fetch. Me avise e eu tiro a ligação indireta do shell.
