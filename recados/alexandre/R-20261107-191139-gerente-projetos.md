---
id: R-20261107-191139-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: null
responde_a: R-20261107-173950-alexandre
encerra: true
contrato: null
criado_em: 2026-11-07T19:11:39-04:00
---
# Decisões a–e aplicadas: RN-VEN-35 e RN-CORE-01 no doc 03, T-0112 a T-0116, Firebird/MySQL sob demanda, passo a passo da Brevo com os secrets

Tudo aplicado e na esteira.

DOC 03 ATUALIZADO
- RN-VEN-35: o seletor do pedido em nome mostra só a carteira do vendedor dono. Cliente de outra carteira não entra; o gestor transfere o cliente antes. A busca mostra "Cliente da carteira de <vendedor>".
- RN-CORE-01: a exceção só restringe, de forma definitiva. Quem acumula funções tem mais de um perfil. Módulos efetivos = licença ∩ (união dos perfis) − exceções. Nenhum usuário sem perfil.
- Também RF-CORE-02 e RF-CORE-03 no doc 02 (multiperfil e Perfis de acesso; ver a resposta ao R-20261107-185546).

TAREFAS (dono · ordem)
- T-0101 (já existia) ganhou o seletor da RN-VEN-35 · modulo-vendedor · 4ª depois do build.
- T-0112 Multiperfil · banco-dados, modulo-core, engenheiro-software · junto com a T-0111 e a T-0094, que usam o mesmo motor de permissões.
- T-0113 Cadastro de marcas no Catálogo, com a ADR que substitui a 0027 · engenheiro-software (ADR), banco-dados (migração de promotor.concorrente), modulo-catalogo, modulo-promotor (passa a consumir o contrato) · logo depois da T-0094, antes do 1º cliente real.
- T-0114 Cancelamento devolvido ao ERP (vendedor.pedido.cancelado@1 → Hub) · modulo-vendedor, modulo-integracao · depois da T-0113.
- T-0115 Campo "canal" no cliente (RN-PES-05) · banco, core, pesquisa, integração · junto com a T-0114 (local ou nuvem, o que vagar).
- T-0116 Conector v2 com atualização automática · modulo-integracao, engenheiro-software · logo depois da T-0098, mesma área.
- A ADR nova do cadastro de marcas é escrita pelo engenheiro-software na T-0113. Ela não sai antes porque o engenheiro está na revisão final da T-0093 e depois no motor da T-0094 (prioridades 1 e 2).

BACKLOG: só ficam fora da fila os adaptadores Firebird e MySQL, "sob demanda do 1º cliente que usar", com a sua autorização (docs/backlog.md, seção Regra).

E-MAIL DA PRODUÇÃO: BREVO, PASSO A PASSO
Ninguém além de você vê ou copia valores; os agentes só usam os nomes.
1. Crie a conta em brevo.com com o e-mail da empresa. O plano grátis manda 300 e-mails por dia e chega para começar.
2. Brevo → Senders, Domains & Dedicated IPs → Domains → Add a domain → macuxifdv.com.br. A Brevo mostra os registros de DNS: um TXT "brevo-code" de verificação e o DKIM (TXT ou CNAME, conforme ela indicar).
3. Cloudflare → macuxifdv.com.br → DNS → crie exatamente os registros que a Brevo mostrou, com o proxy DESLIGADO ("DNS only", nuvem cinza).
4. SPF: um TXT em macuxifdv.com.br com v=spf1 include:spf.brevo.com ~all. Se já existir um TXT começando com v=spf1, não crie outro: acrescente "include:spf.brevo.com" ao que existe (só pode haver um SPF).
5. DMARC: um TXT no nome _dmarc com v=DMARC1; p=none; rua=mailto:<seu e-mail>. Depois de uma semana sem problema, troque p=none por p=quarantine.
6. Volte à Brevo → Domains → Verify/Authenticate, até aparecer "Authenticated".
7. Brevo → Senders → Add a sender: nome "Macuxi FDV", e-mail nao-responda@macuxifdv.com.br.
8. Brevo → SMTP & API → aba SMTP → "Generate a new SMTP key" com o nome macuxi-producao. Anote o "Login" SMTP que a tela mostra e a key; a key só aparece uma vez.
9. GitHub → Settings → Environments → PRODUCAO → Add environment secret, com estes 5 nomes exatos:
   - PROD_SMTP_HOST = smtp-relay.brevo.com
   - PROD_SMTP_PORTA = 587
   - PROD_SMTP_USUARIO = o Login SMTP do passo 8
   - PROD_SMTP_SENHA = a SMTP key do passo 8
   - PROD_SMTP_REMETENTE = nao-responda@macuxifdv.com.br
10. Demo: segue no adaptador de arquivo, sem secret. Os e-mails ficam gravados na VM e eu mostro o conteúdo, com a senha mascarada, para você conferir. Se quiser e-mail de verdade na demo, gere uma segunda SMTP key (macuxi-demo) e crie os mesmos 5 nomes com o prefixo DEMO_SMTP_ no environment DEMO_SSH_KEY.
Observações:
- Os nomes PROD_SMTP_* são a proposta do gerente. As variáveis que a API lê (MACUXI_SMTP_*) vêm da N5. O workflow que passa uma coisa para a outra vem em diff de .github para o seu ok, junto com a T-0094.
- Se a N5 escolher outros nomes de variável, eu ajusto os secrets antes de você criar. Pode criar já: a correspondência fica no diff.
- Amazon SES (São Paulo) fica para quando o volume crescer: o adaptador é SMTP genérico, e a troca é só de secrets.
