/*
-	Izvede se ob pritisku na gumb joker
-	Odvzame enega jokerja tako na polozajTekmovalcaJoker spremenljivki kot vizualno
*/

function VzemiEnegaJokerja() {
    polozajTekmovalcaJoker = polozajTekmovalcaJoker - 1;

    if (polozajTekmovalcaJoker == 8) {
        devetiJoker.style.display = "none";
    }
    if (polozajTekmovalcaJoker < 8) {
        devetiJoker.style.display = "none";
        osmiJoker.style.display = "none";
    }

    for (let i = 9; i > polozajTekmovalcaJoker; i = i - 1) {
        document.getElementById("Ja" + i).style.backgroundColor = "#54537E";
        document.getElementById("Jb" + i).style.backgroundColor = "#BAACC8";
        document.getElementById("Jc" + i).style.color = "#54537E";
    }
}
