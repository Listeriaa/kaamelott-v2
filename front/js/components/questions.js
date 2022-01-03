
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

        let questionNumberString = "question" + questionNumber;

        randomAnswers.forEach((item, id) => {
            
            inputElements[id].name = questionNumberString;
            inputElements[id].value = item.id;
            inputElements[id].id = `${questionNumberString}radio${item.id}`;
            labelElements[id].setAttribute("for", `${questionNumberString}radio${item.id}`);
            labelElements[id].textContent= item.name;

        })


        newQuestionElement.id = questionNumber;
        newQuestionElement.querySelector('.question-sentence').textContent = quote.sentence;
        newQuestionElement.querySelector('.question-title').textContent = "Question n°"+questionNumber;

        if(newQuestionElement.id !== "1"){
            questions.toggleDisplayNone(newQuestionElement);

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

        const questionName = questionElement.id;

        const modal = document.querySelector(".modal");
        
        const input = questionElement.querySelector('input:checked');

        console.log(modal);

        let noAnswer =  (message) => {
            buttonElement.textContent = message;
            buttonElement.classList.toggle("warning");
            questionElement.classList.toggle("echec");
        }

        //si aucune réponse n'a été sélectionnée
        if(input === null){

            noAnswer("Choisissez une réponse!");

            setTimeout(function() {
                noAnswer("Validez votre réponse");

            }, 1500)
        
        } else {
            const inputValue = input.value;


            const answer = game.checkAnswer(questionName, inputValue);

            console.log("points", game.points);
            console.log("answer", answer);

            if (game.checkIfLastQuestion(questionName)){

                game.removeQuestionElement();
                questions.addModal();

                let text = document.querySelector(".modal p");
                let title = modal.querySelector(".modal h2");
                let button = modal.querySelector(".reload");

                text.textContent = game.addComment(game.points);
                title.textContent = `Votre score : ${game.points}/10`;
                button.textContent = "Je rejoue!";

                game.createGoodAnswers(game.goodAnswers);

            } else{

                let handleAnswer = (message, classe, color) => {
                    const inputs = questionElement.querySelectorAll('input');

                    newButton.textContent = message;
                    newButton.classList.add(classe);
                    input.style.border = `6px solid ${color}`;

                    inputs.forEach(item => {
                        item.closest('.proposal').style.fontWeight="800"; 

                        if (color === "#178617") {
                            item.closest('.proposal').style.color = item.checked ? "#178617" : "#ff0000";
                        } else {
                            item.closest('.proposal').style.color = item.checked ? "#ff0000" : "#178617";

                        }
                    })

                }
                
                let newButton = document.createElement("button");

                if (answer){
                    game.points ++;
                    handleAnswer('Bravo! Cliquez pour la question suivante.', 'b-won', '#178617');


                } else {
                    handleAnswer('Dommage! Cliquez pour la question suivante.', 'b-lost', '#ff0000');

                }

                questionElement.replaceChild(newButton, buttonElement);

                newButton.addEventListener('click', ((ev) => {
                    ev.preventDefault();
                    questions.toggleDisplayNone(questionElement);

                    questions.toggleDisplayNone(NextQuestionElement);
                }));



            }; 
        }
        
    },


    randomizeAnswers:function(array){

        // Durstenfeld shuffle 
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

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