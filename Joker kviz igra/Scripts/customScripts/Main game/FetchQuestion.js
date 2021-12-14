/*
-	Metoda za pridobitev enega naključnega vprašanja iz baze in njegovih odgovorov.
-	Z njim napolnimo IzbranoVrpasanjeSeOdgovarja
*/

var zePostavljenaVprasanja = [];
var IzbranoVprasanjeSeOdgovarja = [];

function FetchQuestion(apiKlic) {
    fetch(apiKlic)
        .then(response => response.json())
        .then(question => {
            if (zePostavljenaVprasanja.includes(question.c_IdQuestion)) {

                FetchQuestion(apiKlic);
                return;
            }
            IzbranoVprasanjeSeOdgovarja.push(question.c_IdQuestion);
            IzbranoVprasanjeSeOdgovarja.push(question.c_IdDifficulty);
            IzbranoVprasanjeSeOdgovarja.push(question.c_QuestionText);

            fetch("http://surscpu/QuizAPI_BPS/api/quiz/GetQuestionAnswers/" + question.c_IdQuestion)
                .then(response => response.json())
                .then(questionAnswers => {

                    for (let i = 0; i < questionAnswers.length; i = i + 1) {
                        IzbranoVprasanjeSeOdgovarja.push(questionAnswers[i].c_AnswerText);
                    }

                    for (let i = 0; i < questionAnswers.length; i = i + 1) {
                        if (questionAnswers[i].c_IsCorrect == true) {
                            if (i == 0) {
                                IzbranoVprasanjeSeOdgovarja.push("A");
                            }
                            if (i == 1) {
                                IzbranoVprasanjeSeOdgovarja.push("B");
                            }
                            if (i == 2) {
                                IzbranoVprasanjeSeOdgovarja.push("C");
                            }
                            if (i == 3) {
                                IzbranoVprasanjeSeOdgovarja.push("D");
                            }
                        }
                    }
                });
        });
}