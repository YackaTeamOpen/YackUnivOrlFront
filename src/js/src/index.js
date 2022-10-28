// window.location.href = environment.web_manager_url + "/maintenance.html";
let possibleTexts = [
  "&laquo;Moi, ma voiture,<br>elle supprime du CO2&raquo;",
  "Regardez autrement<br>votre voiture",
  "Votre voiture<br>a des super pouvoirs...",
  "&laquo;Ma voiture, elle crée de l&prime;espace en ville&raquo;",
];
let possibleImages = [
  "img/backgrounds/entonbleunoir4.png",
  "img/backgrounds/car_n_drops4.png",
  "img/backgrounds/sp_car.png",
  "img/backgrounds/disparition2.png",
];
let floatingCardTitles = [
  "Yacka, c&prime;est quoi&nbsp;?",
  "Partagez le coût de vos trajets",
  "Plus de mobilité en milieu rural",
  "Plus de fluidité en ville",
  "Covoiturer&nbsp;? Yes we can&nbsp;!",
  "500 000 km partagés d&prime;ici 3 ans",
];
let floatingCardTexts = [
  "Un service en ligne qui vous permet de partager des trajets en Centre-Val de Loire, avec la régularité qui vous convient.",
  "Les déplacements du quotidien plombent votre budget ? D&prime;autres pensent comme vous et vont au même endroit...",
  "Si, si, il y a des transports en commun à la campagne. Parfois c&prime;est même vous le chauffeur !",
  "Qui n&prime;a pas jamais rongé son volant dans les bouchons ou tourné comme une mouche autour d&prime;un parking ?",
  "Les petits ruisseaux font les grandes rivières, et Yacka s'efforce de vous faciliter les choses...",
  "C&prime;est <u>LE</u> geste efficace pour le climat. Ensemble, à l&prime;échelle de la région, on devrait y arriver, non ?",
];
let floatingCardLinks = [
  "Découvrir les atouts de Yacka",
  "Faire des économies avec Yacka",
  "On inventerait un truc, l&prime;auto-stop...",
  "Moins de voitures en ville, beaucoup d'avantages...",
  "&laquo;&prime;Peux pas, j&prime;ai piscine&raquo;. Ben justement !",
  "Contribuer à l&prime;objecif régional",
];
let floatingCardImages = [
  "img/backgrounds/cropsfromyackapp3.png",
  "img/backgrounds/car_n_coins2.png",
  "img/backgrounds/countryside_cover.png",
  "img/backgrounds/caraftervanish.png",
  "img/backgrounds/sleevesup6.png",
  "img/backgrounds/cropsfromyackapp6.png",
];
let floatingCardDetails = [
  "Yacka, c'est un service&ast; de mise en relation entre passagers et conducteurs souhaitant partager des trajets, \
  de façon régulière (un ou plusieurs jours dans la semaine, et ce, chaque semaine ou seulement toutes les 2, 3, \
  4... semaines).<br>\
  <p><b>Pour quel usage&nbsp;?</b></p>\
  Son utilisation est particulièrement destinée aux trajets domicile-travail, mais plus généralement aux déplacements \
  &laquo;du quotidien&raquo; qui se répètent (rendez-vous associatifs, sport hebdomadaire...) ainsi qu'aux événements collectifs&ast;&ast;.<br>\
  <p><b>Quelles sont les particularités de Yacka&nbsp;?</b></p>\
  Yacka a été créé afin de répondre aux exigences particulières du covoiturage régulier. Pour que celui-ci se développe, \
  il est nécessaire qu'un maximum de conducteurs(rices) acceptent de partager des trajets.<br>\
  Or si certain(e)s peuvent covoiturer tous les jours aux mêmes heures, d'autres ont des horaires qui changent toutes \
  les semaines, et tou(te)s souhaitent pouvoir gérer les imprévus. \
  Et malgré ces contraintes, il faut pouvoir donner confiance, et donc de la visibilité, à la personne avec laquelle \
  on covoiture.<br>\
  La conception de Yacka a pris en compte ces particularités, afin d'ouvrir le covoiturage au plus grand nombre.<br>\
  <p><b>Pourquoi uniquement en Centre-Val de Loire&nbsp;?</b></p>\
  - Pour remédier au manque de solutions de mobilité qui touche certaines personnes ou certains territoires de notre région.<br>\
  - Pour être en mesure d'écouter localement les besoins des covoitureurs et d'adapter Yacka à ces besoins.<br>\
  - Parce qu'en matière climatique, il est plus facile de se mobiliser pour un objectif de taille régionale qu'au niveau national ou mondial.<br>\
  <br>\
  <i>&ast;made in Centre-Val de Loire</i><br>\
  <i>&ast;&ast;Le covoiturage événementiel grâce à Yacka, c'est pour très bientôt&nbsp;!</i>",

  "L'utilisation d'une voiture au quotidien revient cher, toujours plus cher. L'idéal serait de vous déplacer à pied, \
  à vélo ou en trottinette, bien sûr. Mais si vous devez utiliser votre voiture, alors en partager l'usage reste \
  la meilleure solution pour en partager le coût, notamment sur des trajets longs ou répétés.<br>\
  <p><b>Le choix entre plusieurs tarifs</b></p>\
  En tant que conducteur, lorsque vous proposez de partager un trajet sur Yacka, il vous est possible de choisir entre 3 \
  tarifs de compensation financière&nbsp;: 0,10€/km&ast;, 0,05€/km&ast; ou la gratuité. Ainsi le passager qui prend connaissance \
  de votre proposition sait à quoi s'attendre, et vous pouvez toujours convenir de modalités différentes via les \
  messages Yacka.\
  <p><b>Parfois conducteur, parfois passager</b></p>\
  L'autre façon de faire des économies, c'est d'alterner entre le rôle de conducteur et celui de passager. D'ordinaire vous conduisez&nbsp;? \
  Passager, cela vous coûtera bien moins cher. Certes, vous &laquo;sacrifierez&raquo; ponctuellement la liberté \
  que vous donne votre voiture (est-elle si grande, d'ailleurs&ast;&ast;&nbsp;?). Mais, par ce geste, vous trouverez d'autres libertés&ast;&ast;&nbsp;, \
  dont celle d'avoir trouvé un nouveau moyen pour vous déplacer, bien utile au cas où, pour toutes sortes de raisons \
  (réparation, empêchement physique) vous ne pourriez pas utiliser votre voiture...<br>\
  <br>\
  Un ou plusieurs trajets partagés par semaine, ou simplement de temps en temps, et vous trouverez au bout du compte que le \
  covoiturage, en plus d'être sympa et bon pour la planète, c'est excellent pour votre porte-monnaie&nbsp!<br>\
  <br>\
  <i>&ast;La version actuelle de Yacka ne gère pas le transfert d'argent entre le passager et le conducteur, qui doivent \
  donc s'arranger entre eux pour les versements. Dans une future version, le passager pourra alimenter un compte qui sera débité à mesure \
  des trajets effectués, ce qui facilitera le transfert des petites sommes régulières.</i><br>\
  <i>&ast;&ast;Voir plus loin &laquo;<span class='inside-details-link clickable' onclick='displayCardDetails(4)'>Plus de fuidité en ville</span>&raquo;.</i><br>",

  "Que diriez-vous d'un mode de transport en commun disponible partout où il y a des voitures - y compris dans les endroits les plus isolés&nbsp;- \
  et disponible aux heures où les gens se déplacent (c'est à dire, en gros, quand on en a besoin)&nbsp;? Ce mode de déplacement, qui de plus \
  ne nécessite quasiment pas d'investissement supplémentaire (il faut quand même entretenir les routes&nbsp;!) ressemble \
  au transport en commun idéal, non&nbsp;?<br>\
  Un genre d'auto-stop, mais organisé, et suffisamment généralisé pour qu'on puisse compter dessus à tout moment...<br>\
  Ce graal, il ne tient qu'à nous de le faire surgir des sables de la Loire, de l'argile de Sologne ou du calcaire de Beauce. \
  En partageant des trajets dans la mesure de nos possibilités, à chaque fois que c'est possible&ast;, pour que le covoiturage du quotidien devienne \
  un service fiable, parce que reposant sur un nombre significatif de partages.\
  <p><b>Desservir les zones rurales</b></p>\
  Notre région compte un nombre important de zones rurales, dont nous apprécions le charme mais qui sont souvent menacées \
  par la désertification : peu de moyens de transport, c'est peu de possibilités de se rendre au travail et, pour les activités économiques, \
  l'impossibilité de recruter ou de faire venir des clients, donc de se maintenir. C'est moins de possibilités d'emmener les \
  enfants à l'école, c'est moins de vie... \
  Partager des trajets depuis ou vers ces territoires, c'est contribuer à redonner la circulation nécessaire à leur \
  activité, pour que chacun, habitant ou visiteur, y vive mieux.<br>\
  <p><b>Aider ceux qui n'ont pas de voiture ou pas de permis</b></p>\
  Non, tout le monde n'a pas de voiture. Y compris en dehors des grandes villes, où l'offre de transports en commun compense. \
  Dans notre région, entre 10 et 15% des ménages n'ont pas de véhicule. Pour de multiples raisons : pas les moyens, pas ou plus le permis... \
  Or on sait combien la mobilité est essentielle pour (re)trouver un travail, et pour les déplacements liés à la santé ou l'alimentation. \
  Partager des trajets, c'est aussi aider ceux qui n'ont pas le déplacement facile, ou leur remettre le pied à l'étrier&nbsp;!<br><br>\
  <i>&ast;Voir plus loin &laquo;<span class='inside-details-link clickable' onclick='displayCardDetails(5)'>Covoiturer&nbsp;? Yes we can&nbsp;!</span>&raquo;.</i><br>",

  "Nos villes n'ont pas été prévues pour absorber toutes les voitures qu'elles accueillent aujourd'hui. Et les aménagements qui ont été réalisés pour mieux les \
  accueillir n'ont pas forcément amélioré les choses&nbsp;: les études d'urbanisme montrent depuis 50 ans que plus on donne de place aux voitures, \
  plus elles en occupent.<br>\
  Cette place occupée par les voitures en ville est d'autant plus problématique que les collectivités cherchent à favoriser les déplacements doux \
  (vélo, marche...) et les transports en commun, susceptibles à la fois de multiplier les possibilités de se déplacer individuellement ET de limiter \
  les désagréments liés à la pollution et aux fortes chaleurs, de plus en plus fréquentes. Et l'espace requis pour les pistes cyclables ou les couloirs de bus, il faut bien le trouver quelque part... \
  <p><b>Diminuer le nombre de voitures en ville d'1/3&nbsp;?</b></p>\
  En milieu urbain, on compte très rarement plus d'une personne par véhicule (106 personnes pour 100 voitures en moyenne&nbsp!), ce qui explique qu'aux heures de pointe, \
  autant de voitures se trouvent aux mêmes endroits, allant dans des directions communes. \
  Si on augmente significativement les trajets partagés et que sur ces 106 personnes, 33 en moyenne covoiturent chaque jour, alors seulement 66 véhicules seront nécessaires, \
  et on aura réduit leur nombre d'un tiers.<br>\
  Imaginons l'impact qu'aurait une telle réduction pour nos villes, et surtout pour le confort de chacun&nbsp;: une circulation plus fluide bien sûr, moins de temps perdu, \
  moins de difficultés à se garer, plus d'espace pour les piétons, les vélos, les terrasses, les espaces verts, moins de pollution et d'air irrespirable en été, moins de bruit... \
  <p><b>Les centres-bourg ruraux aussi concernés</b></p>\
  Si l'espace pris par les voitures est un problème en ville, il l'est également pour certains bourgs ruraux, dont la trame historique ancienne, composée \
  de ruelles et de placettes, commence à &laquo;déborder&raquo;, posant problème à la fois aux résidants et aux activités. Là encore, le partage de trajets sous une forme régulière peut apporter une réelle solution puisqu'il peut inciter \
  à diminuer, à moyen ou long terme, le nombre de véhicules par foyer.",

  "Covoiturer au quotidien est plus contraignant que de covoiturer ponctuellement lors d'un Chartres-Paris ou d'un Blois-Clermont-Ferrand, bien sûr. \
  Parce qu'on s'engage sur une certaine durée, parce qu'on s'oblige à ne pas déroger aux horaires convenus à \
  l'avance, parce qu'on pense qu'on ne pourra pas s'arrêter prendre du pain à la boulangerie, etc. Petit tour d'horizon des \
  freins qui peuvent nous faire penser que partager des trajets régulièrement, ce n'est pas pour nous&nbsp;:<br>\
  <p><b>Si quelqu'un covoiture avec moi pour se rendre au travail, c'est tous les jours, non&nbsp;?</b></p>\
  Pas forcément&nbsp! Certes, le besoin de votre covoitureur(se) est quotidien (encore que, le télétravail se développant, ce besoin peut diminuer). \
  Mais rien ne vous oblige à covoiturer tous les jours. \
  Faites-le lorsque ça vous est possible, lorsque ça ne vous est pas trop contraignant, ou pas trop pesant. En revanche, tenez votre engagement et \
  donnez de la visibilité à votre covoitureur(se), pour qu'il(elle) puisse s'organiser à l'avance.<br>\
  Vous pouvez ne covoiturer que 3 jours, ou même 1 seul jour dans la semaine, c'est déjà ça. Si beaucoup de personnes partagent au moins \
  un, deux ou trois trajets par semaine, globalement nous arriverons déjà à un impact considérable.<br>\
  L'interface de Yacka permet justement d'adapter les propositions ou les demandes de trajets aux contraintes de chacun&nbsp;: vous \
  pouvez indiquer, pour chaque trajet partagé, les jours de la semaine concernés, la période sur laquelle court ce partage, les jours pendant cette période \
  où exceptionnellement vous ne pouvez pas (congés, déplacement...).<br>\
  <p><b>Si je partage l'aller, je dois partager le retour&nbsp;?</b></p>\
  Si vous pouvez, c'est mieux :) Mais pas forcément (voir point suivant)... Evidemment, votre covoitureur(se) n'acceptera de partager l'aller que s'il(elle) a \
  trouvé un partage pour le retour. Mais si vous n'avez proposé que l'aller, le retour se fera avec quelqu'un d'autre, qu'il(elle) aura trouvé parmi les \
  autres propositions disponibles sur Yacka.<br>\
  <p><b>Je sais très bien à quelle heure je pars au travail, mais je ne sais jamais à quelle heure j'en sors...</b></p>\
  Eh bien, ne partagez que l'aller&nbsp! Et essayez de le partager le plus souvent possible, ce sera déjà ça. Beaucoup de gens savent, eux, à quelle heure ils sortent du travail, et \
  pourront rendre service à votre covoitureur(se) du matin, en le(la) ramenant.<br>\
  Et puis, vous qui n'avez pas d'horaires le soir, vous seriez peut-être content(e), un soir dans la semaine, contraint(e) par un engagement de \
  coiturage, de rentrer tôt et de profiter de votre soirée, un peu comme lorsque vous devez aller à la piscine (en covoiturant, bien sûr :)).<br>\
  <p><b>Je travaille en équipe, mes horaires changent toutes les semaines ou toutes les 2 semaines</b></p>\
  Ce cas est prévu par l'interface de Yacka. Vous pouvez par exemple proposer un partage à certains horaires toutes les 2 semaines, et un autre, à des heures différentes, \
  toutes les 2 semaines aussi, en décalé.<br>\
  Le covoiturage du quotidien est d'autant plus utile aux personnes travaillant en équipe qu'il concerne des horaires où les transports en commun ne fonctionnent pas toujours.<br>\
  <p><b>Qu'arrive-t-il si mon(ma) conducteur(rice) du retour a un empêchement&nbsp;?</b></p>\
  1ère solution&nbsp;: vous parvenez à trouver rapidement, parmi les propositions disponibles sur Yacka, un trajet partagé pour le retour, et tout va bien.<br>\
  2ème solution&nbsp;: vous parvenez à vous arranger avec vos proches ou vos collègues pour rentrer.<br>\
  3ème solution&nbsp;: le taxi... Yacka recherche actuellement des solutions pour la mise en place d'une &laquo;garantie retour&raquo; spécifique pour ses covoitureurs, permettant de rentrer \
  à moindre coût dans ce type de situation. Nous vous tiendrons informé(e)s des avancées sur ce point.<br>\
  <p><b>Qu'arrive-t-il si je dois rentrer en urgence chez moi&nbsp;?</b></p>\
  Situation assez similaire au point précédent, avec des solutions pour l'instant identiques.",

  "Pour commencer&nbsp!<br>\
  500 000 km covoiturés, cela représente une économie d'environ 96 tonnes d'émission CO2 (source ADEME). C'est très peu en comparaison des 20 millions de tonnes émises globalement \
  chaque année en Centre-Val de Loire, mais c'est un bon début. Et surtout ça permet de se fixer un objectif et de l'améliorer progressivement.<br>\
  <p><b>500&nbsp;000 km&nbsp? Wouah, c'est beaucoup...</b></p>\
  Euh, non. 500 000 km d'ici trois ans, ça ne représente que 3200 km par semaine, ou un peu moins de 450 km par jour.<br>\
  450 km covoiturés par jour en Centre-Val de Loire&nbsp;??? C'est 7 allers Orléans-Blois, ou 12 allers Vierzon-Bourges, ou encore 12 Loches-Tours. C'est ridiculement faible, n'est-ce pas&nbsp;?<br>\
  <br>\
  Ok, alors puisque c'est si peu, faisons-le&nbsp! Et on verra alors qu'on peut aller bien plus loin, et agir massivement pour atteindre nos objectifs de préservation du climat&nbsp;!<br>\
  <br>\
  Aujourd'hui, Yacka mesure uniquement les distances sur lesquelles vous vous entendez pour covoiturer, et ne mesure pas encore les distances que vous avez <u>effectivement</u> partagées. \
  Dans une future version, ce sera possible, rendant plus précis la mesure de l'impact, en réductions d'émission, de votre effort.",
];

