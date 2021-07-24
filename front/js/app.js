const app = {
    apiUrl:'https://api.kaamelott.laetitia-dev.com/api/quote/random',

    init: function(){
        
        const reloadButton = document.querySelector(".reload");
        
        reloadButton.addEventListener("click", (()=>{
            questions.closeModal();
            
            api.getQuestions()}
        ));
    }
}

document.addEventListener('DOMContentLoaded', app.init);
