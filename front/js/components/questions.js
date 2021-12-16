const questions = {
    

    createQuestionElement: function(questionNumber, quote){
        const newQuestionElement  = document.getElementById('empty-question')
                                            .content
                                            .cloneNode(true)
                                            .querySelector('.question-block');

        console.log("dans createElement",quote);
        const {character, wrongone, wrongtwo}= quote;
        console.log(character, wrongone, wrongtwo)
        //cette fonction me permet de mélanger l'ordre de la bonne réponse (qui par défaut, arrive en premier)
        let answers = [character, wrongone, wrongtwo];
        
        let randomAnswers = questions.randomizeAnswers(answers);
        //le tableau obtenu est de la forme [[id, nom][id, nom][id, nom]]
        //Je récupère les input et les label
       
        let inputElements = newQuestionElement.querySelectorAll(".input input");
        let labelElements = newQuestionElement.querySelectorAll(".input label");

        let $questionNumberString = "question" + questionNumber;
        //je veux attribuer sur les input en name le numéro de la question, et en value, le nom du personnage
        //je veux attribuer sur les label en for le numéro de la question, et en textContent le nom du personnage.
        for(let i=0 ; i<=2 ; i++){
            inputElements[i].name = $questionNumberString;
            inputElements[i].value = randomAnswers[i][0];
            inputElements[i].id = `id${$questionNumberString}radio${randomAnswers[i][0]}`;
            inputElements[i].for = `id${$questionNumberString}radio${randomAnswers[i][0]}`;
            labelElements[i].textContent= randomAnswers[i][1];

        }

        newQuestionElement.dataset.id = questionNumber;
        newQuestionElement.querySelector('.question-sentence').textContent = character.sentence;
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
        console.log("array de base:", array);
        let idArray = [];
        for (const character of array) {
            idArray.push(character.id);
        }
        //Je mélange ces id avec la fonction reverse et random
        for (let i = idArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [idArray[i], idArray[j]] = [idArray[j], idArray[i]];
        } // eslint-disable-line no-param-reassign
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
