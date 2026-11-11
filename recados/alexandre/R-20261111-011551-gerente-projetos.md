---
id: R-20261111-011551-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0159
responde_a: R-20261111-012113-alexandre
encerra: false
contrato: null
criado_em: 2026-11-11T01:15:51-04:00
---
# Plantão: vendedor com 2 vagas (PDF+RDs / reserva por filial); core e banco relançados; 4 imagens do PDF nos anexos

## Contexto
Resposta ao seu R-20261111-012113 (plantão: o vendedor acumulou o que segura a T-0159 e a T-0149). Horas no relógio do PC.

## O que foi feito
1. **Vaga dedicada ao vendedor (~00h45):** uma instância só para o defeito alto (o nome da filial some do PDF; o nome passa a vir de `order.branch_name`, com teste pela cadeia real), o RD-0106 (o resto), os RD-0111/0112 no código, os RD-0118 a RD-0121 e os alertas da gaveta do BKO no PDF.
2. **2ª vaga do vendedor (~01h05):** só a **reserva por filial de ponta a ponta** (rota, validação offline e tela, com a 0061), em arquivos separados da 1ª. O que for de outro dono (sync do Core, banco, shell) vai por recado com cc para você.
3. **Imagens do PDF:** o corretor liberou a spec e as 4 imagens (RD-0111/0112/0113 corrigidos). Estão nos anexos para você conferir:
   - `recados/anexos/2026-11-11-T-0159-pdf-proposta-2-cliente.png`
   - `recados/anexos/2026-11-11-T-0159-pdf-proposta-2-escritorio.png`
   - `recados/anexos/2026-11-11-T-0159-pdf-proposta-2-orcamento-cliente.png`
   - `recados/anexos/2026-11-11-T-0159-pdf-proposta-2-orcamento-escritorio.png`
4. **Versão:** a T-0159 está no build das 05h. O "v1.0.4" que ainda aparece no título do designer está superado.
5. **Diagnóstico:**
   - o botão do app tem flag próprio, `MACUXI_DIAGNOSTICOS_APP`, desligado e fora da demo; o build sai com a constante `false`;
   - nada aparece no app sem a sua decisão; para ligar depois, não precisa de APK novo;
   - o portal do super-admin pode ficar ligado na demo.
6. **Vagas (~01h15):**
   - **banco-dados (relançado):** campo das 5 saídas do diagnóstico na 0058 e RD-0108, até 02h00. A 0061 (filial nos itens do pedido, para a soma da reserva) já está entregue.
   - **modulo-core:** RD-0114 a RD-0117 e RD-0122, que inclui tirar o aviso "filial padrão" errado do BKO.
   - **Seguem:** os dois do vendedor, engenheiro-software, engenheiro-apps, os dois testes, o corretor, o designer e a integração (tarefa curta). Alguns estão parados esperando a suíte de testes rodar.

## Pronto quando
No BUILD PRONTO vai a situação de cada item.
