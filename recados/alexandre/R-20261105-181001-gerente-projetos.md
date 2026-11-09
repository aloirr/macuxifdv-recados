---
id: R-20261105-181001-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:10:01-04:00
---
# APKs de preview do f0dcf03 (Campo e Gestão): etapa pendente, Minha RV, voltar, Catálogo — links e roteiro

## Contexto
Builds de preview do main **f0dcf03** (lote N). A demo está no f702090 (lote O), que só mudou API e BKO, então o app conversa com ela sem problema. A parte nativa é a mesma do 21aa690: só o JS mudou. Instale o APK novo.

## Links
- **Campo:** APK https://expo.dev/artifacts/eas/0PZDvN5BXIZNB0VGYg5oJeA18DiASOQ7u-X_EeYWPyo.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/84cf6500-c8c5-4b15-90f5-868002655705
- **Gestão:** APK https://expo.dev/artifacts/eas/wzdpjENlXCi6ofEGXGsnBKRjseh14FgDRvmO7Xh5i_Q.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/b0c1f817-f483-4d70-8f41-238d59cd33ab

## O que há de novo para conferir (toque real)
- **A. Etapa pendente (T-0039):** numa visita de cliente com pesquisa obrigatória, faça o checkout sem responder à pesquisa.
  - A parada aparece como feita, com o chip âmbar "Etapa pendente".
  - A ficha do cliente mostra o aviso de duas linhas.
  - No Gestão, aparece o alerta na aba Alertas.
  - Responda à pesquisa e sincronize: o chip e o aviso somem.
- **B. Minha RV (T-0082):** em Metas, o cartão "Minha RV" mostra o valor, "No ritmo" ou "Ainda não atingido", as faixas e o gatilho. Confira também estes estados:
  - sem cálculo e sem plano;
  - em modo avião, tocando em Sincronizar: aparece o aviso "Desligue o modo sem sinal para sincronizar".
- **C. Voltar:** com o Novo pedido aberto pelo cartão do Início, o topo mostra "‹ Início", e o voltar leva ao Início.
- **D. Faixa "Em atendimento":** com uma visita aberta, os botões "Fazer checkout" e "Ver cliente" ficam bem diferentes um do outro sobre o fundo escuro.
- **E. Folhas:**
  - em tela pequena, a folha do checkout rola;
  - na justificativa do check-in, o teclado não cobre o botão.
- **F. Catálogo:** uma busca sem resultado mostra `Nada encontrado para "…"` com a dica certa, "Limpar filtros" ou "Limpar a busca". Com filtro ligado, a dica muda; sem internet, a dica também muda.

## Ainda valem (do 21aa690)
1. Teclado no novo pedido.
2. Valor digitado vale ao tocar em Salvar. "1.5" no campo em R$ vira R$ 1,50.
3. Voltar do Android pela pilha.
4. Aba acesa.
5. "Transformar em pedido" visível sem rolar; selo "Vencido".
6. Rota, visita e check-in no visual novo.
7. Alerta no Gestão.
8. **Tela de medição:** Perfil › 7 toques na versão › "Rodar medição". Mande os números.

## Com o seu "ok" neste roteiro
Fecho as tarefas T-0039, T-0082, T-0071, T-0072, T-0076, T-0077 e T-0079. Os números da medição fecham a T-0008.
