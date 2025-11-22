// Words for the round
const WORDS = [
    "Banana", "Avion", "Profesor", "Pizza", "Computador",
    "Playa", "Guitarra", "Perro", "Hotel", "Lluvia"
];

let players = 4;
let currentPlayer = 1;
let impostor = 0;
let secretWord = "";

// UI elements
const info = document.getElementById("info");
const button = document.querySelector("button");

function setupGame() {
    secretWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    impostor = Math.floor(Math.random() * players) + 1; // one impostor
    currentPlayer = 1;
}

setupGame();

function nextPlayer() {
    if (currentPlayer > players) {
        info.textContent = "Ahora comienza el juego... digan sus pistas";
        button.style.display = "none";
        return;
    }

    info.innerHTML = `
        Pasa el dispositivo al <strong>Jugador ${currentPlayer}</strong>.<br><br>
        Cuando esté listo, haga click en "Revelar".
    `;

    button.textContent = "Revelar";
    button.onclick = revealRole;
}

function revealRole() {
    if (currentPlayer === impostor) {
        info.innerHTML = `
            <strong>¡Eres el IMPOSTOR!</strong><br>
            No puedes ver la palabra.
        `;
    } else {
        info.innerHTML = `
            <strong>La palabra es:</strong><br>
            <span style="font-size:24px; color:yellow;">${secretWord}</span>
        `;
    }

    button.textContent = "Terminar";
    button.onclick = finishRole;
}

function finishRole() {
    currentPlayer++;

    if (currentPlayer <= players) {
        nextPlayer();
    } else {
        info.textContent = "Todos los jugadores han recibido sus roles";
        button.style.display = "none";
    }
}
