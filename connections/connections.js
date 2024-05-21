const words = [
    "FISH", "ROLL", "SALMONELLA", "DOG",
    "ARSON", "GASLIGHT", "LAUGH", "HEHEHE",
    "STAR", "STAB", "TOUCH GRASS", "ARM",
    "BRAINIER", "CHEESE", "PSYDUCK", "HYPOTHETICAL"
];
  
const categories = {
    "NOVEMBER 10TH": ["STAR", "HEHEHE", "HYPOTHETICAL", "ROLL"],
    "NOMMABLE": ["PSYDUCK", "CHEESE", "ARM", "DOG"],
    "YOU WOULD \'NEVER\'": ["TOUCH GRASS", "ARSON", "STAB", "GASLIGHT"],
    "WORDS WITH NAMES INSIDE": ["BRAINIER", "FISH", "LAUGH", "SALMONELLA"]
};
  
let remainingWords = [...words];
const wordsContainer = document.getElementById('words-container');
const categoriesContainer = document.getElementById('categories-container');
const submitBtn = document.getElementById('submit-btn');
const popupMessage = document.getElementById('popup-message');
let selectedWords = [];
  
function createWordElement(word) {
    const div = document.createElement('div');
    div.classList.add('word');
    div.textContent = word;
    div.addEventListener('click', () => {
    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(w => w !== word);
        div.classList.remove('selected');
    } else {
    if (selectedWords.length < 4) {
        selectedWords.push(word);
        div.classList.add('selected');
    }
    }
        updateSubmitButtonState();
    });
    return div;
}

function getCategoryColor(category) {
    switch (category) {
    case "NOVEMBER 10TH":
        return "#f9df6d";
    case "NOMMABLE":
        return "#a0c35a";
    case "YOU WOULD 'NEVER'":
        return "#b0c4ef";
        case "WORDS WITH NAMES INSIDE":
        return "#ba81c5";
        default:
        return "gray"; // Default color if category is not found
    }
}

function updateWordsContainer() {
    wordsContainer.innerHTML = '';
    remainingWords.forEach(word => {
        const wordElement = createWordElement(word);
        wordsContainer.appendChild(wordElement);
    });
    adjustFontSize();
}
  
function displayCategory(category) {
    const categoryBox = document.createElement('div');
    categoryBox.classList.add('category-box');
    categoryBox.style.backgroundColor = getCategoryColor(category);
  
    const categoryTitle = document.createElement('div');
    categoryTitle.classList.add('category-title');
    categoryTitle.textContent = category;
  
    const categoryItems = document.createElement('div');
    categoryItems.classList.add('category-items');
    categoryItems.textContent = categories[category].join(', ');
  
    categoryBox.appendChild(categoryTitle);
    categoryBox.appendChild(categoryItems);
    categoriesContainer.appendChild(categoryBox);
}
  
updateWordsContainer();

function updateSubmitButtonState() {
    if (selectedWords.length === 4) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('disabled');
    } else {
        submitBtn.disabled = true;
        submitBtn.classList.add('disabled');
    }
}

function showPopupMessage() {
    popupMessage.classList.add('show');
    popupMessage.classList.remove('hidden');
    setTimeout(() => {
        popupMessage.classList.remove('show');
        popupMessage.classList.add('hidden');
    }, 4000); // Show the message for 2 seconds
    console.log("AH");
  }
  
submitBtn.addEventListener('click', () => {
    submitBtn.disabled = true;
    submitBtn.classList.add('disabled');
    if (selectedWords.length !== 4) {
        return;
    }
    const category = Object.keys(categories).find(cat =>
        categories[cat].every(word => selectedWords.includes(word))
    );
    if (category) {
        remainingWords = remainingWords.filter(word => !selectedWords.includes(word));
        updateWordsContainer();
        displayCategory(category);
    } else {
        const oneAwayCategory = Object.keys(categories).find(cat =>
          categories[cat].filter(word => selectedWords.includes(word)).length === 3
        );
        if (oneAwayCategory) {
            showPopupMessage();
        }
        selectedWords.forEach(word => {
            const wordElement = Array.from(document.querySelectorAll('.word'))
            .find(el => el.textContent === word);
            wordElement.classList.add('jiggle');
            setTimeout(() => {
            wordElement.classList.remove('jiggle');
            }, 1000); // Duration of jiggle animation
        });
    }
    selectedWords = [];
    document.querySelectorAll('.word').forEach(el => el.classList.remove('selected'));
    updateSubmitButtonState();
});

function adjustFontSize() {
    const words = document.querySelectorAll('.word');
    words.forEach(word => {
        const wordLength = word.textContent.length;
        const containerWidth = word.clientWidth;
        const containerHeight = word.clientHeight;
    
        // Calculate font size based on word length and container dimensions
        // Adjust the divisor to fit the font size correctly
        let fontSize = Math.min(containerWidth / wordLength, containerHeight / 1.5);
        fontSize = Math.max(fontSize, 10); // Ensure the font size is not too small
        fontSize = Math.min(fontSize, 26); // Ensure the font size is not too large
    
        word.style.fontSize = `${fontSize}px`;
    });
}
  
// Initial adjustment
updateWordsContainer();
updateSubmitButtonState();
adjustFontSize();
window.addEventListener('resize', adjustFontSize);



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
