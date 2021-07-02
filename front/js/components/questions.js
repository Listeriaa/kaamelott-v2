const questions = {
    

    createQuestionElement: function(questionNumber, sentence, right, wrongOne, wrongTwo){
        const newQuestionElement  = document.getElementById('empty-question')
                                            .content
                                            .cloneNode(true)
                                            .querySelector('.question-block');

        //cette fonction me permet de mélanger l'ordre de la bonne réponse (qui par défaut, arrive en premier)
        let answers = [right, wrongOne, wrongTwo];
        
        let randomAnswers = questions.randomizeAnswers(answers);
        //le tableau obtenu est de la forme [[id, nom][id, nom][id, nom]]
        //Je récupère les input et les label
       
        let inputElements = newQuestionElement.querySelectorAll(".input input");
        let labelElements = newQuestionElement.querySelectorAll(".input label");

        let $questionNumberString = "question" + questionNumber;
        //je veux attribuer sur les input en name le numéro de la question, et en value, le nom du personnage
        //je veux attribuer sur les label en for le numéro de la question, et en textContent le nom du personnage.
        for(let i=0 ; i<=2 ; i++){
            inputElements[i].setAttribute('name', $questionNumberString);
            inputElements[i].setAttribute('value', randomAnswers[i][0]);
            inputElements[i].setAttribute('id', $questionNumberString + "radio" + randomAnswers[i][0]);
            labelElements[i].setAttribute('for', $questionNumberString + "radio" + randomAnswers[i][0]);
            labelElements[i].textContent= randomAnswers[i][1];

        }

        newQuestionElement.dataset.id = questionNumber;
        newQuestionElement.querySelector('.question-sentence').textContent = sentence;
        newQuestionElement.querySelector('.question-title').textContent = "Question n°"+questionNumber;

        if(newQuestionElement.dataset.id !== "1"){
            newQuestionElement.classList.add("display-none");
        }
        questions.bindQuestionEvent(newQuestionElement);
        questions.insertQuestionElements(newQuestionElement);
    },

    insertQuestionElements:function(questionElement){
        let formQuizz = document.querySelector(".form-quizz");
        formQuizz.append(questionElement);
    },


    bindQuestionEvent:function(questionElement){

        const buttonElement = questionElement.querySelector(".question-validate");
        
        buttonElement.addEventListener("click", questions.handleClickButton);
      
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

            let questionName = questionElement.dataset.id;

            questions.toggleDisplayNone(questionElement);

            let inputValue = questions.getInputValue(questionElement);

            game.checkAnswer(questionName, inputValue);

            if (game.checkIfLastQuestion(questionName)){

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
                questions.toggleDisplayNone(NextQuestionElement);

            }; 
        }
        
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
        for (const character of array) {
            idArray.push(character.id);
        }
        //Je mélange ces id avec la fonction reverse.
        idArray.reverse();
        
        //je crée un objet vide qui contiendra les id random avec les noms associés
        let sortedArray=[];
        //je remplis ce tableau avec les nom des personnages correspondants qui se trouvent dans la variable array
        for (const idRandom of idArray) {
            for (const character of array) {
                
                if(idRandom === character.id){

                    sortedArray.push([idRandom, character.name]);
                    
                   break;
                }
            }
        }
        return sortedArray;
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
