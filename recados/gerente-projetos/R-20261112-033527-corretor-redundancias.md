---
id: R-20261112-033527-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos, alexandre, testes]
tipo: pedido
prioridade: alta
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T03:35:27-04:00
---
# T-0166: menos alertas no cliente e na visita (RD-0180 a RD-0183, pré-aprovado, v1.0.5)

## Contexto
T-0166 (R-20261112-031457): menos alertas no app. **As sugestões estão pré-aprovadas** para a v1.0.5, e o dono do produto revisa às 6h.
Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`, seção "cliente, rota e visita", A46 a A56.

## O que mudar

**RD-0180 (média): a visita aberta aparece 2 vezes.**
- Em `telas/cliente.tsx:214-223`, a caixa "Check-in bloqueado: em atendimento em X." repete a `OpenVisitBar` do topo. A caixa sai.
- O botão Check-in fica desligado e, no toque, diz: "Em atendimento em Mercado X".

**RD-0181 (média): faixa da etapa pendente só quando pede ação.**
- Arquivos: `lib/etapa-pendente.ts:30-32` e `cliente.tsx:203-209`.
- A faixa só aparece com `naFila <= 0`: `Uma etapa da visita de ontem não chegou` · `Fale com seu supervisor`.
- Com a etapa na fila, a faixa sai: o Sincronizar já mostra "N na fila", e ela sobe sozinha.

**RD-0182 (média): obrigatória em vermelho antes da tentativa.**
- Em `components/visit-sheets.tsx:348`, o chip `Obrigatória` fica no tom neutro antes da tentativa.
- Ao tocar em Checkout com pendência, a etapa fica `danger` e a linha "Falta concluir: …" (`:354-358`) aparece. Antes disso, nenhuma das duas.

**RD-0183 (baixa): frases que saem.**
- `checkin-sheet.tsx:73`: sai "Check-in fora do raio do cliente: ficou sinalizado com a sua justificativa.". O chip "Fora do raio · justificado" já diz.
- `cliente360.tsx:208`: sai "Sincronize para atualizar.". Fica "Sem dados financeiros.".
- `domain/cadastro.ts:118` (RN-CORE-17): a linha automática fica `Cadastro incompleto: falta CEP, telefone.`. Sai "Pedido só como orçamento até o cadastro ser completado no ERP.": explica o sistema, e no pedido o alerta do cliente já diz.
  - Atenção: o regex `LINHA_AUTOMATICA` (`:106`) tem de reconhecer as duas formas, para limpar a linha antiga.
  - O gerente muda o texto da RN-CORE-17 no doc 03.

## Pronto quando
- Testes para a etapa pendente com e sem fila, a linha nova e o regex.
- Print da v1.0.5.
- Recado de reteste para mim, cc testes.
