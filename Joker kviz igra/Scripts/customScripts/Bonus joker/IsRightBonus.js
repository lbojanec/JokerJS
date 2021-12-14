/*
-	Izvede se le če smo v bonus jokerju (weInBonusJoker == true) in če smo odgovorili na vprašanje znotraj bonus jokerja (takrat se ta metoda pokliče)
-	S to funkcijo uredimo vse kar se mora zgoditi, ko uporabnik poda pravilen ali napačen odgovor na vprašanje v bonus jokerju
-	Iz vprašanja na katerega trenutno odgovarjamo (izbranoVprasanjeSeOdgovarjaBonus) v spremenljivko pravilenOdgovorBonus izluščimo pravilen odgovor.
-	Uporabljam aktivenElementBonus in IzbraniOdgovorBonus, ter zadetkiBonusJokerPolje.
-	Če je odgovor pravilen povečam pravilniOdgovorJoker za 1.
-	Ob osvojenih jokerjih spustimo mp3 za obvestilo, da smo dobili že enega jokerja.
-	Spustimo mp3 (answerSound) ob odgovoru.
-	Pobarvamo pravilen in/ali napačne odgovore.
-	Pobrišemo vprašanje iz elementov za vprašanje v bonus jokerju.
-	Pokličemo metodo BonusJokerPrvic, ki prinese novo vprašanje.
*/

let weInBonusJoker = false;
var izbranoVprasanjeSeOdgovarjaBonus = [];

let wrongAnswerJokerSound = new Audio();
wrongAnswerJokerSound.src = "/Content/audio/wrongAnswerJokerSound.mp3";
let weGetOneJokerMoreSound = new Audio();
weGetOneJokerMoreSound.src = "/Content/audio/weGetOneJokerMoreSound.mp3";
let pravilenOdgovorBonus = izbranoVprasanjeSeOdgovarjaBonus[7];
let zadetkiBonusJokerPolje = document.getElementById("zadetkiBonusJoker");

function isRightBonus() {
    if (weInBonusJoker == true) {
        pravilenOdgovorBonus = izbranoVprasanjeSeOdgovarjaBonus[7];
        let aktivenElementBonus = event.target;
        let IzbraniOdgovorBonus = event.target.id;
        zadetkiBonusJokerPolje = document.getElementById("zadetkiBonusJoker");

        if (IzbraniOdgovorBonus == pravilenOdgovorBonus) { //PRAVI ODGOVOR
            pravilniOdgovoriJoker = pravilniOdgovoriJoker + 1;

            if (pravilniOdgovoriJoker == 5 || pravilniOdgovoriJoker == 10) {
                weGetOneJokerMoreSound.play();
            }
            answerSound.play();
            zadetkiBonusJokerPolje.innerHTML = pravilniOdgovoriJoker;

            aktivenElementBonus.style.background = 'green';
            let bonusJokerGumb = document.getElementById('BonusJoker');

            setTimeout(function () {
                if (weInBonusJoker == true) {
                    aktivenElementBonus.style.background = "linear-gradient(#822992, #752583)";
                }
                else {
                    aktivenElementBonus.style.background = "linear-gradient(#02053D, #014A91)";
                }
            }, 1000);

            EraseQuestionBonus();
            BonusJokerNextQuestion();
        }
        else if (IzbraniOdgovorBonus != pravilenOdgovorBonus) { // NAPAČEN ODGOVOR

            aktivenElementBonus.style.background = 'red';
            wrongAnswerJokerSound.play();
            setTimeout(function () {
                aktivenElementBonus.style.background = "linear-gradient(#822992, #752583)";
            }, 1000);

            EraseQuestionBonus();
            BonusJokerNextQuestion();
        }
    }
}

function EraseQuestionBonus(){
    vprasanje.innerHTML = "";
    odgovorA.innerHTML = "";
    odgovorB.innerHTML = "";
    izbranoVprasanjeSeOdgovarjaBonus = "";
}