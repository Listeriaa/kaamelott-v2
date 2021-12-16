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
            try {
                return response.json();

            } catch(err) {
                alert('il y a un problème', err);

            }

        })
        .then(function(quotes){
            console.log(quotes);
            game.goodAnswers = quotes.map(quote => quote.character.id);
            console.log("goodAnswers :", game.goodAnswers)

            quotes.forEach((quote, i) => {
                console.log('quote dans le foreach:',quote);
                questions.createQuestionElement(i+1, quote.sentence, quote.character, quote.wrongone, quote.wrongtwo);
            })            
            // for(let i = 0 ; i<10 ; i++){
                
            //     currentQuote = quotes[i];
            //     console.log("currentQuote:", currentQuote);
            //     //Je remplis le tableau avec les bonnes réponses pour pouvoir faire le décompte de points
            //     game.goodAnswers[i+1] = currentQuote;
                
            //     questions.createQuestionElement(i+1, currentQuote.sentence, currentQuote.character, currentQuote.wrongone, currentQuote.wrongtwo);                
            // }
            // console.log("goodAnswers :", game.goodAnswers)
            const reloadButton = document.querySelector(".reload");
            reloadButton.addEventListener("click", game.reloadGame);
        })
    }
}