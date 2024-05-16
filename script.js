//-------------------------------VARIABILI / ARRAYS / CLASSI-------------------------------//

class Carta{
    constructor(val1, fig, seme, src){
        this.val1 = val1;
        this.figura = fig;
        this.seed = seme;
        this.src = src;
    }
}

class Player{
    constructor(nome){
        this.name = nome;
        this.fiches = 500;
        this.bet = 0;
        this.mazzo = [];
        this.score = 0;
        this.double = false;
        this.win = false;
        this.draw = false;
    }
    addScore(valore){
        this.score += valore;
    }
    updateBet(betDone){
        this.bet = betDone;
    }
    doubleBet(){
        this.fiches = this.fiches - this.bet;
        this.bet = this.bet * 2;
        this.double = true;
    }
    updateFiches(){
        this.fiches = this.fiches - this.bet;
    }
    payBet(){
        this.fiches = this.fiches + (this.bet * 2);
    }
    drawBet(){
        this.fiches = this.fiches + this.bet;
    }
    setWin(){
        this.win = true;
    }
    setDraw(){
        this.draw = true;
    }
    resetFiches(){
        this.fiches = 500;
    }
}

let mazzo = [];
let players = [];
let cartePc = [];
let scorePc = 0;
let contatore = 0;
let nplayer = 0;
let contatorePlayer = 1;
let turno = 0;
let scorePlayerMin = 0;
let contatoreBet = 0
let contatoreCarta = 0;
let indexCarta = 0
let indexPlayerBet = 0;

//---------------------------------CREAZIONE MAZZO MISCHIATO-------------------------------//

function initCarte(){
    createCarteFiori();
    createCarteCuori();
    createCartePicche();
    createCarteQuadri();
    shuffleCard();
}

function createCarteFiori(){
    let a = new Carta(11, "asso", "fiori", "cards/assofiori.jpg"); //l'asso vale sia 11 che 1
    mazzo.push(a);
    for(let i = 2; i < 11; i++){
        contatore ++;  
        let c = new Carta(i, "no", "fiori", "cards/" + i + "fiori.jpg");
        mazzo.push(c);
    }
    contatore ++;  
    let j = new Carta(10, "j", "fiori", "cards/jfiori.jpg");
    mazzo.push(j);
    contatore ++;  
    let q = new Carta(10, "q", "fiori", "cards/qfiori.jpg");
    mazzo.push(q);
    contatore ++;  
    let k = new Carta(10, "k", "fiori", "cards/kfiori.jpg");
    mazzo.push(k);
}
function createCartePicche(){
    contatore ++;  
    let a = new Carta(11, "asso", "picche", "cards/assopicche.jpg");
    mazzo.push(a);
    for(let i = 2; i < 11; i++){
        contatore ++;  
        let c = new Carta(i, "no", "picche", "cards/" + i + "picche.jpg");
        mazzo.push(c);  
    }
    contatore ++;  
    let j = new Carta(10, "j", "picche", "cards/jpicche.jpg");
    mazzo.push(j);
    contatore ++;  
    let q = new Carta(10, "q", "picche", "cards/qpicche.jpg");
    mazzo.push(q);
    contatore ++;  
    let k = new Carta(10, "k", "picche", "cards/kpicche.jpg");
    mazzo.push(k);
}
function createCarteCuori(){
    contatore ++;         
    let a = new Carta(11, "asso", "cuori", "cards/assocuori.jpg");
    mazzo.push(a);
    for(let i = 2; i < 11; i++){
        contatore ++;  
        let c = new Carta(i, "no", "cuori", "cards/" + i + "cuori.jpg");
        mazzo.push(c);  
    }
    contatore ++;  
    let j = new Carta(10, "j", "cuori", "cards/jcuori.jpg");
    mazzo.push(j);
    contatore ++;  
    let q = new Carta(10, "q", "cuori", "cards/qcuori.jpg");
    mazzo.push(q);
    contatore ++;  
    let k = new Carta(10, "k", "cuori", "cards/kcuori.jpg");
    mazzo.push(k);
}
function createCarteQuadri(){
    contatore ++;  
    let a = new Carta(11, "asso", "quadri", "cards/assoquadri.jpg");
    mazzo.push(a);
    for(let i = 2; i < 11; i++){
        contatore ++;  
        let c = new Carta(i, "no", "quadri", "cards/" + i + "quadri.jpg");
        mazzo.push(c);  
    }
    contatore ++;  
    let j = new Carta(10, "j", "quadri", "cards/jquadri.jpg");
    mazzo.push(j);
    contatore ++;  
    let q = new Carta(10, "q", "quadri", "cards/qquadri.jpg");
    mazzo.push(q);
    contatore ++;  
    let k = new Carta(10, "k", "quadri", "cards/kquadri.jpg");
    mazzo.push(k);
}

