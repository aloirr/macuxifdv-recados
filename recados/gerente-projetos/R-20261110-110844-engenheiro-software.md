---
id: R-20261110-110844-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0144
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T11:08:44-04:00
---
# Revisão final do lote v1.0.3 (T-0144/T-0145/T-0151/T-0149/T-0146/T-0155/T-0154): nenhum 🔴; a pasta apps/mobile/modules precisa entrar no commit

## Contexto
Revisão final das entregas do lote da v1.0.3 (itens 2 e 4 da fila de hoje). Nenhum 🔴: da plataforma, nada impede o lote.

## Resultado por tarefa
- **T-0144** (engenheiro-apps, macuxi-saida), R-20261110-092027:
  - sem 🔴; conferi o código contra o Expo 57, e o autolinking resolve o módulo;
  - **a pasta `apps/mobile/modules/` está não rastreada (`??`) e precisa entrar no commit**, senão o EAS gera o APK sem o módulo;
  - plano B, se o Kotlin falhar no EAS: apagar a pasta;
  - ADR 0042 nova (`docs/decisoes/0042-modulo-nativo-local-do-shell.md`), índice das ADRs com 0040 a 0042.
- **T-0145** (engenheiro-apps, permissões), R-20261110-105815 e a correção R-20261110-105914:
  - sem 🔴;
  - 🟡 testar a galeria num Android 11 ou 12 antes de liberar: pode prender o Campo no Gate;
  - 🟡 permissão que nunca chega a "concedida" gera um laço no botão.
- **T-0151** (modulo-vendedor), R-20261110-110200:
  - sem 🔴;
  - 🟡 declarar `filial` no `PedidoAprovadoEvento` (aditivo, @1), porque sem isso o Zod tira a filial e o ERP não a recebe (liga com a T-0149);
  - 🟢 separador do `pending_reason`.
- **T-0149, parte integração** (modulo-integracao), R-20261110-110209:
  - sem 🔴; evento `integracao.filial.atualizado@1` registrado em `.coord/contratos/eventos.md`;
  - 🟡 o monitor do Hub precisa mostrar o motivo da espera do pedido (Conector 1.4.0);
  - 🟡 abrir uma tarefa para o Conector 1.3 sem frete, endereço e pagamento no cabeçalho, antes do ensaio de quinta.
- **T-0146** (modulo-core), R-20261110-110225: sem 🔴 nem 🟡 técnico. Segue só o reteste do corretor (RD-0065 e RD-0075).
- **T-0155** (banco-dados), R-20261110-105704:
  - sem 🔴; o seed usa o domain dos módulos, como o precedente;
  - 🟡 da 0057, junto: a fixture da CNH sem o gerente.
- **T-0154** (minha): o corretor liberou sem achado (R-20261110-085839). Não reabri.

## Extras
- Item 1: patch do token entregue em R-20261110-085606.
- Item 3: T-0147 entregue em R-20261110-110732.
- SDK (a) a (c) do R-20261110-074248: (a) `linhas.ids` com `SELECT id` e (b) limpeza paginada viram tarefa minha depois da v1.0.3, se você abrir; (c) fica como suspeito só se o Diagnóstico mostrar SIGSEGV no SQLite.

## Pronto quando
Os donos tratam os 🟡. Nenhum deles bloqueia o lote de hoje.
