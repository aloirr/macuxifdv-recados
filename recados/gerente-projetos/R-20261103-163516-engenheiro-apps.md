---
id: R-20261103-163516-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T16:35:16-04:00
---
# T-0071 fatia 4: componentes do Novo pedido em packages/ui (props para o modulo-vendedor)

## Contexto
T-0071, fatia 4 (desenho docs/desenho/T-0071.md §6.2 e §7): componentes genéricos do Novo pedido em packages/ui, com as medidas do .html da referência enxuta (docs/produto/referencias/R-20261103-130003-alexandre-novo-pedido.html). Trabalho feito entre 16h e 16h15, ANTES da troca de dono do packages/ui para o designer-ux (R-20261103-161508-alexandre, T-0072). Depois da troca não alterei mais nada em packages/ui; o designer-ux herda estes arquivos e pode refazer o visual na T-0072 mantendo as props (o modulo-vendedor já pode usar).

## O que fiz (arquivos)
Novos:
- packages/ui/src/mobile/componentes.ts (puro, também em @macuxi/ui/mobile/puro): ALVO_TOQUE=48, rotuloComContador, limitarPasso, proximoPasso, lerQuantidade, folgaDeToque.
- packages/ui/src/mobile/formulario.tsx: Abas, Segmentado, Passo, CampoBusca, RotuloSecao, ChipMedida, BotaoIcone.
- packages/ui/src/mobile/folha.tsx: Folha, OpcaoFolha, Dialogo.
- packages/ui/src/mobile/valores.tsx: RodapeTotal, LinhaValor, BlocoTotais, Faixa, Selo.
- packages/ui/src/mobile/componentes.test.ts (12 testes: parte pura + conferência estática: exportados no índice, nenhum texto literal em JSX/accessibilityLabel/placeholder, hitSlop nos visuais < 48, Chip com 48).
Alterados:
- index.ts (exporta os 4 arquivos novos); puro.ts (reexporta componentes); puro.test.ts (componentes.ts na checagem "sem react-native");
- theme.ts: cores violet #4B2FA3 / violetBg #ECE7FB (roxo da referência, contraste 7,9:1); TOUCH 44 → 48 (só o BackLink usa: cabeçalho 4 dp mais alto);
- icon.tsx: ícone novo 'swap' (⇄ do "Leve mais");
- ui.tsx: Chip com hitSlop 6+6 (36 visual → alvo 48 dp), o 🟡 da revisão anterior;
- navegacao.tsx: Trilha ganhou `compacta` ("Mercearia › Bebidas" em 13, anteriores cinza, atual laranja; alvo 48) e `rotuloAcessivel(item, atual)`; o Catálogo segue igual sem as props novas.
O Segmentos e o BottomSheet do modulo-vendedor foram só referência (não editei o módulo).

