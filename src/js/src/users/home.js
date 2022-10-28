let no_data = true;
let agendaStartdate;

$(document).ready(function () {
  agendaStartdate = parseInt(Date.now() / 1000, 10);

  requestHome(
    function (data) {
      renderNotifMessageIcon(data.has_unread_message);
      //setOneSignalExternalUserId(data.user.id);
      requestAgenda(
        data.user,
        function (user, result) {
          renderAgenda(user, result.agenda);
        },
        function (result) {
          renderNothing();
        }
      );
      startRender(data);
    },
    "users",
    null
  );
});

function requestAgenda(user, callback, callback_no_result) {
  sendGetRequestToAPI(
    "/shared_trip/getshtlpu/agenda" + "?startdate=" + agendaStartdate,
    function (response) {
      if (response.status == 200) {
        callback(user, response.responseJSON);
      } else if (response.status == 204) {
        callback_no_result(user, response.responseJSON);
      } else if (response.status == 401) {
        logout(environment.web_manager_url + "/login.html");
      } else if (response.status == 500) {
        toastr.error("Une erreur est survenue");
      }
    }
  );
}

function startRender(data) {
  $("#hello-world").html(
    "<b>Bonjour " +
      data.user.surname +
      ' </b><img draggable="false" style="height:24px" alt="😀" src="https://s.w.org/images/core/emoji/11.2.0/svg/1f600.svg">'
  );
  $("#hello-world-msg").html(data.welcome_msg);
  $("#yacka-points-amount").html(data.user.current_points);
  if (data.user.photo) {
    $("#settings-btn").attr("src", data.user.photo);
  } else {
    $("#settings-btn").attr("src", "../img/avatars/default2.png");
  }
  $(".btn-group-fab").on("click", ".btn", function () {
    $(".btn-group-fab").toggleClass("active");
  });
  $("has-tooltip").tooltip();
  $("#go-to-search-page-btn").on("click", function () {
    return;
  });
  $("#go-to-new-trip-page-btn").on("click", function () {
    return;
  });
  $("#trips-btn").on("click", function () {
    window.location.href = "trips.html";
  });
  $("#settings-btn").on("click", function () {
    window.location.href = "menu.html";
  });
  $("#msg-btn").on("click", function () {
    window.location.href = "inbox.html";
  });
  $("#yacka-points-btn").on("click", function () {
    window.location.href = "buypoints.html";
  });
}

// function renderNotifMessageIcon(has_unread_message) {
//   if (has_unread_message) {
//     $("#msg-btn").attr("src", "../img/icons/msg-icon-notif.svg");
//   }
// }

let occNavNext = function (e) {
  let user = e.currentTarget.params.user;
  let agenda = e.currentTarget.params.agenda;
  renderOccurrenceCards(user, agenda, "next");
};
let occNavToTop = function (e) {
  window.scrollTo(0, 0);
};

