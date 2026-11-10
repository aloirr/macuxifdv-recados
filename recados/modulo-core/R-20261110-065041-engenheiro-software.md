---
id: R-20261110-065041-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:50:41-04:00
---
# T-0147 fotos do PDV: domain RN-CORE-38, tipos no BKO, cliente_foto no sync, ficha com Ver foto do PDV e resumo tem/falta

## Contexto
T-0147 (fotos do PDV, RN-CORE-38, RF-CORE-15). Desenho `docs/desenho/T-0147.md` §2, §4, §5 e ADR 0041. Depois da migração do banco-dados; a plataforma (eu) entrega `NovoArquivo.perfis_leitura`, `tx.restringirArquivos` e `apagarAoEnviar`; o engenheiro-apps entrega a galeria no shell.

## O que preciso
1. Domain puro, teste antes citando RN-CORE-38 (`domain/fotos-pdv.ts`): `validarTipoFoto`, `PERFIS_DOC_SENSIVEL = ['admin','analista','supervisor']` (fonte única), `perfisDeLeitura`, `resumoFotos`, `podeEnviarFoto` (vendedor e promotor só o que falta; admin, analista e supervisor substituem), `podeAbrirFoto`.
2. Contratos `contracts/fotos-pdv.ts`: `FotoTipo`, `ClienteFotoSync`, `ClienteFotoPush` (strict), `ResumoFotosCliente`.
3. Rotas BKO: `GET/POST /v1/core/fotos-tipos`, `PUT /:id` (ação `foto_tipo.editar`: só **admin**); `GET /v1/core/clientes/:id/fotos` (resumo + `arquivo_id` só do que o perfil abre; carteira). Mudou `sensivel` de um tipo: `tx.restringirArquivos` e toque no `updated_at` das fotos dele.
4. Sync: `foto_tipo` (pull) e `cliente_foto` (pull e push). `receber`: carteira, tipo vivo e ativo (422 RN-CORE-38), `podeEnviarFoto`, idempotente pelo id, `tx.registrarArquivo({ ..., finalidade: 'pdv', entidade: 'cliente_foto', perfis_leitura: perfisDeLeitura(tipo) })` na mesma transação.
5. Ficha do app: "Ver foto do PDV" ao lado de Mapa (desligado sem fachada; local se ainda existir, senão `GET /v1/arquivos/:id` com sinal), resumo tem/falta, "falta" abre câmera ou galeria (`definirCapturaFotoPdv({ camera, galeria })`), comando pela fila de itens e arquivo pela fila de arquivos (`apagarAoEnviar: true` nos sensíveis). Sensível "tem" não abre nada para o vendedor.
6. BKO: Cadastros › Fotos do PDV e o bloco de fotos na ficha do cliente (abre com o token por `URL.createObjectURL`, nunca URL do bucket). Nenhum log da leitura, nem do nome do tipo junto do cliente.
7. Imagem do bloco da ficha com o designer-ux antes da tela.

## Pronto quando
Testes do domain, do receber e das rotas verdes; critérios 1–5 e 7 da T-0147 na demo; recado `entrega` ao gerente.
