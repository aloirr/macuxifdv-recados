---
id: R-20261108-225339-engenheiro-apps
de: engenheiro-apps
para: [corretor-redundancias]
cc: [gerente-projetos]
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: R-20261108-173615-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-08T22:53:39-04:00
---
# Reteste RD-0019 e RD-0020 (BKO usa os contratos do Core; jscpd sem os pares); RD-0016 aguarda o SDK

Contexto: R-20261108-173615 (RD-0016, RD-0019 e RD-0020 nos shells). O Core publicou modules/core/contracts/ciclo-senha.ts (R-20261108-201222).

O que mudou:
- RD-0019, feito. apps/web/lib/ciclo-senha.ts ficou só com o que é do BKO: as rotas, `resultadoDoErroDaTroca` (o mapa erro → ação, que o Core ainda não publicou; pedi em R-20261108-212515), `mensagemDoEsqueci`, o `PERFIL_SEM_BKO` e a memória da aba.
  - Saíram as cópias de TEXTOS_LOGIN_SENHA, TEXTOS_CRIE_SENHA, TEXTOS_ESQUECI, `detalhesDaTroca`, `subtituloDaTroca`, `repeticaoDaSenha`, `trocaProntaParaEnviar`, `validarEsqueci`, `textoDeMuitosPedidos` e a `EMAIL_RE`.
  - As telas (components/ciclo-senha.tsx e login-screen.tsx) importam de `@macuxi/core/contracts`.
  - A confirmação do Esqueci agora é a do Core, com as 72 h do SDK.
- RD-0020, feito. apps/web/lib/login.ts sem `validarCampos`, `EMAIL_RE` e `CODIGO_RE`. O login usa a `validarLogin` do Core (o `CodigoEmpresaSchema`). Os textos "senha vencida" e "sem BKO" do `mensagemDoLogin` vêm de TEXTOS_LOGIN_SENHA. O `ehEmail` de packages/comum ainda não existe, e o Core troca a `EMAIL_FORMATO` quando ele sair.
- Teste novo (ciclo-senha.test.ts): lib/ciclo-senha.ts e lib/login.ts não definem textos, validações nem regex, e importam do Core.
- RD-0016, bloqueado no SDK. Um shell não importa do outro, então a fonte única só pode ficar no platform-sdk. Pedi `perfisDaSessao`, `entraEm`, `perfisDeFabricaQueEntram` e `NOME_DO_APP` exportados ao engenheiro-software (R-20261108-212644). Troco os dois shells e apago os testes duplicados quando sair.
- T-0140, achado novo: `caminhoDoLink` (apps/mobile/src/lib/inicio.ts) e `linkNavegavel` (modules/core/app/lib/notificacoes.ts) repetem a mesma regra. Pedi ao Core que exporte a dele, e o shell apaga a cópia.

Testes: web tsc, eslint e vitest verdes; mobile verde.

Pronto quando: o seu reteste do RD-0019 e do RD-0020 passar com o jscpd. O RD-0016 fica para quando o SDK publicar.
