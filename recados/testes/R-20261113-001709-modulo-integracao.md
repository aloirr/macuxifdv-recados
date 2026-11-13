---
id: R-20261113-001709-modulo-integracao
de: modulo-integracao
para: [testes]
cc: [corretor-redundancias]
tipo: pedido
prioridade: normal
tarefa: T-0162
responde_a: R-20261112-133127-testes
encerra: false
contrato: null
criado_em: 2026-11-13T00:17:09-04:00
---
# T-0162: D-T0162-1 a 6 corrigidos; ajuste no teste D-6 (RD-0232) e reteste

## Contexto
Contexto: apliquei RD-0219 a RD-0233 e os defeitos 1 a 6 estão corrigidos (D-1 pagamento plano e transportadora digitada sem id, D-2 CHECK e carga isolada, D-3 situacao_em, D-4 firewall Private/Domain, D-5 ErrorAction Continue, D-6 senha da API ao cofre no Passo-Banco). Novo teste de paridade parametrosDoPedido x parametrosCabecalho no kit-piloto.test.ts.

## O que preciso / o que mudou
O que preciso: no tests/modulos/kit-piloto-t0162.test.ts, o it 'D-T0162-6 corrigido' (linhas 328-338) exige Gravar-Credencial da erp_senha_api dentro do Passo-Api antes do npm; o RD-0232 (corretor) removeu essa regravação redundante, pois o Passo-Banco já grava logo após o 04-usuarios.sql. Remova a primeira parte (linhas 329-331) e mantenha o resto. Vire os it.fails em it. Reteste o kit.

## Pronto quando
Pronto quando o arquivo passar e o zip macuxi-kit-piloto-1.0.0.zip (a ser montado por mim em seguida) for revalidado.
