---
id: R-20261105-152333-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:23:33-04:00
---
# APKs preview Campo e Gestão do 21aa690 prontos (T-0071, T-0072, T-0039, T-0008) com roteiro de toque real

## Contexto
Build de preview pedido pelo gerente para o Alexandre: tarefas T-0071, T-0072, T-0039 e T-0008, main 21aa6904c101a6c929a16468f210aab5b0c46cdb (PR #94, visual novo do Core, e lotes K, J e L), o mesmo commit do CI verde e da demo publicada.
- Worktree limpo C:\macuxifdv-check em checkout destacado no 21aa690.
- pnpm install --frozen-lockfile verde LÁ, sem resolução (o lock é o do commit). Desde o 68ea7d9, a única mudança no app é @types/node em devDependencies: a parte nativa não muda.
- Bundle Android das duas variantes verde (expo export, perfil preview, API da demo): Campo e Gestão com o .hbc de 5,8 MB.
- A Expo registrou o gitCommitHash 21aa6904c101a6c929a16468f210aab5b0c46cdb nos dois builds.

## O que preciso / o que mudou
Builds terminados (FINISHED; Campo em 21 min, Gestão em 22 min):
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/Y5dxddX-N1QrTDbVDJXE6nxUycmOZcRcYtH9W6MHhzU.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/e2842e54-d153-4901-8473-d9032ba2afa3
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/3Sz9SuUftoANiYD_7w-a9t9f0UEBBEwmT80UWTSNcgY.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/a63cfbc4-90aa-488e-8972-babd53a3194e

Roteiro curto para conferir com toque real neste APK. Usa as listas do designer-ux (R-20261105-120752) e as minhas (R-20261105-121434). Aparelho de 360 x 780 dp, se der.
1. **Teclado do novo pedido (Campo):**
   - a quantidade e o desconto do último item, a transportadora do FOB, as Observações e o Desconto do pedido ficam inteiros acima do teclado;
   - o rodapé Total | Avançar fica atrás do teclado e volta quando ele fecha;
   - "concluído" fecha o teclado.
2. **Valor digitado ao tocar em Salvar:**
   - digitar "5," no Desconto do pedido e tocar direto em Salvar, sem fechar o teclado: a folha já mostra o total com 5%;
   - digitar a quantidade e tocar direto em Avançar ou no + de outro item: vale num toque só;
   - "1.5" no R$ vale R$ 1,50;
   - apagar o "1" de 10 na quantidade: o item não some.
3. **Voltar do Android:**
   - Início › Novo pedido › Salvar orçamento: abre o detalhe com o aviso "Orçamento 000012 salvo";
   - o voltar do Android leva ao Início e não reabre o editor;
   - dentro do editor, Resumo › Detalhes › Itens › sai, e o rascunho fica no aparelho.
4. **Aba acesa:**
   - no detalhe aberto pelo Início, o Início continua aceso;
   - aberto por Pedidos, Pedidos fica aceso;
   - item do Mais acende o Mais;
   - tocar de novo na aba acesa volta à raiz dela.
5. **Transformar visível sem rolar:** no detalhe de um orçamento com 4 itens, "Transformar em pedido" aparece sem rolar. Duplicar e Cancelar orçamento têm o mesmo peso, e o Cancelar fica em vermelho.
6. **Rota, visita e check-in no visual novo (PR #94):** conferir a Rota, a ficha do cliente, o check-in e o check-out e a lista de visitas. No check-out com etapa faltando, deve aparecer "Falta concluir: …".
7. **Alerta de etapa pendente no Gestão (T-0039):**
   - um check-out com pendência feito no Campo gera o alerta na aba Alertas do supervisor, depois de Sincronizar;
   - o toque abre a ficha do cliente;
   - a notificação só fica lida na aba Alertas.
8. **Tela de medição (T-0008, Campo):**
   - no Perfil, tocar 7 vezes na linha "versão 1.0.0", com até 3 s entre os toques;
   - na tela "Diagnóstico de carga", tocar em Rodar medição e mandar o tempo de carga e o p95 da busca.

Também vale olhar: o chip de medida e o Desfazer com o teclado aberto, a aplicação do produto em 2 linhas e o selo "Vencido" ao sol.

## Pronto quando
Pronto quando o Alexandre instalar os dois APKs novos (a parte nativa é a mesma do 68ea7d9, mas o JS mudou e vem no APK) e devolver o roteiro. Nada alterado no repositório, sem commit, sem segredo em log. Pendência minha: nenhuma. Se um item do roteiro falhar, eu separo o que é do shell (itens 3 e 4) do que é dos módulos.
