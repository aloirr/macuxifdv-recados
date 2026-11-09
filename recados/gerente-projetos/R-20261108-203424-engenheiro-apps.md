---
id: R-20261108-203424-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: entrega
prioridade: alta
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T20:34:24-04:00
---
# BUILD PRONTO Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0 (714d0d1b)

## Contexto
Build único pedido no R-20261107-163525 (item 4), com o nome do R-20261107-151653 e a hora do R-20261108-175721 (20h).
Commit **714d0d1b** do main (lote 01), com o CI e o stack isolado verdes segundo o gerente-projetos; a demo é publicada
sozinha pelo workflow "demo — publicar" depois do CI do main.
- Os APKs saíram de um checkout limpo do 714d0d1b (C:\macuxifdv-check, `pnpm install --frozen-lockfile` ok), não da
  árvore de trabalho local. A Expo registrou o commit 714d0d1b nos dois builds.
- Antes do envio, o bundle das variantes campo e gestao ficou verde (2126 módulos cada).
- Gerados com `node scripts/eas/build.mjs ambos demo` (perfis campo-preview e gestao-preview).
- Nativo: igual ao d1e0d2a (desde ele, só a versão lida de scripts/eas/versao.json no app.config.ts, o autoIncrement no
  base do eas.json e 2 scripts no package.json; nenhuma dependência nativa nova).
- version 1.0.0 e versionCode **2** nos dois (antes, 1 em todos os previews). **Instala por cima.**

## Links
- **Campo-Demo-v1.0.0** (campo-preview), FINISHED
  - APK: https://expo.dev/artifacts/eas/YMScgZYI3lHCA2TaKSlvJFZs5Yi5kPr9EugzAObJyq0.apk
  - Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/7ed90d09-edff-4207-9bbc-2c0176d60ea3
- **Gestao-Demo-v1.0.0** (gestao-preview), FINISHED
  - APK: https://expo.dev/artifacts/eas/ex7q1NlnKOzpybkfPmalM-0-fTqVnFyvVhRnxRWM6oM.apk
  - Página: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3ecb9d44-5d3e-441f-bcbc-343abc93e235

## O que preciso (roteiro resumido)
Roteiro completo: `apps/mobile/docs/roteiro-campo-demo-v1.0.0.md` (itens 0 e A a M).
0. **Recrie a base da demo antes de tudo:** GitHub → Actions → "demo — recriar base demo" (workflow
   `demo-recriar-base`) → Run workflow → `RECRIAR`. Entraram as migrações 0039 a 0049 e o seed novo. **A senha continua
   `demo-macuxi`.** Depois de recriar, avise o gerente: ele carrega as fotos de demonstração (item D.5). Sincronize o app
   antigo, confira a fila vazia e desinstale Campo e Gestão.
A. Passagem para o SQLite: APK do 5a1848a9, fila no modo avião, v1.0.0 por cima, Diagnóstico, cada item chega 1 vez.
B. Login e senha: usuário novo pelo BKO, "Crie sua senha" no 1º uso (ciclo de senha), **e-mail volta preenchido** no
   login, "Esqueci a senha", "Redefinir senha" pelo BKO; portal só com e-mail e senha, etiqueta **"Entra só pelo app"**.
C. Perfis: supervisor/vendedor/promotor recusados onde não entram, vendedor + promotor, e a página **Perfis de acesso**
   (Administração) com perfil novo, permissões, desativar e reativar.
D. Catálogo: "Ver por linha", lista por linha offline e **fotos de produto** (miniatura na lista e na busca).
E. Lista de Pedidos: busca com destaque, filtros, tag **"Salvo"**.
F. **Novo pedido v2:** 4 abas (Venda · Itens (n) · Entrega · Resumo); pendências só no Resumo ("Falta para salvar");
   Resumo com 4 botões (Salvar e enviar pedido, Apenas salvar, Salvar como orçamento, Cancelar); **"Sair do pedido?"**
   por todas as saídas (Cancelar, Voltar do Android, seta e barra de baixo); salvar pela fila com **"Pedido salvo ·
   enviando"**; forma de pagamento sem troca silenciosa para Pix / À vista (inadimplente com Boleto vai para aprovação);
   **preço congelado** ao editar orçamento e a **mesma validade** em toda a tela.
G. Gestão: pedido em nome do vendedor só com a carteira dele (RN-VEN-35).
H. Gestão: **aviso da etapa pendente** na ficha do cliente (agora montado acima das abas).
I. **Início sem redundâncias**: no domingo, "Sem rota hoje · não é dia útil" e o cartão **"Meta do mês"** com
   "Faltam … por dia útil"; em dia útil, "Meta de hoje R$ X". No Gestão, "Meta do mês da equipe".
J. **Marcas concorrentes** no BKO (Catálogo → Marcas concorrentes): cadastrar, editar, inativar, reativar; o Promotor
   aponta para essa lista.
K. **Cancelamento integrado devolvido ao ERP**: no BKO, conector com "aceita cancelamento" e o quadro de retorno com
   "Cancelamento recusado" (sem ERP de verdade na demo).
L. Versão no Perfil: Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0; Android mostra 1.0.0.
M. (opcional) Medição com 20 mil produtos no aparelho: p95 abaixo de 300 ms.

**Não entrou no v1.0.0 (vai para o v1.0.1):**
- Frente M do Novo pedido v2 (T-0138): detalhe do pedido com o histórico em tags, "Equivale a" no PDF e o botão de
  cancelar no app um pedido já integrado;
- p95 da busca da API com 20 mil produtos (T-0119);
- os 7 🟡 de calendário e corrida;
- RD-0014 a RD-0031 da auditoria de redundâncias do lote.

**Para o gerente-projetos (cópia):** a carga de fotos de demonstração não roda no `demo-recriar-base`. Depois que o
Alexandre recriar a base, alguém precisa rodar `modules/catalogo/api/demo/carregar-fotos.ts` contra a API da demo
(dono: modulo-catalogo), senão o item D.5 mostra só espaços vazios.

## Pronto quando
Você devolver cada item (ok, ou o passo que falhou, com o aparelho e o que apareceu), as linhas do Diagnóstico do item A
e, se rodar, o relatório do item M. Eu encaminho cada falha ao dono da tela.
