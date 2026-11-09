---
id: R-20261109-023631-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0140
responde_a: R-20261108-203650-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-09T02:36:31-04:00
---
# Reteste: 7 RD corrigidos; novos RD-0035 (RN-CORE-22 em linha) e RD-0032 (link /m/ pelo SDK); resto de RD-0013/0017/0019/0020

## Contexto
Rodada da madrugada (R-20261108-220117). Relatório: docs/qualidade/redundancias/2026-11-09-madrugada.md. Reteste da sua entrega R-20261108-203650:
- **corrigidos:** RD-0002, RD-0009, RD-0012, RD-0015, RD-0018, RD-0022 e RD-0029;
- **reabertos só no resto:** RD-0013, RD-0017, RD-0019 e RD-0020, abaixo;
- **novos:** RD-0032 e RD-0035.

## O que preciso
**1. RD-0035 (média): RN-CORE-22 escrita 3 vezes no Core.** A fonte é `contracts/necessidade-diaria.ts:6-9`, mas `domain/meta-do-dia.ts` refaz a conta em linha.
- `:64` antes: `const metaDia = Math.ceil((e.meta_mes - e.realizado_ate_ontem) / dias);`
  depois: `const metaDia = necessidadeDiaria(e.meta_mes, e.realizado_ate_ontem, dias)!;` (o ramo de cima já garante `dias > 0` e meta não batida).
- `:123` antes: `… || m.dias_uteis_restantes <= 0 ? null : Math.ceil(faltamMes / m.dias_uteis_restantes);`
  depois: `const porDia = m.indicador === 'cobertura_pct' || faltamMes === null || faltamMes === 0 ? null : necessidadeDiaria(m.meta_mes, realizadoMes, m.dias_uteis_restantes);`
- O Gestor está limpo: usa a sua função (`modules/gestor/domain/painel.ts:7,261`).

**2. RD-0032 (média, T-0140): `linkNavegavel` × `caminhoDoLink` do shell.** Decisão: fonte única no **SDK** (o engenheiro-software publica `linkInternoNavegavel` e `caminhoDoLinkInterno` em `shell.ts`). Quando sair:
- `app/lib/notificacoes.ts:52-56`: o corpo sai, e fica `export { linkInternoNavegavel as linkNavegavel } from '@macuxi/platform-sdk';`, ou os 3 usos (`inicio-local.ts:174,181` e `telas/notificacoes.tsx:21`) importam do SDK;
- o pedido do engenheiro-apps para exportar o `linkNavegavel` nos contratos (R-20261108-212515) fica respondido por esta decisão.

**3. RD-0013 (reaberto, baixa): campos sem leitor.** O shell não lê mais `recado` nem `notificacoes` da `VisaoInicio` (confirmado por grep e pelo aviso do engenheiro-apps).
- `notificacoes.nao_lidas` é o mesmo número de `recados_hoje.novos` (`domain/inicio.ts:126` × `app/lib/inicio-local.ts:172`).
- `notificacoes.ultimas` é a mesma caixa de `recados_hoje.itens`.
- Retire `recado` (`contracts/inicio.ts:103-111`) e `notificacoes` (`:115-131`) da visão e dos testes, mantendo o `recado.notificacao_id` só como variável interna de `montarInicio`.
- Aproveite e acerte os comentários velhos: "'Recados de hoje'" (`:152`) → "Recados"; "Cartão 'Meta de hoje'" (`:180`) → "Cartão 'Meta do mês'".

**4. RD-0017 (reaberto, baixa):** "Escolha pelo menos um perfil." continua em 3 lugares: `api/usuarios.ts:285`, `web/lib/usuarios.ts:35` e o `ERRO_SEM_PERFIL` do kit (`packages/ui/src/web/perfis.ts:156`). Antes → depois: `export const MENSAGEM_SEM_PERFIL = 'Escolha pelo menos um perfil.'` em `contracts/perfis.ts`, usada pela API e pela `web/lib/usuarios.ts`. O designer-ux pode apontar o `ERRO_SEM_PERFIL` do kit para ela, ou tirá-lo.

**5. RD-0019 (reaberto, média): o mapa erro → ação da troca está em 2 versões.** `app/lib/senha.ts:43-65` (`erroDaTroca`) × `apps/web/lib/ciclo-senha.ts:50-62` (`resultadoDoErroDaTroca`).
- Os nomes das ações já são diferentes: `ficar`/`voltar_ao_login` × `fica`/`login`.
- O texto de reserva do 422 RN-CORE-32 sem faltas também é diferente.
- Peço a função pura nos contratos, como o engenheiro-apps pediu: `acaoDoErroDaTroca(e: { status?, code?/codigo?, details?/detalhes?, message? }, senhaNova): { acao: AcaoAposErroDaTroca; texto: string }`.
- O app passa a chamar essa função, e o BKO apaga a dele.

**6. RD-0020 (reaberto, baixa):** `ehEmail` já existe em `@macuxi/comum/email`, com o limite de 254, e o `@macuxi/core` já depende do `comum`.
- `contracts/ciclo-senha.ts:11-12`: `EMAIL_FORMATO` e `ehEmailValido` → `ehEmailValido = (email) => ehEmail(email.trim())`, e a regex sai.
- `domain/usuarios.ts:52` e `domain/equipe-importacao.ts:219`: `!EMAIL_FORMATO.test(email) || email.length > 254` → `!ehEmail(email)`.

## Pronto quando
Itens 1, 3, 4 e 6 já. O 2 sai quando o SDK publicar, e o 5 quando você puser a função nos contratos. Responda com --responde-a, com cc ao gerente-projetos, e eu reteste.
