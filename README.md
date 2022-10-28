# YackUnivOrlFront

Comment utiliser ce repo :

Ce repo vous permet de constituer l'environnement de développement où vous pourrez ajouter des fonctionnalités au frontend de Yacka. C'est une version réduite du frontend réel, limitée aux fonctionnalités nécessaires sur lesquelles appuyer votre travail.

Comme indiqué précédemment, ce repo n'utilise pas de framework particulier. Il est codé directement en html, javascript et css. Il nécessite d'installer sur votre machine locale node.js et les différents modules mentionnés dans le fichier package.json.
  
Pour utiliser le repo il vous faudra le clôner sur votre machine locale avec git, puis créer une ou plusieurs branches locales dans lesquelles vous développerez vos fonctionnalités (process classique git) :
  
  ```shell
  $ git clone git@github.com:YackaTeamOpen/YackUnivOrlFront.git
  $ git checkout -b nom-de-la-nouvelle-branche
  $ cd YackUnivOrlFront
  ```
 
Une fois le repo clôné et depuis votre nouvelle branche, il vous faudra, sur votre machine locale, installer les différents modules nécessaires :
  
  ```shell
  $ sudo npm install -g npm-run-all clean-css cross-env css-minify clean-css-cli
  $ npm install
  ```
Ensuite, la commande suivante lancera à la fois sur votre machine le serveur front (qui écoute sur le port localhost:3000) et ouvrira dans votre navigateur un onglet qui se connectera à ce serveur :
  
  ```shell
  $ npm run serve
  ```
A chaque fois que vous effectuerez des changements dans le code du frontend, l'utilitaire browsersync (aussi lancé par la commande ci-dessus) rafraîchira l'apparence de la fenêtre du naivageur.

L'arborescence du repo est organisée de telle manière que :

  - les fichiers sources html sont dans le répertoire src et dans d'éventuels sous-répertoires si ces sources concernent une thématique ou une fonctionnalité particulière (companies, users,...). Ce peut donc être le cas des fonctionnalités que vous développerez;
  - les fichiers sources css sont dans le répertoire src/css et dans d'éventuels sous-répertoires de celui-ci si ces sources concernent une thématique ou une fonctionnalité particulière - même remarque qu'au point précédent;
  - les fichiers sources js sont dans le répertoire src/js/src (attention : pas src/js !) et dans d'éventuels sous-répertoires de celui-ci si ces sources concernent une thématique ou une fonctionnalité particulière. le répertoire src/js accueillera lui les sources compilées. Même remarque qu'aux points précédents.

Si vous devez ajouter des modules externes pour vos fonctionnalités, installez-les avec l'option npm install --save (ou --save-dev si elles ne servent qu'au développement) afin qu'elles soient prises en compte dans le package.json et installées par les copains quand ils auront intégré vos modifs après un git pull de vos modifs.

Bon code !
