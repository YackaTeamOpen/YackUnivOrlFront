
let welcomeMessages = {
  "passenger" : "Quelques infos pour les passagers de Yacka...<br>(<i>voir pour les <span id='change-link' class='clickable' onclick='tutoChange(\"howto.html?role=driver\")'>conducteurs</span></i>)",
  "driver": "Quelques infos pour les conducteurs de Yacka...<br>(<i>voir pour les <span id='change-link' class='clickable' onclick='tutoChange(\"howto.html?role=passenger\")'>passagers</span></i>)"
}

let hintMessages = {
  "unauthorized" : "&#9757; Vous devrez vous connecter ou vous inscrire pour pouvoir utiliser cette application",
  "obMissing": "&#9757; Vous devez encore renseigner certaines données avant de pouvoir créer un trajet",
  "allOk": ""
}

let redirectLinks = {
  "passenger" : {
    "unauthorized" : "/login.html?returnUrl=/users/new_trip.html?role=passenger",
    "obMissing": "/users/onboard2.html?returnUrl=/users/new_trip.html?role=passenger",
    "allOk": "/users/new_trip.html?role=passenger"
  },
  "driver" : {
    "unauthorized" : "/login.html?returnUrl=/users/new_trip.html?role=driver",
    "obMissing": "/users/onboard2.html?returnUrl=/users/new_trip.html?role=driver",
    "allOk": "/users/new_trip.html?role=driver"
  }
}

let redirectDivClasses = {
  "unauthorized" : "unauthorized",
  "obMissing": "ob-missing",
  "allOk": "all-ok"
}

document.addEventListener("DOMContentLoaded", function(event) {
  let searchParams = new URLSearchParams(window.location.search);
  let role, login;
  if (searchParams.has('role')) {
    role = searchParams.get('role');
  } else {
    role = 'driver';
  };
  sendRequestToAPI(
    'GET',
    '/users/profile',
    null,
    (response) => {
      if (response.status == 200){
        startRender(role, "allOk", response.responseJSON);
      } else if (response.status == 401){
        startRender(role, "unauthorized", null);
      } else if (response.status == 403) {
        startRender(role, "obMissing", null);
      };
    }
  );
});

