
const questions = {
    

    createQuestionElement: function(questionNumber, quote){

        const formQuizz = document.querySelector(".form-quizz");

        const newQuestionElement  = document.getElementById('empty-question')
                                            .content
                                            .cloneNode(true)
                                            .querySelector('.question-block');

 
        const {character, wrongone, wrongtwo} = quote;

        
        let randomAnswers = questions.randomizeAnswers([character, wrongone, wrongtwo]);
  
       
        let inputElements = newQuestionElement.querySelectorAll("input");
        let labelElements = newQuestionElement.querySelectorAll("label");
        console.log(inputElements);
        console.log(labelElements);

        let questionNumberString = "question" + questionNumber;

        randomAnswers.forEach((item, id) => {

            inputElements[id].name = questionNumberString;
            inputElements[id].value = item.id;
            inputElements[id].id = `${questionNumberString}radio${item.id}`;
            labelElements[id].setAttribute("for", `${questionNumberString}radio${item.id}`);
            labelElements[id].textContent= item.name;

        })


        newQuestionElement.id = questionNumber;
        newQuestionElement.querySelector('.question-sentence').textContent = character.sentence;
        newQuestionElement.querySelector('.question-title').textContent = "Question n°"+questionNumber;

        if(newQuestionElement.id !== "1"){
            newQuestionElement.classList.add("display-none");
        }

        newQuestionElement.querySelector('.question-validate').addEventListener("click", questions.handleClickButton);

        formQuizz.append(newQuestionElement);

    },


    toggleDisplayNone:function(element){

        element.classList.toggle("display-none");

    },

    handleClickButton: function(evt){

        evt.preventDefault();
        const buttonElement = evt.currentTarget;

        const questionElement = buttonElement.closest(".question-block");
        
        const NextQuestionElement = questionElement.nextSibling;
        
        //si aucune réponse n'a été sélectionnée
        if(questions.getInputValue(questionElement) === null){

            buttonElement.textContent = "Choisissez une réponse!";
            buttonElement.classList.toggle("warning");
            questionElement.classList.toggle("echec");

            setTimeout(function() {
                buttonElement.textContent = "Validez votre réponse";
                buttonElement.classList.toggle("warning");
                questionElement.classList.toggle("echec");

            }, 1500)
        
        } else {

            let questionName = questionElement.id;

            let inputValue = questions.getInputValue(questionElement);
            let answer = game.checkAnswer(questionName, inputValue);

            if (game.checkIfLastQuestion(questionName)){
                game.removeQuestionElement();
                questions.addModal();

                let modal = document.querySelector(".modal p");
                let title = document.querySelector(".modal h2");
                let results = document.querySelector(".results");
                let button = document.querySelector(".reload");

                modal.textContent = game.addComment(game.points);
                title.textContent = "Votre score : " + game.points + "/10";
                button.textContent = "Je rejoue!";

                game.createGoodAnswers(game.goodAnswers);

            } else{
                answer ? null : questionElement.closest('.question-block').classList.add('echec');
                if (answer){
                    buttonElement.textContent = "Bravo! Cliquez pour la question suivante.";
                    buttonElement.classList.add('win');
                } else {
                    buttonElement.textContent = "Prochaine question";
                    buttonElement.classList.add('warning');

                }
                questions.showGoodAnswer(questionElement, questionName);


                buttonElement.addEventListener('click', (() => {
                    questions.toggleDisplayNone(questionElement);

                    questions.toggleDisplayNone(NextQuestionElement);
                }));



            }; 
        }
        
    },
    showGoodAnswer:function(element, questionName){
        console.log(game.goodAnswers);

        let inputArray = element.getElementsByTagName("input");
        for (element of inputArray) {
            let inputValue = element.value;

            let response = game.checkAnswer(questionName, inputValue);
            if (response == true){
                element.closest('div').style.color="#178617";
                element.closest('div').style.fontWeight="800";

            } else {
                element.closest('div').style.color="#ec0e0e";
                element.closest('div').style.fontWeight="800";

            }
        };
    },

    getInputValue: function(element){

        const inputGroup = element.getElementsByTagName("input");

        let inputValue = null;

        for(input of inputGroup){

            if (input.checked){
                inputValue = input.value;
            } 
        }
        return inputValue;
    },

    randomizeAnswers:function(array){
        //je crée un tableau vide pour récupérer les id de chaque réponse
        let idArray = [];

        // Durstenfeld shuffle 
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        } // eslint-disable-line no-param-reassign

        return array;
    },

    addModal:function(){
        let modal = document.querySelector(".modal");
        modal.classList.toggle("is-hidden");

        let mainContainer = document.querySelector('.main-container');
        mainContainer.classList.toggle("is-blurred");

    },

    closeModal:function()
    {
        let modal = document.querySelector(".modal");
        let mainContainer = document.querySelector('.main-container');
       
        modal.classList.add("is-hidden");
        mainContainer.classList.remove("is-blurred");
             
    }
}