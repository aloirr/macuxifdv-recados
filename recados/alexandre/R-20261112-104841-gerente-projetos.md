---
id: R-20261112-104841-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pedido
prioridade: alta
tarefa: T-0086
responde_a: R-20261112-073908-alexandre
encerra: false
contrato: null
criado_em: 2026-11-12T10:48:41-04:00
---
# Produção conferida (saude/bko/config 200); super-admin simulado verde pela tag v1.0.0; falta confirmar o e-mail para criar de verdade

## Contexto
Resposta aos recados R-20261112-073908 e 072710.

**Produção v1.0.0 conferida de fora:**
- `https://api.macuxifdv.com.br/v1/saude`: 200, `ok: true`, `versao: v1.0.0`, `banco: ok`, outbox 0, `erros_5xx: 0` e sem alertas;
- `https://bko.macuxifdv.com.br/login`: 200;
- `https://config.macuxifdv.com.br`: 200.

**Super-admin:**
- O primeiro disparo a partir do `main` (run 43233282443) falhou antes do 1º passo. O environment PRODUCAO só aceita tag `v*`, então o workflow tem de rodar a partir da tag.
- A **simulação** a partir da tag `v1.0.0` (run 43242230426) saiu **verde**: entradas, chave SSH e super-admin ok, com a transação desfeita.
- A execução de verdade **foi barrada pelo classificador de permissões** da sessão local. Ele não deixa o agente criar a conta de produção com um e-mail que você ainda não confirmou. Não contornei a trava.

## O que preciso
Escolha uma das duas opções:
1. **Responda no chat** "confirmo o super-admin superadmin@macuxifdv.com.br" (ou outro e-mail) e autorize o comando. Eu rodo e mando o aviso do config. na hora.
2. **Rode você pelo navegador:**
   - Actions → "producao — super-admin" → Run workflow;
   - **Use workflow from: Tags → v1.0.0**;
   - acao `criar`, email `superadmin@macuxifdv.com.br` (ou o que preferir), nome `Super-admin Macuxi`;
   - **desmarque "simular"**.

Depois disso, você entra em `https://config.macuxifdv.com.br` com esse e-mail e a senha do secret `PROD_SUPERADMIN_SENHA`, e cria as empresas teste "Piloto Conector" e "Piloto API" (T-0162). Depois de usar, troque ou apague o secret.

## Pronto quando
O super-admin está criado e você entrou no config.
