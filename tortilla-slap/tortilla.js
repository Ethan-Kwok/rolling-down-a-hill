





const handleOnMove = e => {
    // if(track.dataset.mouseDownAt === "0") return;

    // const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    //         maxDelta = window.innerWidth / 2;

    // const percentage = (mouseDelta / maxDelta) * -100,
    //         nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
    //         nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    // track.dataset.percentage = nextPercentage;

    // for(const image of track.getElementsByClassName("roof-image")) {
    //     image.animate({
    //     objectPosition: `${100 + nextPercentage}% center`
    //     }, { duration: 1200, fill: "forwards" });
    // }

    const mousePos = e.clientX,
        windowWidth = window.innerWidth,
        mouseRelative = (mousePos / windowWidth),
        imagePosition = Math.floor(mouseRelative * (27)) * 1/26 * 100;
    
    document.getElementById("tortilla-image").style.objectPosition = (imagePosition + "%");
}

window.onmousemove = e => handleOnMove(e);




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