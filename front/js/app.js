const app = {
    
    init: function(){
        
        api.getQuestions();

    }
}

document.addEventListener('DOMContentLoaded', app.init);
