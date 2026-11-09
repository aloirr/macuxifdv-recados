---
id: R-20261108-170349-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [designer-ux, engenheiro-apps, testes]
tipo: entrega
prioridade: normal
tarefa: T-0137
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T17:03:49-04:00
---
# T-0137 Frente L entregue: Resumo completo, 4 botões, Apenas salvar e Sair do pedido com 5 opções

# Contexto
T-0137 (Frente L do Novo pedido v2, tarefa-mãe T-0131). Feito: troca do adaptador por re-export, os 3 🟡 técnicos do R-20261108-144134, o Resumo completo, os 4 botões, Apenas salvar e a folha Sair do pedido com os 5 rótulos. Spec seguida: docs/design/pedido-v2.md §2 e formulario-pendencias.md §2.2.

# O que foi feito
1. **Troca curta**: modules/vendedor/app/lib/bloquear-saida.ts agora é só `export { useBloquearSaida, type AoTentarSair } from '@macuxi/platform-sdk/react'` (não havia teste do adaptador; o contrato ficou coberto pelos testes do SDK/shell).
2. **3 🟡 do R-20261108-144134**: (a) BKO formas-pagamento-page.tsx: Código e Dias das parcelas somente leitura com "Vem do ERP" quando o registro tem external_id (`registroDoErp`, lib/formas-pagamento.ts, com teste); (b) e (c) new-order-screen.tsx: sem setTimeout de 80 ms nem de 0 ms; `depoisDeConfirmar` grava o valor pendente, fecha o teclado e roda a ação num efeito do render seguinte (`aposConfirmar`), então Salvar/Enviar usam o rascunho já atualizado. 🟢4 feito (`idsDoCatalogo` em useMemo). Também o 🟡 do rodapé (R-20261108-154931): tirei o insets.bottom do rodapé "Ir para Pedidos" e do AvisoRodape do editor.
3. **L, conteúdo (só leitura)**: cliente (nome e código) · VENDA (forma e prazo + "Vai para aprovação (título vencido, limite excedido, desconto acima da alçada)" ou "Cliente bloqueado · só orçamento") · ITENS compactos · ENTREGA (endereço, CIF/FOB e transportadora no FOB) · OBS. ("—") · DESCONTO DO PEDIDO numa linha com o `DescontoCompacto` do kit (app/lib/ajuste-pedido.ts) · Tabela/Descontos/Total · faixa da alçada · "Falta para salvar".
4. **L, botões (domain `botoesDoResumo`, domain/botoes-resumo.ts)**: Salvar e enviar pedido (principal, largura total, destino escrito embaixo: "Vai direto ao ERP"/"Vai para o supervisor"/gerente/analista; desligado e sem destino com pendência) · Apenas salvar (grava `salvo_em`, aceita pendências, fecha com "Pedido salvo", reabre no Resumo e não vira "Pedido não terminado") · Salvar como orçamento (desligado com pendência; congela preços, já da I) · Cancelar (texto, abre Sair do pedido?). RN-VEN-13: sem o primeiro; orçamento é o principal com "Válido até dd/mm" e Faixa de erro. Editar orçamento: Salvar orçamento (principal) + Transformar em pedido (salva e abre o detalhe com a folha do Transformar já aberta, param `transformar=1`) + Cancelar. Editar pedido: um botão ("Salvar alterações" etc.).
5. **Folha intermediária "Salvar pedido" removida** (FolhaSalvar e tituloDaFolhaSalvar saíram). **Folha Sair do pedido?**: Salvar e enviar pedido · Apenas salvar · Salvar como orçamento · Descartar · Continuar editando (domain sair-do-pedido.ts; 'apenas_salvar' tratado na tela; liberam o prosseguir do shell depois de gravar; Continuar editando não).
6. **Toques do pedido simples** (cliente sem alerta, CIF, 1 item, forma e prazo do padrão): Avançar (Venda→Itens) · incluir o item (+ não entra na conta de navegação) · aba Resumo · Salvar e enviar pedido = **3 toques de navegação/salvar**, o toque perdido na K foi devolvido.

