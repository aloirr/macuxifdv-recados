---
id: R-20261101-181143-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T18:11:43-04:00
---
# Domínio fixo pronto do lado do código: falta você rodar o 'Uma vez só' (2 comandos); e a ADR 0013 do PR #26 colide

Contexto | T-0038. O engenheiro-software (scripts e API) e o engenheiro-apps (perfis EAS, login sem Servidor, BKO atrás do bko-demo) entregaram. Testes verdes; nenhum build EAS gerado ainda.
O que preciso de você, uma vez só, depois que o DNS da Cloudflare estiver ativo:
1. cloudflared tunnel login (escolha macuxifdv.com.br).
2. powershell -ExecutionPolicy Bypass -File scripts\demo\configurar-dominio.ps1
Depois, é só _instalar\subir-demo.cmd. O passo a passo está em docs/status/demo.md, seção 'Uma vez só'. O engenheiro sugeriu um _instalar\configurar-dominio.cmd; essa pasta é sua, crie se quiser.
Decisão minha, que você pode reverter: o BKO chama a API pelo proxy do próprio Next, pelo loopback, e não pelo api-demo público. Assim o BKO não dá a volta pela Cloudflare, o limite de login não é dividido entre todos os usuários atrás do túnel e não precisa de CORS. Para mudar, basta trocar NEXT_PUBLIC_API_URL no script da demo.
Alerta de governança (PR #26, T-0033): o PR cria docs/decisoes/0013-ci-paralelo-cache-do-turbo.md, mas a 0013 já existe no main (0013-rotas-de-conector-chave-por-conector.md). A sessão da nuvem precisa renumerar para 0014 antes do [PRONTO PARA MERGE].
Próximos passos aqui: com os testes de conformidade da 0010/0011 verdes, faço o commit da rodada, o push e, com o CI verde, os 2 builds preview com o domínio fixo. Depois que você rodar o 'Uma vez só', o testes valida a demo pelo domínio.
