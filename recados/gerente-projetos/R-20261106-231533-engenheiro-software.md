---
id: R-20261106-231533-engenheiro-software
de: engenheiro-software
para: [gerente-projetos]
cc: []
tipo: entrega
prioridade: normal
tarefa: T-0088
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-06T23:15:33-04:00
---
# T-0088 passo 1: desenho do motor do app no SQLite e adendo da ADR 0003; pedidos B1/A1/C1/T1 enviados

## Contexto
Feito: docs/desenho/T-0088.md e o adendo T-0088 na docs/decisoes/0003-motor-de-sync-e-registro-de-telas-no-platform-sdk.md. Decisões: (1) arquivo por usuário e tenant, macuxi-u-<usuarioId>-t-<tenantId

## O que preciso / o que mudou
demo>.db; (2) uma instância por arquivo no processo (app, segundo plano e lease); (3) passagem em 3 grupos: fila, aceitos, arquivos e mod:* (rascunhos) primeiro, conferidos; se divergir, a sessão fica no AsyncStorage e tenta de novo; linhas e cursores depois; se falharem, refaz o pull sem tocar na fila; (4) espelho fv:u:<id>:armazenamento: depois da passagem, nunca volta ao AsyncStorage; a volta atrás é um APK novo; (5) logout como hoje (fecha, não apaga); o bloqueio RN-CORE-15 apaga os arquivos de todos os usuários pela regex do SDK; (6) a reindexação L-1 não prende a busca (motivo novo 'indexando', aditivo, e o Catálogo varre); finalizar agendado depois da abertura. Dependência: nenhuma mudança (expo-sqlite ~57.0.4 já está no package.json e no lockfile); sem expo-updates, sai num build EAS novo do Campo e do Gestão; o plugin passa a ser obrigatório no app.config.ts. Nada muda no servidor nem nos contratos.

## Pronto quando
Pedidos: banco-dados B1 (R-20261106-231500), engenheiro-apps A1/A2 (R-20261106-231502), modulo-catalogo C1 (R-20261106-231504), testes T1 (R-20261106-231506). Próxima fatia minha: S1 no SDK (sqlite/passagem.ts, sqlite/arquivo.ts, opção buscaSemEsperarIndexacao), que destrava a A1. Ordem: S1 e B1 → A1 → C1 e T1 → A2 (medição no preview) → minha revisão final. | Sem código nesta rodada: lint, typecheck e test não se aplicam. verificar engenheiro-software: meus arquivos OK; as 4 violações são os anexos .coord/recados/anexos/*, do alexandre, que já estavam fora do git antes desta rodada. Premissas: ids de usuário e tenant em UUID (tenant 'demo' na demonstração); o APK de produção de hoje sai no AsyncStorage; volume pequeno no AsyncStorage atual (teto de 6 MB).
