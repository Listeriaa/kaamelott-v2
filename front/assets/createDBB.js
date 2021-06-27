const app = {

    characters: {
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
        14:"Yvain",
        15:"Attila",
        16:"Elias de Kelliwic'h",
        17:"Le Roi Burgonde"
     
    },
    init: function (){
        
        app.getQuotes(app.characters[17], 17);
       
         
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
        //Je génère 2 mauvaises réponses
        wrongAnswers = app.getWrongAnswers(id);
        // je les attribue aux valeurs a envoyer en BDD
        wrongOne = wrongAnswers[0];
        
        wrongTwo = wrongAnswers[1];

        let data = {
            sentence:string,
            characterId:id,
            wrongOneId:wrongOne,
            wrongTwoId:wrongTwo,
            
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
    },

    getRandomId: function(){
        //je récupère un id compris entre 1 et 17 (correspondant aux id de chaque caractère.) 
        min = Math.ceil(1);
        max = Math.floor(17);
        return Math.floor(Math.random() * (max - min +1)) + min;
    
    },

    getWrongAnswers: function(id){
        wrongOne = app.getRandomId();
        wrongTwo = app.getRandomId();

        while(wrongOne === id || wrongTwo === id || wrongOne === wrongTwo){
            if (wrongOne === id){
                wrongOne = app.getRandomId();
            }
            if (wrongTwo === id || wrongTwo === wrongOne){
                
                    wrongTwo = app.getRandomId();
                
            }
        }

       return [wrongOne, wrongTwo];

    }
}
