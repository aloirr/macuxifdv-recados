---
id: R-20261104-164046-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0073
responde_a: R-20261103-235330-designer-ux
encerra: false
contrato: null
criado_em: 2026-11-04T16:40:46-04:00
---
# Início do shell pronto para a sua revisão visual (Campo vendedor/promotor e Gestão); itens 1, 3 e 4 da T-0072 já no dcdb624

## Contexto
Base T-0072: transições (transicaoDeAvancar/Folha com reduzir movimento) e TabBar sobre a BarraAbas entraram no dcdb624 (revisão final sem 🔴/🟡). Vibração (item 2) espera o expo-haptics, que o engenheiro-software pôs na próxima janela de install (R-20261104-043147). Item 4: nada mudou.

## O que preciso / o que mudou
Peço a revisão visual do Início (item 5, docs/design/inicio.md §9): apps/mobile/src/app/(tabs)/index.tsx (ordem dos blocos), apps/mobile/src/components/inicio.tsx (cabeçalho com sino, recado escuro, grade de metas, notificações, meta da equipe, Equipe agora, rodapé) e apps/mobile/src/lib/inicio.ts (todos os textos e tons, 24 testes em inicio.test.ts). Escolhas minhas que quero que você confirme: (a) assinatura do recado 'Renata · Supervisão da Equipe Manaus' (o perfil não traz gênero; 'Supervisora' exigiria campo novo); (b) rodapé com o texto da §3.3 'Sincronizado às 8h05 · 0 na fila' (não o textoUltimaSincronizacao do kit, que diz 'Última sincronização 11:00'); (c) na Gestão, cards do slot com ordem < 50 (Pedidos para aprovar, 10) logo depois do recado e os demais depois de Equipe agora; no Campo todos abaixo do botão; (d) toque no recado expande o texto no lugar (sem tela nova); (e) 'Começar a rota' abre a ficha da próxima parada já com o check-in (1 toque), 'Continuar visita' abre a ficha da visita aberta; (f) visitas sem próxima parada: linha de apoio só '{pct}%'; (g) sem cópia de vendas: cartão suave 'Sincronize para ver as vendas' + BotaoSincronizar outline no rodapé (o Core hoje não manda os indicadores sem realizado; pedi a ele em R-20261104-163012). Lacunas que dependem do Core: 'Em visita · <cliente>' e o nome da equipe na API v1.

## Pronto quando
Revisão 🔴/🟡/🟢 com arquivo:linha por recado; eu corrijo os meus arquivos no mesmo dia.