document.addEventListener("DOMContentLoaded", function(event) {
  let bannerTextElem = document.querySelector("#banner-text");
  let yackaCarElem = document.querySelector("#yackar");
  let randomIndex = Math.floor(Math.random() * possibleTexts.length);
  bannerTextElem.innerHTML = possibleTexts[randomIndex];
  yackaCarElem.setAttribute("src", possibleImages[randomIndex]);

  let floatingCardElemList = document.querySelectorAll(".floating-card");
  floatingCardElemList.forEach(function(card) {
    let index = parseInt(card.id.substring(9), 10) - 1;
    card.querySelectorAll(".card-title").forEach((tag) => {tag.innerHTML = floatingCardTitles[index]});
    card.querySelectorAll(".card-text").forEach((tag) => {tag.innerHTML = floatingCardTexts[index]});
    card.querySelectorAll(".card-link").forEach((tag) => {tag.innerHTML = floatingCardLinks[index]});
    card.querySelectorAll(".card-link").forEach((tag) => {tag.setAttribute("onClick", "displayCardDetails(" + (index + 1) + ")")});
    card.querySelectorAll("img").forEach((tag) => {tag.setAttribute("src", floatingCardImages[index])});
    card.querySelectorAll(".close-span").forEach((tag) =>{tag.addEventListener("click", function(e) {hideDetails(card);})});
    card.querySelector(".card-details-contents").innerHTML = "";
    card.querySelector(".card-details").addEventListener("transitionend", function(e) {
      if (e.propertyName == "max-height") {
        scrollToCard(card);
      };
    });
  })

  let fabBtnElem = document.querySelector('#banner-fab-btn');
  fabBtnElem.querySelector('.btn-main').addEventListener("click", function(e) {
    fabBtnElem.classList.toggle("active");
  });
  $("#howto-page-passenger-btn").on("click", function () {
    window.location.href = "howto.html?role=passenger";
  });
  $("#howto-page-driver-btn").on("click", function () {
    window.location.href = "howto.html?role=driver";
  });

  let contactFormElem = document.querySelector("#contact form");
  let validBtnElem = contactFormElem.querySelector('#valid');
  validBtnElem.addEventListener("click", function(e) {
    e.preventDefault();
    let me = e.currentTarget;
    me.setAttribute("disabled", "diasabled");
    let name = contactFormElem.querySelector('input[name=name]').value;
    let email = contactFormElem.querySelector('input[name=email]').value.trim();
    let content = contactFormElem.querySelector('textarea[name=content]').value;
    let formData = {
      "name" : name,
      "email" : email,
      "content" : content
    };
    const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Object.values(formData).includes("")) {
      toastr.error("Vous devez remplir tous les champs du message", "Oups !");
      me.removeAttribute("disabled", "diasabled");
    } else if (regEmail.test(email)) {
      sendRequestToAPI('POST', "/contact", formData, function(response) {
        if (response.status == 200){
          toastr.success("Merci ! Votre message a bien été envoyé.");
          contactFormElem.querySelector('input[name=name]').value = "";
          contactFormElem.querySelector('input[name=email]').value = "";
          contactFormElem.querySelector('textarea[name=content]').value = "";
          setTimeout(() => {
            me.removeAttribute("disabled", "diasabled");
          }, 2000);

        } else {
          toastr.error("Une erreur est survenue", "Oups !");
          me.removeAttribute("disabled", "diasabled");
        };
      });
    } else {
      toastr.error("Le courriel indiqué n'est pas valide", "Oups !");
      me.removeAttribute("disabled", "diasabled");
    }
  });
});


