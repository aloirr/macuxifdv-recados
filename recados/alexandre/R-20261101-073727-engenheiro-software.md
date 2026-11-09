---
id: R-20261101-073727-engenheiro-software
de: engenheiro-software
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0026
responde_a: R-20261101-023742-alexandre
encerra: false
contrato: null
criado_em: 2026-11-01T07:37:27-04:00
---
# Re: segurança do teste do servidor — saúde verificável, login só para servidor Macuxi, https fora do dev

## Contexto
Resposta ao bug de segurança (teste do servidor aceitava qualquer site e o login ia para ele). Parte do engenheiro-software feita; as mensagens de login (item 3) são do modulo-core, que está fazendo em paralelo. O formato do erro foi combinado por recado (R-20261101-072831-engenheiro-software).

## O que fiz
1. **Identificação verificável**: `GET /v1/saude` (`apps/api/src/app.ts`) devolve `{ ok: true, servico: "macuxi-api", versao, modulos }`, validado pelo contrato `SaudeRespostaSchema` (`packages/platform-sdk/src/saude.ts`). `versao` = `MACUXI_VERSAO` ou a do package.json da API. O mock-api (`/health`, `/v1/health`) devolve o mesmo `servico`.
2. **App valida com Zod** (`apps/mobile/src/lib/servidor.ts`, `testarServidor`, usado por `testApiUrl` e `ApiClient.health`): exige 200 + JSON + `servico === "macuxi-api"`. Qualquer outra coisa mostra "Este endereço não é um servidor Macuxi: <endereço>/saude ..." com o que falhou (página que não é da API, sem a identificação, 404, erro 5xx). Sem resposta e tempo esgotado: "Sem resposta de <endereço>/saude..." / "não respondeu em 8 s". O endereço só é salvo se passar.
3. **Login só para servidor aprovado**: `loginComSenha` e `loginDemo` (`apps/mobile/src/state/plataforma.tsx`) testam o endereço em uso antes de enviar (guardam o último aprovado na execução). O login vai para exatamente o endereço aprovado. Endereço salvo por uma versão antiga do app (ex.: o `trycloudfare` do vídeo) é testado de novo e barrado.
4. **Fora do desenvolvimento só `https://`**: `http://` é recusado antes de qualquer chamada (no `expo start` em dev, `http://` na rede local continua valendo).
5. **Testes**: `apps/mobile/src/lib/servidor.test.ts` (JSON certo, HTML, JSON sem `servico`, JSON de outro serviço, 404, 502, sem resposta, timeout, http fora do dev, endereço sem esquema, erro que vai para o login), `packages/platform-sdk/src/saude.test.ts` e `apps/api/test/app.test.ts`.

Limite: a identificação barra erro de digitação e site de terceiro; não prova identidade contra quem copiar a resposta de propósito (isso é papel do https e de uma futura lista de domínios do tenant).

## Pronto quando
- Domínio errado com HTML/JSON qualquer: "Testar e salvar" falha com a mensagem acima e não salva (coberto em teste; no aparelho, no APK novo).
- Túnel certo (`https://<nome>.trycloudflare.com/v1`): passa, mostra "Servidor Macuxi respondeu (versão 0.1.0). Testado: <endereço>/saude" e o login entra.
- Bundle Android das duas variantes verde; o APK novo sai com a T-0029 (build e commit são do gerente).
- Falta a entrega do modulo-core (mensagens de login).
