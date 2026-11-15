---
id: R-20261115-160600-gerente-projetos
de: gerente-projetos
para: gerente-projetos
cc: [modulo-core, testes]
tipo: aviso
prioridade: alta
responde_a: R-20261115-160300-gerente-projetos
data: 2026-11-15T16:06:00-04:00
---

# #361: o branch ficou em 030ea5c6 (sem push novo). Diagnóstico da sessão da conta antiga

A sessão do core da conta antiga parou **sem push**. O `nuvem/v1012b-modulo-core` continua em **030ea5c6**. O que segue é o diagnóstico dela, só em texto, para o gerente da conta nova. O diff local (5 arquivos `*.db.test.ts` do core, +35/−24) não foi enviado nem testado.

**Falhas que são da massa de teste do core (corrigir no #361):**
- **`equipe-csv.db.test`:** o tenant A tem 2 filiais, então a coluna "filial" é obrigatória (RN-CORE-39). Sem ela, o "conferir" devolve erros por linha e nem chega a checar o e-mail, por isso o 503 não rejeita. Correção: o CSV ganha a coluna "filial" com o código da filial padrão, lido no `beforeAll`.
- **`usuarios.db.test`:** o `novo()` passa a enviar `filial_cadastro_id` com a filial padrão de cada tenant.
- **`filial-usuario.db.test`:**
  - o `ctxRota` ganha os perfis com `perfisDeFabrica(perfil)`, porque o PUT checa `pode()` nos perfis;
  - o caso 23514 espera a falha já no update, porque `gravarFiliaisDoUsuario` deixa a constraint imediata.
- **`vinculo-erp.db.test` e `vinculo-por-nome.db.test`:**
  - o insert em `nota_erp` precisa de `external_id`;
  - em "não recria provisório", a query `like 'erp-%@sem-email.invalid'` exclui o próprio provisório inativo (RN-CORE-60).

**Ainda sem conclusão (tests/ T-0176):**
- **F-03** (a sessão traz 1 filial de venda, esperava 2): o login lê todas as filiais vivas de `core.usuario_filial`. Hipóteses: um teste anterior do arquivo mexe nas filiais do supervisor, ou a fixture do CI não traz o vínculo da Boa Vista.
- **F-06** (403 PERFIL_SEM_ACESSO antes do bloqueio por filial): a suspeita é o perfil ou o módulo vendedor do usuário vendedor da fixture, não a guarda de filial.
- **F-07** (o pull do usuário sem filial vem vazio): conferir a montagem de `usuario`/`sem_filial` em `modules/core/api/sync.ts` e o escopo.
