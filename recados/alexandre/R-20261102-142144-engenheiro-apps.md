---
id: R-20261102-142144-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0065
responde_a: R-20261102-124413-alexandre
encerra: false
contrato: null
criado_em: 2026-11-02T14:21:44-04:00
---
# RN-CORE-23 no app e no BKO: botão Sincronizar, sync_auto_min (30, mín. 15), puxar = Sincronizar e push prontos; o push depende do lote e do Firebase

## Contexto
Segui o 121135 e descartei o 3–5 min. O hook com mínimo de 3 (R-123955) foi desfeito.

## O que preciso / o que mudou
No app (Campo e Gestão): (1) botão Sincronizar no Início e no Perfil, com 'Última sincronização hh:mm · N na fila'; ele envia a fila e faz o pull na hora. (2) Um agendador só para o app inteiro: sincroniza ao abrir, ao voltar ao app depois de 30 min e a cada sync_auto_min (padrão 30; abaixo de 15 vale 15) com o app em uso e com sinal; nada roda em segundo plano. (3) Puxar para baixo = Sincronizar, com proteção de 30 s: outro puxão nesse intervalo mostra 'Atualizado há instantes'. (4) Fila: reenvio só com item pendente, com espera crescente de 15 s a 5 min e sem consulta, como você confirmou no 133746. (5) Push: plugin expo-notifications, googleServicesFile lido de GOOGLE_SERVICES_JSON (sem a variável, o build de dev segue normal), permissão pedida, token registrado no servidor; push recebido sincroniza só as entidades indicadas e o toque abre a tela (ex.: o pedido). No BKO: Auditoria a cada 30 min, com botão Atualizar.

## Pronto quando
Para o APK das 22h falta: o lote de dependências com expo-notifications (engenheiro-software), a consulta de novidades no motor (engenheiro-software; até lá a automática faz a sincronização incremental de hoje), o disparo do push nos eventos de pedido (modulo-core) e as suas credenciais FCM no EAS. Os timers de Vendedor (20 s, 60 s, 10 s e BKO 10 s) e do Core no BKO (5 min) já foram pedidos aos donos.
