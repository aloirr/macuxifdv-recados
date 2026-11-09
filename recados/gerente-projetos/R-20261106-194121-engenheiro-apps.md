---
id: R-20261106-194121-engenheiro-apps
de: engenheiro-apps
para: [alexandre, gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0089
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T19:41:21-04:00
---
# APKs preview Campo e Gestão do 56b89a1 prontos (FINISHED): '+'/'−' do Novo pedido e Pedidos sem atraso; a folha Período e a aba Itens revisada ainda não

## Contexto
Builds de preview do Campo e do Gestão a partir do main 56b89a14d6d077e3761718b15f18cf4224e97e45 (T-0089 item 1 e T-0090), pedidos pelo gerente.
- CI do main nesse commit: os 8 jobs de verificação passaram (governança, lint e fronteiras, typecheck, testes dos pacotes, as 2 partes de tests/, testes do @macuxi/db sem superusuário, build do BKO e bundle do app). O agregador `ci-ok` ficou vermelho sem ter rodado, nas 2 tentativas, com o aviso do GitHub: "The job was not started because recent account payments have failed or your spending limit needs to be increased". **Alexandre: confira em Billing & plans do GitHub.** Enquanto isso não for resolvido, o próximo CI do main não fecha verde.
- O worktree limpo C:\macuxifdv-check foi para checkout destacado no 56b89a1, sem alteração local. `pnpm install --frozen-lockfile` passou lá, sem passo de resolução.
- Entre o 1ed7d51 (APK anterior) e o 56b89a1 não mudou nada em apps/mobile/package.json, app.config.ts, eas.json nem pnpm-lock.yaml. A parte nativa é a mesma; só o JS muda.
- O bundle Android das duas variantes passou antes do build (expo export com as variáveis do perfil preview e a API da demo): .hbc de 5,99 MB.
- A Expo registrou o gitCommitHash 56b89a1 nos dois builds.

## O que preciso / o que mudou
Os dois builds terminaram (FINISHED): Campo em 21 min, Gestão em 21 min.
- Campo (campo-preview, br.com.macuxi.campo): APK https://expo.dev/artifacts/eas/QCFijyvcLu6ZheQ_KDGKBDbqgiBXpKDtue0UNgAb4rs.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/c1d535e3-5578-49c9-b034-a4e847b0b734
- Gestão (gestao-preview, br.com.macuxi.gestao): APK https://expo.dev/artifacts/eas/5bnjRuF2UgLseVooYf_PQGhinyPXpzX5SFAfDTZxbuo.apk · página https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/4a73b229-ca90-4b94-a2ce-cf077a4fd56f

Roteiro só do que é NOVO em relação ao APK do 1ed7d51. É no Campo, com o vendedor. O roteiro A–E do 1ed7d51 continua valendo.

**A. "+" e "−" no Novo pedido (R-20261106-064754)**
1. Abra um Novo pedido de um cliente. Na aba Itens, busque "agua".
2. Toque em "+" 3 vezes, devagar e depois rápido, num produto. Esperado: quantidade 3, uma vez só no pedido, com o total certo.
3. Repita com o teclado aberto (o cursor ainda na busca ou na quantidade). Todo toque no "+" conta, já desde o 1º: depois de 3 toques, a quantidade é 3.
4. Toque em "−": a quantidade cai 1 a cada toque.
5. Troque a medida do item (unidade e caixa) e repita os toques: o "+" e o "−" continuam respondendo.

**B. Pedidos sem atraso (R-20261106-064752, só a parte da lentidão)**
1. Na aba Pedidos, troque Dia, Mês e Ano várias vezes e passe pelos ‹ ›. A lista tem que mudar na hora, sem travar.
2. Troque a situação (chips Todos, Na fila, etc.). A troca também tem que ser na hora.
3. Faça o mesmo no Gestão, com o supervisor e com o filtro de vendedor.

**O que este APK ainda NÃO traz (não precisa testar):**
- a tela nova de Pedidos com o botão de filtro e a folha "Período" (modelo A, T-0090). Ela está em revisão e vai num próximo APK; aqui o seletor Dia | Mês | Ano ainda é o antigo;
- a aba Itens revisada do Novo pedido (pagamento antes do prazo, frete em Detalhes, sem rodapé fixo, item compacto; R-20261106-064756);
- formas de pagamento com prazos e a tabela escalonada (T-0089, demais itens).

## Pronto quando
O Alexandre instalar os dois APKs (o JS mudou e vem no APK) e devolver os itens A e B. Se A falhar, o problema é do Vendedor (editor do pedido). Se B falhar, é do Vendedor (lista de Pedidos). Nada foi alterado no repositório, não houve commit e nenhum segredo foi para o log.
