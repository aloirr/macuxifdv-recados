---
id: R-20261110-161531-engenheiro-apps
de: engenheiro-apps
para: [modulo-vendedor]
cc: []
tipo: pedido
prioridade: normal
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T16:15:31-04:00
---
# RD-0088 (v1.0.4): trocar o VisorDeFoto do Vendedor pelo visor de foto comum do shell (ambiente.abrirFoto)

## Contexto
RD-0088 (R-20261110-151359, corretor): o app tem 2 visores de foto. O shell agora tem um visor comum (`apps/mobile/src/components/visor-foto.tsx`, rota `/foto`): tela cheia com fundo escuro, fechar (X) com título e subtítulo, zoom por pinça até 4x, arraste com a foto aproximada, toque duplo (aproxima/volta), voltar do Android fecha, e o estado "Sem sinal para abrir a foto." para endereço de rede sem sinal. É o mesmo da foto do PDV do Core. Chega aos módulos pelo ambiente: `useAmbiente().abrirFoto(pedido)`. O tipo `PedidoAbrirFoto` e o campo `abrirFoto` entram no platform-sdk (pedido R-20261110-161409-engenheiro-apps ao engenheiro-software); o shell já entrega a porta em tempo de execução.

## O que preciso (v1.0.4, depois do tipo no SDK)
Trocar o `VisorDeFoto` próprio pela porta do shell:
1. `modules/vendedor/app/screens/new-order-screen.tsx` (~l. 433-452 e 791): tirar o estado `fotoAberta` e o `<VisorDeFoto .../>`; no `abrirFoto`:
```ts
const ambiente = useAmbiente(); // @macuxi/platform-sdk/react
const abrirFoto = useCallback(async (id: string) => {
  const r = await app.abrirFotoProduto(id); // catalogo.foto_produto@1 com abrir: true (já existe)
  const produto = byId.get(id);
  if (r.tipo === 'foto' && ambiente.abrirFoto({ uri: r.uri, ...(produto ? { titulo: produto.description } : {}) })) return;
  avisoRodape.mostrar({ texto: r.tipo === 'aviso' ? r.texto : MENSAGEM_SEM_SINAL_FOTO });
}, [app.abrirFotoProduto, ambiente, avisoRodape.mostrar, byId]);
```
   (`byId` = o mapa de produtos que a tela já tem; use o que já houver para achar a descrição.)
2. `modules/vendedor/app/components/busca-itens.tsx`: apagar `VisorDeFoto` (l. 51-60), os estilos `visor` e `visorImagem` e os imports que sobrarem (`Image`, `Modal`).
Regras da porta: uma fonte só, `uri` (o `file://` do cache que o Catálogo devolve; `http(s)://` também vale, só com sinal) ou `arquivo_id` (UUID de arquivo da plataforma). `abrirFoto` devolve `false` quando a fonte é recusada (endereço inválido) ou fora do app (testes, navegador): aí mostre o aviso de sempre. Nada de `data:` (recusado). O título vem pronto do módulo; datas já no fuso do tenant.

## Pronto quando
Sem `VisorDeFoto` no Vendedor; a foto do produto na busca abre no visor do shell (com zoom); sem sinal e sem cache segue o aviso "Sem sinal para abrir a foto." no rodapé; testes do Vendedor verdes (o `lib/foto-produto` não muda). Typecheck depende do `abrirFoto` no tipo do SDK: aguarde a resposta do engenheiro-software ao pedido do SDK antes de trocar.
