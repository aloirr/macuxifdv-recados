---
id: R-20261102-233919-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: revisao
prioridade: normal
tarefa: T-0061
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T23:39:19+00:00
---
# Revisão final T-0061 (7ed2912): 1 vermelho (folga na alçada aceita efetivo acima do limite), 4 amarelos

## Contexto
Revisão final da T-0061, commit 7ed2912 (branch nuvem/T-0061-pedido-3-abas) sobre da0e0a5. O diff toca só modules/vendedor/** e docs/modulos/vendedor/**, mais os recados e o diário de praxe. Conferi o seguinte:
- testes do Vendedor: 470 verdes;
- novo-pedido.db.test.ts rodado contra Postgres real: 22 verdes;
- typecheck e lint limpos;
- `pnpm fronteiras` sem violação nova;
- `coord verificar`: OK.

## Resultado
### 🔴 Bloqueia o merge
1. **A alçada aceita desconto efetivo acima do limite (RN-VEN-10).** Local: modules/vendedor/domain/preco-pedido.ts:155-157, `desconto_efetivo_alcada_pct` com "folga". A folga subtrai do efetivo 1 centavo por linha ÷ total da tabela. A API usa esse valor em domain/aprovacao.ts:277 e o app em app/lib/novo-pedido.ts:181.
   - Reproduzi assim: 40 linhas de R$ 2,50 com 5,4% de desconto no pedido dão efetivo 5,2%, alçada 4,8% e aprovação automática, e o pedido vai ao ERP. A RN manda olhar só o efetivo. A folga cresce com o número de linhas e cai com o valor delas.
   - Correção: calcular o efetivo da alçada pelo valor nominal exato, sem arredondar por linha, com 2 casas: `1 − Σ(tabela_i × (10000+δ_i)) × (10000+Δ) ÷ (Σ tabela_i × 10^8)`, em inteiros. Assim 5% em 1012 dá exatamente 5%, e "30% no item → 5% no pedido" continua em 5%. Teste do caso acima citando RN-VEN-10.

### 🟡 Corrigir
1. RN-VEN-11 (preço mínimo) não é aplicado em lugar nenhum. A revalidação não recebe `preco_minimo_base_cents` (api/receber.ts:196-204) e o app não trava o desconto. O motivo é que o Core ainda não tem `preco_venda_cents`/`desconto_maximo_pct` na `core.cadastro_resumo@1` (T-0062). Já está nas pendências do doc. Manter a T-0062 bloqueando o aceite do RN-VEN-11.
2. No PDF interno do app, a coluna "Desc./Acr." mostra o % do pedido em todos os itens. O motivo é que app/screens/order-detail-screen.tsx:242 não repassa o `discount_pct`/`surcharge_pct` do item, que `itemAdjustText` (domain/pdf-pedido.ts) espera. Repassar quando existir no item.
3. O `price_table_name` não sai da API (BKO, pedidos.ts). Só o app preenche, pelo sync. Depende do nome em `catalogo.precos_cliente@1` (pendência registrada).
4. Divergência entre o critério da T-0061 ("o promotor nunca vê o pedido") e o doc 03 O-3 (o promotor lê os pedidos da carteira). O código segue o O-3. O gerente precisa alinhar o texto do critério.

### 🟢 Sugestões
1. `vendedor.pedido.aprovado@1` não publica `preco_unitario_venda_cents`, previsto na ADR 0016. É opcional e o Hub aceita a ausência.
2. Tenant com padrão FOB e APK antigo (sem `frete`) cai em `transportadora_obrigatoria`. Avisar na nota de versão.
3. A transportadora entra no pull de qualquer perfil com o Vendedor efetivo, inclusive o promotor por exceção. É dado de empresa, risco baixo.

### Conferido sem ressalva
- **Domain e §3 do desenho:**
  - desconto XOR acréscimo no item e no pedido (domain e API, 422 `desconto_e_acrescimo`);
  - CX = UN × fator, com o fator vindo do Core, nunca do aparelho;
  - arredondamento meia para cima por item;
  - efetivo sem frete, pode ser negativo;
  - ≤ 0 nunca vai para aprovação;
  - teste "30% → 5% → sem aprovação" presente;
  - `validarFrete`: FOB exige cadastrada XOR digitada, com CNPJ checado pelos dígitos verificadores;
  - endereço: principal por padrão; endereço de outro cliente dá `endereco_invalido`.
- **API:** revalida pelo domain e ignora o total do aparelho. É idempotente: hash do envio com os campos novos e advisory lock; outro frete com o mesmo id dá conflito.
- **Transportadoras:**
  - acesso por ação: ver = admin/analista/gerente/supervisor/assistente; gerenciar = admin/analista/gerente;
  - licença via `modulos`, RLS em tudo, CNPJ único e auditoria;
  - sem DELETE: a transportadora é só inativada.
- **Evento `aprovado@1`:** a mudança é só aditiva (campos opcionais). Os formatos de `frete` e `endereco_entrega` batem com `FreteErp`/`EnderecoEntregaErp` da integração. `quantidade` = unidade base e `preco_unitario_cents` = preço por unidade base, como na ADR 0016. Os dois caminhos (aceite e decisão) passam por `payloadAprovado`.
- **Fronteiras:** só `@macuxi/{core,catalogo}/contracts`, `comum` e `ui`. O SQL toca só `vendedor.*` e `plataforma.tenant_atual()`.
- **OrderDetail:**
  - item: `unit`, `factor`, `base_quantity`, `unit_label` (`rotuloMedida`) e `surcharge_pct`;
  - pedido: `freight`, `delivery_address`, `effective_discount_pct` e `price_table_name`;
  - os PDFs usam a coluna Medida e o texto do frete do desenho.
- **Promotor hoje:**
  - API: o push de pedido dá 403 (RN-PRO-01, testado em Postgres). Aprovar, rejeitar, cancelar, /alcadas e transportadoras também dão 403.
  - Com o Vendedor efetivo para ele (só por exceção, porque o manifesto não o lista em `perfis`), lê pela `pedido.ver`: GET /v1/vendedor/pedidos e /:id, e o pull de pedido/item/evento, só os clientes da carteira.
  - App: nenhuma página de pedido (perfis = manifest.perfis), nenhuma extensão de pedido (`acao: 'pedido.criar'`), e a tela é só de leitura se alguma vez aparecer.

## Pronto quando
O 🔴 1 estiver corrigido, com teste, pelo modulo-vendedor e eu reconferir (re-revisão curta). Os 🟡 2 e 3 podem entrar no mesmo PR ou ir para a fila de corte com aviso.
