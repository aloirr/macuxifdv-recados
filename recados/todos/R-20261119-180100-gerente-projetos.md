---
id: R-20261119-180100-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261119-172300-gerente-projetos
encerra: false
contrato: null
criado_em: 2026-11-19T18:01:00-04:00
---
# v1.0.15 no ar (servidor + APK Campo e Gestão)

## Servidor
- **Publicado** às 17h37, pela run 44619525680 do `producao — publicar`, na tag v1.0.15 (53baf7c3fc854a4a1a00436c80fb585c48e55276). A aprovação está na issue #517.
- **Conferido às 17h43:**
  - `https://api.macuxifdv.com.br/v1/saude` responde `ok: true` na versão v1.0.15, com o banco ok e 0 erros 4xx e 5xx;
  - o BKO e o portal (`/login`) respondem 200.
- **Alerta OUTBOX_PARADA:** são os mesmos 36 eventos parados que vieram da v1.0.14. Não é regressão. A investigação continua com o engenheiro-software (v1.0.16).

## APK
- O `android build` (run 44618378737, no mesmo SHA) gerou os artefatos **Campo-Oficial-v1.0.15** e **Gestao-Oficial-v1.0.15**. Estão no GitHub Actions, para o dono do produto instalar e distribuir.

## Trava RN-VEN-45 (R-20261118-210200-alexandre)
**Continua.** Não publicar o Conector 1.5.0 e não preencher o "% Acres.Fin." até o dono do produto mandar um recado, depois de o APK v1.0.15 estar nos aparelhos.

## Minutos do Actions (R-20261118-213501)
| Ciclo | Minutos | Runs | Duração | Minutos por dia |
|---|---|---|---|---|
| v1.0.14 (16/11 → 18/11, 21h26) | 2.208 | 270 | 61,4 h | 863 |
| v1.0.15 (18/11, 21h26 → 19/11, 18h) | 967 | 280 | 20,6 h | 1.128 |

- **Total:** a v1.0.15 gastou 56% menos que a v1.0.14. O CI, depois da economia do #504, foram 880 min, e o build do APK, 71 min.
- **Por dia:** o gasto subiu, porque o ciclo concentrou em 20 horas 17 merges e 3 PRs de correção da reta final.

## Para a v1.0.16 (já registrado na T-0186 e na T-0187)
- **Cortes da v1.0.15:**
  - PDF na ficha: o visor abre só JPEG e PNG;
  - tabela Carteira do Gestão, com o contato por rota online.
- **[T-0187](https://github.com/aloirr/macuxifdv/blob/main/.coord/tarefas/T-0187.md):** supervisor em campo no Gestão, com a simulação aprovada.
- **Pendências que não seguraram a v1.0.15:**
  - MC-1803: o logo do e-mail sai em texto até os PNG serem publicados;
  - RD-2379 e o cabeçalho do teste do trajeto, ambos só comentário;
  - o 🟢 do "Enviando…" com milhares de pontos;
  - `SEM_RESULTADO` e `MODULO_INATIVO` no `CODIGOS_RETENTAVEIS` do SDK;
  - OUTBOX_PARADA.
- **Doc da v1.0.15:** o PR #490 (quadro, tarefas T-0184 a T-0187 e doc 03) entra depois do parecer do corretor.
