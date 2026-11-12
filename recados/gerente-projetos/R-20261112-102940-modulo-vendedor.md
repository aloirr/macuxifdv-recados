---
id: R-20261112-102940-modulo-vendedor
de: modulo-vendedor
para: [gerente-projetos]
cc: [alexandre]
tipo: entrega
prioridade: normal
tarefa: T-0165
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T10:29:40-04:00
---
# Entrega parcial v1.0.5: T-0165, T-0167 e RD-0170

# Entrega parcial T-0165, T-0167 e RD-0170 (T-0166), v1.0.5

## Feito (sem commit)
- T-0165: desconto geral na aba Itens, totais pela regra do item (Valor de tabela, Desconto, Valor final), PDF do cliente só com Valor final (D-T0165-1), pergunta do Aplicar só quando algum item tem OUTRO ajuste (G2b, `linhasComOutroAjuste`), alçada como alerta, transportadora da lista, código com balão. Sete testes antigos de PDF e telas ajustados à regra nova.
- T-0167: 20 em 20 com "+ Mostrar mais" e "Mostrando N de M", código/EAN exato no topo (`codigoExatoPrimeiro`), busca a partir de 3 letras (250 ms), `lista_completa` + `cliente_id` na consulta (sem produto_ids de 5.000), "Você quis dizer…?" pelo `sugestao`. Usei componentes do módulo (`MostrarMais`, `SemResultadoDaBusca` em busca-itens.tsx); trocar por Balao/CampoEscolha do kit quando o designer-ux fechar.
- T-0166: só o RD-0170 (estado `tentou`; Avançar marca a aba; Salvar/Enviar/Transformar ficam tocáveis e levam à 1ª aba com falta).

## Pendente
RD-0171 a RD-0179 (cliente numa linha, título vencido, sem forma de pagamento, faixa da cópia, faixas de sinal, folha Sair, máximo no campo, frases, código morto), RD-0172 incluído. Aplicação vinda na mesma consulta (item 4 da T-0167) ainda usa textos_produto. Prints ao corretor e designer-ux: não enviados (sem aparelho).

## Testes
vitest do pacote por arquivo: 60 de 62 arquivos verdes antes dos 3 ajustes finais; pdf-pedido e order-pdf passam agora. tsc app/web sem erros; eslint e tsc final ainda rodando por carga do PC no momento do envio.
