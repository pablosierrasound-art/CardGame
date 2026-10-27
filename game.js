export const party = [
  { name: 'El custodio', role: 'GUARDIÁN', hp: 16, attack: 5, art: 'knight', quote: 'Aún queda un juramento por cumplir.' },
  { name: 'La vidente', role: 'OCULTISTA', hp: 10, attack: 7, art: 'witch', quote: 'El vacío también devuelve la mirada.' },
  { name: 'El errante', role: 'CAZADOR', hp: 12, attack: 6, art: 'hunter', quote: 'Ninguna sombra oculta sus huellas.' }
];
export function createGame(random = Math.random) {
  const deck = [
    { name: 'Caballero hueco', hp: 12, attack: 4, art: 'knight' },
    { name: 'Bruja del osario', hp: 9, attack: 5, art: 'witch' },
    { name: 'Vigía sin rostro', hp: 10, attack: 3, art: 'hunter' },
    { name: 'Rey de ceniza', hp: 18, attack: 6, art: 'knight' },
    { name: 'Eco del abismo', hp: 8, attack: 4, art: 'witch' },
    { name: 'Verdugo olvidado', hp: 14, attack: 5, art: 'hunter' }
  ];
  for (let i = deck.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  return { deck, enemies: [], heroes: party.map(h => ({ ...h })), selected: null, defeated: 0 };
}
export function draw(game) {
  if (game.enemies.length >= 3 || !game.deck.length || !game.heroes.some(h => h.hp > 0)) return null;
  const enemy = game.deck.pop(); game.enemies.push(enemy); return enemy;
}
export function attack(game, index) {
  const hero = game.heroes[game.selected], enemy = game.enemies[index];
  if (!hero || hero.hp <= 0 || !enemy) return null;
  enemy.hp = Math.max(0, enemy.hp - hero.attack);
  const killed = enemy.hp === 0;
  if (killed) { game.enemies.splice(index, 1); game.defeated++; }
  else hero.hp = Math.max(0, hero.hp - enemy.attack);
  game.selected = null;
  return { hero, enemy, killed };
}

export function roomStatus(game) {
  if (game.heroes.every(h => h.hp <= 0)) return 'defeat';
  if (game.room >= game.maxRooms && !game.deck.length && !game.enemies.length) return 'victory';
  if (!game.deck.length && !game.enemies.length) return 'reward';
  return 'battle';
}
export function beginRoom(game, random = Math.random) {
  if (roomStatus(game) !== 'reward' && game.room !== 0) return false;
  if (game.room >= game.maxRooms) return false;
  game.room++;
  game.selected = null;
  game.enemies = [];
  const boss = game.room % 5 === 0;
  const templates = [
    { name: 'Caballero hueco', hp: 12, attack: 4, art: 'knight' },
    { name: 'Bruja del osario', hp: 9, attack: 5, art: 'witch' },
    { name: 'Vigía sin rostro', hp: 10, attack: 3, art: 'hunter' },
    { name: 'Eco del abismo', hp: 8, attack: 4, art: 'witch' },
    { name: 'Verdugo olvidado', hp: 14, attack: 5, art: 'hunter' }
  ];
  const scale = Math.floor((game.room - 1) / 2);
  game.deck = boss
    ? [{ name: 'Rey de ceniza', hp: 24 + scale * 4, attack: 6 + scale, art: 'knight', boss: true }]
    : Array.from({length: Math.min(3, 1 + Math.floor(game.room / 2))}, () => {
      const t = templates[Math.floor(random() * templates.length)];
      return { ...t, hp: t.hp + scale * 2, attack: t.attack + scale };
    });
  return true;
}
export function chooseReward(game, kind) {
  if (roomStatus(game) !== 'reward') return false;
  const living = game.heroes.filter(h => h.hp > 0);
  if (kind === 'heal') {
    for (const h of living) h.hp = Math.min(h.maxHp ?? h.hp, h.hp + 5);
  } else if (kind === 'power') {
    for (const h of living) h.attack += 1;
  } else if (kind === 'revive') {
    const fallen = game.heroes.find(h => h.hp <= 0);
    if (!fallen) return false;
    fallen.hp = Math.max(1, Math.floor((fallen.maxHp ?? 10) / 2));
  } else return false;
  game.rewards++;
  return beginRoom(game);
}
export function createRun(random = Math.random) {
  const game = createGame(random);
  game.heroes.forEach(h => { h.maxHp = h.hp; });
  game.room = 0;
  game.maxRooms = 10;
  game.rewards = 0;
  beginRoom(game, random);
  return game;
}
