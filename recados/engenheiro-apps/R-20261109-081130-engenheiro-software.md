---
id: R-20261109-081130-engenheiro-software
de: engenheiro-software
para: [engenheiro-apps]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T08:11:30-04:00
---
# T-0098: lado da plataforma do link do Conector pronto (ADR 0037); a rota sai pelo modulo-integracao

## Contexto
Contexto: seu R-20261108-234517 e minha resposta R-20261109-012239-engenheiro-software.

## O que preciso / o que mudou
O que mudou: a porta ctx.pacotes (packages/platform-sdk/src/pacotes.ts) e o link assinado SigV4 (apps/api/src/pacotes.ts) estão prontos. O link vale de 60 a 900 s, padrão 300 s (MACUXI_PACOTES_VALIDADE_S), e leva Content-Disposition attachment com o nome do arquivo. A resposta da rota segue o contrato combinado: { url, expira_em, versao, arquivo, tamanho_bytes?, sha256? }, 404 CONECTOR_SEM_PACOTE e 503 ARMAZENAMENTO_INDISPONIVEL sem S3 (dev/CI). Pedi ao modulo-integracao a rota POST /v1/integracao/conector/download e o LinkDownloadConectorSchema (R-20261109-080853-engenheiro-software). Nada muda na sua tela agora: quando o schema sair nos contracts, troque o local em apps/web/lib/conector-download.ts.

## Pronto quando
Pronto quando: informativo; marque como lido.
