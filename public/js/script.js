const sections = document.querySelectorAll('section:not(:first-of-type)');
const anchors = document.querySelectorAll('a');
const beerAnchors = document.querySelectorAll('#beers a');
const bookAnchors = document.querySelectorAll('#books a');
const arrayBeerAnchors = [...beerAnchors];
const arrayBookAnchors = [...bookAnchors];
arrayBeerAnchors.reverse();
arrayBookAnchors.reverse();
const currentThemeText = document.querySelector('#current-theme');

// Randomize position of images
anchors.forEach(anchor => {
    anchor.style.top = `${Math.floor(Math.random() * 250) + 100}px`;
    anchor.style.left = `${Math.floor(Math.random() * 650) + 250}px`;
});

// Remove image dragging animation
const images = document.querySelectorAll('img');
images.forEach(image => {
    image.ondragstart = () => {
        return false;
    }
});

let counterMouseMove = 0;

// Add focus styling and move anchors with keyboard
anchors.forEach(anchor => {
    anchor.addEventListener('focus', event => {
        event.preventDefault();
        anchors.forEach(a => {
            a.classList.remove('dragged');
            a.removeEventListener('keydown', moveKeys);
            a.removeEventListener('mousemove', mouseMove);
        });
        anchor.classList.add('dragged');
        anchor.addEventListener('keydown', moveKeys);
    });

    // Mouse dragging
    anchor.addEventListener('mousedown', () => {
        anchor.addEventListener('mousemove', mouseMove);
    });
    anchor.addEventListener('mouseup', () => {
        anchor.removeEventListener('mousemove', mouseMove);
    });

    const moveKeys = e => {
        const keyCode = e.keyCode;
        // On click 'H' or 'left arrow'
        if (keyCode === 37 || keyCode === 72) {
            anchor.style.left = parseInt(anchor.style.left) - 15 + "px";
        }
        // On click 'K' or 'top arrow'
        else if (keyCode === 38 || keyCode === 75) {
            anchor.style.top = parseInt(anchor.style.top) - 15 + "px";
        }
        // On click 'L' or 'right arrow'
        else if (keyCode === 39 || keyCode === 76) {
            anchor.style.left = parseInt(anchor.style.left) + 15 + "px";
        }
        // On click 'J' or 'bottom arrow'
        else if (keyCode === 40 || keyCode === 74) {
            anchor.style.top = parseInt(anchor.style.top) + 15 + "px";
        }
    }

    const mouseMove = e => {
        const xPosition = e.clientX;
        const yPosition = e.clientY;
        const maxWidth = window.innerWidth - 60;
        const maxHeight = window.innerHeight - 220;
        const edgeDetectionQuery = (xPosition < maxWidth && xPosition > 60) && (yPosition < window.innerHeight && yPosition < maxHeight && yPosition > 220)

        if (edgeDetectionQuery) {
            console.log(window.innerWidth)
            anchor.style.left = `${xPosition - 60}px`;
            anchor.style.top = `${yPosition - 220}px`;
        }
    }
});

let counterTab = 0;
let counterThemeSelector = 0;

// Eventlisteners on keypress
window.addEventListener('keyup', e => {
    const keyCode = e.keyCode;

    // On click 'O'
    if (keyCode === 79) {
        counterTab--;
        if (counterTab < 0) {
            counterTab = 14
        }
    }
    // On click 'P'
    if (keyCode === 80) {
        counterTab++;
        if (counterTab === 15) {
            counterTab = 0
        }
    }
    // Add focus to next anchor
    if (counterThemeSelector % 2 === 1) {
        arrayBookAnchors[counterTab].focus();
    } else {
        arrayBeerAnchors[counterTab].focus();
    }

    // On click 'spacebar'
    if (keyCode === 32) {
        counterThemeSelector++;
        sections.forEach(section => {
            section.classList.toggle('hidden');
            if (counterThemeSelector % 2 === 1) {
                currentThemeText.textContent = 'Huidig thema: Boeken';
                arrayBookAnchors[counterTab].focus();
            } else {
                currentThemeText.textContent = 'Huidig thema: Bier';
                arrayBeerAnchors[counterTab].focus();
            }
        });
    }
});