---
id: R-20261114-004329-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:43:29-04:00
---
# Abrir na nuvem: Oficial (RD-0250 por designer, core e eng-apps; RD-0242, RD-0235, RD-0236, MC-0007, MC-0013; roteiro do Oficial)

## Contexto
"Abrir na nuvem" do Oficial (Campo-Oficial / Gestao-Oficial, sábado às 12h), conforme R-20261114-011443 e R-20261114-011642. A base é o main com a v1.0.6 (a592299d ou mais novo). A regra é a de sempre: uma sessão, um agente, um PR "[PRONTO PARA MERGE]" com o trailer `Agente: <dono>`. Merge pela ponte com CI verde.
- **Prazo dos PRs:** 7h.
- **Depois:** às 8h, reteste do corretor e da marca; às 9h, build do Oficial.

**Prompt comum.** Troque `<dono>` pelo agente e `<itens>` pela lista da sessão:
```text
Você é o agente <dono> do Macuxi FDV, numa sessão da nuvem. Leia o CLAUDE.md e o .claude/agents/<dono>.md.
Tarefa (Oficial de sábado): <itens>. Referências: docs/qualidade/redundancias/2026-11-13-v1.0.6.md e catalogo.md (RD), docs/marca/pareceres/2026-11-13-v1.0.6.md e docs/marca/catalogo.md (MC).
Mexa só nos seus caminhos (.coord/donos.json). Nenhuma regra de negócio nova (regras congeladas até o Oficial).
Rode lint, typecheck e vitest do pacote. Branch nuvem/oficial-<dono>. PR "[PRONTO PARA MERGE] Oficial: <dono>" com o trailer "Agente: <dono>".
No corpo do PR, liste cada achado → o que mudou (arquivo:linha).
```

## Sessões
1. **designer-ux:**
   - RD-0250: escolher **um nome por indicador**. Hoje aparecem "Vendas", "Venda" e "Faturamento", e "Cobertura" e "Cobertura de rota". Publique a tabela em `docs/design/` e mande ao modulo-core.
   - MC-0007: pranchas do BKO da T-0168.
   - MC-0013: prancha do Início da T-0170.
   - RD-0235: sobras do kit, `leituraDoSalvar` e a prop `erro`. Coordene com o vendedor.
2. **modulo-core:** RD-0250. Exportar o **mapa único de rótulos dos indicadores** (contrato ou `app`) com os nomes do designer-ux, e usar esse mapa no Início e na Performance.
3. **engenheiro-apps:** RD-0250. O shell (Início, sino e abas) importa o mapa do core e não tem rótulo próprio. Esta sessão começa **depois do PR do core**.
4. **modulo-catalogo:** RD-0242. O `comum.tsx` ainda desenha a inicial; trocar pelo ícone neutro.
5. **modulo-vendedor:** RD-0235, a parte dele: trocar `leituraDoSalvar` e a prop `erro` pelo padrão do kit. Coordene com o designer-ux.
6. **testes:** RD-0236 (comentário) e o roteiro do aparelho do Oficial em `docs/testes/oficial-roteiro.md`, com a T-0165 até a T-0173.

**Ficam para o dono do produto, ao acordar:** MC-0004 (neutros) e MC-0014 (séries), que dependem da proposta da marca.

## Pronto quando
Os PRs mesclados até as 7h.
