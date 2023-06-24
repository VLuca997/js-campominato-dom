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
// SCORE
const scoreElement = document.getElementById('score');

function generateGrid(){
    let numbElement = 100; // numero celle
    const containerElements = document.querySelector('.my-grid-container'); 
    const bombElement = 16; // numero bombe totali
    const bombs = []; // array per memorizzare dove sono posizionate le bombe
    const revealed = []; // array oer le celle non bombe
    let score = 0; // risultato

    containerElements.innerHTML = ""; // svuotiamo il container della griglia
    scoreElement.textContent = "Punteggio = 0";// reimposta il punteggio a zero
    gameOverFlag = false; // reimposta il flag del game over a false

    //generiamo la posizione delle bombe in modo causale
    while (bombs.length < bombElement){
        const randomNumber = Math.floor(Math.random() * numbElement) +1;
        if (!bombs.includes(randomNumber)){
            bombs.push(randomNumber);
        }
    }

    for (let index = 1; index <= numbElement; index++){
        const newElement = document.createElement('div');// selezioniamo l'elemento div da sostituire
        newElement.classList.add('element'); // aggiungiamo la Classe CSS element
        newElement.textContent = index; // stampiamo il numer ocorretto in ogni element
        newElement.addEventListener('click', function(){
            if(gameOverFlag){
                return;// se il gioco termina, non puoi piu cliccare nulla
            }

            if(bombs.includes(index)){// se la cella è una bomba
                this.classList.add('bomb'); // Aggiungiamo la classe "bomb" all'elemento per evidenziarlo
                gameOver(); // Chiamiamo la funzione gameOver per terminare il gioco
                console.log('Mangekyou Sharingan!! ' + index); // Stampiamo un messaggio in console indicando la posizione della bomba
            }
            else if(!revealed.includes(index)){// Se l'elemento non è stato ancora rivelato
                this.classList.add('revealed');// Aggiungiamo la classe "relealed" all'elemento per evidenziarlo come rivelato
                revealed.push(index);// Aggiungiamo l'elemento all'array dei rivelati
                score++;// Incrementiamo il punteggio
                scoreElement.textContent = "Punteggio: " + score; // Aggiorniamo il punteggio visualizzato nell'HTML
                console.log("Campo Pulito"); // Stampiamo un messaggio in console indicando che l'elemento è stato rivelato come campo pulito


                if (score === numbElement - bombElement){// Se l'utente ha rivelato tutti gli elementi non bomba
                    gameWon();//win
                    
                }
            }
        });
        containerElements.append(newElement);// Aggiungiamo l'elemento al contenitore della griglia

        if (index % 10 === 0){
            containerElements.append(document.createElement('br')); // Ogni 10 elementi aggiungiamo un elemento <br> per andare a capo
        }
    }
}
// PERDITA
function gameOver(){
    gameOverFlag = true; // impostiamo i lflag del game over a true
    alert("Sei finito!")
}
// VITTORIA
function gameWon(){
    gameOverFlag = true;
    alert('Hai Vinto!');
}
