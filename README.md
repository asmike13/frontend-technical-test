# Frontend technical test leboncoin

Faire une application qui contient les fonctionnalitées suivantes :
- Choix d'un user
- Choix d'une conversation parmis celle du user choisi
- Possibilité de supprimer une conversation
- Liste des messages échangé
- Possibilité de supprimer un message
## Cas pratique

Sur chaque page on retrouve un bouton pour retourner sur la homepage.

Sur la homepage on a la possibilité de choisir parmis tous les users présents dans la base.

Au click sur un user, on est redirigé sur la liste des converstion ou ce user apparait.

On peut ajouter une conversation en cliquant sur "AJOUTER UNE CONVERSATION À X", puis en selectionnant dans la liste le user avec lequel on veut créer une nouvelle conversation.
Le user actuel ne sera donc pas présent dans cette liste.

On peut supprimer une conversation en cliquant sur la corbeille, mais seulement si on est le user qui a créer la conversation.

Au click sur une conversations, on est redirigé vers le détail de celle-ci.

On peut voir les message du user courant sur le coté droit, et sur le user distant sur le coté gauche.
Le user distant verra son nom apparaitre avant son message, dans le cas ou celui envoi plusieurs message à la suite on affichera seulement son nom sur le premier.

On va pouvoir écrire un text dans le champ prévu en bas de page et au click sur "ENVOYER" le message sera sauvegardé et la conversation rafraichi.

Enfin, au click sur le crayon en haut de page, on va passer en mode édition, ce qui vas permettre de pouvoir supprimer des messages en cliquant sur une corbeille qui vas apparaitre seulement pour les messages du user courant.

Si on essaye d'aller sur une url qui n'existe pas, on aura un message d'erreur.
S'il manque une donnée dans l'url on aura un message pour nous dire quoi faire (en général retourner à la page précédente)

### Remarques

Dans le swagger fourni les delete retournent des 404 donc impossible de test les suppressions de conversation ou message.
Je pense que le Middleware empêche l'affichage de la nouvelle conversation lors de l'ajout, quand on restart le back la nouvelle conversation apparait.

### Amélioration

On peut ajouter un store (redux) pour partager les datas entre les composants et éviter le props drilling et les appel multiple aux même apis.

Pour le bonus 2, étant en asynchrone, il faudrait mettre en place un middleware de type "redux-thunk" afin de pouvoir gérer de manière centralisé les loading et responses des api.