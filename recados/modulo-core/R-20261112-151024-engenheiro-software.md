---
id: R-20261112-151024-engenheiro-software
de: engenheiro-software
para: [modulo-core]
cc: [gerente-projetos]
tipo: pedido
prioridade: normal
tarefa: T-0168
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-12T15:10:24-04:00
---
# T-0168: contratos do limite de desconto (LimiteDescontoSchema, sync usuario, cadastro_resumo@1 aditivo), API e aba Parâmetros do BKO

## Contexto
T-0168, RN-VEN-11a: duas funções no usuário ("Limitar desconto por item" e "Limitar desconto por pedido") e o "Desconto máximo do pedido (%)" na aba Parâmetros do perfil. Desenho: `docs/desenho/T-0168.md` §2 (contratos com o código pronto). Implementar **depois da aprovação da simulação** (15h30); comece pelos contratos (2a), que destravam o Vendedor.

## O que preciso
2a (0,5 h, primeiro):
- `modules/core/contracts/usuarios.ts`: `LimiteDescontoSchema`, `LimiteDesconto`, `LIMITE_DESCONTO_PADRAO`, `limiteDescontoCompleto`, `DESCONTO_PEDIDO_PERMIL_MAX` (§2.1); `UsuarioItemSchema` com os 3 campos obrigatórios; `CriarUsuarioRequestSchema` opcionais com padrão + superRefine; `EditarUsuarioRequestSchema` opcionais (§2.2). Exportar do `index.ts`.
- `modules/core/contracts/sync.ts`: `UsuarioSyncSchema` (entidade nova `usuario`, campos com `.default`) (§2.3).
- `modules/core/contracts/consultas.ts`: `core.cadastro_resumo@1` `usuarios[]` com os 3 campos opcionais (§2.4, aditivo, mesma versão).
2b (2 h): POST/PUT/lista de usuários gravando e devolvendo os campos; a API junta com o gravado e recusa "por pedido" sem número com 422 `USUARIO_DADOS_INVALIDOS` ("Informe o desconto máximo do pedido.", `detalhes.campo = 'desconto_maximo_pedido_permil'`); auditoria com os 3 campos; ação `usuario.editar` de hoje. Provedor do sync `usuario` (subconsulta com `id as usuario_id`, `colunaUsuario: 'usuario_id'`, só os 3 campos; a linha do próprio usuário sempre vem, com teste); `manifest.sync += 'usuario'`; consulta `cadastro_resumo` lendo as colunas. ERP (`integracao.vendedor.atualizado@1`) e CSV da Equipe **não tocam** nas 3 colunas.
2c (1,5 h): aba Parâmetros no perfil do usuário no BKO, como na simulação aprovada; o web converte % (1 casa) ↔ ‰ (`Math.round(pct*10)`); registro da entidade `usuario` no `app/index.ts` (Campo e Gestão).

## Pronto quando
Contratos publicados com teste (aviso a mim e ao modulo-vendedor logo após o 2a); API e BKO com teste; lint e typecheck limpos no PC; `entrega` ao gerente. Depende da migração do banco-dados para o 2b.
