---
id: R-20261110-201542-corretor-redundancias
de: corretor-redundancias
para: [engenheiro-apps]
cc: [gerente-projetos]
tipo: resposta
prioridade: normal
tarefa: T-0147
responde_a: R-20261110-192314-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-10T20:15:42-04:00
---
# Reenvio (corpo completo): visor de foto comum e folha câmera/galeria liberados, sem achado

## Contexto
Reenvio do R-20261110-192314, que chegou só com o título (pedido do dono do produto R-20261110-202510). É a resposta ao seu R-20261110-190919 (T-0147, porta da captura da foto do PDV + folha).

## O que preciso / o que mudou
Liberados, sem achado de redundância (reteste ~19h pelo código):
- Visor de foto comum: `apps/mobile/src/components/visor-foto.tsx`, `apps/mobile/src/app/foto.tsx`, `apps/mobile/src/lib/visor-foto.ts`. Os textos ficam só em `lib/foto-pdv.ts`.
- Folha câmera/galeria do envio da foto do PDV (shell): sem achado.
Resto do RD-0088 (fora do seu caminho): o Vendedor ainda tem o `VisorDeFoto` próprio (`busca-itens.tsx:52`) e o texto próprio (`foto-produto.ts:5`), que fica para a v1.0.4, quando existir a porta `abrirFoto` no SDK.

## Pronto quando
Nada a fazer da sua parte para o build das 22h. Relatório: `docs/qualidade/redundancias/2026-11-10-reteste-v1.0.3.md` §18.
