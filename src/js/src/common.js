var environments = {
	"local": {
		env_name: "local",
		api_url: "http://localhost:5000",
		web_manager_url: "http://localhost:3000"
	},
};

var env_name = "local";

var environment = environments[env_name];

function logout(optionalNewUrl = null) {
  $.ajax({
    url: environment.api_url + '/logout',
    type: 'GET',
    dataType: 'json',
    crossdomain: true,
    xhrFields: { withCredentials: true },
    complete: function (response) {
      if (optionalNewUrl == null) {
        window.location.replace(environment.web_manager_url);
      } else {
        window.location.replace(optionalNewUrl);
      }
    }
  });
}

$("#logout-btn").click(function () {
  logout();
});

function displayTime(nb) {
	if (nb < 10) {
		return "0" + nb;
	}
	return nb;
}

function sendGetRequestToURL(url, callback) {
	$.ajax({
		url: url,
		type: 'GET',
		dataType: 'json',
		crossdomain: true,
		complete: function (response) {
			callback(response);
		}
	});
}

function sendRequestToAPI(verb, endpoint, optionalData, callback) {
  ajaxOpt = {
    url: environment.api_url + endpoint,
    type: verb,
    dataType: 'json',
    crossdomain: true,
    xhrFields: {
      withCredentials: true
    },
    complete: function (response) {
      callback(response);
    }
  };
  if (optionalData != null) {
    ajaxOpt.data = optionalData;
  }
  $.ajax(ajaxOpt);
}

function sendRequestWFToAPI(verb, endpoint, optionalData, callback) {
  ajaxOpt = {
    url: environment.api_url + endpoint,
    type: verb,
    dataType: 'json',
    crossdomain: true,
    xhrFields: {
      withCredentials: true
    },
    complete: function (response) {
      callback(response);
    }
  };
  if (optionalData != null) {
    formData = new FormData();
    Object.entries(optionalData).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    })
    ajaxOpt.data = formData;
    ajaxOpt.processData = false;
    ajaxOpt.contentType = false;
  }
  $.ajax(ajaxOpt);
}

function sendGetRequestToAPI(endpoint, callback) {
	$.ajax({
		url: environment.api_url + endpoint,
		type: 'GET',
		dataType: 'json',
		crossdomain: true,
		xhrFields: {
			withCredentials: true
		},
		complete: function (response) {
			callback(response);
		}
	});
}

function sendPostRequestWFToAPI(endpoint, data, callback) {
  ajaxOpt = {
    url: environment.api_url + endpoint,
    type: 'POST',
    dataType: 'json',
    crossdomain: true,
    xhrFields: {
      withCredentials: true
    },
    complete: function (response) {
      callback(response);
    }
  };
  if (data != null) {
    formData = new FormData();
    Object.entries(data).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    })
    ajaxOpt.data = formData;
    ajaxOpt.processData = false;
    ajaxOpt.contentType = false;
  }
  $.ajax(ajaxOpt);
}

function sendPostRequestToAPI(endpoint, data, callback) {
	$.ajax({
		url: environment.api_url + endpoint,
		type: 'POST',
		data: data,
		dataType: 'json',
		crossdomain: true,
		xhrFields: {
			withCredentials: true
		},
		complete: function (response) {
			callback(response);
		}
	});
}

function sendPutRequestWFToAPI(endpoint, data, callback) {
  ajaxOpt = {
		url: environment.api_url + endpoint,
		type: 'PUT',
		dataType: 'json',
		crossdomain: true,
		xhrFields: {
			withCredentials: true
		},
		complete: function (response) {
			callback(response);
		}
	};
  if (data != null) {
    formData = new FormData();
    Object.entries(data).forEach((entry) => {
      formData.append(entry[0], entry[1]);
    })
    ajaxOpt.data = formData;
    ajaxOpt.processData = false;
    ajaxOpt.contentType = false;
  }
  $.ajax(ajaxOpt);
}

