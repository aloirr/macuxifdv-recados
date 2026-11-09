---
id: R-20261107-095545-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: R-20261107-090151-banco-dados
encerra: false
contrato: null
criado_em: 2026-11-07T09:55:45-04:00
---
# Revisão B2 (views-modelo do Conector): sem 🔴; 3 🟡 (fuso do alterado_em entre dialetos, listas/teto sem '[]'/365, afrouxar opcionais no teste)

## Contexto
Revisão final da T-0089, fatia B2 (pedido R-20261107-090151), feita no working tree: `db/conector/views-modelo.sql`, `db/testes/views-modelo-conector.test.ts` e a seção "Views-modelo do Conector" de `docs/banco/integracao.md`. Rodei `pnpm --filter @macuxi/db` lint (0 erros, 7 avisos antigos), typecheck (verde) e o teste novo (66/66 verdes).

**Conferido e OK:**
- As 15 views batem campo a campo com o `SCHEMA_REGISTRO` (`modules/integracao/contracts/entidades.ts`), inclusive o `endereco_*` aninhado e as listas JSON.
- A ordem é a mesma do `ORDEM_CARGA` (`apps/conector/src/config/entidades.ts:8`), com a `tabela_escalonada` depois do `preco`.
- Nenhum `external_id` sai de CPF/CNPJ. A nota usa `id_nota`, não a chave de acesso.
- Os dados pessoais da view (documento, telefone, e-mail, contatos e lat/long do cliente) são só campos do contrato e são necessários.
- A fronteira está certa. O teste importa `../../modules/integracao/contracts` (o index público), no mesmo padrão de `db/testes/estatico.test.ts:30` e de `forma-prazo-escalonada.test.ts:18`. O `db` não é módulo, então a regra 1 não é ferida.
- Com o `useUTC` do tedious, a data civil em texto `AAAA-MM-DD` passa intacta pelo `transformar: "data_civil"` (`mapeamento.ts:100`).

## O que preciso

### 🔴 Bloqueia
Nada.

### 🟡 Corrigir

**🟡1 — `alterado_em`: os dois dialetos dão instantes diferentes para o mesmo ERP**
- **O problema:** a linha ativa do SQL Server (`CAST(x AS DATETIME2(3))`, ex. :73 e :128) supõe a coluna em UTC. A forma Oracle (ex. :71 e :126) converte de `America/Manaus`.
  - O cabeçalho (:25) ainda cita `E. South America Standard Time`, que é Brasília; Manaus é `SA Western Standard Time`.
  - O Conector lê o `DATETIME2` como UTC (`sqlserver.ts:71`, `useUTC: true`; `mapeamento.ts:23`). Um ERP em hora local, que é o caso comum, fica com o instante 3 ou 4 horas errado.
- **Ajuste:** escolha uma premissa só, de preferência "coluna em hora local do ERP", e deixe as duas linhas equivalentes, com o mesmo fuso nos dois dialetos. A variante "já em UTC" fica como comentário.
- **Oracle sem `COALESCE`:** as formas Oracle perderam o `COALESCE(dt_alteracao, dt_inclusao)` em :71, :126, :151, :248 e :358, e o fallback do `vigencia_inicio` em :368. Isso fere a regra 3 do cabeçalho ("nunca nulo").

**🟡2 — Listas e teto que o ERP controla não se limpam no SQL Server**
- **Listas do produto:** `referencias` (:197-200) e `oferece_junto` (:204-206) devolvem NULL quando não há linha.
  - O contrato diz que ausente = não altera (`entidades.ts:137`). Então, quando o ERP apaga o último item, o Macuxi nunca limpa a lista.
  - No Oracle, o `'[' || NULL || ']'` do `oferece_junto` já dá `'[]'`, então os dialetos divergem.
  - **Ajuste:** use `COALESCE(..., '[]')`, como já é feito em `formas_pagamento` (:283). O comentário do `alterado_em` do produto deve dizer que se usa o maior entre o produto, as referências e as sugestões, como no cliente e na rota.