function renderAgenda(user, agenda) {
  if (agenda.shared_trips.length == 0) {
    renderNothing();
  }
  let actCardsContainer = document.querySelector("#act-cards-container");
  actCardsContainer.innerHTML = "";
  let occCardsContainer = document.querySelector("#occ-cards-container");
  occCardsContainer.innerHTML = "";
  document
    .querySelector("#btm-occ-cards-next")
    .removeEventListener("click", occNavNext);
  document
    .querySelector("#btm-occ-cards-totop")
    .removeEventListener("click", occNavToTop);
  let nbOccurrences = agenda.agenda_indexes.length;
  let nbSharedTripsToValidate = 0;
  let nbStandBySharedTrips = 0;
  let nbRefusedSharedTrips = 0;
  let nbCanceledSharedTrips = 0;
  agenda.shared_trips.forEach(function (trip, index) {
    let state = getState(user, trip);
    if (state.message != "VALIDÉ" && trip.occ_when_list.length > 0) {
      let YackaDayCard = createYackaDayCard(user, trip, state, index);
      actCardsContainer.insertAdjacentHTML("beforeend", YackaDayCard);
      if (state.message == "A VALIDER") {
        nbSharedTripsToValidate += 1;
      } else if (state.message == "EN ATTENTE") {
        nbStandBySharedTrips += 1;
      } else if (state.message == "REFUSÉ") {
        nbRefusedSharedTrips += 1;
      } else if (state.message == "ANNULÉ") {
        nbCanceledSharedTrips += 1;
      }
    }
  });
  if (nbOccurrences > 0) {
    renderOccurrenceCards(user, agenda);
  }
  let bottomOccCardsNextButton = document.querySelector("#btm-occ-cards-next");
  let bottomOccCardstoTopButton = document.querySelector(
    "#btm-occ-cards-totop"
  );
  bottomOccCardsNextButton.params = { user: user, agenda: agenda };
  bottomOccCardstoTopButton.params = { user: user, agenda: agenda };
  bottomOccCardsNextButton.addEventListener("click", occNavNext);
  bottomOccCardstoTopButton.addEventListener("click", occNavToTop);
  actCardsContainer.querySelectorAll(".act-card").forEach(function (act_card) {
    let infoBannerNode = act_card.querySelector(
      ".card-info-banner .yacka-dark-border"
    );
    if (infoBannerNode && infoBannerNode.classList.contains("clickable")) {
      act_card
        .querySelector(".card-info-banner")
        .addEventListener("click", function (e) {
          act_card
            .querySelector(".toggle-chevron")
            .classList.toggle("fa-rotate-180");
          let state = act_card.querySelector(".state-message").textContent;
          let stage = act_card
            .querySelector(".state-message")
            .getAttribute("stage");
          displaySharedTripOptions(
            "act-card",
            act_card,
            act_card.id,
            user,
            agenda,
            state,
            stage
          );
        });
    }
    act_card
      .querySelector(".toggle-chevron")
      .addEventListener("click", function (e) {
        this.classList.toggle("fa-rotate-180");
        let state = act_card.querySelector(".state-message").textContent;
        let stage = act_card
          .querySelector(".state-message")
          .getAttribute("stage");
        displaySharedTripOptions(
          "act-card",
          act_card,
          act_card.id,
          user,
          agenda,
          state,
          stage
        );
      });
  });
  let helloWorldMsgNode = document.querySelector("#hello-world-msg");
  let agendaSummary = "";
  if (
    nbSharedTripsToValidate +
      nbStandBySharedTrips +
      nbRefusedSharedTrips +
      nbCanceledSharedTrips +
      nbOccurrences ==
    0
  ) {
    renderNothing();
    // agendaSummary = "Vous n'avez aucun trajet à venir";
  } else {
    let what = "";
    if (nbSharedTripsToValidate > 0) {
      what +=
        nbSharedTripsToValidate +
        " proposition" +
        (nbSharedTripsToValidate > 1 ? "s" : "") +
        " à valider";
    }
    if (nbStandBySharedTrips > 0) {
      what +=
        (what == "" ? "" : ", ") +
        nbStandBySharedTrips +
        (nbSharedTripsToValidate == 0
          ? " proposition" + (nbStandBySharedTrips > 1 ? "s" : "")
          : "") +
        " en attente";
    }
    if (nbRefusedSharedTrips > 0) {
      what += (what == "" ? "" : ", ") + nbRefusedSharedTrips + " refus";
    }
    if (nbCanceledSharedTrips > 0) {
      what +=
        (what == "" ? "" : ", ") +
        nbCanceledSharedTrips +
        " covoiturage" +
        (nbCanceledSharedTrips > 1 ? "s" : "") +
        " annulé" +
        (nbCanceledSharedTrips > 1 ? "s" : "");
    }
    if (nbOccurrences > 0) {
      what +=
        (what == "" ? "" : " et ") +
        nbOccurrences +
        " trajet" +
        (nbOccurrences > 1 ? "s" : "") +
        " partagé" +
        (nbOccurrences > 1 ? "s" : "") +
        " à venir";
    }
    agendaSummary = "Vous avez " + what;
  }
  helloWorldMsgNode.innerHTML = agendaSummary;
}

