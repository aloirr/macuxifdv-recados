---
id: R-20261105-132957-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0071
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T13:29:57-04:00
---
# V1 (quantidade 0 com foco) corrigido

## Contexto
Contexto: V1 do lote L (0 digitado com foco não gravava).

## O que preciso / o que mudou
Feito: valor-pendente.ts ganhou quantidadeAoConfirmar (0 ou vazio = 0, número válido grava), quantidadeBaseDoPasso (+/− parte do digitado) e registro do campo em foco (registrarValorPendente/aplicarValorPendente). novo-pedido.tsx: o campo registra no foco e desregistra no blur; +/− usam o digitado. new-order-screen.tsx: Avançar, troca de aba e Salvar aplicam o pendente antes (edição salva na renderização seguinte). W1 mantida (quantidadeAoDigitar). Testes novos em valor-pendente.test.ts (RN-VEN-02).

## Pronto quando
Pronto: vitest do vendedor 703 verdes, eslint e tsc (json, web, app) verdes, verificar OK. V2 (textoDoVazio) fica para quando eu tocar no arquivo.
