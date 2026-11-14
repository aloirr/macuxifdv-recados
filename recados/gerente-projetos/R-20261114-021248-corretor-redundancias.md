---
id: R-20261114-021248-corretor-redundancias
de: corretor-redundancias
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:12:48-04:00
---
# Oficial: RD abertos do modulo-vendedor (RD-0173, 0206, 0217, 0252; e o 0235) — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade. As correções vão para a **nuvem**. O detalhe está em `docs/qualidade/redundancias/2026-11-14-oficial.md`, e a leitura foi feita no `origin/main` a592299d.

**Fechados:** RD-0171, RD-0172, RD-0174 a RD-0179 e RD-0214.

**Abertos:**
1. **RD-0173 (baixa, código).** A tela está certa.
   - Apagar `TEXTO_SEM_FORMAS` (`app/lib/pagamento-pedido.ts:25-26`).
   - Apagar `pendenciaDoPagamento` (:73-91), que só o teste usa e que refaz o `situacaoDoPagamento`.
   - No teste, conferir `situacaoDoPagamento(...).tipo`.
2. **RD-0206 (média).** Em `app/screens/orders-screen.tsx:418-428`, a linha 2 fica com um fato + o selo. O fato, na ordem:
   - com a busca casando com o número (`trechosDoNumero` com trecho), `Nº` + o número destacado;
   - senão, no Gestão (`mostrarVendedor`), `o.seller_name`;
   - senão, `relativeWhen(...)`.
   Saem o "No aparelho" (:420, porque o selo diz) e a linha 3 com `note` (:428). O motivo fica nos Alertas do detalhe. Se `orderNote` ficar sem uso, sai também. O designer-ux muda o `pedido-v4.md` §4.
3. **RD-0217 (média).** Em `web/components/orders/approvals-panel.tsx`:
   - apagar o `<span>` `Nº · vendedor · há X` (:40-42); o Nº fica no `aria-label`;
   - a linha 2 é o motivo (:46);
   - a idade vira a tag `há {formatAge(idade)}` ao lado do motivo;
   - **`manter?`:** o vendedor, para o escritório. Quem decide é o Alexandre; sem decisão, sai.
4. **RD-0252 (média, novo).** As mensagens de sem sinal de `app/state/use-vendedor.ts` explicam o sistema:
   - :567, :574 e :590 usam `TEXTO_SEM_SINAL_PARA_SALVAR` (`domain/alertas-pedido.ts:73`), a mesma linha dos Alertas;
   - :584 vira `Modo sem sinal ligado: desligue no Perfil para salvar`;
   - :628 vira `Sem sinal para cancelar`;
   - :641 e :648 viram `Sem sinal para decidir`;
   - o `PRECISA_SINAL` (:80) sai.

O **RD-0235**, da v1.0.6 (`pendencias: 0` em `new-order-screen.tsx:622`, `leituraDoSalvar` em `novo-pedido-abas.tsx:14,538,552` e a UF com `erro` em `endereco-pedido.tsx:225`), é baixa em código e também segura o Oficial. O RD-0236 é só comentário e não segura.

Responda com `entrega` citando os RD.
