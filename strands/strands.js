const lettersArray = [
    'L', 'A', 'P', 'S', 'D', 'A', 
    'S', 'K', 'I', 'T', 'K', 'D', 
    'C', 'Y', 'T', 'C', 'S', 'N',
    'O', 'P', 'E', 'A', 'M', 'U',
    'N', 'K', 'S', 'O', 'A', 'P',
    'D', 'K', 'F', 'J', 'O', 'M', 
    'A', 'C', 'O', 'S', 'K', 'O', 
    'K', 'R', 'N', 'K', 'E', 'Y'
];
const wordList = [
    "SLAPSTICK", "YOMAMA", "PUNS", "KNOCKKNOCK", "DARK", "DAD", "TYPESOFJOKES"
]
const spangram = 'TYPESOFJOKES'

const rows = 8;
const cols = 6;

let currWord = '';
let selectedCells = [];
let isMouseDown = false;
let foundWords = [];
let foundSpangram = false;

const foundWordsColor = '#aedfee';
const selectedLettersColor = '#dbd8c5';
const foundSpangramColor = '#f8cb2c';
const lineWidth = 12;

const currWordDiv = document.getElementById('currWord');
const gridDiv = document.getElementById('grid');

const lineCanvas = document.getElementById('lineCanvas');
const ctx = lineCanvas.getContext('2d');

const themeWordsFoundDiv = document.getElementById('themeWordsFound');

lettersArray.forEach((letter, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.index = index;
    cell.innerHTML = `<div class="letter">${letter}</div><div class="highlight"></div>`;
    gridDiv.appendChild(cell);
});

// TODO "functions" are probably better than "const" but idc enough right now :D

const updateCurrWord = () => {
    currWordDiv.textContent = currWord;
    currWordDiv.classList.remove('foundWordsBlueText');
    currWordDiv.classList.remove('foundSpangramGoldText');
};

const clearSelection = () => {
    selectedCells.forEach(cell => {
        if (!foundWords.some(word => word.cells.includes(cell))) {
            cell.querySelector('.highlight').style.display = 'none';
        }
    });
    selectedCells = [];
    updateCanvasForFoundWords();
};

const updateCanvasForDeselectedCells = (deselectedCells) => {
    // Clear only the lines related to the deselected cells
    deselectedCells.forEach((cell, index) => {
        if (index < deselectedCells.length - 1) {
            const nextCell = deselectedCells[index + 1];
            const cellRect = cell.getBoundingClientRect();
            const nextRect = nextCell.getBoundingClientRect();
            const canvasRect = lineCanvas.getBoundingClientRect();

            const startX = cellRect.left + cellRect.width / 2 - canvasRect.left;
            const startY = cellRect.top + cellRect.height / 2 - canvasRect.top;
            const endX = nextRect.left + nextRect.width / 2 - canvasRect.left;
            const endY = nextRect.top + nextRect.height / 2 - canvasRect.top;

            ctx.clearRect(
                Math.min(startX, endX), 
                Math.min(startY, endY), 
                Math.abs(startX - endX), 
                Math.abs(startY - endY)
            );
        }
    });

    // Redraw the remaining lines
    updateCanvasForFoundWords();
};

