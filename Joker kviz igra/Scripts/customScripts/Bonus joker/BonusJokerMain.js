/*
-	Če smo odgovorili na 4 ali 8 vprašanj se izvede
-	Onemogočimo pritisk gumba joker
-	Povečamo kolikokratSmoIgraliBonus za 1
-	Spustimo mp3 za začetek igre Bonus joker
-	Prilagodimo css elementom, kjer se pojavljajo vprašanja in odgovori
-	Prikažemo bonusJokergumb
-	Če se je iztekel čas za bonus (casZaBonus, casZaBonusDrugic) ali pa smo desetkrat pravilno odgovorili (pravilniOdgovoriJoker = 10) zaključimo igro Bonus joker.
-	Če imamo med 5-9 pravilnih odgovorov dodamo 1 sicer 2 jokerja, tako da pokličemo funkcijo enDodanJoker 1x ali 2x.
-	Vrnemo css elementov vprašanja na stara pota (tudi stevilkaInVprasanja).
-	Resetiramo število pravilnih odgovorov v Bonus jokerju na 0
-	Ponovno omogočimo uporabo bonus jokerja
-	Nehajmo predvajati mp3 clockQuestionStart, ki je zvok, ki se predvaja med bonus jokerjem.
*/

let casZaBonus = 61; //61 ČE IGRATA DVA    31 ČE IGRA EN
let casZaBonusDrugic = 128;  //128 ČE IGRATA DVA    68 ČE IGRA EN
let pravilniOdgovoriJoker = 0;
let kolikokratSmoIgraliBonus = 0;
let stevilkaInVprasanje = document.getElementById("stevilkaInVprasanje");
let vprasanjePolje = document.getElementById("Vprasanje");
let naslednjeVprasanje = document.getElementById("NaslednjeVprasanje");

let bonusJokerSound = new Audio();
bonusJokerSound.src = "/Content/audio/bonusJokerSound.mp3";

let bonusJokergumb = document.getElementById("BonusJokerGumb");
let zadetkiBonusStevec = document.getElementById("zadetki");

zadetkiBonusStevec.style.display = "none";
bonusJokergumb.style.display = "none";

function BonusJokerMain() {

    setTimeout(function () {
        // BONUS JOKER
        if (trenutnoVprasanje == 4 && daniOdgovori.length == 4 || trenutnoVprasanje == 8 && daniOdgovori.length == 8 && polozajTekmovalcaJoker < 8) {

            document.getElementById("GumbJoker").disabled = true;
            zadetkiBonusStevec.style.display = "block";
            kolikokratSmoIgraliBonus = kolikokratSmoIgraliBonus + 1; // KO PRVIČ IGRAMO BO 1, KO DRUGIČ BO 2.

            stevilkaInVprasanje = document.getElementById("stevilkaInVprasanje");
            vprasanjePolje = document.getElementById("Vprasanje");
            naslednjeVprasanje = document.getElementById("NaslednjeVprasanje");

            setTimeout(function () {
                bonusJokerSound.play();
                stevilkaInVprasanje.style.gridTemplateColumns = "0 10fr";
                vprasanjePolje.style.background = 'linear-gradient(#8B2D9D, #A735BB)';
                odgovorA.style.background = 'linear-gradient(#822992, #752583)';
                odgovorB.style.background = 'linear-gradient(#822992, #752583)';
                odgovorC.style.display = "none";
                odgovorD.style.display = "none";
                naslednjeVprasanje.style.display = "none";
                bonusJokergumb.style.display = "grid"; //PRIKAŽI
            }, 2000);

            setTimeout(function () {
                setInterval(function () {
                    if (trenutnoVprasanje == 5) {
                        casZaBonus = casZaBonus - 1;
                    }
                    if (trenutnoVprasanje == 9) {
                        casZaBonusDrugic = casZaBonusDrugic - 1;
                    }

                    if (casZaBonus > 0 && casZaBonus < 6) {
                        lastSecondsSound.play();
                    }

                    if (casZaBonus == 0 || casZaBonusDrugic == 0 || pravilniOdgovoriJoker == 10) {
                        if (trenutnoVprasanje == 5) {
                            casZaBonus = 0;
                        }
                        if (trenutnoVprasanje == 9) {
                            casZaBonusDrugic = 0;
                        }

                        if (pravilniOdgovoriJoker > 4 && pravilniOdgovoriJoker < 10) {
                            enDodanJoker();
                        }
                        if (pravilniOdgovoriJoker > 9) {

                            enDodanJoker();
                            setTimeout(function () {
                                enDodanJoker();
                            }, 2000);
                        }

                        // TUKAJ JE POTREBNO VSE VRNIT V PRVOTNO STANJE (NI ŠE ČISTO V REDU) //PAZI ŠE NA weInBonusJoker da se da na FALSE
                        stevilkaInVprasanje.style.gridTemplateColumns = "1fr 10fr";
                        vprasanjePolje.style.background = '';
                        odgovorA.style.background = '';
                        odgovorB.style.background = '';
                        vprasanje.innerHTML = "";
                        odgovorA.innerHTML = "";
                        odgovorB.innerHTML = "";
                        odgovorC.style.display = "block";
                        odgovorD.style.display = "block";
                        naslednjeVprasanje.style.display = "grid";
                        cas.style.background = "linear-gradient(#02053D, #014A91)";
                        pravilniOdgovoriJoker = 0;
                        weInBonusJoker = false;
                        bonusJokergumb.style.display = "none";
                        zadetkiBonusStevec.style.display = "none";
                        document.getElementById("GumbJoker").disabled = false;
                        clockQuestionStart.loop = false;
                        // TUKAJ JE POTREBNO VSE VRNIT V PRVOTNO STANJE
                    }

                    if (trenutnoVprasanje == 5) {
                        if (casZaBonus > -1) {
                            document.getElementById("Time").innerHTML = casZaBonus; //UGOTOVITI JE POTREBNO KAKO BO ČAS V BONUS JOKERJU PRAVILNO TEKEL
                        }
                    }
                    if (trenutnoVprasanje == 9) {
                        if (casZaBonusDrugic > -1 && casZaBonusDrugic < 121   /*61 ČE IGRA EN   121 ČE IGRATA DVA*/) {

                            if (casZaBonusDrugic >= 10) {                                             // BREZ DECIMALK
                                document.getElementById("Time").innerHTML = (casZaBonusDrugic / 2).toPrecision(2); // CAS ZA BONUS JOKER DRUGIC JE NASTAVLJEN NA 60 in TEČE Z DVOJNO HITROSTJO. ZATO GA VEDNO ZAPIŠEM Z DELJENO Z 2.
                            }
                            if (casZaBonusDrugic < 10) {
                                document.getElementById("Time").innerHTML = (casZaBonusDrugic / 2).toPrecision(1);
                            }
                            if (casZaBonusDrugic > 1 && casZaBonusDrugic < 12) {
                                setTimeout(function () {
                                    lastSecondsSound.play();
                                }, 1000);
                            }
                        }
                    }
                }, 1000);
            }, 8000);
        }
        // BONUS JOKER
    }, 8000);
}