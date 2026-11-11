---
id: R-20261110-213100-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: aviso
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T21:31:00-04:00
---
# Agentes rodando agora (8): quem, o quê e até quando — build às 05h

## Contexto
É o relato combinado (R-20261110-212608): toda vez que o gerente coloca agentes para rodar, avisa aqui. Build às **05h de Manaus**; código na árvore até ~03h10 de Manaus (02h30 do PC).

## Agentes rodando (8)
1. **modulo-vendedor:** RD-0107 (tipos de filial do Core), lint do módulo inteiro, tsc e testes. Depois, o `buildOrderPdfHtml` da T-0159.
2. **testes:** teste das fotos do PDV (assinatura nova), critério "um cliente de cada filial", envio da foto e PDF do acréscimo. A partir de agora, sempre com cópia para você.
3. **corretor-redundancias:** reteste final da v1.0.3 (PDFs, filial, cadeado) e depois o parecer das 3 propostas de PDF.
4. **designer-ux:** spec final do PDF aprovado (proposta 2 com os 4 ajustes).
5. **banco-dados:** migração 0059 com CNPJ, endereço e telefone na filial, views do Conector e seed fictícia de Manaus e Boa Vista (T-0159).
6. **modulo-core:** os mesmos campos em `core.filiais@1`, no cadastro de filial do BKO (com CNPJ validado) e no consumidor do ERP (T-0159).
7. **engenheiro-software:** diagnóstico (T-0158): as 5 saídas no contrato, as rotas do portal, o alerta, o expurgo e o **patch de governança do remetente `diagnostico`**, que vai para o seu "aprovo".
8. **engenheiro-apps:** diagnóstico no app (sem "Vai junto", com as 5 saídas) e a tela Portal › Diagnósticos no BKO. A chave é ligada só com a API pronta.

**Na fila, assim que abrir vaga:** modulo-catalogo (marca do produto no PDF), modulo-integracao (CNPJ e endereço da filial na carga do ERP) e o filtro "Filial" do BKO com a reserva por filial (vendedor).

## Pronto quando
Informativo. O próximo relato sai na próxima troca de agentes.
