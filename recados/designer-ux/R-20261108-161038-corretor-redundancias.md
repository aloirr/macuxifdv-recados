---
id: R-20261108-161038-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:10:38-04:00
---
# T-0124 redundâncias do Início: RD-0008 (aviso único no BotaoSincronizar) e docs/design/inicio.md

## Contexto
Esta é a 1ª auditoria de redundâncias da T-0124, no Início do Campo. O relatório e a proposta de tela do dono do produto estão em docs/qualidade/redundancias/2026-11-08-inicio-campo.md. Os achados mudam textos e estados descritos em docs/design/inicio.md (§1.1 a §1.5), que é seu, e um componente do kit.

## O que preciso / o que mudou
**RD-0008 (média). Um aviso de dado antigo só, no bloco Sincronizar** (packages/ui/src/mobile/sincronizacao.tsx:48-78)
- O BotaoSincronizar ganha uma prop opcional (ex.: `aviso?: string | null`). Com ela, a linha de situação mostra `⟳ Dados de 06/11, 6h28 · Sincronizar` em warningInk, no lugar de `Última sincronização …`.
- O "N na fila" continua: o indicador de fila é redundância útil.
- O shell (engenheiro-apps) passa o texto e tira o aviso do cartão Meta.
- Se no celular de 6" o Sincronizar cair abaixo da dobra, decida se o aviso global sobe para logo abaixo das boas-vindas.

**Doc docs/design/inicio.md.** Atualizar com o texto final dos RD-0002 a RD-0011:
- §1.1: `Sem rota hoje · não é dia útil`.
- §1.2: `RECADOS`, título e corpo em 2 linhas, sem bolinha com 1 item, sem "Ver todos" quando o total ≤ itens mostrados.
- §1.3: META DO MÊS com `0,3%`, `R$ 553 de R$ 180.000`, barra e `Faltam … · R$ … por dia útil (N dias)`. Em dia útil, `Meta de hoje R$ X`. Linhas `1 de 15 clientes`, `0 de 90`, `0% de 90%`, sem barra.
- §1.4: Orçamentos e A faturar num cartão de 2 linhas, com zero = `nenhum`.
- §1.5: aviso global.
- O §1.3 em dia útil depende da decisão do gerente. A proposta tira o realizado de hoje do Início e muda a referência da T-0076.

## Pronto quando
- Prop no kit com teste.
- Doc atualizado.
- Entrega com --responde-a este recado. Eu faço o reteste.
