/*
-	Izvede se le če nismo v bonusJokerju (weInBonusJoker == false)
-	S to funkcijo uredimo vse kar se mora zgoditi, ko uporabnik poda pravilen ali napačen odgovor na navadno vprašanje (ne tako v bonus jokerju).
-	Takoj ko odgovori resetiramo število uporabljenih jokerjev na vprašanju
-	Spustim mp3 za dramo pred odgovorom
-	Onemogočim klikanje na gumbe medtem, ko sem zunaj vprašanja
-	Pobarvam pravilen oziroma napačen odgovor.
-	Spustim ustrezen mp3 glede na to ali gre za pravilen ali napačen odgovor
-	Dvignem ali spustim tekmovalca na denarni lestvici
-	V primeru, da je tekmovalec odgovoril napačno in imel pred tem več kot 7 jokerjev vizualno izbrišem osmega in/ali devetega jokerja iz pogleda.
-	V primeru napačenga odgovora se izvede logika padca po denarni in joker lestvici.
-	Prikažem dvig ali spust tudi vizualno (Spreminjanje css-a).
-	Poskrbim, da se iz polj zbrišejo podatki o vprašanju
-	Povečam trenutnoVprasanje za 1.
-	Če je že bilo postavljenih 12 vprašanj zaključim z igro in prikažem koliko denarja je tekmovalec osvojil in naredim preusmeritev na začetek igre
*/

let izbraniOdgovor;
let pravilenOdgovor;
let napacniOdgovori = [];

let delayButtons;
let polozajTekmovalcaDenarAfter;

let answerSound = new Audio();
answerSound.src = "/Content/audio/answerSound.mp3";

let dramaSound = new Audio();
dramaSound.src = "/Content/audio/dramaSound.mp3";

let trueAnswerSound = new Audio();
let wrongAnswerSound = new Audio();
trueAnswerSound.src = "/Content/audio/trueAnswerSound.mp3";
wrongAnswerSound.src = "/Content/audio/wrongAnswerSound.mp3";

let konecIgreSound = new Audio();
konecIgreSound.src = "/Content/audio/konecIgreSound.mp3";

let moneyUpPartOneSound = new Audio();
moneyUpPartOneSound.src = "/Content/audio/moneyUpPartOneSound.mp3";

let topMoneySound = new Audio();
topMoneySound.src = "/Content/audio/topMoneySound.mp3";

