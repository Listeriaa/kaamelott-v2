const game = {
    points:0,
    goodAnswers: [],
    

    checkAnswer: function(question, answer){
        //je veux comparer la réponse au tableau de bonnes réponses
     
       if(game.goodAnswers[question] == answer){

            game.points++;
           return true;

       } else {
           return false;
       }
    }, 

    addComment:function(finalScore){
        if(finalScore === 10){

            return "🧀 Le gras, c'est la vie. 🧀";

        } else if (finalScore < 10 && finalScore >= 7){
            return "🤸 J'aimerais bien qu'on commence à me considérer comme tel. 🤸";
        }else if (finalScore < 7 && finalScore >= 4){

            return "😶 C'est pas faux. 😶";

        }else if (finalScore < 3 && finalScore >= 1){

            return "💡 Moi, je crois qu'il faut que vous arrêtiez d'essayer de dire des trucs. 💡";

        }else {

            return "💩 C'est d'la merde. 💩";

        }
    },

    checkIfLastQuestion: function(question){
        if (question == 10){

            return true;
        } else {
            return false;
        }
    },

    reloadGame: function(){
        app.init();
        questions.closeModal();
}
}
