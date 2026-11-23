// shots.js — fixed, deterministic table states for screenshots (?shot=play|win|lose).
// These are presets of the real game state, rendered by the same render code.
export function playShotState() {
  return {
    phase: 'reveal',
    round: 4,
    youHp: 18,
    foeHp: 22,
    youRounds: 2,
    foeRounds: 1,
    youHand: [
      { suit: 'flame', value: 7, id: 'flame-7' },
      { suit: 'frost', value: 4, id: 'frost-4' },
      { suit: 'leaf', value: 9, id: 'leaf-9' },
      { suit: 'stone', value: 2, id: 'stone-2' },
      { suit: 'flame', value: 5, id: 'flame-5' },
    ],
    foeHand: [
      { suit: 'stone', value: 6, id: 'stone-6' },
      { suit: 'frost', value: 8, id: 'frost-8' },
      { suit: 'leaf', value: 3, id: 'leaf-3' },
      { suit: 'flame', value: 2, id: 'flame-2' },
    ],
    youPlayed: { suit: 'flame', value: 7, id: 'flame-7' },
    foePlayed: { suit: 'leaf', value: 6, id: 'leaf-6' },
    log: [
      'Round 3: your 8 Frost beat Pyra\'s 5 Flame — Pyra takes 6 damage!',
      'Round 4: your 7 Flame vs Pyra\'s 6 Leaf — Flame burns Leaf (+3)!',
    ],
  };
}

export function winShotState() {
  const s = playShotState();
  s.phase = 'win';
  s.youHp = 12;
  s.foeHp = 0;
  s.youRounds = 5;
  s.foeRounds = 2;
  s.round = 8;
  s.youPlayed = { suit: 'frost', value: 9, id: 'frost-9' };
  s.foePlayed = { suit: 'flame', value: 3, id: 'flame-3' };
  s.log = ['Round 8: your 9 Frost freezes Pyra\'s 3 Flame — 9 damage! Pyra is out of health!'];
  return s;
}

export function loseShotState() {
  const s = playShotState();
  s.phase = 'lose';
  s.youHp = 0;
  s.foeHp = 9;
  s.youRounds = 2;
  s.foeRounds = 5;
  s.round = 8;
  s.youPlayed = { suit: 'stone', value: 4, id: 'stone-4' };
  s.foePlayed = { suit: 'leaf', value: 8, id: 'leaf-8' };
  s.log = ['Round 8: Pyra\'s 8 Leaf crushes your 4 Stone — you take 7 damage. You are out of health!'];
  return s;
}