function sendPutRequestToAPI(endpoint, data, callback) {
  $.ajax({
    url: environment.api_url + endpoint,
    type: 'PUT',
    data: data,
    dataType: 'json',
    crossdomain: true,
    xhrFields: {
      withCredentials: true
    },
    complete: function (response) {
      callback(response);
    }
  });
}

function sendDeleteRequestToAPI(endpoint, callback) {
	$.ajax({
		url: environment.api_url + endpoint,
		type: 'DELETE',
		dataType: 'json',
		crossdomain: true,
		xhrFields: {
			withCredentials: true
		},
		complete: function (response) {
			callback(response);
		}
	});
}

function requestHome(callback, userType, loginFailure = null, params = "") {
  sendGetRequestToAPI('/' + userType + '/home' + params, function (response) {
    if (response.status == 200) {
      callback(response.responseJSON);
    } else if (response.status == 401) {
      if (loginFailure == null) {
        logout(environment.web_manager_url + "/login.html");
      } else {
        loginFailure(response);
      };
    } else if (response.status == 403) {
      window.location.href = environment.web_manager_url + "/" + userType + "/onboard2.html";
    } else if (response.status == 500) {
      toastr.error("Une erreur est survenue");
    };
  });
}

function renderNotifMessageIcon(has_unread_message) {
  if (has_unread_message) {
    $("#msg-btn").attr("src", "../img/icons/msg-icon-notif.svg");
  }
}

function compare(a, b) {
	if (a.inputAdd < b.inputAdd) {
		return -1;
	}
	if (a.inputAdd > b.inputAdd) {
		return 1;
	}
	return 0;
}

function niceDateRangeDisplay(beginningDate, endDate, shortMonth = true) {
  let dateinfoToDisplay;
  let monthOption = shortMonth ? 'short' : 'long';
  if (beginningDate.getTime() == endDate.getTime()) {
    dateinfoToDisplay = 'Le ' + beginningDate.formatDateYmdShort().replace(' ', '\xa0');
  } else {
    let begMonth = beginningDate.toLocaleDateString("fr-FR", {month: monthOption});
    let begYear = beginningDate.getFullYear();
    let endMonth = endDate.toLocaleDateString("fr-FR", {month: monthOption});
    let endYear = endDate.getFullYear();
    let endDisplay = endDate.getDate() + '\xa0' + endMonth + '\xa0' + endYear;
    let begDisplay = beginningDate.getDate().toString();
    begDisplay += ((begYear == endYear) ?
      ((begMonth == endMonth) ? '' : ('\xa0' + begMonth)) :
      ('\xa0' + begMonth + '\xa0' + begYear));
    dateinfoToDisplay = 'Du ' + begDisplay + " au " + endDisplay;
  };
  return dateinfoToDisplay;
}


String.prototype.capitalize = function () {
	return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.uncapitalize = function () {
  return this.charAt(0).toLowerCase() + this.slice(1)
}

Date.prototype.format_hours = function () {
	function format_two_digits(n) {
		return n < 10 ? '0' + n : n;
	}
	let hours = format_two_digits(this.getHours());
	let minutes = format_two_digits(this.getMinutes());
	return hours + "h" + minutes;
}

// Date.prototype.format_hours = function () {
//   return this.toLocaleTimeString("fr-FR",{ hour: '2-digit', minute: '2-digit' }).replace(':', 'h');
// }

Date.prototype.format_date = function () {
  return this.toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }).capitalize();
}

Date.prototype.format_date_short = function () {
	return this.toLocaleDateString("fr-FR", { month: 'short', day: 'numeric' }).capitalize();
}

Date.prototype.formatDateYmdShort = function () {
  return this.toLocaleDateString("fr-FR", { month: 'short', day: 'numeric', year: 'numeric' });
}

Date.prototype.formatDateWymdYShort = function () {
  return this.toLocaleDateString("fr-FR", { weekday: 'short', year: '2-digit', month: 'numeric', day: 'numeric' });
}

