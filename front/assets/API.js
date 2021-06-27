const api = {

    getQuestion: function(){

        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        request = fetch('http://0.0.0.0:8080/quote/random', config);
            // Ensuite, lorsqu'on reçoit la réponse au format JSON

        request.then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            if(response.status === 200){
                return response.json();

            } else {
                alert('il y a un problème');
            }
        })
        .then(function(quote){
            quote = quote[0];
            return quote;
        })
        .then(function(quote){
            console.log(quote.sentence);
            console.log(quote.character.name);
            console.log(quote.wrongone.name);
            console.log(quote.wrongtwo.name);

        })
    }
}