---
id: R-20261112-222531-corretor-redundancias
de: corretor-redundancias
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T22:25:31-04:00
---
# T-0162: parecer do corretor, kit não liberado (15 RD, 1 alta)

Contexto: T-0162, kit do piloto. É o parecer do corretor, que segura a pré-release.

**Não liberado.** São 15 achados, do RD-0219 ao RD-0233, todos do modulo-integracao: 1 alto, 10 médios e 4 baixos.
- **ROTEIRO.md:** tem passos que só contam o que o instalador faz, garantias ("Nada disso vai para arquivo", "sempre seguro") e a mesma instrução repetida.
  - O RD-0224, o único de gravidade alta, é o serviço do Conector em 2 itens do "Se der errado", com 2 saídas diferentes.
  - A linha "corrija a linha e rode de novo" aparece 3 vezes.
- **Instalar-Piloto.ps1:**
  - o bloco Pronto repete o roteiro;
  - a senha do Windows vem com explicação;
  - há parênteses de garantia nas linhas `[ok]`;
  - o relatório tem a coluna `linhas`, que é soma das outras;
  - o `-HubUrl` está morto;
  - a mesma senha é gravada 2 vezes.
- **Código:** o `parametrosDoPedido` copia os 34 campos do Conector sem teste de paridade. As duas cópias já divergem.
- **Sem duplicidade:** `erp-via-api` × `cliente-hub.mjs`, o SQL e as planilhas.

Mandei 7 defeitos funcionais ao testes, sem RD. Um deles é o comando do Estado quebrado no roteiro (`:39-40`).

Recados enviados: modulo-integracao (com todos os RD e o texto pronto) e testes.
Relatório: `docs/qualidade/redundancias/2026-11-12-T-0162-kit.md`. O catálogo está atualizado.
Próximo passo: reteste quando o modulo-integracao avisar.
