---
id: R-20261105-103212-gerente-projetos
de: gerente-projetos
para: [alexandre]
cc: []
tipo: entrega
prioridade: alta
tarefa: T-0075
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-05T10:32:12-04:00
---
# T-0075: DBaaS compatível com o plano B (3ª execução, suíte 898 ✅); pode apagar a instância; falta só o custo

## Contexto
3ª execução do teste de compatibilidade do DBaaS (run 42043636610, ramo verificacao/lote-k 108e18a). Foi a primeira com os ajustes B0, B1 e B2 no código, com a suíte de banco rodando de verdade contra o DBaaS e com os complementares A9, A11 e A12. A imagem de teste foi publicada no GHCR sem erro, então **não foi preciso liberar nada** no console nem no GitHub.

## Resultado
**O DBaaS PostgreSQL da Magalu é compatível com o Macuxi, com os ajustes do plano B, que já estão no main (fb1ef19).** Nada do que sobrou é incompatibilidade do provedor.

- **Já confirmado nas execuções anteriores:** alcance pela VPC, TLS 1.3, PG 16.14, vector 0.8.5 criada direto, HNSW usado (p95 de 2 ms), migrações, RLS FORCE em 115 tabelas, RLS na prática, papéis da aplicação sem BYPASSRLS.
- **Suíte do @macuxi/db contra o DBaaS:** 898 casos ✅, 17 ❌, 5 pulados, em 10 min 50 s. Os 17 ❌ são dos próprios testes, não do banco:
  - **10 arquivos:** os testes de subir e descer migração descem abaixo da 0031, que é onde mora a política de manutenção. Sem superusuário, o admin perde a permissão no meio do teste.
  - **lgpd-outbox:** um papel descartável criado no teste não recebeu a permissão de SET.
  - **seed-fase-m e mais 3 arquivos:** a trava de ambiente local, que recusa seed de demonstração fora do Postgres local, funcionou como deve.

  O banco-dados ajusta esses testes para rodarem sem superusuário. Não precisa de outra execução no DBaaS para decidir.
- **A9 (restauração do nosso backup):**
  - backup de 34 MiB em 7,9 s e restauração em 15,4 s, sem erro;
  - as 118 tabelas e as 6.836 linhas são iguais, e o conferir-rls deu 0 problema;
  - a única "diferença" é a forma como o Postgres reescreve os parênteses de um CHECK, o que é falso positivo.

  O backup de produção precisa da opção `--enable-row-security`, e isso já está documentado.
- **A11 (vector 0.8.5 × 0.8.2):** resultados idênticos no índice, na busca exata e no esperado, com diferença de distância 0.
- **A12 (collation):** en_US.UTF-8 com a mesma ordem do CI. Não precisa de COLLATE "C" nem de ICU.
- **Continua sem superusuário nem BYPASSRLS**, como já se sabia. Por isso mesmo o plano B existe.
- **Limpeza:** as bases e os papéis de teste foram apagados. A instância ficou como estava.

## O que falta
1. **Custo do BV1-4-10:** só você consegue ver no console. É a última condição para a ADR 0024 passar de proposta a aceita.
2. O engenheiro-software atualiza a ADR 0024 com esta execução, e o banco-dados ajusta os 17 testes para rodarem sem superusuário. Nenhum dos dois precisa da instância.

## Pode apagar a instância
Na minha leitura, **pode apagar agora**. Os itens que sobraram se resolvem e se testam no CI, sem o DBaaS. Se quiser uma 4ª execução com tudo verde antes de apagar, me diga: leva cerca de 1 hora depois do ajuste dos testes.
