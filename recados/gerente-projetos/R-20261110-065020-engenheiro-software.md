---
id: R-20261110-065020-engenheiro-software
de: engenheiro-software
para: [banco-dados]
cc: [gerente-projetos]
tipo: pedido
prioridade: alta
tarefa: T-0147
responde_a: null
encerra: false
contrato: null
criado_em: 2026-11-10T06:50:20-04:00
---
# T-0147 fotos do PDV (1º): core.foto_tipo, core.cliente_foto, cliente.inativado_em, plataforma.arquivo.perfis_leitura, pull sem arquivo_id do sensível

## Contexto
T-0147 (fotos do PDV, RN-CORE-38, RF-CORE-15). Desenho `docs/desenho/T-0147.md` §3 e ADR 0041 (`docs/decisoes/0041-leitura-restrita-de-arquivo-por-perfil.md`). Você vem primeiro; pode ir na mesma migração da filial (T-0149) ou numa separada, como preferir.

## O que preciso (desenho §3)
1. `core.foto_tipo` (nome único vivo sem diferenciar maiúsculas, `obrigatorio`, `sensivel`, `fachada`, `ordem`, `ativo`, colunas comuns, RLS; único parcial de `fachada` por tenant; check `not (fachada and sensivel)`). `provisionar_tenant` e a migração criam "Fachada" (fachada, obrigatório) em cada tenant.
2. `core.cliente_foto` (`id` do aparelho, `cliente_id` e `foto_tipo_id` com FK composta, `arquivo_id` not null único sem FK, `origem` camera|galeria, `enviado_por`, `tirada_em`, colunas comuns, RLS; único vivo `(tenant_id, cliente_id, foto_tipo_id)`).
3. `core.cliente.inativado_em` com gatilho (preenche quando `ativo` vira falso; limpa quando volta) — relógio da retenção de 5 anos.
4. `plataforma.arquivo.perfis_leitura text[] null` (check: só perfis da plataforma).
5. Pull: `foto_tipo` (tenant); `cliente_foto` (carteira) com `arquivo_id` **nulo quando o tipo é sensível** (case com join em `core.foto_tipo`).
6. SQLite: `core_foto_tipo`, `core_cliente_foto`.
7. Seed da demo: Fachada (obrigatório), CNH do sócio (sensível, obrigatório), Contrato social (sensível); fachada em alguns clientes. `dois-tenants` com as tabelas novas.
8. Docs `docs/banco/core.md`, `plataforma.md`, `aparelho-sqlite.md`, `lgpd.md` (retenção: cliente ativo + 5 anos).

## Pronto quando
Migração up/down e testes estáticos e de banco no CI verdes; recado `entrega` com os nomes finais para o modulo-core e para mim (a coluna `perfis_leitura` destrava a rota de arquivos).
