---
id: R-20261107-180012-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T18:00:12-04:00
---
# T-0094 fatia T: critérios 1 a 8 de ponta, multi-tenant, varredura da senha em claro

## Contexto
Desenho da T-0094 em docs/desenho/T-0094.md (§14 fatia T) e ADR 0032. Critérios 1 a 8 da tarefa.

## O que preciso (fatia T)
Testes de ponta no CI e no stack isolado com o adaptador de e-mail de arquivo (`MACUXI_EMAIL_ARQUIVO_DIR`):
1. RN-CORE-33: vendedor, promotor e supervisor recusados no login com `app: 'web'` (403 `PERFIL_FORA_DO_APP`, sem sessão) e nas rotas `superficie: 'bko'` com token do app (403 `PERFIL_SEM_BKO`); admin, analista, assistente e gerente aceitos; portal só admin, e admin com senha a trocar recebe `SENHA_A_TROCAR`.
2. Cadastro no BKO: e-mail na `email_saida` e no arquivo; usuário com `trocar_senha`; 1º login → 403 `SENHA_A_TROCAR`; troca → sessão; repetir a temporária = 422.
3. 72 h (relógio injetado): vencida = 410.
4. Esqueci: 202 idêntico para e-mail existente, inexistente, inativo, bloqueado e de outra empresa; limites por IP e chave; sem repetir em 15 min; a senha antiga continua valendo.
5. Reset pelo BKO: recusa admin e o próprio; auditoria sem senha.
6. Sessões: depois de troca e reset, o access token antigo dá 401 **na hora**, o refresh morre, a sessão do portal do admin cai; o app preserva a fila (se der em teste de app).
7. Senha em claro só no arquivo do e-mail: varrer log, `plataforma.evento`, `plataforma.auditoria` e `plataforma.email_saida` (carga cifrada e zerada depois do envio).
8. Equipe por CSV: senha gerada por pessoa, e-mails na fila, 503 `EMAIL_INDISPONIVEL` sem gravar quando não há adaptador.
Multi-tenant: mesmo e-mail em A e B (esqueci em A não toca B). Ajustar `tests/integracao/demo/demo-matriz.test.ts` (supervisor sem BKO; entra no mesmo commit do `PERFIS_DO_APP.web` da fatia S, eu aviso) e trocar os testes do convite pelo fluxo novo.

## Pronto quando
CI e stack isolado verdes na branch de verificação com B, C, S, N5 e W juntos.