function GivenAnswerConsequence() {
    if (weInBonusJoker == false) {

        uporabaJokerjaNaVprasanju = undefined; // KO IGRALEC ODGOVORI SE RESETIRA KOLIKOKRAT JE ŽE UPORABIL JOKERJA NA TRENUTNEM VPRAŠANJU
        napacniOdgovori.splice(0, napacniOdgovori.length);
        daniOdgovori.push("x");
        answerSound.play();
        DisableAnswersAndJokerButtons();

        if (weInBonusJoker) {
            delayButtons = 23000;
        }
        else {
            delayButtons = 18000;
        }

        setTimeout(function () {
            EnableAnswersAndJokerButtons();
        }, delayButtons); //ODVISNO ALI SMO ALI NISMO V BONUS JOKERJU SO GUMBI ZA RAZLIČEN ČAS NEAKTINI :)

        let aktivenElement = event.target;
        IzbraniOdgovor = event.currentTarget.id;

        if (IzbraniOdgovor == pravilenOdgovor) { //PRAVI ODGOVOR
            aktivenElement.focus();
            setTimeout(function () {
                dramaSound.play();
                stop(1000);

                setTimeout(function () {
                    aktivenElement.style.background = 'green';

                    setTimeout(function () {
                        aktivenElement.style.background = '';
                    }, 3000);

                    if (polozajTekmovalcaDenar < 6 || polozajTekmovalcaDenar == 7) {
                        
                        trueAnswerSound.play();
                        setTimeout(function () {
                            moneyUpPartOneSound.play();
                        }, 1500);
                    }

                    if (polozajTekmovalcaDenar == 6) {
                        setTimeout(function () {
                            topMoneySound.play();
                        }, 1500);
                    }

                    if (polozajTekmovalcaDenar < 7) {
                        UncolorMoney();
                        polozajTekmovalcaDenar = polozajTekmovalcaDenar + 1;
                    }

                    setTimeout(function () {
                        ColorMoney();

                        if (trenutnoVprasanje < 13) {

                            BonusJokerMain();
                            trenutnoVprasanje = trenutnoVprasanje + 1;
                            document.getElementById("QuestionNowFont").innerHTML = trenutnoVprasanje;
                        }

                        if (trenutnoVprasanje == 13) {

                            document.getElementById("zgornjiDelIgre").style.background = "  linear-gradient(#D13B51, #FFF768)";
                            document.getElementById("denar20K-finish").style.display = "grid";

                            DisplayMoneyAchieved();
                            konecIgreSound.play();
                            DisableAnswersAndJokerButtons();
                            document.getElementById("QuestionNowFont").innerHTML = "12";
                            RedirectToNewGame();
                        }
                    }, 1500);

                    setTimeout(function () {
                        EraseNormalQuestion();
                    }, 3000);
                }, 6000);
            }, 1000);
        }
        else if (izbraniOdgovor != pravilenOdgovor) { //NAPAČEN ODGOVOR
            aktivenElement.focus();
            DisableAnswersAndJokerButtons();

            setTimeout(function () {
                EnableAnswersAndJokerButtons();
            }, 10000);

            setTimeout(function WrongAnswer() {
                dramaSound.play();
                stop(3000);
                setTimeout(function () {
                    aktivenElement.style.background = '#B20D05';
                    document.getElementById(IzbranoVprasanjeSeOdgovarja[7]).style.background = 'green';

                    setTimeout(function () {
                        aktivenElement.style.background = '';
                        document.getElementById(IzbranoVprasanjeSeOdgovarja[7]).style.background = '';
                    }, 3000);

                    if (trenutnoVprasanje < 13) {
                        document.getElementById("QuestionNowFont").innerHTML = trenutnoVprasanje;
                    }

                    wrongAnswerSound.play();

                    if (polozajTekmovalcaJoker > 7) {
                        osmiJoker.style.display = "none";
                        devetiJoker.style.display = "none";
                    }

                    if (polozajTekmovalcaJoker > 2) {
                        for (let i = 1; i <= 3; i = i + 1) {

                            polozajTekmovalcaJoker = polozajTekmovalcaJoker - 1;
                            UncolorJokersWeDontHave();
                        }
                    }

                    else if (polozajTekmovalcaJoker == 2) {
                        polozajTekmovalcaJoker = polozajTekmovalcaJoker - 2;
                        UncolorJokersWeDontHave();

                        if (polozajTekmovalcaDenar > 1) {
                            polozajTekmovalcaDenar = polozajTekmovalcaDenar - 1;
                            ColorActiveMoney();
                        }
                        else if (polozajTekmovalcaDenar == 1) {
                            polozajTekmovalcaDenar = 1;
                            ColorActiveMoney();
                        }
                    }
                    else if (polozajTekmovalcaJoker == 1) {
                        polozajTekmovalcaJoker = polozajTekmovalcaJoker - 1;
                        UncolorJokersWeDontHave();

                        if (polozajTekmovalcaDenar > 2) {
                            polozajTekmovalcaDenar = polozajTekmovalcaDenar - 2;
                            ColorActiveMoney();
                        }

                        else if (polozajTekmovalcaDenar < 3) {
                            polozajTekmovalcaDenar = 1;
                            ColorActiveMoney(); //CHECK, COULD BE MISTAKEN
                        }
                    }

                    else if (polozajTekmovalcaJoker == 0) {

                        if (polozajTekmovalcaDenar > 4) {

                            polozajTekmovalcaDenar = polozajTekmovalcaDenar - 3;
                            ColorActiveMoney();
                        }
                        else if (polozajTekmovalcaDenar < 5) {

                            polozajTekmovalcaDenarAfter = 1;
                            polozajTekmovalcaDenar = 1;
                            ColorActiveMoney(); //CHECK COULD BE MISTAKEN.
                        }
                    }

                    setTimeout(function () {
                       
                        if (trenutnoVprasanje < 13) {
                            trenutnoVprasanje = trenutnoVprasanje + 1;
                            document.getElementById("QuestionNowFont").innerHTML = trenutnoVprasanje;
                        }

                        if (trenutnoVprasanje == 13) {

                            document.getElementById("zgornjiDelIgre").style.background = "  linear-gradient(#D13B51, #FFF768)";
                            document.getElementById("denar20K-finish").style.display = "grid";
                            DisplayMoneyAchieved();
                            konecIgreSound.play();
                            document.getElementById("QuestionNowFont").innerHTML = "12";
                            DisableAnswersAndJokerButtons();
                            RedirectToNewGame();
                        }
                        document.getElementById("QuestionNowFont").innerHTML = trenutnoVprasanje;
                    }, 1500);

                    setTimeout(function () {
                        EraseNormalQuestion();
                    }, 3000);
                }, 6000);
            }, 1000);
        }
    }
    BonusJokerMain();
}

