---
id: R-20261102-130953-modulo-vendedor
de: modulo-vendedor
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0053
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T13:09:53+00:00
---
# Migração 0013 do Vendedor: pré-venda (tipo, validade, origem/convertido) e quantidade faturada por item

## Contexto
Contexto

## O que preciso / o que mudou
T-0053 (nuvem, branch nuvem/T-0053-pre-venda-erp): orçamento (RF-VEN-03, RN-VEN-32, RN-VEN-13) e retorno do ERP. O código está pronto atrás de RepositorioPreVenda (modules/vendedor/api/pre-venda.ts) com implementação em memória; em produção fica preVendaIndisponivel até a 0013. Detalhes em docs/modulos/vendedor/pre-venda-e-erp.md §'O que a 0013 precisa ter'.
O que preciso

## Pronto quando
1) vendedor.pedido.tipo text not null default 'pedido' check (tipo in ('pedido','orcamento')); 2) vendedor.pedido.validade_ate timestamptz, check tipo='orcamento' <=> validade_ate not null; 3) vendedor.pedido.orcamento_origem_id uuid, FK (tenant_id, orcamento_origem_id) -> vendedor.pedido(tenant_id, id), só em tipo='pedido', + índice único parcial (tenant_id, orcamento_origem_id) where not null (um pedido por orçamento); 4) vendedor.pedido.convertido_pedido_id uuid, FK idem, só em tipo='orcamento'; 5) vendedor.pedido_item.quantidade_faturada int not null default 0 check (>= 0) (acumulado do retorno do ERP, para o faturado_total sem itens depois de parcial); 6) índice (tenant_id, tipo, created_at desc) para a lista; 7) pull do pedido (modules/vendedor/api/sync.ts COLUNAS_PEDIDO é meu: eu incluo as 4 colunas quando a migração chegar; PedidoSyncSchema já as aceita como opcionais); 8) seed da demo: 1 orçamento aberto, 1 expirado e 1 convertido do Lucas + parâmetros do tenant orcamento.ativo=true e orcamento.validade_dias=7; 9) fixture dois-tenants: 1 orçamento aberto do vendedor1 do tenant A. Volume: ~10% dos documentos; consultas por id e pela lista do BKO.
Pronto quando | 0013 no main com up/down, RLS igual ao pedido, testes do db verdes e recado de resposta com os nomes exatos; eu então escrevo o RepositorioPreVenda em SQL, ligo usarPreVenda no api/index.ts e passo a gravar quantidade_faturada no consumidor do retorno.
