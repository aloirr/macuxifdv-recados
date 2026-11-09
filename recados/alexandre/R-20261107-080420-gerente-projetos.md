---
id: R-20261107-080420-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: T-0091
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T08:04:20-04:00
---
# Status 8h20 (07/11): #99 no main; stack-isolado (a) e portal da demo (b); lidos; docs para sincronizar

## Contexto
Contexto: rodada de 07/11 a partir dos seus R-20261106-182000 e R-20261106-225242. Apliquei o que faltava nas tarefas: decisões 1 a 7 e as dos PRs nos históricos de T-0085, T-0086, T-0087 e T-0089; T-0091 e T-0092 com dono; backlog com modelos CSV para o admin, miniatura e link do Conector; pedido da miniatura pós-piloto ao modulo-catalogo (R-20261107-075042).

## O que preciso / o que mudou
(a) Ajuste do stack-isolado.yml (docs/desenho/T-0091-stack-isolado.diff, do engenheiro-software). O que muda: nada no deploy, só acrescenta conferências ao CI. 1. O portal.env existe, com modo 600, tem MACUXI_PG_PORTAL_SENHA, fica mascarado no log e não está no .env. 2. A 2ª execução do preparar-vm não mexe nele. 3. Só api e banco recebem a senha; worker, seed e backup nunca. 4. Na produção, o banco-dbaas confere que as sa_* só executam pelo macuxi_portal, sem grant em tabela. 5. O portal responde sem 503. O CI já passa sem o diff. Achei uma falha: a sonda 5 usa uma rota que dá 401 antes de tocar no banco, então não prova o pool. Pedi a correção (R-20261107-080049). Recomendação: dar o ok quando o diff corrigido chegar; eu aviso. Ele cumpre o critério 6 da T-0091 e é a prova da condição da ADR 0029 antes do 1º cliente.

## Pronto quando
(b) Portal da demo: não falta secret seu. A senha do macuxi_portal já está na VM: o deploy do e9a65286 gerou o portal.env e aplicou a 0038. O 503 vem de outra coisa: o preparar-vm.sh da DEMO não gera o segredo de sessão nem a chave TOTP do portal (MACUXI_JWT_SEGREDO_PLATAFORMA e MACUXI_CHAVE_TOTP); só o da produção gera. O portal foi feito para o config. da produção. Ligar na demo é só configuração, com as duas chaves geradas na VM; o 1º acesso de super-admin na demo precisaria de um convite (um secret DEMO_SUPERADMIN_CONVITE, seu). Pedi ao engenheiro-software a proposta. Decida se quer o portal na demo para ensaiar antes da produção. | lidos/alexandre.txt: não toquei nele. A cópia local termina em R-20261106-194121 e foi gravada hoje às 4h25, fora da minha atividade. Causa provável: os seus recados desde 03/11 e o seu lidos nunca foram para o main, porque o guardião não me deixa commitar arquivos seus e o main ainda tem o lidos de 03/11. Qualquer checkout, restore ou stash a partir do main devolve a versão de 03/11. O lote e o backup não usam isso (worktree e índice à parte), mas em 05/11 usei uma vez 'git checkout <sha> -- arquivos' no tree principal; está proibido para mim daqui em diante. Para eliminar o risco, commite os seus recados e o lidos (git add .coord/recados/*/R-*-alexandre.md .coord/lidos/alexandre.txt e commit com 'Agente: alexandre') ou me autorize a fazê-lo. | PRs: #99 integrado em d27f7903, com contracts/ revisado (RecusaLote.detalhes aditivo). #97, #96 e #95 estão com CI verde, mas sem a marca PRONTO; comentei às 7h50 pedindo que puxem o d27f7903 e marquem. As sessões fizeram commits às 5h40. Ordem: #96 → #95 e #97. T-0092: modulo-integracao entregou as dependências e a resposta do openapi; engenheiro-software trabalhando na rota pública do SDK e no lock. | Docs para sincronizar no Projeto: docs/produto/02 (RF-VEN-11 reescrito pela T-0089 e RF-VEN-14 novo, Pedidos com o filtro da T-0090), 03 (RN-VEN-14, 15, 23, 24, 25) e 06 (formas, prazos, escalonada), além de docs/status/producao.md, com o que mudou desde 06/11 (0037, 0038, portal.env, APK com SQLite). | O que preciso de você: 1. recriar a base da demo (Actions → demo — recriar base demo, RECRIAR) e testar os APKs do 5a1848a9 e do e9a65286; 2. decidir sobre o portal na demo (b); 3. ok no diff do stack-isolado quando eu mandar a versão corrigida; 4. criar os recursos de produção e avisar; 5. resolver o commit do seu lidos e dos seus recados. | Pronto quando: você ler; o próximo status sai até 11h20.
