---
id: R-20261110-153702-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0158
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T15:37:02-04:00
---
# T-0158 shell: Enviar diagnóstico + fila (v1.0.4) e queda automática (v1.0.5) prontos e DESLIGADOS por chave; Perfil da v1.0.3 igual

## Contexto
T-0158 (ADR 0043, desenho docs/desenho/T-0158.md §5; pedido R-20261110-114614-engenheiro-software). Lógica do diagnóstico no shell mobile, contra o contrato do SDK (packages/platform-sdk/src/diagnostico.ts: DiagnosticoEnvioSchema, DiagnosticoRespostaSchema, formatarProtocolo, ROTA_DIAGNOSTICOS). Nada muda no lote da v1.0.3: tudo está atrás de DIAGNOSTICO_NUVEM_LIGADO = false (sem botão, sem efeito, sem chamada nova à API). Para testar num build de desenvolvimento: EXPO_PUBLIC_DIAGNOSTICO_NUVEM=1.

## O que preciso / o que mudou
Arquivos novos:
- apps/mobile/src/lib/diagnostico-envio.ts (puro): montarEnvio (pacote técnico com versão, build, aparelho, Android/API, tela de módulo em uso sem query, horário, Último erro do app, saída do Android do macuxi-saida, contagem da fila do sync e print_id; máscara única no texto livre; .parse do contrato; empresa e usuário só pelo token); fila com dono (usuário + empresa), idempotente pelo UUID, histórico dos últimos 10, poda; classificação da resposta (sem rede, 5xx, 401, 408, 429 e 404/405/501 da rota ainda não publicada = fica na fila; 400 e 409 DIAGNOSTICO_JA_EXISTE = falhou); drenarFila (POST e, só depois do aceito, o print na fila de arquivos); "Enviado · nº 0042" / "Na fila. Envia quando tiver sinal."; v1.0.5: planoAutomatico (quedas do Android novas, máx. 3 por abertura, 1ª leitura 7 dias; Último erro de tela/raiz/fatal vira erro_tela; fatal JS + queda do mesmo fechamento = um só erro_tela com a saída junto), UUID v5 (SHA-1 puro, namespace fixo) de quando+motivo, códigos dos motivos (crash_nativo, anr, memoria...).
- apps/mobile/src/services/diagnostico.ts: fila no AsyncStorage (fv:diagnostico:envios) em série, POST /v1/diagnosticos pelo ApiClient com a sessão, reenvio na volta ao app, depois de cada sync e com a espera crescente da fila (RN-CORE-23 item 2), print pelo motor.enfileirarArquivo (modulo 'core', apagarAoEnviar), registrarDiagnosticosAutomaticos (v1.0.5, atrás de QUEDA_AUTOMATICA_LIGADA = false), ligarEnvioDeDiagnosticos.
- apps/mobile/src/components/enviar-diagnostico.tsx: botão "Enviar diagnóstico" + Folha (O que aconteceu? até 1000 com o aviso de dado pessoal, Anexar print pela galeria do shell — JPEG 1600 px q80 sem EXIF —, "Vai junto", Enviar → protocolo ou Na fila) e histórico dos últimos 10. Tela provisória até a imagem do designer-ux.
Alterados (2 linhas cada, atrás da flag): apps/mobile/src/app/profile.tsx (botão no Diagnóstico) e apps/mobile/src/state/plataforma.tsx (efeito que liga a fila quando o motor do usuário abre).
Testes: lib/diagnostico-envio.test.ts (25: contrato, máscara, limites, fake da rota idempotente 201/200/409, offline → fila → protocolo, sem sessão espera o login do dono, 404 fica, 400 falha, print só depois do aceito, histórico, SHA-1/UUID v5 contra a referência, plano da queda) e components/enviar-diagnostico.test.tsx (2). vitest do mobile, eslint dos arquivos, tsc sem erro nos meus arquivos (os únicos erros do tsc estão em modules/vendedor/app/components/novo-pedido-itens.tsx, em andamento do modulo-vendedor), bundles campo e gestao verdes.

## Pronto quando
Pendências: (1) ligar DIAGNOSTICO_NUVEM_LIGADO = true depois do corte da v1.0.3, com a rota publicada (engenheiro-software); 404 até lá só deixa na fila. (2) v1.0.5: QUEDA_AUTOMATICA_LIGADA = true depois da queda forçada no aparelho de teste. (3) Portal › Diagnósticos (apps/web/app/config/diagnosticos, item 3 do pedido R-114614) não entrou nesta tarefa — fica para a próxima rodada. (4) Visual e textos finais com o designer-ux. Premissas: o print vai na fila de arquivos com modulo 'core' (o ItemArquivo só aceita ModuloId; o servidor decide pela linha 'plataforma' criada no POST), e a fila de diagnósticos é separada da fila do motor (rota da plataforma, não do /v1/sync/push). verificar: 1 violação que não é minha (.vscode/settings.json sem dono). Sem commit.
