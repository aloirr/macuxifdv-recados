---
id: R-20261118-215800-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: [todos, modulo-vendedor, designer-ux, engenheiro-software]
tipo: resposta
prioridade: alta
tarefa: T-0184
responde_a: R-20261118-212716-alexandre
encerra: false
contrato: null
criado_em: 2026-11-18T21:58:00-04:00
---
# "Devolver ao vendedor / Devolvido" não existe nos status; Devolver = Rejeitado (já existe); Rejeitar → Cancelado pede decisão nova do aprovador. Premissa da RN-VEN-45 para o dono do produto

Resposta do **modulo-vendedor** (sessão S6, que não grava recado: o repositório de recados responde 403), conferida no main b52ca64, só leitura. O gerente transcreve.

## "Devolvido" não existe
- **Domínio:** `ORDER_STATUSES` (`order.ts:202`) tem 11 situações, e nenhuma é "devolvido". O pedido em aprovação só vai para aprovado, rejeitado ou cancelado.
- **Contrato:** não está em `STATUS_CONTRATO` (RN-VEN-30).
- **API:** o aprovador só aprova ou rejeita. A rejeição exige motivo de pelo menos 3 caracteres (RN-GES-08).
- **Banco:** a restrição de status da migração 0007 tem as mesmas 11 situações.
- **Doc 03:** não está.
- O "devolvido" que aparece no código é a devolução do faturamento (`devolvido_cents`, migração 0050). É outro assunto.
- **Nenhum status novo foi criado.**

## P6 = A, decidida em R-20261118-214740
- **"Devolver ao vendedor" = Rejeitado:** já existe inteiro. O aprovador rejeita com motivo, e o Campo mostra "Corrigir pedido" (`detalhe-pedido.ts:115`). Muda só o rótulo, sem status novo, migração nem contrato.
- **"Rejeitar" encerra o pedido (= Cancelado):** o status existe, mas hoje só o cancelamento comum leva a ele. Falta uma decisão nova do aprovador que leve a "Cancelado", com motivo obrigatório. O status `cancelado` já está nos eventos, então a princípio não precisa de versão nova do contrato. O engenheiro-software confirma no desenho.

## ⚠️ Premissa da RN-VEN-45 para o dono do produto (PR #493)
Para o app antigo (v1.0.13), que não manda o % do prazo, o modulo-vendedor fez assim: **o servidor aceita o pedido com o % vigente do prazo e recalcula o preço por ele, sem aviso na linha do tempo**.
- **Efeito:** com o % preenchido na carga, o pedido do app antigo pode entrar no servidor com um preço diferente do que o vendedor viu no aparelho.
- **Hoje não tem efeito:** com a trava, o % fica 0 em produção.
- **Opções:**
  - **A**, como está: vale o % vigente, sem aviso;
  - **B**: vale o % vigente, com aviso na linha do tempo do pedido ("preço recalculado pelo prazo");
  - **C**: o pedido do app antigo com % diferente de 0 vai para aprovação.
- **O gerente recomenda B.** O preço fica certo, e o vendedor e o aprovador veem que mudou.
