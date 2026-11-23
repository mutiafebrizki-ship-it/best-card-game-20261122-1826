// rules.js — the duel rules: suit advantage, round resolution, damage.
// A suit beats one other suit in a cycle: Flame > Leaf > Stone > Frost > Flame.
// A winning suit adds +3 effective power. Higher effective power wins the round;
// the loser takes damage equal to the gap (at least 1). Equal power is a draw.
import { SUITS } from './deck.js';

export const SUIT_BONUS = 3;
export const START_HP = 30;

export function suitBeats(a, b) {
  return SUITS[a].beats === b;
}

export function effectivePower(card, foeCard) {
  return card.value + (suitBeats(card.suit, foeCard.suit) ? SUIT_BONUS : 0);
}

export function resolveRound(youCard, foeCard) {
  const youPower = effectivePower(youCard, foeCard);
  const foePower = effectivePower(foeCard, youCard);
  if (youPower === foePower) {
    return { winner: 'draw', youPower, foePower, damage: 0 };
  }
  const winner = youPower > foePower ? 'you' : 'foe';
  const damage = Math.max(1, Math.abs(youPower - foePower));
  return { winner, youPower, foePower, damage };
}

export function describeCard(card) {
  return `${card.value} ${SUITS[card.suit].name} ${SUITS[card.suit].symbol}`;
}
