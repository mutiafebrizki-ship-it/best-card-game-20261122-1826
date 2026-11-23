# 🔥 Ember Duel

[![make.fun · best-card-game-20261122-1826](https://make.fun/badge/best-card-game-20261122-1826.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![rank](https://make.fun/badge/best-card-game-20261122-1826/mutiafebrizki-ship-it/best-card-game-20261122-1826/rank.svg)](https://make.fun/bounty/best-card-game-20261122-1826/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)
[![reward](https://make.fun/badge/best-card-game-20261122-1826/mutiafebrizki-ship-it/best-card-game-20261122-1826/reward.svg)](https://make.fun/bounty/best-card-game-20261122-1826?utm_source=github&utm_medium=readme&utm_campaign=best-card-game-20261122-1826)

An original card duel game for the make.fun bounty
[Make the best card game](https://make.fun/bounty/best-card-game-20261122-1826).
You duel **Pyra**, an AI rival, with a 36-card ember deck. Both fighters start at
30 HP; each round you play one card, Pyra answers, higher effective power wins
the round and deals damage equal to the gap. First to 0 HP loses.

## Rules

- 4 suits in a cycle, told apart by colour **and** symbol:
  🔥 Flame beats 🍃 Leaf · 🍃 Leaf beats 🪨 Stone · 🪨 Stone beats ❄️ Frost ·
  ❄️ Frost beats 🔥 Flame — a winning suit adds **+3 power**.
- Cards are values 1–9. A tie deals no damage.
- Pyra plays the cheapest card that still wins, and sacrifices her weakest card
  when she cannot win — her choices can be read and countered.
- Hand of 5, one card drawn after each round; the discard pile reshuffles when
  the deck runs out.

## Play

Serve `game/` with any static server and open it in a desktop browser:

```sh
node serve.ts        # http://localhost:8080
```

Click a card (or press keys **1–5**) to play it. **R** restarts. No network
request is made; the whole game is static files under `game/`.

## Layout

- `game/index.html` — the table (title, hands, arena, health bars, log)
- `game/src/deck.js` — the 36-card ember deck and shuffling
- `game/src/rules.js` — suit advantage, round resolution, damage
- `game/src/ai.js` — Pyra's card choices
- `game/src/render.js` — cards, hands, health bars, overlays
- `game/src/shots.js` — fixed table states for screenshots
- `game/src/main.js` — game state machine and input
- `main.ts` — the make.fun entry program (copies `game/` + `screenshots/` and
  writes `dossier.json`)
- `screenshots/` — 4 real renders of the game: title, gameplay, win, lose

Referral code: yngr0441 — https://make.fun/r/yngr0441
