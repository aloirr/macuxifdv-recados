#!/usr/bin/env node
// Resumo de hora em hora no Telegram (workflow status-horario.yml, ADR 0035): recados novos em recados/todos/ e na
// caixa do dono do produto (recados/alexandre/) desde o último envio. Sem novidade, não envia nada.
// Uso: node .github/scripts/status-horario.mjs
// Ambiente: MARCADOR (arquivo com o SHA do último resumo; vem do cache do Actions), FUSO, REPO_URL,
// TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID (secrets, mascarados), GITHUB_OUTPUT.
// Saída "avancar=true" quando o marcador pode ser salvo (envio feito ou nada a enviar); com falha no envio o
// marcador fica onde estava e a próxima hora tenta de novo.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { separarNovidades, montarResumo, lerRecado, enviarTelegram, mascarar, horaLocal } from './recados-lib.mjs';

const git = (...args) => execFileSync('git', ['-c', 'core.quotepath=off', ...args], { encoding: 'utf8' });

/** Base do resumo: o SHA do marcador, se ainda existir no histórico; senão, o último commit de 65 min atrás. */
export function baseDoResumo(marcador, rodar = git) {
  const sha = String(marcador || '').trim();
  if (/^[0-9a-f]{7,40}$/.test(sha)) {
    try { rodar('cat-file', '-e', `${sha}^{commit}`); return sha; } catch { /* histórico reescrito ou marcador velho */ }
  }
  const antigo = rodar('rev-list', '-1', '--before=65 minutes ago', 'HEAD').trim();
  return antigo || null;
}

/** Arquivos adicionados entre a base e HEAD (base nula: todos os de HEAD). */
export function adicionados(base, rodar = git) {
  const saida = base
    ? rodar('diff', '--name-only', '--diff-filter=A', base, 'HEAD', '--', 'recados/todos/', 'recados/alexandre/')
    : rodar('ls-tree', '-r', '--name-only', 'HEAD', '--', 'recados/todos/', 'recados/alexandre/');
  return saida.split('\n').map((s) => s.trim()).filter(Boolean);
}

function saida(chave, valor) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${chave}=${valor}\n`);
}

if (import.meta.main) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  mascarar([token, chatId]);
  const arquivoMarcador = process.env.MARCADOR || '.estado-status/ultimo-envio.txt';
  let marcador = '';
  try { marcador = readFileSync(arquivoMarcador, 'utf8'); } catch { /* primeira vez ou cache expirado */ }
  const head = git('rev-parse', 'HEAD').trim();
  const base = baseDoResumo(marcador);
  const { caixa, todos } = separarNovidades(base === head ? [] : adicionados(base));
  const ler = (c) => lerRecado(readFileSync(c, 'utf8')) || { meta: {}, titulo: c };
  const repo = process.env.REPO_URL || '';
  const quando = horaLocal(new Date(), process.env.FUSO || 'America/Boa_Vista').iso.slice(0, 16).replace('T', ' ');
  const texto = montarResumo({ caixa: caixa.map(ler), todos: todos.map(ler), quando, link: repo ? `${repo}/tree/main/recados` : '' });
  if (texto) {
    try {
      await enviarTelegram(texto, { token, chatId });
      console.log(`resumo enviado: ${caixa.length} na caixa, ${todos.length} para todos`);
    } catch (e) {
      console.log(`falha no envio: ${e.message}; o marcador não avança`);
      saida('avancar', 'false');
      process.exit(1);
    }
  } else {
    console.log('sem novidade: nada enviado');
  }
  mkdirSync(dirname(arquivoMarcador), { recursive: true });
  writeFileSync(arquivoMarcador, `${head}\n`);
  saida('avancar', 'true');
}
