---
id: R-20261110-195637-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: alta
tarefa: T-0150
responde_a: R-20261110-193721-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T19:56:37-04:00
---
# Reenvio (corpo completo): v1.0.3 liberado x segura — liberados RD-0092, RD-0101, visor e folha; seguram PDFs (RD-0102 a 0104), T-0148 F4 (RD-0106), ficha de fotos (RD-0105); filial entregue às 19h48, em reteste

## Contexto
Reenvio do R-20261110-193721, que chegou só com o título (pedido do dono do produto, R-20261110-202510).
Reteste ~19h–19h35 do PC para o build das 22h de Manaus (R-20261110-182314), pelo código, na árvore local. Testes do vendedor `sair-do-pedido`, `pdf-pedido` e `detalhe-t0150`: 68 verdes. Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §18; catálogo atualizado (RD-0102 a RD-0106).

## O que preciso / o que mudou
**Liberado (sem achado em aberto):**
| Tarefa / frente | Dono | Parecer |
|---|---|---|
| T-0150 F3 (folha de saída) | modulo-vendedor | liberada: RD-0092 corrigido ("Salvar orçamento" sem subtítulo, `domain/sair-do-pedido.ts:52`) |
| T-0150 F2 (detalhe) | modulo-vendedor | liberada: RD-0101 corrigido (`soOrcamentoPorAlertas`, `order-detail-screen.tsx:456`) |
| T-0147 visor de foto comum (shell) | engenheiro-apps | liberado, sem achado (`components/visor-foto.tsx`, `app/foto.tsx`, `lib/visor-foto.ts`) |
| T-0147 folha câmera/galeria do envio da foto do PDV (shell) | engenheiro-apps | liberada, sem achado |
| Já liberadas antes (§15–§17): T-0144, T-0145, barra, T-0146, T-0147 Core (textos do D-1), T-0151/T-0152, T-0153 lista, T-0155, T-0150 F1 | vários | sem mudança |

**Segura (achado em aberto; regra R-20261110-161725: baixo também segura):**
| Tarefa / frente | Dono | Achado | Motivo |
|---|---|---|---|
| T-0150 PDFs (D-T0150-1/2) | modulo-vendedor | RD-0102 (média) | linha líquida dos totais com 2 fontes: `linhaLiquidaDosTotais` (`app/lib/detalhe-pedido.ts:126`) × ramos próprios no `bkoBody` (`domain/pdf-pedido.ts:392-396`); "Desconto efetivo (sem frete)" (`:398`) repete o % quando não há frete |
| T-0150 PDFs | modulo-vendedor | RD-0103 (baixa) | sigla da medida feita 2×: `quantidadePorEmbalagem` (`pdf-pedido.ts:317`) × `siglaDaMedida` (`detalhe-pedido.ts:36`) |
| T-0150 PDFs | modulo-vendedor | RD-0104 (média) | PDF do cliente: Prazo 3× (`:285`, `:343`, `:346`), Vendedor 2× (`:284`, `:346`), Frete 2× (`:287`, `:347`), data 2× (`:272`, `:286`); interno "Gerado em … · Gerado pelo …" (`:426`) |
| T-0148 F4 (painel "No pedido") | modulo-vendedor | RD-0106 (baixa) | valor sem "R$" à mão (`busca-itens.tsx:91`) em vez do `semRs` de `detalhe-pedido.ts:145` (privado) — correção no recado reenviado ao vendedor |
| T-0147 ficha › Fotos do PDV | modulo-core | RD-0105 (baixa) | o cadeado aparece também na linha sem foto, ao lado de "Falta"/"Adicionar" (`cliente360.tsx:88`, `fotoPdvTrancada` sem olhar a situação); a imagem aprovada só o mostra em "Tem". Correção: `{i.situacao === 'tem' && fotoPdvTrancada(i) ? <Icon name="lock" … /> : null}` |
| T-0149 filial no pedido (recebimento, detalhe, PDF) | modulo-vendedor | — (sem parecer ainda) | no reteste das 19h não havia entrega (o retrato da filial não estava em `api/receber.ts`). A entrega chegou às 19h48 (R-20261110-194832); faço o reteste agora e mando o parecer |

Fora de RD (ao testes, sem catalogar): a ficha mostra "Tem" logo depois do envio (`domain/fotos-pdv.ts:137`), e a imagem aprovada mostra "Na fila" com a nuvem.
Visor do Vendedor (resto do RD-0088: `VisorDeFoto` próprio em `busca-itens.tsx:52` e texto em `foto-produto.ts:5`) segue para a v1.0.4, como combinado (falta a porta `abrirFoto` no SDK).

## Pronto quando
- Vendedor entrega RD-0102, RD-0103, RD-0104 e RD-0106; Core entrega RD-0105 → eu reteste pelo código e fecho no catálogo.
- Reteste da filial (T-0149, R-20261110-194832) com parecer.
- Com tudo fechado, mando nova `entrega` com a v1.0.3 liberada para o build.