function renderOccurrenceCards(user, agenda, nextOrPrevious = null) {
  let nbOccurrences = agenda.agenda_indexes.length;
  let occCardsContainer = document.querySelector("#occ-cards-container");
  let nbOccToDisplay = 4;
  let firstNewWindowOccIndex;
  let lastNewWindowOccIndex;
  if (nextOrPrevious == null) {
    firstNewWindowOccIndex = 0;
    lastNewWindowOccIndex = Math.min(nbOccToDisplay, nbOccurrences) - 1;
  } else {
    let yackadayOccCardElementList =
      document.querySelectorAll(".yackaday-occ-card");
    firstNewWindowOccIndex = yackadayOccCardElementList.length;
    lastNewWindowOccIndex =
      Math.min(firstNewWindowOccIndex + nbOccToDisplay, nbOccurrences) - 1;
  }
  agenda.agenda_indexes.forEach(function (occurrence, index) {
    let trip = agenda.shared_trips[occurrence.index];
    let state = getState(user, trip);
    let date = occurrence.date;
    if (index >= firstNewWindowOccIndex && index <= lastNewWindowOccIndex) {
      let tempCardDiv = document.createElement("div");
      tempCardDiv.innerHTML = createYackaDayCard(
        user,
        trip,
        state,
        index,
        date
      ).trim();
      let YackaDayCardElement = tempCardDiv.firstElementChild;
      occCardsContainer.insertAdjacentElement("beforeend", YackaDayCardElement);
    }
  });
  let occCardElementList = occCardsContainer.querySelectorAll(".occ-card");
  let displayHook = occCardElementList[firstNewWindowOccIndex];
  let bottomOccCardsNavButtonsElement = document.querySelector(
    "#bottom-occ-cards-nav"
  );
  if (lastNewWindowOccIndex == nbOccurrences - 1) {
    bottomOccCardsNavButtonsElement
      .querySelector("#btm-occ-cards-next")
      .setAttribute("disabled", "");
  } else {
    bottomOccCardsNavButtonsElement
      .querySelector("#btm-occ-cards-next")
      .removeAttribute("disabled");
  }
  if (nbOccurrences > nbOccToDisplay) {
    bottomOccCardsNavButtonsElement.hidden = false;
  }
  Array.from(occCardElementList)
    .slice(firstNewWindowOccIndex, lastNewWindowOccIndex + 1)
    .forEach(function (occ_card) {
      occ_card
        .querySelector(".toggle-chevron")
        .addEventListener("click", function (e) {
          this.classList.toggle("fa-rotate-180");
          displaySharedTripOptions(
            "occ-card",
            occ_card,
            occ_card.id,
            user,
            agenda
          );
        });
    });
  if (nextOrPrevious == "next") {
    displayHook.scrollIntoView();
  }
}

function renderNothing() {
  let actCardsContainer = document.querySelector("#act-cards-container");
  actCardsContainer.innerHTML = "";
  let occCardsContainer = document.querySelector("#occ-cards-container");
  occCardsContainer.innerHTML = "";
  document
    .querySelector("#btm-occ-cards-next")
    .removeEventListener("click", occNavNext);
  document
    .querySelector("#btm-occ-cards-totop")
    .removeEventListener("click", occNavToTop);
  $("#hello-world-msg").html("Vous n'avez aucun trajet à venir");
  sendRequestToAPI("GET", "/users/tripcounts", null, function (response) {
    if (response.status == 200) {
      let tripCounts = response.responseJSON;
      if (tripCounts.trip_count == 0 && tripCounts.waiting_trip_count == 0) {
        $("#no-trip-card").css("display", "block");
      } else {
        $("#no-data-card").css("display", "block");
      }
    } else if (response.status == 401) {
      logout(environment.web_manager_url + "/login.html");
    } else {
      toastr.error("Une erreur est survenue");
    }
  });
}

function getState(user, trip) {
  let role = user.id == trip.trip_driver_id ? "driver" : "passenger";
  let tripOrWtripStatus;
  if (role == "driver") {
    tripOrWtripStatus = trip.driver_status;
  } else {
    let passenger_index = trip.passenger_id_list.indexOf(parseInt(user.id, 10));
    tripOrWtripStatus = trip.passenger_status_list[passenger_index];
  }
  return getStateInfo(role, tripOrWtripStatus);
}

