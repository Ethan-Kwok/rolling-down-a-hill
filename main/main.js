// Image scroll & parallax effect
const track = document.getElementById("menu-image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("menu-image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

const handleOnTouchMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const clientX = e.touches[0].clientX;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - clientX,
        maxDelta = window.innerWidth;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.style.transform = `translate(${nextPercentage}%, -50%)`;
  
  for (const image of track.getElementsByClassName("menu-image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`
  }
}

function onOpen() {
  nextPercentage = 0;
  
  track.dataset.percentage = nextPercentage;
  
  track.style.transform = `translate(${nextPercentage}%, -50%)`;
  
  for (const image of track.getElementsByClassName("menu-image")) {
    image.style.objectPosition = `${100 + nextPercentage}% center`
  }
}

onOpen();

window.onmousedown = e => handleOnDown(e);
window.ontouchstart = e => handleOnDown(e.touches[0]);
window.onmouseup = e => handleOnUp(e);
window.ontouchend = e => handleOnUp(e.touches[0]);
window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnTouchMove(e);



// Clickable images
const images = document.querySelectorAll('#menu-image-track .menu-image');

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    changePage(index);
  });
});

function changePage(imageIndex) {
  const delay = 150; // Transition delay in milliseconds, adjust as needed

  switch (imageIndex) {
    case 0:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../roof/roof.html';
      }, delay);
      break;
    case 1:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../connections/connections.html';
      }, delay);
      break;
    case 2:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../infinite-ducks/ducks.html';
      }, delay);
      break;
    case 3:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../stardew/stardew.html';
      }, delay);
      break;
    case 4:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../tortilla-slap/tortilla.html';
      }, delay);
      break;
    case 5:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../coin/coin.html';
      }, delay);
      break;
    case 6:
      fadeOutPage()
      setTimeout(function() {
        window.location.href = '../strands/strands.html';
      }, delay);
      break;
    default:
      alert('Error: no page corresponding to image!');
  }
}



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

console.log("Commit #38");