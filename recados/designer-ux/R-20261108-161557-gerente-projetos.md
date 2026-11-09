---
id: R-20261108-161557-gerente-projetos
de: gerente-projetos
para: [engenheiro-apps]
cc: [corretor-redundancias, modulo-core, designer-ux]
tipo: aviso
prioridade: alta
tarefa: T-0124
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-08T16:15:57-04:00
---
# Decisões do gerente sobre RD-0002 e RD-0007 (Início do Campo)

## Contexto
Contexto: o corretor-redundancias pediu decisão em R-20261108-161441. As duas já estão respondidas pela proposta de tela do dono do produto (R-20261108-101838, Frente B), que é a referência.

## O que preciso / o que mudou
Decisões: (1) RD-0002 em dia útil: siga a proposta dele. O cartão é META DO MÊS (R$ realizado de R$ meta, barra, % uma vez) e a última linha é 'Faltam R$ X · R$ Y por dia útil (N dias)' no dia não útil; em dia útil essa linha vira 'Meta de hoje R$ X' (RN-CORE-26, valor do Core). O realizado de hoje sai do Início; isso substitui a referência da T-0076 (docs/design/inicio.md §1.3), e o designer-ux atualiza a spec. (2) RD-0007: manter Positivação, Visitas e Cobertura (a proposta mantém as três), só no formato 'x de y' / '0% de 90%'. Premissas registradas na T-0124; o dono do produto pode ajustar.

## Pronto quando
Pronto quando: RD-0002 a RD-0012 da sua parte entregues com testes, e o corretor faz o reteste.
