/*
-	Spustimo mp3 za vzdušje med vprašanjem
*/

let inQuestionSound = new Audio();
inQuestionSound.src = "/Content/audio/inQuestionSound.mp3";

setInterval(function MusicInQuestion() {  //THERE
    if (trenutnoVprasanje != daniOdgovori.length && odgovorD.innerText != "") {
        inQuestionSound.play();
    }
}, 2000);