function createYackaDayCard(user, trip, state, index, date = null) {
  let dateinfo_to_display = "";
  let is_driver = user.id == trip.trip_driver_id;
  let fromEvent = trip.event_occurrence_id == null ? false : true;
  let eventIconHtml = "";
  let nbAdditionalPass = 0, nbAdditionalPassHtml = "";
  let nbSeats = 0, nbSeatsHtml = "";
  if (fromEvent) {
    eventIconHtml =
      '<img class="mr-1" style="display:inline" src="../img/icons/event-2-dark.svg" width="25" height="25" >';
    if (is_driver) {
      nbAdditionalPass = trip.passenger_nb_pass_list[0] - 1;
      if (nbAdditionalPass > 0) {
        nbAdditionalPassHtml = " + " + nbAdditionalPass + (nbAdditionalPass > 1 ? "&nbsp;autres personnes" : "&nbsp;autre personne");
      }
    } else {
      nbSeats = trip.nb_seats;
      if (nbSeats > 1) {
        nbSeatsHtml = " (" + nbSeats + "&nbsp;places disponibles)";
      };
    };
  };
  let card_type = "";
  if (date == null) {
    if (trip.occ_when_list[0].occurrence_list.length < 2) {
      dateinfo_to_display = new Date(Date.parse(trip.occ_when_list[0].occurrence_list[0])).formatDateWymdYShort().replace(" ", "\xa0");
    } else {
      dateinfo_to_display =
        "Du " +
        new Date(Date.parse(trip.occ_when_list[0].occurrence_list[0])).formatDateWymdYShort().replace(" ", "\xa0") +
        " au " +
        new Date(
          Date.parse(
            trip.occ_when_list[0].occurrence_list[
              trip.occ_when_list[0].occurrence_list.length - 1
            ]
          )
        )
          .formatDateWymdYShort()
          .replace(" ", "\xa0");
    }
    card_type = "act-card"; // this will be a shared_trip action card
  } else {
    dateinfo_to_display = new Date(Date.parse(date))
      .formatDateWymdYShort()
      .replace(" ", "\xa0");
    card_type = "occ-card"; // this will be an occurrence card
  }
  let trip_detail = null;
  let score_display = "";
  let otherOccupant = null;
  let otherOccupantRole = "";
  let userDonut = null;
  let otherOccupantDonut = null;

  if (is_driver) {
    trip_detail = trip.occ_details_list[0];
    score_display =
      card_type == "act-card" ? " (" + trip.driver_score + "mn de détour)" : "";
    otherOccupant = trip.passenger_list[0];
    otherOccupantRole =
      nbAdditionalPass > 0
        ? "passagers"
        : otherOccupant.gender == "F"
        ? "passagère"
        : "passager";
    userDonut = "../img/icons/driver_icon.svg";
    otherOccupantDonut = "../img/icons/hep_icon.svg";
  } else {
    let passenger_index = null;
    passenger_index = trip.passenger_id_list.indexOf(parseInt(user.id, 10));
    trip_detail = trip.occ_details_list[passenger_index + 1];
    otherOccupant = trip.trip_driver;
    otherOccupantRole =
      otherOccupant.gender == "F" ? "conductrice" : "conducteur";
    userDonut = "../img/icons/hep_icon.svg";
    otherOccupantDonut = "../img/icons/driver_icon.svg";
  }
  let otherOccupantCommunities = otherOccupant.communities;
  let otherOccupantIntro = (is_driver && nbAdditionalPass > 0 ? "Vos " : "Votre ") +
    otherOccupantRole + " : " + otherOccupant.surname;
  if (is_driver) {
    otherOccupantIntro += nbAdditionalPassHtml;
  } else {
    otherOccupantIntro += nbSeatsHtml;
  };
  let otherOccupantPhoto = otherOccupant.photo ? otherOccupant.photo : "../img/avatars/default2.png";
  let speaking_pref = otherOccupant.speaking_pref.id;
  let smoking_pref = otherOccupant.smoking_pref.id;
  let music_pref = otherOccupant.music_pref.id;
  let yackaPoints = trip.yacka_points_list[0];
  let fee = 1 - trip.fr_info_list[0] / 2;

  let start_date = new Date(Date.parse(trip_detail.start_time));
  let arrival_date = new Date(Date.parse(trip_detail.arrival_time));
  let html = "";
  html +=
    "<div class='yackaday-card card yackaday-" + card_type + " shadow-sm'" + (date == null ? "" : " id='yackaday-occ-" + index + "'") +
    ">";
  html += " <div class='card-body closed " + card_type + "' id=" + index + ">";
  if (date == null && state.info != "") {
    html += "   <div class='row maskable card-info-banner'>";
    html += "     <div class='col'>";
    html += state.info;
    html += "     </div>";
    html += "   </div>";
  }
  html += "   <div class='row align-items-center card-header-display'>";
  html += "     <div class='col title-display d-flex align-items-center'>";
  html +=         eventIconHtml + "<h5 class='card-title' style='display:inline'><b>" + dateinfo_to_display + "</b>" + "<img class='donut-img' style='margin-right:0;' src='" + userDonut + "'/></h5>";
  html += "     </div>";
  html += "     <div class='col avatar-sidebar state-display pb-3 pl-0'>";
  if (state.message != "") {
    html += "      <span class='badge state-message yacka-badge-" + state.color + "' stage='" + state.stage + "'>" + state.message;
    html += "</span>";
    if (state.acknowledgement != "") {
      html += "      <button type='button' id='ack-button" + card_type + index + "' class='ack-button btn badge yacka-badge-dark'>" + state.acknowledgement + "</button>";
    }
    if (state.fastAction != "") {
      html += "      <button type='button' id='fast-act-button" + card_type + index + "' class='fast-act-button btn badge yacka-badge-dark'>" + state.fastAction + "</button>";
    }
  }

  html += "     </div>";
  html += "   </div>";
  html += "     <hr class='mt-0' style='border-top-width: 1px;'>";
  let yackaPointsToDisplay;
  if (fee != 0) {
    yackaPointsToDisplay = (Math.round(yackaPoints * 100) / 100).toString();
    if (!yackaPointsToDisplay.includes(".")) {
      yackaPointsToDisplay += ".00";
    }
    yackaPointsToDisplay = yackaPointsToDisplay.padEnd(10, "0");
    yackaPointsToDisplay = yackaPointsToDisplay.substring(
      0,
      yackaPointsToDisplay.indexOf(".") + 3
    );
    if (is_driver) {
      yackaPointsToDisplay = "+" + yackaPointsToDisplay + " €";
    } else {
      yackaPointsToDisplay = "-" + yackaPointsToDisplay + " €";
    }
  } else {
    yackaPointsToDisplay = "gratuit !";
  }
  html += "     <div class='row'>";
  html += "       <div class='col hour-sidebar'>";
  html += "         <p><b>" + start_date.format_hours() + "</b></p>";
  html += "       </div>";
  html += "       <div class='col pl-0'>";
  html += "         <div class='row'>";
  html += "           <div class='col-sm-5'>";
  html +=
    "             <p style='margin: 0;'>" +
    escapeHtml(
      trip.path[trip_detail.start_path_index].address.city.capitalize()
    ) +
    "</p>";
  html +=
    "             <p style='margin: 0; color: var(--yacka-dark-gray);'>" +
    escapeHtml(trip.path[trip_detail.start_path_index].address.street) +
    "</p>";
  html += "           </div>";
  html +=
    "           <div style='padding:0;' class='col-2 d-none d-xs-none d-sm-block d-md-block d-lg-block d-xl-block'>"; //only on med and large
  html += "             <span class='yacka-points-amount pl-1 pr-1 ";
  html += yackaPointsColorClass(is_driver, fee);
  html += "'>" + yackaPointsToDisplay;
  html += "</span>";
  // html +=               "<img id='yacka-points-btn' class='clickable pb-1' src='../img/icons/yacka_points_icon_dark.svg' width='30' height='20'/></span>";
  html += "             <i class='fa fa-chevron-right mr-1'></i><br>";
  html += "           </div>";
  html +=
    "           <div class='col-sm-2 d-xs-block d-sm-none d-md-none d-lg-none d-xl-none pr-0'>"; //only on small
  html +=
    "             <span style='font-size: 0.9em;' class='yacka-points-amount pl-1 pr-1 ";
  html += yackaPointsColorClass(is_driver, fee);
  html += "'>" + yackaPointsToDisplay;
  html += "</span>";
  // html +=               "<img id='yacka-points-btn' class='clickable pb-1' src='../img/icons/yacka_points_icon_dark.svg' width='21' height='14'/></span><br>";
  html += "             <i class='fa fa-chevron-down mr-1'></i>";
  html += "           </div>";
  html += "           <div class='col-sm-5'>";
  html +=
    "             <p style='margin: 0;'>" +
    escapeHtml(
      trip.path[trip_detail.arrival_path_index].address.city.capitalize()
    ) +
    " ~" +
    arrival_date.format_hours() +
    "<b>" +
    score_display +
    "</b></p>";
  html +=
    "             <p style='margin: 0; color: var(--yacka-dark-gray);'>" +
    escapeHtml(trip.path[trip_detail.arrival_path_index].address.street) +
    "</p>";
  html += "           </div>";
  html += "         </div>";
  html += "       </div>";
  html += "     </div>";
  html += "     <div class='row maskable'>";
  html += "       <div class='col avatar-sidebar'>";
  html +=
    "         <img src='" +
    otherOccupantPhoto +
    "' class='avatar-pic rounded-circle'/>";
  html += "       </div>";
  html += "       <div class='col pt-1 pl-0'>";
  html += "         <div class='row'>";
  html += "           <div class='col-12'>";
  html +=
    "             <p style='margin-bottom: 0.3rem'>" +
    "<img class='donut-img' src='" +
    otherOccupantDonut +
    "'/><b>" +
    otherOccupantIntro +
    "</b></p>";
  html += "           </div>";
  html += "         </div>";
  html += "         <div class='row'>";
  html += "           <div class='col-12'>";
  // Communities badges if any, otherwise preferences
  if (otherOccupantCommunities.length > 0) {
    for (let i = 0; i < otherOccupantCommunities.length; i++) {
      html +=
        "<span class='badge yacka-badge-yellow community-badge'>" +
        otherOccupantCommunities[i].name +
        "</span>";
    }
  } else {
    if (speaking_pref == "1") {
      html +=
        "             <img src='../img/icons/light_speak_icon.svg' class='pref-icon' alt='Speaking Pic'/>";
    } else if (speaking_pref == "2") {
      html +=
        "             <img src='../img/icons/dark_speak_icon.svg' class='pref-icon' alt='Speaking Pic'/>";
    }
    if (smoking_pref == "1") {
      html +=
        "             <img src='../img/icons/light_smoke_icon.svg' class='pref-icon' alt='Smoking Pic'/>";
    } else if (smoking_pref == "2") {
      html +=
        "             <img src='../img/icons/dark_smoke_icon.svg' class='pref-icon' alt='Smoking Pic'/>";
    }
    if (music_pref == "1") {
      html +=
        "             <img src='../img/icons/light_music_icon.svg' class='pref-icon' alt='Music Pic'/>";
    } else if (music_pref == "2") {
      html +=
        "             <img src='../img/icons/dark_music_icon.svg' class='pref-icon' alt='Music Pic'/>";
    }
  }

  html += "           </div>";
  html += "         </div>";
  html += "       </div>";
  html += "     </div>";
  html +=
    "<div class='clickable toggle-chevron'><i class='fas fa-chevron-circle-down chevron'></i></div>";
  html + "  </div>";
  html + "</div>";
  return html;
}

function yackaPointsColorClass(isDriver, fee) {
  if (isDriver) {
    return "yacka-green-text";
  } else {
    switch (fee) {
      case 0:
        return "yacka-green-text";
      case 0.5:
        return "yacka-yellow-text";
      case 1:
        return "yacka-red-text";
    }
  }
}

//# sourceMappingURL=home.js.map
