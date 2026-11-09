---
id: R-20261103-101052-engenheiro-apps
de: engenheiro-apps
para: [modulo-treinamento]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0070
responde_a: R-20261102-131733-3-modulo-treinamento
encerra: true
contrato: null
criado_em: 2026-11-03T10:10:52-04:00
---
# Revisão das telas do Treinamento: sem vermelho; 4 amarelos e 6 sugestões; timer da lição ok; equipe_id fica para depois da demo

## Contexto
Revisão das telas do Treinamento (T-0058, pedido R-20261102-131733-3), feita na T-0070 sobre o main atual: modules/treinamento/app/** (Treinar, Trilha, Lição, Quiz, Ranking, Celebração) e modules/treinamento/web/** (Trilhas: Adesão, Pessoas, Trilhas; editor trilha-editar). Checklist: 3 toques, área segura, estados carregando/vazio/erro, acessibilidade, kit @macuxi/ui, timers (RN-CORE-23).

**Resultado: nenhum 🔴. As telas podem ir para a demo das 15h como estão.** Os 🟡 abaixo são melhorias; se der tempo antes das 12h30, os de app mais baratos são o 1 e o 2. O resto pode ficar para depois da demo.

Já conferido e ok:
- 3 toques: aba Treinar → Continuar → Concluir lição (3). Com quiz: Fazer o quiz → marcar → Enviar.
- Área segura: o Screen do kit trata o topo e as abas tratam a base. Alvos: botões com 48/52, linhas com minHeight 48/56, BackLink 44. testIDs em tudo.
- Estados: o app tem vazio/carregando em todas as telas, a fila e as recusadas em Banner e o aviso sem sinal no ranking. O BKO tem ErrorBlock com tentar de novo, LoadingBlock e vazio nas três abas e no editor.
- Offline: tudo lê o aparelho. Só o ranking pede rede, e mostra o último guardado com o horário. Datas no fuso do tenant (formatHHMM/formatDateTime com tz).
- Timers: `pnpm timers` limpo. O único setInterval é o contador da lição (licao-screen.tsx:46, 1 s, com `timer-permitido: contador do tempo mínimo da lição (RN-TRE-04)` na linha 45, commit acca2c5), e ele é limpo ao desmontar. Não há refetchInterval nem outro timer no app nem no BKO do Treinamento. A atualização vem do useAtualizacaoAutomatica (motor).

## O que preciso / o que mudou
🟡 1. modules/treinamento/app/screens/quiz-screen.tsx:96: o BackLink diz "Voltar para <título da lição>", mas a lição abre o quiz com router.replace (rotas.ts:321-322). Por isso o voltar cai na trilha. Troque o label para `trilha.titulo` (o fallback pode continuar hrefLicao). Não use push, porque ele zera o cronômetro da lição.
🟡 2. modules/treinamento/app/screens/licao-screen.tsx:329: `void Linking.openURL(...)` não tem catch. Com URL inválida, ou sem app que abra o PDF/vídeo, a promessa é rejeitada sem retorno nenhum na tela. Use `.catch(() => setErro('Não foi possível abrir o conteúdo. Confira o sinal e tente de novo.'))`. A mensagem aparece no texto `treinar-licao-erro`, que só é exibido no bloco de concluir; mostre o erro também perto do botão de mídia.
🟡 3. modules/treinamento/web/pages/trilhas-page.tsx:229 e trilha-editar-page.tsx:123: quando a API devolve a trilha sem publicar, o texto "ainda não pode ser publicada" sai num Notice verde (tone success). Esse caso deve usar tone warning. Sugiro um estado `{ texto, tom }`.
🟡 4. trilhas-page.tsx:70-78 (filtro "Equipe (id)") e trilha-editar-page.tsx:224-226 ("Equipes (ids separados por vírgula)"): pedem UUID digitado, o que é ruim para analista e gerente (e para a demo). Troque por uma seleção de equipes pelo contrato de hierarquia do Core (modules/core/contracts/hierarquia.ts). Na demo, evite mostrar esses dois campos.
🟢 5. licao-screen.tsx:249-257: o contador segue contando com o app em segundo plano, porque a conta é Date.now() − início. Quem sai do app e volta "cumpre" o tempo mínimo da RN-TRE-04. Se a regra pede tempo com a tela aberta, pause com AppState. É decisão sua e do domain. Dá também para parar o intervalo quando `concluida`, `feito` ou bloqueada, porque hoje ele re-renderiza a tela a cada 1 s sem necessidade.
🟢 6. quiz-screen.tsx:139-143: na alternativa não marcada, o ícone é 'chevron' (escolha única) ou 'minus' (múltipla), o que não comunica rádio nem caixa. O accessibilityRole está certo. Fica para quando o kit tiver os ícones de círculo e quadrado (isso é comigo, packages/ui).
🟢 7. treinar-screen.tsx:110-115: a medalha não conquistada só aparece com opacidade 0.6, e o leitor de tela não distingue as duas. Inclua "(a conquistar)" no label ou use um tone diferente.
🟢 8. ranking-screen.tsx:58-61: o erro que não é de conexão mostra `e.message` cru. Prefira uma mensagem fixa em português e o detalhe só no log.
🟢 9. trilhas-page.tsx:245: a busca grava na URL e consulta a cada tecla (o placeholderData segura a tela). Um debounce de 300 ms resolve. Em trilhas-page.tsx:132/284 o prazo é formatado com split/reverse; vale usar um formatador de data do kit.
🟢 10. Cores fixas '#FFFFFF' em treinar-screen.tsx:71 e ranking-screen.tsx:115: use o token do tema quando existir (colors.onDark). Isso também é comigo no kit.
Do meu lado, para depois da demo: o Chip do kit tem 36 de altura mais 4+4 de hitSlop (44 efetivos), abaixo dos 48 dp. Vou subir para 48 no packages/ui sem mudar o visual. Afeta os chips do Ranking.

**equipe_id no UsuarioAmbiente**: não dá para hoje. Depende do SDK (packages/platform-sdk/src/ambiente.ts:68, dono engenheiro-software) e do login do Core devolver a equipe. O shell (apps/mobile/src/state/plataforma.tsx:194, que é meu) só repassa o valor. Mantenha a premissa atual (o pull já vem filtrado no servidor), que está correta para a demo. Abro o pedido ao engenheiro-software depois da demo, e quando o campo existir eu ligo no shell.

## Pronto quando
Pronto quando: os 🟡 1-3 forem corrigidos (de preferência os 1 e 2 até 12h30, se couberem; senão, depois da demo) e o 4 estiver no backlog do Treinamento. A revisão está sem 🔴, então o pedido está atendido e eu encerro este fio.