function startRender(role, profileState, userData) {
  let welcomeMsgElemList = document.querySelectorAll(".tuto-welcome");
  welcomeMsgElemList.forEach((tag) => {
    tag.innerHTML = welcomeMessages[role];
  });
  let hintMsgElemList = document.querySelectorAll(".hint-message");
  hintMsgElemList.forEach((tag) => {
    tag.innerHTML = hintMessages[profileState];
  });
  let redirectDivElemList = document.querySelectorAll("." + redirectDivClasses[profileState]);
  redirectDivElemList.forEach((divElem) => {
    divElem.style.display = "inline-block";
    let fabBtnElemList = divElem.querySelectorAll('.btn-group-fab-index');
    if (fabBtnElemList != null) {
      fabBtnElemList.forEach((fabBtnElem) => {
        fabBtnElem.querySelector('.btn-main').addEventListener("click", function(e) {
          fabBtnElem.classList.toggle("active");
        });
        fabBtnElem.querySelector('.passenger').addEventListener("click", (e) => {
          window.location.href = redirectLinks["passenger"][profileState];
        });
        fabBtnElem.querySelector('.driver').addEventListener("click", (e) => {
          window.location.href = redirectLinks["driver"][profileState];
        });
      })
    };
    let anchorElemList = divElem.querySelectorAll('a');
    anchorElemList.forEach((tag) => {
      tag.setAttribute("href", redirectLinks[role][profileState]);
    });
  })

  // Définition des textes et images des cartes flottantes selon le role
  // définitions communes tout d'abord
  let floatingCardTitles = [
    "Etape 1 : le trajet",
    "Etape 2 : les options",
    "Etape 3 : votre agenda",
    "Modifier un trajet partagé",
    "Modifier vos paramètres",
    "Modifier votre profil utilisateur",
  ];
  let floatingCardTexts = [
    "",
    "",
    "C'est là où vous validez les demandes ou les propositions de covoiturage, là où sont listés l'ensemble des trajets partagés à venir, et les éventuels refus ou annulations.<br>\
    En bas à droite, le bouton vert vous permet de proposer ou de demander un nouveau trajet partagé.",
    "Vos propositions ou demandes de trajets partagés, accessibles par le bouton <img id='trips-btn' class='clickable' src='../img/icons/road2.svg' style='display: inline-block; background-color: var(--yacka-dark);' width='25' height='25' >, \
    peuvent être modifiées à tout moment.",
    "Accessible en cliquant sur le bouton de profil, vous pouvez retrouver la liste de vos adresses de covoiturage et celle des véhicules déjà utilisés.",
    "Toujours depuis le bouton de profil, vous pouvez consulter ou modifier vos informations personnelles.",
  ];
  let floatingCardImages = [
    "img/backgrounds/0.trip.png",
    "",
    "",
    "",
    "img/backgrounds/4.settings.png",
    "img/backgrounds/5.profile.png",
  ];
  // Définitions spécifiques ensuite
  if (role == 'driver') {
    floatingCardTexts[0] = "Renseignez l'adresse de départ (celle à partir de laquelle vous partagez votre véhicule) et d'arrivée (celle jusqu'à laquelle vous le partagez).";
    floatingCardTexts[1] = "Indiquez si votre trajet est récurrent ou ponctuel, votre heure de départ, le véhicule utilisé et la compensation financière que vous demandez.<br>\
      Pour un trajet récurrent, précisez les jours de la semaine où vous covoiturez, la période de disponibilité et d'éventuelles exceptions.";
    floatingCardImages[1] = "img/backgrounds/1.doptions.png";
    floatingCardImages[2] = "img/backgrounds/2.dagenda.png";
    floatingCardImages[3] = "img/backgrounds/3.dtrips_update.png";
  } else {
    floatingCardTexts[0] = "Renseignez l'adresse de départ (celle à partir de laquelle vous partagez votre véhicule) et d'arrivée (celle jusqu'à laquelle vous le partagez).<br>",
    floatingCardTexts[1] = "Indiquez si votre trajet est récurrent ou ponctuel, ainsi que votre heure de départ.<br>\
      Pour un trajet récurrent, précise les jours où vous souhaitez covoiturer, la période concernée par votre demande et d'éventuelles exceptions.",
    floatingCardImages[1] = "img/backgrounds/1.poptions.png";
    floatingCardImages[2] = "img/backgrounds/2.pagenda.png";
    floatingCardImages[3] = "img/backgrounds/3.ptrips_update.png";
  };
  // Affichage des titres, textes, liens et images des floating cards
  let floatingCardElemList = document.querySelectorAll(".floating-card");
  floatingCardElemList.forEach(function(card) {
    let index = parseInt(card.id.substring(9), 10) - 1;
    // console.log(index);
    card.querySelectorAll(".card-title").forEach((tag) => {tag.innerHTML = floatingCardTitles[index]});
    card.querySelectorAll(".card-text").forEach((tag) => {tag.innerHTML = floatingCardTexts[index]});
    card.querySelectorAll("img.replaceable").forEach((tag) => {tag.setAttribute("src", floatingCardImages[index])});
    card.querySelectorAll("img.replaceable").forEach((tag) => {tag.addEventListener("click", function(e) {hidePicture(card)})});
    card.querySelectorAll(".black-layer").forEach((tag) => {tag.setAttribute("onClick", "displayPicture(" + (index + 1) + ")")});
    card.querySelectorAll(".black-layer, .text-pane-mobile").forEach((tag) => {tag.setAttribute("onClick", "displayPicture(" + (index + 1) + ")")});
  })
}


function displayPicture(cardId) {
  // masque les éventuelless images montrées et affiche celle correspondant à cardId (small screens)
  let floatingCardArea = document.querySelector(".floating-area");
  // On masque d'abord toutes les images
  floatingCardArea.querySelectorAll(".floating-card").forEach((floatingCard) => {
    if ((floatingCard.id != ("floating-" + cardId.toString())) && (
      floatingCard.querySelector(".black-layer").classList.contains("suspended"))) {
      hidePicture(floatingCard);
    };
  });
  // Ensuite on affiche la carte relative à cardId
  let cardElem = floatingCardArea.querySelector("#floating-" + cardId.toString());
  showPicture(cardElem);
}


function showPicture(cardElem) {
  // Fait apparaître l'image derrière le texte en small screen
  let textPaneElem = cardElem.querySelector(".text-pane-mobile");
  let blackLayerElem = cardElem.querySelector(".black-layer");
  cardElem.querySelectorAll(".card-details-contents").forEach((tag) => {tag.innerHTML = floatingCardDetails[textIndex]});
  textPaneElem.classList.add("deepened");
  blackLayerElem.classList.add("suspended");
}


function hidePicture(cardElem) {
  // Masque l'image associée à cardElem
  let textPaneElem = cardElem.querySelector(".text-pane-mobile");
  let blackLayerElem = cardElem.querySelector(".black-layer");
  textPaneElem.classList.remove("deepened");
  blackLayerElem.classList.remove("suspended");
}


function tutoChange(link) {
  window.location.href = link;
}
