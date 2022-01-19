const api = {

    getQuestions: async function(){

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
                    
        try {
            const request = await fetch(app.apiUrl, config);
            const quotes = await request.json();
            game.goodAnswers = quotes.map(quote =>  quote.character.id );
            game.quotes = quotes;
            quotes.forEach((quote, i) => {
                questions.createQuestionElement(i+1, quote);
            })            
 
            const reloadButton = document.querySelector(".reload");
            reloadButton.addEventListener("click", game.reloadGame);

            return quotes;
        }
        catch(err) {
            console.log('il y a un problème', err);

        }
    }
}