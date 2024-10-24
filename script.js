let currentNumber = 1;
let score = 0;
let interval;
let startTime;
let lastReactionTime = 0;
let canScore = true; // Flaga, która pozwala na zdobycie punktu tylko raz
function startGame() {
   resetGame();
   const speedInput = document.getElementById("speed");
   const speedValue = speedInput.value;
   document.getElementById("speed-value").textContent = `${speedValue / 1000}s`;
   interval = setInterval(() => {
       displayNextNumber();
   }, speedValue);
   startTime = new Date().getTime();
}
function resetGame() {
   currentNumber = 1;
   score = 0;
   document.getElementById("score").textContent = score;
   document.getElementById("reaction-time").textContent = "0";
   clearInterval(interval);
   startTime = new Date().getTime();
   canScore = true; // Resetujemy flagę po każdym uruchomieniu gry
}
function displayNextNumber() {
   document.querySelector(".number-display").textContent = currentNumber;
   currentNumber++;
   canScore = true; // Pozwalamy na zdobycie punktu dla nowej liczby
}
function isSpecialNumber(number) {
   return number % 7 === 0 || number.toString().includes("7");
}
document.getElementById("boar").addEventListener("click", () => {
   const currentDisplayedNumber = currentNumber - 1;
   if (isSpecialNumber(currentDisplayedNumber) && canScore) {
       score++;
       document.getElementById("score").textContent = score;
       const reactionTime = new Date().getTime() - startTime;
       lastReactionTime = reactionTime;
       document.getElementById("reaction-time").textContent = reactionTime;
       startTime = new Date().getTime(); // reset for the next reaction time
       canScore = false; // Blokujemy możliwość zdobycia punktu na tej liczbie
   } else if (!isSpecialNumber(currentDisplayedNumber)) {
       score--;
       document.getElementById("score").textContent = score;
   }
});
document.getElementById("speed").addEventListener("input", (event) => {
   document.getElementById("speed-value").textContent = `${event.target.value / 1000}s`;
   clearInterval(interval);
   startGame();
});
function saveHighScore(score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Sortujemy od najwyższego do najniższego
    highScores = highScores.slice(0, 5); // Zatrzymujemy tylko 5 najlepszych wyników
    localStorage.setItem("highScores", JSON.stringify(highScores));
 }
 function showHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let list = "<h3>Ranking Wyników:</h3><ul>";
    highScores.forEach((score, index) => {
        list += `<li>${index + 1}. ${score} punktów</li>`;
    });
    list += "</ul>";
    document.querySelector(".scoreboard").innerHTML += list;
 }

