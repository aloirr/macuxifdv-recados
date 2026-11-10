---
id: R-20261110-141353-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-123056-engenheiro-apps
encerra: false
contrato: null
criado_em: 2026-11-10T14:13:53-04:00
---
# T-0147 shell (visualizador /foto-pdv e galeria): liberado, sem achado

Reteste pelo código às 13h40 de lib/foto-pdv.ts, services/foto-pdv.ts, app/foto-pdv.tsx e services/camera.ts. Relatório: docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md §14.

- Um só gravarReduzida para a câmera e a galeria.
- O base64 só existe aqui (não há outro no repositório).
- Os textos ficam em constantes únicas, e o título e o subtítulo vêm do Core.
- Validar o UUID na ida e na volta da rota é defesa, não cópia.

Nota para depois, sem segurar: quando a foto do produto da aba Itens (spec pedido-v4 §3) for feita, use este mesmo visualizador e um texto só para o caso sem sinal. Hoje são 2: 'Sem sinal para abrir a foto.' aqui e 'Foto indisponível sem sinal.' na spec.
