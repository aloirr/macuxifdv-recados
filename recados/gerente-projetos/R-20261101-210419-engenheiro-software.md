---
id: R-20261101-210419-engenheiro-software
de: engenheiro-software
para: [modulo-integracao]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T21:04:19-04:00
---
# Conector >= 1.2.1 para quem recebe pedidos: padrão no Hub (politicaEfetiva), tenant manda, PUT recusa abaixo do piso

## Contexto
Pedido do Alexandre (R-20261101-203953-alexandre): o Hub exige Conector >= 1.2.1 de quem recebe pedidos (o 1.2.0 reenvia itens no fechamento sem nota nova), com 426 e a mensagem de atualizar, combinado com o PUT /v1/integracao/politica-versao que você fez (bko-politica.ts). Restrição: não quebrar o integracao-hub.banco.test.ts, que manda 1.2.0 com a fixture A (politica_versao 1.1.0, conector recebe_pedidos=true) e espera 426 com versao_minima 1.1.0 para o 1.0.0. A fixture do A5 já foi corrigida para 'integrado' (RN-INT-08 fica como está); os 13 casos passam com MACUXI_PG_EXIGIR=1.

## O que preciso / o que mudou
Decisão de arquitetura (engenheiro-software), onde fica o padrão: NO HUB (código do módulo), não no seed da demo.
1. contracts: `POLITICA_VERSAO_PADRAO_PEDIDOS` = { versao_minima: '1.2.1', versao_recomendada: '1.2.1', mensagem: 'O Conector 1.2.0 ou anterior reenvia itens no fechamento sem nota nova.', pacote: null }.
2. domain (função pura, teste antes citando RN-INT-11): `politicaEfetiva(politicaDoTenant, recebePedidos)` = a linha do tenant quando existe; sem linha e Conector com recebe_pedidos=true -> o padrão acima; sem linha e sem recebe_pedidos -> null (sem política, como hoje). Assim o 426 sai pelo mesmo avaliarVersaoConector, com o texto "A versão 1.2.0 do Conector está abaixo da mínima exigida (1.2.1). Atualize o Conector..." + a mensagem.
3. api/autenticacao.ts (antes): usar politicaEfetiva(linha, ctx.conector.recebe_pedidos); o sinal de vida devolve a efetiva em politica_versao (o Conector mostra o aviso).
4. PUT politica-versao: com Conector ativo recebe_pedidos no tenant, recusar versao_minima < 1.2.1 com 422 RN-INT-11 ("quem recebe pedidos exige Conector 1.2.1 ou mais novo"). A linha do tenant continua mandando (o admin pode SUBIR a mínima; descer abaixo do piso só por SQL, que é o caso da fixture dois-tenants, de propósito, para o teste do 1.2.0 seguir verde).
5. GET politica-versao: sem linha, devolver a efetiva (padrão do Hub) — se quiser distinguir no BKO, campo opcional `origem: 'tenant' | 'padrao_hub'` (aditivo, sem nova versão).
Seed da demo: NÃO precisa de linha (o padrão cobre o Conector da demo; nada para o banco-dados). Doc 03 (RN-INT-11 com o piso 1.2.1) fica com o gerente.

## Pronto quando
Testes do domain e da rota verdes; integracao-hub.banco.test.ts continua 13/13 com MACUXI_PG_EXIGIR=1; me avise por resposta para eu revisar. Se discordar de algum ponto, responda até o fim da rodada — sem resposta, vale o desenho acima.
