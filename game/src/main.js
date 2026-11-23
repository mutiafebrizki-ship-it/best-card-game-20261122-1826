// main.js — Ember Duel: a card duel against Pyra, the AI rival.
// Both fighters start at 30 HP. Each round you play one card from your hand of 5;
// Pyra answers with one of hers. Higher effective power wins the round and deals
// damage equal to the gap. First fighter to 0 HP loses. Keyboard 1–5 plays a card.
import { buildDeck, shuffle, drawCards } from './deck.js';
import { resolveRound, describeCard, START_HP } from './rules.js';
import { chooseCard } from './ai.js';
import {
  renderHands, renderHealth, renderArena, renderBanner, renderLog,
  showOverlay, hideOverlay,
} from './render.js';
import { playShotState, winShotState, loseShotState } from './shots.js';

const HAND_SIZE = 5;

export function newGame() {
  const deck = shuffle(buildDeck());
  return {
    phase: 'play',
    round: 1,
    youHp: START_HP,
    foeHp: START_HP,
    youRounds: 0,
    foeRounds: 0,
    deck,
    discard: [],
    youHand: drawCards(deck, HAND_SIZE),
    foeHand: drawCards(deck, HAND_SIZE),
    youPlayed: null,
    foePlayed: null,
    log: ['Welcome to Ember Duel! Play a card — Flame beats Leaf, Leaf beats Stone, Stone beats Frost, Frost beats Flame (+3 power).'],
  };
}

let state = newGame();
let busy = false;

function drawAll() {
  renderHands(state, playCard);
  renderHealth(state);
  renderArena(state);
  renderLog(state.log);
}

function refillHands() {
  for (const hand of [state.youHand, state.foeHand]) {
    if (state.deck.length === 0 && state.discard.length > 0) {
      state.deck = shuffle(state.discard);
      state.discard = [];
    }
    if (hand.length < HAND_SIZE && state.deck.length > 0) {
      hand.push(...drawCards(state.deck, 1));
    }
  }
}

function endRound(result) {
  if (result.winner === 'you') {
    state.foeHp = Math.max(0, state.foeHp - result.damage);
    state.youRounds += 1;
    state.log.push(`Round ${state.round}: your ${describeCard(state.youPlayed)} (${result.youPower}) beat Pyra's ${describeCard(state.foePlayed)} (${result.foePower}) — Pyra takes ${result.damage} damage!`);
    renderBanner(`YOU WIN THE ROUND! −${result.damage} HP`);
  } else if (result.winner === 'foe') {
    state.youHp = Math.max(0, state.youHp - result.damage);
    state.foeRounds += 1;
    state.log.push(`Round ${state.round}: Pyra's ${describeCard(state.foePlayed)} (${result.foePower}) beat your ${describeCard(state.youPlayed)} (${result.youPower}) — you take ${result.damage} damage!`);
    renderBanner(`PYRA WINS THE ROUND! −${result.damage} HP`);
  } else {
    state.log.push(`Round ${state.round}: ${describeCard(state.youPlayed)} vs ${describeCard(state.foePlayed)} — a draw, no damage!`);
    renderBanner('DRAW — NO DAMAGE');
  }
  drawAll();
  setTimeout(() => {
    if (state.foeHp <= 0) return showEnd(true);
    if (state.youHp <= 0) return showEnd(false);
    state.discard.push(state.youPlayed, state.foePlayed);
    state.youPlayed = null;
    state.foePlayed = null;
    state.round += 1;
    refillHands();
    state.phase = 'play';
    busy = false;
    drawAll();
  }, 1700);
}

function playCard(card) {
  if (state.phase !== 'play' || busy) return;
  busy = true;
  state.youHand = state.youHand.filter((c) => c.id !== card.id);
  state.youPlayed = card;
  state.phase = 'reveal';
  drawAll();
  setTimeout(() => {
    const foeCard = chooseCard(state.foeHand, card);
    state.foeHand = state.foeHand.filter((c) => c.id !== foeCard.id);
    state.foePlayed = foeCard;
    drawAll();
    setTimeout(() => endRound(resolveRound(card, foeCard)), 650);
  }, 500);
}

function showEnd(won) {
  state.phase = won ? 'win' : 'lose';
  const stats = `Rounds: ${state.round} · Rounds won: ${state.youRounds} — ${state.foeRounds} · Your HP: ${state.youHp} · Pyra's HP: ${state.foeHp}`;
  const btn = showOverlay(
    won ? '🏆 YOU WIN!' : '💀 PYRA WINS',
    won
      ? `The ember is yours! Pyra's health hit zero.\n${stats}\nPlay again and try to win faster!`
      : `Pyra takes the duel this time.\n${stats}\nStudy her tells and duel again!`,
    won ? '🔥 DUEL AGAIN' : '⚔️ REMATCH',
    'Press R or click the button to play again',
  );
  btn.addEventListener('click', restart);
}

function restart() {
  hideOverlay();
  state = newGame();
  busy = false;
  drawAll();
}

function showTitle() {
  state.phase = 'title';
  const btn = showOverlay(
    '🔥 EMBER DUEL',
    'A duel of ember cards against Pyra, the AI rival.\n\nBoth fighters start at 30 HP. Each round, play one card from your hand — higher power wins and deals damage equal to the gap.\n\nSuits: 🔥 Flame beats 🍃 Leaf · 🍃 Leaf beats 🪨 Stone · 🪨 Stone beats ❄️ Frost · ❄️ Frost beats 🔥 Flame (+3 power).\n\nFirst to 0 HP loses. Keys 1–5 play a card, or click one.',
    '▶  START THE DUEL',
    'Keyboard + mouse · No network needed · Made for make.fun',
  );
  btn.addEventListener('click', () => {
    hideOverlay();
    state = newGame();
    drawAll();
  });
}

function applyShot(shot) {
  if (shot === 'play') {
    state = playShotState();
    hideOverlay();
    drawAll();
    renderBanner('YOUR 7 FLAME BEATS 6 LEAF!', 0);
  } else if (shot === 'win') {
    state = winShotState();
    drawAll();
    showEnd(true);
  } else if (shot === 'lose') {
    state = loseShotState();
    drawAll();
    showEnd(false);
  } else {
    showTitle();
    drawAll();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') { restart(); return; }
  if (state.phase !== 'play') return;
  const index = ['1', '2', '3', '4', '5'].indexOf(event.key);
  if (index >= 0 && state.youHand[index]) playCard(state.youHand[index]);
});

window.addEventListener('error', (event) => {
  console.error('Ember Duel error:', event.message);
});

const params = new URLSearchParams(window.location.search);
applyShot(params.get('shot'));
