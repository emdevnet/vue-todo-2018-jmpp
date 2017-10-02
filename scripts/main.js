{
    'use strict';

    // Composant <task>
    const Task = {
        props : {
            task : { type : Object, required : true },
            index : { type : Number, required : true }
        },

        template : `
            <li class="collection-item">
                <input type="checkbox" :id="'t_' + (index + 1)" v-model="task.isDone">
                <label :for="'t_' + (index + 1)">{{ task.title }}</label>
                <a href="#" class="link-delete" title="Supprimer cette tâche" v-on:click.prevent="remove(task)"><!-- Passage de l'objet 'task' en paramètre à la méthode 'removeTask' -->
                    <i class="small material-icons">delete_forever</i>
                </a>
            </li>
        `,

        methods : {
            remove : function(task) {
                this.$emit('remove', task);
            }
        }
    };
    // Fin du composant <task>

    // Composant <task-form>
    const TaskForm = {
        template : `
            <form class="row" v-on:click.prevent="onSubmit">
                <div class="input-field col m6 offset-m3">
                    <input id="taskTitle" type="text" v-model="newTaskTitle">
                    <label for="taskTitle">Intitulé de la tâche</label>
                </div>
                <div class="col m4 offset-m5">
                    <button type="submit" class="waves-effect waves-light btn" v-bind:disabled="newTaskTitle.trim() === ''">Ajouter</button>
                </div>
            </form>
        `,
        data : function() {
            return {
                newTaskTitle : ''
            }
        },
        methods : {
            onSubmit : function() {
                this.$emit('add', this.newTaskTitle);

                /*
                    Réinitalise la valeur de la variable "newTaskName", utilisée
                    en tant que modèle sur le <input type="text">
                    Du coup, réinitialiser la variable "newTaskName" permet de
                    vider la valeur de ce champs input
                */
                this.newTaskTitle = '';
            }
        }
    };
    // Fin du composant <task-form>

    new Vue({
        // L'élément définissant le périmètre d'action de l'application Vue.js
        el : 'main#app',

        // Composants utilisés pour l'application Vue
        components: { Task, TaskForm },

        // Modèle de données de l'application
        data : {
            tasks : []
        },

        // Méthodes (fonctions) de l'application Vue.js
        methods : {
            addTask : function(newTaskTitle) {
                // Si l'intitulé de la nouvelle tâche est vide, on ne fait rien et on arrête la fonction.
                if (newTaskTitle.trim() === '') return;
    
                let newTask = {
                    title : newTaskTitle,
                    isDone: false
                };
                
                this.tasks.push( newTask );
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
                // Si l'opération provoque une erreur, on affiche un Warning en console et on ne fait rien de spécial (laisse un tableau vide dans `this.tasks` donc)
                console.warn('Problème lors de la récupération des tâches dans le localStorage ! Aucune tâche n\'a été chargée.\n', e);
            }
        },

        // Indique à Vue.js quelles sont les propriétés (dans 'data') de l'application sur lesquelles on souhaite observer les changements
        watch : {
            tasks : {
                deep : true, // Indique que l'observation de changements sur cette propriété doit se faire en profondeur
                handler : function() { // Invoque cette fonction à chaque changement de la data 'tasks'
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                }
            }
        }
    });
}