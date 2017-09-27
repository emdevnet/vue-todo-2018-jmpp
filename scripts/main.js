{
    'use strict';

    new Vue({
        // L'élément définissant le périmètre d'action de l'application Vue.js
        el : 'main#app',

        // Modèle de données de l'application
        data : {
            tasks : [
                { title : "Nourrir le chat" , isDone : true },
                { title : "Acheter un chiot", isDone : false },
                { title : "Revendre le chat", isDone : false }
            ],

            newTaskTitle : ''
        },

        // Méthodes (fonctions) de l'application Vue.js
        methods : {
            addTask : function() {
                // Si l'intitulé de la nouvelle tâche est vide, on ne fait rien et on arrête la fonction.
                if (this.newTaskTitle.trim() === '') return;
    
                var newTask = {
                    title : this.newTaskTitle,
                    isDone: false
                };
                
                this.tasks.push( newTask );
    
                /*
                    Réinitalise la valeur de la variable "newTaskName", utilisée
                    en tant que modèle sur le <input type="text">
                    Du coup, réinitialiser la variable "newTaskName" permet de
                    vider la valeur de ce champs input
                */
                this.newTaskTitle = '';
            }
        },

        /* Méthodes dites "computed" (pré-calculées) :
            Améliore les performances en n'évoquant les méthodes
            QUE si l'une des propriété en interne ne change */
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
        },

        // Filters de l'application Vue.js
        filters : {
            pluralize : function(nb, word) {
                if (nb > 1) { word += "s"; }
                return nb + " " + word;
            }
        }
    });
}