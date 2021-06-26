let app = {
    init: function (){
        let characters = {
            1:'Arthur',
            2:"Bohort",
            3:"Gauvain",
            4:"Guenièvre",
            5:"Kadoc",
            6:"Karadoc",
            7:"Lancelot",
            8:"Léodagan",
            9:"Loth",
            10:"Merlin",
            11:"Perceval",
            12:"Séli",
            13:"Venec",
            14:"Yvain"
         
        }
        for(let i; i< characters.length ; i++){
            app.getQuotes(characters[i], i);
        };
    },

    getQuotes: function(name, id){
        let config = {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        };
        
        // On déclenche la requête HTTP (via le moteur sous-jacent Ajax)
        request = fetch('https://cors-anywhere.herokuapp.com/https://kaamelott.chaudie.re/api/all/personnage/' + name, config);
            // Ensuite, lorsqu'on reçoit la réponse au format JSON

        request.then(function(response) {
        // On convertit cette réponse en un objet JS et on le retourne
            if(response.status === 200){
                return response.json();

            } else {
                alert('il y a un problème');
            }
        })
        .then(function(quotes) {
            let quotesArray = quotes.citation;
           quotesArray.forEach(quote => {
              app.sendQuote(quote.citation, id);
           });
        }
        )
    }, 

    sendQuote: function(string, id){
        let data = {
            sentence:string,
            characterId:id,
        }
        let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            // On consomme l'API pour ajouter en DB
            let fetchOptions = {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                // On ajoute les headers dans les options
                headers: myHeaders,
                // On ajoute les données, encodée en JSON, dans le corps de la requête
                body: JSON.stringify(data)
            };

            fetch('http://0.0.0.0:8080/quote', fetchOptions)
            .then(
                function(response) {
                    console.log(response);
                    // console.log(response);
                    // Si HTTP status code à 201 => OK
                    if (response.status == 201){
                        console.log('ok');
                    }else{
                        console.log("y'a un problème");
                    }
                }
            )
    }
}


