---
id: R-20261112-205607-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0170
responde_a: R-20261112-204134-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T20:56:07-04:00
---
# Desenho da frase do dia, foto ou avatar, DU no Início e cards de Pedidos pronto (T-0170)

## Contexto
Pedido do Alexandre no R-20261112-204134-alexandre, itens 1 (Início), 4 (Pedidos) e 6 (foto ou avatar). Fiz só o desenho, na nuvem: nenhum código, migração, contrato ou tela mudou.

- **Arquivo:** `docs/desenho/inicio-frase-avatar-pedidos.md`
- **Branch:** `nuvem/T-0170-inicio-desenho` (commit 64816b98): https://github.com/aloirr/macuxifdv/tree/nuvem/T-0170-inicio-desenho

## O que o desenho decide
- **Frases:**
  - tabela nova `core.frase_dia` (texto, ativa, ordem, `padrao_codigo` P01…P30), com as colunas comuns e RLS;
  - as 30 frases padrão nascem em todo tenant novo e entram nos existentes pela migração; a frase padrão removida não volta;
  - o BKO (analista e admin) adiciona, edita, desativa, reordena e remove.
- **Rodízio:**
  - a mesma frase para todo o tenant no dia, pelo dia civil no fuso do tenant: posição = dias desde 01/01/1970 mod nº de frases ativas;
  - conta no aparelho, offline;
  - sem frase ativa, a linha não aparece.
- **Foto ou avatar:**
  - tabela nova `core.usuario_avatar` (iniciais, 1 de 6 avatares ou foto); o padrão são as iniciais, sem linha;
  - os 6 avatares vêm dentro do app e do BKO, sem download;
  - a foto é recortada em 3:4, vai a 480×640 em JPEG 80 no aparelho (até 300 KB) e sobe pela fila de arquivos para o bucket privado (ADR 0010), sem URL pública e sem log de dado pessoal;
  - o vendedor troca no Perfil, offline; o BKO troca de qualquer usuário; vale a última troca pelo horário.
- **DU:** "DU n de N" sai da mesma função da Meta/dia (`diasUteisDoPeriodo`, com `metas.dias_uteis_semana`). Em dia não útil, "Não é dia útil".
- **Cards de Pedidos:**
  - **enviado** = do "Enviado" em diante (recebido, em aprovação, aprovado, enviado ao ERP, integrado, faturado parcial e faturado); ficam fora rascunho, na fila, recusado e cancelado. Bate com o mock: 5 pedidos, R$ 2.446,00;
  - **orçamento em aberto** = não convertido e não cancelado;
  - período da tela pela data de emissão no fuso do tenant; valor = total do documento em centavos, sem frete;
  - dentro dos 90 dias, conta no aparelho; fora, uma rota de resumo no servidor.
- **RN propostas:** RN-CORE-41 (frase), RN-CORE-42 (foto ou avatar), RN-CORE-43 (DU) e RN-VEN-43 (cards), com o texto pronto no §6.
- **Plano:** cerca de 64 h, entre banco-dados, modulo-core, engenheiro-apps, designer-ux, design-de-marca, modulo-vendedor, modulo-gestor, engenheiro-software, testes e corretor (§7). Os riscos estão no §8.

## Decisões para o Alexandre
- **D1:** a frase do dia é a mesma para todos do tenant? Recomendo **sim**.
- **D2:** o recado do dia marcado pelo supervisor ocupa a linha da frase? Recomendo **não**: ele fica destacado no sino, e a frase padrão do recado ("Bom trabalho hoje!") sai do BKO.
- **D3:** contar os feriados nacionais no DU e na Meta/dia já na v1.0.6? Recomendo **sim**. Hoje eles não contam: novembro tem 25 DU em vez de 23 (Finados e 20/11), e a Meta/dia fica menor.
- **D4:** quem vê a foto do vendedor? Recomendo **todos os usuários do tenant**, como um crachá.
- **D5:** os cards contam pela data de emissão, como a meta? Recomendo **sim**. A lista continua com a regra dela (emitido ou mudou de situação no período).
- **D6:** os 3 cards também no Pedidos do Gestão? Recomendo **sim**.

## O que preciso
- **Gerente:** levar as decisões D1 a D6 ao Alexandre, gravar as RN no doc 03 e distribuir as tarefas do §7.

## Pronto quando
Decisões D1 a D6 respondidas e as tarefas no quadro.
