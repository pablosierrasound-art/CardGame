import test from 'node:test';
import assert from 'node:assert/strict';
import { createGame, draw, attack, createRun, roomStatus, chooseReward } from './game.js';
test('el tablero admite tres monstruos y conserva el resto en el mazo', () => {
  const g = createGame(); for(let i=0;i<3;i++) assert.ok(draw(g));
  assert.equal(draw(g),null); assert.equal(g.deck.length,3); assert.equal(g.heroes.length,3);
});
test('un enemigo que sobrevive contraataca; uno derrotado libera el hueco', () => {
  const g=createGame(); g.enemies=[{name:'Sombra',hp:9,attack:4}]; g.selected=0;
  assert.equal(attack(g,0).killed,false); assert.equal(g.enemies[0].hp,4); assert.equal(g.heroes[0].hp,12);
  g.selected=0; assert.equal(attack(g,0).killed,true); assert.equal(g.heroes[0].hp,12); assert.equal(g.enemies.length,0); assert.equal(g.defeated,1);
});
test('sin selección o con un héroe caído no se puede atacar', () => {
  const g=createGame(); draw(g); assert.equal(attack(g,0),null); g.selected=0; g.heroes[0].hp=0; assert.equal(attack(g,0),null);
});
test('se pueden agotar y derrotar las seis cartas; reiniciar crea un estado independiente', () => {
  const g=createGame(); g.heroes[0].attack=100;
  for(let i=0;i<6;i++){assert.ok(draw(g));g.selected=0;assert.ok(attack(g,0).killed);}
  assert.equal(g.defeated,6);assert.equal(draw(g),null);assert.equal(g.enemies.length,0);
  const fresh=createGame();assert.equal(fresh.deck.length,6);assert.equal(fresh.heroes[0].attack,5);
});

test('la incursión empieza en la primera sala y ofrece recompensa al despejarla', () => {
  const g = createRun(() => 0);
  assert.equal(g.room, 1);
  assert.equal(roomStatus(g), 'battle');
  assert.ok(draw(g));
  g.heroes[0].attack = 100;
  g.selected = 0;
  assert.ok(attack(g, 0).killed);
  assert.equal(roomStatus(g), 'reward');
  assert.equal(chooseReward(g, 'power'), true);
  assert.equal(g.room, 2);
  assert.equal(g.heroes[0].attack, 101);
});
test('la quinta sala contiene un jefe y la décima termina en victoria', () => {
  const g = createRun(() => 0);
  for (let room = 1; room <= 10; room++) {
    assert.equal(g.room, room);
    if (room === 5 || room === 10) assert.equal(g.deck[0].boss, true);
    while (g.deck.length || g.enemies.length) {
      if (!g.enemies.length) draw(g);
      g.heroes[0].attack = 999;
      g.selected = 0;
      attack(g, 0);
    }
    if (room < 10) assert.equal(chooseReward(g, 'heal'), true);
  }
  assert.equal(roomStatus(g), 'victory');
});
