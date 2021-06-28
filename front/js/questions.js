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
        console.log(answers);
        console.log(randomAnswers);
        inputElements = newQuestionElement.querySelectorAll(".input input");
        labelElements = newQuestionElement.querySelectorAll(".input label");

        //je veux attribuer sur les input en name le numéro de la question, et en value, le nom du personnage
        //je veux attribuer sur les label en for le numéro de la question, et en textContent le nom du personnage.
        for(let i=0 ; i<=2 ; i++){
            inputElements[i].setAttribute('name', "question"+questionNumber);
            inputElements[i].setAttribute('value', randomAnswers[i][0]);
            labelElements[i].setAttribute('for', randomAnswers[i][0]);
            labelElements[i].textContent= randomAnswers[i][1];

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

}