function shuffleCard(){ 
    for(let i = 0; i < 53; i ++){
        let index1 = parseInt(Math.random() * 52);
        let index2 = parseInt(Math.random()* 52);  
        
        var temp = mazzo[index1]; 
        mazzo[index1] = mazzo[index2]; 
        mazzo[index2] = temp; 
    }
}

//-------------------------------FUNZIONI CREAZIONE GIOCATORI------------------------------//

function createCampoPlayer(){
    for(let i = 0; i < players.length; i++){
        let nome = players[i].name
        getGraficaPlayer(i, nome);

        aggiungiCartaPlayerStart(i);
        aggiungiCartaPlayerStart(i);

        contatoreCarta = 0;
    }
}

function initAskPlayer(){
    let numeroTemp = document.getElementById("nGiocatori").value;
    
    if(numeroTemp > 0 && numeroTemp < 4){
        document.getElementById("nGiocatori").setAttribute("class", "notVisible");
        document.getElementById("nomeGiocatore").setAttribute("class", "inputHome");
        document.getElementById("send").setAttribute("onclick", "initPlayer()");
        document.getElementById("nomeGiocatore").setAttribute("placeholder", "Nome Giocatore " + contatorePlayer);

        nplayer = numeroTemp;
    }
    else {
        alert("Attenzione! Inserisci un Numero di Giocatori valido!");
        document.getElementById("nGiocatori").value = "";
    }
}

function initPlayer(){
    if(contatorePlayer < nplayer && nplayer > 1){
        createPlayer();
    }
    else{
        document.getElementById("nomeGiocatore").setAttribute("class", "notVisible");
        document.getElementById("send").setAttribute("class", "notVisible");
        document.getElementById("start").setAttribute("class", "buttonHome");
        document.getElementById("luck").setAttribute("class", "goodluck");

        createPlayer();
    }
}

function createPlayer(){
    let nomeTemp = document.getElementById("nomeGiocatore").value;

    let b = new Player(nomeTemp);
    players.push(b);

    contatorePlayer ++;

    document.getElementById("nomeGiocatore").setAttribute("placeholder", "Nome Giocatore " + contatorePlayer);
    document.getElementById("nomeGiocatore").value = "";
}

//-------------------------------------FUNZIONI DI GIOCO-----------------------------------//

function initGame(){
    document.getElementById("home").setAttribute("class","notVisible");
    document.getElementById("game").setAttribute("class","visible");
    document.getElementById("gameSpace").setAttribute("class","gameTable");

    initCarte();
    createCampoPlayer();
    aggiungiCartaGirataPc(0);
    aggiungiCartaGirataPc(1);
    updateGraficoTurno();
}

function bet(id){
    let betDone = parseInt(document.getElementById("importoBet" + id).value);
    if(betDone > 0 && players[id].fiches >= betDone){
        giraCartaGraficaPlayers(id);
        indexCarta = 0;

        resetButton(id);

        players[id].updateBet(betDone);
        getGraficaBet(id);

        players[id].updateFiches();
        updateGraficaFiches(id);

        indexPlayerBet ++;
    }
    else if (betDone == 0 || betDone > players[id].fiches && players[id].fiches != 0){
        document.getElementById("importoBet" + id).value = "20";

        alert(players[id].name + " inserisci una bet valida!");
    }
    else if(players[id].fiches == 0){
        document.getElementById("importoBet" + id).value = "";

        alert(players[id].name + " ricarica le fiches!");
    }

    if(indexPlayerBet == players.length){
        giraCartaGraficaPc(0);
    }
}

function checkAssiPlayer(id){
    for(let i = 0; i < players[id].mazzo.length; i++){
        if(players[id].mazzo[i].val1 == 11 && players[id].score > 21){

            players[id].mazzo[i].val1 = 1;
            players[id].score -= 10;

            updateGraficoScorePlayer(id)

            if(players[id].score > 21){
                changeTurn(scorePc);
            }
        }
    }
}

