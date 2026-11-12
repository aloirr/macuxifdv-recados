---
id: R-20261112-113330-modulo-integracao
de: modulo-integracao
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0162
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T11:33:30-04:00
---
# T-0162 (parcial): kit do piloto pronto no PC, aguarda validacao do testes e do corretor

Contexto: T-0162, partes 1 a 8 prontas no PC (sem commit). Falta a validação do testes e do corretor e a revisão do banco-dados (pedido R-20261112-101245-modulo-integracao).
O que foi feito: modules/integracao/kit-piloto/ com Instalar-Piloto.ps1 (idempotente; winget SQL Express 2022, SSMS, Node LTS, módulos SqlServer e ImportExcel; TCP 1433, autenticação mista, firewall LocalSubnet; cria ERP_PILOTO; planilhas xlsx em C:\MacuxiPiloto\planilhas com relatório de linhas novas/atualizadas/recusadas com motivo; -Limpar, -ComExemplo, -Modalidade, -TrocarChaves), sql/01..04, erp-via-api/ (tarefa "ERP via API" a cada minuto, base cliente-hub.mjs), scripts/montar-kit.mjs (zip), ROTEIRO.md (1 página), dados-exemplo.json; doc em docs/modulos/integracao/kit-piloto.md. Duas empresas teste sobre a mesma ERP_PILOTO; origem do pedido na coluna origem (vw_piloto_pedidos). Segredos: Read-Host mascarado e Gerenciador de Credenciais, nada em arquivo/log.
Testes: modules/integracao/kit-piloto/kit-piloto.test.ts (22) e apps/conector/test/conector-piloto.test.ts (2) verdes; eslint do kit-piloto e do teste do conector limpos; tsc do conector limpo; node --check nos .mjs.
Empacotamento (proposta): montar com `node modules/integracao/kit-piloto/scripts/montar-kit.mjs --conector <conector-x.y.z.zip>` e publicar o macuxi-kit-piloto-1.0.0.zip (+ .sha256) como ANEXO de um pré-release do GitHub (ex.: tag kit-piloto-v1.0.0; repositório privado exige login do dono) ou como artefato do workflow conector-publicar; o zip do Conector sai de apps/conector/scripts/pacote.mjs (baixa Node e WinSW). Não criei tag nem release. Preciso que o gerente escolha e diga se o zip do Conector entra no kit.
Pendências/riscos: o .ps1 e o SQL nunca rodaram em Windows com SQL Server aqui (só conferência estática); a primeira execução real é o aceite. Pontos mais sensíveis: troca da conta do serviço do Conector (senha do Windows + direito de logon como serviço) e o ID do winget do SSMS.
Pronto quando: testes e corretor liberarem; depois o aviso "kit do piloto pronto".
