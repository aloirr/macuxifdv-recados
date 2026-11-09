---
id: R-20261105-152431-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T15:24:31-04:00
---
# Build de preview do 21aa690 (Campo e Gestão) com o visual novo do Core e o novo pedido: links e roteiro de 8 itens

## Contexto
Builds de preview do main **21aa690**, o mesmo commit da demo publicada (CI e "demo — publicar" verdes; api 200, bko 200). Esse commit tem o PR #94 (visual novo do Core) e os lotes K, J e L. A parte nativa é a mesma do 68ea7d9, que já trazia o expo-sqlite e a tela de medição. Mesmo assim, instale o APK novo, porque o JS mudou bastante.

## Links
- **Campo:** APK https://expo.dev/artifacts/eas/Y5dxddX-N1QrTDbVDJXE6nxUycmOZcRcYtH9W6MHhzU.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/e2842e54-d153-4901-8473-d9032ba2afa3
- **Gestão:** APK https://expo.dev/artifacts/eas/3Sz9SuUftoANiYD_7w-a9t9f0UEBBEwmT80UWTSNcgY.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/a63cfbc4-90aa-488e-8972-babd53a3194e

## O que conferir com toque real (8 itens)
1. **Teclado do novo pedido:** a quantidade e o desconto dos últimos itens, o FOB e o desconto do pedido ficam acima do teclado.
2. **Valor digitado:**
   - digite a quantidade e toque direto em Salvar ou Avançar: o valor vale;
   - digite "1.5" no campo em R$: vira R$ 1,50;
   - apague o "1" de "10": o item não some enquanto você digita.
3. **Voltar do Android:** Início › Novo pedido › Salvar orçamento › voltar leva ao Início. Pedidos › detalhe › voltar leva a Pedidos.
4. **Aba acesa:** no detalhe do pedido e no Novo pedido, a aba Pedidos fica acesa.
5. **Orçamento:** com 4 itens, "Transformar em pedido" aparece sem rolar. O orçamento vencido mostra "Vencido".
6. **Rota, visita e check-in no visual novo** (#94): a faixa "Em atendimento", a folha de check-in e o vazio da Rota.
7. **Gestão:** o alerta de etapa pendente aparece na aba Alertas.
8. **Tela de medição** (T-0008): Perfil › 7 toques na linha da versão › "Rodar medição". Mande os números.

## O que ainda não está neste APK (vai no próximo build)
Estes itens vêm no próximo build, que sai depois do lote M2 e do lote seguinte:
- o chip "Etapa pendente" na Rota e o aviso na ficha do cliente;
- o cartão "Minha RV" em Metas;
- os botões novos da faixa "Em atendimento";
- o rótulo certo do "‹ voltar";
- a busca rápida do Catálogo com catálogo grande.
