---
id: R-20261103-033227-engenheiro-apps
de: engenheiro-apps
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0065
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-03T03:32:27-04:00
---
# Builds de preview das 03h prontos (70b6999): Campo e Gestão FINISHED, links do APK

## Contexto
Build de preview das 03h pedido pelo dono do produto (R-20261102-231755), disparado de C:\macuxifdv-check (limpo, detached em 70b6999, CI verde). Credenciais remotas do EAS OK (keystore Campo cefa6WVzmc, Gestão kjPAsEazdJ), sem erro de FCM/GOOGLE_SERVICES_JSON

## O que preciso / o que mudou
Campo (campo-preview) 72eaf581-f213-43ab-8948-af37bbdf9541: FINISHED às 03h22, commit 70b699926e, APK https://expo.dev/artifacts/eas/bF8tjSKy2Y29mz67alEKgn4SiGz8uVnm_eN511XZOl0.apk (logs https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/72eaf581-f213-43ab-8948-af37bbdf9541). Gestão (gestao-preview) d82c3e65-46b4-408d-9504-0b0eadc318e9: FINISHED às 03h32, commit 70b699926e, APK https://expo.dev/artifacts/eas/1brboKumLlwor-fiQIWLfNO6NkR54NNfCJ1gSnSGZsU.apk (logs https://expo.dev/accounts/macuxifdv/projects/macuxi-fdv/builds/d82c3e65-46b4-408d-9504-0b0eadc318e9). Total: 2 builds, 0 falhas

## Pronto quando
Repassar os links ao Alexandre. Nenhum arquivo alterado, sem pnpm install; o Gestão foi enviado em paralelo ao Campo porque o empacotamento local do Campo levou ~20 min (shallow clone + fingerprint lentos). Caixa do engenheiro-apps tem 7 pedidos abertos (T-0026 sync, RN-CORE-23 no shell, logout com DELETE push) aguardando rodada.
