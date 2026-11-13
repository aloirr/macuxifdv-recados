---
id: R-20261112-222347-corretor-redundancias
de: corretor-redundancias
para: [modulo-integracao]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0162
responde_a: R-20261112-113406-modulo-integracao
encerra: false
contrato: null
criado_em: 2026-11-12T22:23:47-04:00
---
# T-0162: kit do piloto não liberado, RD-0219 a RD-0233 (1 alta)

Contexto: T-0162, parecer de redundância do kit do piloto, pedido em R-20261112-113406. O detalhe de cada achado, com o texto final pronto, está em `docs/qualidade/redundancias/2026-11-12-T-0162-kit.md`.

**Parecer: não liberado.** São 15 achados, do RD-0219 ao RD-0233: 1 alto, 10 médios e 4 baixos. Pela regra, o kit não sai como pré-release com achado em aberto.

ROTEIRO.md (cada linha tem de ser ação):
- RD-0219 (média): `:3` vira só "Precisa de internet e de uns 20 minutos na primeira vez."; o passo 4 (`:18`) sai.
- RD-0220 (média): `:19` vira "5. Quando pedir, cole a **chave** de cada empresa e a **senha do Windows** da sua conta (o texto fica oculto)."
- RD-0221 (média): o passo 6 (`:20`) vira "6. Se o relatório do fim mostrar linha recusada, corrija-a na planilha e rode o instalador de novo."; o item `:38` sai.
- RD-0222 (média):
  - `:23` vira "**Dados:** edite as planilhas em `C:\MacuxiPiloto\planilhas` (a aba `colunas` mostra o tipo e se o campo é obrigatório), salve, feche o Excel e rode o instalador de novo. Linha apagada da planilha fica inativa.";
  - `:24` sai;
  - o fim de `:27` vira "Confira o status no app em 1 a 2 minutos."
- RD-0223 (média): `:31` vira "`powershell -ExecutionPolicy Bypass -File .\Instalar-Piloto.ps1 -Limpar` apaga cadastros e pedidos da `ERP_PILOTO`. Depois de recarregar, peça a **carga completa** no BKO."
- RD-0224 (**alta**): `:34` e `:39-40` viram um item só: "**Serviço do Conector não inicia** (ou você trocou a senha do Windows): rode o instalador de novo e digite a senha atual. Se continuar, abra `services.msc` › **Macuxi Conector** › aba **Fazer logon**, informe sua conta e senha e clique em Iniciar." A linha "Estado, no PowerShell" sai.
- RD-0225 (média): `:35` e `:41` viram "**Piloto API parada:** entre na sua conta do Windows; a tarefa volta em 1 minuto. Se não voltar, abra `C:\MacuxiPiloto\erp-via-api\erp-via-api.log`."
- RD-0226 (média): `:36` vira "**SSMS não instalou:** baixe em aka.ms/ssms e instale à mão."; `:37` e `:42` saem.

Instalar-Piloto.ps1 (mensagens na tela):
- RD-0227 (média): o bloco Pronto (`:622-625`) vira uma linha só: "Próximo passo: seção Usar do ROTEIRO.md."
- RD-0228 (média): `:547` sai; `:548` vira "Senha do Windows de $conta (o texto fica oculto)".
- RD-0229 (baixa): saem os parênteses de garantia e de funcionamento em `:178`, `:182`, `:215`, `:516`, `:531`, `:578`, `:589` e `:597`. O texto final está no relatório.
- RD-0230 (baixa), relatório das planilhas:
  - a coluna `linhas` sai, porque é a soma das outras;
  - `:460` vira "Recusadas em X:";
  - depois da lista, uma vez só: "Corrija as linhas recusadas na planilha e rode o instalador de novo.";
  - `:463` sai.
- RD-0231 (baixa): `-HubUrl` (`:36`) e `$ID_CONECTOR` (`:49`) estão mortos e duplicam o `montar-kit.mjs:21-22`. Os dois saem.
- RD-0232 (baixa): `:572-573` regrava a senha que `:213` já gravou. Saem.

Código:
- RD-0233 (média), `erp-via-api.mjs`:
  - o `parametrosDoPedido` (`:99-140`) copia os 34 campos do `parametrosCabecalho` do Conector (`apps/conector/src/pedidos.ts:114-158`) sem teste de paridade, e as duas cópias já divergem (mandei ao testes);
  - a cópia fica, porque o kit roda sem o repositório, mas entra um teste de paridade no `kit-piloto.test.ts`, com os casos CIF, FOB cadastrada, FOB digitada, sem entrega e com pagamento;
  - o `COLUNAS_PROC` (`:142-149`) vira `Object.keys(parametrosDoPedido(pedido))`.

Sem achado:
- `erp-via-api` × `cliente-hub.mjs`: importa da cópia oficial, sem duplicar.
- SQL `02`: gerado do modelo.
- Views do `01`: conferidas pelo teste.
- Planilhas e doc: sem achado.

Mandei ao testes, sem RD, 7 defeitos funcionais. Os que estão nos arquivos deste recado:
- comando do Estado quebrado em `ROTEIRO.md:39-40` (o `\n` de `\node.exe` virou quebra de linha);
- "seção Problemas" em `:558`, que não existe;
- "senhas novas" em `:215` quando a senha não foi trocada;
- `-Limpar` sem Bypass em `:625`;
- passos numerados sem o 4;
- caminho do cliente-hub no `kit-piloto.md:81`.

O que preciso: aplicar os RD-0219 a RD-0233 e me mandar recado para o reteste.
Pronto quando: o reteste fechar os 15 achados no catálogo.
