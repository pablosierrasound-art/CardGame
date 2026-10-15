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