const updateCanvasForFoundWords = () => {
    // Clear the canvas
    ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

    // Redraw lines for all found words
    foundWords.forEach(word => {
        for (let i = 0; i < word.cells.length - 1; i++) {
            const startCell = word.cells[i];
            const endCell = word.cells[i + 1];

            const startRect = startCell.getBoundingClientRect();
            const endRect = endCell.getBoundingClientRect();
            const canvasRect = lineCanvas.getBoundingClientRect();

            const startX = startRect.left + startRect.width / 2 - canvasRect.left;
            const startY = startRect.top + startRect.height / 2 - canvasRect.top;
            const endX = endRect.left + endRect.width / 2 - canvasRect.left;
            const endY = endRect.top + endRect.height / 2 - canvasRect.top;

            if (word.word === spangram) {
                ctx.strokeStyle = foundSpangramColor;
            } else {
                ctx.strokeStyle = foundWordsColor;
            }
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    });

    // Redraw lines for the currently selected cells
    if (selectedCells.length > 1) {
        for (let i = 0; i < selectedCells.length - 1; i++) {
            const startCell = selectedCells[i];
            const endCell = selectedCells[i + 1];

            const startRect = startCell.getBoundingClientRect();
            const endRect = endCell.getBoundingClientRect();
            const canvasRect = lineCanvas.getBoundingClientRect();

            const startX = startRect.left + startRect.width / 2 - canvasRect.left;
            const startY = startRect.top + startRect.height / 2 - canvasRect.top;
            const endX = endRect.left + endRect.width / 2 - canvasRect.left;
            const endY = endRect.top + endRect.height / 2 - canvasRect.top;

            ctx.strokeStyle = selectedLettersColor;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }
};

const updateWordsFoundText = () => {
    themeWordsFoundDiv.innerHTML = `<span class="number">${foundWords.length}</span> of <span class="total">7</span> theme words found.`;
}

updateWordsFoundText();

const areAllWordsFound = () => {
    return wordList.every(word => foundWords.some(foundWord => foundWord.word === word));
};

const applyCascadingAnimation = () => {
    let delay = 0;

    // Loop through all diagonals
    for (let d = 0; d < rows + cols - 1; d++) {
        // Loop through each row and find the corresponding column in the diagonal
        for (let row = Math.max(0, d - cols + 1); row <= Math.min(d, rows - 1); row++) {
            const col = d - row;
            const cell = gridDiv.querySelector(`.cell[data-index="${row * cols + col}"]`);
            if (cell) {
                const highlight = cell.querySelector('.highlight');
                setTimeout(() => {
                    highlight.classList.add('pulseSubmit');
                    highlight.addEventListener('animationend', () => {
                        highlight.classList.remove('pulseSubmit');
                    }, { once: true });
                }, delay);
            }
        }
        delay += 50; // Increase delay for the next diagonal
    }
};

const removePulseSubmitClass = () => {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        highlight.classList.remove('pulseSubmit');
    });
};

const handleMouseOver = (cell) => {
    if (!isMouseDown) return;
    if (cell.classList.contains('found')) return;

    const indexInSelectedCells = selectedCells.indexOf(cell);
    if (indexInSelectedCells !== -1 && indexInSelectedCells !== selectedCells.length - 1) {
        // If the cell was already selected and is not the last selected cell,
        // deselect it and all subsequent cells
        const cellsToRemove = selectedCells.splice(indexInSelectedCells + 1);
        cellsToRemove.forEach(removedCell => {
            const highlight = removedCell.querySelector('.highlight');
            highlight.style.display = 'none';
            highlight.classList.remove('animPulse'); // Remove the animation class
        });
        currWord = currWord.slice(0, indexInSelectedCells + 1);
        updateCurrWord();
        updateCanvasForDeselectedCells(cellsToRemove);

        const highlight = cell.querySelector('.highlight');
        highlight.style.display = 'block';
        highlight.classList.add('animPulse'); // Add the animation class

        // Remove the animation class after the animation ends
        highlight.addEventListener('animationend', () => {
            highlight.classList.remove('animPulse');
        }, { once: true });

        return;
    }

    if (selectedCells.length === 0 || isAdjacent(selectedCells[selectedCells.length - 1], cell)) {
        if (!selectedCells.includes(cell)) {
            if (selectedCells.length > 0) {
                const prevCell = selectedCells[selectedCells.length - 1];
                const prevRect = prevCell.getBoundingClientRect();
                const currRect = cell.getBoundingClientRect();
                const canvasRect = lineCanvas.getBoundingClientRect();

                const startX = prevRect.left + prevRect.width / 2 - canvasRect.left;
                const startY = prevRect.top + prevRect.height / 2 - canvasRect.top;
                const endX = currRect.left + currRect.width / 2 - canvasRect.left;
                const endY = currRect.top + currRect.height / 2 - canvasRect.top;

                ctx.strokeStyle = selectedLettersColor;
                ctx.lineWidth = lineWidth;
                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }

            selectedCells.push(cell);
            currWord += cell.querySelector('.letter').textContent;
            updateCurrWord();

            const highlight = cell.querySelector('.highlight');
            highlight.style.display = 'block';
            highlight.classList.add('animPulse'); // Add the animation class

            // Remove the animation class after the animation ends
            highlight.addEventListener('animationend', () => {
                highlight.classList.remove('animPulse');
            }, { once: true });
        }
    }
};

