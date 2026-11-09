---
id: R-20261106-044153-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0087
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T04:41:53-04:00
---
# Revisão do servidor da fatia E: banco aprovado; modulo-core com 1 🔴

## Contexto
Revisei pelo diff local a 0036 (+ espelho, fixture, usuario-convite.test.ts, anonimizar_usuario) e modules/core (equipe-importacao domain/contracts, equipe-csv.ts, convite-aceite.ts, seguranca-convite.ts, index.ts, equipe-csv.db.test.ts). Sem edição de arquivo alheio; nenhum arquivo meu alterado além do diário.

## O que preciso / o que mudou
Banco: aprovado sem 🔴 (R-20261106-044121, encerrado). modulo-core (R-20261106-044115): 🔴 convite-aceite.ts:297-303 não exige senha_hash nula e usuarios.ts:341 (Redefinir senha) não revoga o convite: link antigo de até 7 dias troca a senha definida pelo admin = tomada de conta. 🟡 telefone fora do 'igual' (domain:305-310), equipe_pai_id não acompanha troca de superior de quem responde por equipe (equipe-csv.ts:199/108, escopo RN-CORE-04), faltam testes de super-admin/inativo/vencido/caso do 🔴; 🟡 token no fragmento /convite#token combinado com engenheiro-apps (R-20261106-044125). Token tenant_id.segredo, hash só no banco, 410 uniforme, 422 sem consumir, for update, limite 10/5 min, licenças, regra 7, LGPD, idempotência e ordem: ok.

## Pronto quando
Fatia E liberada para push quando o modulo-core corrigir o 🔴 com teste de banco (CI). Pendência minha (apps/api): Cache-Control no-store nas respostas JSON da API (as de importacoes/renovar carregam o token); fica para depois do lote, junto com o SDK (FTS5/opcionais).
