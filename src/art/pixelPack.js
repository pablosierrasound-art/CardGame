// Original free-to-use pixel sprite pack for Dungeon Keeper TD.
// Each character is drawn on a 12x12 pixel grid and rendered as a Phaser texture.
const P={
  skeleton:["............","....wwww....","...wwwwww...","...wkwkw....","...wwwwww...","....wkkw....","...wwwwww...","....wbbw....","...wwbbww...","...w.bbw....","...w..w.....","..ww..ww...."],
  goblin:["............","...gg..gg...","..gggggggg..","..gkgkkgkg..","..gggggggg..","...gppppg...","....gggg....","...ggrrgg...","..gggrrggg..","...g.gr.g...","...g....g...","..gg....gg.."],
  trap:["............","............","............","............","............","..s..s..s...","..ss.ss.ss..",".ssssssssss.",".dddddddddd.",".dddddddddd.","............","............"],
  warrior:["............","....hhhh....","...hhhhhh...","...hfhfh....","...ffffff...","....ffff....","..bbbbbbbb..","..bsbbbbbs..","..bbbbbbbb..","...bb..bb...","...bb..bb...","..kk....kk.."],
  archer:["............","....hhhh....","...hhhhhh...","...hfhfh....","...ffffff...","....ffff....","..gggggggg..","..gggggggg..","...gggggg...","...gg..gg...","...gg..gg...","..kk....kk.."],
  mage:["............",".....pp.....","....pppp....","...pppppp...","...pffpfp...","...ffffff...","..pppppppp..","..pppppppp..","..pppppppp..","..pppppppp..","..pppppppp..","..kk....kk.."],
  chest:["............","............","..yyyyyyyy..",".yYYYYYYYYy.",".yYyyyyyyYy.",".dddddddddd.",".dyyyyyyyyd.",".dyydyyydyd.",".dyydyyydyd.",".dyyyyyyyyd.",".dddddddddd.","............"]
};
const C={w:"#e8e7d7",k:"#26303b",b:"#8a9bab",g:"#79b85d",p:"#c48fda",r:"#614534",s:"#e2e0d3",d:"#66503c",h:"#b9b7a2",f:"#f1c49b",Y:"#f8d56c",y:"#b78c35"};
export function installPixelPack(scene){
 for(const [name,rows] of Object.entries(P)){
  const canvas=document.createElement("canvas");canvas.width=12;canvas.height=12;
  const ctx=canvas.getContext("2d");ctx.imageSmoothingEnabled=false;
  rows.forEach((line,y)=>[...line].forEach((v,x)=>{if(C[v]){ctx.fillStyle=C[v];ctx.fillRect(x,y,1,1);}}));
  scene.textures.addCanvas("px-"+name,canvas);
 }
}
