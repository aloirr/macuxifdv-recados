---
id: R-20261120-022300-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: T-0187
responde_a: R-20261120-014839-alexandre
encerra: false
contrato: null
criado_em: 2026-11-20T02:23:00-04:00
---
# v1.0.16 no ar (servidor + APK Campo e Gestão)

## Servidor
- **Publicado** à 1h57, pela run 44683861939 do `producao — publicar`, na tag v1.0.16 (85b9e9b47f5a8e08708d86367363a1c34b5ed44c).
- **Aprovação:** "Aprovo deploy 1.0.16" (R-20261120-014547-alexandre) e "Ja aprovo agora. Pode seguir" (R-20261120-014839-alexandre), registrada na issue #520.
- **Conferido às 1h58:**
  - `https://api.macuxifdv.com.br/v1/saude` responde `ok: true` na versão v1.0.16, com o banco ok e 0 erros 4xx e 5xx;
  - o BKO e o portal (`/login`) respondem 200.
- **Alerta OUTBOX_PARADA:** os 36 eventos parados vêm de antes da v1.0.16, e não é regressão.
  - O diagnóstico só leitura (#518) já está no main.
  - Ele roda quando o dono do produto fizer o §6 de `docs/desenho/outbox-parada-v1014.md` (LOGIN no papel `macuxi_leitura` e a mesma senha no secret `PROD_PG_LEITURA_SENHA`) e mandar os códigos das empresas.

## APK
- O `android build` (run 44684485331, na tag v1.0.16) gerou os artefatos **Campo-Oficial-v1.0.16** e **Gestao-Oficial-v1.0.16**. Estão no GitHub Actions, para o dono do produto instalar e distribuir.
- **Para o supervisor no Gestão:** depois do login, o app pede a permissão de localização, que liga o rastreamento interno (RN-CORE-13 e 37).

## O que entrou
- **T-0187:** o supervisor em campo no Gestão, com:
  - rota com check-in e checkout;
  - rastreamento interno, visível só ao gerente autorizado;
  - ficha com Check-in, Pesquisa e Novo pedido em nome do vendedor.
- **PDF na ficha:** NF e Documentação, sem guardar nada no aparelho.
- **Tabela Carteira do Gestão:** Ligar e WhatsApp.
- **Barra do Gestão:** 6 abas fixas, com o resto no menu do Perfil.

## Minutos do Actions (R-20261118-213501)
| Ciclo | Minutos | Runs | Duração | Minutos por dia |
|---|---|---|---|---|
| v1.0.15 (18/11, 21h26 → 19/11, 17h37) | 967 | 280 | 20,2 h | 1.150 |
| v1.0.16 (19/11, 17h37 → 20/11, 2h21) | 223 | 17 | 8,7 h | 613 |

- **Total:** a v1.0.16 gastou 77% menos que a v1.0.15 (CI 163 min e APK 46 min). Os ensaios do PR conjunto foram em branches sem PR, sem gastar Actions, e houve um PR só com um push só.

## Lote seguinte
- **Só em comentário:** RD-2379, RD-2413, RD-2448, RD-2450 e o comentário do teste do trajeto.
- **banco-dados:** `db/testes/empresa-acoes.db.test.ts:415` caiu uma vez por deadlock no Postgres local.
- **Também:**
  - SSH comum dos workflows;
  - o 🟢 do "Enviando…";
  - as RN-VEN-43 a 46 no doc 03;
  - a T-0187 como concluída no quadro.
- **Limite da conta:** está em aviso do limite de 7 dias. As próximas sessões abrem só com a carga certa.
