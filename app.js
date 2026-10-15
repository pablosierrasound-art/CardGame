import { createGame, draw, attack } from './game.js';
let game = createGame();
const $ = s => document.querySelector(s);
const log = text => { $('#log').textContent = text; };
function card(c, index, enemy = false) {
  return `<button class="card ${enemy ? 'monster' : 'hero'} ${!enemy && game.selected === index ? 'selected' : ''}" data-${enemy ? 'enemy' : 'hero'}="${index}" ${c.hp <= 0 ? 'disabled' : ''} aria-label="${c.name}, ${c.hp} vida, ${c.attack} ataque"><span class="card-top">${enemy ? 'ABOMINACIÓN' : c.role}<span>✧</span></span><span class="portrait ${c.art}"><img src="assets/${c.art}.svg" alt=""/><span class="portrait-vignette"></span></span><span class="card-body"><strong>${c.name}</strong><span class="card-line"></span><span class="quote">${enemy ? 'Algo antiguo se agita en la penumbra.' : c.quote}</span><span class="stats"><span title="Ataque">⚔ <b>${c.attack}</b></span><span title="Vida">♡ <b>${c.hp}</b></span></span></span></button>`;
}
function render() {
  $('#enemies').innerHTML = Array.from({ length: 3 }, (_, i) => game.enemies[i] ? card(game.enemies[i], i, true) : `<div class="empty-slot"><span>♱</span><small>SOMBRA ${['I', 'II', 'III'][i]}</small><p>Sin revelar</p></div>`).join('');
  $('#heroes').innerHTML = game.heroes.map((c,i) => card(c,i)).join('');
  $('#remaining').textContent = `${game.deck.length} CARTAS RESTANTES`;
  $('#enemy-count').textContent = `${game.enemies.length} / 3 ENEMIGOS`;
  const disabled = !game.deck.length || game.enemies.length >= 3 || game.heroes.every(h => h.hp <= 0);
  $('#draw').disabled = $('#reveal').disabled = disabled;
  document.querySelectorAll('[data-hero]').forEach(b => b.onclick = () => { game.selected = Number(b.dataset.hero); render(); log(`${game.heroes[game.selected].name} está preparado. Elige un enemigo.`); });
  document.querySelectorAll('[data-enemy]').forEach(b => b.onclick = () => {
    const result = attack(game, Number(b.dataset.enemy));
    if (!result) { log('Elige primero una carta de tu compañía.'); return; }
    render();
    log(result.killed ? `${result.enemy.name} ha caído.` : `${result.hero.name} inflige ${result.hero.attack} de daño y recibe ${result.enemy.attack} de contraataque.`);
    if (!game.deck.length && !game.enemies.length) log('La cripta queda en silencio. Tu compañía ha vencido.');
    if (game.heroes.every(h => h.hp <= 0)) log('Tu compañía ha caído. Inicia una nueva incursión.');
  });
}
function reveal() { const enemy = draw(game); if (enemy) { render(); log(`${enemy.name} emerge de la oscuridad.`); } }
$('#draw').onclick = $('#reveal').onclick = reveal;
$('#restart').onclick = () => { game = createGame(); render(); log('Una nueva incursión comienza. Las sombras vuelven a esperar.'); };
render();
