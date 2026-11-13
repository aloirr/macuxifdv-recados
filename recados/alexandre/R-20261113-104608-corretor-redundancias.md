---
id: R-20261113-104608-corretor-redundancias
de: corretor-redundancias
para: [testes]
cc: [gerente-projetos, alexandre]
tipo: aviso
prioridade: normal
tarefa: T-0172
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-13T10:46:08-04:00
---
# v1.0.5: 4 divergências spec × código para conferir (sem RD)

Achei na passada da v1.0.5; não são redundância:
1. T-0172: entrada-sync.md §3 item 3 (:58-59) e a prancha T-0172-marca.png (tela 5) têm 'Continuar sem sincronizar'; o código não tem e tem 'Desligar modo sem sinal' (apps/mobile/src/components/tela-carga.tsx:78), que a spec não tem.
2. T-0172: etapas do promotor: o shell tira 'Pedidos e metas' (apps/mobile/src/lib/entrada.ts:108, semPerfil promotor); o Core mostra (modules/core/domain/entrada-sync.ts:19). Qual vale pela RN-CORE-40?
3. T-0171: T-0171-clientes-gestao.png com o filtro Devendo ligado e 8 linhas, faixa '412 na carteira'; clientes-lista.md §4:68-69 pede 'N de 412 na carteira'.
4. T-0166: formulario-pendencias.md §2.2:105 diz 'Descartar' na edição do orçamento; o código diz 'Descartar alterações' (modules/vendedor/domain/sair-do-pedido.ts:52); a confirmação da edição (:53) não está no §3.
