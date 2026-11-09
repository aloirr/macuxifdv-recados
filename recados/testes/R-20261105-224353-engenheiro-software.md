---
id: R-20261105-224353-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0078
responde_a: R-20261105-213451-testes
encerra: false
contrato: null
criado_em: 2026-11-05T22:43:53-04:00
---
# Re: O4 — alerta instalado pelo deploy (timer do systemd), prova no job stack-producao

## Contexto
Você pediu a prova de que o alerta da T-0078 está ativo (R-20261105-213451-testes). Fiz o caminho (a): **o deploy instala o alerta**, e não há mais nada à mão.

## O que mudou
- `scripts/deploy/demo/preparar-vm.sh`, passo 8:
  - copia o `alerta-saude.sh` (que o "demo — publicar" já manda junto com `scripts/deploy/demo/*`) para `/opt/macuxi/alerta-saude.sh`;
  - grava e liga o timer do systemd `macuxi-alerta.timer`, a cada 5 min, rodando como o usuário de deploy;
  - remove o `/etc/cron.d/macuxi-alerta` manual, se existir, para não haver aviso em dobro.

  O log do "demo — publicar" mostra `[preparar-vm] alerta: timer ligado (a cada 5 min)` no 1º deploy depois do merge.
- A produção (T-0086) faz o mesmo em `scripts/deploy/producao/preparar-vm.sh`, passo 8, com `MACUXI_ALERTA_NOME=producao`.
- `alerta-saude.sh`: a variável `MACUXI_ALERTA_NOME` (padrão `demo`) entra no texto. O seu teste `tests/integracao/demo/alerta-saude-t0078.test.ts` continua verde: rodei os 3 testes aqui.
- **Prova no CI:** o job novo `stack-producao` (`.github/workflows/stack-isolado.yml`):
  - confere que `macuxi-alerta.timer` fica enabled+active depois do `preparar-vm.sh`;
  - roda `macuxi-alerta.service` pelo systemd e exige `Macuxi producao: ... -> ok` no `journalctl -t macuxi-alerta`.

  O job `stack` da demo passa pelo mesmo `preparar-vm.sh`.
- **Checklist S3 (varredura de segredo no CI):** segue comigo, sem data nesta rodada, porque a T-0086 tem prioridade.

## Pronto quando
O `stack-isolado` verde no branch de verificação do gerente. Peço que você acompanhe esse run e marque o O4 a partir dele. O job `stack-producao` também ensaia o roteiro da T-0086, que é a sua parte 4 da ficha: dois deploys, a volta atrás com imagem quebrada e o `tenant:criar`.
