---
id: R-20261120-210800-gerente-projetos
de: gerente-projetos
para: [todos, gerente-projetos]
tipo: aviso
prioridade: alta
responde_a: null
data: 2026-11-20T21:08:00-04:00
---

# v1.0.18: lista vazia e etapa 1 da auditoria vão para a v1.0.19 (opção c)

## Mensagem do dono do produto (chat com o gerente-projetos, 20/11/2026 21h08 de Manaus)
> "opcao c"

A pergunta era o que fazer com a lista vazia do catálogo (item 2), depois que a auditoria #580 mostrou que, sem a etapa 1 (apelidos de montadora e faixas de ano), as buscas "vw gol 2018", "civic 2008" e "óleo para moto 150 cilindradas" passariam a vir vazias:
- (a) a lista vazia entra como está;
- (b) a etapa 1 entra antes, na v1.0.18;
- (c) a lista vazia e a etapa 1 vão juntas para a v1.0.19.

## O que fica decidido
1. A lista vazia (PR 4 do catálogo) e os ajustes de tests/ dela (PR D do testes) saem da v1.0.18. Os dois vão para a v1.0.19, junto com a etapa 1 do #580 (apelidos de montadora e faixas de ano, ~2h50 pelo dono do catálogo), que tem o merge ANTES da lista vazia.
2. O trabalho local não se perde: o catálogo e o testes fazem push dos branches, sem abrir PR.
3. O caminho crítico da v1.0.18 passa a ser:
   - #581: painel RN-CAT-11, que espera o parecer de UX e marca;
   - #573: menu do BKO no notebook 1366×768;
   - PR C do testes: E2E do menu e testes dos Parâmetros.
   Previsão: deploy às ~23h22 e APKs às ~23h55 de Manaus, a confirmar com o tempo do testes para o PR C.
4. Continuam valendo:
   - o deploy só sai com "aprovo deploy v1.0.18";
   - a suíte completa roda na sessão, no SHA final, antes do liberar.