function checkAssiPc(){
    for(let i = 0; i < cartePc.length; i++){
        if(cartePc[i].val1 == 11 && scorePc > 21){

            cartePc[i].val1 = 1;
            scorePc -= 10;

            updateGraficoScorePc()

            if(scorePc > 21){
                endGame();
            }
        }
    }
}

function double(){
    if((players[turno].bet*2) <= (players[turno].fiches + players[turno].bet)){
        players[turno].doubleBet();

        getGraficaBet(turno);
        updateGraficaFiches(turno);
        aggiungiCartaPlayer(turno);
        
        changeTurn();
    }
    else {
        alert(players[turno].name + " fiches insufficienti!");
    }
}

function changeTurn(){
    if(turno < players.length - 1){
        turno ++;
        updateGraficoTurno();
    }
    else {
        turno ++;
        dealerTurn();
        updateGraficoTurno();
    }
}

function dealerTurn(){
    giraCartaGraficaPc(1);
    updateGraficoScorePc();
    unableButton();
    
    setTimeout(() => {
        scorePlayerMin = players[0].score;
        for(let i = 1; i < players.length; i ++){
            if(players[i].score < scorePlayerMin){
                scorePlayerMin = players[i].score;
            }
        }

        if(scorePlayerMin < 22 && scorePc < 17){ //il dealer deve hittare almeno 17
            if(scorePc == scorePlayerMin && scorePc > 16){
                endGame(scorePc);
            }
            else { 
                for(; scorePc < scorePlayerMin && scorePc < 17;){
                    aggiungiCartaPc();
                    updateGraficoScorePc()
                }
                endGame(scorePc);
            }
        }
        else if(scorePc < 17 && scorePlayerMin > 21){
            for(; scorePc < 17;){
                aggiungiCartaPc();
                updateGraficoScorePc()
            }
            endGame(scorePc);
        }
        else{
            endGame(scorePc);        
        }
    }, 500);
}

//---------------------------------FUNZIONI AGGIUNGI CARTE---------------------------------//

function aggiungiCartaPlayerStart(id){
    let c1 = mazzo[0];
    players[id].mazzo.push(c1);

    getGraficaCartaGirataPlayer(id);
    
    players[id].addScore(c1.val1);
    
    mazzo.shift();
}

function aggiungiCartaPlayer(){
    let c1 = mazzo[0];
    players[turno].mazzo.push(c1);

    getCartaGraficaPlayer(mazzo[0].src, turno);

    punteggioPlayer(mazzo[0].val1, turno);

    mazzo.shift();
}

function aggiungiCartaPc(){
    let c1 = mazzo[0];
    cartePc.push(c1);

    getCartaGraficaPc(mazzo[0].src);

    punteggioPc(mazzo[0].val1);

    mazzo.shift();
}

function aggiungiCartaGirataPc(temp){
    let c1 = mazzo[0];
    cartePc.push(c1);

    getGraficaCartaGirataPc(temp);

    punteggioPc(mazzo[0].val1);

    mazzo.shift();
}

//------------------------------------PUNTEGGIO GIOCATORI----------------------------------//

function punteggioPlayer(valore, id){
    players[id].addScore(valore);

    checkAssiPlayer(id);

    updateGraficoScorePlayer(id);
    
    if(players[id].score > 21 && players[id].double == false){
        changeTurn();
    }
}

function punteggioPc(valore){
    scorePc += valore;

    checkAssiPc();
}

//------------------------------------FUNZIONI FINE GIOCO----------------------------------//

function endGame(scorePc){
    for(let i = 0; i < players.length; i ++){
        let indexScore = players[i].score;
        if(scorePc > 21 && indexScore > 21){
            drawBetJs(i);
        }
        else if(scorePc > 21){
            payBetJs(i);
        }
        else if (indexScore > 21){
            loseBetJs(i);
        }
        else if (indexScore > scorePc){
            payBetJs(i);
        }
        else if (indexScore == scorePc){
            drawBetJs(i);
        }
        else {
            loseBetJs(i);
        }
    }

    setTimeout(() => {
        setPopUp(); 
    }, 1000);
}

function payBetJs(id){
    players[id].setWin();
    players[id].payBet();
    updateGraficaFiches(id);
    resetGraficaBet(id);
}

