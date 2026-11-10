---
id: R-20261110-072149-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0154
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T07:21:49-04:00
---
# T-0154 novas tentativas no 403/429/5xx do GHCR (push, digest e pull na VM; demo e produção)

## O que fiz
- Causa em 09/11 (run 42707736877, job "imagens no GHCR"): `failed to push ghcr.io/aloirr/macuxi-api:main: unexpected status from HEAD request ... 403 Forbidden` no envio de uma camada; o build estava certo.
- Novo `scripts/deploy/demo/ghcr-tentar.sh`: roda o comando e repete **só** em erro passageiro do registro (403, 429, 5xx, timeout/conexão derrubada), **5 tentativas** com espera crescente 15/30/60/120 s (`GHCR_TENTATIVAS`, mínimo 4; `GHCR_ESPERA_S`). Erro que não é do GHCR (Dockerfile, imagem inexistente) sai na hora. Depois da última, `::error::` claro com o que fazer. Não ecoa o comando e não recebe token.
- `.github/workflows/demo-publicar.yml`: o build da API e do BKO passou a `load: true` (sem push) e o envio ao GHCR é um passo à parte com `ghcr-tentar.sh` (tags `<sha>` e `main`). Erro de build não repete.
- `.github/workflows/producao-publicar.yml`: o mesmo no BKO de produção (digest pego do `RepoDigests` depois do push, sem nova consulta); a consulta do digest da API no GHCR também repete; o `scp` leva o `ghcr-tentar.sh` para a VM.
- `scripts/deploy/{demo,producao}/implantar.sh`: o `pull` na VM repete pelo mesmo script (sem ele ao lado, uma tentativa só, como antes). `stack-isolado.yml` copia o script no teste da produção.
- Login no GHCR na VM: **sem mudança** (token por stdin, como antes). Workflows do Telegram: intocados.

## Testes
- Local (bash): 403 duas vezes e ok na 3ª (3 chamadas, rc 0); 503 sempre (5 chamadas, rc 1, erro claro); erro de build (1 chamada, rc do comando); função carregada com `set -euo pipefail` (ok na 3ª; erro não passageiro devolve o código e o `|| antes_do_up` funciona); `bash -n` nos dois `implantar.sh`; YAML dos 3 workflows lido sem erro.
- CI: o caminho real só roda no main (demo-publicar depois do CI verde) e no `stack-isolado.yml` (implantar.sh da demo e da produção com o script). Critério 2 fica com o push.

## Para você
- Doc 05: registrar o 403 do GHCR como **risco da produção de sábado**, mitigado pelas novas tentativas; se as 5 falharem, rodar o workflow de novo (nada muda na VM antes do pull: o `implantar.sh` da produção restaura os arquivos).
- Ensaio de quinta (testes): conferir no log do "demo — publicar"/"produção — publicar" os passos "envio ao GHCR, com novas tentativas" e, se houver, as anotações `::warning::` de nova tentativa.

## Arquivos
`scripts/deploy/demo/ghcr-tentar.sh` (novo), `scripts/deploy/demo/implantar.sh`, `scripts/deploy/producao/implantar.sh`, `.github/workflows/demo-publicar.yml`, `.github/workflows/producao-publicar.yml`, `.github/workflows/stack-isolado.yml`.
