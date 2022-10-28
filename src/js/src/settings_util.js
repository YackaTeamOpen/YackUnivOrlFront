function startRender(res, withCars = true) {
  let settingsContainer = document.querySelector("#settings-container");
	window.user = res.user;
  if (withCars) {
    renderCars(settingsContainer, res.cars, false);
  }
  let addressListElem = settingsContainer.querySelector("#addresses");
  let html = "";
  if (res.addresses.length != 0) {
    res.addresses.forEach(function(address) {
      html += ("<div id='input-group-address-" + address.id + "' class='input-group mb-0 mt-0'>" +
        "<input type='text' class='form-control form-control-plaintext' value='" +
        escapeHtml(address.street + " " + address.zipcode + " " + address.city) +"' readonly>" +
        "<div class='input-group-append'>" + "<button id='address-button-" + address.id +
        "' class='btn btn-outline-secondary' type='button'><i class='fa fa-trash'></i></button></div></div>");
    });
  } else {
    html += "<span>Vous n'avez aucune adresse enregistrée. Une adresse sera automatiquement enregistrée lorsque vous créerez votre premier trajet.";
  }
  addressListElem.innerHTML = html;
}

function renderCars(tripCard, cars, select = true) {
  let carListElem = tripCard.querySelector("#new-car-id");
  let addCarElem = tripCard.querySelector("#add-car-group");
  let initialCarId = tripCard.querySelector('#initial-car').getAttribute('car-id');
  if (cars.length != 0) {
    let html = "";
    cars.forEach(function(car, i) {
      if (select) {
        html += ("<option " +
          (initialCarId == '' ? (i == 0 ? "selected " : "") : (car.id == parseInt(initialCarId, 10) ? "selected " : "")) +
          "value=" + car.id + ">" + escapeHtml(car.label) + "</option>");
      } else {
        html += ("<div id='input-group-car-" + car.id + "' class='input-group mb-0 mt-0'>" +
          "<input type='text' class='form-control form-control-plaintext' value='" +
          escapeHtml(car.label) + "' readonly>" +
          "<div class='input-group-append'>" + "<button id='car-button-" + car.id +
          "' class='btn btn-outline-secondary' type='button'><i class='fa fa-trash'></i></button></div></div>");
      }
    });
    carListElem.innerHTML = html;
    carListElem.hidden = false;
  }
}
