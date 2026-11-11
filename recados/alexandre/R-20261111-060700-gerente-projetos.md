---
id: R-20261111-060700-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261111-063228-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T06:07:00-04:00
---
# Plano da v1.0.4 (8 vagas rodando; BUILD PRONTO 18h Manaus) e cronograma até a v1.0.5; aprovações aplicadas no rito

## Contexto
Resposta ao R-20261111-063228 (começar a v1.0.4 com 8 vagas) e ao R-20261111-063227 (aprovações). Horas no relógio do PC, que está ~41 min atrás de Manaus.

## Aprovações aplicadas
- **conector-publicar.yml e patch do remetente `diagnostico`:**
  - um commit de governança com o seu trailer (`4d121d89`);
  - o patch entrou em 3 vias sobre o T-0143, sem conflito;
  - coord-recados deu 24/24, e o `verificar` e o trailer passaram sem violação;
  - ensaio no CI em `verificacao/gov-t0158-t0098`. Com verde, vai ao main e você recebe a confirmação.
- **Token `MACUXI_RECADOS_TOKEN_SERVIDOR`:** fica com você. Sem ele, só o alerta por recado fica desligado.

## Plano da v1.0.4: 8 vagas rodando desde ~06h05
| Vaga | Agente | O quê | Até (PC) |
|---|---|---|---|
| 1 | designer-ux | Textos do diagnóstico ("aguardando o servidor" e aviso da fila); formato do nome da filial no cabeçalho do PDF (D-T0159-5) | 10h00 |
| 2 | modulo-catalogo | `catalogo.estoque_filial@1`, o saldo da filial com fallback | 12h00 |
| 3 | modulo-vendedor | D-T0159-4 (vírgula), D-T0159-5 e a **recusa da reserva por filial ligada na API** | 15h30 |
| 4 | engenheiro-software | RD-0124 (tabela única dos motivos do Android no SDK); depois a **T-0160 numa branch própria**, sem merge, com a estimativa de minutos antes e depois, para o seu "aprovo" | 15h30 |
| 5 | engenheiro-software (2ª) | T-0118, robustez do doc 05: o pool da API trava com pushes de pedido simultâneos | 15h30 |
| 6 | engenheiro-apps | RD-0124 no app, os textos do diagnóstico e o link da **Gestao-Demo-v1.0.3** | 15h30 |
| 7 | testes | **Vaga de correção:** triagem dos seus achados da v1.0.3, que entram na frente. Também os testes dos critérios da v1.0.4 | 15h30 |
| 8 | corretor-redundancias | Revisão contínua e retestes; os seus achados de texto entram na frente | 16h00 |

## Hora do build da v1.0.4
- **15h30 do PC:** árvore pronta.
- **~15h45:** ensaio (no máximo 2).
- **~16h30:** lote e push.
- **~16h40:** demo, base e fotos.
- **BUILD PRONTO às 18h de Manaus**, junto com o recado diário das 18h.

Os achados do seu teste que chegarem até ~14h entram na v1.0.4. O que chegar depois vai para a v1.0.5.

## Cronograma até a v1.0.5 oficial
| Dia | O quê |
|---|---|
| **Qua 11/11** | v1.0.4 às 18h. **Seu prazo, hoje às 18h:** criar os recursos da produção para o ensaio de quinta (VM e banco na Magalu, Brevo, domínio/DNS e os secrets do ambiente de produção no GitHub), e mandar CNPJ e endereço reais das filiais de produção. |
| **Qui 12/11** | Congelamento, só correção. Ensaio da produção nos recursos criados: publicar com as novas tentativas no GHCR, criar o tenant, carga inicial e restauração do backup. Seu reteste da v1.0.4. Se você aprovar, a T-0160 entra no main. |
| **Sex 13/11** | **v1.0.5 oficial** (Campo-Oficial e Gestao-Oficial, perfil de produção) e início da migração. Na v1.0.5 entram o envio automático da queda e o recado automático do diagnóstico, se você ligar. |
| **Sáb 14/11** | Produção (roteiro `docs/producao/sabado.md`, da N21). |

## Riscos
- **O PC está lento** com muitos agentes: o typecheck da raiz levou 113 min de madrugada. Por isso a prova é o CI, não o PC.
- **Recursos da produção:** se não estiverem criados até hoje às 18h, o ensaio de quinta escorrega, e a sexta fica em risco.

## Pronto quando
Informativo. O recado diário sai às 18h, junto com o BUILD PRONTO da v1.0.4.
