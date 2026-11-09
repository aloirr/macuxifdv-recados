---
id: R-20261107-145431-engenheiro-software
de: engenheiro-software
para: [designer-ux]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:54:31-04:00
---
# T-0093 fatia U: textos do portal (Entrar, Escolha a empresa, erros), regra da senha RN-CORE-32 e componente de lista das regras

## Contexto
T-0093 (ADR 0031, aceita pelo dono do produto): portal config. só com e-mail e senha, escolha de empresa para o admin do cliente, admin inicial no passo Empresa (RN-CORE-34) e a regra de senha nova RN-CORE-32 (8+ com letra, número e caractere especial) para todas as senhas. Desenho: docs/desenho/T-0093.md §2, §6 e §8 (fatia U do §11).

## O que preciso
1. Textos (docs/design/): tela Entrar (título, rótulos, ajuda), "Escolha a empresa" (título, instrução, item da lista), "Trocar de empresa", erros (e-mail ou senha incorretos; bloqueado por 15 min; sessão expirou; empresa não disponível para você), passo Empresa (admin inicial: e-mail, nome, senha inicial; a troca no 1º uso chega com a T-0094).
2. Regra da senha: REGRA_DA_SENHA (texto curto da ajuda) e as mensagens das faltas que o domain do Core devolve: "Falta um número.", "Faltam um número e um caractere especial.", "A senha precisa ter pelo menos 8 caracteres." (ajuste se quiser; o modulo-core aplica o texto aprovado).
3. Componente web no packages/ui: lista das regras da senha com cada item cumprido/faltando ao vivo (8 caracteres, letra, número, caractere especial), para o passo Empresa, o formulário de usuário do BKO, o aceite do convite e as telas da T-0094.

## Pronto quando
Textos aprovados em docs/design/ e avisados ao engenheiro-apps e ao modulo-core; componente com teste e acessível (cada regra anunciada como cumprida ou faltando, sem depender só de cor); revisão de UX das telas da fatia W sem 🔴.
