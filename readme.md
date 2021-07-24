# Quizz Kaamelott V2

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

**Connaissez-vous bien Kaamelott? Relevez le challenge en vous mesurant aux répliques les plus cultes de la série et devinez qui en est l'auteur!**

Visible en ligne ici (https://kaamelott.laetitia-dev.com) 

Après une première version très basique, je retravaille ce projet avec consommation d'une API publique pour stocker les questions en base de données.

Les questions seront ensuite récupérées de manière random en front, afin d'avoir un quizz différent à chaque rechargement.

A terme, j'aimerais avoir un fichier son de la réplique qui puisse etre joué après la soumission de la réponse.

## Technologies

- back avec Lumen avec sa façade Eloquent,
- front avec Javascript,
- Consommation de l'API (https://github.com/sin0light/api-kaamelott/) pour créer ma propre base de données avec les datas spécifiques.
- base de données en MySQL (relation oneToMany)
- API rest
  
## Progression

**Réalisés**

- La base de données a été faite, 
- les méthode/route pour récupérer une citation random avec 1 bonne réponse et 2 mauvaises réponses ont été faites.
- fetch effectif,
- manipulation du DOM OK.
- Mise en ligne OK.
- Juillet : J'ai retravaillé l'affichage des réponses à chaque soumission de réponse.
- Juillet : J'ai amélioré le random des propositions de réponses car je n'étais pas satisfaite de ma première solution.

**A faire**

- Ajout des photos des personnages.
- Récupération des fichiers sons correspondant aux citations.

## A améliorer

Il faut que je commit plus souvent :/
