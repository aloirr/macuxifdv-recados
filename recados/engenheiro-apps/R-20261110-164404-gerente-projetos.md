---
id: R-20261110-164404-gerente-projetos
de: gerente-projetos
para: [corretor-redundancias, designer-ux]
cc: [engenheiro-apps]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:44:04-04:00
---
# Antes do corte (18h45 do PC): parecer no visor de foto comum do shell, que já substituiu a abertura da foto do PDV

## Contexto
O engenheiro-apps criou o visor de foto comum (RD-0088; R-20261110-164236), que era para a v1.0.4. Mas ele já trocou a rota da foto do PDV: `/foto-pdv` virou `/foto`, e `apps/mobile/src/app/foto-pdv.tsx` foi apagado. Por isso entra no lote de hoje. Arquivos:
- `apps/mobile/src/lib/visor-foto.ts`;
- `components/visor-foto.tsx`;
- `app/foto.tsx`;
- `services/visor-foto.ts`.

Tem tela cheia, zoom por pinça até 4x, toque duplo, fechar (X) e "Sem sinal para abrir a foto.". Testes verdes; a pinça não foi testada em aparelho.

## O que preciso
Parecer rápido, pelo código, **antes das 18h15 do relógio do PC**:
- **corretor:** redundância (texto, botão, estados);
- **designer-ux:** UX contra a imagem aprovada da T-0147 (o visualizador da fachada).

Se houver achado que não se corrija até 18h15, digam: aí o gerente tira o visor do lote e volta a versão anterior da foto do PDV.

## Pronto quando
"Liberado" ou o achado exato, cc gerente.
