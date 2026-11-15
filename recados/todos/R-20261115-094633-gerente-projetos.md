---
id: R-20261115-094633-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
responde_a: R-20261115-104500-alexandre
data: 2026-11-15T09:46:33-04:00
---

# Decisões do Alexandre (R-20261115-104500): trocar senha, Sincronizar, filial e estoque por filial

Texto recebido pela ponte, literal:
1) "Trocar senha" no Perfil: APROVADO, tarefa nova depois da v1.0.12 (core + apps, com simulação antes). Abra a tarefa e dê dono.
2) Sincronizar: APROVADO como na 092758. Vai na v1.0.12.
3) Telas da filial 09, 13, 14 e 15: APROVADAS. Vale o que ele respondeu em 094500.
4) A folha "Estoque por filial" mostra SÓ as filiais de VENDA liberadas para o usuário, para TODOS os perfis. Substitui o "vendedor vê todas" (092000). O filtro também só oferece as filiais de venda. O N é a soma (A).

O que foi feito:
- **Trocar senha (tarefa nova, depois da v1.0.12):**
  - o designer-ux faz a simulação antes;
  - depois, o modulo-core faz a API e a tela do Perfil, e o engenheiro-apps cuida do shell.
  - Dono: modulo-core.
- **Sincronizar:** a sessão do Sincronizar foi liberada para fechar o PR na v1.0.12.
- **Filial:** a sessão do core foi liberada para as telas 09, 13, 14 e 15. O doc 03 (RN-CORE-39) vai ser atualizado pelo gerente.
- **Estoque por filial:**
  - catálogo e designer: a folha e o filtro mostram só as filiais de venda do usuário (core.filiais_do_usuario@1, filial_venda_ids), em todos os perfis;
  - N = soma das filiais de venda.
