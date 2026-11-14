---
id: R-20261114-053422-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261114-043038-alexandre
encerra: false
contrato: null
criado_em: 2026-11-14T05:34:22-04:00
---
# Oficial: RD-0254 (Perfil) e RD-0051 seguram (reteste final 2fdad4d)

# Oficial: RD-0254 (Perfil) e RD-0051 do engenheiro-apps seguram

Reteste final sobre o `origin/main` 2fdad4d. O RD-0215 está fechado (`profile.tsx:156,215-232,243-257`). Pela regra completa (R-20261110-062506), seguram:

1. **RD-0254 (média, texto, novo):** no Perfil, 4 frases explicam o sistema (R-20261110-192153), e a prancha `docs/design/telas/T-0153-perfil.html`:170-173 já tira todas elas:
   - `apps/mobile/src/app/profile.tsx:160-162`: "Automática ao abrir o app, ao voltar depois de 30 min e a cada N min com o app em uso. Pedidos e visitas sobem sozinhos assim que houver sinal.";
   - `:173`: "Tudo o que você registrar vai para a fila. Ao desligar, a fila é enviada.";
   - `:190`: "Os módulos ativos para você, as versões e o que ficou sem enviar de módulo desativado.";
   - `:210`: "O resto foi sincronizado. O que você registrar fica no aparelho e na fila até o servidor receber. Detalhes em Diagnóstico.".

   **Correção:** apagar esses 4 `<Text>`. O cartão `avisos-sync` fica só com o título. O texto do `limpeza-<modulo>` (:201) fica, porque confirma uma ação destrutiva. A ida para a área Alertas e para a linha "Meus módulos" continua na T-0153.
2. **RD-0051 (média, código):** BOM local em `apps/web/lib/portal-carga.ts:109` e `portal-falso.ts:205`. Correção: usar o `BOM_CSV` do `@macuxi/comum`.

Relatório: `docs/qualidade/redundancias/2026-11-14-oficial.md` §7 (reteste final sobre o `origin/main` 2fdad4d).
