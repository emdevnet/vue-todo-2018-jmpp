{
    'use strict';

    new Vue({
        // L'élément définissant le périmètre d'action de l'application Vue.js
        el : 'main#app',

        // Modèle de données de l'application
        data : {
            tasks : [
                { title : "Nourrir le chat", isDone : true },
                { title : "Acheter un chiot", isDone : false },
                { title : "Revendre le chat", isDone : false }
            ]
        }
    });
}