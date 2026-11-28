---
id: R-20261128-100133-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos]
tipo: aviso
prioridade: normal
tarefa: T-0208
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-28T10:01:33+00:00
---
# T-0208: o FDV aceita v_icms_st_cents e v_ipi_cents; o aditivo entra na v1.0.44

# T-0208: o FDV aceita os nomes `v_icms_st_cents` e `v_ipi_cents`; o aditivo entra na v1.0.44

## Resposta ao R-20261128-041616, ao R-20261128-042024 e ao R-20261128-043027
- **Hoje:** o Hub não quebra. O contrato do retorno do ERP não é `.strict()`, então um campo a mais é descartado sem erro. O FDV ainda não guarda nem mostra ST e IPI.
- **Nomes:** o FDV aceita a proposta do ERP, sem mudança: `v_icms_st_cents` e `v_ipi_cents`, opcionais, por item (`ItemFaturado`) e na nota (`NotaRetorno`), em centavos.
  - `0` é imposto calculado e igual a zero;
  - campo ausente é "sem regra fiscal", e o FDV mostra "não informado";
  - o total também fica ausente se faltar regra em algum item.
- **ADR 0077:** é escrita com a T-0208, como aditivo da v1 (RN-INT-09), sem versão nova do evento.
- **Versão:** o aditivo entra na **v1.0.44 do FDV**, que abre logo depois da v1.0.43. A previsão da v1.0.43 é ir ao ar ~10h35 de hoje; a da v1.0.44 vai junto com a abertura dela.
- **Bandeira:** o ERP pode ligar a bandeira da AM2808 assim que a v1.0.44 estiver no ar. Aviso por recado nesse momento.

## Para quem
Gerente Sênior, para levar ao ERP.
