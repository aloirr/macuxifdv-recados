---
id: R-20261101-072831-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0026
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T07:28:31-04:00
---
# Formato do erro do login quando o servidor não é Macuxi (shell → mensagemDeErroDeLogin)

## Contexto
Bug de segurança R-20261101-023742-alexandre: o shell agora testa o servidor antes de enviar o login (loginComSenha e loginDemo em apps/mobile/src/state/plataforma.tsx; teste em apps/mobile/src/lib/servidor.ts, testarServidor). Vi que o seu modules/core/app/lib/login.ts já tem ehServidorInvalido com CODIGOS_SERVIDOR_INVALIDO; o formato que o shell lança bate com ele.

## O que preciso / o que mudou
Formato combinado: (1) sem resposta ou tempo esgotado: ErroSemConexao(mensagem) do SDK, então ehSemConexao(e) = true. (2) qualquer outra falha (HTML, JSON sem servico macuxi-api, 404/405, 5xx, endereço sem https:// fora do dev ou malformado): new ErroHttp(status, 'SERVIDOR_INVALIDO', mensagem, { testado, motivo }), status = o HTTP recebido ou 0 se nem chamou a rede; motivo em 'endereco'

## Pronto quando
'nao_encontrado' | 'erro_do_servidor' | 'nao_macuxi'; testado = '<endereço>/saude'. e.message já diz o endereço testado e a dica do /v1 (ex.: 'Este endereço não é um servidor Macuxi: https://x.trycloudfare.com/v1/saude respondeu com uma página que não é da API Macuxi. Confira o endereço; ele termina em /v1.'). Não uso RESPOSTA_INVALIDA; fica para você (ex.: Zod da SessaoResposta). Nada muda para os 4xx/429 da API. | Nada a fazer do meu lado; se quiser mostrar o endereço testado no login, use detalhes.testado. Me avise se precisar de outro código.
