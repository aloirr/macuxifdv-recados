---
id: R-20261108-095042-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T09:50:42-04:00
---
# Build único v1.0.0: roteiro único e rascunho do BUILD PRONTO prontos; conferência ok (versionCode 1 → 2); item H não montado

## Contexto
Preparação do build único Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0 (R-20261107-092152, R-20261107-151653, R-20261107-163525; doc 07 §5). Só documento e conferência. Não gerei build EAS e não mexi em código do app nem do web.

## O que fiz
1. Roteiro único desde o e9a65286: apps/mobile/docs/roteiro-campo-demo-v1.0.0.md. O docs/status/ é do gerente, por isso ficou no meu caminho; copie para docs/status/ se quiser.
   - 0: recriar a base (SIM: migrações 0039 a 0045 e seed novo; o publicar só migra, o seed só roda ao recriar; senha segue demo-macuxi) ANTES do item A; sincronizar e desinstalar o app atual, porque o e9a65286 e o d1e0d2a já são SQLite.
   - A: passagem para o SQLite (APK do 5a1848a9 com links, fila offline, v1.0.0 por cima, Diagnóstico, sem repetidos).
   - B: usuário novo pelo BKO (a demo não tem SMTP: o BKO mostra a senha com "Copiar senha"), Crie sua senha com os erros da spec, Esqueci a senha (resposta igual, senha atual continua valendo, 429), Redefinir senha.
   - C: supervisor/vendedor/promotor fora do BKO, supervisor no Campo, gerente no Gestão e no BKO, Joana com vendedor + promotor (união das abas, cria pedido pelo perfil de vendedor, BKO fechado; ADR 0033 §6).
   - D a J: Ver por linha e lista por linha, Mostrar mais, miniatura, Pedidos, Novo pedido, seletor RN-VEN-35, aviso da etapa pendente, versão no Perfil e medição com 20 mil (opcional).
2. Conferência do build (sem build):
   - node scripts/eas/build.mjs ambos demo --simular: eas build --platform android --profile campo-preview --message Campo-Demo-v1.0.0, e o mesmo com gestao-preview e Gestao-Demo-v1.0.0.
   - versao.json = 1.0.0. O expo config dá "Macuxi Campo 1.0.0 br.com.macuxi.campo" e "Macuxi Gestão 1.0.0 br.com.macuxi.gestao".
   - O Perfil (src/app/profile.tsx:65) mostra textoDaVersao(variante, perfil do build, versão) = Campo-Demo-v1.0.0 / Gestao-Demo-v1.0.0 no preview.
   - vitest de scripts/eas/eas.test.ts (17) e src/lib/nome-build.test.ts (10): 27 verdes.
   - versionCode (consultas só de leitura ao EAS): os previews do 5a1848a9, do e9a65286 e do d1e0d2a saíram TODOS com versionCode 1, porque o autoIncrement só valia na produção. O contador remoto está em 1 nos dois pacotes. Desde a T-0109 o autoIncrement está no base, então o próximo build sai com 2, maior que o do d1e0d2a. OK.
3. Rascunho do recado BUILD PRONTO, com links e sha em branco: apps/mobile/docs/build-pronto-v1.0.0-rascunho.md.

## Achados para o lote (não corrigi: não são meus ou o código está congelado)
- Item H: o aviso da etapa pendente (#106, modules/gestor/app/components/aviso-etapa-equipe.tsx) NÃO está montado em tela nenhuma. O próprio arquivo diz que falta o ponto de montagem na ficha do cliente do Core. Sem esse ponto (modulo-core) e o registro (modulo-gestor) no lote, o item não aparece no APK. Decida se entra ou se o item sai do recado.
- Item D: a demo não tem foto de produto, e o BKO não tem envio de foto. A miniatura só aparece como espaço vazio. Para ver uma foto, precisa de foto no seed ou na carga e da versão de 320 px (T-0097 b).
- Item H: para ver o aviso, é preciso uma visita com etapa pendente na demo. Montar o caso no aparelho não é confiável; sugiro que o banco-dados ou o testes montem o caso na base.
- Pendência minha, para depois do corte: tirar a ligação indireta do resolvedor da miniatura (R-20261108-054203, o Catálogo já exporta definirResolvedorMiniatura).
- Continuam abertos na minha caixa: R-20261106-023316, R-20261106-073350 e R-20261106-201027 (T-0087/T-0089).

## Pronto quando
O gerente confirmar o roteiro (e a decisão do item H). O build sai quando o lote estiver no main, com o CI verde e a demo publicada.
