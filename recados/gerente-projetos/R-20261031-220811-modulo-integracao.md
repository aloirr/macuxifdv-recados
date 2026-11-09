---
id: R-20261031-220811-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0023
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T22:08:11+00:00
---
# T-0023 entregue: Conector v1.1.0 (linhas inválidas, política de versão, chave por Conector, itens faturados) e adaptador Oracle

## Contexto
T-0023 (Conector v1.1.0 e adaptador Oracle), branch nuvem/T-0023-conector-oracle. Sem git por minha parte. Tudo dentro de apps/conector/**, modules/integracao/contracts/**, docs/modulos/integracao/**, mais UM acréscimo em modules/integracao/domain/estados.ts(+teste), estritamente para o item 5 (ver abaixo).

## O que fiz
1. Linhas inválidas com motivo (contrato compatível, continua v1): LoteEnvelope ganhou opcionais linhas_invalidas[] (external_id?, codigo, campo?, mensagem; sem valor de dado), linhas_invalidas_omitidas, conector_id, versao_conector; LinhaErro.origem (hub|conector) e LoteResultado.invalidas_omitidas. Conector: padrão 500 por lote (config lote.maxLinhasInvalidas, 0..5000); acima só a contagem; a linha inválida deixa de ir em registros. Limitação documentada: página só com inválidas não tem lote para viajar (RN-INT-01 recusa lote vazio) - ficam nos erros locais e no log.
2. Atualização v1: contracts/conector.ts (novo) com PoliticaVersaoConector (mínima, recomendada, mensagem, pacote{versao,url,sha256,assinatura}), SinalConector e RespostaSinal. Escolha: a política viaja na RESPOSTA do POST /sinal (a cada 1 min, por Conector), sem rota nova. Conector v1.1.0 informa a versão em todo lote, sinal e cabeçalho; src/politica.ts guarda a última política na fila local; conector status mostra [em dia]/[DESATUALIZADO]/[VERSÃO ABAIXO DA MÍNIMA] (código 3 se abaixo da mínima); abaixo da mínima PARA lotes, retornos, busca de pedidos, reconciliação e leitura do ERP (sinal segue, com parado_por_versao) e registra o motivo no status e no log. Semver em função pura (src/versao.ts) com teste. Pacote assinado: conector.md §7.4 (SHA-256 + assinatura RSA-3072/SHA-256, script de verificação PowerShell; openssl exercitado aqui, o PowerShell NÃO foi executado em Windows). Atualização automática: v2, não implementada.
3. Chave por Conector: hub.conectorId obrigatório na config (cabeçalho X-Macuxi-Conector-Id, lote e sinal); segredo renomeado hub_token -> hub_chave (MACUXI_CONECTOR_HUB_CHAVE; Credential Manager Macuxi.Conector/hub_chave; fallback env fora do Windows). Comando conector trocar-chave (entrada padrão, valida formato, testa no Hub, só então grava; código 4 se não há onde gravar); máscara de log ampliada (chave=, x-api-key, hub_chave) com testes. Escopo integracao.v1 e janela anterior_valida_ate descritos em ChaveConectorCriada (contrato do lado do Hub).
4. Oracle: src/erp/oracle.ts (oracledb thin, nunca inicializa cliente nativo; binds nomeados, nunca concatena; Date como TIMESTAMP WITH TIME ZONE; sessão em UTC com NLS ISO e NUMERIC_CHARACTERS='.,'; DATE/TIMESTAMP lidos como texto -> Date UTC porque o thin lê no fuso LOCAL do processo; NUMBER como texto exato (inteiro seguro vira number), dinheiro via centavos_de_decimal exato por aritmética de texto; paginacao offset (12c+) | rownum (11g) quando a consulta não tem :limite). Registrado em fabrica.ts e no esquema (erp.tipo oracle, erp.paginacao, erp.carteira). Exemplo conector.oracle.exemplo.json; conector.md §4.3. Bundle esbuild com oracledb testado (node dist/conector.mjs testar-conexao contra host inexistente devolve NJS-503 classificado como conexão).
5. Pedido: ItemFaturado {sequencia, produto_external_id?, quantidade, valor_cents?} em RetornoErp.itens_faturados (só faturado_*, min 1, sequência única) e repetido em integracao.pedido.retorno_erp@1. DIVERGÊNCIA consciente do texto da tarefa: usei sequencia (a do PedidoParaErp.itens, como já registrado em .coord/contratos/eventos.md) em vez de produto_id, porque o Conector só conhece o código do produto no ERP; o Hub resolve o produto_id interno pela sequência. Conector (src/pedidos.ts) mapeia colunas sequencia, quantidade, valor_cents, produto_external_id. Domain: novo transicionarRetornoPedidoErp + chaveNotaRetorno em domain/estados.ts (faturado_parcial repetido com nota diferente NÃO é repetição; mesma nota+série é; RN-INT-08), com teste.

## Arquivos
Contratos: modules/integracao/contracts/{conector.ts (novo),index.ts,lote.ts,pedido.ts,eventos.ts,index.test.ts}. Domain: modules/integracao/domain/{estados.ts,estados.test.ts}. Conector: src/{versao,politica,executor,status,comandos,hub/cliente,hub/tipos,lotes,mapeamento,sincronizador,remetente,pedidos,reconciliacao,contexto,iniciar,config/esquema,config/carregar,segredos/provedores,segredos/chave,log/mascara,erp/oracle,erp/fabrica,erp/driver}.ts; package.json (oracledb/@types/oracledb, versão 1.1.0); exemplos/conector.exemplo.json e conector.oracle.exemplo.json; testes novos atualizacao, chave, linhas-invalidas, oracle, versao; docs conector.md e desenho.md.

## Testes e checks
conector: 191 passaram + 9 pulados (7 PostgreSQL, 2 Oracle real) - antes 111/7. integracao: 122 passaram - antes 104. Verdes: conector lint/typecheck/test; integracao lint/typecheck/test; pnpm fronteiras; pnpm test, lint e typecheck da raiz; coord verificar modulo-integracao sem violações.

## Premissas e pendências
- ATENÇÃO pnpm: com oracledb no package.json, qualquer pnpm run tenta reinstalar e falha com ERR_PNPM_IGNORED_BUILDS (oracledb tem script de install; falta decidir em pnpm-workspace.yaml, que não é meu: allowBuilds/onlyBuiltDependencies com oracledb: false, pois o modo thin não precisa do script). Rodei tudo com pnpm_config_verify_deps_before_run=false. Além disso o pnpm alterou pnpm-lock.yaml no meu working tree (só aditivo: oracledb e @types/oracledb); não desfiz, conforme combinado - é o mesmo conteúdo do PR do lockfile.
- manifest.ts não foi tocado (fora do escopo desta tarefa): não há evento novo; se quiserem, declarar nele a rota de sinal/política.
- Oracle real não testado (não há instância): teste de integração fica pulado sem MACUXI_ORACLE_URL; as escolhas de DATE/TIMESTAMP vieram do código do oracledb 26.
- O Hub (apps/api, modules/integracao/api) ainda não tem rotas: o pedido ao engenheiro-software está em recado próprio.
- Validação por soma de itens_faturados vs quantidade enviada (R-20261031-123752 item 3) é do domain/Hub e NÃO foi feita aqui.
