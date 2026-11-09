---
id: R-20261107-075545-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0092
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T07:55:45-04:00
---
# T-0092: texto pronto da §15 (OpenAPI e guia do TI) do hub-api.md

## Contexto
T-0092. Texto da §15 de docs/modulos/integracao/hub-api.md, pronto para colar.

## O que preciso
Colar a seção abaixo (sugestão de título: "15. OpenAPI e guia do TI do cliente").

---
### 15. OpenAPI e guia do TI do cliente

**O que é.** O Hub publica a especificação OpenAPI 3.1 das 7 rotas do `/integracao/v1`, gerada automaticamente dos contratos Zod do módulo (`modules/integracao/contracts`). Como nasce do mesmo código que valida as chamadas, ela não fica diferente da API real. O TI do cliente pode usá-la para gerar um cliente, importar no Postman ou testar o ERP contra o Hub.

**Como baixar.** `GET https://<servidor>/integracao/v1/openapi.json`, sem autenticação e sem chave de API. A rota é pública de propósito: devolve só a especificação dos contratos v1, sem nenhum dado de tenant ou de cliente. Tem limite de requisições por IP (resposta 429 com `Retry-After`).

**Versão.** O documento descreve o v1. Mudança compatível (campo novo opcional) continua no v1; mudança incompatível vira `/v2` e ADR (regra 3 do CLAUDE.md). A versão do contrato aparece em `info.version`. O arquivo de referência fica versionado em `modules/integracao/docs/openapi-hub-v1.json`.

**Cache e ETag.** A resposta traz `Cache-Control: public, max-age=3600` (1 hora) e `ETag`. Quem já baixou envia `If-None-Match` com o ETag e recebe `304 Not Modified`, sem corpo, enquanto o documento não mudar. Ao publicar uma versão nova do Hub o ETag muda.

**Como se mantém atualizado.** `pnpm --filter @macuxi/integracao openapi` regrava o arquivo e os exemplos do guia. Um teste compara o arquivo com o que os contratos geram e falha no CI se alguém mudar um contrato sem regravar.

**O que fica de fora.** As rotas do BKO (`/v1/integracao/*`, login por JWT) e do portal; elas não são parte do contrato com o ERP. Também ficam de fora regras que o JSON Schema não expressa (por exemplo, a regra cruzada de `numero_erp`, motivo e nota no retorno do ERP), descritas em texto na própria especificação e validadas só pelo Hub. Não há dado de tenant, chave de API ou exemplo com dado real.

**Guia.** O passo a passo para o TI do cliente (autenticar com a chave do Conector, enviar lote, consultar, retorno de pedido, erros e limites) está em `modules/integracao/docs/guia-api-hub.md`, com os exemplos gerados do mesmo OpenAPI.
---

## Pronto quando
A §15 estiver no hub-api.md. A rota pública depende do engenheiro-software (T-0092); ajuste a frase "Como baixar" se o caminho final mudar.