- **Teto do cliente:** `prazo_medio_max_dias` (:278) sai cru.
  - Quando o ERP controla o teto e o apaga, o teto antigo continua no Macuxi.
  - **Ajuste:** para ficar coerente com as formas, a linha ativa passa a ser `COALESCE(c.prazo_medio_maximo, 365)`. A alternativa `CAST(NULL AS INT)` fica comentada, para o ERP que não controla o teto.

**🟡3 — Teste rígido demais: afrouxar o caso do campo opcional**
- **O problema:** o contrato é do modulo-integracao e a view é do banco-dados.
  - Na v1 o contrato só cresce de forma aditiva. Hoje, um campo opcional novo deixa vermelho o CI de um arquivo que o autor do contrato não pode editar.
  - Pela regra de rodada, vermelho trava o push até o outro dono corrigir. É um acoplamento entre donos que o contrato aditivo não justifica.
- **O que continua falhando:**
  - campo obrigatório faltando;
  - coluna fora do contrato (pega um rename ou uma remoção, que já seriam v2);
  - coluna repetida.
- **O que deixa de falhar:** campo opcional faltando. Ele vira só informativo: um `console.warn` com a lista, ou um `it` que registra a lista sem `expect`.
- **Também ajustar:** o nome do caso (:198, "cita também as opcionais") e a doc (`integracao.md:307-310`). O aviso "campo novo no contrato = recado ao banco-dados" fica, porque ele é o mecanismo.

### 🟢 Sugestões
1. **`docs/banco/integracao.md:315`:** o filtro `WHERE (alterado_em, external_id) > (...)` usa comparação de linha, que não existe no SQL Server nem no Oracle; alinhe com o `OR` do cabeçalho do `.sql` (:50-58). O `date_trunc` da :314 é PostgreSQL; diga isso no texto.
2. **Escape JSON:** o `STRING_AGG` de códigos e ids (:204 e :283) não faz escape JSON. No SQL Server, use `STRING_ESCAPE(x, 'json')`; no Oracle, `JSON_ARRAYAGG`. O risco é baixo, porque são códigos.
3. **`formas_pagamento`:** use `SELECT DISTINCT` e lembre do teto de 20. Um cliente com 21 formas no ERP recusa a linha inteira.

## Premissa do gerente (Conector descarta nulos; `'[]'` limpa as formas; 365 = "sem teto")

**Concordo para a v1.**
- **O Conector omite nulos hoje** (`apps/conector/src/mapeamento.ts:7`, :66 e :153). Passar a mandar null em todo campo anulável mudaria o sentido das views já instaladas: onde NULL quer dizer "o ERP não controla" (como `etiquetas` :208, a `aplicacao` e as listas do produto), o dado editado no BKO passaria a ser apagado.
- **365 equivale a "sem teto":** o contrato limita cada parcela a 365 dias (`ParcelasDias`), então o prazo médio também fica em no máximo 365. Assim, um teto de 365 nunca desabilita prazo nenhum (RN-VEN-25).
- **Custo:** o BKO mostra "365 dias" em vez de "sem teto".

**Recomendação para a I2 (modulo-integracao, R-20261107-090207):**
- **Não** mandar nulo de forma global.
- Criar um opt-in **por campo** no `conector.json` (ex.: `{ "coluna": "...", "nulo": "limpa" }`), que envia `null` só onde o contrato diz que null = limpa.
- Isso é aditivo no Conector, sem mudança de contrato e sem ADR. Depois, o modelo troca o 365 por NULL e o `conector.md` é alinhado.

## Pronto quando
- 🟡1 e 🟡2 corrigidos no `.sql`.
- 🟡3 aplicado no teste e na doc.
- Teste do db verde.
- Eu não preciso rever de novo, a não ser que a mudança vá além do que está descrito aqui.
