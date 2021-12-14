/*
    - Pripravimo tabelo za vprašanje(izbranoVprasanjeSeOdgovarja)
    - Pokličemo metodo, ki prinese vprašanje(FetchQuestionBonusJoker) iz api - ja
    - Zaženemo uro in spustimo mp3, ki se predvaja med bonus jokerjem clockQuestionStart.
    - Onemogočimo pritisk gumba joker
    - Spremenimo css elementa za čas.
*/

var izbranoVprasanjeSeOdgovarjaBonus = [];
let clockQuestionStart = new Audio();
clockQuestionStart.src = "/Content/audio/clockQuestionStart.mp3";

function BonusJokerNextQuestion() {                // CELOTEN POTEK BONUS JOKERJA
    izbranoVprasanjeSeOdgovarjaBonus = [];
    FetchQuestionBonusJoker();
    clockQuestionStart.loop = true;
    clockQuestionStart.play();
    weInBonusJoker = true;
    document.getElementById("GumbJoker").disabled = true;
    cas.style.background = "linear-gradient(#822992, #752583)";
}