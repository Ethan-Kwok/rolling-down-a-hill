const canvas = document.getElementById('coin-canvas');
const ctx = canvas.getContext('2d');
// TODO dont hardcode this?
const CANVAS_WIDTH = canvas.width = 150;
const CANVAS_HEIGHT = canvas.height = 150;
const coinImageWidth = 150;
const coinImageHeight = 150;

let frameX = 0;
let frameNum = 0;
const frameRate = 2;

const coinImg = document.getElementById('coin');

let isHeads = true;
let numHalfSpins = 0;
let isSpinning = false;

function drawInitialFrame() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(coinImg, 0, frameX * coinImageHeight, coinImageWidth, coinImageHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}
        
function animate(numTimesToSpin, numRotations, spinCounterClockwise) {
    return function() {
        if (numHalfSpins < numTimesToSpin) {
            if (frameNum % frameRate === 0) {
                // Handle spinning
                if (frameX < 17) {
                    frameX++;
                } else {
                    frameX = 0;
                }   
                if (frameX === 9 || frameX === 0) {
                    numHalfSpins++;
                }
                ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                ctx.drawImage(coinImg, 0, frameX * coinImageHeight, coinImageWidth, coinImageHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

                // Handle clockwise rotations
                // God knows how I came up with this formula. Spin such that it lands upright (0 degrees)
                // after numTimesToSpin full 360 degree rotations.
                let degree;
                if (isHeads) {
                    degree = (360 * numRotations * (frameX + 18 * Math.floor(numHalfSpins / 2)) / (numTimesToSpin * 9)) % 360;
                } else {
                    degree = (360 * numRotations * ((frameX + 18 * Math.floor((1 + numHalfSpins) / 2)) - 9) / (numTimesToSpin * 9)) % 360;
                }
                if (spinCounterClockwise) {
                    degree = degree * -1;
                }
                canvas.style.transform = 'rotate(' + degree + 'deg)';
            }
            frameNum++;
            
            requestAnimationFrame(animate(numTimesToSpin, numRotations, spinCounterClockwise));
        } else {
            isHeads = frameX === 0 ? true : false;
            document.getElementById('result').textContent = (isHeads ? "Heads" : "Tails") + ". You win!";
            isSpinning = false;
        }
    };
}

function spinCoin(clickedHeads) {
    if (isSpinning) return;
    isSpinning = true;
    document.getElementById('result').textContent = 'Flipping...';
    
    numHalfSpins = 0;
    
    // Number of times to spin should be even if already on that side of the coin
    // (i.e. when starting heads and trying to get heads, flip even times to get heads)
    // and odd otherwise. Always flip 5-8 times (inclusive).
    let numTimesToSpin;
    if (isHeads == clickedHeads) {
        numTimesToSpin = (Math.random() < 0.5 ? 6 : 8);
    } else {
        numTimesToSpin = (Math.random() < 0.5 ? 5 : 7);
    }

    // Visual effect to rotate the coin clockwise like Google's coinflip does
    const numRotations = Math.ceil(Math.random() * 3);
    const spinCounterClockwise = (Math.random() < 0.5);

    requestAnimationFrame(animate(numTimesToSpin, numRotations, spinCounterClockwise));
}

document.getElementById('heads-button').addEventListener('click', function() {
    spinCoin(true);
});

document.getElementById('tails-button').addEventListener('click', function() {
    spinCoin(false);
});

// Ensure that the tree and player sprites are visible when opening
coinImg.onload = () => {
    drawInitialFrame();
};

if (coinImg.complete) {
    drawInitialFrame();
} else {
    coinImg.onload = drawInitialFrame;
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