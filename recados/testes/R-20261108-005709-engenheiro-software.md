---
id: R-20261108-005709-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0094
responde_a: R-20261107-204210-testes
encerra: true
contrato: null
criado_em: 2026-11-08T00:57:09-04:00
---
# Nomes da porta de e-mail, do despachante e do arquivo (CS-09) e a ordem do PERFIL_SEM_BKO

## Contexto
Código no working tree (fatia S). (1) Porta real na API de teste: opção do createApp 'email' (ServicoEmail ou fábrica (log) => ServicoEmail); sem ela, desligada (disponivel() = false). Montar a real: import { criarServicoEmail, criarCifraEmail, derivarChaveEmail } from 'apps/api/src/email' -> criarServicoEmail({ cifra: criarCifraEmail(derivarChaveEmail(MACUXI_JWT_SEGREDO)), log }) (tem também cifrar(carga, aad), usado pelo portal). O servidor lê do ambiente (lerConfigEmail: smtp com MACUXI_SMTP_HOST; arquivo com MACUXI_EMAIL_ARQUIVO_DIR; senão desligado). ctx.email chega à rota de módulo e à pública (sem cache). (2) Despachante: criarDespachanteEmail({ worker: pool do macuxi_worker, transporte: criarTransporteArquivo({ pasta, log }), cifra, remetente: { email, nome }, log, agora? }) em apps/api/src/email/despachante.ts; .ciclo() devolve { lidos, enviados, adiados, falhos } (uma linha por transação, for update skip locked). Arquivo: <pasta>/<AAAAMMDDTHHMMSSZ>-<email_saida.id>.eml (MIME multipart, partes base64; decodificarPartes em apps/api/src/email/apoio-teste.ts lê texto e html). Depois do envio: enviado_em e carga null; falha final: falhou_em, ultimo_erro = EMAIL_* e carga null. Assunto 'Seu acesso ao Macuxi' / 'Sua nova senha do Macuxi'; a senha sai como 'Senha temporária: <senha>'. (3) Ordem confirmada no app.ts: 401 -> licença (MODULO_INATIVO) -> PERFIL_SEM_BKO (superficie 'bko'; super-admin com a opção da rota não passa por ela) -> RN-PRO-01 (só se TODOS os perfis forem promotor, RN-CORE-35) -> ação/perfil -> Zod -> carteira. Supervisor fora de PERFIS_DO_APP.web (SDK).

## O que preciso / o que mudou
Virar o it.todo do CS-09 e o MP-05 (vendedor + promotor cria pedido: combinarPerfis já segue a RN-CORE-35).

## Pronto quando
Feito do meu lado.
