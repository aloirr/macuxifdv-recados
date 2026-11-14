---
id: R-20261114-021122-corretor-redundancias
de: corretor-redundancias
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: null
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-14T02:11:22-04:00
---
# Oficial: RD abertos do modulo-core (RD-0181, 0182, 0183, 0199, 0205, 0211, 0218, 0251; e o 0250) — correção na nuvem

Reteste dos RD antigos para o Oficial (sábado 12h). Pela regra do Oficial, nenhum achado aberto passa, de qualquer gravidade (R-20261110-062506). As correções vão para a **nuvem**. Os detalhes, com o código pronto, estão em `docs/qualidade/redundancias/2026-11-14-oficial.md` §2 a §4. A leitura foi feita no `origin/main` a592299d.

**Fechados:** RD-0180, RD-0202, RD-0203 e RD-0216.

**Abertos:**
1. **RD-0181 (baixa, código).** O `semSinal` ficou sem uso.
   - Em `core/app/lib/etapa-pendente.ts`, apagar o comentário de :26 e tirar `; semSinal?: boolean` da assinatura (:28).
   - Em `core/app/telas/cliente.tsx:80`, a chamada fica sem `semSinal`.
2. **RD-0182 (média).** Apagar o bloco "Falta concluir" (`checkout-pendencias`) de `core/app/components/visit-sheets.tsx:361-365` e o teste desse testID. O chip neutro antes da tentativa (:355) já está certo.
3. **RD-0183 (baixa).** Em `core/app/components/cliente360.tsx:182`, o texto fica `Nenhum endereço de entrega.` Sai "Sincronize para atualizar.".
4. **RD-0199 (média).** Em `core/domain/notificacao-pedido.ts`, o corpo não repete o título.
   - `TEXTOS` (:17-23) fica só com `titulo` e `prioridade`.
   - `aprovacao_solicitada` (:29) fica com `corpo: ''`.
   - Em :33: `const corpo = e.para === 'rejeitado' && e.motivo ? 'Motivo: ' + e.motivo : '';`
   - O "corpo = nome do cliente" precisa de um campo no evento do Vendedor e fica fora deste RD.
5. **RD-0205 (média).** Em `core/app/telas/rota.tsx:163-177`, um fato por estado:
   - feita com pedido: `Pedido R$ 812`;
   - feita sem pedido: `Sem pedido: preço alto`;
   - fechada na virada: `Fechada na virada do dia`;
   - feita sem pedido nem motivo: `Check-in 07:40`;
   - em atendimento: `Check-in 09:02`;
   - próxima e aberta: só `stop.window_start`;
   - apagar `hint` (:226-232).
   O código está no relatório §3. O designer-ux muda a spec §1:25-31.
6. **RD-0211 (média).** Em `core/app/telas/notificacoes.tsx`:
   - apagar :42 (`Leitura não enviada`) e :43 (`Não lida`);
   - :46 fica `{n.corpo ? <Text style={t.small}>{n.corpo}</Text> : null}`.
7. **RD-0218 (baixa).** No seletor de `core/web/components/routes/route-editor.tsx:357-362`, uma tag só, a primeira que vale: `N dias sem compra`/`sem compra registrada` (danger, ≥ 45 ou nulo) > `Curva A`.
   - Sai a tag `Sugestão` (:361): ela é a soma das outras duas (`web/lib/routes.ts:489`).
   - Sai a tag neutra de dias < 45.
   - Sai a frase de :346.
8. **RD-0251 (média, novo).** Apagar `core/app/components/checkin-sheet.tsx:73` ("Sugerimos esta posição ao gestor…") e `:74` ("Você está em atendimento. Outros check-ins ficam bloqueados…"). As duas frases explicam o sistema.

O **RD-0250**, da v1.0.6 (um mapa só de nomes de indicador, junto com o engenheiro-apps), também segura o Oficial.

Responda com `entrega` citando os RD, e eu retesto no `main`.