function loseBetJs(id){
    resetGraficaBet(id);
}

function drawBetJs(id){
    players[id].setDraw();
    players[id].drawBet();
    updateGraficaFiches(id);
    resetGraficaBet(id);
}

function checkRicaricaFiches(){
    for(let i = 0; i < players.length; i++){
        if(players[i].fiches == 0){
            setGraficaButtonRicarica(i);
        }
    }
}

function ricaricaFiches(id){
    players[id].resetFiches();
    
    document.getElementById("importoBet" + id).value = "20";
    
    resetFichesPlayer(id);
    removeGraficaButtonRicarica(id);
}

//--------------------------------FUNZIONI RESTART/END GAME--------------------------------//

function continueGame(){
    mazzo = [];
    cartePc = [];
    scorePc = 0;
    contatore = 0;
    nplayer = 0;
    contatorePlayer = 1;
    turno = 0;
    scorePlayerMin = 0;
    contatoreBet = 0;
    contatoreCarta = 0;
    indexCarta = 0;
    indexPlayerBet = 0;

    for(let i = 0; i < players.length; i++){
        players[i].bet = 0;
        players[i].mazzo = [];
        players[i].score = 0;
        players[i].double = false;
        players[i].win = false;
        players[i].draw = false;
    }

    resetGraficaGame();
    initGame();
    checkRicaricaFiches();
    ableButton();
}

//----------------------------------FUNZIONI GRAFICHE GIOCO-------------------------------//

function getGraficaPlayer(id, nome){
    let spanNome = document.createElement("span");
    spanNome.setAttribute("class", "giocatore");
    spanNome.setAttribute("id", "namePlayer" + id);
    spanNome.innerText = nome;

    let spanScore = document.createElement("span");
    spanScore.setAttribute("class", "score");
    spanScore.innerText = "?";
    spanScore.setAttribute("id", "playerScore" + id);

    let pGiocatore = document.createElement("p");
    pGiocatore.appendChild(spanNome);
    pGiocatore.appendChild(spanScore);

    let spanCard = document.createElement("span");
    spanCard.setAttribute("id", "playerCard" + id);
    spanCard.setAttribute("class", "spanCardPlayers");

    let br = document.createElement("br");

    let img = document.createElement("img");
    img.setAttribute("src", "imgBJ/fiches.PNG");
    img.setAttribute("class", "notVisible");
    img.setAttribute("id", "imgBet" + id);

    let spanFiches = document.createElement("span");
    spanFiches.setAttribute("class", "spanFiches");
    spanFiches.setAttribute("id", "betFiches" + id);

    let inputBet = document.createElement("input");
    inputBet.setAttribute("type", "number");
    inputBet.setAttribute("value", 20);
    inputBet.setAttribute("id", "importoBet" + id);
    inputBet.setAttribute("class", "betInput");

    let buttonBet = document.createElement("button");
    buttonBet.setAttribute("class", "buttonBet");
    buttonBet.setAttribute("id", "addBet" + id);
    buttonBet.innerText = "Bet";
    buttonBet.setAttribute("onclick", "bet(" + id + ")");

    let p = document.createElement("p");
    p.appendChild(spanFiches);
    p.appendChild(img);
    p.appendChild(inputBet);
    p.appendChild(buttonBet);

    let div = document.createElement("div");
    div.setAttribute("id", "divPlayer" + id);
    div.setAttribute("class", "playerSpace");
    div.appendChild(pGiocatore);
    div.appendChild(spanCard);
    div.appendChild(br);
    div.appendChild(p);

    document.getElementById("campoPlayers").appendChild(div);

    getGraficaFiches(id);
}

function updateGraficoTurno(){
    if(turno < players.length){
        let turnoNome = players[turno].name;
        document.getElementById("turn").innerText = turnoNome;
    }
    else {
        document.getElementById("turn").innerText = "Dealer";
    }
}

function updateGraficoScorePlayer(id){
    document.getElementById("playerScore" + id).innerText = players[id].score;
}

function updateGraficoScorePc(){
    document.getElementById("pcScore").innerText = scorePc;
}

//-----------------------------FUNZIONI GRAFICHE AGGIUNTA CARTE----------------------------//

