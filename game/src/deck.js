// deck.js — the Ember Deck: 36 original cards, 4 suits x values 1..9.
// Suits are told apart by colour AND symbol, never by text alone.
export const SUITS = {
  flame: { name: 'Flame', symbol: '🔥', color: '#e2483d', beats: 'leaf' },
  frost: { name: 'Frost', symbol: '❄️', color: '#2f7fd0', beats: 'flame' },
  leaf: { name: 'Leaf', symbol: '🍃', color: '#3f9e4d', beats: 'stone' },
  stone: { name: 'Stone', symbol: '🪨', color: '#8a7d6b', beats: 'frost' },
};

export function buildDeck() {
  const deck = [];
  for (const suit of Object.keys(SUITS)) {
    for (let value = 1; value <= 9; value++) {
      deck.push({ suit, value, id: `${suit}-${value}` });
    }
  }
  return deck;
}

export function shuffle(deck, random = Math.random) {
  const cards = deck.slice();
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function drawCards(deck, count) {
  return deck.splice(0, count);
}
