---
id: R-20261125-094951-gerente-projetos
de: gerente-projetos
para: [todos]
cc: []
tipo: aviso
prioridade: normal
tarefa: T-0196
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-25T09:49:51+00:00
---
# T-0196 — pausa: estado dos branches do fracionário (S12 arquivada)

Pausa por ordem do Alexandre (25/11, "Suba o 1.0.35 com apk e pause"). A sessão S12 foi arquivada às 05h54 (Manaus). Estado da T-0196 (quantidade fracionária, v1.0.36) para a retomada. Todos os branches estão SEGURADOS, sem PR; a migração da fração passa a ser a **0104** (0103 = senha do admin, v1.0.35; perfis 0105–0107 e catálogo v2 0108 na v1.0.37).

| Branch | SHA | Falta |
|---|---|---|
| nuvem/v1035-frac-engenheiro-software-2 | cfdb08ab3 | ADR D7 para 0104; reteste do corretor |
| nuvem/v1035-frac-engenheiro-software-3 | d39d72b9b | reteste do corretor; entra depois do -2 |
| nuvem/v1035-frac-banco-dados | f8235bb8e | renumerar 0107 → 0104 (pode haver commit posterior); reteste |
| nuvem/v1035-frac-modulo-integracao-2 | 5a44327f0 | testes de API/db na sessão; reteste |
| nuvem/v1035-frac-modulo-core | d7cf93559 | reteste |
| nuvem/v1035-frac-modulo-vendedor | cdddd8ce3 | 0104 nas referências; confirmar o 🔴 do mínimo do Passo; reteste; order-drawer do BKO com formatarQuantidade |
| nuvem/v1036-frac-designer-ux | 15dc75dcc | reteste |
| nuvem/v1036-frac-engenheiro-apps | 63caabdac | LIBERADO; a API sobe antes do APK |
| nuvem/v1036-frac-testes | cc5968b97 | 0104 no comentário; entra junto/depois do código |
| nuvem/v1036-frac-corretor-redundancias-2 | 71cf1e749 | reteste (pode haver commit posterior) |

Falta em toda a T-0196: a revisão final do engenheiro-software e os PRs.
Decisão do Alexandre (2 A): Qtd na tabela só o número ("1,250") com a sigla na coluna Emb.; "1,250 kg" só onde a unidade não aparece.
Sem versão decidida (retirada dos códigos de regra dos avisos, MA-26): nuvem/v1036-codigos-modulo-integracao ccb45d19b, -modulo-catalogo aa8f1c217, -modulo-core c7084561b; falta testes de API/db e corretor.
Branches para apagar (decisão do Alexandre na limpeza): nuvem/v1036-frac-engenheiro-software-adr, nuvem/v1036-frac-corretor-redundancias, nuvem/v1035-frac-engenheiro-software (já mesclados: #778, #779, #773) e nuvem/v1035-frac-modulo-integracao (lixo, commit misturado).