Date.prototype.formatDateWymdShort = function () {
  return this.toLocaleDateString("fr-FR", { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
}

Date.prototype.noZoneFormatDateWymdShort = function () {
  // Retourne un affichage local pour une date UTC (sans locale), qu'on souhaite pourtant
  // interpréter comme une date locale.
  // On récupère chacune des composantes de this
  let utcYear = this.getUTCFullYear();
  let utcMonth = this.getUTCMonth();
  let utcDate = this.getUTCDate();
  let utcHours = this.getUTCHours();
  let utcMinutes = this.getUTCMinutes();
  let utcSeconds = this.getUTCSeconds();
  // On réinterprète tout ceci comme si c'était une date locale en construisant un objet date
  let thisAsALocaleDate = new Date(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds)
  return thisAsALocaleDate.toLocaleDateString("fr-FR", { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
}

Date.prototype.noZoneFormatDateDmy = function () {
  // Retourne un affichage local pour une date UTC (sans locale), qu'on souhaite pourtant
  // interpréter comme une date locale.
  // On récupère chacune des composantes de this
  let utcYear = this.getUTCFullYear();
  let utcMonth = this.getUTCMonth();
  let utcDate = this.getUTCDate();
  let utcHours = this.getUTCHours();
  let utcMinutes = this.getUTCMinutes();
  let utcSeconds = this.getUTCSeconds();
  // On réinterprète tout ceci comme si c'était une date locale en construisant un objet date
  let thisAsALocaleDate = new Date(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds)
  return thisAsALocaleDate.toLocaleDateString("fr-FR");
}

Date.prototype.noZoneFormatHour = function () {
  // Retourne un affichage local de l'heure pour une date UTC (sans locale), qu'on souhaite pourtant
  // interpréter comme une date locale.
  // On récupère chacune des composantes utiles de this
  let utcYear = this.getUTCFullYear();
  let utcMonth = this.getUTCMonth();
  let utcDate = this.getUTCDate();
  let utcHours = this.getUTCHours();
  let utcMinutes = this.getUTCMinutes();
  let utcSeconds = this.getUTCSeconds();
  // On réinterprète tout ceci comme si c'était une heure locale en construisant un objet time
  let thisAsALocaleDate = new Date(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds)
  return thisAsALocaleDate.toLocaleTimeString("fr-FR");
}

Date.prototype.format_time = function () {
  return this.toLocaleTimeString("fr-FR", { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' });
}

function combineTextDateAndTime(textDate, textTime) {
  let okDate = (textDate == '' ? new Date().toLocaleDateString("fr-FR") : textDate);
  let okTime = (textTime == '' ? "0:0" : textTime);
  let day = okDate.split("/")[0];
  let month = okDate.split("/")[1];
  let year = okDate.split("/")[2];
  let hour = okTime.split(":")[0];
  let minutes = okTime.split(":")[1];
  return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minutes, 10));
}

function removeZFromString(stringToDezone) {
  return stringToDezone.replaceAll('Z', '');
}

function removeZFromIsoString(stringToDezone) {
  return stringToDezone.replaceAll('.000Z', '');
}

function getDateFromIso(isoDateString) {
  if (isoDateString == '') {
    return '';
  }
  let dateString = isoDateString.split("T")[0];
  let day = dateString.split("-")[2];
  let month = dateString.split("-")[1];
  let year = dateString.split("-")[0];
  return day + "/" + month + "/" + year;
}

function getHourFromIso(isoDateString) {
  if (isoDateString == '' || isoDateString == null) {
    return '';
  }
  let dateString = isoDateString.split("T")[1];
  let hour = dateString.split(":")[0];
  let minutes = dateString.split(":")[1];
  return hour + "h" + minutes;
}

String.prototype.copyToClipboard = function(){
  const el = document.createElement('textarea');
  el.value = this;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

Date.prototype.addDays = function(d) {
  return new Date(this.valueOf()+864E5*d);
}

Date.prototype.asUTC = function(d) {
  return new Date(this.valueOf() - (this.getTimezoneOffset() * 60 * 1000));
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPhoneNumber(str) {
  let cleaned = ('' + str).replace(/\D/g, '');
  let match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    return match[1] + "&nbsp;" + match[2] + "&nbsp;" + match[3] + "&nbsp;" + match[4] + "&nbsp;" + match[5]
  };
  return null
};
