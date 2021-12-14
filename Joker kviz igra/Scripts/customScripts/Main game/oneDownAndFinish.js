/*
-	Izvede se v primeru, da je uporabnik pri zadnjem vprašanju pritisnil gumb odstopi
-	Spusti tekmovalca za 1 položaj na denarni lestvici in zaključi z igro (html elementi : zgornjiDelIgre, QuestionNowFont
-	Preusmeritev na začetek igre
*/

function oneDownAndFinish() {
    igralecPobegnil = true;
    polozajTekmovalcaDenar = polozajTekmovalcaDenar - 1;
    ColorActiveMoney();

    DisplayMoneyAchieved();
    document.getElementById("zgornjiDelIgre").style.background = "  linear-gradient(#D13B51, #FFF768)";
    document.getElementById("denar20K-finish").style.display = "grid";
    konecIgreSound.play();

    document.getElementById("QuestionNowFont").innerHTML = "12";
    RedirectToNewGame();
}