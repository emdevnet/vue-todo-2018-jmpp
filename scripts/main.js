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
        },

        // Méthodes pré-caculées de l'application Vue.js
        computed : {
            remaining : function() {
                /*
                    // Méthode "classique"
                    var counter = 0;
                    for (var index = 0; index < this.tasks.length; index++)
                    {
                        if (this.tasks[index].isDone === false)
                        {
                            counter++;
                        }
                    }
                    return counter;
                */
                    
                // Méthode fonctionnelle
                return this.tasks
                            .filter( task => !task.isDone )
                            .length;
            }
        }
    });
}