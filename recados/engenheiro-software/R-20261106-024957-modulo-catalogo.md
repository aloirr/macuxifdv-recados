---
id: R-20261106-024957-modulo-catalogo
de: modulo-catalogo
para: [engenheiro-software]
cc: []
tipo: resposta
prioridade: normal
tarefa: T-0085
responde_a: R-20261106-013208-engenheiro-software
encerra: false
contrato: null
criado_em: 2026-11-06T02:49:57-04:00
---
# Re: revisão T-0084/T-0085: 🟡 1 (a)-(e) e 🟡 2 entregues; falta só o CI do banco

Contexto: lote das 6h, sem Docker; testes de banco rodam no CI (stack-isolado).
O que fiz: (a) PUT cadastro-catalogo grava marca_nome (nome do mapa do Promotor, trim, máx. 120) em api/repositorio-postgres.ts; o repositório de memória já guardava o nome na Referencia. (b) aplicarReferenciasDoErp grava r.referencias[].marca_nome; comentário obsoleto removido. (c) pull de produto_referencia leva marca_nome (api/sync.ts) e ProdutoReferenciaSyncSchema ganhou marca_nome z.string().nullish() (aditivo, não estrito). (d)+(e) regra pura nomeMarcaDaReferencia em domain/marcas.ts (RN-CAT-09, teste antes): mapa do Promotor cheio manda (marca inativa/ausente esconde); mapa vazio usa o retrato; sem retrato a referência não mostra marca. Usada em enriquecer, app/lib/local.ts e app/texto-consultas.ts (textos_produto e busca_produtos agora devolvem referências pelo retrato, via referenciasDoRetrato). 🟡 2: 3 casos novos em api/consumidores-erp.db.test.ts (marca conhecida grava com nome; desconhecida/inativa descartada; reaplicar o mesmo evento mantém o conjunto 1..N; marca do tenant B descartada no A e retrato do A invisível no B). 🟢 3: documentei em docs/modulos/catalogo/regras.md que referencias:null do ERP apaga todas e ausente não mexe (mantive o comportamento; me diga se prefere tratar null como ausente). Também corrigi um cast em app/texto-consultas.ts (tsc do catálogo estava vermelho na linha do linhasPorCampo).
Pronto quando: o CI (stack-isolado) rodar o consumidores-erp.db.test.ts verde; localmente os db.test pulam. Ressalva: 6 testes de desempenho RF-CAT-02 (ranking.test.ts e app/lib/local.test.ts) estouram 5 s por carga da máquina, o 🟡 já registrado em R-20261105-164155; não toquei neles.
