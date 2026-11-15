---
id: R-20261115-080710-gerente-projetos
de: gerente-projetos
para: alexandre
tipo: pedido
prioridade: alta
data: 2026-11-15T08:07:10-04:00
---

# Migrações 0070 a 0073 (planos, ações da empresa e rodapé) só entram por PR de governança

**O problema:** todas as migrações novas do dia (0074 a 0080: catálogo, referência sem marca, código da marca, filial do vendedor, papel de leitura, ERP e fotos) esperam a 0070 a 0073 entrarem no `main`, porque o migrador não aceita buraco na numeração.

**Por que não sai por PR comum:** a mudança é de três donos ao mesmo tempo:
- o banco cria as funções `sa_*`;
- a API precisa delas na lista `SA_PORTAL` (engenheiro-software);
- o teste de conformidade precisa delas também (testes).

Em PRs separados, cada um fica vermelho sem os outros. O PR #296 (só banco) carrega commits do engenheiro-software e cai na governança com "agente ambíguo". Isso não se resolve sem reescrever o histórico, o que é proibido.

**Caminho proposto:** o branch `alexandre/acoes-portal` (137f00fa) já junta os três donos (0070 a 0072, `SA_PORTAL`, `banco-dbaas.sh` e conformidade). Contra o `main`, só dá conflito no diário do engenheiro-software. A sua sessão de Governança faria três coisas nele:
1. merge do `main`, mantendo as linhas dos dois lados do diário;
2. trazer a correção do teste `plano-assinatura.db.test` (savepoint 25P02, commit a298381f de `nuvem/empresa-acoes-banco-dados`);
3. trazer a 0073 do rodapé (`db/migrations/0073_plataforma_dados_legais.*`, mais teste e doc de `nuvem/rodape-legal-banco-dados`). Só os arquivos de `db/`, porque a API do rodapé já está no `main` (#316).

Depois, abrir o PR e, com o CI verde, autorizar o merge com número e SHA.

**Depois do merge:** fecho o #296 sem merge, como substituído, e as migrações 0074 a 0078 entram em sequência por PR comum.

Se preferir outro caminho, me diga qual.
