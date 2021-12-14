/*
-	Ob uporabi katerega koli izmed njih se trenutno onemogoči uporaba ostalih petih do uporabe novega jokerja
-	Naprimer jokerAD() najprej za A in D odgovor ugotovi, če sta oba izmed njih napačna ali pa samo eden.
-	Nato izbriše napačen ali naključni napačen odgovor.
-	Spustimo mp3 za izbris odgovora.
-	Vzame enega jokerja, tako da pokliče metodo VzemiEnegaJokerja().
-	Spusti mp3 za izbris odgovora tako da pokliče metodo IzbrisOdgovoraZvok().
*/

let jokerEraseAnswerPartOneSound = new Audio();
let jokerEraseAnswerPartTwoSound = new Audio();
jokerEraseAnswerPartOneSound.src = "/Content/audio/jokerEraseAnswerPartOneSound.mp3";
jokerEraseAnswerPartTwoSound.src = "/Content/audio/jokerEraseAnswerPartTwoSound.mp3";

let izbirajMedAB = []; let vsiNapacniAB = [];
let izbirajMedCD = []; let vsiNapacniCD = [];
let izbirajMedAC = []; let vsiNapacniAC = [];
let izbirajMedBD = []; let vsiNapacniBD = [];
let izbirajMedAD = []; let vsiNapacniAD = [];
let izbirajMedBC = []; let vsiNapacniBC = [];

function MakeChoice(first, second) {

    let prva = first;
    let druga = second;
    MakeChoicesInvisible();
    let vsiNapacni = eval("vsiNapacni" + prva + druga + "=[]");

    for (let i = 0; i < eval("izbirajMed"+ prva + druga).length; i = i + 1) {
        for (let j = 0; j < napacniOdgovori.length; j = j + 1) {
            if (eval("izbirajMed" + prva + druga)[i] == napacniOdgovori[j]) {
                vsiNapacni.push(eval("izbirajMed" + prva + druga)[i]);
            }
        }
    }

    izbrisanOdgovor = vsiNapacni[Math.floor(Math.random() * vsiNapacni.length)]; //IZMED VSEH NAPAČNIH ODGOVOROV IZBEREMO ENEGA IN GA DODELIMO SPREMENLJIVKI izbrisanOdgovor
    IzbrisOdgovoraZvok();

    setTimeout(function () {
        //NATO TA ODGOVOR IZBRIŠEMO IN VZAMEMO 1 JOKERJA
        if (eval("odgovor" + prva).innerHTML == izbrisanOdgovor) {
            eval("odgovor" + prva).style.color = 'gray';
            VzemiEnegaJokerja();
            // UGOTOVITI MORAMO KAKO BOMO DODALI 15 SEKUND OB UPORABI JOKERJA
        }
        if (eval("odgovor" + druga).innerHTML == izbrisanOdgovor) {
            eval("odgovor" + druga).style.color = 'gray';
            VzemiEnegaJokerja();
        }
    }, 2000);
}

function MakeChoicesInvisible() {
    izbirajAB.style.display = 'none';
    izbirajCD.style.display = 'none';
    izbirajAC.style.display = 'none';
    izbirajBD.style.display = 'none';
    izbirajAD.style.display = 'none';
    izbirajBC.style.display = 'none';
}

function IzbrisOdgovoraZvok() {
    jokerEraseAnswerPartOneSound.play();
    setTimeout(function () {
        jokerEraseAnswerPartTwoSound.play();
    }, 1000);
}