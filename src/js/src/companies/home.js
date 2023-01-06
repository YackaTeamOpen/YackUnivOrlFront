
$(document).ready(function () {
  requestHome(
    function (data) {
      //setOneSignalExternalUserId(data.user.id);
      startRender(data, "users");
    },
    "companies",
    null,
    "?stats=users"
  );
  requestHome(
    function (data) {
      //setOneSignalExternalUserId(data.user.id);
      startRender(data, "trips");
    },
    "companies",
    null,
    "?stats=trips"
  );
  requestHome(
    function (data) {
      //setOneSignalExternalUserId(data.user.id);
      startRender(data, "shtrips");
    },
    "companies",
    null,
    "?stats=shtrips"
  );
});


function startRender(data, dataType) {
  const startMarkerColor = 'black';
  const arrivalMarkerColor = 'black';

  if (dataType == "users") {
    let settingsBtn = document.querySelector("#settings-btn");
    if (data.user.photo) {
      settingsBtn.setAttribute("src", data.user.photo);
    } else {
      settingsBtn.setAttribute("src", "../img/avatars/default2.png");
    };
    settingsBtn.addEventListener("click", function () {
      window.location.href = environment.web_manager_url + "/companies/profile.html";
    });
    let logoutBtn = document.querySelector("#logout-btn");
    logoutBtn.addEventListener("click", function () {
      logout(environment.web_manager_url + "/login.html");
    });
    document.querySelector("#hello-world").innerHTML =
      data.user.organization.name;
    let mainContainer = document.querySelector("#main-container");
    document.querySelector("#nb-subscribers").innerHTML = data.stats.nb_subscribers;
    document.querySelector("#max-nb-subscribers").innerHTML = data.user.organization.bill.nb_max_employees;
    let subscriberListElem = document.querySelector("#subscriber-list");
    let subscriberListHtml = "";
    subscriberListElem.innerHTML = subscriberListHtml;
    let subscriberTableElem = document.querySelector("#subscriber-table");
    let subscriberTable = data.stats.subscriber_list;
    // récupère le nombre de covoiturages d'un utilisateur en tant que conducteur
    let subscriber_conducteur_nb_trips = data.stats.subscriber_nb_trips;
    // récupère le nombre de kilomètres parcourus par un utilisateur en tant que conducteur
    let subscriber_conducteur_nb_km = data.stats.subscriber_nb_km;
    // récupère le nombre de covoiturages d'un utilisateur en tant que passager
    let subscriber_passager_nb_trips = data.stats.subscriber_nb_trips_passager;
    // récupère le nombre de kilomètres parcourus par un utilisateur en tant que passager
    let subscriber_passager_nb_km = data.stats.subscriber_nb_km_passager;
    let subscriberTableHtml = "";
    subscriberTableHtml += "<thead>\n" +
        "<tr>" +
        "<th></th>" +
        "<th id='thconducteur' scope=\"col\" colspan=\"2\">Conducteur</th>" +
        "<th id='thpassager' scope=\"col\" colspan=\"2\">Passager</th>" +
        "</tr>" +
        "<tr>" +
        "<th scope=\"col\"></th>" +
        "<th id='thconducteurcovoit' scope=\"col\" data-sortable='true'>Nombre de covoiturages</th>" +
        "<th id='thconducteurkm' scope=\"col\" data-sortable='true'>Nombre de kilomètres</th>" +
        "<th id='thpassagercovoit' scope=\"col\" data-sortable='true'>Nombre de covoiturages</th>" +
        "<th id='thpassagerkm' scope=\"col\" data-sortable='true'>Nombre de kilomètres</th>" +
        "</tr>" +
        "</thead>";

    subscriberTable.forEach((subscriber) => {
        subscriberTableHtml += "<tr><td>" + subscriber + "</td>" +
            "<td>" + Math.floor(Math.random() * 10) + 1 + "</td>" +
            "<td>" + Math.floor(Math.random() * 100) + 1 + "</td> " +
            "<td>" + Math.floor(Math.random() * 10) + 1 + "</td>" +
            "<td>" + Math.floor(Math.random() * 100) + 1 + "</td>";
            "</tr>";
    });
    subscriberTableElem.innerHTML = subscriberTableHtml;
    let table = document.getElementById("subscriber-table");
    table.setAttribute("data-search", "true");
    table.setAttribute("data-mobile-responsive", "true");
    table.setAttribute("data-toolbar", "#toolbar");
    table.setAttribute("data-pagination", "true");
    $('#subscriber-table').bootstrapTable({data: table});
    document.querySelectorAll(".toggle-info").forEach((elem) => {
      elem.querySelector(".toggle-chevron").addEventListener(
        "click",
        function (e) {
            this.classList.toggle("fa-rotate-180");
            elemToToggle = elem.querySelector(".info-to-toggle");
            $(elemToToggle).slideToggle();
          }
      );
    })
    mainContainer.hidden = false;

  } else if (dataType == "trips") {
    let tripInfoElem = document.querySelector("#trip-info");
    let nbTripsElem = document.querySelector("#nb-trips");
    nbTripsElem.innerHTML = " (" + (data.stats.atcf_trip_list.length + data.stats.atcf_waiting_trip_list.length) + ")";
    if (((data.stats.atcf_trip_list != null) && (data.stats.atcf_trip_list.length != 0))
      || ((data.stats.atcf_waiting_trip_list != null) && (data.stats.atcf_waiting_trip_list.length != 0))) {
      document.querySelector("#trip-cumulative-distance").innerHTML = data.stats.trip_cumulative_distance + "&nbspkm";
      document.querySelector("#waiting-trip-cumulative-distance").innerHTML = data.stats.waiting_trip_cumulative_distance + "&nbspkm";
      document.querySelector("#trip-mean-distance").innerHTML = Math.round(data.stats.trip_mean_distance * 10) / 10 + "&nbspkm";
      document.querySelector("#waiting-trip-mean-distance").innerHTML = Math.round(data.stats.waiting_trip_mean_distance * 10) / 10 + "&nbspkm";
      document.querySelector("#trip-nb-occurrence-mean").innerHTML = data.stats.trip_nb_occurrence_mean + "&nbspfois";
      document.querySelector("#waiting-trip-nb-occurrence-mean").innerHTML = data.stats.waiting_trip_nb_occurrence_mean + "&nbspfois";
      tripInfoElem.querySelector(".waiting-message").hidden = true;
      tripInfoElem.querySelector(".data-area").hidden = false;
    } else {
      tripInfoElem.querySelector(".waiting-message").querySelector("p").innerHTML = (
        "Aucune donnée relative aux trajets à afficher.");
    };

  } else if (dataType == "shtrips") {
    let shtripListList = data.stats.shtrip_list;
    let shtripInfoElem = document.querySelector("#shtrip-info");
    let nbShtripsElem = document.querySelector("#nb-shtrips");
    let totalShtrips = 0;
    shtripListList.forEach((statusShtList) => {
      totalShtrips += statusShtList.nb_sht;
    });
    nbShtripsElem.innerHTML = " (" + totalShtrips + ")";
    if (shtripListList.length != 0) {
      shtripInfoElem.querySelector(".data-area").hidden = false;
      document.querySelector("#nb-pend-shtrip").innerHTML = data.stats.nb_pend_shtrip;
      document.querySelector("#nb-halfacc-shtrip").innerHTML = data.stats.nb_halfacc_shtrip;
      document.querySelector("#nb-valid-shtrip").innerHTML = data.stats.nb_valid_shtrip;
      document.querySelector("#valid-shtrip-mean-distance").innerHTML = Math.round(data.stats.valid_shtrip_mean_distance * 10) / 10 + "&nbspkm";
      document.querySelector("#halfacc-shtrip-nb-occurrence-mean").innerHTML = data.stats.halfacc_shtrip_nb_occurrence_mean + "&nbspfois";
      document.querySelector("#valid-shtrip-nb-occurrence-mean").innerHTML = data.stats.valid_shtrip_nb_occurrence_mean + "&nbspfois";
      shtripInfoElem.querySelector(".waiting-message").hidden = true;
    } else {
      shtripInfoElem.querySelector(".waiting-message").querySelector("p").innerHTML = (
        "Aucune donnée relative aux partages à afficher.");
    };
  };
}
