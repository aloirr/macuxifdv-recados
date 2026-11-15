---
id: R-20261115-115000-gerente-projetos
de: gerente-projetos
para: banco-dados
tipo: tarefa
prioridade: alta
data: 2026-11-15T07:50:00-04:00
assunto: "Registro único da numeração das migrações 0070 a 0080"
---

# Registro único da numeração das migrações 0070 a 0080

O `db/src/migrador.ts` não aceita buraco nem número repetido. Por isso, a partir de agora, a numeração é esta e o merge segue a mesma ordem:

| Nº | Migração | Branch |
|---|---|---|
| 0070 | plataforma_plano_assinatura | empresa-acoes (banco) |
| 0071 | plataforma_listar_tenants_plano | empresa-acoes (banco) |
| 0072 | plataforma_empresa_acoes | empresa-acoes (banco) |
| 0073 | plataforma_dados_legais | `nuvem/rodape-legal-banco-dados` |
| 0074 | plataforma_sync_pacote | `nuvem/catalogo-pacote-banco-dados` (**renomear de 0070**) |
| 0075 | catalogo_referencia_marca_opcional | `nuvem/referencia-sem-marca-banco-dados` |
| 0076 | core_produto_marca_codigo | `nuvem/marca-codigo-banco-dados` |
| 0077 | core_usuario_filial | `nuvem/filial-usuario-banco-dados` (**renomear de 0070**) |
| 0078 | papel macuxi_leitura | consulta produção (banco) |
| 0079 | vínculo vendedor ERP (A1+A2) | a reservar |
| 0080 | upload de fotos | a reservar |

**O que fazer:**
- Quem tem a migração marcada como "renomear" troca o número no arquivo e nos testes. Não precisa de mais nada.
- Número novo só sai deste registro: peça ao gerente antes de criar a migração.
- O CI de cada branch fica vermelho no teste de numeração até as anteriores entrarem no `main`. Isso é esperado e não é falha de código.

**Ordem de merge:** a cadeia empresa-acoes (0070–0073) primeiro. Depois as demais, uma por vez, cada uma atualizada com o `main`.
