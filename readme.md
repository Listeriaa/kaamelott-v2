# Quizz Kaamelott V2

**Connaissez-vous bien Kaamelott? Relevez le challenge en vous mesurant aux répliques les plus cultes de la série et devinez qui en est l'auteur!**

Après une première version très basique, je retravaille ce projet avec consommation d'une API publique pour stocker les questions en base de données.
Les questions seront ensuite récupérées de manière random en front, afin d'avoir un quizz différent à chaque rechargement.


## Technologies

- back avec Lumen avec sa façade Eloquent,
- front avec Javascript,
- Consommation de l'API (https://github.com/sin0light/api-kaamelott/),
- base de données en MySQL 

## Progression

**en cours**

- La prochaine étape sera de créer une table pivot dans la base de données, qui gérera l'envoi des mauvaises réponses.