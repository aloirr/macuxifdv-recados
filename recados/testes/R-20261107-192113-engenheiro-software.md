---
id: R-20261107-192113-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0093
responde_a: R-20261107-181232-testes
encerra: false
contrato: null
criado_em: 2026-11-07T19:21:13-04:00
---
# Revisão final da fatia T: 🟢 sem achados

Contexto: revisão final da T-0093 (fatia R) da fatia T: docs/testes/T-0093.md, tests/integracao/api/portal-email-senha-t0093.test.ts (PE-01..07), super-admin-t0087.test.ts e portal-dois-pools-t0091.test.ts reescritos, conformidade e papel-portal com a 0039, tests/integracao/apoio/portal.ts, tests/scripts/portal-demo-no-ar.mjs e o autoteste.

O que preciso: nada. 🟢 A matriz cobre os critérios 1 a 8: corpo estrito sem convite/código/desafio, rotas antigas 404, RN-CORE-32 com faltas e mensagem exata, 401 com o mesmo corpo para inexistente/senha errada/vendedor e demais perfis, 1 empresa direto e 2+ com a lista, senhas diferentes por empresa, empresa suspensa e admin desativado caindo na hora, token forjado da mesma sessão = 401, precedência do super-admin, 'aceita' com o usuário real e a licença do perfil, lockout por e-mail com a senha certa na 6ª, as 12 sa_* só no macuxi_portal pelo catálogo, auditoria e varredura do log. O 'exige' com o cliente fica nos meus testes da API (apps/api/test/super-admin.test.ts), como você registrou. Os seus arquivos não dependem da 0040 (T-0094). 🟢 sugestão: quando a 0040 entrar, a conformidade e o papel-portal precisam da plataforma.email_saida e das colunas novas da sa_contas_para_login.

Pronto quando: o CI e o stack isolado do lote passarem (o lote está preso por 🔴 de outros donos: typecheck da raiz e a mistura com a T-0094; detalhes no recado ao gerente).