function getGraficaCartaGirataPlayer(id){
    let img = document.createElement("img");
    img.setAttribute("src", "imgBJ/carte.jpg");
    img.setAttribute("id", "cartaGirataPlayer" + id + contatoreCarta);
    img.setAttribute("class", "cardGirata");
    
    document.getElementById("playerCard" + id).appendChild(img);

    contatoreCarta ++;
}

function giraCartaGraficaPlayers(id){
    for(let a = 0; a < players[id].mazzo.length; a++){
        let carta = players[id].mazzo[a].src;
        let immagine = document.getElementById("cartaGirataPlayer" + id + indexCarta);
        immagine.setAttribute("src", carta);
        immagine.setAttribute("class", "card");

        updateGraficoScorePlayer(id)

        indexCarta ++;
    }
}

function getCartaGraficaPlayer(carta, id){
    let immagine = document.createElement("img");
    immagine.setAttribute("src", carta);
    immagine.setAttribute("class", "card");
    document.getElementById("playerCard" + id).appendChild(immagine);
}

function getCartaGraficaPc(carta){
    let immagine = document.createElement("img");
    immagine.setAttribute("src", carta);
    immagine.setAttribute("class", "card");
    document.getElementById("pcCard").appendChild(immagine);
}

function getGraficaCartaGirataPc(temp){
    let img = document.createElement("img");
    img.setAttribute("src", "imgBJ/carte.jpg");
    img.setAttribute("id", "cartaGirata" + temp);
    img.setAttribute("class", "cardGirata");
    
    document.getElementById("pcCard").appendChild(img);
}

function giraCartaGraficaPc(temp){
    let carta = cartePc[temp].src;
    let immagine = document.getElementById("cartaGirata" + temp);
    immagine.setAttribute("src", carta);
}

//----------------------------------FUNZIONI GRAFICHE FICHES-------------------------------//

function getGraficaBet(id){
    let bet = players[id].bet;
    document.getElementById("betFiches" + id).innerText = bet;
    document.getElementById("imgBet" + id).setAttribute("class", "imgFiches");
}

function resetGraficaBet(id){
    document.getElementById("betFiches" + id).innerText = "";
    document.getElementById("imgBet" + id).setAttribute("class", "notVisible");
}

function getGraficaFiches(id){
    let fiches = players[id].fiches;
        
    let spanGiocatore = document.createElement("span");
    spanGiocatore.setAttribute("class", "red");
    spanGiocatore.innerText = players[id].name + ": ";

    let spanNumberFiches = document.createElement("span");
    spanNumberFiches.setAttribute("id", "fichesPlayer" + id);
    spanNumberFiches.setAttribute("class", "white");
    spanNumberFiches.innerText = fiches;

    let spanFiches = document.createElement("span");
    spanFiches.setAttribute("id", "fichesPlayer" + id);
    spanFiches.setAttribute("class", "white");
    spanFiches.innerText =" fiches";

    let buttonRicaricaFiches = document.createElement("button");
    buttonRicaricaFiches.setAttribute("id", "buttonRicarica" + id);
    buttonRicaricaFiches.setAttribute("class", "notVisible");
    buttonRicaricaFiches.setAttribute("onclick", "ricaricaFiches(" + id + ")");
    buttonRicaricaFiches.innerText = "Ricarica";

    let li = document.createElement("li");
    li.appendChild(spanGiocatore);
    li.appendChild(spanNumberFiches);
    li.appendChild(spanFiches);
    li.appendChild(buttonRicaricaFiches);

    document.getElementById("listaPlayersFiches").appendChild(li);
}

function updateGraficaFiches(id){
    let fiches = players[id].fiches;        
    document.getElementById("fichesPlayer" + id).innerText = fiches;
}

function setGraficaButtonRicarica(id){
    document.getElementById("buttonRicarica" + id).setAttribute("class", "buttonRicarica");
}

function resetFichesPlayer(id){
    document.getElementById("fichesPlayer"+ id).innerText = players[id].fiches;
}

function removeGraficaButtonRicarica(id){
    document.getElementById("buttonRicarica" + id).setAttribute("class", "notVisible");
}

//-----------------------------------FUNZIONI RESET GRAFICA--------------------------------//

function resetButton(id){
    contatoreBet ++;
    if(contatoreBet == players.length){
        document.getElementById("playButton").setAttribute("class", "containerGame");
        document.getElementById("addCard").setAttribute("class", "buttonPlay");
        document.getElementById("doubleBj").setAttribute("class", "buttonPlay");
        document.getElementById("standBj").setAttribute("class", "buttonPlay");
    }
    document.getElementById("addBet" + id).setAttribute("class", "notVisible");
    document.getElementById("importoBet" + id).setAttribute("class", "notVisible");
}

