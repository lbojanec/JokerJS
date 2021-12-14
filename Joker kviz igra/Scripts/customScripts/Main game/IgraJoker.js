/*
-	Ustvarim prostor za vprašanje
-	Spustim mp3 za začetek vprašanja,
-	Grem z api klicem po vprašanje (pokličem metodo FetchQuestion)
-	Podatke od vprašanja zapišem v ustrezna polja
-	Spustim mp3 ob zapisu odgovorov v polja
-	Spustim mp3 za med vprašanjem
-	Zapišem, da sem to vprašanje že imel, da se ne bo ponovilo
-	Glede na položaj na denarni lestvici nastavim uro na ustrezen čas
-	Poskrbim, da ure vedno teče kot mora
-	Spustim mp3-je ob 10s, 5s do konca časa itd.

*/



var zePostavljenaVprasanja = [];
let igralecPobegnil = false;
let daniOdgovori = [];
let dodano15Sekund = false;
let cas = document.getElementById("Time");
let trenutnoVprasanje = 1;
let polozajTekmovalcaDenar = 1;

var IzbranoVprasanjeSeOdgovarja = [];

let counter1; let counter2; let counter3; let counter4;
let counter5; let counter6; let counter7; let counter8;
let counter9; let counter10; let counter11; let counter12; //ŠTEVEC

let zacetekVprasanjaSound = new Audio();
zacetekVprasanjaSound.src = "/Content/audio/zacetekVprasanjaSound.mp3";

//POLJA 
let vprasanje = document.getElementById("Q");
let odgovorA = document.getElementById("A");
let odgovorB = document.getElementById("B");
let odgovorC = document.getElementById("C");
let odgovorD = document.getElementById("D");

let answerComeSound = new Audio();
answerComeSound.src = "/Content/audio/answerComeSound.mp3";

let lastSecondsSound = new Audio();
lastSecondsSound.src = "/Content/audio/lastSecondsSound.mp3";

function IgraJoker() {
    ColorActiveMoney();

    let cajtSpremenljivka;
    let counterActual; //Ko nastavljavljamo counter1-12

    IzbranoVprasanjeSeOdgovarja = [];
    document.getElementById("gumbOdstopi").style.top = "100%";

    if (trenutnoVprasanje == 12) {
        document.getElementById("gumbOdstopi").style.top = "84%";
    }

    zacetekVprasanjaSound.play();
    document.getElementById("Igraj").innerHTML = "NAPREJ";
    setTimeout(function () {

        if (polozajTekmovalcaDenar == 1) {
            FetchQuestion("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionByDifficultyAndType/1/1");
        }

        if (polozajTekmovalcaDenar > 1 && polozajTekmovalcaDenar < 6) {
            FetchQuestion("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionWhichIsLevel/" + polozajTekmovalcaDenar);
        }
        
        if (polozajTekmovalcaDenar > 5) {
            FetchQuestion("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionWhichIsLevel/6");
        }

        setTimeout(function () {
            vprasanje.innerHTML = IzbranoVprasanjeSeOdgovarja[2];
            zePostavljenaVprasanja.push(IzbranoVprasanjeSeOdgovarja[0]);

            pravilenOdgovor = IzbranoVprasanjeSeOdgovarja[7];
        }, 1000);

        setTimeout(function () {
            odgovorA.innerHTML = IzbranoVprasanjeSeOdgovarja[3];
            answerComeSound.play();
        }, 3500);

        setTimeout(function () {
            odgovorB.innerHTML = IzbranoVprasanjeSeOdgovarja[4];
            answerComeSound.play();
        }, 5000);

        setTimeout(function () {
            odgovorC.innerHTML = IzbranoVprasanjeSeOdgovarja[5];
            answerComeSound.play();
        }, 6500);

        setTimeout(function () {
            odgovorD.innerHTML = IzbranoVprasanjeSeOdgovarja[6];
            answerComeSound.play();
            clockQuestionStart.play();

            function setTimer(time) {
                counterActual = eval("counter" + trenutnoVprasanje)
                counterActual = time;
                cajtSpremenljivka = counterActual;
            }

            if (trenutnoVprasanje > 0 && trenutnoVprasanje < 5) {
                setTimer(31);
            }
            else if (trenutnoVprasanje > 4 && trenutnoVprasanje < 9 ) {
                setTimer(41);
            }
            else if (trenutnoVprasanje > 8 && trenutnoVprasanje < 13 ) {
                setTimer(51);
            }

            // IMPRO URA - SPREMENLJIVKA ZA VSAKO OD 12 VPRAŠANJ DRUGAČNA, KER DRUGAČE PRIDE DO POSPEŠITVE URE

            setInterval(function () { //INTERVAL ZA MERJENJE SEKUND NA VPRAŠANJU

                cajtSpremenljivka = cajtSpremenljivka - 1;

                if (cajtSpremenljivka > -1) {               // SAMO V PRIMERU DA JE ČAS VEČJI OD -1 IN DA ŠE NI BIL PODAN ODGOVOR NA VPRAŠANJE
                    cas.innerHTML = cajtSpremenljivka;
                }

                if (daniOdgovori.length == trenutnoVprasanje || igralecPobegnil == true) { // ČE JE TEKMOVALEC ŽE ODGOVORIL NA TEKOČE VPRAŠANJE 

                    cas.style.removeProperty("background-color");
                    MakeChoicesInvisible();
                    cajtSpremenljivka = -1000;
                }

                if (cajtSpremenljivka == 10) {
                    lastSecondsSound.play();
                }

                if (cajtSpremenljivka > 0 && cajtSpremenljivka < 6 || cajtSpremenljivka == 10) {
                    lastSecondsSound.play();
                }

                if (cajtSpremenljivka == 5) {
                    cas.style.backgroundColor = 'red';
                }

                if (dodano15Sekund == true && dodajSamoEnkrat15Sekund == 0) {
                        cajtSpremenljivka = cajtSpremenljivka + 15;
                        cas.style.removeProperty("background-color");
                }

                if (cajtSpremenljivka == 0) { // ČE ZMANJKA ČASA ZA ODGOVOR NE MOREŠ VEČ ODGOVORITI NA PRAVILEN ODGOVOR
                    cas.style.removeProperty("background-color");
                    document.getElementById(IzbranoVprasanjeSeOdgovarja[7]).disabled = true;

                    if (trenutnoVprasanje == daniOdgovori.length) {
                        document.getElementById(IzbranoVprasanjeSeOdgovarja[7]).disabled = false;
                    }
                }
            }, 1000);
            // IMPRO URA
        }, 8000);
    }, 3500);
}

function setTimer(time) {
    cas = time;
    counterActual = eval("counter" + trenutnoVprasanje);
    counterActual = cas;
    cajtSpremenljivka = counterActual;
}