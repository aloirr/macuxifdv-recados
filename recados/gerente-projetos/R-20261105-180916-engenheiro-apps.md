---
id: R-20261105-180916-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0039
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T18:09:16-04:00
---
# APKs preview Campo e Gestão do f0dcf03 prontos (T-0039, T-0082, T-0052, T-0072) com roteiro de toque real

## Contexto
Build de preview pedido pelo gerente para o Alexandre: tarefas T-0039, T-0082, T-0052 e T-0072. O main está em f0dcf03c1c616698aac1845ad8fe28dc7b4c832c (lote N), o mesmo commit do CI verde e da demo publicada.
- O worktree limpo C:\macuxifdv-check foi para checkout destacado no f0dcf03, sem alteração local.
- `pnpm install --frozen-lockfile` passou LÁ, sem passo de resolução.
- Entre o 21aa690 e o f0dcf03 não mudou nada em apps/mobile/package.json, app.config.ts, eas.json nem pnpm-lock.yaml. A parte nativa é a mesma: só o JS muda.
- Bundle Android das duas variantes verde (expo export com as variáveis do perfil preview e a API da demo). Campo e Gestão saem com 2026 módulos e o .hbc de 5,8 MB.
- A Expo registrou o gitCommitHash f0dcf03c1c616698aac1845ad8fe28dc7b4c832c nos dois builds.

## O que preciso / o que mudou
Os dois builds terminaram (FINISHED): o Campo em 20 min e o Gestão em 22 min.
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/0PZDvN5BXIZNB0VGYg5oJeA18DiASOQ7u-X_EeYWPyo.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/84cf6500-c8c5-4b15-90f5-868002655705
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/wzdpjENlXCi6ofEGXGsnBKRjseh14FgDRvmO7Xh5i_Q.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/b0c1f817-f483-4d70-8f41-238d59cd33ab

Roteiro para conferir com toque real neste APK (Campo, salvo onde diz Gestão). Se der, use um aparelho de 360 x 780 dp.

**Novos deste lote**
A. **Etapa pendente (T-0039):**
   - faça um check-out sem a pesquisa obrigatória;
   - na Rota, a parada mostra o chip "Etapa pendente" (o TalkBack lê "Visita feita com etapa pendente");
   - a ficha do cliente mostra o aviso âmbar "Uma etapa da visita de hoje ainda não chegou ao Macuxi" (no plural com 2 ou mais etapas);
   - a segunda linha do aviso muda com a fila e o sinal: em modo avião, "Ela vai sozinha da fila quando houver sinal"; com a fila vazia, "Fale com seu supervisor";
   - check-out sem sinal seguido de Sincronizar (S1-047): a visita e a etapa sobem juntas quando o sinal volta, sem item perdido nem duplicado;
   - se a gravação do check-in falhar, a folha fecha.
B. **Minha RV em Metas (T-0082):**
   - com cálculo: aparecem os indicadores, com "Meta … · realizado …", a faixa ("Faixa atingida: paga N%" ou "Abaixo da primeira faixa: não paga") e a linha do gatilho com os mesmos textos do BKO;
   - sem cálculo: "Sua RV ainda não foi calculada", com o botão Sincronizar;
   - sem plano: "Sem plano de RV para você neste mês";
   - em modo avião: o último cálculo continua na tela, e tocar em Sincronizar mostra o aviso padrão de sem sinal, sem travar;
   - o vendedor e o promotor veem só a própria RV (RN-CORE-30).
C. **"‹ Início" no Novo pedido (T-0072):**
   - Início › Novo pedido mostra "‹ Início" já no primeiro quadro, sem piscar "Pedidos". O TalkBack lê "Voltar para Início, link";
   - o "‹ Início" e o voltar do Android levam os dois ao Início, com a aba Início acesa;
   - Pedidos › Novo pedido continua "‹ Pedidos";
   - um link do Mais mostra "‹ Mais";
   - com "reduzir movimento" ligado, o rótulo continua certo.
