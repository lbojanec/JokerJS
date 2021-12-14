/*
-	Doda tekmovalcu enega jokerja in ga doda tudi vizualno doda.
-	Spustimo mp3 ob dodanem jokerju.
-	Posebnosti v primeru dodajanja 8 in 9 jokerja.
*/

let polozajTekmovalcaJoker = 7;
let oneJokerAddedSound = new Audio();
oneJokerAddedSound.src = "/Content/audio/oneJokerAddedSound.mp3";
let osmiJoker = document.getElementById("Ja8");
let devetiJoker = document.getElementById("Ja9");
osmiJoker.style.display = "none";
devetiJoker.style.display = "none";

function enDodanJoker() {

        setTimeout(function () {
            polozajTekmovalcaJoker = polozajTekmovalcaJoker + 1;

            for (let i = 1; i <= polozajTekmovalcaJoker; i = i + 1) {
                document.getElementById("Ja" + i).style.backgroundColor = "#BC8339";
                document.getElementById("Jb" + i).style.backgroundColor = "#11167A";
                document.getElementById("Jc" + i).style.color = "#BC8339";     //PRILAGODIMO JOKERJE
            }

            if (polozajTekmovalcaJoker == 8) {
                osmiJoker.style.display = "grid";
                devetiJoker.style.display = "none";
            }
            if (polozajTekmovalcaJoker == 9) {
                osmiJoker.style.display = "grid";
                devetiJoker.style.display = "grid";
            }
            if (polozajTekmovalcaJoker < 8) {
                osmiJoker.style.display = "none";
                devetiJoker.style.display = "none"; //ŠTIMAMO 8 in 9 JOKER!
            }
            oneJokerAddedSound.play();
        }, 3500);
}