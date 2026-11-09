---
id: R-20261102-181952-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: [modulo-catalogo, modulo-gestor, modulo-promotor, modulo-pesquisa, modulo-treinamento, testes]
tipo: revisao
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T18:19:52-04:00
---
# Revisão de tela do APK das 22h (Catálogo, Gestor, Promotor, Pesquisa, Treinamento): 0🔴, 7🟡 (1 alta: preço da Loja /100), 6🟢; câmera do Promotor e da Pesquisa registrada no shell

## Contexto
Revisão de tela (engenheiro-apps) do que entra no APK de hoje (22h), usando o roteiro M-D13 a M-D19 de tests/plano/demo-matriz.md: Catálogo e árvore (T-0052/T-0061), Gestor (#40), Promotor (#41), Pesquisa (#43) e Treinamento (#42). Conferi área segura (todas usam Screen do packages/ui, que aplica o inset do topo), alvos de 48 dp, 3 toques, textos em português, nomes técnicos e abas por perfil e módulo (calculei a barra com criarShell + abasDoShell).

## Resultado: 0 🔴, 7 🟡, 6 🟢. Nada quebra a demo.

### Corrigido no shell (meu, já no APK)
- Câmera registrada para o Promotor e a Pesquisa (apps/mobile/src/services/camera.ts): `definirCapturaFotoPromotor` (foto + coordenada do GPS do momento; sem GPS em 8 s vai sem coordenada, RN-PRO-02) e `definirCapturaFotoPesquisa` (`{ id, largura_px, altura_px }`, 1600 px / JPEG 80, RN-PES-06). Sem isso, as fotos da gôndola, da tarefa e da pergunta de foto mostravam "câmera indisponível". Atende R-20261102-131328 (1) e R-20261102-132021-3 (1).

### Abas (aviso para o roteiro, não é defeito)
- Campo do vendedor: barra = Início | Rota | Clientes | Pedidos | **Mais** (Metas e Catálogo ficam em Mais). Promotor: Início | Rota | Clientes | Loja | **Mais** (Metas, Catálogo). O M-D16/M-D16a dizem "aba Catálogo": na demo é **Mais › Catálogo** (2 toques). Sugestão ao testes: ajustar o texto do roteiro.
- Gestão da supervisora na base demo (sem Gestor): Início | Clientes | Pedidos | Catálogo — tudo na barra. **Com o Gestor ligado**: Início | Equipe | Aprovações | Clientes | **Mais** (Pedidos, Alertas, Catálogo vão para Mais). O M-D17a ("Gestão › Pedidos › Para aprovar") com o Gestor ligado vira "Aprovações" (o toque abre o mesmo detalhe do Vendedor) ou "Mais › Pedidos".
- Promotor sem Pedidos e sem "Adicionar ao pedido" no Catálogo: conferido (regra 7, RN-PRO-01).

### 🟡 corrigir (dono entre parênteses)
1. 🟡 **alta (modulo-promotor)** modules/promotor/app/telas/tela-loja.tsx:178 e :181 — `formatBRL(r.coleta.preco_cents / 100)`: `formatBRL` já recebe centavos (packages/comum/src/money.ts:35). Preço de R$ 5,00 aparece como "R$ 0,05" no aviso e no registro. Trocar por `formatBRL(r.coleta.preco_cents)`. Uma linha; vale entrar no APK das 22h.
2. 🟡 (modulo-catalogo) modules/catalogo/app/telas/catalogo.tsx:153 — puxar para baixo chama `motor.sincronizar()` direto, fora do agendador do shell (RN-CORE-23): não respeita os 30 s ("Atualizado há instantes") e não mostra o rodapé "Atualizado às hh:mm · puxe para sincronizar" que o M-D14 espera no Catálogo. Usar `useAtualizacaoAutomatica` de @macuxi/ui/mobile (`auto.puxar`/`auto.puxando` e o rodapé), como o Gestor faz em modules/gestor/app/state/use-gestor.ts.
3. 🟡 (modulo-pesquisa) modules/pesquisa/app/screens/pesquisas-screen.tsx:18 — mesmo ponto do item 2 (`motor?.sincronizar()` direto). (modulo-treinamento) modules/treinamento/app/screens/treinar-screen.tsx:36-41 — idem (`tr.sincronizar()`).
4. 🟡 (modulo-catalogo) catalogo.tsx:186-196 — a linha de chips de marca e de linha quebra em várias linhas (flexWrap); com muitas marcas no ERP a lista de produtos desce para fora da tela. Usar rolagem horizontal (ver item 3 do pedido R-20261102-174719: `LinhaChips` no packages/ui).
5. 🟡 (modulo-gestor) modules/gestor/app/screens/aprovacoes-screen.tsx:176 e ficha-screen.tsx:90, :107-109 — percentuais crus (`${x}%`): 7.5 sai "7.5%" (ponto). Formatar em pt-BR (como `valorDoIndicador` em lib/apresentacao.ts: `toLocaleString('pt-BR', { maximumFractionDigits: 1 })`).
6. 🟡 (modulo-gestor) aprovacoes-screen.tsx:154 — o nome do vendedor vem só da visão da equipe; sem a visão no cache aparece "Vendedor" (é o mesmo sintoma do R-20261102-111612 do Alexandre, "card de aprovação sem o nome do vendedor"). Trazer o nome no item da fila (contrato) ou cair no nome guardado do pedido.
7. 🟡 (modulo-catalogo) modules/catalogo/app/telas/produto.tsx:103 — `b.band.replace('_', ' ')` mostra o código da faixa por filial (ex.: "disponivel", sem acento); usar o mesmo rótulo de `rotuloEstoque` (lib/apresentacao.ts).

### 🟢 sugestões
- catalogo/app/telas/arvore.tsx:249 — o primeiro passo da trilha se chama "Início", igual à aba Início; sugiro "Catálogo" ou "Todas".
- promotor/app/telas/tela-loja.tsx:104 — "O cadastro é feito no BKO de trade" (sigla técnica para o promotor): "Peça ao escritório para cadastrar as categorias".
- "registro(s)", "obrigatória(s)", "trilha(s)" (tela-loja.tsx:328, responder-screen.tsx:178, treinar-screen.tsx:48): singular/plural pela contagem.
- pesquisas-screen.tsx:26 e treinar-screen.tsx:60 — "Enviando…" com sinal mesmo quando o envio falhou; ler o estado da fila do motor.
- gestor/app/screens/ranking-screen.tsx:45 — "(módulo desativado ou sem dado)" é técnico: "Ninguém da equipe tem este número ainda."
- treinamento/app/screens/licao-screen.tsx:115 — `Linking.openURL(midia_url)` sem conferir esquema; aceitar só https.

### Sem achado
Área segura, alvos de 48 dp (cartões, níveis da árvore, trilha, chips, botões da Loja e do quiz), textos em português, nenhuma rota da Fase M nas telas revisadas, offline com aviso em todas.

## Pronto quando
🟡 1 no APK das 22h se der (1 linha); demais 🟡 no backlog de cada dono; roteiro M-D16/M-D17a ajustado ("Mais › Catálogo"; "Aprovações" com o Gestor ligado).
