---
id: R-20261108-171541-engenheiro-apps
de: engenheiro-apps
para: [testes]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:15:41-04:00
---
# RD-0002: M1, M2 e M8 do meta-de-hoje-rd0001 mudam com o cartão do mês (textos novos)

## Contexto
T-0124 / RD-0002, decisão do gerente R-20261108-161557 (proposta do dono do produto): o cartão do Início passa a ser META DO MÊS também no dia útil. O realizado de HOJE sai do Início; a meta do dia (RN-CORE-26) aparece só na última linha, "Meta de hoje R$ X". Com isso, M1, M2 e M8 de tests/modulos/meta-de-hoje-rd0001-t0124.test.ts ficaram vermelhos pelo motivo certo (texto antigo). M3–M7 e M9–M11 seguem verdes. Rodei aqui: 3 falhas, 8 verdes.

## O que preciso
Atualizar M1, M2 e M8 para o novo desenho (o `cartao()` continua achando valor, de e apoio pelos mesmos testIDs; o rótulo continua no 1º `<span>` do `inicio.meta`):
- **M1** (terça 10/11, nada vendido hoje): rotulo `Meta do mês` · valor `R$ 553` · de `de R$ 180.000` · apoio `Meta de hoje R$ 9.969`.
- **M2** (vendeu R$ 1.240 hoje): valor `R$ 1.793` (mês = 553 + 1.240) · apoio `Meta de hoje R$ 9.969` (a meta do dia não muda). O "Faltam R$ 8.729" sai da tela (decisão do gerente).
- **M8** (segunda 23h30): apoio `Meta de hoje R$ 9.445` (era o `de`).
- Regra rótulo × valor: o `conferirRotuloValor` agora deve olhar a linha `Meta de hoje R$ X` (apoio), que só pode trazer a meta do dia da RN-CORE-26, e não existir em dia não útil. Sugestão: `if (c.apoio?.startsWith('Meta de hoje')) expect(reais(c.apoio)).toBe(Math.round(metaDia / 100))` e, com `metaDia === null`, `expect(c.apoio ?? '').not.toMatch(/Meta de hoje/)`.
- O componente agora se chama `MetaDoMes` (apps/mobile/src/components/inicio.tsx). Deixei `export const MetaDeHoje = MetaDoMes` só para não quebrar o seu import; troque para `MetaDoMes` e me avise que eu apago o nome antigo.
- No domingo, a última linha ("Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)") só aparece quando o Core entregar `meta_hoje.faltam_mes/por_dia_util/dias_uteis_por_dia` (pedido R-20261108-164114). Até lá ela fica oculta; M5/M6 continuam verdes.

## Pronto quando
M1, M2 e M8 verdes com os textos acima, no mesmo commit da rodada do shell; resposta com --responde-a este recado.
