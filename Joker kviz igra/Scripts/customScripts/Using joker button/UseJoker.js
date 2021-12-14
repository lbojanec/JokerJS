/*
-	Če imamo vsaj enega jokerja lahko uporabimo gumb, ki sproži to metodo
-	Spustimo mp3 za uporabo jokerja
-	Element dodano15Sekund nastavimo na true in dodajSamoEnkrat15Sekund na 1
-	Prikažemo vse elemente za izbiro med dvema odgovoroma
-	Povemo, da je trenutno uporabljen joker (jokerUsedNow)
-	Pripravimo tabelo vseh možnih odgovorov
-	Pripravimo polje za napačen odgovor.
-	Ob prvi uporabi jokerja zapišemo kateri odgovori so napačni.
-	Tabele izbir (AB,CD,AD…) napolnimo z ustreznimi odgovori
-	Izbrišemo naključen odgovor v kolikor sta oba izbrana napačna in napačnega v kolikor je izmed njih ni pravilen (torej se ne nahaja v tabeli napačni odgovori)

*/

let jokerUsedNow = false;
let uporabaJokerjaNaVprasanju;
let jokerSound = new Audio();
jokerSound.src = "/Content/audio/jokerSound.mp3";
let mozniOdgovori = [];
let izbrisanOdgovor;

let dodajSamoEnkrat15Sekund = 1;

let izbirajAB = document.getElementById("AB");
let izbirajCD = document.getElementById("CD");
let izbirajAC = document.getElementById("AC");
let izbirajBD = document.getElementById("BD");
let izbirajAD = document.getElementById("AD");
let izbirajBC = document.getElementById("BC");

MakeChoicesInvisible();

function UseJoker() {
    if (polozajTekmovalcaJoker > 0) { // ČE IMAMO VSAJ 1 JOKERJA POTEM LAHKO UPORABIMO GUMB

        mozniOdgovori = [];      // TABELA BO VSEBOVALA VSE 4 MOŽNE ODGOVORE
        izbrisanOdgovor;        // SPREMENLJIVKA PREDSTAVLJA IZBRANI IZBRISAN ODGOVOR IZMED MOŽNIH
        ShowChoices();
        jokerUsedNow = true;
        jokerSound.play();
        dodano15Sekund = true;
        dodajSamoEnkrat15Sekund = 0;

        setTimeout(function () {
            dodajSamoEnkrat15Sekund = 1;    //BREZ TEGA SE NAM OB PRITISKU NA GUMB VSAKO SEKUNDO DODA DODATNIH 15 SEKUND
        }, 1000);

        RecognizeAllPossibleAnswers();

        if (uporabaJokerjaNaVprasanju == undefined) {
            uporabaJokerjaNaVprasanju = 1;

            if (!(mozniOdgovori[0][0] == pravilenOdgovor)) {
                napacniOdgovori.push(odgovorA.innerHTML);       //V NAŠI BAZI IMAM S ČRKO OZNAČENO ZA VSAKO VPRAŠANJE ALI JE PRAVILEN ODGOVOR
                //A,B,C ALI D. ČE PRVA ČRKA MOREBITNEGA ODGOVORA NI ENAKA TEJ ČRKI, TA ODGOVOR
            }                                                   //VRŽEMO V TABELO napacniOdgovori.
            if (!(mozniOdgovori[1][0] == pravilenOdgovor)) {
                napacniOdgovori.push(odgovorB.innerHTML);
            }
            if (!(mozniOdgovori[2][0] == pravilenOdgovor)) {
                napacniOdgovori.push(odgovorC.innerHTML);
            }
            if (!(mozniOdgovori[3][0] == pravilenOdgovor)) {
                napacniOdgovori.push(odgovorD.innerHTML);
            }

            //DO TUKAJ IMAMO TOREJ TABELO VSEH ODGOVOROV IN TABELO VSEH NAPAČNIH ODGOVOROV

            // NAPOLNEMO TABELE GUMBOV ZA IZBIRO MED DVEMA ODGOVOROMA
            izbirajMedAB.push(odgovorA.innerHTML);
            izbirajMedAB.push(odgovorB.innerHTML);

            izbirajMedCD.push(odgovorC.innerHTML);
            izbirajMedCD.push(odgovorD.innerHTML);

            izbirajMedAC.push(odgovorA.innerHTML);
            izbirajMedAC.push(odgovorC.innerHTML);

            izbirajMedBD.push(odgovorB.innerHTML);
            izbirajMedBD.push(odgovorD.innerHTML);

            izbirajMedAD.push(odgovorA.innerHTML);
            izbirajMedAD.push(odgovorD.innerHTML);

            izbirajMedBC.push(odgovorB.innerHTML);
            izbirajMedBC.push(odgovorC.innerHTML);
            // NAPOLNEMO TABELE GUMBOV ZA IZBIRO MED DVEMA ODGOVOROMA
            izbrisanOdgovor = napacniOdgovori[Math.floor(Math.random() * napacniOdgovori.length)]; //IZMED VSEH NAPAČNIH ODGOVOROV IZBEREMO ENEGA IN GA DODELIMO SPREMENLJIVKI izbrisanOdgovor
        }
    }
}

function ShowChoices() {
    izbirajAB.style.display = 'block';
    izbirajCD.style.display = 'block';
    izbirajAC.style.display = 'block';
    izbirajBD.style.display = 'block';
    izbirajAD.style.display = 'block';
    izbirajBC.style.display = 'block';
}

function RecognizeAllPossibleAnswers() {
    mozniOdgovori[0] = "A" + odgovorA.innerHTML;
    mozniOdgovori[1] = "B" + odgovorB.innerHTML;
    mozniOdgovori[2] = "C" + odgovorC.innerHTML;
    mozniOdgovori[3] = "D" + odgovorD.innerHTML;    //NAPOLNEMO TABELO MOŽNIH ODGOVOROV Z VSEMI ŠTIRIMI
        // TAKO IMAMO V TABELI ZA VPRAŠANJE KDO JE ZADNJI SVETOVNI PRVAK V NOGOMETU
        //  Abrazilija, Bnemčija, CŠpanija, DITalija
}