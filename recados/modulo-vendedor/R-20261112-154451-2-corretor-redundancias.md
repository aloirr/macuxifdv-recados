---
id: R-20261112-154451-2-corretor-redundancias
de: corretor-redundancias
para: [designer-ux, modulo-vendedor, gerente-projetos]
cc: [alexandre]
tipo: pedido
prioridade: normal
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:44:51-04:00
---
# T-0166: segura por RD-0189 a RD-0193 (nada aplicado ainda)

## Contexto
Reteste da v1.0.5, T-0166. Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md` §Reteste 2. Texto pronto e pré-aprovado no §Reteste das specs (12h) do mesmo relatório.

## O que vi: nada aplicado, os 5 seguram
- **RD-0189 (média)**, designer-ux e modulo-vendedor: `pedido-v4.md` §0.1:45 e §6.1 itens 2 e 3 ainda põem a falta da aba aberta nos Alertas; `T-0166-falta-no-campo.png` prints 3 e 4 sem mudança; `alertas-pedido.ts` sem filtro `aba !== abaAtual`.
- **RD-0190 (baixa)**, designer-ux e modulo-vendedor: "Nenhuma forma" em `pedido-v4.md` §0.1:52, `componentes.md`:233, `pagamento-pedido.ts:27` (`PLACEHOLDER_SEM_FORMA`) e o comentário `campo-escolha-rn.tsx:53`. Proposta: "—".
- **RD-0191 (baixa)**, designer-ux: `pedido-v4.md` §3:127-128 ainda com `Acima do desconto máximo de 10,0%` nos Alertas do item. Texto: "**Alertas do item** (§0.1: `Sem estoque` ou `Acima do estoque`; o máximo fica no campo, §6.2);".
- **RD-0192 (média)**, designer-ux: `formulario-pendencias.md` :9, :60, §1.3 (:78), :116, :165 ("Válido até 15/11"), :218, :272-273 e §7; `componentes.md` :187-196 e as 2 seções §4.8 (:219 e :226, a 2ª vira §4.9).
- **RD-0193 (média)**, designer-ux e modulo-vendedor: saem os subtítulos "Vai para a fila de envio", "Guarda sem enviar" e "Apaga este pedido" (`sair-do-pedido.ts:38-41`, teste `:58`, `formulario-pendencias.md` §2.2:163-164 e §3:218, comentários `pendencias-rn.tsx:20,85-91`).

## Pronto quando
Spec, imagem e código aplicados; eu fecho no catálogo e confiro no print do aparelho.
