/*
    1) inizializzo le variabili per : N° bombe, punteggio.
    2) Genero casualmente il posizionaemento delle bombe
    3) aggiungo una gestione di eventi click per gli elementi della griglia
        - verifico se l'elemento cliccato è una bomba
            -SE è una bomba: il gioco finisce.
            -ALTRIMENTI: il gioco prosegue, mi stampa un punto.
        -verifichiamo se l'utente ha cliccato tutte le celel non bombe
    4)  al termine della partita, stampa il risultato finale.
*/

// variabile flag per indicare la fine del gioco
let gameOverFlag = false;

function generateGrid(){
    let numbElement = 100; // numero celle
    const containerElements = document.querySelector('.my-grid-container'); 
    const bombElement = 16; // numero bombe totali
    const bombs = []; // array per memorizzare dove sono posizionate le bombe
    const revealed = []; // array oer le celle non bombe
    let score = 0; // risultato

    containerElements.innerHTML = '';
    
    //generiamo la posizione delle bombe in modo causale
    while (bombs.length < bombElement){
        const randomNumber = Math.floor(Math.random() * numbElement) +1;
        if (!bombs.includes(randomNumber)){
            bombs.push(randomNumber);
        }
    }

    for (let index = 1; index <= numbElement; index++){
        const newElement = document.querySelector('div');
        newElement.classList.add('element');
        newElement.textContent = index;
        newElement.addEventListener('click', function(){
            if(gameOverFlag){
                return;// se il gioco termina, non puoi piu cliccare nulla
            }

            if(bombs.includes(index)){// se la cella è una bomba
                this.classList.add('bomb');
            }
        })
    }

}
// PERDITA
function gameOver(){
    gameOverFlag = true; // impostiamo i lflag del game over a true
    alert("Sei finito!")
}
// VITTORIA
function gameWin(){
    gameOverFlag = true;
    alert('Hai Vinto!');
}
// SCORE
const scoreElement = document.getElementById('score');


