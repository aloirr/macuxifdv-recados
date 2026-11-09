---
id: R-20261101-112205-modulo-integracao
de: modulo-integracao
para: [alexandre, gerente-projetos]
cc: [engenheiro-software, banco-dados]
tipo: entrega
prioridade: normal
tarefa: T-0027
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T11:22:05+00:00
---
# T-0027 entregue (PR #24): inválida nunca inativada, lote só de inválidas, 426 como pausa, external_id 200, P-2/P-5/P-6, Node 24

## Contexto
T-0027 (Conector ↔ Hub: alinhamento, Sprint 2, nuvem) entregue no PR https://github.com/aloirr/macuxifdv/pull/24 (branch nuvem/T-0027-conector-hub-alinhamento). Só os 4 caminhos travados: apps/conector/**, modules/integracao/contracts/**, modules/integracao/domain/**, docs/modulos/integracao/**. Lockfile intacto.

## O que mudou
- 🔴 **Inválida nunca inativada (RN-INT-06, D-1)**: o Conector 1.2.0 manda na carga completa TODA linha inválida com o external_id (mesmo com `descartar`), sem omitir nada: fatias de até 500, e o que sobra vira parte só de inválidas. No domain, `calcularInativacao` ganhou `invalidosNaSessao`, e `idsDaSessaoNoLote` monta os ids por parte. Teste dos dois lados, incluindo carga completa com 1 linha inválida.
- 🟡 **Exceção da RN-INT-01 / P-1**: a página só com inválidas vira lote `registros: []` e termina `concluido_com_erros`; a última página fecha a sessão.
- 🟡 **Seção 16 do hub-api.md, D-1 a D-7 resolvidas**:
  - external_id até 200 nos dois lados (`EXTERNAL_ID_MAX`);
  - 426 é PAUSA (`ErroHubVersao`), sem bloquear a entidade; guarda `detalhes.versao_minima` e segue só com o sinal;
  - o Conector pede `limite_erros=5500`;
  - o 409 de idempotência continua bloqueando, de propósito.
- 🟡 **P-2, P-5, P-6 (+P-7)**:
  - teste de "lote aplicado, inativação aguardando";
  - teste da convivência de 24 h como parâmetro;
  - `domain/topologia.ts`: `verificarTopologiaConectores` (409 `topologia_conflitante`) e `validarEnvelope({ entidadesDoConector })` (422 `entidade_de_outro_conector`);
  - `ConectorCriar/Atualizar/Resumo.entidades` (padrão: as 8).
- 🟢 **Runtime**: `empacotar.mjs` mira node24 e o pacote declara `engines >= 24.7`. O conector.md diz que o pacote leva o próprio Node 24 LTS portátil junto do WinSW; saiu o "Node 22 no cliente". A troca de emitWarning do node:sqlite foi removida: o Node 24.22 não emite mais o aviso.
- **Testes**: @macuxi/integracao 281 → 300; @macuxi/conector 222 → 240 (+10 pulados). lint, typecheck, test da raiz, fronteiras e `verificar --base origin/main` verdes.

## Pedidos ao time local (fora da trava)
- **engenheiro-software** (rotas A2/A7/A9 do hub-api.md §17):
  - `validarEnvelope` com `entidadesDoConector`;
  - `idsDaSessaoNoLote` por parte e `calcularInativacao({ invalidosNaSessao })` ao fechar a sessão;
  - `verificarTopologiaConectores` em POST/PATCH /conectores;
  - 426 com `detalhes.versao_minima`;
  - aceitar `?limite_erros=5500`;
  - revisão do PR.
- **banco-dados**:
  - coluna `integracao.conector.entidades text[]` (P-6);
  - `sessao_carga_recebido` recebe os `invalidos`;
  - `external_id` ≤ 200, se houver CHECK ou varchar.
- **modulo-integracao, tarefa local**:
  - P-3 (`inativacao.decidir` para admin e analista no manifest.ts);
  - P-4 (`aplicarRetornoPedido` aceita o retorno sem os itens inválidos; hoje dá 422).
- **gerente-projetos**: destravar os caminhos após o merge e registrar a linha do diário (`.coord/diario` fica fora da trava desta frente).

## Premissas
- "Até 500 por entidade" = até 500 detalhadas por lote. Na carga completa o Conector manda mais lotes em vez de omitir.
- `descartar` vale só no delta.
- external_id acima de 200 vai sem id, sem truncar, e então a sessão não inativa nada.
- Conector sem `entidades` recebe as 8.
- Montagem do .zip com node.exe e WinSW fica na tarefa do pacote assinado.
- Versão do Conector 1.2.0.

## Pronto quando
CI do PR e do main verdes → merge squash (ou "[PRONTO PARA MERGE]" no PR se o main estiver vermelho); revisão do engenheiro sem 🔴.
