

function sendMessageToOtherOccupant() {
  console.log("In sendMessageToOtherOccupant()");
}

function getshtProofInfoHTML(trip, is_driver, uniqueId, state, stage) {
  let html = "";
  html += ' <div class="row">';
  html += '  <div class="col-sm-12">';
  html += '   <div class="proof-info"</div>';
  html += '  </div>';
  html += ' </div>';
  return html
}


function getshtDatesHTML(trip, is_driver, uniqueId, state, stage) {
  let html = "";
  let occurrenceList = trip.occ_when_list[0].occurrence_list;
  if (occurrenceList.length != 0) {
    html += "<div>";
    if (state == "A VALIDER") {
      let action = "";
      if (stage == "PENDING") {
        if (is_driver) {
          action = "Proposer le partage";
        } else {
          action = "Demander le partage";
        };
      } else if (stage == "HALF-ACCEPTED") {
        if (is_driver) {
          action = "Accepter la demande";
        } else {
          action = "Accepter la proposition";
        };
      };
      html += ' <div class="row">';
      html += '  <div class="col-sm-12">';
      html += '   <div class="align-self-sm-stretch sht-valid-btn-group" id="valid-btn-group' + uniqueId + '">';
      html += '    <button type="button" class="btn btn-success validation">' + action + ' aux dates choisies</button>';
      html += '    <button type="button" class="btn btn-danger refusal">Refuser le trajet</button>';
      html += '   </div>';
      html += '  </div>';
      html += ' </div>';
    }
    occurrenceList.forEach(function(occurrence) {
      html += " <div class='row date-occ'>";
      html += "   <div class='col-sm-12 date-occ'>";
      html += '     <div class="form-check form-switch d-flex" id="' + uniqueId + '-' + occurrence + '">';
      if (state == "A VALIDER") {
        html += '       <input class="form-check-input" type="checkbox" id="Check' + uniqueId + '-' + occurrence + '" checked>';
      } else {
        html += '       <input class="form-check-input" type="checkbox" id="Check' + uniqueId + '-' + occurrence + '" checked disabled>';
      };
      html += '       <label class="form-check-label" for="Check' + uniqueId + '-' + occurrence + '">' + (new Date(Date.parse(occurrence))).formatDateWymdShort() + '</label>';
      html += '     </div>';
      html += "   </div>";
      html += " </div>";
    });
    html += "</div>";
  }
  return html
}

