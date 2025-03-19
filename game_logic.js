let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let gameOver = false;

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    if (gameOver) return;

    const id = e.target.id;

    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        let img = document.createElement('img');
        img.src = currentPlayer === X_TEXT ? 'x.png' : 'o.png';
        e.target.appendChild(img);

        const winner = playerHasWon();
        if (winner !== false) {
            displayWinner(winner);
            gameOver = true;
        }

        const isFull = spaces.every(item => item !== null && item !== undefined);
        if (isFull){
            displayTie();
            gameOver = true;
        }
        
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function displayTie(){
    playerText.innerHTML = '';
    let img1 = document.createElement('img');
    let img2 = document.createElement('img');
    img1.src = 'x.png'
    img2.src = 'o.png'
    img1.style.width = '50px'; 
    img1.style.height = '50px';
    img2.style.width = '50px'; 
    img2.style.height = '50px';
    playerText.appendChild(img1);
    playerText.appendChild(img2);
    let tie = document.createElement('p');
    tie.textContent = `Tie!`;
    playerText.appendChild(tie);

}

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return spaces[a];
        }
    }
    return false;
}

function displayWinner(winner) {

    playerText.innerHTML = '';

    let winnerImg = document.createElement('img');
    winnerImg.src = winner === X_TEXT ? 'x.png' : 'o.png';
    winnerImg.alt = `${winner} Wins!`;
    winnerImg.style.width = '50px'; 
    winnerImg.style.height = '50px';
    playerText.appendChild(winnerImg);

    let winnerText = document.createElement('p');
    winnerText.textContent = `has won!`;
    playerText.appendChild(winnerText);
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        while (box.firstChild) {
            box.removeChild(box.firstChild);
        }
    });

    playerText.innerHTML = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    gameOver = false;
}

startGame();
