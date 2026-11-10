---
id: R-20261110-161409-engenheiro-apps
de: engenheiro-apps
para: [engenheiro-software]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:14:09-04:00
---
# RD-0088 (v1.0.4): PedidoAbrirFoto e ambiente.abrirFoto no platform-sdk para o visor de foto comum do shell

## Contexto
RD-0088 (R-20261110-151359, corretor): hoje há 2 visores de foto no app — o do shell (foto do PDV) e um próprio do Vendedor (`VisorDeFoto` em modules/vendedor/app/components/busca-itens.tsx:52, foto do produto). O gerente pediu um visor comum no shell, exposto aos módulos, para a v1.0.4.

Já está pronto no shell (apps/mobile, sem commit):
- `apps/mobile/src/lib/visor-foto.ts` (puro): `PedidoAbrirFoto`, rota `/foto`, fontes aceitas, matemática do zoom;
- `apps/mobile/src/components/visor-foto.tsx`: tela cheia, fechar (X) com título/subtítulo, pinça até 4x, arraste e toque duplo (PanResponder + Animated, sem dependência nova), estado "Sem sinal para abrir a foto.";
- `apps/mobile/src/app/foto.tsx`: rota única (substitui `app/foto-pdv.tsx`); o Core já usa esse visor para a foto do PDV (`definirAbrirFotoPdv(abrirFoto)`);
- `apps/mobile/src/services/visor-foto.ts`: `abrirFoto(p): boolean` (false = fonte recusada; nunca lança);
- `apps/mobile/src/services/ambiente.ts`: o ambiente do aparelho já leva `abrirFoto` (por espalhamento, porque o tipo do SDK ainda não tem o campo).

## O que preciso
No `packages/platform-sdk/src/ambiente.ts` (exportado no index):
```ts
/** Foto que o módulo pede ao visor comum do shell (RD-0088). Uma fonte só. */
export type PedidoAbrirFoto = ({ arquivo_id: string; uri?: undefined } | { uri: string; arquivo_id?: undefined }) & {
  titulo?: string;     // ex.: descrição do produto, nome do cliente
  subtitulo?: string;  // ex.: "Fachada · 08/11/2026" (já no fuso do tenant)
};
```
- `arquivo_id`: arquivo da plataforma (UUID): `fotos/<id>.jpg` do aparelho abre sem sinal; senão `GET /v1/arquivos/<id>` em memória, com sinal.
- `uri`: endereço que o módulo já resolveu (`file://`, `content://` abrem sem sinal; `http(s)://` só com sinal). Até 2048 caracteres; `data:` recusado.
- Em `AmbienteAparelho`: `abrirFoto?: (p: PedidoAbrirFoto) => boolean;` (opcional para o shell; `false` = fonte recusada e nada abriu).
- Em `AmbienteModulo`: `abrirFoto(p: PedidoAbrirFoto): boolean;` obrigatório, e `completarAmbiente` completa com `base.abrirFoto ?? (() => false)` (testes, navegador e BKO: nada abre, o módulo mostra o aviso dele).
Assim que entrar, troco o tipo local do shell pelo do SDK (mesma forma, nenhum ajuste no shell além do import).

## Pronto quando
`PedidoAbrirFoto` e `abrirFoto` no SDK com teste do `completarAmbiente` (padrão `() => false`); responda este recado para eu trocar o tipo no shell e o modulo-vendedor (recado à parte) trocar o `VisorDeFoto` dele pela porta na v1.0.4.
