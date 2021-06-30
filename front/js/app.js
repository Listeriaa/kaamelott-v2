const app = {
    
    init: function(){
        
        const reloadButton = document.querySelector(".reload");
        reloadButton.addEventListener("click", (()=>{
            questions.closeModal();
            api.getQuestions()}));
    }
}

document.addEventListener('DOMContentLoaded', app.init);
