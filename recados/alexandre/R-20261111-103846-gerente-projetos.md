---
id: R-20261111-103846-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0159
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:38:46-04:00
---
# 12h AMEAÇADO: PDF v3 ainda com 3 🔴 do designer; padrão = build com v3 completo ~13h15 de Manaus (responda até 10h50 PC se preferir 12h sem o v3)

## Contexto
Você pediu aviso na hora se algo ameaçasse o horário (R-20261111-091014). **As 12h de Manaus estão ameaçadas pelo PDF v3.** As horas abaixo são do relógio do PC, que está ~41 min atrás de Manaus.

## Onde estamos (~10h35 do PC)
- **PDF v3:** a spec e as 4 imagens do designer estão na v3. O código ainda não bate: o parecer do designer, R-20261111-102702, aponta 3 🔴:
  1. falta a coluna Item e a ordem pelo código;
  2. a ficha do escritório sai em 3 linhas;
  3. o rótulo da observação fica na mesma linha do texto.

  O corretor também segura o RD-0119 e o RD-0131 (alertas ainda passados ao PDF). O Vendedor está corrigindo.
- **Fechado e liberado pelo corretor:**
  - RD-0124 (motivos do Android, com os seus rótulos);
  - textos do diagnóstico;
  - `catalogo.estoque_filial@1` e a recusa da reserva por filial na API, com a regra única (RD-0126 a 0128);
  - D-T0159-4.
- **T-0118, pool da API:** feita. O corretor segura por 2 achados baixos (RD-0129, RD-0130).
- **T-0160:** pronta na branch `agente/t0160-actions`, sem merge. A estimativa é de −40% no ritmo de hoje e −56% com 1 ensaio por lote. Espera o seu "aprovo".
- **Fora da v1.0.4:** T-0119 (busca de 20 mil), T-0095 (ordem do ERP) e o campo Observação da entrega.

## A conta do horário
Depois do PDF verde ainda vêm o ensaio (~15 min), o push (~10 min) e a EAS dos dois apps em paralelo (~30 min). **Com o PDF v3 completo, o BUILD PRONTO fica por volta das 13h15 de Manaus.**

## Escolha uma
1. **Padrão, se você não responder até 10h50 do PC:** build com o PDF v3 completo, BUILD PRONTO por volta das **13h15 de Manaus**.
2. **12h de Manaus sem o PDF v3:** o PDF volta ao da v1.0.3, e o horizontal entra na v1.0.5. Não recomendo, porque você pediu o PDF como prioridade.

## Também pendente de você
- **APK com nome legível:** escolha 1, 2 ou 3 do R-20261111-090016.
- **PR #115 (manuais e roteiro de sábado):** está verde e pronto. Estou fazendo o merge pelo rito, mas o GitHub está lento e o guardião bloqueou por tempo; tento de novo.

## Pronto quando
Sua escolha. Sem resposta, sigo a opção 1.
