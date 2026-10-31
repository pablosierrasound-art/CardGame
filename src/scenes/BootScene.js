import Phaser from "phaser";
import { installPixelPack } from "../art/pixelPack.js";

const CELL = 46, X = 40, Y = 98;
const MAP = [
"###############",
"#.............#",
"#.###########.#",
"#...........#.#",
"###########.#.#",
"#...........#.#",
"#.###########.#",
"#.............#",
"###############"
];
const route = [];
for(let x=1;x<=13;x++) route.push([x,1]);
for(let y=2;y<=7;y++) route.push([13,y]);
for(let x=12;x>=1;x--) route.push([x,7]);
for(let y=6;y>=5;y--) route.push([1,y]);
for(let x=2;x<=11;x++) route.push([x,5]);
for(let y=4;y>=3;y--) route.push([11,y]);
for(let x=10;x>=1;x--) route.push([x,3]);
const defs = {
skeleton:{name:"Esqueleto",price:35,range:2.6,damage:13,rate:700,color:0xc6d6dd,symbol:"☠"},
goblin:{name:"Goblin",price:55,range:3.3,damage:9,rate:350,color:0x8bc85a,symbol:"◆"},
trap:{name:"Pinchos",price:25,range:0.8,damage:21,rate:1000,color:0xd9a56c,symbol:"✦"}
};
export class BootScene extends Phaser.Scene {
 constructor(){super("BootScene");}
 preload(){this.load.spritesheet("kenney-dungeon",import.meta.env.BASE_URL+"kenney/tilemap_packed.png",{frameWidth:16,frameHeight:16});}
 create(){
  this.cameras.main.setBackgroundColor("#10141e");
  installPixelPack(this);
  this.gold=120;this.treasure=10;this.wave=0;this.kills=0;this.selected="skeleton";this.units=[];this.foes=[];this.shots=[];this.running=false;this.spawnLeft=0;this.spawnTimer=0;this.elapsed=0;
  this.add.rectangle(480,43,960,86,0x1d2530);
  this.add.text(40,16,"DUNGEON KEEPER  TD",{fontFamily:"monospace",fontSize:"27px",color:"#e7c887",fontStyle:"bold"});
  this.add.text(40,46,"EL SEÑOR DE LA MAZMORRA",{fontFamily:"monospace",fontSize:"12px",color:"#9da9a9"});
  this.stats=this.add.text(42,62,"",{fontFamily:"monospace",fontSize:"17px",color:"#e9e3d5"});
  const g=this.add.graphics();
  const tileFrames=this.textures.exists("kenney-dungeon");
  for(let y=0;y<MAP.length;y++)for(let x=0;x<MAP[y].length;x++){
   const wall=MAP[y][x]==="#", px=X+x*CELL,py=Y+y*CELL;
   g.fillStyle(wall?0x333a49:0x65584e);g.fillRect(px,py,CELL-1,CELL-1);
   g.fillStyle(wall?0x454e60:0x766759);g.fillRect(px+3,py+3,CELL-7,wall?7:2);
   if(wall){g.lineStyle(1,0x222a36);g.strokeRect(px+2,py+2,CELL-5,CELL-5);}
   if(tileFrames){const frame=wall?((x+y)%4===0?13:1):((x+y)%4===0?3:0);this.add.image(px+CELL/2,py+CELL/2,"kenney-dungeon",frame).setDisplaySize(CELL-1,CELL-1).setDepth(0).setTexture("kenney-dungeon",frame); }
   else if((x+y)%3===0){g.fillStyle(0x867766);g.fillRect(px+11,py+22,3,3);}
  }
  const start=route[0],end=route[route.length-1];
  this.add.text(X+(start[0]+.5)*CELL,Y+(start[1]+.5)*CELL,"⚔",{fontSize:"27px"}).setOrigin(.5);
  this.add.image(X+(end[0]+.5)*CELL,Y+(end[1]+.5)*CELL,tileFrames?"kenney-dungeon":"px-chest",tileFrames?84:undefined).setDisplaySize(39,39).setDepth(3);
  this.ui=[];
  this.add.rectangle(845,318,224,435,0x202938).setStrokeStyle(2,0x4c5969);
  this.add.text(755,108,"DEFENSAS",{fontFamily:"monospace",fontSize:"21px",color:"#e7c887"});
  let iy=153;
  for(const [key,d] of Object.entries(defs)){
   const bg=this.add.rectangle(845,iy+20,200,55,0x273144).setStrokeStyle(2,0x596273).setInteractive();
   const txt=this.add.text(752,iy,d.symbol+" "+d.name+"\n   "+d.price+" oro",{fontFamily:"monospace",fontSize:"16px",color:"#f1eee5"});
   bg.on("pointerdown",()=>{this.selected=key;this.updateUI();});
   this.ui.push({key,bg});iy+=72;
  }
  this.startBtn=this.add.rectangle(845,410,200,55,0x547c55).setInteractive();
  this.startText=this.add.text(845,410,"INICIAR OLEADA",{fontFamily:"monospace",fontSize:"16px",color:"#ffffff"}).setOrigin(.5);
  this.startBtn.on("pointerdown",()=>this.startWave());
  this.add.text(750,457,"Toca una pared para\ncolocar una defensa.\nProtege el tesoro.",{fontFamily:"monospace",fontSize:"13px",color:"#b8c1cc",lineSpacing:5});
  this.input.on("pointerdown",p=>{
   const x=Math.floor((p.x-X)/CELL),y=Math.floor((p.y-Y)/CELL);
   if(x<0||x>=15||y<0||y>=9||MAP[y][x]!=="#")return;
   if(this.units.some(u=>u.x===x&&u.y===y))return;
   const d=defs[this.selected];if(this.gold<d.price)return;
   this.gold-=d.price;
   const cx=X+(x+.5)*CELL,cy=Y+(y+.5)*CELL;
   const circle=this.add.image(cx,cy,"px-"+this.selected).setDisplaySize(37,37).setDepth(4);
   const symbol=null;
   this.units.push({x,y,cx,cy,key:this.selected,last:0,circle,symbol});this.updateUI();
  });
  this.updateUI();
 }
 updateUI(){
  this.stats.setText("ORO: "+this.gold+"     TESORO: "+this.treasure+"     OLEADA: "+this.wave+"     DERROTADOS: "+this.kills);
  for(const u of this.ui)u.bg.setStrokeStyle(u.key===this.selected?3:2,u.key===this.selected?0xf0c979:0x596273);
  this.startBtn.setFillStyle(this.running?0x414b57:0x547c55);
  this.startText.setText(this.treasure<=0?"DERROTA":this.running?"OLEADA EN CURSO":"INICIAR OLEADA");
 }
 startWave(){
  if(this.running||this.treasure<=0)return;
  this.wave++;this.running=true;this.spawnLeft=4+this.wave*2;this.spawnTimer=0;this.updateUI();
 }
 spawn(){
  const kind=Math.random()<.23?"mage":Math.random()<.45?"archer":"warrior";
  const colors={warrior:0x6fa9dd,archer:0xd1a36b,mage:0xb58ae0};
  const cx=X+(route[0][0]+.5)*CELL,cy=Y+(route[0][1]+.5)*CELL;
  const body=this.add.image(cx,cy,"px-"+kind).setDisplaySize(37,37).setDepth(5);
  const head=this.add.circle(cx,cy-9,1,0xe5c6a0).setAlpha(0);
  const hp=this.add.rectangle(cx,cy-20,27,4,0x76d778);
  this.foes.push({kind,body,head,hp,progress:0,health:45+this.wave*12,max:45+this.wave*12,speed:(kind==="archer"?1.03:kind==="mage"?.85:1.16)*(1+this.wave*.025)});
 }
 update(time,delta){
  if(!this.running)return;
  const dt=Math.min(delta,60)/1000;
  this.spawnTimer-=delta;
  if(this.spawnLeft>0&&this.spawnTimer<=0){this.spawn();this.spawnLeft--;this.spawnTimer=850;}
  for(const foe of [...this.foes]){
   foe.progress+=foe.speed*dt;
   const i=Math.floor(foe.progress),t=foe.progress-i;
   if(i>=route.length-1){this.removeFoe(foe);this.treasure--;this.updateUI();continue;}
   const a=route[i],b=route[i+1],cx=X+(a[0]+(b[0]-a[0])*t+.5)*CELL,cy=Y+(a[1]+(b[1]-a[1])*t+.5)*CELL;
   foe.body.setPosition(cx,cy);foe.head.setPosition(cx,cy-9);foe.hp.setPosition(cx,cy-20).setScale(Math.max(0,foe.health/foe.max),1);
  }
  for(const unit of this.units){
   const d=defs[unit.key];if(time-unit.last<d.rate)continue;
   const target=this.foes.find(e=>Phaser.Math.Distance.Between(unit.cx,unit.cy,e.body.x,e.body.y)<=d.range*CELL);
   if(!target)continue;unit.last=time;target.health-=d.damage;
   const beam=this.add.line(0,0,unit.cx,unit.cy,target.body.x,target.body.y,d.color,1).setOrigin(0);
   this.tweens.add({targets:beam,alpha:0,duration:140,onComplete:()=>beam.destroy()});
   if(target.health<=0){this.removeFoe(target);this.gold+=12;this.kills++;this.updateUI();}
  }
  if(this.treasure<=0){this.running=false;this.add.rectangle(480,270,570,135,0x151923,.95);this.add.text(480,270,"TESORO SAQUEADO\nRecarga para intentarlo de nuevo",{fontFamily:"monospace",fontSize:"25px",color:"#e3a3a3",align:"center"}).setOrigin(.5);this.updateUI();}
  else if(this.spawnLeft===0&&this.foes.length===0){this.running=false;this.gold+=35+this.wave*8;this.updateUI();}
 }
 removeFoe(f){f.body.destroy();f.head.destroy();f.hp.destroy();this.foes.splice(this.foes.indexOf(f),1);}
}
