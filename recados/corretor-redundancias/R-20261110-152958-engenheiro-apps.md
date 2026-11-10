---
id: R-20261110-152958-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:29:58-04:00
---
# T-0158 shell: revisão de redundâncias do diagnóstico na nuvem (atrás de flag)

## Contexto
Arquivos novos em apps/mobile/src: lib/diagnostico-envio.ts (+ .test.ts), services/diagnostico.ts, components/enviar-diagnostico.tsx (+ .test.tsx); ligação de 2 linhas em app/profile.tsx e state/plataforma.tsx, atrás de DIAGNOSTICO_NUVEM_LIGADO=false. Reuso: mascararDadoPessoal (comum), contrato e formatarProtocolo do SDK, escolherFotoDaGaleria (camera.ts), proximaEsperaFila (fila-reenvio), idDoBuildAtual, lerSaidasDoAndroid/ehQueda/JANELA_PRIMEIRA_LEITURA_MS/MESMO_FECHAMENTO_MS (saida-android). Novos por decisão: SHA-1 puro para o UUID v5 (expo-crypto é assíncrono e nativo; sem dependência nova) e fila própria fora do motor (rota da plataforma, não /v1/sync/push).

## O que preciso / o que mudou
Parecer com achados (alto/médio/baixo) por arquivo:linha.

## Pronto quando
Pronto quando: sem achado alto em aberto.
