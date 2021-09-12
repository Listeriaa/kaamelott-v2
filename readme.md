# Quizz Kaamelott V2

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)  [![forthebadge](http://forthebadge.com/images/badges/powered-by-electricity.svg)](http://forthebadge.com)

**Connaissez-vous bien Kaamelott? Relevez le challenge en vous mesurant aux répliques les plus cultes de la série et devinez qui en est l'auteur!**

Visible en ligne ici (https://kaamelott.laetitia-dev.com) 

Après une première version très basique, je retravaille ce projet avec consommation d'une API publique pour stocker les questions en base de données.

Les questions seront ensuite récupérées de manière random en front, afin d'avoir un quizz différent à chaque rechargement.

A terme, j'aimerais avoir un fichier son de la réplique qui puisse etre joué après la soumission de la réponse.

## Technologies

[![forthebadge](https://img.shields.io/badge/Lumen-000000?style=for-the-badge&logo=lumen&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)](http://forthebadge.com)
[![forthebadge](https://img.shields.io/badge/Insomnia-5849be?style=for-the-badge&logo=Insomnia&logoColor=white)](http://forthebadge.com)

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
