const game = {
    points:0,
    goodAnswers: [],
    quotes : [],

    checkAnswer: function(question, answer){
        //je veux comparer la réponse au tableau de bonnes réponses


       if(game.goodAnswers[question - 1] == answer){

           return true;

       } else {

           return false;
       }
    }, 

    addComment:function(finalScore){
        if(finalScore === 10){

            return "🧀 Le gras, c'est la vie. 🧀";

        } else if (finalScore < 10 && finalScore >= 7){

            return "🤸 J'aimerais bien qu'on commence à me considérer en tant que tel. 🤸";

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
    /**
     * 
     * @param {quotes} array 
     */
    createGoodAnswers:function(quotes){
        let results = document.querySelector(".goodanswers");
        console.log(quotes);
        quotes.forEach(quote => {
            //création de la div pour chaque réponse
            let divElement =  document.createElement("div");
            results.prepend(divElement);
            //remplissage avec le texte de la réplique
            let sentence = document.createElement("p");
            sentence.textContent = quote.sentence;
            divElement.append(sentence);

            //remplissage avec le nom de la bonne réponse et mise en forme
            let response = document.createElement("p");
            response.textContent = quote.character.name;
            response.style.color = "#178617";
            response.style.paddingTop = "0px";
            response.style.fontWeight = "bolder";
            divElement.appendChild(response);

            console.log(divElement);
        });
    },
    reloadGame: function(){
 
        game.removeQuestionElement();
        game.points = 0;
    }, 

    removeQuestionElement: function(){

        let questionElements = document.querySelectorAll(".question-block");
        let formElement = document.querySelector(".form-quizz");
        questionElements.forEach(element => { 
            formElement.removeChild(element);            
        });
    
    }
}
