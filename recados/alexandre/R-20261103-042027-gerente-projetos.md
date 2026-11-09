---
id: R-20261103-042027-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T04:20:27-04:00
---
# STATUS 04h45: APKs das 03h prontos (70b6999), demo no ar desde 03h48, main vermelho por 1 teste novo que só falha no CI

## Contexto
APKs 03h (main verde 70b6999)

## O que preciso / o que mudou
Campo: https://expo.dev/artifacts/eas/bF8tjSKy2Y29mz67alEKgn4SiGz8uVnm_eN511XZOl0.apk · Gestão: https://expo.dev/artifacts/eas/1brboKumLlwor-fiQIWLfNO6NkR54NNfCJ1gSnSGZsU.apk (Firebase OK, sem erro de credencial). DEMO

## Pronto quando
no ar desde 03h48 com subir-demo -Manter (sem apagar a base; migrações 0014–0019 aplicadas; seed Gestor/Promotor/Pesquisa/Treinamento com licenças); API 8100 com os 8 módulos, worker, BKO 3100; api-demo e bko-demo.macuxifdv.com.br respondem 200; demo-no-ar.mjs tudo OK (local e domínio), regra 7 confirmada sem gravar nada. Postgres: testes agora num container próprio (5434); 182 bancos de teste antigos apagados do Postgres da demo. ATENÇÃO: o .env não tem MACUXI_JWT_SEGREDO — a API usa chave aleatória desta subida; se a demo for reiniciada, todos fazem login de novo (vale definir no .env). ENTROU NO 70b6999 (APK) | T-0061 novo pedido em 3 abas (#75) + endereços/unidades (#52) + promotor_ve_pedidos (#65); T-0063 medidas (#68, #62, #69 0018, #70 BKO); T-0032 carga por arquivo (#66) + e2e do ciclo ERP (#67) — Sprint 2 fechável; Promotor no Postgres + pull dos 9 cadastros (#74); Treinamento no Postgres (#63, #64); Pesquisa (#55, #56); acabamento #58–#61; timers fora (pnpm timers limpo). DEPOIS DO APK, NO MAIN | limite de corpo por rota (413 amigável), opção do perfil Promotor valendo também no pull, migração 0019 (core.nota_erp + meta.tipo), consumidor de notas, consulta core.usuarios_resumo@1, SDK com usaConsultasOpcionais (ADR 0019). MAIN VERMELHO | desde b6681d0 só pelo teste novo tests/integracao/api/promotor-ve-pedidos.test.ts (pull do promotor vem vazio no CI; local passa 12/12); testes investigando a causa — NÃO pulei o teste (é de permissão). Se não ficar verde até 07h20, o build das 07h30 sai do 70b6999 (o mesmo das 03h) ou espero sua decisão. FICOU FORA / PARA VOCÊ | (1) fechar os PRs duplicados #78, #73, #54, #51 (eu não fecho PR sem pedido seu); (2) ligar o passo pnpm timers no .github/workflows/ci.yml (governança; a varredura está limpa); (3) MACUXI_JWT_SEGREDO no .env. PARA 07h30 | Core religando a apuração por tipo com usaConsultasOpcionais; Treinamento usando core.usuarios_resumo@1; validação completa na 5434.
