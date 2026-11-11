---
id: R-20261111-171350-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T17:13:50-04:00
---
# Recado diário 11/11 (18h): v1.0.3 entregue; v1.0.4 a 95% (BUILD ~19h); riscos para sexta e sábado

## Contexto
Recado diário das 18h (cronograma do doc 05, R-20261109-125750). Quarta, 11/11/2026.

## O dia
- **v1.0.3 entregue** às ~06h25 de Manaus, com o Campo e a Gestão:
  - PDF da proposta 2;
  - filial de ponta a ponta;
  - fotos do PDV;
  - diagnóstico com chave remota;
  - correção da queda na 1ª abertura.
- **v1.0.4: falta só o push e a EAS.**
  - Pronto e liberado pelo corretor e pelo designer:
    - PDF horizontal v3, com coluna Item, observações e sem Alertas em nenhum PDF;
    - recusa da reserva por filial na API, com a regra única dos depósitos;
    - RD-0124, com a tabela única de motivos do Android e os seus rótulos;
    - textos do diagnóstico;
    - T-0118, com o pool da API devolvendo 503 em 10 s em vez de travar;
    - T-0119, a busca com 20 mil produtos sem travar a API. No ensaio final, o p95 ficou **abaixo de 300 ms**.
  - Faltam 3 ajustes de teste de ~15 min, depois o ensaio e o push.
  - **BUILD PRONTO previsto para ~19h de Manaus.**
- **Governança no main:**
  - token com 3 tentativas;
  - novas tentativas no 403 do GHCR;
  - `conector-publicar`;
  - remetente `diagnostico`.
- **Regra nova registrada:** nenhum ensaio sem lint e typecheck limpos no PC.

## Percentual
| Frente | % |
|---|---|
| v1.0.3 | 100% |
| v1.0.4 (código, teste e corretor) | 95% (falta o push e a EAS) |
| Robustez de quarta (T-0078, T-0107, T-0119, T-0118, T-0095) | 60%. T-0118 e T-0119 feitas. T-0095 tem a migração 0062 pronta, mas os consumidores ainda não usam: vai para a v1.0.5. T-0107 (carga e onboarding) e T-0078 (segurança e LGPD) estão sem avanço hoje. |
| T-0160 (Actions) | Pronta na branch e aprovada por você. Aplico depois do BUILD PRONTO. |

## Riscos para sexta e sábado
1. **Recursos da produção:** o prazo era hoje às 18h (VM e banco na Magalu, Brevo, DNS e secrets). Sem eles, o ensaio da produção de quinta não acontece, e a sexta fica em risco. **Preciso da sua confirmação.**
2. **CNPJ e endereço reais das filiais de produção:** ainda faltam. Sem eles, a filial não é cadastrada (RN-CORE-39).
3. **APK com nome legível (bucket):** ainda depende da sua escolha (R-20261111-090016). O BUILD PRONTO da v1.0.4 sai de novo só com o expo.dev.
4. **Ritmo:** a v1.0.4 levou 6 ensaios. Com a regra nova (typecheck no PC) e o retrato com a governança do main, a quinta deve ser mais rápida.
5. **PR #115 (manuais e roteiro de sábado):** está verde, mas o merge foi bloqueado 4 vezes pelo guardião porque o GitHub demorou a responder. Tento de novo esta noite.

## Amanhã (quinta, congelamento)
- só correção;
- seu reteste da v1.0.4;
- ensaio da produção, se os recursos estiverem prontos;
- T-0160 no main;
- T-0095 com os consumidores;
- ajuste dos 4 🟡 do PDF que o designer deixou para a v1.0.5.

## Pronto quando
Informativo. Preciso das suas respostas nos riscos 1 a 3.
