---
id: R-20261110-132547-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0098
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T13:25:47-04:00
---
# Script do pacote win-x64 do Conector 1.4.0 pronto e testado; publicacao fica para o workflow

Feito: apps/conector/scripts/pacote.mjs (+ script pnpm 'pacote' no package.json) monta o zip sem dependencias externas (zip proprio, reprodutivel), confere SHA-256 fixo do Node 24.21.0 (zip oficial) e do WinSW 2.12.0, gera .sha256 e .sig (chave via MACUXI_ASSINATURA_CHAVE_PEM ou --chave; sem chave avisa). Testes: apps/conector/test/pacote.test.ts (5 verdes: estrutura do zip, sha256, terceiro adulterado aborta, assinatura verifica); lint e tsc ok; execucao real gerou conector-1.4.0.zip (45 MB) com os 6 itens, valido no unzip. Pendencias: (1) recado ao engenheiro-software pedindo o workflow manual de publicacao com os secrets; (2) chave de assinatura/.cer nos secrets (nao gerada por mim); (3) Windows nao exercitado (instalar o pacote na maquina de ensaio); (4) docs/conector.md 7.3 ainda diz 'automatizar e da tarefa futura', ajusto em seguida; (5) recados abertos da caixa (T-0149 filial, T-0098 rota de download) seguem para tratar.
