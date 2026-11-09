---
id: R-20261108-003114-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0113
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T00:31:14-04:00
---
# T-0113 etapa 1: ADR 0034 (marcas no Catálogo, substitui a 0027), desenho, registros e pedidos B/K/P

## Contexto
T-0113, decisão do dono R-20261107-173950 b. Fiz só documento, desenho, registros e recados. Não toquei em packages/platform-sdk, apps/api nem scripts/deploy (fatia S da T-0094 em outra instância).

## O que fiz
1. **ADR 0034 (proposta)**, `docs/decisoes/0034-marcas-concorrentes-no-catalogo.md`, substitui a 0027 (marcada "substituída" e indexada no README).
   - **Dono**: o Catálogo, com a tabela `catalogo.marca_concorrente`. O nome não é `marca` para não confundir com a marca própria do produto. Sem exclusão: só inativa e reativa. Ação nova `marca.gerenciar` (analista e admin).
   - **Contratos @1**:
     - consulta `catalogo.marcas@1`, na API e no aparelho, com a forma da `promotor.concorrentes@1` e os campos renomeados;
     - entidade de pull `marca_concorrente`;
     - evento `catalogo.marca_concorrente.alterada@1`, com o estado completo e `fato` criada|alterada|inativada|reativada.
   - **Promotor**: lê por `catalogo.marcas@1` (`usaConsultas`, porque o Catálogo já está em opcionais), sem cópia. Sai a FK `produto_concorrente_concorrente_fk`; a validação passa a ser pela consulta. Sai da RN-PRO-12 a parte "concorrente com produto vivo".
   - **Migração única (banco-dados, 0043)**:
     - copia todas as linhas com os MESMOS ids;
     - confere por tenant;
     - preenche `marca_nome`;
     - cria a FK da referência no mesmo schema;
     - deixa o Promotor só de leitura (fecha a janela do deploy sem perda silenciosa);
     - down de volta.
     É um lote único B → K → P → lockfile → testes.
   - **Deprecação**: `promotor.concorrentes@1` delega para a consulta nova, e a entidade `concorrente` devolve página vazia (o APK v1.0.0 não toma 404). Remoção na fase 2, não antes de 2026-12-08, sem pull de `concorrente` há 7 dias.
   - **marca_nome**: continua. Renomear atualiza na mesma transação; marca inativa vira lápide no pull.
2. **Desenho** `docs/desenho/T-0113.md`: fatias B, K, P, E e T com critérios, ordem do deploy e a tabela do que muda no BKO (Catálogo → Marcas concorrentes nova; aba Concorrentes do Trade vira aviso e link).
3. **Registros**:
   - `.coord/contratos/eventos.md`: linha de `catalogo.referencia.marca_desconhecida@1` (pedido do Catálogo, encerrado) e de `catalogo.marca_concorrente.alterada@1` (planejado);
   - `.coord/contratos/modulos.md`: `catalogo.marcas@1`, a entidade `marca_concorrente`, `promotor.concorrentes@1` DEPRECADA e a nota em `produto_referencia`.
4. **Recados de pedido**: banco-dados R-20261108-002517, modulo-catalogo R-20261108-002630, modulo-promotor R-20261108-002650.

## Testes
Só documentos. `node scripts/coord.mjs verificar engenheiro-software`: OK, sem violação.

## Pendências e decisões para você
1. Doc 03: RN-CAT-09 com o texto novo, RN-CAT-13 (proposta), RN-PRO-12 sem a parte de concorrente. O texto está na ADR §7.
2. Doc 02 RF-PRO-11 e doc 06 (linha da referência cruzada): "cadastrada no Promotor" passa a "no Catálogo".
3. Confirmar com o dono a premissa P1: um tenant com o Promotor e SEM o Catálogo fica sem marcas. Os pacotes comerciais sempre trazem os dois.
4. Interpretação minha: o Promotor lê pela consulta e não precisa consumir o evento. O evento existe como contrato de mudança, e o Hub pode usá-lo para reprocessar marca desconhecida. Se o dono quiser o Promotor consumindo, a forma já está pronta.
5. Despachar a fatia T (testes) e, depois da fatia S da T-0094, me chamar para o lockfile (Catálogo sem @macuxi/promotor, Promotor com @macuxi/catalogo).
6. Aceitar a ADR 0034.
