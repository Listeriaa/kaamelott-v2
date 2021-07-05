const app = {
    apiUrl:'http://0.0.0.0:8080/api/quote/random',

    init: function(){
        
        const reloadButton = document.querySelector(".reload");
        
        reloadButton.addEventListener("click", (()=>{
            questions.closeModal();
            
            api.getQuestions()}
        ));
    }
}

document.addEventListener('DOMContentLoaded', app.init);
