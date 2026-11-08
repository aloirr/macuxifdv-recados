#!/usr/bin/env node
// Issue do formulário "Recado" → arquivo do recado do dono do produto (workflow issue-recado.yml, ADR 0035).
// Uso: node .github/scripts/issue-recado.mjs "$GITHUB_EVENT_PATH"
// Ambiente: AUTOR_PERMITIDO (login aceito, ex.: domontecristo), FUSO (padrão America/Boa_Vista), GITHUB_OUTPUT.
// Saídas (GITHUB_OUTPUT): ok=true|false|ignorar · id · arquivo (primeiro caminho) · erro (texto para o comentário).
// Nunca lança com o texto da issue no log: o conteúdo só vai para o arquivo do recado.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { lerFormulario, validarFormulario, horaLocal, idLivre, montarRecado, caminhosDoRecado, DESTINOS } from './recados-lib.mjs';

function saida(chave, valor) {
  const linha = String(valor ?? '').replace(/\r?\n/g, ' ');
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${chave}=${linha}\n`);
  else console.log(`${chave}=${linha}`);
}

/** Ids que já existem em recados/<destino>/ (o id não pode repetir em pasta nenhuma). */
export function idsExistentes(raiz) {
  const ids = new Set();
  const pasta = join(raiz, 'recados');
  if (!existsSync(pasta)) return ids;
  for (const d of readdirSync(pasta)) {
    if (!DESTINOS.includes(d)) continue;
    for (const f of readdirSync(join(pasta, d))) if (f.endsWith('.md')) ids.add(f.slice(0, -3));
  }
  return ids;
}

/** Processa o evento (exportado para os testes). */
export function processarEvento(evento, { raiz = process.cwd(), autor = process.env.AUTOR_PERMITIDO, fuso = process.env.FUSO || 'America/Boa_Vista', agora = new Date() } = {}) {
  const issue = evento?.issue;
  if (!issue) return { ok: 'ignorar', motivo: 'evento sem issue' };
  if (!autor || String(issue.user?.login || '').toLowerCase() !== String(autor).toLowerCase()) {
    return { ok: 'ignorar', motivo: 'issue de outro autor' };
  }
  const campos = lerFormulario(issue.body);
  if (!campos) return { ok: 'ignorar', motivo: 'não é o formulário Recado' };
  const { erros, recado } = validarFormulario({ titulo: issue.title, campos });
  if (erros.length) return { ok: 'false', erro: erros.join('; ') };
  const hora = horaLocal(agora, fuso);
  const id = idLivre(hora.compacto, idsExistentes(raiz));
  const texto = montarRecado({ ...recado, id, criado_em: hora.iso });
  const caminhos = caminhosDoRecado(id, recado.para, recado.cc);
  for (const c of caminhos) {
    mkdirSync(dirname(join(raiz, c)), { recursive: true });
    writeFileSync(join(raiz, c), texto, 'utf8');
  }
  return { ok: 'true', id, arquivo: caminhos[0], caminhos };
}

if (import.meta.main) {
  let evento = {};
  try { evento = JSON.parse(readFileSync(process.argv[2] || process.env.GITHUB_EVENT_PATH, 'utf8')); } catch { /* sem evento: ignorar */ }
  const r = processarEvento(evento);
  saida('ok', r.ok);
  saida('id', r.id || '');
  saida('arquivo', r.arquivo || '');
  saida('erro', r.erro || '');
  console.log(r.ok === 'true' ? `recado ${r.id} gravado em ${r.caminhos.length} pasta(s)` : r.ok === 'false' ? 'formulário com erro (detalhe no comentário da issue)' : `ignorado: ${r.motivo}`);
}