function ableButton(){
    document.getElementById("addCard").setAttribute("onclick", "aggiungiCartaPlayer()");
    document.getElementById("doubleBj").setAttribute("onclick", "double()");
    document.getElementById("standBj").setAttribute("onclick", "changeTurn()");
}
  
function resetGraficaGame(){
    document.getElementById("divPopUp").setAttribute("class", "notVisible");
    document.getElementById("playButton").setAttribute("class", "notVisible");
    document.getElementById("pcCard").innerHTML = "";
    document.getElementById("pcScore").innerText = "?";
    document.getElementById("campoPlayers").innerHTML = "";
    document.getElementById("listaPlayersFiches").innerHTML = "";
    document.getElementById("endGameStatsPlayers").innerHTML = "";
    document.getElementById("endGameFichesBetPlayers").innerHTML = "";
    document.getElementById("endGameStatsPc").innerHTML = "";
}

//----------------------------------FUNZIONI GRAFICHE POPUP--------------------------------//

function setPopUp(){
    document.getElementById("divPopUp").setAttribute("class", "popUp");

    statsDealerPopUp();
    statsPlayerPopUp();
    statsBetPopUp();
}

function unableButton(){
    document.getElementById("addCard").setAttribute("onclick", "");
    document.getElementById("doubleBj").setAttribute("onclick", "");
    document.getElementById("standBj").setAttribute("onclick", "");
}

function statsDealerPopUp(){
    let spanTextDealer = document.createElement("span");
    spanTextDealer.setAttribute("class", "textPopUp");
    spanTextDealer.innerText = "Il Dealer ha totalizzato ";
    let spanScorePc = document.createElement("span");
    spanScorePc.setAttribute("class", "textPopUp");
    spanScorePc.innerText = scorePc + " punti";

    let spanPc = document.createElement("span");
    spanPc.appendChild(spanTextDealer);
    spanPc.appendChild(spanScorePc);

    document.getElementById("endGameStatsPc").appendChild(spanPc);
}

function statsPlayerPopUp(){
    for(let i = 0; i < players.length; i++){
        let spanNomePlayer = document.createElement("span");
        spanNomePlayer.setAttribute("class", "white");
        spanNomePlayer.innerText = players[i].name;
        let spanText = document.createElement("span");
        spanText.innerText = " ha totalizzato "
        let spanScorePlayer = document.createElement("span");
        spanScorePlayer.innerText = players[i].score + " punti ";

        let liPlayer = document.createElement("li");
        liPlayer.appendChild(spanNomePlayer);
        liPlayer.appendChild(spanText);
        liPlayer.appendChild(spanScorePlayer);

        document.getElementById("endGameStatsPlayers").appendChild(liPlayer);
    }
}

function statsBetPopUp(){
    for(let i = 0; i < players.length; i++){
        let spanNomePlayerBet = document.createElement("span");
        spanNomePlayerBet.setAttribute("class", "white");
        spanNomePlayerBet.innerText = players[i].name;
        let spanSegno = document.createElement("span");
        if(players[i].win || players[i].draw){
            spanSegno.innerText = " +";
        }
        else {
            spanSegno.innerText = " -";
        }

        let spanBet = document.createElement("span");
        if(players[i].win){
            spanBet.innerText = players[i].bet * 2 + " ";
        }
        else {
            spanBet.innerText = players[i].bet + " ";
        }

        let imgFiches = document.createElement("img");
        imgFiches.setAttribute("src", "imgBJ/fiches.PNG");
        imgFiches.setAttribute("class", "imgFichesPopUp");

        let spanTotalFiches = document.createElement("span");
        spanTotalFiches.innerText = " (" + players[i].fiches + " fiches)";

        let liBetPlayer = document.createElement("li");
        liBetPlayer.appendChild(spanNomePlayerBet);
        liBetPlayer.appendChild(spanSegno);
        liBetPlayer.appendChild(spanBet);
        liBetPlayer.appendChild(imgFiches);
        liBetPlayer.appendChild(spanTotalFiches);

        document.getElementById("endGameFichesBetPlayers").appendChild(liBetPlayer);
    }
}