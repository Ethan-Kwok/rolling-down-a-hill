const handleOnMove = e => {
    const mousePos = e.clientX,
        windowWidth = window.innerWidth,
        mouseRelative = (mousePos / windowWidth),
        imagePosition = Math.floor(mouseRelative * (27)) * 1/26 * 100;
    
    document.getElementById("tortilla-image").style.objectPosition = (imagePosition + "%");
}

window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);

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