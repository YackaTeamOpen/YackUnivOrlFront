var map = null;
var start_marker = null;
var arrival_marker = null;
var last_modified_address = null;

$(document).ready(function () {
	sendGetRequestToAPI('/users/profile', function(response) {
		if (response.status == 403) {
        startRender();
    } else {
      logout(environment.web_manager_url + "/login.html");
    }
	});
});

function startRender() {

	// Tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// Boutons des préférences
	$("#button-music").click(function(){
		$("#button-music").prop("disabled", true);
		if($("#music-id").val() == 1) {
			$("#music-id").val(2);
			$("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/dark_music_icon.svg\" alt=\"User Pic\"/>Je suis pas contre un peu de musique en voiture");
		}else {
			$("#music-id").val(1)
			$("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/light_music_icon.svg\" alt=\"User Pic\"/>Je suis pas contre un peu de musique en voiture");
		}
		$("#button-music").prop("disabled", false);
	});

	$("#button-smoke").click(function(){
		$("#button-smoke").prop("disabled", true);
		if($("#smoke-id").val() == 1) {
			$("#smoke-id").val(2);
			$("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/dark_smoke_icon.svg\" alt=\"User Pic\"/>J'aime bien fumer en voiture");
		}else {
			$("#smoke-id").val(1)
			$("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/light_smoke_icon.svg\" alt=\"User Pic\"/>J'aime bien fumer en voiture");
		}
		$("#button-smoke").prop("disabled", false);
	});

	$("#button-speak").click(function(){
		$("#button-speak").prop("disabled", true);
		if($("#speak-id").val() == 1) {
			$("#speak-id").val(2);
			$("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/dark_speak_icon.svg\" alt=\"User Pic\"/>J'adore parler en voiture");
		}else {
			$("#speak-id").val(1)
			$("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/light_speak_icon.svg\" alt=\"User Pic\"/>J'adore parler en voiture");
		}
		$("#button-speak").prop("disabled", false);
	});

  //Render initial photo button
  $("#photo").attr("src","../img/avatars/default2.png")

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $('#photo').attr('src', e.target.result);
        // $("#photo").css("display","block");
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

	$("#upload-photo").change(function () {
			var fileExtension = ['jpeg', 'jpg', 'png'];
			if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
					toastr.error('Ce type de fichier n\'est pas pris en charge !', 'Erreur');
			} else if (this.files[0].size > 1048576*5) {
				toastr.error('La taille maximale est de 5 Mo !', 'Erreur');
			} else{
				readURL(this);
			}
	});
  document.getElementById('surname').focus();

}

function valid(){
	$("#start_address").removeClass("is-invalid");
	$("#arrival_address").removeClass("is-invalid");

	var name = $("#name").val().trim();
	var surname = $("#surname").val().trim();
	var aboutme = $("#aboutme").val().trim();
	var phone = $("#phone").val().trim();
	// var public_phone = $("#inline-checkbox1").prop("checked");
	var gender = $("#gender").val();
	if (name != "" && surname != "" && aboutme != "" && gender != null) {
		if(phone != "" && !validPhone(phone)) {
			$("#phone").addClass("is-invalid");
		} else {
			next();
		}
	} else {
		if(name == "") {
			$("#name").addClass("is-invalid");
      toastr.error("Merci d'indiquer votre nom. Il ne sera pas visible par les autres utilisateurs.", 'Oups !');
		}
		if (surname == "") {
			$("#surname").addClass("is-invalid");
      toastr.error("Merci d'indiquer votre prénom.", 'Oups !');
		}
		if (aboutme == "") {
			$("#aboutme").addClass("is-invalid");
      toastr.error("Merci d'indiquer un bref commentaire de présentation pour donner confiance aux autres usagers de Yacka.", 'Oups !');
		}
		if (gender == null) {
			$("#gender").addClass("is-invalid");
      toastr.error("Merci d'indiquer votre genre, ça peut compter pour certains usagers de Yacka.", 'Oups !');
		}
	}
}

function next() {
	var send_request = true;

	// Étape 1
	var photo = $("#photo").prop("src");
	var name = $("#name").val();
	var surname = $("#surname").val();
	var phone = $("#phone").val();
	var aboutme = $("#aboutme").val();
	var music_pref = $("#music-id").val();
	var smoking_pref = $("#smoke-id").val();
	var speaking_pref = $("#speak-id").val();
	var gender = $("#gender").val();

	if (send_request == true){
		let datas = {
			"photo": photo,
			"name": name,
			"surname": surname,
			"phone": phone,
			"aboutme": aboutme,
			"music_pref_id": music_pref,
			"smoking_pref_id": smoking_pref,
			"speaking_pref_id": speaking_pref,
			"gender": gender
		};

		sendPostRequestWFToAPI('/user/onboard', datas, function(response) {
			var resp = response.responseJSON;
			console.log(resp);
			if (response.status == 200) {
        toastr.success('Enregistré avec succès.', 'Bravo !');
        let searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('returnUrl')) {
          let urlReturnStrStart = window.location.search.indexOf('returnUrl');
          window.location.href = window.location.search.substring(urlReturnStrStart + 10);
        } else {
				  window.location.href = "home.html";
        };
			} else {
				toastr.error('Une erreur est survenue.', 'Oups !');
			}
		});
	}
}

function validPhone(phone) {
	return phone.match(/^[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/im)
}

function upload_photo(){
	$("#upload-photo").click();
}
