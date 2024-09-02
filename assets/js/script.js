const screens = document.querySelectorAll(".screen");
const choose_insect_btns = document.querySelectorAll(".choose-insect-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container") ;
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
const resetBtn = document.getElementById("restart-btn");

let seconds = 0;
let score = 0;
let selected_insect = {};
let intervalId;

function resetValues()
{
    seconds = 0;
    score = 0;
    selected_insect = {};
    intervalId;
}

start_btn.addEventListener("click", () => screens[0].classList.add("up"));
choose_insect_btns.forEach(btn => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        selected_insect = {src, alt};
        screens[1].classList.add("up");
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function homePage() {
    resetTexts();
    resetValues();
    removeInsects();
}

function resetTexts()
{
    screens[2].classList.remove("up");
    screens[1].classList.remove("up");
    screens[0].classList.remove("up");
    timeEl.innerHTML = `Time: 00:00`;
    scoreEl.innerHTML = `Score: 0`;
}

function removeInsects()
{    
    const elements = game_container.getElementsByClassName("insect");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function startGame() {
    intervalId = setInterval(increaseTime, 1000);
}

function increaseTime() {
    
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    if( m < 1 || (m==1 && s<1))
        {
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time ${m}:${s}`;
    seconds++;
    }
    else
    {
        screens[2].classList.add("up");
        document.getElementById("finalscoretxt").innerHTML = document.getElementById("finalscoretxt1").innerHTML + `${score}`;
        clearInterval(intervalId);
    }
}

function createInsect() {
    const insect = document.createElement("div");
    insect.classList.add("insect");
    const {x, y} = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style = "transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener("click", catchInsect);

    game_container.appendChild(insect);

}

function catchInsect() {
    increaseScore();
    this.classList.add("caught");
    setTimeout(() => this.remove(), 2000);
    addInsect();
}

function addInsect() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 1500);
}

function increaseScore() {
    score++;
    if (score == 19) {
        message.classList.add("visible");
    }
    if(score == 20)
    {
        message.classList.remove("visible");
    }
    scoreEl.innerHTML = `Score: ${score}`;
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width -200) + 100;
    const y = Math.random() * (height -200) + 100;
    return {x, y};
}

// const resetBtn = document.getElementById("restart-btn");
resetBtn.addEventListener("click", homePage);