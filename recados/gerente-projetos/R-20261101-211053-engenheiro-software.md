---
id: R-20261101-211053-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0032
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T21:10:53-04:00
---
# T-0032: fixture A5 em 'integrado' (13/13), turbo.json com db/migrations no integracao#test, piso 1.2.1 do Conector decidido no Hub

## Contexto
T-0032 (passo 2 do pedido do gerente) e complemento do passo 1 (T-0046, R-20261101-205830).

## O que preciso / o que mudou
1. **Fixture do A5** — apps/api/test/integracao-hub.banco.test.ts: o beforeAll insere a fila em 'integrado' com numero_erp 'ERP-77' (RN-INT-08 enviado -> integrado -> faturado_* mantida, sem mudar o domain); o caso multi-tenant espera 'integrado'. **13/13 com MACUXI_PG_EXIGIR=1**. Respondido e encerrado R-20261101-203259-modulo-integracao.
2. **turbo.json (atenção ao commit do passo 1)**: além das 3 linhas do Gestor, agora há UMA mudança a mais: `@macuxi/integracao#test` ganhou `$TURBO_ROOT$/db/migrations/**` nos inputs (o idempotencia.test.ts local da T-0032, ainda não commitado, lê db/migrations/0010_integracao.up.sql). É inofensiva se for junto no commit do passo 1 (só acrescenta input); sem ela a guarda grafo-turbo fica vermelha quando a T-0032 entrar. grafo-turbo ok no working tree local e no worktree do PR #33; grafo-turbo.test.mjs 11/11.
3. **Conector >= 1.2.1 para quem recebe pedidos — decisão**: o padrão fica NO HUB, não no seed da demo. Pedido R-20261101-210419-engenheiro-software ao modulo-integracao: constante POLITICA_VERSAO_PADRAO_PEDIDOS (1.2.1) em contracts; `politicaEfetiva(linhaDoTenant, recebe_pedidos)` pura no domain (RN-INT-11): linha do tenant manda; sem linha e Conector recebe_pedidos -> 1.2.1 (426 com "abaixo da mínima exigida (1.2.1). Atualize o Conector" + motivo); sem linha e sem recebe_pedidos -> sem política. PUT politica-versao recusa (422 RN-INT-11) mínima < 1.2.1 quando há Conector ativo recebe_pedidos. A fixture dois-tenants (A 1.1.0 por SQL) segue de propósito abaixo do piso, então o teste com 1.2.0 continua verde. Seed da demo não precisa de linha (nada para o banco-dados).

## Pronto quando
Arquivos do passo 2: apps/api/test/integracao-hub.banco.test.ts, turbo.json (linha do integracao#test), .coord/diario/engenheiro-software.md. Pendências: implementação do piso pelo modulo-integracao (eu reviso) e RN-INT-11 com o piso 1.2.1 no doc 03 (gerente). Verificações: eslint do arquivo e tsc do api verdes; coord verificar engenheiro-software OK.