# Testes e checagens
- Domain: `domain/botoes-resumo.test.ts` (14 testes: sem pendência, com pendência, RN-VEN-13, editar orçamento, editar pedido), `domain/sair-do-pedido.test.ts` (rótulos novos, Apenas salvar, retomada).
- App: `app/lib/ajuste-pedido.test.ts`, `textos-venda.test.ts` (linhas do Resumo), `textos-pedido.test.ts` (aba inicial do rascunho salvo), `app/screens/telas-t0101.test.ts` (L: sem folha intermediária, DescontoCompacto, sem timers); web `formas-pagamento.test.ts`.
- `pnpm --filter @macuxi/vendedor typecheck` verde; vitest do pacote: 96 arquivos passados, 1069 testes verdes (100 de banco pulados, sem Docker); eslint por arquivo nos tocados: limpo. `node scripts/coord.mjs verificar modulo-vendedor`: nenhuma violação.

# Pendências e premissas (para o gerente)
- **"Salvo" na lista Pedidos**: hoje "Apenas salvar" guarda o rascunho no aparelho (SQLite), que já era a forma de persistir; ele reabre pelo Novo pedido do mesmo cliente (abre no Resumo). A tag **Salvo** na lista de Pedidos e o rascunho como linha tocável dependem da fila/estados da **Frente G** (e do detalhe, M); não inventei estado novo no servidor. Se o dono quiser o "Salvo" na lista já, é a G.
- Item (aba Itens) ainda usa o `CampoAjuste` do AjusteDoItem; a troca para o `DescontoCompacto` com equivalente e medida (R$/un) ficou fora do escopo da L (só o pedido).
- Print do APK antes/depois (critério 2 da T-0137): só com o build; o roteiro abaixo cobre.
- Revisão do engenheiro-software e UX do designer-ux pendentes. Aviso "pronto para revisão" das K/L/M ao engenheiro-apps sai quando a M fechar (respondi ao R-20261108-164340).

# Roteiro de reteste (APK Campo e Gestão)
1. Cliente liberado, CIF: Novo pedido, 1 item. Avançar, aba Resumo: deve ver cliente, VENDA, ITENS, ENTREGA, OBS. e o desconto do pedido em UMA linha (Desc % ˅ + valor + "−R$ x"). Toque em Salvar e enviar pedido: sem folha, vai direto (3 toques).
2. Resumo sem pendência: botão principal tem "Vai direto ao ERP" (ou "Vai para o supervisor" se o desconto passar da alçada). Digite 6% de desconto: faixa laranja e destino mudam na hora.
3. Remova a forma ou deixe FOB sem transportadora: Salvar e enviar pedido e Salvar como orçamento ficam desligados, Apenas salvar liga; o bloco "Falta para salvar" lista o que falta.
4. Apenas salvar com pendência: fecha com "Pedido salvo"; abra Novo pedido do mesmo cliente: cai no Resumo com o bloco do que falta; ao reabrir o app não aparece "Pedido não terminado".
5. Cliente bloqueado: sem Salvar e enviar pedido; faixa de erro; Salvar como orçamento principal ("Válido até ..."); Apenas salvar embaixo.
6. Digitar quantidade/desconto e tocar direto em Salvar e enviar pedido (teclado aberto): o valor digitado vale (sem atraso, sem perder).
7. Com o pedido alterado: Cancelar, Voltar do cabeçalho, barra inferior e Voltar do Android abrem "Sair do pedido?" com 5 opções; Continuar editando mantém; Apenas salvar e Descartar saem para o destino pedido.
8. Editar orçamento: Salvar orçamento (principal), Transformar em pedido (abre o detalhe com a folha do Transformar) e Cancelar.
9. BKO Formas de pagamento: registro vindo do ERP, Código e Dias das parcelas somente leitura "Vem do ERP".
