---
id: R-20261127-235023-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: R-20261127-225437-alexandre
encerra: false
contrato: null
criado_em: 2026-11-27T23:50:23-04:00
---
# Retomada: previsão da v1.0.42 etapa por etapa; Actions com 403 trava o liberar (passo exato para o Alexandre) e suíte A ou B

## Contexto
Retomada pelo R-20261127-225437-alexandre ("Mande o recado para o projeto fdv retomar"), às 22h54. O gerente-projetos roda no VS Code do Alexandre (Cline). Conferido às 23h50 de Manaus:
- produção na v1.0.41;
- main em 1e4619ee, com CI 46083571211 verde;
- nenhum PR aberto (#792 e #820 fechados sem merge às 19h44);
- os dois branches parados da v1.0.43 estão íntegros, cada um com 1 commit à frente do main e de um dono só:
  - `nuvem/v1043-modulo-core-perfis` @ 12829713 (modulo-core, 12 arquivos);
  - `nuvem/v1043-modulo-catalogo-rn-cat-22` @ bde0d1dd (modulo-catalogo, só o `desempenho-veiculo.test.ts`).

## Bloqueio 1: Actions (só o Alexandre destrava)
O token do notebook continua com **403** no disparo de workflow. Conferi agora com um disparo vazio, sem efeito. Sem essa permissão, nem o gerente nem o PO disparam liberar, build do APK, ensaio ou rerun.

**Passo exato para o Alexandre (cerca de 1 min, sem colar o token em lugar nenhum):**
1. Abra github.com › foto › Settings › Developer settings › Personal access tokens › **Fine-grained tokens**.
2. Abra o token deste notebook. Ele vence em 17/12.
3. Em Repository permissions › **Actions**, escolha **Read and write**.
4. Clique em **Update**.

O valor do token não muda, e nada mais precisa ser feito no notebook.

**O que destrava:** o liberar da v1.0.42 e todo o resto da esteira.

## Decisão para o PO, em nome do Alexandre: suíte na sessão antes do liberar
A regra do R-20261120-130202 manda rodar a suíte completa numa sessão, no SHA, antes do disparo. Este notebook não tem Postgres, e o `db/scripts/pg-local.sh` é só para Linux. Por isso, os `*.db.test.ts` e o `tests/` com banco não rodam aqui hoje.

- **A (recomendada):** na v1.0.42, a suíte completa vale pelo job `suite` do próprio liberar. É o `ci.yml` inteiro, com Postgres, no 1e4619ee, e sem ela verde não sai imagem nem issue. O risco é baixo, porque são 30 arquivos desde a v1.0.41 e o CI do push está verde. Para a v1.0.43 em diante, eu baixo o PostgreSQL portátil (zip oficial, sem instalador e sem admin, ~300 MB, numa pasta do usuário) e passo a rodar a suíte aqui. São +40 min uma vez só.
- **B:** a v1.0.42 espera a suíte numa sessão da nuvem, que hoje só monitora. Isso custa uma sessão aberta pelo Alexandre e cerca de 60 min a mais.

## Previsão, etapa por etapa (tempo real das últimas 4 versões +15%, Manaus)
**T0** = hora em que o Alexandre libera a permissão de Actions. Exemplo com T0 = 00h00 de 28/11:

| Etapa | Tempo real | Com +15% | Hora no exemplo |
|---|---|---|---|
| liberar v1.0.42 no 1e4619ee (suíte, imagem, issue) | 8 a 10 min | T0 + 12 min | 00h12 |
| "aprovado v1.0.42" do PO na issue e aprovar | 1 min | +2 min | 00h14 |
| publicar | 2 a 6 min | +7 min | **no ar 00h21** |
| android build, Campo e Gestão 1.0.42 | 15 a 21 min | +24 min | 00h45 |
| apk-publicar | 1 min | +1 min | **APK 00h46** |

**v1.0.43:** começa logo depois da v1.0.42, uma frente por vez e com, no máximo, 3 papéis. Mando a previsão de cada etapa quando o PostgreSQL portátil estiver de pé. O primeiro item é o branch do core, com os pareceres do testes, do corretor, do engenheiro-software e do engenheiro-apps, seguido do PR.

## O que preciso do PO
1. Avisar o Alexandre do passo de Actions acima.
2. Escolher A ou B da suíte.
3. **Escopo da T-0203, da T-0204, da T-0205 e da T-0207.** Não há arquivo de tarefa nem recado com esses números; só o R-20261127-194649 cita a faixa "T-0200 a T-0207". Da T-0200, da T-0201, da T-0202 e da T-0206 eu tenho o assunto pelo prompt do Alexandre. Sem o escopo, elas entram no quadro como "escopo a confirmar pelo PO".

## Enquanto isso
Sigo no que não depende de Actions, no caminho do gerente: o quadro, da v1.0.40 à v1.0.42, a T-0193, a T-0195 e da T-0200 à T-0207. Ele vai num PR com um commit só, `Agente: gerente-projetos`.

## Pronto quando
O Alexandre liberar Actions e o PO responder a A ou B: aí eu disparo o liberar na hora.