D. **Faixa "Em atendimento":** os botões ficam legíveis sobre o fundo escuro (Botao sobreEscuro). O vermelho usa o token dangerOnDark, e não o vermelho comum.
E. **Tela pequena e teclado:**
   - a folha do checkout rola até o último botão em 360 dp;
   - na justificativa do check-in, o campo e o botão ficam acima do teclado.
F. **Busca do Catálogo sem resultado (T-0052).** O título é sempre `Nada encontrado para "<termo>"`, cortado com "…" acima de 30 caracteres. Os 4 casos:
   1. com chip de linha, marca ou "Com estoque" ligado: "Há filtro ligado. Tire o filtro para procurar em todo o catálogo.", com o botão "Limpar filtros", que traz o resultado;
   2. sem filtro e em modo avião: "Confira a grafia, tente o código ou só o começo do nome. Com internet, a busca entende mais erros de digitação.", com o Banner âmbar acima;
   3. sem filtro, dentro do pedido: "… Aqui aparecem só os produtos que este cliente pode comprar.";
   4. os demais casos: "Confira a grafia, tente o código ou só o começo do nome.".
   Nos casos 2, 3 e 4, "Limpar a busca" e o X do campo voltam à vitrine na hora. Num catálogo grande, "refrijerante" mostra o vazio rápido.

**Do roteiro do 21aa690 (R-20261105-152333) que ainda vale**
1. **Teclado do novo pedido:**
   - a quantidade e o desconto do último item, a transportadora do FOB, as Observações e o Desconto do pedido ficam acima do teclado;
   - o rodapé Total | Avançar fica atrás do teclado e volta quando ele fecha;
   - "concluído" fecha o teclado.
2. **Valor digitado ao tocar direto:**
   - "5," no Desconto e Salvar sem fechar o teclado: a folha já mostra os 5%;
   - a quantidade digitada vale com um toque em Avançar ou no + de outro item;
   - "1.5" no R$ vira R$ 1,50;
   - apagar o "1" de 10 não tira o item.
3. **Voltar do Android:**
   - Início › Novo pedido › Salvar orçamento abre o detalhe com "Orçamento 000012 salvo";
   - o voltar leva ao Início sem reabrir o editor;
   - Resumo › Detalhes › Itens › sai, e o rascunho fica no aparelho.
4. **Aba acesa:**
   - o detalhe aberto pelo Início mantém o Início aceso, e o aberto por Pedidos mantém Pedidos;
   - item do Mais acende o Mais;
   - tocar de novo na aba acesa volta à raiz.
5. **Orçamento com 4 itens:**
   - "Transformar em pedido" aparece sem rolar;
   - Duplicar e Cancelar têm o mesmo peso, e o Cancelar fica em vermelho.
6. **Visual novo do Core:**
   - Rota, ficha, check-in/check-out e lista de visitas;
   - no check-out com etapa faltando, aparece "Falta concluir: …".
7. **Alerta de etapa pendente no Gestão:**
   - o check-out com pendência no Campo gera o alerta na aba Alertas, depois de Sincronizar;
   - o toque abre a ficha;
   - a notificação só fica lida na aba Alertas.
8. **Tela de medição:**
   - no Perfil, 7 toques em "versão 1.0.0", com até 3 s entre eles;
   - em "Diagnóstico de carga", Rodar medição e mandar o tempo de carga e o p95 da busca.

## Pronto quando
O Alexandre precisa instalar os dois APKs novos (o JS mudou e vem no APK) e devolver o roteiro. Se um item falhar, eu separo o que é do shell (C, itens 3 e 4) do que é dos módulos (A, B, D, E e F: core, catálogo e vendedor). Nada foi alterado no repositório, sem commit e sem segredo em log. Minha caixa foi tratada: o 🟢 opcional do R-20261105-164122 (import relativo no teste) fica para quando o kit tiver o subcaminho. Nenhuma pendência minha.
