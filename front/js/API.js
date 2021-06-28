const api = {
    goodAnswers : [],
    init: function(){
        
    },
    getQuestions: function(){

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        
        request = fetch('http://0.0.0.0:8080/quote/random', config);
            

        request.then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            if(response.status === 200){
                return response.json();

            } else {
                alert('il y a un problème');
            }
        })
        .then(function(quote){
            
            return quote;
        })
        .then(function(quote){
            for(let i = 0 ; i<10 ; i++){
                currentQuote = quote[i];
                api.goodAnswers[i+1] = currentQuote.character.id;
                questions.createQuestionElement(i+1, currentQuote.sentence, currentQuote.character, currentQuote.wrongone, currentQuote.wrongtwo);
            }
            

        })
    }
}