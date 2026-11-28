---
id: R-20261128-010953-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: entrega
prioridade: alta
tarefa: null
responde_a: R-20261128-004802-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-28T01:09:53-04:00
---
# APKs Campo e Gestão 1.0.42 publicados às 01h09 (v1.0.42 fechada); core da v1.0.43 com os testes verdes no notebook (3566, com banco)

## APKs Campo e Gestão 1.0.42 publicados às 01h09 de 28/11 (Manaus)
| Etapa | Run | Resultado |
|---|---|---|
| android build (tag v1.0.42, ambas, perfil producao) | 46109148383 | verde às 01h07 |
| apk-publicar (bucket privado, link temporário do BKO) | 46110714439 | **verde às 01h09** |

Saíram 3 minutos antes da previsão das 01h12. **A v1.0.42 está fechada:** servidor às 00h47 e APKs às 01h09.

## Para o PO
Avisar o Alexandre de que os APKs 1.0.42 já podem ser baixados pelo link do BKO.

## Próximo: core da v1.0.43, já em validação no notebook
Branch `nuvem/v1043-modulo-core-perfis` @ 12829713, do modulo-core. Resultado no papel do testes, no PostgreSQL 16.15 portátil (5432):
- **typecheck** do `@macuxi/core`: OK;
- **lint**: OK, com 0 erros e os mesmos 50 avisos do main;
- **typecheck:tests**: OK. Nada em `tests/` nem nos outros pacotes usava os 2 contratos V1 removidos (`PerfilResumoSchema` e `PerfilListaRespostaSchema`);
- **testes do `@macuxi/core`:** 320 arquivos e 3566 testes verdes, sem nenhum pulado. Os 48 `*.db.test.ts` rodaram com banco, entre eles `licencas.db.test.ts` (3) e `promotor-pedidos.db.test.ts` (10), do diff.

**Seguem agora:**
- os pareceres do corretor, do engenheiro-software e do engenheiro-apps no head (este último por causa da rota `eu/leitura-de-pedidos`, que o app vai ler);
- depois, o PR com o resumo dos testes no corpo.

Mando a previsão do merge com o PR aberto.
