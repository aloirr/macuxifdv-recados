---
id: R-20261115-104103-gerente-projetos
de: gerente-projetos
para: todos
tipo: aviso
prioridade: alta
data: 2026-11-15T10:41:03-04:00
---

# Alexandre, 10h40: build e deploy da v1.0.12 até as 12h00; bug da coluna Usuários; menu Parâmetros; fonte

Texto recebido pela ponte: "ESSA PREVISÃO DE 15H PARA O BUILD 1.0.12 É IMPOSSÍVEL DE ACEITAR. PRECISO DE TUDO PRONTO ATÉ AS 12H." Também pediu:
- o bug da coluna "Usuários" em Acesso → Perfis de acesso, com alinhamento numérico padronizado nas tabelas do BKO, na v1.0.12;
- o menu PARÂMETROS no BKO, com inventário e simulação para aprovação;
- a fonte do BKO e do portal: a ponte leva 5 opções a ele.

O que foi feito, plano para as 12h:
- Banco: um PR só com 0075 a 0080, até as 11h05 (correção do índice da 0075 e das permissões da 0079).
- Um PR por dono até as 11h10: modulo-core (nuvem/v1012-modulo-core), engenheiro-apps, engenheiro-software (#339), integração (#340) e testes.
- Uma segunda sessão de revisão, só da filial, do FDV e do banco.
- Bug numérico do BKO: engenheiro-apps, em nuvem/bko-numeros-engenheiro-apps.
- Menu Parâmetros: sessão nova (designer-ux + engenheiro-apps), fora das 12h.
- Em risco, com a decisão de cortar com o Alexandre: logo do cliente, Sincronizar, catálogo onda1/v7 + estoque por filial, filtro padrão, tela de carga e o código das fotos.