const isAdjacent = (cell1, cell2) => {
    const index1 = parseInt(cell1.dataset.index);
    const index2 = parseInt(cell2.dataset.index);

    const row1 = Math.floor(index1 / 6);
    const col1 = index1 % 6;
    const row2 = Math.floor(index2 / 6);
    const col2 = index2 % 6;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    return (rowDiff <= 1 && colDiff <= 1);
};

const handleInteractionStart = (element) => {
    if (element.closest('.cell')) {
        isMouseDown = true;
        currWord = '';
        handleMouseOver(element.closest('.cell'));
    }
};

const handleInteractionEnd = () => {
    isMouseDown = false;

    const isWordFound = foundWords.some(word => word.word === currWord);

    if (wordList.includes(currWord) && !isWordFound) {
        foundWords.push({ word: currWord, cells: [...selectedCells] });
        updateWordsFoundText();

        // Change highlight color to foundWordsColor and add 'found' class
        selectedCells.forEach((cell, index) => {
            const highlight = cell.querySelector('.highlight');
            if (currWord == spangram) {
                highlight.style.backgroundColor = foundSpangramColor;

                // Add the delayed animation for the spangram word
                setTimeout(() => {
                    highlight.classList.add('pulseSubmit');
                }, index * 50); // 100ms delay for each letter
                // Add the blue text class
                currWordDiv.classList.add('foundSpangramGoldText');
                currWordDiv.textContent = "SPANGRAM!"
            } else {
                highlight.style.backgroundColor = foundWordsColor;
                // Add the animation class
                highlight.classList.add('pulseSubmit');
                // Add the blue text class
                currWordDiv.classList.add('foundWordsBlueText');
            }
            cell.classList.add('found');

            // Remove the animation class after the animation ends
            highlight.addEventListener('animationend', () => {
                highlight.classList.remove(currWord == spangram ? 'animPulse' : 'pulseSubmit');
            }, { once: true });
        });
        // Check if all words are found
        if (areAllWordsFound()) {
            setTimeout(() => {
                removePulseSubmitClass();
                applyCascadingAnimation();
            }, 1350); // 1.35 seconds delay
        }
    } else {
        // Apply the shake animation class
        currWordDiv.classList.add('invalidshake');

        // Remove the shake animation class after the animation ends
        currWordDiv.addEventListener('animationend', () => {
            currWordDiv.classList.remove('invalidshake');
        }, { once: true });
    }

    clearSelection();
};

gridDiv.addEventListener('mousedown', (e) => handleInteractionStart(e.target));
gridDiv.addEventListener('mouseover', (e) => {
    if (e.target.closest('.cell')) {
        handleMouseOver(e.target.closest('.cell'));
    }
});
gridDiv.addEventListener('mouseup', handleInteractionEnd);
gridDiv.addEventListener('mouseleave', () => {
    isMouseDown = false;
    clearSelection();
});

gridDiv.addEventListener('touchstart', (e) => {
    handleInteractionStart(e.target);
    e.preventDefault(); 
}, { passive: false });

gridDiv.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.closest('.cell')) {
        handleMouseOver(element.closest('.cell'));
    }
    e.preventDefault();
}, { passive: false });

gridDiv.addEventListener('touchend', (e) => {
    handleInteractionEnd();
    e.preventDefault();
});

gridDiv.addEventListener('touchcancel', (e) => {
    isMouseDown = false;
    clearSelection();
    e.preventDefault(); // Prevent the default touch behavior
});

const adjustCanvasSize = () => {
    lineCanvas.width = gridDiv.clientWidth;
    lineCanvas.height = gridDiv.clientHeight;
    lineCanvas.style.position = 'absolute';
    lineCanvas.style.top = `${gridDiv.offsetTop}px`;
    lineCanvas.style.left = `${gridDiv.offsetLeft}px`;
    updateCanvasForFoundWords();
};
adjustCanvasSize();
window.addEventListener('resize', adjustCanvasSize);



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