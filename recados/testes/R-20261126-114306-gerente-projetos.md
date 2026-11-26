---
id: R-20261126-114306-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [banco-dados, engenheiro-software, modulo-core, modulo-pesquisa, modulo-promotor, modulo-catalogo, modulo-vendedor, corretor-redundancias, testes]
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-26T11:43:06-04:00
---
# Retomada (26/11): ensaio 0105–0108 não rodou (disparo do senhor), v1.0.37 com 5 PRs vermelhos por agente ambíguo, T-0197 e T-0198 abertas

## Contexto
A sessão do Cline retomou como gerente-projetos em 26/11, às 11h, pela ordem "leia os recados pendentes e retome o trabalho". Li todos os recados até o R-20261125-215618. O estado é este:

- **No ar: v1.0.36** (tag a10141421, publicada em 25/11, APKs às 15h20). A fração abre sozinha 24 h depois dos dois APKs (ADR 0076).
- **Ensaio das migrações 0105 a 0108 em produção** (R-20261125-124720 e -124914, previsto para as 21h30 de 25/11): **não rodou**. O workflow "producao — ensaio das migrações" não tem nenhum disparo.
- **v1.0.37 (perfis com o motor desligado):** são 9 PRs.
  - **Verdes e prontos:**
    - #771 (0105 a 0107);
    - #801 (0108);
    - #782 (catálogo v2);
    - #805 (fim das listas).
  - **Vermelhos:** #802, #803, #804, #807 e #808. O motivo é o mesmo nos cinco: "agente ambíguo" no "verificar donos do PR". Os branches foram montados em cima dos branches de outros donos, e o PR leva commits de 2 ou 3 agentes.
- **Defeitos do Campo 1.0.36 (25/11, 21h55):** abri a T-0197 (catálogo vazio dentro do pedido) e a T-0198 (Salvar sem itens). Cada uma tem a causa provável lida no código e os critérios de aceite.

Tudo isso está registrado no PR #823: quadro, T-0197, T-0198 e diário.

## O que preciso
1. **Ensaio 0105 a 0108:** o meu token não tem permissão de Actions (403), então o disparo é do senhor. Os passos:
   - Actions → "producao — ensaio das migrações (termina em ROLLBACK)" → Run workflow;
   - Branch: **main**;
   - SHA: **4c35d7bac367b43feefd9780a628297099d176ac**. É o head do #801, que traz as quatro migrações (0105 a 0108);
   - aprovar o environment PRODUCAO.
   
   O ensaio não grava nada: termina em ROLLBACK e tem teto de 10 minutos.
2. **Ordem de merge da v1.0.37 que vou seguir** (merge squash com as condições do doc 07: CI do PR verde, main verde e corretor no SHA):
   1. #771 sozinho (migração);
   2. #801 sozinho (migração);
   3. #782;
   4. #805, #802, #803 e #804 juntos, porque um sem o outro quebra o teste de igualdade;
   5. E4 (#807);
   6. E4b (#808).
   
   Os 5 vermelhos são **refeitos em branches novos a partir do main**, só com os commits do próprio dono, à medida que as bases entrarem. Não uso force push. O PR antigo fecha apontando para o novo.
3. **Frase de merge:** pela regra do R-20261123-212947, quem faz o merge em seu nome é o Agente PO. Nesta sessão do Cline, para fazer o merge eu sigo pedindo a frase literal, por PR e por SHA, como na v1.0.14. A primeira é: **"autorizo o merge do PR #771 no commit c254328274f278ab4254b02a8db6427b3e9b42af"**. Antes do merge, confiro se o #771 tem os pareceres no SHA.
4. **Ordem do trabalho:** primeiro a v1.0.37, depois a T-0197 e a T-0198. Os defeitos do Campo só chegam aos aparelhos no próximo APK.

## Pronto quando
O ensaio rodou verde, o #771 tem a frase, e a fila da v1.0.37 começa.