function getUserProfileHTML(trip, is_driver, uniqueId) {
  let trip_detail = null;
  let score_display = "";
  let otherOccupant = null;
  let otherOccupantRole = "";
  let tripAbout = "";
  if (is_driver) {
    let passenger_index = 0;
    otherOccupant =  trip.passenger_list[passenger_index];
    otherOccupantRole = "passager";
    trip_detail = trip.occ_details_list[passenger_index + 1];
    tripAbout =  trip.passenger_comment_list[passenger_index];
  } else {
    otherOccupant =  trip.trip_driver;
    otherOccupantRole = "conducteur";
    trip_detail = trip.occ_details_list[0];
    score_display = " (" + trip.driver_score + "mn de détour)";
    tripAbout =  trip.shared_trip_comment;
  }

  let otherOccupantCommunities = otherOccupant.communities;
  let about = (otherOccupant.aboutme == null) ? (escapeHtml(otherOccupant.surname.capitalize()) + " n'a laissé aucune description.") : otherOccupant.aboutme;
  let phone = ""
  if (otherOccupant.phone != null && otherOccupant.phone != "") {
    let phoneMatch = otherOccupant.phone.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (phoneMatch) {
      phone = "(" + phoneMatch[1] + " " + phoneMatch[2] + " " + phoneMatch[3] + " " + phoneMatch[4] + " " + phoneMatch[5] + ")";
    };
  }
  let otherOccupantPhoto = ((otherOccupant.photo) ? (otherOccupant.photo) : '../img/avatars/default2.png');
  let start_date = new Date(Date.parse(trip_detail.start_time));
  let arrival_date = new Date(Date.parse(trip_detail.arrival_time));
  let html = "";
  html += '<div class="d-flex user-profile-1">';
  html += "   <p style='display: inline'><b>" + escapeHtml(otherOccupant.surname.capitalize()) + " " + phone + "</b></p>";
  html += '    <a id="otherOccupantMsg' + uniqueId + '" role="button" class="btn btn-outline-dark" href="'+"/users/messages.html?uid="+otherOccupant.id+'">Envoyer un message à ' + escapeHtml(otherOccupant.surname.capitalize()) + '</a>';
  html += '</div>';
  html += '<div class="d-flex user-profile-2">';
  html += '    <img id="photo" src="' + otherOccupantPhoto + '" class="avatar-pic rounded-circle mr-2" alt="User Pic"/>';
  html += '  <div>';
  html += '   <div class="yacka-label mr-2" style="display: inline">Préférences de voyage :</div>';
  if (otherOccupant.speaking_pref.id == "1") {
    html = html + "     <img src='../img/icons/light_speak_icon.svg' class='pref-button' alt='Speaking Pic'/>";
  } else if (otherOccupant.speaking_pref.id == "2") {
    html = html + "     <img src='../img/icons/dark_speak_icon.svg' class='pref-button' alt='Speaking Pic'/>";
  }
  if (otherOccupant.smoking_pref.id == "1") {
    html = html + "     <img src='../img/icons/light_smoke_icon.svg' class='pref-button' alt='Smoking Pic'/>";
  } else if (otherOccupant.smoking_pref.id == "2") {
    html = html + "     <img src='../img/icons/dark_smoke_icon.svg' class='pref-button' alt='Smoking Pic'/>";
  }
  if (otherOccupant.music_pref.id == "1") {
    html = html + "     <img src='../img/icons/light_music_icon.svg' class='pref-button' alt='Music Pic'/>";
  } else if (otherOccupant.music_pref.id == "2") {
    html = html + "     <img src='../img/icons/dark_music_icon.svg' class='pref-button' alt='Music Pic'/>";
  }
  html += '  </div>';
  html += '</div>';
  html += "<div class='row user-profile-3'>";
  html += "  <div class='col hour-sidebar'>";
  html += "    <p><b>" + start_date.format_hours() + "</b></p>";
  html += "  </div>";
  html += "  <div class='col pl-0'>";
  html += "    <div class='row'>";
  html += "      <div class='col-sm-5'>";
  html += "        <p style='margin: 0;'>" + escapeHtml(trip.path[trip_detail.start_path_index].address.city.capitalize()) + "</p>";
  html += "        <p style='margin: 0; color: var(--yacka-dark-gray);'>" + escapeHtml(trip.path[trip_detail.start_path_index].address.street) + "</p>";
  html += "      </div>";
  html += "      <div style='padding:0;' class='col-1 d-none d-xs-none d-sm-block d-md-block d-lg-block d-xl-block'>"; //only on med and large
  html += "        <i class='fa fa-chevron-right mr-1'></i>";
  html += "      </div>";
  html += "      <div class='col-1 d-xs-block d-sm-none d-md-none d-lg-none d-xl-none'>"; //only on small
  html += "        <i class='fa fa-chevron-down mr-1'></i>";
  html += "      </div>";
  html += "      <div class='col-sm-6'>";
  html += "        <p style='margin: 0;'>" + escapeHtml(trip.path[trip_detail.arrival_path_index].address.city.capitalize()) + " ~" + arrival_date.format_hours() + "<b>" + score_display + "</b></p>";
  html += "        <p style='margin: 0; color: var(--yacka-dark-gray);'>" + escapeHtml(trip.path[trip_detail.arrival_path_index].address.street) + "</p>";
  html += "      </div>";
  html += "    </div>";
  html += "  </div>";
  html += "</div>";
  if (!is_driver) {
    html += '<div class="row user-profile-4">';
    html += '  <div class="col">';
    html += '   <div class="yacka-label">Véhicule utilisé : <b>' + escapeHtml(trip.car_label) + '</b></div>';
    html += '  </div>';
    html += '</div>';
  };
  html += '<div class="row user-profile-5">';
  html += '  <div class="col">';
  html += '   <div class="yacka-label">' + escapeHtml(otherOccupant.surname.capitalize()) + ' a écrit à propos de ce trajet :</div>';
  html += "    <p><b>" + tripAbout + "</b></p>";
  html += '  </div>';
  html += '</div>';
  html += '<div class="row user-profile-6">';
  html += '  <div class="col">';
  html += '   <div class="yacka-label">A propos d' + ('AEIOUYH'.includes(otherOccupant.surname.charAt(0).toUpperCase()) ? "'" : "e ") + escapeHtml(otherOccupant.surname.capitalize()) + ' :</div>';
  html += "    <p><b>" + about + "</b></p>";
  html += '  </div>';
  html += '</div>';
  return html
}

