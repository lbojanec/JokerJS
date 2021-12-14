/*
-	Metoda za pridobitev enega naključnega vprašanja iz nabora vprašanj za bonus joker iz baze in njegovih odgovorov.
-	Z njim napolnim IzbranoVprasanjeSeOdgovarjaBonus.
*/

var zePostavljenaVprasanja = [];
var izbranoVprasanjeSeOdgovarjaBonus = [];

function FetchQuestionBonusJoker() {
    fetch("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionByDifficultyAndType/1/5")
        .then(response => response.json())
        .then(question => {
            if (zePostavljenaVprasanja.includes(question.c_IdQuestion)) {

                FetchQuestionBonusJoker();
                return;
            }
            izbranoVprasanjeSeOdgovarjaBonus.push(question.c_IdQuestion);
            izbranoVprasanjeSeOdgovarjaBonus.push(question.c_IdDifficulty);
            izbranoVprasanjeSeOdgovarjaBonus.push(question.c_QuestionText);

            fetch("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionAnswers/" + question.c_IdQuestion)
                .then(response => response.json())
                .then(questionAnswers => {

                    for (let i = 0; i < questionAnswers.length; i = i + 1) {
                        izbranoVprasanjeSeOdgovarjaBonus.push(questionAnswers[i].c_AnswerText);
                    }

                    izbranoVprasanjeSeOdgovarjaBonus.push("");
                    izbranoVprasanjeSeOdgovarjaBonus.push("");

                    for (let i = 0; i < questionAnswers.length; i = i + 1) {
                        if (questionAnswers[i].c_IsCorrect == true) {
                            if (i == 0) {
                                izbranoVprasanjeSeOdgovarjaBonus.push("A");
                            }
                            if (i == 1) {
                                izbranoVprasanjeSeOdgovarjaBonus.push("B");
                            }
                        }
                    }

                    vprasanje.innerHTML = izbranoVprasanjeSeOdgovarjaBonus[2];
                    zePostavljenaVprasanja.push(izbranoVprasanjeSeOdgovarjaBonus[0]);

                    odgovorA.innerHTML = izbranoVprasanjeSeOdgovarjaBonus[3];
                    odgovorB.innerHTML = izbranoVprasanjeSeOdgovarjaBonus[4];
                });
        });
}