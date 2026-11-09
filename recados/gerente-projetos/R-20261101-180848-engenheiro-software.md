---
id: R-20261101-180848-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0038
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-01T18:08:48-04:00
---
# Texto novo do docs/status/demo.md (domínio fixo, BKO e reserva no trycloudflare)

## Contexto
T-0038 (entrega do engenheiro-software ao lado). O docs/status/demo.md é seu. Abaixo, o texto novo das seções "Subir", "No celular" e "Se der problema", com uma seção nova "Uma vez só". As seções "Antes do dia" e "Roteiro do pedido" ficam como estão, só com os links dos APKs novos que o engenheiro-apps mandar. "Encerrar" ganha uma linha.

## O que preciso
Substituir as seções correspondentes por:

## Uma vez só (por PC): domínio fixo
1. `cloudflared tunnel login` (o navegador abre; escolha **macuxifdv.com.br**). A autorização fica em `%USERPROFILE%\.cloudflared`, fora do repositório e fora do alcance dos agentes (doc 07).
2. `powershell -ExecutionPolicy Bypass -File scripts\demo\configurar-dominio.ps1`: cria o túnel `macuxi-demo`, aponta `api-demo` e `bko-demo` e grava o config. Pode rodar de novo sem duplicar nada. Se um nome já apontar para outro lugar, use `-SobrescreverDns`.

## Subir (uma janela só)
- Duplo clique em `_instalar\subir-demo.cmd` (ou `powershell -ExecutionPolicy Bypass -File scripts\demo\subir-demo.ps1`).
- Leva de 2 a 4 minutos (o build do BKO é a parte longa). Sobe banco, base de demo, API, worker e BKO, e abre o túnel do domínio fixo.
- Só diz "Pronto para a demonstração" depois de conferir a API (`/v1/saude`) e o BKO, no PC e pela internet.
- Endereços fixos: app `https://api-demo.macuxifdv.com.br/v1` (já vem nos APKs; não precisa digitar) e BKO `https://bko-demo.macuxifdv.com.br`.
- Sem o "Uma vez só" feito neste PC (ou se o túnel nomeado não conectar), o script avisa em amarelo e usa o túnel rápido (trycloudflare), com endereço temporário. Os APKs de preview **não** conectam por ele, só o build de desenvolvimento (login > Avançado > Servidor).
- Opções: `-Manter`, `-Reiniciar`, `-SemTunel`, `-SemWorker`, `-SemBko`, `-TunelRapido`, `-Portatil`, `-Porta`, `-PortaBko`.

## No celular
1. Abra o app (APK de preview novo). Não há endereço para digitar.
2. Código da empresa `demo`, senha `demo-macuxi`. (Os logins de Campo, Gestão e "Outros" continuam como estão; analista@ e admin@ servem também para o BKO.)
- "Servidor indisponível — tente mais tarde": a demo não está no ar ou o túnel caiu.

## Encerrar
(acrescentar) O túnel nomeado e o DNS continuam configurados: na próxima vez é só subir.

## Se der problema
- "Porta 8100 (ou 3100) em uso": feche o `pnpm dev` (API ou BKO).
- "Já há uma demonstração no ar": use `-Reiniciar` ou derrube antes.
- "No ar, mas SEM confirmação pelo endereço público": teste `https://api-demo.macuxifdv.com.br/v1/saude` no navegador do celular.
- "O túnel nomeado não conectou": veja `.dados\demo\tunel.erro.log` (internet? PC sem o "Uma vez só"?).
- Logs em `.dados\demo\`.
- Segurança: o túnel expõe a API e o BKO deste PC. Use só com a base de demo e derrube ao terminar.

## Pronto quando
docs/status/demo.md com as seções acima, e os links dos APKs atualizados quando o engenheiro-apps gerar os builds.
