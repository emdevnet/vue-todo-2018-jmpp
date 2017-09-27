{
    'use strict';

    new Vue({
        // L'élément définissant le périmètre d'action de l'application Vue.js
        el : 'main#app',

        // Modèle de données de l'application
        data : {
            tasks        : [],
            newTaskTitle : ''
        },

        // Méthodes (fonctions) de l'application Vue.js
        methods : {
            addTask : function() {
                // Si l'intitulé de la nouvelle tâche est vide, on ne fait rien et on arrête la fonction.
                if (this.newTaskTitle.trim() === '') return;
    
                let newTask = {
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
            },
            
            removeTask : function(task) {
                // L'objet 'task' passé en paramètre correspond réellement à l'objet de notre modèle, on peut donc utiliser .indexOf() pour le rechercher
                let index = this.tasks.indexOf(task);
                
                // Si cet objet a été trouvé, on le retire du tableau de tâches
                if (index > -1) {
                    this.tasks.splice(index, 1);
                }
            },
        },

        /* Méthodes dites "computed" (pré-calculées) :
            Améliore les performances en n'évoquant les méthodes
            QUE si l'une des propriété en interne ne change */
        computed : {
            remaining : function() {
                /*
                    // Méthode "classique"
                    let counter = 0;
                    for (let index = 0; index < this.tasks.length; index++)
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
                return nb + " " + word + ((nb > 1) ? "s" : "");
            }
        },

        // Méthode de Vue.js invoquée lorsque le composant a été instancié (c'est ici que l'on peut placer le code d'initialisation de l'app)
        created : function() {
            try {
                // Tente de récupérer des tasks 
                let tasks  = localStorage.getItem('tasks');
                tasks      = JSON.parse(tasks) || [];
                this.tasks = tasks;
            } catch (e) {
                console.warn('Problème lors de la récupération des tâches dans le localStorage ! Aucune tâche n\'a été chargée.\n', e);
            }
        },

        watch : {
            tasks : {
                deep : true,
                handler : function() {
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        }
    });
}