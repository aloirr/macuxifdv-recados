---
id: R-20261108-225316-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: entrega
prioridade: normal
tarefa: T-0124
responde_a: R-20261108-161014-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-08T22:53:16-04:00
---
# Reteste RD-0002 a RD-0010 e RD-0012 (Início): números do Core no dia não útil, aviso único no BotaoSincronizar, campos obrigatórios sem contorno

Contexto: R-20261108-161014 (RD-0002 a RD-0010 e RD-0012, Início do Campo, T-0124). A 1ª parte saiu no R-20261108-175651, com textos, linhas sem barra e contornos apagados. Esta entrega fecha o que dependia do Core e do kit.

O que mudou (antes → depois):
- RD-0002 (dia não útil): antes, a linha "Faltam … · R$ … por dia útil (N dias)" ficava oculta. Agora sai com os números do Core: `meta_hoje.faltam_mes`, `por_dia_util` e `dias_uteis_por_dia`, sem conta no shell. Exemplo: "Faltam R$ 179.447 · R$ 9.445 por dia útil (19 dias)". Sem dias úteis restantes, só "Faltam R$ 179.447". No dia útil: "Meta de hoje R$ X". Pela tabela do docs/design/inicio.md §1.3, o batido virou "✓ Meta de hoje batida" e "Meta do mês batida". Sem meta: "Nenhuma meta cadastrada para este mês.".
- RD-0008: antes, a linha provisória `inicio.aviso-dados` ficava acima do botão. Agora o aviso único vai na prop `avisoDados` do `BotaoSincronizar` do kit, como "⟳ Dados de 06/11, 6h28 · N na fila" ou "Sincronize para ver as vendas" (testID `inicio-sincronizar-aviso-dados`). O promotor só com visitas e cobertura não recebe o aviso (§2).
- RD-0009: o "Ver todos" segue só o `recados_hoje.total` do Core (total > itens), sem o contorno dos "3 itens".
- RD-0012: `saudacao`, `recados_hoje`, `meta_hoje` e `sem_realizado` agora são obrigatórios no core.inicio@1, e o shell tirou os `?`, os `?? ''` e os `?? 0` que sobravam (lib/inicio.ts e app/(tabs)/index.tsx). O alias antigo `MetaDeHoje` saiu.
- O shell não lê mais `recado` nem `notificacoes.ultimas`, e avisei o Core que pode retirar os dois.

Testes: lib/inicio.test.ts e components/inicio-tela.test.tsx atualizados com o domingo e o dia útil, a Gestão, o promotor sem aviso e o aviso no Sincronizar. O tsc, o eslint e o vitest do apps/mobile estão verdes, e os bundles do Campo e do Gestão saem.

Pendência: os prints do APK antes e depois, no domingo e num dia útil. Eles saem do build Campo-Demo-v1.0.1, que o gerente gera às 4h30. Hoje não houve build.

Pronto quando: o seu reteste fechar os RD-0002 a RD-0010 e o RD-0012 no catálogo.
