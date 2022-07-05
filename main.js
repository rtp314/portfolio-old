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

window.onload = function () {
    const outer = document.getElementById("social-display");
    const inner = document.getElementById("social-info");
    if (outer.offsetHeight < inner.offsetHeight) {
        outer.style.height = inner.offsetHeight + 10 + "px";
    }

    const display = document.getElementById("project-display");

    const social = document.getElementById("social");
    const calculator = document.getElementById("calculator");
    const d3 = document.getElementById("d3");
    const snake = document.getElementById("snake");
    const store = document.getElementById("store");
    const rps = document.getElementById("rps");

    // const vadsbo = document.getElementById("vadsbo");

    const calculatorDisplay = document.getElementById("calculator-display");
    const socialDisplay = document.getElementById("social-display");
    const d3Display = document.getElementById("d3-display");
    const snakeDisplay = document.getElementById("snake-display");
    const storeDisplay = document.getElementById("store-display");
    const rpsDisplay = document.getElementById("rps-display");

    // const vadsboDisplay = document.getElementById("vadsbo-display");

    const buttons = [social, calculator, d3, snake, store, rps];
    const displays = [calculatorDisplay, socialDisplay, d3Display, snakeDisplay, storeDisplay, rpsDisplay];

    const closableInfo = Array.from(document.getElementsByClassName("absolute"));

    closableInfo.forEach((div) => div.addEventListener("click", () => (div.style.display = "none")));

    calculator.addEventListener("click", () => closeOthers(calculatorDisplay));
    social.addEventListener("click", () => closeOthers(socialDisplay));
    d3.addEventListener("click", () => closeOthers(d3Display));
    snake.addEventListener("click", () => closeOthers(snakeDisplay));
    store.addEventListener("click", () => closeOthers(storeDisplay));
    rps.addEventListener("click", () => closeOthers(rpsDisplay));

    // vadsbo.addEventListener("click", () => closeOthers(vadsboDisplay));

    function closeOthers(focused) {
        displays.forEach((element) => {
            if (element === focused) {
                element.style.display = "block";
                display.scrollIntoView({ behavior: "smooth" });
            } else {
                element.style.display = "none";
            }
            closableInfo.forEach((div) => (div.style.display = "block"));
        });
    }

    typingAnimation(document.querySelector(".subtitle"), 100);
};
