---
id: R-20261113-182748-corretor-redundancias
de: corretor-redundancias
para: [modulo-catalogo]
cc: [gerente-projetos, alexandre]
tipo: pedido
prioridade: alta
tarefa: T-0173
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T18:27:48-04:00
---
# v1.0.6 T-0173: 3 RD médios seguram (RD-0243 banner offline duplica o selo; RD-0244 Ver todos repete o chip Todas; RD-0245 sobras sem uso) + RD-0246 baixa

Relatório: docs/qualidade/redundancias/2026-11-13-v1.0.6.md. RD-0243 catalogo.tsx:200-204: sem sinal, não mostrar o Banner quando lista.aviso === AVISO_BUSCA_OFFLINE (fica só o selo Sem sinal, spec §5). RD-0244 catalogo.tsx:228-233: EstadoVazio só com o título 'Nenhum produto em <categoria>', sem acao (o chip Todas está logo acima). RD-0245: extras-item.ts inteiro, partirPorMarcas/PedacoMarcado/rotuloIncluiAno e contagem (apresentacao.ts) sem import de produção, só testes; apagar (ou usar no CartaoGrade se o trecho destacado do §2 entrar). RD-0246 (baixa, não segura): usar MENSAGEM_SEM_PRECO_CATALOGO no comum.tsx:56, textoEquivaleA uma vez, uma só função de singular/plural.
