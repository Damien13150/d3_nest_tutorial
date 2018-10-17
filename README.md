# Déroulement

Vous devez créer un fork de ce projet par groupe BI.
Tous les membres du groupe doivent rejoindre le projet.

Vous devez vous répartir les taches suivantes (chaque personne du groupe doit au moins effectuer une tache).
Les personnes n'ayant pas participé devront effectuer un rattrapage.
Chaque tache doit faire l'objet d'un commit référençant le numéro de la tache.

Le projet est à rendre pour le *vendredi 26 octobre 9h30*.

## Taches à faire impérativement

 - [1 - Lucile] commenter (de préférence en anglais) chaque ligne du fichier main.js
 - [2 - Maxime] Afficher un histogramme des priorités (Ajouter une colonne sur la première ligne, ensuite c'est 1 ligne de javascript...)
 - [3 - FAIT - Damien] Afficher un histogramme du temps des taches. Pour cela modifier la fonction `bar_chart` car l'échelle en X devra etre linéaire !
 - [4 - Roman] Afficher quelque-part dans la page des statistiques globales:
   - Temps total de toutes les taches
   - Temps total des taches de Joe
   - Temps total des taches en cours
 - [5 - Roman] Changer les couleurs des graphiques à partir d'une liste définie par vos soins
 - [6 - Roman] Changer l'organisation de la page pour que les graphiques soit plus gros (2 barchart par ligne, 1 treemap par ligne)
 - [7 - Lucile] Afficher une treemap avec une décomposition par personne (couleur) puis par priorité (Treemap who). Afficher la légende associée.
 - [8 - Guillaume] Compléter la barre de navigation en mettant des boutons pour accéder aux différentes lignes
 - [9 - Damien] Changer avec du CSS le style des axes des graphiques
 - [10 - Guillaume] Ajouter un (joli) footer
 - [11 - Maxime] Ajouter des transitions animées


## Taches avancées
 - [A - Damien/Lucile] Implémenter le bouton "Only Joe" (recharge les graphiques avec les taches de Joe uniquement)
 - [B - Damien/Lucile] Implémenter le bouton "Only Done" (recharge les graphiques avec les taches DONE uniquement)
 - [C - Damien/Lucile] Implémenter le bouton "All tasks" (recharge les graphiques avec toutes les taches)
 - [E - Damien/Lucile] Ajouter un bubble chart, avec le statut sur l'axe X, la priorité sur l'axe Y, la couleur en fonction de la personne et le diamètre en fonction du temps de la tache. Attention, il vous faudra randomizer un peu la position des taches (pour qu'elles ne soient pas toutes au meme endroit)