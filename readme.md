# Quizz Kaamelott V2

**Connaissez-vous bien Kaamelott? Relevez le challenge en vous mesurant aux répliques les plus cultes de la série et devinez qui en est l'auteur!**

Après une première version très basique, je retravaille ce projet avec consommation d'une API publique pour stocker les questions en base de données.

Les questions seront ensuite récupérées de manière random en front, afin d'avoir un quizz différent à chaque rechargement.

A terme, j'aimerais avoir un fichier son de la réplique qui puisse etre joué après la soumission de la réponse.

## Technologies

- back avec Lumen avec sa façade Eloquent,
- front avec Javascript,
- Consommation de l'API (https://github.com/sin0light/api-kaamelott/) pour créer ma propre base de données avec les datas spécifiques.
- base de données en MySQL (relation oneToMany)


## Progression

**Réalisés**
- La base de données a été faite, 
- les méthode/route pour récupérer une citation random avec 1 bonne réponse et 2 mauvaises réponses ont été faites.

**en cours**

- Travail sur le front à faire :
  - gestion de la transmission des questions au front,
  - gestion de l'affichage des blocs questions.

**A faire**

- Récupération des fichiers sons correspondant aux citations.