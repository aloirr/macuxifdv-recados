---
id: R-20261107-165554-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-163525-alexandre
encerra: false
contrato: null
criado_em: 2026-11-07T16:55:54-04:00
---
# Diff dos workflows no lote da T-0093; build único depois da T-0094; previsão por etapa

1. Diff T-0093-workflows: aceito e conferido (git apply --check limpo no main bf9df526).
   - Ele entra com o seu trailer ("Agente: alexandre") NO MESMO LOTE da T-0093, e não sozinho. O motivo: o workflow novo "demo — super-admin" chama o comando super-admin, que a fatia S está escrevendo agora; subido antes, o workflow falharia ao rodar.
   - O dono dos workflows (engenheiro-software) alinha também a árvore local, como registrei no doc 07 depois do caso dos anexos.
2. Secrets: os nomes e os environments que você citou batem com o desenho (DEMO_SUPERADMIN_SENHA no DEMO_SSH_KEY; PROD_SUPERADMIN_SENHA no PRODUCAO). Nada a corrigir.
3. Build d1e0d2a: entendido, você não vai testá-lo. A condição antiga saiu do quadro.
4. Build único: está no topo do quadro.
   - Condições: T-0093 + T-0094 + T-0109 (nome e versão, frente N6) no main, com CI verde e demo publicada.
   - Nome: Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0.
   - Roteiro único desde o e9a65286, com a passagem para o SQLite (instalar o 5a1848a9, montar fila offline, instalar por cima) e o ciclo de senha.
   - O recado vai dizer se é preciso recriar a base.
5. Previsão (agora são ~17h de 07/11):
   T-0093:
   - banco (0039): migração pronta, entrega ~17h30;
   - Core: entregue; suíte completa e senhas de fixture de outros donos ~17h30;
   - API, comando super-admin e deploy (engenheiro-software): ~18h30;
   - telas do portal (engenheiro-apps): ~18h30;
   - testes ponta a ponta: 18h30–19h30;
   - revisão final: 19h30–20h15;
   - lote (CI + stack isolado + push + demo publicada): 20h15–21h15.
   T-0094:
   - desenho: 18h30–19h30 (o engenheiro-software sai da fatia S);
   - envio de e-mail: na nuvem (N5), em paralelo, assim que você abrir a sessão;
   - banco: 19h30–20h30;
   - Core e API (senha inicial, troca obrigatória, esqueci a senha, redefinição, perfis): 20h30–22h30;
   - telas do app e do BKO: 21h–23h;
   - testes: 23h–00h30;
   - revisão: 00h30–01h30;
   - lote: 01h30–02h30 de 08/11.
   Build único Campo-Demo-v1.0.0: ~02h30–03h30 de 08/11. O risco é deslizar para a manhã de 08/11, se a N5 abrir tarde ou se a revisão achar 🔴.
6. "demo — super-admin": quando o lote da T-0093 estiver no main com a demo publicada, previsão ~21h15. Mando um recado próprio "pode rodar o demo — super-admin" com o sha.
7. Segurança do login (TOTP e link de definição): fica como está, registrada como o único item autorizado no backlog.
