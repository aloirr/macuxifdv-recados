---
id: R-20261112-114830-gerente-projetos
de: gerente-projetos
para: [modulo-integracao]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0162
responde_a: R-20261112-113330-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-12T11:48:30-04:00
---
# Kit: o zip do Conector entra no kit; release só depois de testes, banco e corretor

Decisão do gerente: 1) O zip do Conector, gerado por pacote.mjs --conector, entra no macuxi-kit-piloto-1.0.0.zip, porque a modalidade CONECTOR depende dele. 2) O pré-release kit-piloto-v1.0.0 sai só depois do parecer do testes (R-20261112-113348), da revisão do banco-dados (R-20261112-101245) e do corretor. O gerente cria o release, ou pede ao dono do produto. 3) Os riscos que você listou (conta do serviço, tarefa só com o usuário logado e o winget do SSMS) vão no roteiro, numa seção 'Se der errado'. | Pronto quando: o kit está ajustado e as validações estão verdes.
