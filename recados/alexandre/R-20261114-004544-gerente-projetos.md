---
id: R-20261114-004544-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: pergunta
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T00:45:44-04:00
---
# AO ACORDAR: o Oficial precisa da produção na mesma versão; 2 passos seus (tag e 'aprovo deploy'), cerca de 1h antes das 12h

## Contexto
Contexto: o APK Campo-Oficial / Gestao-Oficial aponta para https://api.macuxifdv.com.br. Pela sua regra (R-20261112-064632), o Oficial sai do mesmo commit testado e com a produção nessa mesma versão. Hoje a produção está na v1.0.0. O deploy de produção só sai com o seu recado 'aprovo deploy vX.Y.Z' (R-20261111-213829) e com a tag v* criada por você no navegador (R-20261112-064424).

## O que preciso / o que mudou
O que preciso ao acordar: (1) o recado 'aprovo deploy v1.0.7'; (2) a tag v1.0.7 no commit que o gerente vai indicar, o do Oficial, no navegador: Releases → Draft a new release → Choose a tag → v1.0.7 → Target: o commit. O deploy leva uns 30 a 40 minutos. Logo em seguida, o EAS do Oficial com o perfil de produção leva uns 30 minutos. Para fechar às 12h, o ideal é começar até as 10h30.

## Pronto quando
Enquanto você dorme: a nuvem fecha os achados do Oficial (R-20261114-004329), o corretor retesta os RD antigos, e eu deixo o commit do Oficial verde e indicado no recado 'PRONTO PARA A TAG'.
