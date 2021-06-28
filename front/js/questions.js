const questions = {
    createQuestionElement: function(questionNumber, sentence, right, wrongOne, wrongTwo){
        const newQuestionElement  = document.getElementById('empty-question')
                                            .content
                                            .cloneNode(true)
                                            .querySelector('.question-block');

        //cette fonction me permet de mélanger l'ordre de la bonne réponse (qui par défaut, arrive en premier)
        answers = questions.randomizeAnswers([right, wrongOne, wrongTwo]);
        console.log(answers);
        //Je récupère les input et les label
        
        inputElements = newQuestionElement.querySelectorAll(".input input");
        labelElements = newQuestionElement.querySelectorAll(".input label");

        //je veux attribuer sur les input en name le numéro de la question, et en value, le nom du personnage
        for(let i=0 ; i<=2 ; i++){
            console.log(inputElements[i]);
            inputElements[i].setAttribute('name', "question"+questionNumber);
            inputElements[i].setAttribute('value', answers[i].id);
            labelElements[i].setAttribute('for', answers[i].id);
            labelElements[i].textContent= answers[i].name;


        }

        newQuestionElement.dataset.id = "question"+questionNumber;
        newQuestionElement.querySelector('.question-title').textContent = sentence;

     

        questions.insertQuestionElements(newQuestionElement);
    },
    insertQuestionElements:function(questionElement){
        let formQuizz = document.querySelector(".form-quizz");
        formQuizz.append(questionElement);
    }, 
    randomizeAnswers:function(array){
        return array.sort();
    }
}