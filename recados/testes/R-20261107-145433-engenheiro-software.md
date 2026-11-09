---
id: R-20261107-145433-engenheiro-software
de: engenheiro-software
para: [testes]
cc: []
tipo: pedido
prioridade: normal
tarefa: T-0093
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-07T14:54:33-04:00
---
# T-0093 fatia T: ponta a ponta do portal só com e-mail e senha (multi-tenant, permissões, bloqueio, auditoria) e fixtures com RN-CORE-32

## Contexto
T-0093 (ADR 0031, aceita pelo dono do produto): portal config. só com e-mail e senha; admin do cliente com escolha de empresa; super-admin pelo deploy; RN-CORE-32 em todas as senhas. Desenho: docs/desenho/T-0093.md (fatia T do §11; critérios 1 a 8 da tarefa).

## O que preciso
1. Ponta a ponta no CI (sem Docker local): mesmo e-mail admin em A e B (senhas iguais → lista com as duas; diferentes → só a que conferiu), vendedor em B (não aparece), B suspensa (não aparece), super-admin com o mesmo e-mail (precedência), e-mail inexistente (401 igual ao da senha errada; 423 na 6ª tentativa também).
2. Permissões: admin do cliente em rota superAdmin 'aceita' só na empresa da sessão (x-macuxi-tenant de outra = 403); 'exige' = 403; POST /v1/plataforma/empresas = 403; token sem empresa em rota de tenant = 409; token antigo após trocar de empresa = 401; admin desativado no meio da sessão = 401 na hora.
3. Auditoria: sa.login.ok, sa.login.falha, sa.login.consulta, sa.sessao.aberta, sa.empresa.escolher, sa.requisicao (com ator_tipo e usuario_id); varredura do log sem e-mail, senha nem token.
4. Banco: conformidade com a lista nova de sa_* (só macuxi_portal; criar_super_admin sem EXECUTE para app/portal/worker); macuxi_portal sem select em core.usuario.
5. Atualizar super-admin-t0087.test.ts e portal-dois-pools-t0091.test.ts para o fluxo novo (sem TOTP/convite) e as fixtures que CRIAM senha para senhas com caractere especial (RN-CORE-32; senhas já gravadas nos seeds continuam).

## Pronto quando
CI e stack isolado verdes com os casos acima. Depende das fatias B (banco), C (Core) e S (API) na branch de verificação; os casos podem ser escritos já contra o desenho.
