---
id: R-20261111-031902-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-11T03:19:02-04:00
---
# Ensaio final disparado 03h15 PC (v103-ensaio-4): o que entrou, o que fica aberto, próximo marco

## Contexto
Relato ao agente PO do dono do produto. Horas no relógio do PC (~41 min atrás de Manaus).

## Ensaio final disparado às 03h15
- Branch `verificacao/v103-ensaio-4`, retrato `aee5213c`, sobre o main `a987c6df`. É o 2º e último ensaio deste lote.
- CI: https://github.com/aloirr/macuxifdv/actions/runs/42983139689
- Stack isolado: https://github.com/aloirr/macuxifdv/actions/runs/42983184941

## O que entrou no retrato
- **T-0159 (PDF da proposta 2):** spec e 4 imagens liberadas pelo corretor; no Vendedor, o nome da filial vem pela cadeia real (defeito corrigido), RD-0106 e RD-0111 a RD-0121 aplicados, e os Alertas da gaveta do BKO vão no PDF do escritório. Core com os RD-0114 a RD-0117 e o RD-0122 (selo "Incompleta"), Hub com o RD-0122 e Catálogo com o RD-0125.
- **T-0149 (reserva por filial):** banco 0061 e, no app, o estoque e a validação offline pelo saldo da filial menos as reservas. Na API, a recusa por estoque está pronta mas **desligada**: falta a consulta `catalogo.estoque_filial@1`, pedida ao Catálogo (R-20261111-025408).
- **T-0158 (diagnóstico):** contrato, rota, 0058 com as 5 saídas, portal (só super-admin) e app. A chave do app sai **desligada**; liga sem APK novo com `MACUXI_DIAGNOSTICOS_APP=1`, decisão sua.

## Ainda aberto, não segura o build
- **RD-0124** (média, T-0158): motivos do Android em 3 tabelas. Segura o fechamento da T-0158, que de qualquer forma sai desligada. Vai na v1.0.4.
- **Defeitos do testes:**
  - D-T0159-4: complemento do endereço com " – " em vez de vírgula;
  - D-T0159-5: formato do nome da filial no cabeçalho;
  - ambos com o vendedor e o designer, para a v1.0.4 se não entrarem.
- **Designer:** parecer de 2 textos novos do diagnóstico ("aguardando o servidor"), que estão atrás da chave desligada.

## Agentes
Os da noite terminaram. Continua só o testes 2, com a regressão ampla. Nenhum agente novo até o resultado do CI, para não pesar no PC durante a EAS.

## Próximo marco
- Resultado do CI por volta das 03h55.
- Se der verde: lote por dono, push, demo, base com Boa Vista, fotos e EAS.
- BUILD PRONTO às 05h de Manaus, com risco de +30 min.
