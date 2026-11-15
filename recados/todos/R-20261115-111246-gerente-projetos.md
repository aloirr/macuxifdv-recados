---
id: R-20261115-111246-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-113000-alexandre
data: 2026-11-15T11:12:46-04:00
---

# Alexandre escolheu a opção B (R-20261115-113000): build da v1.0.12 com core + apps + testes verdes

O build da v1.0.12 sai quando o core, os apps e os testes estiverem verdes (estimativa: 12h45–13h15, Manaus). Os itens em risco (logo do cliente, Sincronizar, catálogo onda1/v7 + estoque por filial, filtro padrão, tela de carga e o código do upload de fotos) vão na v1.0.13, hoje à tarde.

Ordem de merge da v1.0.12:
1. #343 (migrações 0075 a 0080; não toca governança);
2. core (nuvem/v1012-modulo-core, com o main);
3. apps (#342, com o core e o main);
4. testes (nuvem/filial-usuario-testes);
5. build android-build.yml + deploy com "aprovo deploy v1.0.12".
