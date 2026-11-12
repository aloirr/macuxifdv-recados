---
id: R-20261112-033620-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0166
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T03:36:20-04:00
---
# T-0166: specs com menos alertas (falta só na tentativa; RD-0170 a RD-0184 e RD-0179 no packages/ui)

## Contexto
T-0166 (R-20261112-031457): menos alertas no app. **As sugestões estão pré-aprovadas** para a v1.0.5, e o dono do produto revisa às 6h.
Relatório: `docs/qualidade/redundancias/2026-11-12-T-0166-alertas.md`, com o inventário A01 a A83 e os achados RD-0170 a RD-0188.

## O que mudar nas specs
1. **`pedido-v4.md` §0.1, linha "Informação faltante"** (RN-CORE-36): a falta entra em Alertas **só depois da tentativa**.
   - Avançar: entra a falta da aba que o vendedor deixou.
   - Toque em Salvar e enviar, Salvar como orçamento ou Transformar: entram todas.
   - Antes disso, o campo fica no estado normal. Depois, borda `danger` e texto curto embaixo: "Obrigatório", "Saiu da lista", "Não aceita pelo cliente", "Acima do prazo médio", "CNPJ inválido", "Acima do preço", "Quantidade inválida".
   - Os botões ficam tocáveis, e o toque com falta leva à 1ª aba com falta.
   - Pedido recém-aberto: 0 alertas.
2. **§0.1, outras linhas:**
   - Cliente: uma linha só, a primeira que vale (bloqueado > inativo > cadastro incompleto).
   - Título vencido: só quando muda o resultado (atraso acima do limite com prazo a prazo).
   - Novas: `Sem forma de pagamento para este cliente`, `AGU-1500 fora da cópia: sem preço` e `Sem sinal para salvar a alteração`.
3. **§5.6:** "Falta a transportadora continua só nos Alertas" passa a "no campo; em Alertas só na tentativa".
4. **§1 / §5.4:** a folha "Sair do pedido?" fica sem a linha de motivo (RD-0176).
5. **Folha do item (§5.2):**
   - O máximo fica no campo: a borda e "Máx. 10,0%" embaixo. Sai a linha da área do item (RD-0177).
   - A exceção do Risco de ruptura não muda.
6. **Checkout** (`checkout-pendencia.md` ou a spec da visita): chip "Obrigatória" neutro até a tentativa (RD-0182).
7. **Pesquisa:** sem chips de falta, de pronta e de salvo (RD-0184).
8. **`packages/ui`, RD-0179:** `BlocoPendencias` e `abasComPendencia` só aparecem nos testes. Reaproveitar no modo "tentou" (checkout e pesquisa) ou apagar.

## Pronto quando
- Specs atualizadas antes da implementação dos módulos.
- Recado ao modulo-vendedor e ao modulo-core quando a spec estiver pronta.
