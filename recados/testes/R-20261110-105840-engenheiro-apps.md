---
id: R-20261110-105840-engenheiro-apps
de: engenheiro-apps
para: [alexandre]
cc: [gerente-projetos, engenheiro-software, testes]
tipo: resposta
prioridade: alta
tarefa: T-0144
responde_a: R-20261110-091537-alexandre
encerra: false
contrato: null
criado_em: 2026-11-10T10:58:40-04:00
---
# T-0144: a causa exata das quedas da 1ª abertura (banco do celular liberava 2 vezes a mesma memória) e a correção; cópia do relatório apagada

## Contexto
Resposta ao seu R-20261110-091537 (relatório de bug do celular das quedas de 10/11, v1.0.2). Li o relatório só no PC, numa pasta temporária fora do repositório. Nada dele foi para o GitHub, recado ou log; aqui vai só a conclusão técnica.

## A causa, em linguagem simples
- **As 3 quedas têm a mesma causa, e ela é exata:** o relatório registra o app encerrado pelo Android 4 vezes entre 05h32 e 05h33 (uma das reaberturas caiu em 2 segundos, antes de aparecer tela). As 4 com a mesma assinatura, no mesmo ponto.
- **Onde:** no banco de dados do próprio celular. Cada gravação grande (passagem dos dados, cada parte da carga, a reorganização da busca) abre uma segunda ligação com o banco e a fecha no fim. Ao fechar, a biblioteca do banco que usamos (expo-sqlite) liberava **duas vezes** a mesma memória da busca de produtos e clientes. O Android detecta isso e encerra o app na hora. Por isso a tela de erro nunca apareceu: não é erro de tela, o processo morre antes.
- **Por que nos pontos que você viu:** só cai quando a gravação mexe na busca. Na passagem dos dados, no começo da carga e no fim (98%, a reorganização da busca). Como o que já foi gravado fica salvo, cada reabertura avança um pouco, até chegar ao Início.
- **Não era** falta de memória, a sincronização em segundo plano, o volume de dados nem a internet.
- **É a mesma queda de 08/11 e de 09/11:** o relatório tem mais 17 registros iguais nesses dias.

## A correção
- Uma mudança de uma linha no shell (`apps/mobile/src/services/sqlite-expo.ts`): o banco abre com a opção da própria biblioteca que desliga essa limpeza dupla no fechamento. A memória da busca passa a ser liberada uma vez só, pelo próprio banco. Um teste automático garante que a opção não sai.
- As proteções que pus de manhã não atacavam esta causa. Ficam porque não fazem mal: o Diagnóstico com "Saídas do app (Android)" mostra o motivo de qualquer queda futura sem precisar de relatório.
- Vai no próximo APK (v1.0.3). O gerente organiza o build.

## O que eu preciso de você
- **A cópia foi apagada:** a pasta temporária e o .zip de Downloads. **Pode tirar o compartilhamento do link do OneDrive.**
- Com o APK novo: atualizar por cima e fazer a carga inicial 3 vezes seguidas, com o print do Diagnóstico de cada tentativa.

## Pronto quando
3 atualizações seguidas sem queda no seu celular. Se cair, o Diagnóstico mostra o motivo e eu corrijo no mesmo dia.
