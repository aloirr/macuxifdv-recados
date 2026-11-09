---
id: R-20261106-190815-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:08:15-04:00
---
# T-0089: 0037 revisada sem 🔴 (pode ir para o lote); desenho §8 P7 ajustado; SDK de FTS5 da T-0084 pronto para subir

## Contexto
T-0089: revisão da `0037_forma_prazo_escalonada` (R-20261106-184517), ajuste da P7 no desenho (R-20261106-074250) e o estado do SDK de FTS5 da T-0084.

## O que fiz
### 1. 0037: pode ir para o lote
A revisão (R-20261106-190347, ao banco-dados) não tem 🔴. O critério final é o CI (`stack-isolado.yml`), que roda os casos de banco.
- **Os 4 desvios estão aceitos:**
  - preço da faixa em bigint, como o `preco_cents`;
  - vigência em `date` fechada nas duas pontas, com início obrigatório, que segue o `DataCivil` do Hub;
  - o banco só confere que o prazo médio fica entre a menor e a maior parcela, e o cálculo fica no domain;
  - as 8 colunas do pagamento vão juntas ou nenhuma.
- **Semeadura da P7:**
  - o gatilho AFTER INSERT em `plataforma.tenant` mais o backfill segue o padrão da 0006 e da 0018, e vale para o `provisionar_tenant` e o `sa_provisionar_tenant`;
  - não duplica, e não semeia se já existir forma, nem apagada.
- **RLS, únicos, grants e down:** RLS forçado com `manutencao`, únicos com `tenant_id`, FKs compostas, worker sem acesso, `excluir_tenant` dinâmico e down na ordem certa.
- **Demo:** apagar a "À vista" é coerente com a P7. A P7 garante o nascimento, e a demo segue com Pix e Dinheiro à vista ativos, como pede o B4.
- **🟡 Y1 (não bloqueia):** o `db/testes/provisionar-tenant.test.ts` deve conferir também a forma e o prazo padrão.
- **🟢:** o doc deve dizer que o "hoje" da vigência é a data no fuso do tenant.

### 2. Desenho atualizado
- §8 P7 com o ajuste do gerente: forma padrão, gatilho, ids, "garantia de nascimento, não invariante", adoção da AVISTA do ERP pelo código e a demo.
- §6 com "como saiu".
- Aviso R-20261106-190407 ao modulo-vendedor (cc modulo-integracao): o consumidor adota pelo código a AVISTA semeada, sem 23505 em loop.

### 3. SDK de FTS5 (T-0084): pronto para subir
Inclui `ContextoConsultaAparelho.buscarComDesfecho`, `IndiceBusca.versaoDocumentos` e `documento(…, ctx?)`, `conferirVersoes` e o top-k antes do join.
- Revisei o diff e não achei 🔴.
- `@macuxi/platform-sdk`: typecheck e lint verdes, 557 testes passando (41 arquivos).
- `consultas-busca.test.ts` com 10 casos, incluindo os 20 mil produtos com p95 < 300 ms. O caso de desempenho leva cerca de 85 s, com timeout de 240 s.
- Registrei os contratos em `.coord/contratos/modulos.md` (Leituras do motor) e no complemento da ADR 0012, que era a pendência que eu tinha anotado.
- A tela de medição do engenheiro-apps pode subir junto.

## Arquivos (meus)
- `docs/desenho/T-0089.md` (§6 e §8)
- `.coord/contratos/modulos.md`
- `docs/decisoes/0012-consultas-entre-modulos.md`
- `.coord/diario/engenheiro-software.md`

## Pendências
- Y1 com o banco-dados.
- B2 (views do Conector) segue aberto, em tarefa à parte.
- O `verificar engenheiro-software` acusa só os 4 anexos do Alexandre em `.coord/recados/anexos/` (sem dono). Não são meus: cabe ao gerente decidir se `anexos` entra no `donos.json`.

## Pronto quando
O gerente põe a 0037 e o SDK no lote da rodada, com o CI verde.

## Adendo: typecheck dos consumidores do SDK
- `@macuxi/catalogo`: verde.
- `apps/mobile`: um único erro, que não é do SDK. `modules/core/app/consultas.ts:9` (arquivo novo do modulo-core, ainda não está no git) importa o `DEFAULT_TZ` da raiz de `@macuxi/comum`. Mandei o aviso ao modulo-core: o import certo é `@macuxi/comum/fuso`. Esse arquivo não pode entrar no lote antes de corrigido.
