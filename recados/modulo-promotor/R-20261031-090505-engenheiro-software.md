---
id: R-20261031-090505-engenheiro-software
de: engenheiro-software
para: [modulo-promotor]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0010
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T09:05:05-04:00
---
# Revisão T-0010: sem 🔴; 2 🟡 de revalidação (atingimento de share e permanência)

## Contexto
Revisão final da T-0010 (engenheiro-software), pedida em R-20261031-124424-gerente-projetos. Escopo: modules/promotor/contracts/**, manifest.ts (+ manifest.test.ts), fronteiras e RN-PRO-01. Estado conferido: `pnpm --filter @macuxi/promotor test` 14 arquivos / 143 verdes; lint, typecheck e fronteiras da raiz verdes. `packages/platform-sdk/src/ambiente.ts` já está no main desde 0a3d612 (A3). Espelho em packages/platform-sdk/src/manifestos-referencia.test.ts e .coord/contratos/modulos.md atualizados por mim com `admin` em perfis.

Veredito: **sem 🔴**. Manifesto, eventos `promotor.*@1`, perfis da matriz §2 (ADR 0004) e RN-PRO-01 corretos. Dois 🟡 de revalidação no contrato.

## O que preciso
🟡 1. modules/promotor/contracts/coletas.ts:121-144 (MedicaoShare): `atingimento_pct` vem do aparelho e não é conferido. `share_pct` é recalculado (linha 142), mas o atingimento (RN-PRO-03) não. Conferir `atingimento_pct === atingimentoShare(share_pct, meta_pct).atingimento_pct` e exigir `meta_share_id` quando `meta_pct` vier (hoje só o inverso, linha 143). A API sempre revalida (CLAUDE.md regra 2) e o contrato diz que roda os refinamentos.
🟡 2. modules/promotor/contracts/coletas.ts:60 e 67-77 (VisitaLoja): `permanencia_min` é aceito sem conferir com `checkin_em`/`checkout_em`. É ele que decide se a visita conta (RN-PRO-07, `visitaConta`), então o aparelho pode inflar a permanência. Recalcular com `permanenciaMinutos(checkin_em, checkout_em)` (tolerância de arredondamento definida em regras.md) ou recusar divergência.
🟢 3. coletas.ts:10-16: o contrato importa do domain (constantes e validações). Aceito (o vendedor tem o mesmo padrão, contracts/index.ts:19) desde que o domain do promotor siga puro e sem dependência pesada; consumidores do contrato (gestor, vendedor) carregam o domain junto.
🟢 4. contracts/base.ts:7 e index.ts:6: `export *` publica `Uuid`, `InstanteUtc`, `PrecoCents`… e reexporta `IsoDate` do core como contrato do promotor. Sugiro exportar só os schemas de negócio, para outro módulo não passar a depender dos primitivos do promotor.
🟢 5. domain/rn-pro-01.test.ts:26-34: o teste "mesmo com o Vendedor ativo" usa só o manifesto do promotor, então `pedido.*` nem existe e o `false` é trivial. A garantia real está no platform-sdk (permissoes.ts:29 e 64; manifesto.ts:78). Sugiro um manifesto sintético inline com `pedido.criar` (perfis: vendedor) para o teste provar a negação ao promotor, ou renomear o caso.
🟢 6. Payload dos eventos `promotor.*@1` ainda sem schema Zod em contracts (nenhum módulo tem ainda). Criar quando entrar o primeiro consumidor (gestor ou o alerta de ruptura do vendedor), com o nome exato do evento.
🟢 7. FotoColeta (coletas.ts:37-38): latitude/longitude obrigatórias. Dentro da loja o GPS pode faltar; vale uma regra de produto (coordenada nula + flag `sem_gps`?) antes do app. Pergunta para o Alexandre via gerente.

## Pronto quando
🟡 1 e 2 corrigidos com teste citando RN-PRO-03 e RN-PRO-07 (antes da API do promotor); 🟢 a seu critério, com resposta neste fio.
