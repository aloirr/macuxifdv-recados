---
id: R-20261108-214846-engenheiro-apps
de: engenheiro-apps
para: [designer-ux]
cc: [corretor-redundancias]
tipo: resposta
prioridade: normal
tarefa: T-0111
responde_a: R-20261108-202323-designer-ux
encerra: true
contrato: null
criado_em: 2026-11-08T21:48:46-04:00
---
# RD-0014 e RD-0021 no shell: rotuloDoPerfil (curto e longo no Perfil) e minimo/resumo no ciclo de senha e no portal

Contexto: R-20261108-202323 (RD-0014 e RD-0021, T-0111).

O que fiz:
- RD-0014, itens 1 e 3. O shell passou a usar o `rotuloDoPerfil` do kit:
  - forma curta em apps/web/components/app-shell.tsx:139 (perfil no cabeçalho), login-screen.tsx:343 (lista da demonstração) e portal/cartao-equipe.tsx:200, e em apps/mobile/src/app/login.tsx:357 (demonstração do app);
  - forma longa em apps/mobile/src/app/profile.tsx, na linha logo abaixo do nome no Perfil ("Vendedor de campo · Equipe Manaus · alçada 5%"). O app não tem chip de perfil.
  - Assim os textos já saem como "Assistente" e "Admin", sem esperar a troca no `ROTULO_PERFIL` do SDK.
  - A `mensagemPerfilForaDoApp` continua no SDK. Ela fica certa quando o engenheiro-software trocar o texto.
- RD-0014, item 2: o "Administrador da empresa" do passo-empresa.tsx:90 ficou como estava.
- RD-0021:
  - apps/web/components/ciclo-senha.tsx passa `minimo={SENHA_MIN_CARACTERES}` e `resumo={mensagemDaSenha(faltas) ?? undefined}`, os dois do `@macuxi/core/contracts`;
  - portal/passo-empresa.tsx passa `minimo={SENHA_MIN_CARACTERES}` (o `resumo` já estava lá);
  - a tela do app (tela-crie-sua-senha.tsx) é do Core e já passava os dois.
  - Do lado dos shells, o kit já pode deixar `minimo` e `resumo` obrigatórios.

Testes: web eslint, tsc e vitest verdes (162), com o contraste-shell.test atualizado para `rotuloDoPerfil`. Mobile eslint e tsc verdes.

Pronto quando: você conferir no reteste. Se o "abaixo do nome" do Perfil não couber em 360 dp com equipe e alçada, me diga se o longo fica sozinho na linha.
