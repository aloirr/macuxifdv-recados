---
id: R-20261119-172300-gerente-projetos
de: gerente-projetos
para: [todos]
cc: [alexandre, engenheiro-software, engenheiro-apps, modulo-core, modulo-vendedor, modulo-integracao, banco-dados, designer-ux, testes]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261119-133210-alexandre
encerra: false
contrato: null
criado_em: 2026-11-19T17:23:00-04:00
---
# PRONTO PARA LIBERAR v1.0.15 (servidor + APK), SHA 53baf7c3fc854a4a1a00436c80fb585c48e55276

## SHA para o deploy e o APK
**53baf7c3fc854a4a1a00436c80fb585c48e55276**: main, squash do #516, de 17h14 de Manaus. O APK Campo e Gestão v1.0.15 sai deste mesmo SHA, pelo `android-build.yml`.

## Conferido
1. **PRs da v1.0.15 no main:**
   - #504 (governança do CI);
   - P-6: #495, #494 e #507;
   - rastreamento: #498, #499 e #502;
   - prazo médio e Alertas: #506 e #508;
   - catálogo v2: #503;
   - login e e-mails: #499, #501 e #510;
   - #509 e #492;
   - ficha do cliente v2: #514;
   - limpeza do reteste: #515;
   - envio do trajeto: #516.
2. **Main verde** em 53baf7c3fc854a4a1a00436c80fb585c48e55276: CI do push, run 44616710113, com o `ci-ok` verde.
3. **corretor-redundancias:**
   - **LIBERADO** no conjunto da v1.0.15. O reteste no db653698 pegou os RD-2391 a RD-2394, que foram corrigidos no #515.
   - O RD-2395 a RD-2401 do envio do trajeto foram fechados no #516.
   - **Fica para o lote seguinte, sem segurar** (só comentário ou título de teste):
     - RD-2379 (comentários do kit);
     - o cabeçalho de `tests/integracao/api/trajeto-envio-t0156.test.ts:8`.
4. **design-de-marca:** **LIBERADO** no db653698. O #515 e o #516 não mudam tela.
   - **Pendência que não segura: MC-1803.** Os PNG do logo do e-mail ainda não foram publicados. Até lá, o e-mail de senha sai com "Macuxi Força de Vendas" em texto, na cor e na fonte certas.
5. **engenheiro-software:** sem 🔴 na ficha, na limpeza e no envio do trajeto.
   - O 🟢 do "Enviando…", que dura mais quando há milhares de pontos, vai para a v1.0.16.
6. **testes:**
   - ficha: 14.632 verdes nos pacotes e 2.199 em `tests/`;
   - envio do trajeto: 4.560 no core, no mobile e na API, e 2.205 em `tests/`, com zero vermelhos;
   - o teste novo vai do SQLite do aparelho até `core.ponto_trajeto`.

## Cortes para a v1.0.16 (registrados na T-0186 e na T-0187)
- **PDF na ficha:** o visor abre só JPEG e PNG, e o "Ver PDF" não aparece.
- **Tabela Carteira do Gestão:** o contato virá por uma rota online, porque a T-0168 não leva nome nem telefone ao aparelho.

## ⚠️ Trava RN-VEN-45 (R-20261118-210200-alexandre)
A trava continua até o dono do produto mandar um recado **depois** do APK da v1.0.15 estar nos aparelhos:
- não publicar o Conector 1.5.0;
- não preencher o "% Acres.Fin.".

## Próximo passo
- **Ponte**, com a autorização do Alexandre ("Aprovo o deploy 1.0.15 quando estiver ok" e "Termine tudo e ai faca o deploy da 1.0.15"):
  - disparar o "producao — liberar versão" com `versao=v1.0.15` e `sha=53baf7c3fc854a4a1a00436c80fb585c48e55276`;
  - comentar "aprovado v1.0.15" na issue.
- **Gerente**, depois da publicação:
  - conferir o /v1/saude, o BKO e o portal;
  - disparar o APK pelo `android-build.yml` no mesmo SHA;
  - gravar o recado "v1.0.15 no ar" com os minutos do Actions comparados aos da v1.0.14.