function displayCardDetails(cardId) {
  let floatingCardArea = document.querySelector(".floating-area");
  floatingCardArea.querySelectorAll(".floating-card").forEach((floatingCard) => {
    if ((floatingCard.id != ("floating-" + cardId.toString())) && (
      floatingCard.querySelector(".card-details").classList.contains("opaque"))) {
      hideDetails(floatingCard, false);
    };
  });
  let cardElem = floatingCardArea.querySelector("#floating-" + cardId.toString());
  showDetails(cardElem, cardId - 1);
}


function showDetails(cardElem, textIndex, needToScroll = true) {
  let cardDetailsElem = cardElem.querySelector(".card-details");
  let textPaneElem = cardElem.querySelector(".text-pane-mobile");
  let blackLayerElem = cardElem.querySelector(".black-layer");
  cardElem.querySelectorAll(".card-details-contents").forEach((tag) => {tag.innerHTML = floatingCardDetails[textIndex]});
  if (needToScroll) {
    cardDetailsElem.classList.add("to-scroll");
  };
  cardDetailsElem.classList.add("opaque");
  textPaneElem.classList.add("deepened");
  blackLayerElem.classList.add("suspended");
}


function hideDetails(cardElem, needToScroll = true) {
  let cardDetailsElem = cardElem.querySelector(".card-details");
  let textPaneElem = cardElem.querySelector(".text-pane-mobile");
  let blackLayerElem = cardElem.querySelector(".black-layer");
  if (needToScroll) {
    cardDetailsElem.classList.add("to-scroll");
  };
  cardDetailsElem.classList.remove("opaque");
  textPaneElem.classList.remove("deepened");
  blackLayerElem.classList.remove("suspended");
}


function scrollToCard(cardElem) {
  let cardDetailsElem = cardElem.querySelector(".card-details");
  if (!cardDetailsElem.classList.contains("opaque")) {
    cardDetailsElem.querySelector(".card-details-contents").innerHTML = "";
  }
  if (cardDetailsElem.classList.contains("to-scroll")) {
    cardElem.scrollIntoView({block: 'start', behavior: 'smooth'});
    cardDetailsElem.classList.remove("to-scroll");
  };
}
