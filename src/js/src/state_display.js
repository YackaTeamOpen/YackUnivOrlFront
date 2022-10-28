let TRIP_STATUS_NOT_INFORMED_YET = "not informed yet";
let TRIP_STATUS_PROPOSED = "proposed";
let TRIP_STATUS_WAITING_FOR_PASSENGER = "waiting for passenger";
let TRIP_STATUS_WAITING_FOR_DRIVER = "waiting for driver";
let TRIP_STATUS_NOTIFIED_OF_REQUEST = "notified of request";
let TRIP_STATUS_TO_BE_DRIVEN = "to be driven";
let TRIP_STATUS_TO_DRIVE = "to drive";
let TRIP_STATUS_HAS_MODIFIED = "has modified";
let TRIP_STATUS_NOTIFIED_OF_MODIFICATION = "notified of modification";
let TRIP_STATUS_DROVE = "drove";
let TRIP_STATUS_WAS_DRIVEN = "was driven";
let TRIP_STATUS_HAS_CANCELED = "has canceled";
let TRIP_STATUS_NOTIFIED_OF_CANCELLATION = "notified of cancellation";
let TRIP_STATUS_NOTIFIED_OF_REFUSAL = "notified of refusal";
let TRIP_STATUS_UNWILLING = "unwilling";

function getStateInfo(role = "driver", tripOrWtripStatus) {
  let is_driver = (role == "driver" ? true : false);
  let state = { info: "", stage: "", message: "", plurality: "", nb_action: 0, color: "green", acknowledgement: "", fastAction: "" };

  if (is_driver) {
    if (tripOrWtripStatus == TRIP_STATUS_WAITING_FOR_PASSENGER) {
      state.info = "<h5 class='yacka-dark-border'>Cette proposition de partage est en attente de la confirmation du passager</h5>";
      state.stage = "HALF-ACCEPTED";
      state.message = "EN ATTENTE";
      state.nb_action = 0;
      state.fastAction = "ANNULER";
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_REQUEST) {
      state.info = "<h5 class='clickable yacka-dark-border'>Un passager vous demande de partager votre trajet. Consultez les détails et répondez-lui !</h5>";
      state.stage = "HALF-ACCEPTED";
      state.message = "A VALIDER";
      state.nb_action = 1;
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_PROPOSED) {
      state.info = "<h5 class='clickable yacka-dark-border'>";
      state.info += "Le trajet de ce passager correspond à votre recherche. Prenez-en connaissance et proposez-lui de l'emmener !</h5>";
      state.stage = "PENDING";
      state.message = "A VALIDER";
      state.nb_action = 1;
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_REFUSAL) {
      state.message = "REFUSÉ";
      state.plurality = "S";
      state.nb_action = 0;
      state.color = "red";
      state.acknowledgement = "COMPRIS !";
    } else if (tripOrWtripStatus == TRIP_STATUS_HAS_MODIFIED ||
      tripOrWtripStatus == TRIP_STATUS_TO_DRIVE ||
      tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_MODIFICATION) {
      state.message = "VALIDÉ";
      state.plurality = "S";
      state.nb_action = 1;
      state.color = "green";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_CANCELLATION) {
      state.message = "ANNULÉ";
      state.plurality = "S";
      state.nb_action = 0;
      state.color = "red";
      state.acknowledgement = "COMPRIS !";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOT_INFORMED_YET) {
      state.message = "POSSIBLE";
      state.plurality = "S";
    }
  } else {
    if (tripOrWtripStatus == TRIP_STATUS_WAITING_FOR_DRIVER) {
      state.info = "<h5 class='yacka-dark-border'>Cette demande de partage est en attente de la confirmation du conducteur</h5>";
      state.stage = "HALF-ACCEPTED";
      state.message = "EN ATTENTE";
      state.nb_action = 0;
      state.fastAction = "ANNULER";
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_REQUEST) {
      state.info = "<h5 class='clickable yacka-dark-border'>Un conducteur vous propose de partager son trajet. Consultez les détails et répondez-lui !</h5>";
      state.stage = "HALF-ACCEPTED";
      state.message = "A VALIDER";
      state.nb_action = 1;
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_PROPOSED) {
      state.info = "<h5 class='clickable yacka-dark-border'>";
      // state.info += '<img class="brand-inline" src="../img/brand/black_logo.svg">';
      state.info += "Ce trajet correspond à votre recherche. Prenez-en connaissance et demandez un covoiturage au conducteur !</h5>";
      state.stage = "PENDING";
      state.message = "A VALIDER";
      state.nb_action = 1;
      state.color = "yellow";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_REFUSAL) {
      state.message = "REFUSÉ";
      state.plurality = "S";
      state.nb_action = 0;
      state.color = "red";
      state.acknowledgement = "COMPRIS !";
    } else if (tripOrWtripStatus == TRIP_STATUS_TO_BE_DRIVEN ||
      tripOrWtripStatus == TRIP_STATUS_HAS_MODIFIED ||
      tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_MODIFICATION) {
      state.message = "VALIDÉ";
      state.plurality = "S";
      state.nb_action = 0;
      state.color = "green";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOTIFIED_OF_CANCELLATION) {
      state.message = "ANNULÉ";
      state.plurality = "S";
      state.nb_action = 0;
      state.color = "red";
      state.acknowledgement = "COMPRIS !";
    } else if (tripOrWtripStatus == TRIP_STATUS_NOT_INFORMED_YET) {
      state.message = "POSSIBLE";
      state.plurality = "S";
    }
  }
  return state;
}
