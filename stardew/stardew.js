const canvas = document.getElementById('stardew-canvas');
const ctx = canvas.getContext('2d');
const treeCanvas = document.getElementById('stardew-tree-canvas');
const treeCtx = treeCanvas.getContext('2d');
// TODO dont hardcode this?
const CANVAS_WIDTH = canvas.width = 810;
const CANVAS_HEIGHT = canvas.height = 810;
const spriteWidth = 810;
const spriteHeight = 810;
const TREE_CANVAS_WIDTH = treeCanvas.width = 720;
const TREE_CANVAS_HEIGHT = treeCanvas.height = 1280;
const treeSpriteWidth = 720;
const treeSpriteHeight = 1280;

let frameX = 0;
let frameNum = 0;
const frameRate = 2;

let numChops = 0;
const itemTextDisplayInside = document.getElementById('item-count-text-inside');
const itemTextDisplayOutline = document.getElementById('item-count-text-outline');
let isMouseDown = false;

const sprite = document.getElementById('sprite');
const treeSprite = document.getElementById('tree-sprite');
ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.drawImage(sprite, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
treeCtx.clearRect(0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);
treeCtx.drawImage(treeSprite, frameX * treeSpriteWidth, 0, treeSpriteWidth, treeSpriteHeight, 0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(sprite, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    treeCtx.clearRect(0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);
    treeCtx.drawImage(treeSprite, frameX * treeSpriteWidth, 0, treeSpriteWidth, treeSpriteHeight, 0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);
    if (frameNum % frameRate == 0) {
        if (frameX < 14) {
            frameX++;
            if (frameX == 6) { // Frame 6 is when the axe touches the tree, although this is kind of arbitrary
                numChops++;
                itemTextDisplayInside.textContent = numChops;
                itemTextDisplayOutline.textContent = numChops;
            }
        } else {
            frameX = 0;
            if (!isMouseDown) {
                frameNum++;
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.drawImage(sprite, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                treeCtx.clearRect(0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);
                treeCtx.drawImage(treeSprite, frameX * treeSpriteWidth, 0, treeSpriteWidth, treeSpriteHeight, 0, 0, TREE_CANVAS_WIDTH, TREE_CANVAS_HEIGHT);
                return;
            }
        }
    }

    frameNum++;
    requestAnimationFrame(animate);
};

window.onmousedown = e => handleOnDown(e);
window.onmouseup = e => handleOnUp(e);

const handleOnDown = e => {
    isMouseDown = true;
    if (frameX == 0) {
        requestAnimationFrame(animate);
    }
}

const handleOnUp = e => {
    isMouseDown = false;
}



// Back arrow
document.addEventListener('DOMContentLoaded', function() {
    const backArrow = document.getElementById('back-arrow');

    function handleBackArrowClick() {
        fadeOutPage()
        setTimeout(function() {
          window.location.href = '../main/main.html';
        }, 150); // Delay in milliseconds, adjust as needed
    }

    backArrow.addEventListener('click', handleBackArrowClick);
});



// Page change transitions
function fadeInPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');
}

fadeInPage();

function fadeOutPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-in');
}