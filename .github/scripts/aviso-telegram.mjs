#!/usr/bin/env node
// Aviso no Telegram dos recados novos na caixa do dono do produto (workflow aviso-telegram.yml, ADR 0035).
// Uso: node .github/scripts/aviso-telegram.mjs
// Ambiente: ANTES e DEPOIS (SHAs do push), REPO_URL, TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID (secrets).
// Os secrets são mascarados (::add-mask::) antes de qualquer saída e nunca são impressos.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { montarAviso, enviarTelegram, mascarar } from './recados-lib.mjs';

const MAXIMO = 10;
const git = (...args) => execFileSync('git', ['-c', 'core.quotepath=off', ...args], { encoding: 'utf8' });

/** Recados adicionados em recados/alexandre/ entre ANTES e DEPOIS (push que cria o ramo: só o commit DEPOIS). */
export function recadosNovos(antes, depois, rodar = git) {
  const zero = !antes || /^0+$/.test(antes);
  let base = antes;
  if (!zero) { try { rodar('cat-file', '-e', `${antes}^{commit}`); } catch { base = null; } }
  const args = zero || !base
    ? ['diff-tree', '--root', '--no-commit-id', '-r', '--name-only', '--diff-filter=A', depois, '--', 'recados/alexandre/']
    : ['diff', '--name-only', '--diff-filter=A', base, depois, '--', 'recados/alexandre/'];
  return rodar(...args).split('\n').map((s) => s.trim()).filter((s) => /^recados\/alexandre\/R-[^/]+\.md$/.test(s)).sort();
}

if (import.meta.main) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  mascarar([token, chatId]);
  const novos = recadosNovos(process.env.ANTES, process.env.DEPOIS || 'HEAD');
  console.log(`${novos.length} recado(s) novo(s) na caixa do dono do produto`);
  const repo = process.env.REPO_URL || '';
  let falhas = 0;
  for (const caminho of novos.slice(0, MAXIMO)) {
    const texto = montarAviso(readFileSync(caminho, 'utf8'), { link: repo ? `${repo}/blob/main/${caminho}` : '' });
    if (!texto) continue;
    try { await enviarTelegram(texto, { token, chatId }); } catch (e) { falhas++; console.log(`falha no envio: ${e.message}`); }
  }
  if (novos.length > MAXIMO) {
    try { await enviarTelegram(`… e mais ${novos.length - MAXIMO} recado(s) na sua caixa: ${repo}/tree/main/recados/alexandre`, { token, chatId }); } catch (e) { falhas++; console.log(`falha no envio: ${e.message}`); }
  }
  if (falhas) process.exit(1);
}
