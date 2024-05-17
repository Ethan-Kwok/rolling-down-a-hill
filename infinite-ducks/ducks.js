let imageContainer = document.querySelector(".ducks-image-container");
const numDuckImages = 15;
let ducksFound = 0;
let ducksClicked = 0;

function getRandomSize() {
    return Math.random() * (1 - 0.4) + 0.4;
}

function getRandomPosition(max) {
    return Math.random() * max;
}

async function getImage(n, topOffset) {
    for (let i = 0; i < n; i++) {
        let randomIndex = Math.floor(Math.random() * numDuckImages) + 1;
        let url = `duck-images/duck${randomIndex}.png`;
        let img = document.createElement("img");
        img.src = url;

        // Set random size using viewport units
        let sizeFactor = getRandomSize();
        img.style.width = `${sizeFactor * 40}vmin`;
        img.style.height = `${sizeFactor * 40}vmin`;

        // Set random position within the newly revealed area using viewport units
        img.style.top = `${topOffset / window.innerHeight * 100 + getRandomPosition(100 - sizeFactor * 20)}vh`;
        img.style.left = `${getRandomPosition(100 - sizeFactor * 20)}vw`;

        // Randomly mirror some images horizontally
        if (Math.random() < 0.5) {
            img.style.transform = 'scaleX(-1)';
        }

        imageContainer.appendChild(img);

        img.addEventListener("click", function () {
            img.remove();
            ducksClicked++;
            ducksClickedCounter.textContent = ducksClicked;
        });
    }
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("scroll", function () {
    let { clientHeight, scrollHeight, scrollTop } = document.documentElement;
    if (clientHeight + scrollTop + 500 >= scrollHeight) {
        const randomNumDucks = getRandomNumber(8, 25);
        getImage(randomNumDucks, scrollTop + clientHeight);
        ducksFound += randomNumDucks;
        ducksFoundCounter.textContent = ducksFound;
    }
});

const startingNumDucks = getRandomNumber(8, 25);
getImage(startingNumDucks, 0);
ducksFound += startingNumDucks;
ducksFoundCounter.textContent = ducksFound;



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