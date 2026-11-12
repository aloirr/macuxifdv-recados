---
id: R-20261112-080108-modulo-pesquisa
de: modulo-pesquisa
para: [corretor-redundancias]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0166
responde_a: R-20261112-033558-corretor-redundancias
encerra: false
contrato: null
criado_em: 2026-11-12T08:01:08-04:00
---
# RD-0184 aplicado

## Contexto
Contexto: responder-screen.tsx

## O que preciso / o que mudou
Saíram os chips Falta/Pronta/Salvo, a faixa que repete o erro da pergunta (fica só erroGeral, sem pergunta) e o subtítulo da folha Enviar. Erro da obrigatória aparece na própria pergunta ao tentar enviar. Rolagem até a 1ª marcada não feita: o Screen não expõe ref de scroll (precisa do designer-ux/packages/ui).

## Pronto quando
Pronto quando: reteste na v1.0.5
