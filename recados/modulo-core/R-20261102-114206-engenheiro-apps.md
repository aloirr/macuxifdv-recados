---
id: R-20261102-114206-engenheiro-apps
de: engenheiro-apps
para: [modulo-core]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0060
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-02T11:42:06-04:00
---
# Cadastro incompleto: etiqueta e Observações prontas em packages/ui para plugar na carteira e no Cliente 360 (app e BKO)

## Contexto
T-0060 item 6 / RN-CORE-17. O componente comum está pronto em `packages/ui` (mobile e web). As telas de cliente são suas (`modules/core/app` e `modules/core/web`); a regra continua no seu domain (`cadastroCompleto`, `observacaoComCadastro`). O kit só exibe o que a tela entrega e funciona offline (tudo vem do pull do `cliente`).

## O que preciso / o que mudou
Componentes novos (mesmos nomes no app e no BKO):
- `EtiquetaCadastroIncompleto` — badge de atenção "Cadastro incompleto"; o leitor de tela lê "Cadastro incompleto: pedido só como orçamento até o cadastro ser completado no ERP." (testID/data-testid `etiqueta-cadastro-incompleto`).
- `ObservacoesCliente({ automatica, texto, titulo? })` — seção "Observações" com a linha automática em destaque no topo e o texto do ERP intacto abaixo (selecionável no app, quebras preservadas no BKO); sem nada, "Sem observações.". Passe `automatica = observacaoComCadastro(null, c.cadastro_campos_faltantes ?? [])` e `texto = c.observacao`. Se preferir passar o texto já montado (`observacaoComCadastro(c.observacao, faltantes)`), a linha automática repetida no começo sai do corpo (`blocosDeObservacao`), então ela nunca aparece duas vezes.
- Puros, se precisar em lib/teste: `@macuxi/ui/mobile/puro` exporta `blocosDeObservacao`, `ROTULO_CADASTRO_INCOMPLETO`, `DESCRICAO_CADASTRO_INCOMPLETO`.

Onde plugar:
1. App, carteira (`modules/core/app/telas/clientes.tsx` ~linha 181, junto dos badges "Bloqueado"/"vencidos"): `{c.cadastro_incompleto ? <EtiquetaCadastroIncompleto /> : null}`, de `@macuxi/ui/mobile`.
2. App, Cliente 360 (`modules/core/app/components/cliente360.tsx` ~linhas 52-55, badges do cabeçalho): a mesma etiqueta; e uma seção `<ObservacoesCliente automatica={...} texto={c.observacao} />` (sugestão: logo depois de Contatos). Vale para Campo e Gestão (mesmo componente).
3. BKO, lista da carteira (`modules/core/web/components/carteira/carteira-page.tsx` ~linha 206, ao lado de "Sem coordenada") e Cliente 360 (`modules/core/web/components/cliente360/cliente360-page.tsx`: etiqueta no `badge` do `PageHeader` linha 39 — junte com "Bloqueado" num fragmento — e `<ObservacoesCliente .../>` como Panel depois de Contatos), de `@macuxi/ui/web`.
4. Os campos vêm de `ClienteSync`/`Cliente360` (`cadastro_incompleto`, `cadastro_campos_faltantes`, `observacao`, opcionais). Linha antiga sem os campos = sem etiqueta e sem linha automática.

## Pronto quando
Etiqueta na carteira e no Cliente 360 (Campo, Gestão e BKO) quando `cadastro_incompleto`; Observações com a linha automática no topo e o texto do ERP intacto; teste seu com um cliente sem CEP (demo) mostrando etiqueta e linha, e um completo sem nenhuma das duas. Depois eu reviso as telas (🔴/🟡/🟢).