function DisableAnswersAndJokerButtons(){
    document.getElementById("A").disabled = true;
    document.getElementById("B").disabled = true;
    document.getElementById("C").disabled = true;
    document.getElementById("D").disabled = true;
    document.getElementById("GumbJoker").disabled = true;
    document.getElementById("JokerStart").disabled = true;
}

function EnableAnswersAndJokerButtons() {
    document.getElementById("A").disabled = false;
    document.getElementById("B").disabled = false;
    document.getElementById("C").disabled = false;
    document.getElementById("D").disabled = false;
    document.getElementById("GumbJoker").disabled = false;
    document.getElementById("JokerStart").disabled = false;
}

function EraseNormalQuestion() {
    vprasanje.innerHTML = "";
    odgovorA.innerHTML = "";
    odgovorB.innerHTML = "";
    odgovorC.innerHTML = "";
    odgovorD.innerHTML = "";
    odgovorA.style.color = '';
    odgovorB.style.color = '';
    odgovorC.style.color = '';
    odgovorD.style.color = '';
}

function UncolorMoney() {
    document.getElementById("Da" + polozajTekmovalcaDenar).style.backgroundColor = "#54537E";
    document.getElementById("Db" + polozajTekmovalcaDenar).style.backgroundColor = "#BAACC8";
    document.getElementById("Dc" + polozajTekmovalcaDenar).style.color = "#54537E";
}

function ColorMoney() {
    document.getElementById("Da" + polozajTekmovalcaDenar).style.backgroundColor = "#BC8339";
    document.getElementById("Db" + polozajTekmovalcaDenar).style.backgroundColor = "#11167A";
    document.getElementById("Dc" + polozajTekmovalcaDenar).style.color = "#BC8339";
}

function DisplayMoneyAchieved(){
    if (polozajTekmovalcaDenar == 1) {
        document.getElementById("Dc7-finish").innerHTML = "0€";
    }
    if (polozajTekmovalcaDenar == 2) {
        document.getElementById("Dc7-finish").innerHTML = "200€";
    }
    if (polozajTekmovalcaDenar == 3) {
        document.getElementById("Dc7-finish").innerHTML = "500€";
    }
    if (polozajTekmovalcaDenar == 4) {
        document.getElementById("Dc7-finish").innerHTML = "1000€";
    }
    if (polozajTekmovalcaDenar == 5) {
        document.getElementById("Dc7-finish").innerHTML = "3000€";
    }
    if (polozajTekmovalcaDenar == 6) {
        document.getElementById("Dc7-finish").innerHTML = "7000€";
    }
    if (polozajTekmovalcaDenar == 7) {
        document.getElementById("Dc7-finish").innerHTML = "20000€";
    }
}

function RedirectToNewGame(){
    setTimeout(function () {
        window.location.href = 'http://localhost:44347/'
    }, 17000);
}

function UncolorJokersWeDontHave(){
    for (let i = 7; i > polozajTekmovalcaJoker; i = i - 1) {
        document.getElementById("Ja" + i).style.backgroundColor = "#54537E";
        document.getElementById("Jb" + i).style.backgroundColor = "#BAACC8";
        document.getElementById("Jc" + i).style.color = "#54537E";
    }
}

function ColorActiveMoney() {
    for (let i = 1; i <= 7; i = i + 1) {
        document.getElementById("Da" + i).style.backgroundColor = "#54537E";
        document.getElementById("Db" + i).style.backgroundColor = "#BAACC8";
        document.getElementById("Dc" + i).style.color = "#54537E";

        if (i == polozajTekmovalcaDenar) {
            document.getElementById("Da" + i).style.backgroundColor = "#BC8339"; //+1 sem dodal ker sem se zakalkuliral
            document.getElementById("Db" + i).style.backgroundColor = "#11167A";
            document.getElementById("Dc" + i).style.color = "#BC8339";
        }
    }
}