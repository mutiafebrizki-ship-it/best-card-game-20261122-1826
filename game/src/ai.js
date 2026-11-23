// ai.js — Pyra, the AI rival. She reads the table: she plays the cheapest card
// that still wins the round, and when she cannot win she sacrifices her weakest
// card to save her big ones. Her choices can be read and countered.
import { effectivePower } from './rules.js';

export function chooseCard(aiHand, youCard) {
  const sorted = aiHand.slice().sort((a, b) => a.value - b.value);
  const winners = sorted.filter((c) => effectivePower(c, youCard) > effectivePower(youCard, c));
  if (winners.length > 0) return winners[0];
  return sorted[0];
}

export function chooseOpeningCard(aiHand) {
  // Pyra opens with a middle card: she keeps her aces for a killing blow.
  const sorted = aiHand.slice().sort((a, b) => a.value - b.value);
  return sorted[Math.min(2, sorted.length - 1)];
}