function displaySharedTripOptions(cardType, element, index, user, agenda, state = null, stage = null) {
  let uniqueId = "-" + cardType + index;
  if (element.classList.contains('closed') == false) {
    let nodeToToggle = element.querySelector("#div-pills-tab" + uniqueId);
    $(nodeToToggle).slideToggle();
    element.querySelectorAll('.maskable').forEach(function(rowToMask) {
      $(rowToMask).slideToggle();
    });
    element.classList.add('closed');
  } else {
    element.classList.remove('closed');
    element.querySelectorAll('.maskable').forEach(function(rowToMask) {
      $(rowToMask).slideToggle();
    });
    if (element.classList.contains('already-toggled') == false) {
      element.classList.add('already-toggled');
      let trip = (cardType == 'act-card') ? agenda.shared_trips[index]
          : agenda.shared_trips[agenda.agenda_indexes[index].index];
      let is_driver = (user.id == trip.trip_driver_id);
      let otherOccupant = "";
      if (is_driver) {
        otherOccupant = (trip.passenger_list[0].gender == 'F') ? "Passagère" : "Passager";
      } else {
        otherOccupant = (trip.trip_driver.gender == 'F') ? "Conductrice" : "Conducteur";
      }
      let displayDates = (cardType == 'act-card') ? true : false;
      let node = document.createElement("div");
      node.classList.add("sht-card", "card", "shadow-sm");
      node.setAttribute("id", "div-pills-tab" + uniqueId);
      node.setAttribute("style", "display: none");
      let html = '';
      html += '  <ul class="nav nav-pills nav-justified" id="pills-tab' + uniqueId + '" role="tablist">';
      html += '    <li class="nav-item">';
      html += '      <a class="nav-link yacka-card-tab active" id="sht-profile-tab' + uniqueId + '" data-toggle="pill" href="#sht-profile-pane' + uniqueId + '" role="tab">' + otherOccupant + '</a>';
      html += '    </li>';
      if (displayDates == true) {
        html += '    <li class="nav-item">';
        let datesTabDisplay = "";
        if (state == "A VALIDER") {
          datesTabDisplay = '<span class="valid-span">VALIDATION</span>';
        } else {
          datesTabDisplay = 'Dates';
        }
        html += '      <a class="nav-link yacka-card-tab" id="sht-dates-tab' + uniqueId + '" data-toggle="pill" href="#sht-dates-pane' + uniqueId + '" role="tab">' + datesTabDisplay + '</div></a>';
        html += '    </li>';
      } else {
        html += '    <li class="nav-item">';
        html += "      <a class='nav-link yacka-card-tab' id='sht-checked-tab" + uniqueId + "' data-toggle='pill' href='#sht-checked-pane" + uniqueId + "' role='tab'>Preuve de trajet</a>";
        html += '    </li>';
      }
      html += '  </ul>';
      html += '  <div class="tab-content" id="pills-tab-content' + uniqueId + '">';
      html += '    <div class="tab-pane show active fade" id="sht-profile-pane' + uniqueId + '" role="tabpanel">';
      html += getUserProfileHTML(trip, is_driver, uniqueId);
      html += '    </div>';
      if (displayDates == true) {
        html += '    <div class="tab-pane fade" id="sht-dates-pane' + uniqueId + '" role="tabpanel">';
        html += getshtDatesHTML(trip, is_driver, uniqueId, state, stage);
        html += '    </div>';
      } else {
        html += '    <div class="tab-pane fade sht-checked-pane" id="sht-checked-pane' + uniqueId + '" role="tabpanel">';
        html += '      <div class="sht-checked-pane-content" id="sht-checked-trips' + uniqueId + '" role="tabpanel">';
        html += ' <h3 class="h3-top text-center">Marche à suivre pour la validation du trajet :</h3>';
        html += ' <p class="text-center p-center">Il est nécessaire de valider le point de départ ainsi que le point d\'arrivée.' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>';
        html += '<button type="button" class="btn btn-success validation valid-trajet">Valider le trajet</button>';
        html += '<div class="div-bottom text-center flex-div"><i class="material-icons">location_off</i>'
        html += ' <p>Assurez-vous d\'avoir la localisation activée.</p>';
        html += '<i class="material-icons" data-toggle="tooltip" data-placement="top">help_outline</i>'
        html += '<div class="tooltip">Lorem Ipsum</div>'
        html += '</div>';
        html += getshtProofInfoHTML(trip, is_driver, uniqueId, state, stage);
        html += '      </div>';
        html += '    </div>';
        $(function () {
          $('[data-toggle="tooltip"]').tooltip()
        })
      }

      html += '  </div>';
      node.insertAdjacentHTML("beforeend", html);
      let nodeToToggle = element.appendChild(node);
      let tabList = element.querySelectorAll('#pills-tab' + uniqueId + ' a');
      tabList.forEach(function(tab) {
        tab.addEventListener('click', function(e) {
          $(this).tab({show: {duration: 400}});
          // possible tab-specific additional code here
        });
      });
      if ((displayDates == true) && (state == "A VALIDER")) {
        let occCheckList = element.querySelectorAll('#sht-dates-pane' + uniqueId + ' .form-check');
        occCheckList.forEach(function(occCheck) {
          occCheck.addEventListener('input', function(e) {
            let checkbox = occCheck.querySelector("input");
            let label = occCheck.querySelector("label");
            if (checkbox.hasAttribute('checked')) {
              checkbox.removeAttribute('checked');
              label.classList.add("line");
            } else {
              checkbox.setAttribute('checked', "");
              label.classList.remove("line");
            };
          });
        });
      };
      element.querySelector("#otherOccupantMsg" + uniqueId).addEventListener('click', function(e) {
        sendMessageToOtherOccupant();
      });
      $(nodeToToggle).slideToggle();
    } else {
      let nodeToToggle = element.querySelector("#div-pills-tab" + uniqueId);
      $(nodeToToggle).slideToggle();
    };
  };
}