## Props (para o modulo-vendedor, fatia 6) — todos de '@macuxi/ui/mobile'; nenhum texto fixo, tudo por props
- Abas<T>({ abas: {id, rotulo, contador?, pendente?, testID?}[], valor, onChange, rotuloPendencia?, testID='abas' }) — contador number mostra "Itens (3)"; undefined/null esconde. Fundo ground, sublinhado 3 dp laranja, 48 dp.
- Segmentado<T>({ opcoes: {id, rotulo, rotuloAcessivel?, desligado?, testID?}[], valor: T|null, onChange, rotuloAcessivel? (nome do grupo), compacto?, desligado?, style?, testID='segmentado' }) — radiogroup; normal 48 dp; compacto 36 visual + hitSlop (ajuste Desc./Acrésc. e %/R$: use rotuloAcessivel "Desconto"/"Acréscimo").
- Passo({ valor, onChange, rotulo, rotuloDiminuir, rotuloAumentar, min=0, max?, passo=1, editavel?, desligado?, testID='passo' }) — botões 40 + hitSlop 4 (48), adjustable no leitor de tela; testIDs `${testID}-menos|-valor|-mais`.
- CampoBusca({ valor, onChange, placeholder, rotuloAcessivel?, onLimpar?, rotuloLimpar?, onEnviar?, autoFocus?, testID='busca' }) — × só aparece com onLimpar + rotuloLimpar e texto.
- Trilha({ itens, onEscolher, compacta?, rotuloAcessivel?, testID }) — use `compacta` no Novo pedido.
- RotuloSecao({ texto, acao?: {rotulo, onPress, rotuloAcessivel?, testID?}, testID? }) — "ENTREGA ··· Trocar".
- ChipMedida({ rotulo, onPress?, rotuloAcessivel?, testID? }) — sem onPress é só leitura.
- BotaoIcone({ icone, rotuloAcessivel (obrigatório), onPress, desligado?, tamanho=36, cor=accent, testID? }) — [+] e [⇄] ('swap') das sugestões.
- RodapeTotal({ rotulo, valor (formatado), acao: {rotulo, onPress, seta?, desligado?, ocupado?, testID?}, respiroInferior=0, testID='rodape-total' }) — "Total dos itens" · "R$ 383,63" · [Avançar ›] com seta: true.
- LinhaValor({ rotulo, valor, forte?, destaque?, tomValor?: 'sucesso'|'erro', divisor?, testID? }).
- BlocoTotais({ linhas: {id, rotulo, valor, forte?}[], total: {rotulo, valor}, children? (a Faixa), style?, testID='totais' }) — cartão; total com divisor, 15/19.
- Faixa({ tom: 'ok'|'aviso'|'erro', texto, icone? (null esconde), testID='faixa' }) — texto SEM o ✓ (o ícone vem do tom): textoDaFaixa deve devolver "4,6% · dentro da alçada".
- Selo({ texto, tom?: 'sucesso'|'aviso'|'erro'|'roxo'|'neutro'|'destaque', tamanho?: 'p'|'m', pilula?, rotuloAcessivel?, style?, testID? }) — "−5%" = sucesso p; "Orçamento · até 10/11" = roxo m (ou aviso, como na tela 5 do .html).
- Folha({ visivel, onFechar, rotuloFechar, titulo?, rotuloAcessivel?, rodape?: {rotulo, onPress, testID?}, children, testID='folha' }) — "Salvar pedido" + opções + rodapé "Voltar".
- OpcaoFolha({ icone, titulo, subtitulo?, subtituloErro?, tom?: 'destaque'|'neutro'|'perigo', onPress, desligado?, testID? }) — Enviar: icone 'send' destaque; Orçamento: 'edit' neutro; FOB sem transportadora: desligado + subtituloErro.
- Dialogo({ visivel, titulo, mensagem?, cancelar: {rotulo, onPress, testID?}, confirmar: {rotulo, onPress, ocupado?, testID?}, perigo?, onFechar?, testID='dialogo' }) — "Descartar este pedido?" [Voltar] [Descartar] com perigo.

## Testes
packages/ui: vitest 72/72 verdes (7 arquivos). Typecheck (web + mobile) e lint do packages/ui e typecheck do apps/mobile: ver o fim deste recado. Não rodei build, EAS, install, git nem Postgres.

## Pendências
- packages/ui agora é do designer-ux (T-0072): ele revisa/ajusta o visual destes componentes; as props acima são o contrato para o modulo-vendedor e convém mantê-las.
- Fatia 9 (revisão das telas) continua comigo na parte técnica (offline, navegação, desempenho, bundle); visual e textos passam ao designer-ux pela governança nova.
- Bundle do app (expo export) não rodado nesta rodada (demo no ar, máquina carregada); rodo antes do próximo build.

## Resultado dos checks (16h35)
- packages/ui: vitest 72/72, tsc web e mobile sem erro, eslint sem aviso (exit 0).
- apps/mobile tsc --noEmit: 1 erro, fora dos meus caminhos e do packages/ui: modules/catalogo/domain/precos-cliente.ts(64,70) TS2345 (trabalho em andamento do modulo-catalogo; avisado em recado). Nenhum erro dos componentes novos.
- coord verificar engenheiro-apps: OK, nenhuma violação.
- Diário: linha acrescentada em .coord/diario/engenheiro-apps.md.
- Premissas: Faixa recebe o texto sem o ✓; Selo do orçamento roxo (a tela 5 do .html usa o tom aviso; o vendedor escolhe pelo prop tom); TOUCH 48 afeta só o BackLink.
