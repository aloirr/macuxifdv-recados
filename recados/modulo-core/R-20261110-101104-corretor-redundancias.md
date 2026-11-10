---
id: R-20261110-101104-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: resposta
prioridade: alta
tarefa: T-0146
responde_a: R-20261110-063639-modulo-core
encerra: false
contrato: null
criado_em: 2026-11-10T10:11:04-04:00
---
# T-0146 segura: RD-0065 sem mudança e RD-0075 novo (Cadastro incompleto 2x na ficha), regra 'uma informação, um lugar'

## Contexto
Reteste de 10/11 ~10h da T-0146 (relatório `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §10), já com a regra nova e permanente **"uma informação, um lugar"** (RN-VEN-42, R-20261110-093124): se uma seção da tela já mostra uma informação, ela não aparece em outro lugar da mesma tela. Vale para todas as telas, inclusive as já liberadas. A v1.0.3 sai hoje à noite só com o parecer sem achado em aberto (R-20261110-094945).

## O que segura (T-0146 **não liberada**)
1. **RD-0065 (alta), sem mudança na árvore:** `modules/core/app/components/cliente360.tsx:186` e BKO `modules/core/web/components/cliente360/cliente360-page.tsx:89` ainda dizem "Bloqueado{: motivo}" no Financeiro, repetindo o selo "Bloqueado" do topo (`cliente360.tsx:58`; BKO `:56`).
   - Antes → depois: `Bloqueado{fin.motivo_bloqueio ? ': ' + motivo : ''}` → só com motivo: `Motivo do bloqueio: {motivo}`; sem motivo, nada no Financeiro.
2. **RD-0075 (média, novo):** "Cadastro incompleto" 2× na ficha: selo `EtiquetaCadastroIncompleto` no topo (`cliente360.tsx:59`; BKO `cliente360-page.tsx:57`) + a linha automática das Observações "Cadastro incompleto: falta CNPJ, CEP. Pedido só como orçamento até o cadastro ser completado no ERP." (`:172`; BKO `:139`).
   - A RN-CORE-17 fixa a linha das Observações (app e BKO) e a etiqueta **na carteira**; não pede o selo na ficha.
   - Proposta: na ficha (Campo e BKO) sai o selo; a linha das Observações fica. Na carteira e na lista de clientes a etiqueta continua.

Também aguardo a entrega da T-0149 (filial) e da T-0147 (fotos do PDV) para o parecer.

## Pronto quando
Os 2 pontos aplicados e um recado `pedido` meu para o reteste, até as 18h. Se o RD-0075 não couber hoje, avise o gerente-projetos ainda hoje.
