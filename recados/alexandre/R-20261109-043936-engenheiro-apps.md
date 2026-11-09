---
id: R-20261109-043936-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: aviso
prioridade: alta
tarefa: T-0094
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-09T04:39:36-04:00
---
# BUILD PRONTO Campo-Demo-v1.0.1 / Gestao-Demo-v1.0.1 (338e9976)

## Links (APK para instalar)
- **Campo-Demo-v1.0.1:** https://expo.dev/artifacts/eas/cMI_pkQXZwzgipJDfGlLhwOreyG3MbtqltmLjBbu014.apk
  (build: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/3b186f39-69a1-49ef-a6b0-42bf6dbd3342)
- **Gestao-Demo-v1.0.1:** https://expo.dev/artifacts/eas/devX3hIF_zGPaNuHQMSyGhmz9XOPE-1Ksrowa_OBgrE.apk
  (build: https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/854da1c7-4113-46e3-8ac7-e981638f6567)

Os dois concluídos no EAS às 04h38: version **1.0.1**, versionCode **3** (o v1.0.0 era 2; instala por cima), commit
**338e9976** (mesma árvore do retrato bc7c574, CI e stack verdes nos runs 42587137650 e 42587150490). Checkout limpo,
`pnpm install --frozen-lockfile`, bundles do Campo e do Gestão verdes (2144 módulos cada), fingerprint automático
desligado (`EAS_SKIP_AUTO_FINGERPRINT=1`): ~23 min para os dois, contra ~20 min por build no v1.0.0.

## Roteiro (completo em apps/mobile/docs/roteiro-campo-demo-v1.0.1.md)
0. **Antes de testar:** o gerente recria a base da demo e **recarrega as fotos**; espere o aviso dele. **Não desinstale**
   o v1.0.0: instale o v1.0.1 por cima.
A. **T-0140 (10 passos no aparelho):** (1) atualização por cima, sem abrir por 1-2 min, e o app abre e fica aberto;
   (2) carga inicial sem fechar; (3) Novo pedido pela ficha não fecha o app nem pisca "Cliente não encontrado" (3
   clientes); (4) pela Rota, ligado à visita; (5) pelo Catálogo; (6) recado do Início abre a Rota (no Gestão, a central
   de notificações); (7) faixa EM ATENDIMENTO some só na ficha do próprio cliente; (8) PDF cancelado ao fechar a folha;
   (9) tela de erro e Perfil › Diagnóstico ("Último erro do app", sem dado pessoal); (10) checkout recusado: aviso
   laranja por ~10 s e a visita volta aberta.
B. **Frente M:** detalhe do pedido/orçamento com histórico em tags (Campo, Gestão e BKO); "Equivale a" no PDF; cancelar
   pedido integrado (⋮, só com conector que aceita cancelamento); tag Salvo com total.
C. **Início e indicadores:** "Faltam … · R$ … por dia útil (n dias)" no dia não útil; aviso único de dado antigo acima do
   Sincronizar; Ficha do Gestor com os mesmos números do Início; "Pedidos a faturar".
D. **Catálogo:** miniatura de 320 px do servidor na lista e na busca; a ficha usa a foto original.
E. **BKO:** Carga por arquivo (modelo CSV, erros linha a linha); de-para da condição de pagamento e do "Canal do
   cliente"; canal no público-alvo da Pesquisa.
F. **Versão:** Perfil mostra Campo-Demo-v1.0.1 / Gestao-Demo-v1.0.1; Android 1.0.1. No Diagnóstico: "Build instalado:
   1.0.1+3".

## Ficou para depois
- Repetições restantes do corretor-redundancias (RD-0016 e RD-0019 reabertos, RD-0032, RD-0033, RD-0040).
- **T-0117** (sessão do BKO por cookie): desenho pronto, implementação na próxima rodada.
- **T-0098** (rota do download do Conector com link assinado): o botão do portal segue atrás de campo opcional.
- **zod 4**: migração não entrou.
- **Devolução de pedido**: tabela 0050 criada, função desligada no app e no BKO.

Mande de volta, por item (A a F), ok ou o passo que falhou, o aparelho e o que apareceu, com as linhas do Diagnóstico.
