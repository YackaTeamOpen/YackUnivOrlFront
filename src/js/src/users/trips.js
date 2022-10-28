$(document).ready(function () {
  sendRequestToAPI("GET", "/users/trips", null, function (response) {
    if (response.status == 200) {
      startRender(response.responseJSON);
    } else if (response.status == 401) {
      logout(environment.web_manager_url + "/login.html");
    } else if (response.status == 403) {
      window.location.href =
        environment.web_manager_url + "/users/onboard2.html";
    }
  });
});

function startRender(data) {
  if (data.user.photo) {
    $("#settings-btn").attr("src", data.user.photo);
  } else {
    $("#settings-btn").attr("src", "../img/avatars/default2.png");
  }
  $("#settings-btn").on("click", function () {
    window.location.href = "menu.html";
  });

  let nbTrips = data.trips.length;
  let nbWTrips = data.waiting_trips.length;

  if (nbTrips == 0 && nbWTrips == 0) {
    renderNothing();
  } else {
    let tripIntroContainer = document.querySelector("#trip-container-intro");
    let wtripIntroContainer = document.querySelector(
      "#waiting-trip-container-intro"
    );
    let tripContainer = document.querySelector("#trip-container");
    let wtripContainer = document.querySelector("#waiting-trip-container");
    renderTripIntro(tripIntroContainer, nbTrips, (role = "driver"));
    if (nbTrips != 0) {
      renderTrips(tripContainer, data.trips, (role = "driver"));
    }
    renderTripIntro(wtripIntroContainer, nbWTrips, (role = "passenger"));
    if (nbWTrips != 0) {
      renderTrips(wtripContainer, data.waiting_trips, (role = "passenger"));
    }
  }
}

function renderNothing() {
  let tripIntroContainer = document.querySelector("#trip-container-intro");
  let wtripIntroContainer = document.querySelector(
    "#waiting-trip-container-intro"
  );
  tripIntroContainer.innerHTML = "";
  wtripIntroContainer.innerHTML = "";
  $("#no-data-card").css("display", "block");
}

function renderTripIntro(container, nbTrips, role) {
  let cardTypeClass = role == "driver" ? "driver-trip" : "passenger-trip";
  container.innerHTML =
    "<div class='card-type-intro " + cardTypeClass + "'></div>";
  container.firstElementChild.innerHTML = getIntroHtml(nbTrips, role);
}

function getIntroHtml(nbTrips, role) {
  return (
    (nbTrips != 0) ?
    ("<p>" + nbTrips + " " + (role == "driver" ? "proposition" : "demande")
      + (nbTrips > 1 ? "s" : "") + " enregistrée" + (nbTrips > 1 ? "s" : "")
      + " en tant que " + (role == "driver" ? "conducteur" : "passager") + " :</p>") :
    ("<p>Vous n'avez aucune " + (role == "driver" ? "proposition" : "demande")
      + " enregistrée en tant que " + (role == "driver" ? "conducteur" : "passager") + ".</p>")
  );
}

function renderTrips(container, trips, role) {
  trips.forEach((trip) => {
    let tempCardDiv = document.createElement("div");
    tempCardDiv.innerHTML = createYackaTripCard(trip, role).trim();
    tempCardDiv
      .querySelector("#initial-comment")
      .setAttribute("comment", trip.comment);
    let yackaTripCardElement = tempCardDiv.firstElementChild;
    container.insertAdjacentElement("beforeend", yackaTripCardElement);
  });
}

