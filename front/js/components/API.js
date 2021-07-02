const api = {

    getQuestions: function(){

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        
        request = fetch(app.apiUrl, config);
            

        request.then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            if(response.status === 200){
                return response.json();

            } else {
                alert('il y a un problème');
            }
        })
        .then(function(quote){
            for(let i = 0 ; i<10 ; i++){
                
                currentQuote = quote[i];
                //Je remplis le tableau avec les bonnes réponses pour pouvoir faire le décompte de points
                game.goodAnswers[i+1] = currentQuote;
                
                questions.createQuestionElement(i+1, currentQuote.sentence, currentQuote.character, currentQuote.wrongone, currentQuote.wrongtwo);                
            }
            
            const reloadButton = document.querySelector(".reload");
            reloadButton.addEventListener("click", game.reloadGame);
        })
    }
}