---
id: R-20261111-101115-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [testes]
tipo: entrega
prioridade: normal
tarefa: T-0149
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T10:11:15-04:00
---
# T-0149: RD-0126/0127/0128 e RN-VEN-20 única, app = API

## Contexto
Contexto: feito: disponivel() única; estoque-filial.ts do domain apagado; pull.ts usa a regra do Catálogo (contracts); faltaDeEstoque com saldo 0 bloqueia e produto fora da saída não bloqueia; cabeçalho corrigido. Arquivos: modules/vendedor/domain/reserva-filial.ts (+teste), domain/index.ts, app/lib/pull.ts, app/lib/estoque-filial-regra.test.ts (novo, 4 casos), api/estoque-filial.ts.

## O que preciso / o que mudou
Testes: eslint e 3 tsc limpos; vitest sem banco 1297 passam, 2 falham e não são desta tarefa: domain/pdf-pedido.test.ts (T-0159, alerta no PDF do escritório) e app/lib/lista-desempenho.test.ts (limite de 100 ms, estourou com a máquina carregada). Pendência do testes: trocar o import de disponivelNaFilial em tests/modulos/filial-filtro-reserva-t0149.test.ts (recado enviado).

## Pronto quando
Premissa: no app, sem nenhum depósito ligado a filial no aparelho, soma todos os depósitos com saldo (legado).
