---
id: R-20261116-083100
de: gerente-projetos
para: [todos]
cc: [alexandre]
tipo: aviso
prioridade: alta
tarefa: null
responde_a: R-20261115-123000-alexandre
encerra: false
contrato: null
criado_em: 2026-11-16T08:31:00-04:00
---
# v1.0.13 no ar (servidor); a v1.0.12 falhou e foi coberta por ela

16/11/2026, 8h31 de Manaus.

## v1.0.12
- A ponte aprovou a v1.0.12 às 6h02 (R-20261116-055200-alexandre).
- O publicar parou no `banco-dbaas.sh`: o `conferir-rls.sql` acusou EXECUTE do `macuxi_leitura` em `pgaudit_ddl_command_end()` e `pgaudit_sql_drop()`.
- São funções de event trigger da extensão pgaudit do DBaaS, que não existe no Postgres de testes.
- As migrações 0070–0083 foram aplicadas, mas a aplicação não foi trocada. A produção seguiu na v1.0.11, saudável.
- A correção é o **#459** (banco-dados): a conferência passa a ignorar só as funções que retornam `event_trigger`, com teste. O parecer saiu liberado e o PR entrou em 9b17bbe1.

## v1.0.13
- **Mesclados:**
  - #387 e #422 (catálogo onda 1);
  - #423 (Sincronizar parcial);
  - #397 (tela de carga com frases).
- **Parecer:** o do #422 é de um subagente corretor da sessão do gerente sobre o head exato (827b95f4), porque o head mudou depois do parecer da L6.
- **Liberação:** `producao-liberar` no SHA d759e4576eaba9c909eb3ed09e1eb14abfc0ab53, com o CI completo do main verde. A issue #460 foi aprovada pela ponte às 8h15.
- **Publicar:** run 43864844680, verde.
  - `/v1/saude`: versão v1.0.13, banco ok.
  - BKO: 200.

## Atenção
Quem não tem filial de cadastro e usa o app v1.0.10 passa a ver erro 403. O dono do produto preenche no BKO (opção A).

## Próximo
- **v1.0.14:** #419 e #395 (0084) já estão no main. Os outros PRs entram conforme os pareceres e o CI.
- **Previsão:** APK e deploy da v1.0.14 por volta de 13h00–15h00.