function createYackaTripCard(trip, role) {
  let isDriver = role == "driver" ? true : false;
  let fromEvent = trip.event_occurrence_id == null ? false : true;
  let startCity = trip.start_address.city;
  let startZip = trip.start_address.zipcode;
  let startStreet = trip.start_address.street;
  let arrivalCity = trip.arrival_address.city;
  let arrivalZip = trip.arrival_address.zipcode;
  let arrivalStreet = trip.arrival_address.street;
  let index = trip.id;
  let startDate = new Date(Date.parse(trip.start_time));
  let singleTrip = parseInt(trip.single_trip, 10) == 0 ? false : true;
  let recurrenceRule = trip.recurrence_rule;
  let validityStartDate = new Date(Date.parse(trip.validity_start_date));
  let validityEndDate = new Date(Date.parse(trip.validity_end_date));
  let car, carSummary, freeRatio, ypPerKm;
  let nbSeats, nbStops, nbPass, nbSeatsSummary, nbStopsSummary, nbPassSummary;
  if (isDriver) {
    car = trip.car.label;
    carSummary = "véhicule : " + car;
    freeRatio = trip.free_ratio;
    ypPerKm = yackaPointsPerKm(freeRatio);
  }
  if (!singleTrip) {
    if (recurrenceRule.indexOf("DTSTART") == -1) {
      recurrenceRule =
        "DTSTART:" +
        trip.start_time.replace(/[-:]/g, "") +
        "\n" +
        recurrenceRule;
    }
  }
  let commentSummary = "commentaires : " + trip.comment;
  let cardType = role + "-trip";
  let userDonut = (isDriver) ? "../img/icons/driver_icon.svg" : "../img/icons/hep_icon.svg";

  let dateinfoToDisplay = "";
  let timeToDisplay = startDate
    .toLocaleTimeString()
    .substring(0, 5)
    .replace(":", "h");
  let interval, intervalSummary, exceptionDates, weekdayList;
  let exceptionDatesSummary = "";
  let exceptionDatesInLine = "";
  if (singleTrip) {
    dateinfoToDisplay = startDate.formatDateWymdYShort().replace(" ", "\xa0");
  } else {
    dateinfoToDisplay =
      "Du " +
      validityStartDate.formatDateWymdYShort().replace(" ", "\xa0") +
      " au " +
      validityEndDate.formatDateWymdYShort().replace(" ", "\xa0");
    let rruleInfo = rrule.rrulestr(recurrenceRule, { forceset: true });
    weekdayList = rruleInfo.rrules()[0].options.byweekday;
    interval = rruleInfo.rrules()[0].options.interval;
    intervalSummary =
      "toutes les " + (interval > 1 ? interval + " " : "") + "semaines";
    exceptionDates = rruleInfo
      .exdates()
      .map((exdate) => exdate.noZoneFormatDateDmy());
    let exceptionDatesWithDay = rruleInfo
      .exdates()
      .map((exdate) => exdate.noZoneFormatDateWymdShort());
    if (exceptionDates.length != 0) {
      exceptionDatesInLine = exceptionDates.join(",");
      let exceptionDatesWithDayInLine = exceptionDatesWithDay.join(", ");
      exceptionDatesSummary = "sauf : " + exceptionDatesWithDayInLine;
    } else {
      exceptionDatesSummary = "pas d'exceptions";
    }
  }
  let eventIconHtml = "",
    fromEventClass = "",
    evOccId = "";
  if (fromEvent) {
    evOccId = " ev-occ-id='" + trip.event_occurrence_id + "'";
    fromEventClass = " from-event";
    if (isDriver) {
      nbSeats = trip.nb_seats;
      nbStops = trip.nb_stops;
      nbSeatsSummary = "nb de places max : " + nbSeats;
      nbStopsSummary = "nb d'arrêts max : " + nbStops;
    } else {
      nbPass = trip.nb_passengers;
      nbPassSummary = "vous êtes " + nbPass + (nbPass > 1 ? " passagers"  : " passager");
    }
    eventIconHtml =
      '<img class="mr-2" style="display:inline" src="../img/icons/event-2-dark.svg" width="30" height="30" >';
  }
  let html = "";
  html += "<div class='yackaday-card card yackatrip-" + cardType + " shadow-sm'" + " id='" + cardType + index + "'>";

  html += " <div class='card-body " + cardType + fromEventClass + "'" + evOccId + " id='body-" + cardType + index + "' tripid='" + index + "'>";
  html += "   <div class='row align-items-center maskable card-header-display mb-1'>";
  html += "     <div class='col-7 title-display d-flex align-items-center'>";
  if (singleTrip) {
    html += eventIconHtml + "<h5 class='card-title mb-0' style='display:inline' id='validity' start='" + trip.start_time + "' end=''><b>" + dateinfoToDisplay + "</b></h5>";
  } else {
    html += eventIconHtml + "<h5 class='card-title mb-0' style='display:inline' id='validity' start='" + trip.validity_start_date + "' end='" + trip.validity_end_date + "'><b>" + dateinfoToDisplay + "</b></h5>" + eventIconHtml;
  }
  html += "     </div>";
  html += "     <div class='col-5'>";
  html += "       <div class='row align-items-center'>";
  html += "         <div class='col d-flex align-items-center justify-content-end my-1'>";
  html += "           <button type='button' class='delete-button btn badge yacka-badge-red'>SUPPRIMER</button>";
  html += "         </div>";
  html += "         <div class='col d-flex align-items-center justify-content-end my-1'>";
  html += "           <button type='button' class='validity-change-button change-button btn badge yacka-badge-dark'>MODIFIER</button>";
  html += "         </div>";
  html += "       </div>";
  html += "     </div>";
  html += "   </div>";
  html += "   <hr class='mt-0' style='border-top-width: 1px;'>";
  html += "   <div class='row'>";
  html += "       <div class='col-auto'>";
  html += "         <div class='row'>";
  html += "           <div class='col'>";
  html += "             <p><b>" + timeToDisplay + "</b></p>";
  html += "           </div>";
  html += "         </div>";
  html += "         <div class='row'>";
  html += "           <div class='col donut-col'>";
  html += "             <img class='donut-img' src='" + userDonut + "'/>";
  html += "           </div>";
  html += "         </div>";
  html += "       </div>";
  html += "       <div class='col pl-0'>";
  html += "         <div class='row'>";
  html += "           <div class='col-sm-5'>";
  html += "             <p style='margin: 0;'>" + escapeHtml(startCity.capitalize()) + ", " + startZip + "</p>";
  html += "             <p style='margin: 0; color: var(--yacka-dark-gray);'>" + escapeHtml(startStreet) + "</p>";
  html += "           </div>";
  html += "           <div style='padding:0;' class='col-2 d-none d-xs-none d-sm-block d-md-block d-lg-block d-xl-block'>"; //only on med and large
  if (isDriver) {
    html += "             <span class='yacka-points-amount pl-1 pr-1 ";
    html += freeRatioColorClass(freeRatio);
    html += "'>" + ypPerKm;
    html += "</span>";
  }
  html += "             <i class='fa fa-chevron-right mr-1'></i><br>";
  html += "           </div>";
  html += "           <div class='col-sm-2 d-xs-block d-sm-none d-md-none d-lg-none d-xl-none pr-0'>"; //only on small
  if (isDriver) {
    html += "             <span style='font-size: 0.9em;' class='yacka-points-amount pl-1 pr-1 ";
    html += freeRatioColorClass(freeRatio);
    html += "'>" + ypPerKm;
    html += "</span>";
  }
  html += "             <i class='fa fa-chevron-down mr-1'></i>";
  html += "           </div>";
  html += "           <div class='col-sm-5'>";
  html += "             <p style='margin: 0;'>" + escapeHtml(arrivalCity.capitalize()) + ", " + arrivalZip + "</p>";
  html += "             <p style='margin: 0; color: var(--yacka-dark-gray);'>" + escapeHtml(arrivalStreet) + "</p>";
  html += "           </div>";
  html += "         </div>";
  html += "       </div>";
  html += "   </div>";
  html += "   <div id='single-trip' value='" + trip.single_trip + "' hidden></div>";
  html += "   <div id='initial-start-time' value='" + trip.start_time.substring(11, 16) + "' hidden></div>";
  if (!singleTrip) {
    html += "   <div id='initial-recurrence-rule' value='" + recurrenceRule + "' hidden></div>";
    html += "   <div class='row maskable'>";
    html += "     <div class='col pt-2'>";
    html += "       <div class='row justify-content-between'>";
    html += "         <div id='weekday-list' class='col-auto'>";
    html += "           <span><i class='fa fa-arrow-right mr-1'></i>Les</span>";
    html += "           <span id='summary-monday' class='btn day-badge" + (weekdayList.includes(0) ? " checked-day" : " unchecked-day") + " small'>L</span>";
    html += "           <span id='summary-tuesday' class='btn day-badge" + (weekdayList.includes(1) ? " checked-day" : " unchecked-day") + " small'>M</span>";
    html += "           <span id='summary-wednesday' class='btn day-badge" + (weekdayList.includes(2) ? " checked-day" : " unchecked-day") + " small'>M</span>";
    html += "           <span id='summary-thursday' class='btn day-badge" + (weekdayList.includes(3) ? " checked-day" : " unchecked-day") + " small'>J</span>";
    html += "           <span id='summary-friday' class='btn day-badge" + (weekdayList.includes(4) ? " checked-day" : " unchecked-day") + " small'>V</span>";
    html += "           <span id='summary-saturday' class='btn day-badge" + (weekdayList.includes(5) ? " checked-day" : " unchecked-day") + " small'>S</span>";
    html += "           <span id='summary-sunday' class='btn day-badge" + (weekdayList.includes(6) ? " checked-day" : " unchecked-day") + " small'>D</span>";
    html += "         </div>";
    html += "       </div>";
    html += "       <div class='row justify-content-between pt-2'>";
    html += "         <div class='col-auto'>";
    html += "           <span id='initial-interval' interval='" + interval + "'><i class='fa fa-arrow-right mr-1'></i>" + intervalSummary + "</span>";
    html += "         </div>";
    html += "       </div>";
    html += "       <div class='row justify-content-between pt-2'>";
    html += "         <div class='col-auto'>";
    html += "           <span id='initial-exception-dates' exception-dates='" + exceptionDatesInLine + "'><i class='fa fa-arrow-right mr-1'></i>" + exceptionDatesSummary + "</span>";
    html += "         </div>";
    html += "       </div>";
    html += "     </div>";
    html += "   </div>";
  }
  if (isDriver) {
    html += "   <div class='row maskable justify-content-between pt-2'>";
    html += "     <div class='col-auto'>";
    html += "       <span id='initial-car' car-id='" + trip.car_id + "'><i class='fa fa-arrow-right mr-1'></i>" + escapeHtml(carSummary) + "</span>";
    html += "     </div>";
    html += "   </div>";
  }
  if (fromEvent) {
    if (isDriver) {
      html += "   <div class='row maskable justify-content-between pt-2'>";
      html += "     <div class='col-auto'>";
      html += "       <span id='initial-nb-seats' nb-seats='" + nbSeats + "'><i class='fa fa-arrow-right mr-1'></i>" + nbSeatsSummary + "</span>";
      html += "     </div>";
      html += "   </div>";
      // html += "   <div class='row maskable justify-content-between pt-2'>";
      // html += "     <div class='col-auto'>";
      // html += "       <span id='initial-nb-stops' nb-stops='" + nbStops + "'><i class='fa fa-arrow-right mr-1'></i>" + nbStopsSummary + "</span>";
      // html += "     </div>";
      // html += "   </div>";
    } else {
      html += "   <div class='row maskable justify-content-between pt-2'>";
      html += "     <div class='col-auto'>";
      html += "       <span id='initial-nb-pass' nb-pass='" + nbPass + "'><i class='fa fa-arrow-right mr-1'></i>" + nbPassSummary + "</span>";
      html += "     </div>";
      html += "   </div>";
    }
  }
  html += "   <div class='row maskable justify-content-between pt-2'>";
  html += "     <div class='col-auto'>";
  html += "       <span id='initial-comment'><i class='fa fa-arrow-right mr-1'></i>" + escapeHtml(commentSummary) + "</span>";
  html += "     </div>";
  html += "   </div>";
  html + "  </div>";
  html + "</div>";

  return html;
}


function freeRatioColorClass(free_ratio) {
  switch (free_ratio) {
    case 2:
      return "yacka-green-text";
    case 1:
      return "yacka-yellow-text";
    case 0:
      return "yacka-red-text";
  }
}

function yackaPointsPerKm(free_ratio) {
  switch (free_ratio) {
    case 2:
      return "Gratuit";
    case 1:
      return "0,05€/km";
    case 0:
      return "0,1€/km";
  }
}

function doNothing() {
  return;
}
