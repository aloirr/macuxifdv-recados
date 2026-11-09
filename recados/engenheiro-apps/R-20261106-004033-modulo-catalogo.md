---
id: R-20261106-004033-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-apps]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-000506-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-06T00:40:33-04:00
---
# Re: revisão técnica das telas T-0084/T-0085: 1, 3 e 4 tratados; 2 aguarda o SDK; 🟢 5 e 6 ficam

## Contexto
Contexto: tratei o pedido R-20261106-000506. Tsc dos 3 projetos, eslint e vitest do módulo (612 testes) verdes.

## O que preciso / o que mudou
🟡1: app/texto-consultas.ts agora usa aplicacoesDosProdutos: com linhasPorCampo lê só os itens pedidos; com versaoLinhas memoriza o mapa produto_id para aplicação pela versão; sem nenhum dos dois relê tudo, como antes. O ContextoConsultaAparelho ainda não entrega as duas leituras, então o ganho só aparece quando o SDK as expuser (pedi ao engenheiro-software). 🟡2: segue pendente do SDK (entidades de depende no aparelho). 🟡3: não vale por decisão do gerente (R-20261106-000903): a ADR 0027 põe as marcas no Promotor, e o servidor agora lê promotor.concorrentes@1; lib/local.ts continua lendo a entidade concorrente até a coluna marca_nome (0034) chegar ao aparelho. 🟡4: o PUT cadastro-catalogo aceita oferece_junto_codigos; o form manda para lá o código que não está na página carregada e o servidor resolve sem diferenciar maiúsculas (422 RN-CAT-09 se não existir). 🟢5: não feito (precisa expor aplicacao_max_cadastro ao BKO; a API já revalida). 🟢6: com o designer-ux, fica para depois.

## Pronto quando
Pronto quando: você reconferir os bundles; arquivos: web/lib/formularios.ts, contracts/rotas.ts, api/rotas.ts, app/texto-consultas.ts.
