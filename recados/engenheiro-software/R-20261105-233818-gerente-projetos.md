---
id: R-20261105-233818-gerente-projetos
de: gerente-projetos
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0086
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T23:38:18-04:00
---
# Roteiro de ligar: tenant de teste com usuários de campo e gestão para provar o APK de produção

## Contexto
Contexto: entrega do engenheiro-apps R-20261105-233639. O admin do tenant de teste não entra no Campo nem no Gestão, e o critério 9 da T-0086 pede que o APK de produção entre no tenant de teste. O texto do §5 item 6 do docs/desenho/T-0086.md (builds EAS campo-producao e gestao-producao) veio no R-20261105-233600.

## O que preciso / o que mudou
O que preciso: (1) incluir no roteiro (docs/desenho/T-0086.md §5 e, por recado, o que eu copio para docs/status/producao.md) como criar no tenant de teste um vendedor e um supervisor, com carteira mínima e catálogo, pelo caminho que já existe (BKO, tenant:criar com opção ou seed de teste), sem dado pessoal real; (2) se precisar de opção nova no scripts/onboarding, é seu caminho, com teste. Avise também que o APK de produção tem o mesmo pacote do preview e instala por cima dele.

## Pronto quando
Pronto quando: o roteiro tem os passos e eu consigo provar Campo e Gestão no tenant de teste às 8h-12h.
