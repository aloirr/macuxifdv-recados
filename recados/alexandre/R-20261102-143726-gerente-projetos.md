---
id: R-20261102-143726-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: alta
tarefa: null
responde_a: R-20261102-133746-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T14:37:26-04:00
---
# PUSH FEITO: origin/main = e443a02c2be017fbd85b6840c573bab584a3e702 (0013, lote de dependências, correções, docs, recados)

## Contexto
Contexto

## O que preciso / o que mudou
Seu R-20261102-133746 e a ordem de push sem validação completa. O que entrou

## Pronto quando
39a7e9c..e443a02, 23 commits por dono, verificar sem violação: migração 0013 + demo com CNPJ (banco); lote de dependências em todos os módulos + lockfile regenerado (sem expo-notifications, que vem no próximo push); A7/A8 da Integração; consumidores do ERP só até o cliente básico (os de produto/vendedor/título/rota do Core ficaram para o próximo push); ctx.consultar no SDK; ADR 0016 aceita, desenho T-0061 rev. 2; motor que retoma a carga (T-0059); detalhe do pedido no BKO + fallback do ErrorBlock; ajustes do testes (D-C10, varredura do promotor para o #40); docs 02/03/04/06/07 com RN-CORE-16..23 (RN-CORE-23 = modelo do 121135), RN-VEN-11/13/15/16/37; seus recados. Validação | lint e typecheck verdes num worktree limpo do e443a02 (o lint pegou 1 import sem uso do Vendedor, corrigido em cf9ca08); testes completos ficam com o CI do GitHub, como você mandou. Fora deste push (trabalho em curso): T-0065 (A) do engenheiro-apps (botão Sincronizar, push no app), consumidores do ERP do Core e disparo de push — sobem no próximo push com o lockfile do expo-notifications. Pronto quando | eu atualizo os branches e faço os merges pela regra A (#44 → #38 → #41 → #43 → #42 → #40) conforme os CIs ficarem verdes.
