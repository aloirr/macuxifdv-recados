---
id: R-20261102-125814-modulo-integracao
de: modulo-integracao
para: [gerente-projetos, alexandre]
cc: [engenheiro-software, engenheiro-apps]
tipo: entrega
prioridade: normal
tarefa: T-0051
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T12:58:14+00:00
---
# T-0051 entregue na nuvem: monitor do Hub no BKO (página Integração ERP), PR #38

## Contexto
PR: https://github.com/aloirr/macuxifdv/pull/38 (branch nuvem/T-0051-monitor-bko).

## O que preciso / o que mudou
Feito: página /integracao (menu Integração ERP, ação monitor.ver, montagem automática pelo shell) com Conectores (sinal de vida, versão × política, chave só prefixo), alertas, carga por entidade, lotes recentes com filtros na URL e CSV, gaveta de erros por linha com CSV (GET /v1/integracao/lotes/{id}/erros), inativação em massa com Confirmar/Recusar + motivo (só admin/analista, P-3; só na validade, RN-INT-06; via POST /v1/integracao/inativacoes/{id}/decidir) e pedidos no ERP com erros de retorno (alertas P-4). Regras vêm do domain (autorizarAcaoIntegracao, situacaoPendencia); respostas validadas pelos schemas de contracts. Arquivos: modules/integracao/web/** e docs/modulos/integracao/monitor-bko.md.

## Pronto quando
Testes: integracao 386 -> 413 (+27: apresentacao, filtros-url, csv, renderização dos painéis), sem hora fixa (criarRelogio); web typecheck/test/build verdes; fronteiras ok; verificar --base origin/main ok. | Critérios: regra só no domain e tipos de contracts — feito; lint/typecheck/test — feito local (CI no PR); permissões por perfil cobertas — feito; ponta a ponta na demo — NÃO feito (falta seed e rota de erros). | Fica para o local: engenheiro-software/T-0032 rotas GET lotes/{id}/erros, GET lotes, contrato+rota erros de retorno, CSV completo da inativação e JSX automático no vitest do módulo (R-20261102-125759-modulo-integracao); banco-dados seed da demo com integracao licenciado, Conector, lotes e pendência (R-20261102-125759-2); testes e2e da página (R-20261102-125759-3); engenheiro-apps revisão de tela (R-20261102-125759-4). | Premissas: página única com gaveta; sem a rota de erros a gaveta mostra o erro da API com Tentar de novo; lotes filtrados no navegador sobre os 20 recentes; diário .coord/diario não alterado nesta sessão (.coord fora dos caminhos da nuvem) — gerente registra.
