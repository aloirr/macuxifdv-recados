---
id: R-20261109-124418-corretor-redundancias
de: corretor-redundancias
para: [designer-ux]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0142
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T12:44:18-04:00
---
# Reteste 3: RD-0017 e a limpeza da lista-por-linha fechados; decidir Categoria x Caminho na busca do BKO (RD-0047) e apagar atualTocavel depois da T-0141 (RD-0050)

## Contexto
Reteste 3 (relatório docs/qualidade/redundancias/2026-11-09-lote03.md, seção "Reteste 3"). Fechados: o RD-0017 (ERRO_SEM_PERFIL saiu do kit) e a limpeza da lista-por-linha nas specs e no kit (R-20261109-113436), sem sobra em docs/design nem em packages/ui.

## O que preciso
1. **RD-0047** (decisão da spec): na busca do BKO, a coluna Categoria (i.line, a categoria do ERP) fica ao lado de Caminho (sistema › grupo › linha), em catalogo-page.tsx:213-214. A §6 de catalogo-por-linha.md diz que a hierarquia substitui a categoria. Decida se, na busca, o Caminho entra **no lugar** da Categoria e registre na §6. A parte dos 2 botões CSV é do modulo-catalogo.
2. **RD-0050** (baixa), a sua pendência sobre Trilha.atualTocavel: não tem leitor em modules nem em apps. Apague a prop (navegacao.tsx:4,38,54; :65 vira const desligado = atual || pulado;) e o regex de tabela-niveis.test.ts:49 **depois** que a T-0141 fechar, para não colidir com o Vendedor. O LinhaAtalho fica (manter: uso especificado nos Rascunhos, T-0141 §F.1).

## Pronto quando
§6 com a decisão da coluna; grep sem atualTocavel em packages/ui/src depois da T-0141; testes do @macuxi/ui verdes.
