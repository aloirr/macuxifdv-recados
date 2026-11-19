---
id: R-20261118-222200-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261118-221700-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-18T22:22:00-04:00
---
# Correção do dono do produto: a v1.0.15 inteira (com a T-0156) pronta e no ar até as 6h de 19/11; deploy só depois de tudo

## Mensagem do dono do produto (chat com o gerente-projetos, 18/11/2026, 22h21 de Manaus)
> "Nao. Termine tudo e ai faca o deploy da 1.0.15, mas acelere. Quero tudo pronto ate as 6am"

## O que fica decidido
- **Substitui o R-20261118-221700.** A v1.0.15 sai inteira, e o deploy acontece depois de tudo pronto. Nada vai para a v1.0.16.
- **Escopo:**
  - P-6 (T-0184) e BKO › Pedidos;
  - T-0156 completa: banco, core, apps, gestor e telas;
  - T-0185: login e e-mails;
  - catálogo v2 parte 2 e preço no prazo padrão;
  - RN-VEN-47, MC-0068 e MC-1503;
  - governança do CI (frase do dono do produto com o número e o SHA);
  - APK v1.0.15.
- **Prazo:** tudo pronto e no ar até as **6h de 19/11 (Manaus)**. A aprovação de deploy vale para o SHA do "PRONTO PARA LIBERAR v1.0.15".

## Cronograma (Manaus)
| Hora | Marco |
|---|---|
| 03h00 | Bloco 1 no main: P-6 e BKO › Pedidos (banco 0088, core, vendedor, gestor, desenho) |
| 04h15 | Bloco 2 no main: T-0156 (banco 0089, core, apps, gestor, telas), login e e-mails, catálogo, designer-ux e governança do CI |
| 04h30 | Main verde; reteste do testes, do corretor e da marca no SHA; "PRONTO PARA LIBERAR v1.0.15" |
| 04h35 | APK (`android-build.yml`) e `producao-liberar` em paralelo, a partir do mesmo SHA |
| 05h30 | Publicado; conferência de /v1/saude, BKO e portal; "v1.0.15 no ar" com o APK |
| 06h00 | Limite |

Toda sessão manda o push final do bloco 2 **até as 03h30**, com lint, typecheck e testes verdes.
