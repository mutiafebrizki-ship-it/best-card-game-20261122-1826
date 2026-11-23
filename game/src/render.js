// render.js — draws every card, hand, health bar and banner into the DOM.
import { SUITS } from './deck.js';

export function cardElement(card, opts = {}) {
  const el = document.createElement('div');
  el.className = `card suit-${card.suit}`;
  el.dataset.cardId = card.id;
  const suit = SUITS[card.suit];
  el.innerHTML = `
    <div class="corner">${card.value}<small>${suit.symbol}</small></div>
    <div class="pip">${suit.symbol}</div>
    <div class="cost">${suit.name.toUpperCase()} · ${card.value}</div>`;
  if (opts.key) {
    const key = document.createElement('span');
    key.className = 'key';
    key.textContent = opts.key;
    el.appendChild(key);
  }
  if (opts.onClick) el.addEventListener('click', () => opts.onClick(card));
  return el;
}

export function cardBackElement() {
  const el = document.createElement('div');
  el.className = 'card back';
  el.innerHTML = '<div class="pip">🔥</div>';
  return el;
}

export function renderHands(state, onPlayCard) {
  const youHand = document.getElementById('youHand');
  youHand.innerHTML = '';
  state.youHand.forEach((card, i) => {
    youHand.appendChild(cardElement(card, {
      key: String(i + 1),
      onClick: state.phase === 'play' ? onPlayCard : undefined,
    }));
  });
  const foeHand = document.getElementById('foeHand');
  foeHand.innerHTML = '';
  state.foeHand.forEach(() => foeHand.appendChild(cardBackElement()));
}

export function renderHealth(state) {
  const youFill = document.getElementById('youHpFill');
  const foeFill = document.getElementById('foeHpFill');
  youFill.style.width = `${(state.youHp / 30) * 100}%`;
  foeFill.style.width = `${(state.foeHp / 30) * 100}%`;
  document.getElementById('youHpText').textContent = `${state.youHp} / 30`;
  document.getElementById('foeHpText').textContent = `${state.foeHp} / 30`;
  document.getElementById('roundLabel').textContent = `Round ${state.round}`;
  document.getElementById('scoreLabel').textContent =
    `You ${state.youRounds} — ${state.foeRounds} Pyra`;
}

export function renderArena(state) {
  const youSlot = document.getElementById('youSlot');
  const foeSlot = document.getElementById('foeSlot');
  youSlot.innerHTML = state.youPlayed
    ? ''
    : '<div class="slotHint">Your card lands here</div>';
  foeSlot.innerHTML = state.foePlayed
    ? ''
    : '<div class="slotHint">Pyra plays here</div>';
  if (state.youPlayed) youSlot.appendChild(cardElement(state.youPlayed));
  if (state.foePlayed) foeSlot.appendChild(cardElement(state.foePlayed));
}

export function renderBanner(text, ms = 1600) {
  const banner = document.getElementById('roundBanner');
  banner.textContent = text;
  if (ms > 0) setTimeout(() => { banner.textContent = ''; }, ms);
}

export function renderLog(lines) {
  document.getElementById('log').textContent = lines.slice(-2).join('  ·  ');
}

export function showOverlay(title, body, buttonLabel, foot) {
  const overlay = document.getElementById('overlay');
  document.getElementById('overlayTitle').textContent = title;
  document.getElementById('overlayBody').textContent = body;
  const btn = document.getElementById('overlayBtn');
  btn.textContent = buttonLabel;
  document.getElementById('overlayFoot').textContent = foot;
  overlay.classList.remove('hidden');
  return btn;
}

export function hideOverlay() {
  document.getElementById('overlay').classList.add('hidden');
}
