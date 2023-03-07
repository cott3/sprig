/*
@title: santas_workshop
@author: ava_sadasivan
*/

const elf = "p";
const present = "b";
const shoot = "g";
const wall = "w";

setLegend(
  [ elf, bitmap`
................
.......4........
......444.......
.....33333......
.....44444......
.....F7.7F......
.....F.3.F......
.....FFFFF......
.......F........
.......F........
.....FFFFF......
.......F........
......FFF.......
.....FF.FF......
.....F...F......
................`],
  [ present, bitmap`
................
....333..333....
....33333333....
..DDDD3333DDDD..
..DDDD3333DDDD..
..DDDD3333DDDD..
..DDDD3333DDDD..
..DDDD3333DDDD..
..333333333333..
..333333333333..
..333333333333..
..DDDD3333DDDD..
..DDDD3333DDDD..
..DDDD3333DDDD..
..DDDD3333DDDD..
................`],
  [ shoot, bitmap`
................
................
................
................
.....555555.....
....55555555....
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
.....555555.....
................
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

setSolids([elf, present, wall]);

let level = 0;
const levels = [
  map`
p...
.b..
....
...g`,
  map`
.....
pbw..
..w..
.....
..w.g`,
  map`
p.......
........
..wwwww.
.bw.ggw.
......w.
.bw...w.
..wwwww.
........`,
  map`
pw....
.w.wb.
.w.w..
.w....
.w.ww.
...w.g`,
  map`
......w.
..b.....
p.....w.
..www.b.
....w...
....w.w.
g...w.w.
gwwww.w.`,
  map`
.b.....g
.wwwwww.
p.......
.bb.....
.gg.....
....b...
.....ww.
.....wwg`,
  map`
...ww...
.......w
pw.w.w.w
.w.w.w.w
.b.w.w..
...w....
.w.w.www
ww.....g`,
  map`
...p....
.b..wwb.
.ww.....
...gg.w.
...gg.w.
.ww...w.
.b..w.b.
....w...`,
  map`
...p....
...www..
.....wb.
..w..w..
g.w..w..
..w.....
..w.wwww
........`,
  map`
p.......
........
.bw.ww..
.b.ggw..
.bwggw..
.bww.w..
........
........`,
];


let currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ elf ]: [present],
  [present] : [present]
});

function restartLevel() {
  currentLevel = levels[level];
  setMap(currentLevel);
}

function restartGame() {
  level = 0;
  setMap(levels[level]);
}

onInput("l", () => {
  restartLevel();
});

onInput("j", () => {
  restartGame();
});



onInput("w", () => {
  getFirst(elf).y -= 1;
});

onInput("s", () => {
  getFirst(elf).y += 1
});

onInput("a", () => {
    getFirst(elf).x -= 1;
});

onInput("d", () => {
    getFirst(elf).x += 1;
});

afterInput(() => {
    const numberCovered = tilesWith(shoot, present).length;
    const targetNumber = tilesWith(shoot).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) setMap(currentLevel);
    }
});
