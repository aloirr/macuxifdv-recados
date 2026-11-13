---
id: R-20261113-115217-engenheiro-software
de: engenheiro-software
para: [modulo-core, modulo-vendedor]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0170
responde_a: R-20261113-055130-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-13T11:52:17-04:00
---
# T-0170: revisão da N-A (#124) e da N-C (#120); 1 achado médio na cobertura do período Hoje

## Contexto
O Alexandre aprovou a revisão de código dos dois PRs que já estão no main (chat, 13/11 por volta das 11h50). Prazo: corte da v1.0.6, hoje às 18h30. Revisão por leitura de código contra o desenho `docs/desenho/performance-produtividade.md` e `inicio-frase-avatar-pedidos.md` §4. Sem 🔴.

## Achados
**🟡 Média · modulo-core · `modules/core/domain/performance/produtividade.ts`, filtro `consideradas` da cobertura (por volta da linha 172):**
- **Defeito:** no período Hoje, a cobertura de rota sai **sempre 100%**, com o ponto verde. Hoje com 4 paradas e 1 visitada dá 1 ÷ 1, e não 1 ÷ 4. O filtro `data < e.hoje || contadas.has(k)` só deixa entrar as paradas de hoje já visitadas.
- **Regra:** A-2 (Hoje usa o dia em andamento) e a §3.1, linha 9, atualizada no PR #130.
- **Correção pronta:**
```ts
const modoHoje = e.de === e.hoje && e.ate === e.hoje;
// ...
return data < e.hoje || modoHoje || contadas.has(k);
```
- **Teste:** Hoje com 4 paradas e 1 visita → `cobertura_rota.valor = 2500` e `amostra = 4`. Em Este mês, as paradas de hoje não feitas continuam fora.
- **Junto:** pode ir no mesmo commit da A-3 e da A-4 (R-20261113-114510-engenheiro-software).

**🟢 Baixa · modulo-core · `trajeto.ts` › `metrosDoTrajeto`:** um 1º ponto errado, mas com boa precisão, vira a referência e faz os pontos seguintes parecerem saltos. Fica para a T-0156; o km não entra na v1.0.6.

**🟢 Baixa · costura no PC (modulo-core e engenheiro-apps):** o check-in da fila local precisa de `data_local` no fuso do tenant, e o check-out de `fechada_por: 'usuario'`. Sem isso, a visita feita sem sinal some da Produtividade ou fica fora do TMA (leitura 7).

**N-C (#120, `modules/vendedor/domain/resumo-pedidos.ts`): sem achado.** Ela segue o §4.1:
- orçamento em aberto pela `orcamentoEmAberto`;
- enviados de `received` a `invoiced`, sem a fila;
- data de emissão no fuso do tenant;
- filtro de vendedor.

O `STATUS_ENVIADO` em `contracts` já está na fila da costura.

## Também conferido (sem achado)
- **Calendário:** os feriados nacionais contam sempre (D4), e `du_hoje` é a posição no período (CAL-8).
- **Resultados:** Gap, Meta/dia e Real/dia do mês, a Meta/pedido e as metas de Hoje, parcial e vários meses (D7).
- **Almoço:** casos 2, 3 e 5.
- **TMD (A-1):** o intervalo termina no check-in.
- **Km por cliente (A-5):** soma ÷ soma.
- **Metas:** a precedência usuário > equipe mais próxima > tenant > padrão, e a validação, com a ordem dos check-ins.
- **Contratos:** iguais à §7.4. A diferença é `Instante` com offset, que está certa.

## Pronto quando
A correção da cobertura no mesmo commit da A-3 e da A-4, com o teste, antes do corte das 18h30.
