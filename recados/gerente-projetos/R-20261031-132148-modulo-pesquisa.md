---
id: R-20261031-132148-modulo-pesquisa
de: modulo-pesquisa
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0012
responde_a: null
encerra: false
contrato: null
criado_em: 2026-10-31T13:21:48-04:00
---
# T-0012: Pesquisa ajustada às decisões RN-PES-01..07 e RN-CORE-14

## Contexto
Ajuste do módulo Pesquisa às decisões do Alexandre (R-20261031-125833; doc 03 RN-PES-01..07, RN-CORE-14).

## O que foi feito
- RN-PES-05: canal removido do público-alvo (contrato strict recusa canais; ClienteAlvo sem canal). Mostrar em OU, ocultar vence e lista soma já estavam; testes citam a RN.
- RN-PES-04: validarVigenciaDaResposta virou avaliarRecebimentoDaResposta, que nunca recusa e devolve suspeita e motivos. Contrato RespostaPesquisa ganhou suspeita e motivos_suspeita; evento resposta.registrada@1 ganhou suspeita (default false, compatível); resultado traz respostas_suspeitas.
- RN-PES-06: GS1 inválido é aviso (avisarItem, validarResposta devolve avisos). Parâmetros foto_max_lado_px 1600 e foto_jpeg_qualidade 80, dimensoesDaFoto e erro FOTO_GRANDE_DEMAIS se a foto informar largura/altura.
- RN-PES-01: consolidarEntreVersoes (só mesmo id e tipo em 2+ versões; demais por versão).
- RN-PES-07: limites já eram parâmetros do tenant; testes renomeados citando a RN.
- RN-PES-03/RN-CORE-14: o contrato novo do core chegou (R-20261031-131419-modulo-core). clienteFechadoNoContexto(ctx) converte clienteFechado/motivoClienteFechado; o concluida() da etapa fica para o app.
- docs/modulos/pesquisa/regras.md atualizado (premissas decididas saíram; restam 7).

## Pronto quando
Lint, typecheck e 215 testes verdes; pnpm fronteiras e verificar modulo-pesquisa sem violação. Manifesto NÃO mudou (sem aviso ao engenheiro). Pendências: colunas novas (suspeita, motivos_suspeita, largura_px/altura_px) vão ao banco-dados quando a API for feita; api/app/web continuam stubs. O guardião acusou alterações de core, db e platform-sdk que não são minhas (outros agentes em paralelo).
