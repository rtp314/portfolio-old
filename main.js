//ANIMATIONS

const isReduced =
    window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

if (!isReduced) {
    typingAnimation(document.querySelector(".subtitle"), 100);
}

function typingAnimation(el, delay) {
    function blinkCursor() {
        return new Promise((resolve) => {
            setTimeout(() => (cursor.style.opacity = 0), 500);
            setTimeout(() => (cursor.style.opacity = 1), 1000);
            setTimeout(() => (cursor.style.opacity = 0), 1500);
            setTimeout(() => {
                cursor.style.opacity = 1;
                resolve();
            }, 2000);
        });
    }

    function typing() {
        return new Promise((resolve) => {
            for (let i = 0; i < contentsArray.length; i++) {
                setTimeout(() => {
                    cursor.before(contentsArray[i]);
                    if (i === contentsArray.length - 1) {
                        resolve();
                    }
                }, i * delay);
            }
        });
    }

    const contentsArray = el.innerText.split("").map((letter) => {
        const newSpan = document.createElement("span");
        newSpan.innerText = letter;
        return newSpan;
    });
    const cursor = document.createElement("span");
    cursor.innerHTML = "█";
    // cursor.style.fontSize = "0.9em";
    el.innerText = "";
    el.appendChild(cursor);
    blinkCursor()
        .then(typing)
        .then(blinkCursor)
        .then(blinkCursor)
        .then(() => cursor.remove());
}

//PROJECT DISPLAY LOGIC

const display = document.getElementById("project-display");

// const social = document.getElementById("social");
// const calculator = document.getElementById("calculator");
// const d3 = document.getElementById("d3");
// const snake = document.getElementById("snake");
// const store = document.getElementById("store");
// const rps = document.getElementById("rps");

// const buttons = [social, calculator, d3, snake, store, rps];

// const calculatorDisplay = document.getElementById("calculator-display");
// const socialDisplay = document.getElementById("social-display");
// const d3Display = document.getElementById("d3-display");
// const snakeDisplay = document.getElementById("snake-display");
// const storeDisplay = document.getElementById("store-display");
// const rpsDisplay = document.getElementById("rps-display");

// const displays = [calculatorDisplay, socialDisplay, d3Display, snakeDisplay, storeDisplay, rpsDisplay];

const closableInfo = Array.from(document.getElementsByClassName("closable-info"));
const buttons = Array.from(document.getElementsByClassName("project-button"));
const displays = Array.from(document.getElementsByClassName("project-display"));

closableInfo.forEach((div) => div.addEventListener("click", () => (div.style.display = "none")));

buttons.forEach((el) => el.addEventListener("click", handleProjectChange));

function handleProjectChange(e) {
    const projectName = e.currentTarget.id;
    const projectDisplay = document.getElementById(projectName + "-display");
    closeOthers(projectDisplay);
    setButtonStyle(e.currentTarget);
}

function closeOthers(focused) {
    displays.forEach((element) => {
        if (element === focused) {
            element.style.display = "block";
            element.scrollIntoView({ behavior: "smooth" });
        } else {
            element.style.display = "none";
        }
        closableInfo.forEach((div) => (div.style.display = "block"));
    });
}

function setButtonStyle(el) {
    buttons.forEach((button) => {
        if (button === el) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
    });
}
