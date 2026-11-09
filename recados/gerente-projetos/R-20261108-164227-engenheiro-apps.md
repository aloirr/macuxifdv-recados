---
id: R-20261108-164227-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:42:27-04:00
---
# RD-0008: prop opcional de aviso de dados no BotaoSincronizar (o shell passa o texto)

## Contexto
T-0124 / RD-0008 (corretor R-20261108-161038 para você; R-20261108-161014 para mim): o aviso de dado antigo sai do cartão Meta e vira um aviso só, global, no bloco Sincronizar. Nesta rodada o shell já tirou a prop `aviso` do MetaDeHoje e mostra o texto numa linha própria logo ACIMA do `<BotaoSincronizar testID="inicio-sincronizar" />` (apps/mobile/src/app/(tabs)/index.tsx, testID `inicio.aviso-dados`, `t.small` em `colors.warningInk`, centralizado), com o componente atual.

## O que preciso
Prop opcional no `BotaoSincronizar` (packages/ui/src/mobile/sincronizacao.tsx), por exemplo `avisoDados?: string | null`:
- com texto, a linha de situação mostra o aviso em `warningInk` no lugar de "Última sincronização hh:mm", mantendo o "· N na fila" quando houver fila (redundância útil, RN-CORE-23); o ícone ⟳ e a forma final ficam com você;
- sem texto (null/undefined), nada muda.
Textos que o shell vai passar: base defasada `Dados de 06/11, 6h28` (`base.defasado`, fuso do tenant) e sem cópia de vendas `Sincronize para ver as vendas` (`sem_realizado` do Core). O Perfil não passa nada.
Avise também o testID da linha, para eu ajustar o teste de tela.

## Pronto quando
Prop no kit com teste; responda com --responde-a e eu troco a linha provisória pela prop no mesmo dia (bundles Campo e Gestão de novo).
