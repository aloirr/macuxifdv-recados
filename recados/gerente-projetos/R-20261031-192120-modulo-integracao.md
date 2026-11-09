---
id: R-20261031-192120-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0013
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T19:21:20+00:00
---
# T-0013: Conector v1 (lado do cliente) entregue - 118 testes, lint/typecheck/fronteiras verdes

## Contexto
T-0013 (Conector v1, lado do cliente), branch nuvem/T-0013-conector-v1. Sem arquivo em .coord/tarefas (especificação veio no pedido do gerente). Escopo respeitado: apps/conector/** e docs/modulos/integracao/conector.md; só importo @macuxi/integracao/contracts (público). Nada de git commit/push feito por mim.

## O que fiz
Pacote @macuxi/conector (Node 22, TS estrito, ESM). Código em apps/conector/src:
- config/ (esquema Zod JSON/YAML, segredos proibidos no arquivo, validação dos parâmetros :cursor_alterado_em/:cursor_external_id/:limite e dos campos contra o contrato); segredos/ (provedor env + Windows Credential Manager via PowerShell/P-Invoke sem módulo nativo, cache de 60 s = rotação sem reiniciar, máscara automática); log/ (JSON, rotação diária+tamanho, retenção 30 dias, máscara de CPF/CNPJ/e-mail/telefone/Bearer/senhas).
- erp/ (drivers PostgreSQL via pg e SQL Server via mssql carregado sob demanda; :nome -> $n / @nome; transação; classificação de erro de conexão x erro de SQL); mapeamento.ts (coluna -> campo, transformações, validação local com SCHEMA_REGISTRO sem valores nas mensagens); lotes.ts (divisão por linhas e bytes, chave SHA-256 estável).
- sincronizador.ts (carga inicial completa em sessão com partes e ultimo=true sem lote vazio; depois delta; dois cursores: leitura e confirmado; margem ao voltar ao delta; guarda contra precisão sub-ms); remetente.ts (fila persistente node:sqlite, backoff exponencial com jitter persistido, resultado por linha, recusa de envelope bloqueia a entidade e não reenvia, só falha_processamento é reenviada, trava RN-INT-06 só avisa); pedidos.ts (poll, gravação no ERP por SQL/procedure em transação, número do ERP, rejeição, faturado parcial por nota com itens_faturados, total, cancelado; fila local de retornos); reconciliacao.ts; executor.ts (laço); status.ts; servico.ts (WinSW); comandos.ts/cli.ts (validar-config, testar-conexao, status, rodar [--uma-vez], carga-completa, retomar, segredo definir, instalar/desinstalar-servico); scripts/empacotar.mjs (esbuild -> dist/conector.mjs, testado).
- exemplos/conector.exemplo.json (SQL Server, 8 entidades + pedidos, validado por teste). docs/modulos/integracao/conector.md (instalação, config, delta, pedidos, operação, segurança, solução de problemas, lista do que o Hub precisa expor).
- Serviço Windows: WinSW (gera XML; sem dependência nativa; auditável; conta/reinício/log do serviço são configuração). Motivo documentado em conector.md 7.2 e em src/servico.ts.
- node:sqlite carregado por createRequire (resolve o Vite do Vitest) com supressão só do aviso de SQLite.

## Testes
118 testes Vitest em 11 arquivos (apps/conector/test): config (9), mapeamento (8), lotes (8), retry (4), sincronizacao (26: carga completa/delta/cursor/fila/queda de rede/reinício/idempotência/401/422/trava), pedidos (15), segredos-log (12), servico (5), drivers (8, incluindo mssql com dublê), operacao (16: CLI, executor, reconciliação, status, instância única) e integracao.pg (7: ERP PostgreSQL de exemplo criado e dropado pelo teste, Hub falso node:http em porta efêmera; pula com aviso sem Postgres e FALHA com MACUXI_PG_EXIGIR=1 - ambos verificados).
Resultados: pnpm --filter @macuxi/conector lint, typecheck e test verdes; pnpm lint da raiz verde (inclui fronteiras: 0 violações); pnpm typecheck da raiz verde (19/19). pnpm test da raiz: conector 118/118, integracao 104, platform-sdk, treinamento, comum, ui, config, mock-api, web, mobile verdes; FALHAM core (21), db, api e //#test:tests por crypto.argon2 (precisa de Node >= 24.7; o ambiente da nuvem tem 22.23). Não tem relação com o conector (falha na seed de senhas); o turbo sem --continue aborta no primeiro. pnpm-lock.yaml mudou (dependências novas) - ver recado ao engenheiro.

## Premissas assumidas
1. Autenticação do Conector no Hub: Authorization Bearer com chave de API rotacionável (o doc 06 permite OAuth2 client credentials ou chave de API).
2. Idempotência de lote: cabeçalho Idempotency-Key (SHA-256 do conteúdo canônico); mesma chave devolve o mesmo lote_id.
3. LoteResultado ganha campo opcional inativacao {situacao: aplicada|aguardando_confirmacao|nao_aplicavel, motivo?, candidatos?} para a trava RN-INT-06 (hoje o resultado só traz inativadas). Sem ele o Conector só não sabe avisar.
4. RetornoErp ganha itens_faturados opcional (pedido do engenheiro, T-0011, R-20261031-123752): o Conector já envia quando a consulta de itens existe; contracts/pedido.ts ainda não tem o campo (é do módulo, fora do escopo desta tarefa).
5. Linha que não passa no schema local VAI ao Hub por padrão (para o BKO mostrar o erro legível, RN-INT-03); configurável por entidade (linhasInvalidas: descartar). Linhas sem external_id/alterado_em legíveis nunca saem (sem elas não há cursor).
6. Lote falhou com erros por linha não reprocessáveis: o Conector dá o lote por tratado e avança o cursor (a linha corrigida volta pelo delta); falhou sem erro por linha bloqueia a entidade até o operador agir.
7. alterado_em: UTC, milissegundos, nunca nulo (regras das views no conector.md 5). O Conector ignora linha repetida por precisão sub-ms.
8. status do pedido no ERP é do pedido: só a última nota vira faturado_total; as anteriores são parciais.

## Perguntas de produto (Alexandre)
- Enviar linhas inválidas ao Hub (premissa 5) é o desejado, ou o técnico do cliente prefere ver só localmente?
- Atualização automática do Conector (doc 06): como distribuir (Hub entrega o executável? canal de releases?) e se o instalador precisa ser um .exe sem Node pré-instalado.
- Credencial: chave de API por Conector é suficiente na v1 (OAuth2 client credentials fica para depois)?
- Oracle, MySQL e Firebird: prioridade e cronograma (só SQL Server e PostgreSQL agora).

## Pendências
- Hub /integracao/v1 sem rotas (lista do que precisa expor em conector.md 9 e no recado ao engenheiro).
- Atualização automática, tela local simples e .exe único: não feitos. Teste com SQL Server real: só dublê do mssql.
- views-modelo (db/conector/views-modelo.sql) são do banco-dados (pedido a fazer; o exemplo de config já usa os nomes vw_macuxi_*).
- turbo.json: sugerir "@macuxi/conector#test" com cache false (resultado depende de Postgres estar acessível).
- Recados abertos na minha caixa de T-0009/T-0011/treinamento seguem abertos (fora do escopo desta rodada); respondi o de itens_faturados.

## Pronto quando
Revisão do engenheiro sem 🔴; gerente faz commit/push da rodada.
