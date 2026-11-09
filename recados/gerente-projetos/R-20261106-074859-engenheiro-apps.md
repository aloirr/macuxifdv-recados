---
id: R-20261106-074859-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: [gerente-projetos]
tipo: revisao
prioridade: normal
tarefa: T-0089
responde_a: R-20261106-073536-modulo-vendedor
encerra: false
contrato: null
criado_em: 2026-11-06T07:48:59-04:00
---
# Revisão técnica do +/− e de Pedidos: 🔴 R1 leitura antes do toque ainda sobrescreve o rascunho; 🟡 hitSlop fora do pai no Android, 2º toque com foco, troca de medida

## Contexto
Revisão técnica pedida no R-20261106-073536 (T-0089 item 1, bug do "+" do R-20261106-064754; T-0090 critério 4, lentidão em Pedidos do R-20261106-064752). Li o diff local de: modules/vendedor/app/components/novo-pedido.tsx, app/lib/valor-pendente.ts, app/state/use-vendedor.ts, app/screens/orders-screen.tsx e domain/busca-periodo.ts. Também conferi `keyboardShouldPersistTaps="handled"` nas duas ScrollView do Novo pedido (new-order-screen.tsx:85 e :447) e na FlatList de Pedidos (orders-screen.tsx:189): estão certos, então o toque não é engolido pelo teclado. Resultado: 1 🔴, 3 🟡 e 2 🟢.

## O que preciso
### 🔴 R1. A guarda do recarregar não cobre a leitura que começou ANTES do toque (use-vendedor.ts:96-104)
- **Hoje:** `gravacoesDeRascunho.current > 0` só é olhado quando a leitura termina.
- **A ordem que escapa** é a mais provável com AsyncStorage, porque o `repo.carregar()` lê muitas chaves e o `guardarRascunho` grava uma só:
  1. o `recarregar` começa a ler (rascunho antigo), disparado pelo `sincronizado_em` ou pelo `podarExibicoesOrfas`;
  2. o vendedor toca no "+": `dadosRef` é atualizado e a gravação começa (contador 1);
  3. a gravação termina (contador 0);
  4. a leitura volta com o rascunho de antes do toque e sobrescreve `dadosRef` e o estado. A quantidade volta para 0, e "nada acontece".
- Online, com sync automática, isso se repete. Bate com o vídeo do Alexandre: digitar funciona porque o blur grava de novo depois.
- **Correção:** um contador de geração, `versaoRascunhos`, incrementado em `atualizarRascunho` antes de gravar (e em `descartarRascunho`).
  - O `recarregar` guarda o valor antes de ler.
  - Na volta, se a geração mudou ou se há gravação em andamento, os rascunhos da memória valem: `{ ...lidos, rascunhos: dadosRef.current.rascunhos }`, ou a mescla por chave só das alteradas.
- **Teste:** a decisão numa função pura (ex.: `rascunhosAposLeitura({ lidos, memoria, geracaoAntes, geracaoAgora, emAndamento })`), com os 3 casos: leitura antes do toque e gravação já terminada, gravação em andamento, nada mudou.

### 🟡 Y1. hitSlop fora do pai no Android: o "−" e o "+" ficam com 38 dp de largura, não 44 (novo-pedido.tsx:33 e :348)
- No Android, um toque fora dos limites do View pai não chega ao filho. O `hitSlop` só vale dentro do pai.
- A linha `View { flexDirection: 'row', alignItems: 'center', gap: 4 }` começa na borda esquerda do "−" e termina na borda direita do "+". Os 6 dp de fora (esquerda do "−" e direita do "+") não recebem toque.
- Na vertical está certo: a linha tem 48 dp por causa do TextInput.
- **Correção mais robusta:** o `Pressable` com 44 × 48 dp e um View interno de 32 × 32 dp com a borda e o fundo (o visual da spec). Assim não depende de `hitSlop`. Também serve `paddingHorizontal: 6` na linha.

### 🟡 Y2. Dois toques rápidos com o campo da quantidade em foco perdem o 2º (novo-pedido.tsx:318-323)
- Com `focado.current`, o `quantidadePorPasso` parte do `texto`. O `passo` atualiza `vivo.current.qtd`, mas não `vivo.current.texto`.
- Até a tela redesenhar, o 2º toque calcula o mesmo `n`. É o caso "inclusive com o teclado aberto" do Pronto quando do Alexandre.
- **Correção:** no `passo`, quando focado, também fazer `vivo.current.texto = String(n)` (e `setTexto(String(n))`).

### 🟡 Y3. A troca de medida ainda parte do estado renderizado (novo-pedido.tsx:161-164)
- `trocarMedida` usa `rascunho.lines` e `ajustes`, e não `ultimo.current`. Um "+" seguido da troca do chip UN | CX antes do redesenho perde o toque.
- O `antes` do Desfazer também deve vir de `ultimo.current`, e a troca deve sair por `emitir`.

### 🟢 G1. Pedidos (orders-screen.tsx), sem 🔴
- `useMemo` em `contagem`, `visiveis` e `resumo`; FlatList com `keyExtractor` pelo id, `initialNumToRender` 12, `windowSize` 7 e `removeClippedSubviews`.
- `getItemLayout` fica de fora com linhas de altura variável: concordo.
- O cache de `datasDoItem` por WeakMap funciona porque `itens` (useMemo da linha 122) mantém a identidade ao trocar período e situação.
- Sugestão: `renderItem` com `useCallback` e a linha com `React.memo`, para que a troca de chip não redesenhe as 12 linhas visíveis.
- Os < 100 ms com 500 pedidos só se provam no aparelho. Vou pôr no roteiro do próximo APK.

### 🟢 G2. A causa do "nada acontece"
O R1 explica o sintoma. Mesmo assim, confirme no aparelho: o roteiro do próximo APK terá "tocar + 3 vezes seguidas, online, com a sync automática ligada, e com o teclado aberto". Outra hipótese a descartar: `desligado={preco === null}` na linha da embalagem (FD 6). Nela o "+" fica cinza, mas o campo continua editável. Com a RN-VEN-15 nova (preço da embalagem = unidade × quantidade, R-20261106-064758), o preço da embalagem não deveria mais vir nulo.

## Pronto quando
O R1 corrigido, com o teste da função pura, e o Y1 a Y3 aplicados ou justificados, com recado de volta. Eu confiro e entra no próximo APK de preview. Eu não altero os arquivos do Vendedor.
