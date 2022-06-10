window.onload = function () {
    const outer = document.getElementById("social-display");
    const inner = document.getElementById("social-info");
    if (outer.offsetHeight < inner.offsetHeight) {
        outer.style.height = inner.offsetHeight + 10 + "px";
    }
    console.log("inner: " + inner.offsetHeight);

    const display = document.getElementById("project-display");

    const social = document.getElementById("social");
    const calculator = document.getElementById("calculator");
    const d3 = document.getElementById("d3");
    // const vadsbo = document.getElementById("vadsbo");

    const calculatorDisplay = document.getElementById("calculator-display");
    const socialDisplay = document.getElementById("social-display");
    const d3Display = document.getElementById("d3-display");
    // const vadsboDisplay = document.getElementById("vadsbo-display");

    const buttons = [social, calculator, d3];
    const displays = [calculatorDisplay, socialDisplay, d3Display];

    const closableInfo = Array.from(document.getElementsByClassName("absolute"));

    closableInfo.forEach((div) => div.addEventListener("click", () => (div.style.display = "none")));

    calculator.addEventListener("click", () => closeOthers(calculatorDisplay));
    social.addEventListener("click", () => closeOthers(socialDisplay));
    d3.addEventListener("click", () => closeOthers(d3Display));
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
};
