function startRender(res, withAll = true){
	let user_id = res.user.id
  let phone = res.user.phone;
  let photo = res.user.photo;
  let name, surname, email, aboutme, music_pref, smoking_pref, speaking_pref, communities;
  if (withAll) {
    name = res.user.name;
    surname = res.user.surname;
    email = res.user.email;
    aboutme = res.user.aboutme;
    music_pref = res.user.music_pref;
    smoking_pref = res.user.smoking_pref;
    speaking_pref = res.user.speaking_pref;
    communities = res.user.communities;

    // Render preferences
    if (music_pref.id == 1 || music_pref.id == null){
      $("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/light_music_icon.svg\" alt=\"User Pic\"/>");
    }else{
      $("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/dark_music_icon.svg\" alt=\"User Pic\"/>");
    }

    if (smoking_pref.id == 1 || smoking_pref.id == null){
      $("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/light_smoke_icon.svg\" alt=\"User Pic\"/>");
    }else{
      $("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/dark_smoke_icon.svg\" alt=\"User Pic\"/>");
    }

    if (speaking_pref.id == 1 || speaking_pref.id == null){
      $("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/light_speak_icon.svg\" alt=\"User Pic\"/>");
    }else{
      $("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/dark_speak_icon.svg\" alt=\"User Pic\"/>");
    }
  };

	// Render profile
	$("#user-id").val(user_id);
  $("#phone").val(phone);
  if (withAll) {
    $("#name").val(name);
    $("#surname").val(surname);
    $("#email").val(email);
    $("#aboutme").val(aboutme);

    if (music_pref.id != null) $("#music-id").val(music_pref.id);
    else $("#music-id").val(1);

    if (smoking_pref.id != null) $("#smoke-id").val(smoking_pref.id);
    else $("#smoke-id").val(1);

    if (speaking_pref.id != null) $("#speak-id").val(speaking_pref.id);
    else $("#speak-id").val(1);
    // Render communities
    if(communities.length > 0){
      $("#communities-container").html("");
      for (let i = 0; i < communities.length; i++) {
        $("#communities-container").append(`<span class='badge yacka-badge-yellow community-badge mr-1'>${communities[i].name}</span>`);
      }
    }else{
      $("#communities-group").remove()
    }

    $("#button-music").click(function(){
      $("#button-music").prop("disabled", true);
      if($("#music-id").val() == 1) {
        $("#music-id").val(2);
        $("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/dark_music_icon.svg\" alt=\"User Pic\"/>");
      }else {
        $("#music-id").val(1)
        $("#button-music").html("<img class=\"pref-button\" src=\"../img/icons/light_music_icon.svg\" alt=\"User Pic\"/>");
      }
      $("#button-music").prop("disabled", false);
    })

    $("#button-smoke").click(function(){
      $("#button-smoke").prop("disabled", true);
      if($("#smoke-id").val() == 1) {
        $("#smoke-id").val(2);
        $("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/dark_smoke_icon.svg\" alt=\"User Pic\"/>");
      }else {
        $("#smoke-id").val(1)
        $("#button-smoke").html("<img class=\"pref-button\" src=\"../img/icons/light_smoke_icon.svg\" alt=\"User Pic\"/>");
      }
      $("#button-smoke").prop("disabled", false);
    })

    $("#button-speak").click(function(){
      $("#button-speak").prop("disabled", true);
      if($("#speak-id").val() == 1) {
        $("#speak-id").val(2);
        $("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/dark_speak_icon.svg\" alt=\"User Pic\"/>");
      }else {
        $("#speak-id").val(1)
        $("#button-speak").html("<img class=\"pref-button\" src=\"../img/icons/light_speak_icon.svg\" alt=\"User Pic\"/>");
      }
      $("#button-speak").prop("disabled", false);
    })
  }

  //Render Photo
  if (photo){
    $("#photo").attr("src",photo)
  }else{
    $("#photo").attr("src","../img/avatars/default2.png")
  }


  function readURL(input) {
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.onload = function(e) {
        $('#photo').attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#upload-photo").change(function () {
      let fileExtension = ['jpeg', 'jpg', 'png'];
      if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
        toastr.error('Ce type de fichier n\'est pas pris en charge !', 'Erreur');
      } else if (this.files[0].size > 1048576 * 5) {
		    toastr.error('La taille maximale est de 5 Mo !', 'Erreur');
      } else {
        readURL(this);
				toastr.info('Pensez à enregistrer afin de valider votre choix', 'Photo');
      };
  });
}

// Click button to save
function saveProfile(withAll = true) {
	let id = $("#user-id").val();
  let phone = $("#phone").val().trim();
  let photo = $("#photo").prop("src");
  let data = {
    "photo":photo,
    "phone":phone,
  };
  if (withAll) {
    let name = $("#name").val().trim();
    let surname = $("#surname").val().trim();
    let aboutme = $("#aboutme").val().trim();
    let music_pref_id = $("#music-id").val();
    let smoking_pref_id = $("#smoke-id").val();
    let speaking_pref_id = $("#speak-id").val();

    data["name"] = name;
    data["surname"] = surname;
    data["aboutme"] = aboutme;
    data["music_pref_id"] = music_pref_id;
    data["smoking_pref_id"] = smoking_pref_id;
    data["speaking_pref_id"] = speaking_pref_id;
  };

	let valid_form = validateProfileData(data, withAll);
  if (valid_form) {
    $("#save").prop("disabled", true);
    function saveProfileCallback(response) {
  		  if (response.status == 200){
        $("#save").prop("disabled", false);
        toastr.success('Enregistré avec succès.', 'Succès');
  		  } else {
        $("#save").prop("disabled", false);
        toastr.error('Une erreur est survenue', 'Erreur');
  		  }
    }
    sendPutRequestWFToAPI("/user/" + id, data, saveProfileCallback);
  }
}

function validateProfileData(data, withAll = true) {
	let regName = /^[a-zA-ZÀ-ÿ ,.'-]+$/i
	let regSurname = /^[a-zA-ZÀ-ÿ ,.'-]+$/i
	// const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let regPhone = /^[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/
	let valid = true;
  if (withAll) {
    if (data.name == "" || !regName.test(data.name)) {
      toastr.error("Merci d'indiquer un nom valide. Il ne sera pas visible par les autres utilisateurs.", 'Oups !');
      valid = false;
    };
    if (data.surname == "" || !regSurname.test(data.surname)) {
      toastr.error("Merci d'indiquer un prénom valide.", 'Oups !');
      valid = false;
    };
    if (data.aboutme == "") {
      toastr.error("Merci d'indiquer un bref commentaire de présentation pour donner confiance aux autres usagers de Yacka.", 'Oups !');
      valid = false;
    };
  };
  if (data.phone != "" && !regPhone.test(data.phone)) {
    toastr.error('Numéro de téléphone non valide', 'Erreur');
    valid = false;
  };
	return valid;
}

function upload_photo(){
	$("#upload-photo").click();
}


function displayChangePassword(display){
  if (display == 0){
    $("#div-change-password").slideDown(300);
    $("#button-display").attr("onClick","displayChangePassword(1)")
  }
  if (display == 1){
    $("#div-change-password").slideUp(300);
    $("#button-display").attr("onClick","displayChangePassword(0)")
  }
}

function changePassword(){
  /*
  * (?=.*[a-z]) The string must contain at least 1 lowercase alphabetical character.
  * (?=.*[A-Z]) The string must contain at least 1 uppercase alphabetical character.
  * (?=.*[0-9]) The string must contain at least 1 numeric character.
  * (?=.{8,})   The string must be eight characters or longer.
  */
  let pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

  let valid = true;
  if ($("#old-password").val() == ""){
    $("#old-password").addClass("is-invalid");
    valid = false;
  }

  if ($("#new-password").val() == ""){
    $("#new-password").addClass("is-invalid");
    valid = false;
  }

  if ($("#new-password").val() != $("#new-password-confirm").val()){
    $("#new-password").addClass("is-invalid");
    $("#new-password-confirm").addClass("is-invalid");
    valid = false;
  }

  if (!pwdRegex.test($("#new-password").val())){
    $("#new-password").addClass("is-invalid");
    $("#new-password-confirm").addClass("is-invalid");
    valid = false;
  }

  if(!valid){
    return;
  }
  let old_pass = new jsSHA("SHA-256", "TEXT", {numRounds: 1});
  let new_pass = new jsSHA("SHA-256", "TEXT", {numRounds: 1});

  $("#change-password").attr("disabled", true);
  old_pass.update($("#old-password").val());
  new_pass.update($("#new-password").val());

  let data = {
    "password":old_pass.getHash("HEX"),
    "new_password":new_pass.getHash("HEX")
  };

  function validModalPasswordCallback(response){
    if (response.status == 200){
      toastr.success("Mot de passe modifié avec succès.", "Succès");
      $("#old-password").val("");
      $("#new-password").val("");
      $("#new-password-confirm").val("");
      $("#old-password").removeClass("is-invalid");
      $("#new-password").removeClass("is-invalid");
      $("#new-password-confirm").removeClass("is-invalid");
      $("#change-password").attr("disabled", false);
    }else if (response.status == 400){
      toastr.error("Ancien mot de passe incorrect.", "Erreur");
      $("#old-password").val("");
      $("#new-password").val("");
      $("#new-password-confirm").val("");
      $("#old-password").removeClass("is-invalid");
      $("#new-password").removeClass("is-invalid");
      $("#new-password-confirm").removeClass("is-invalid");
      $("#change-password").attr("disabled", false);
    }else{
      toastr.error("Une erreur est survenue.", "Erreur");
      $("#old-password").val("");
      $("#new-password").val("");
      $("#new-password-confirm").val("");
      $("#old-password").removeClass("is-invalid");
      $("#new-password").removeClass("is-invalid");
      $("#new-password-confirm").removeClass("is-invalid");
      $("#change-password").attr("disabled", false);
    }
  }
  sendRequestToAPI('POST', '/password', data, validModalPasswordCallback);
}

function exportYackagenda(){
  sendRequestToAPI('GET', '/user/calendar', null, function (response){
    if (response.status == 200 || response.status == 201){
      let resp = response.responseJSON;
      resp.url.copyToClipboard();
      toastr.info(resp.url, "Url d'export de votre YackAgenda copiée dans votre presse papier");
    }else{
      toastr.error("Une erreur est survenue");
    }
  });
}

function displayUnsubscribe(display){
  if (display == 0){
    $("#div-unsubscribe").slideDown(300);
    $("#button-display-unsubscribe").attr("onClick","displayUnsubscribe(1)")
  }
  if (display == 1){
    $("#div-unsubscribe").slideUp(300);
    $("#button-display-unsubscribe").attr("onClick","displayUnsubscribe(0)")
  }
}

function displayDownload(display){
  if (display == 0){
    $("#div-download").slideDown(300);
    $("#button-display-download").attr("onClick","displayDownload(1)")
  }
  if (display == 1){
    $("#div-download").slideUp(300);
    $("#button-display-download").attr("onClick","displayDownload(0)")
  }
}

function unsubscribe(){
  sendRequestToAPI('DELETE', '/unsubscribe', null, function(response){
    if (response.status == 200){
      toastr.success("Vous allez nous manquer. Au revoir.", "Succès");
      window.location.href = environment.web_manager_url + "/index.html";
    } else {
      toastr.error("Une erreur est survenue.", "Erreur");
    }
  });
}

function make_download(data) {
  let filename, link;
  let csv = data;
  filename = 'vos-donnees.json';
  csv = 'data:text/csv;charset=utf-8,' + csv;
  let fullData = encodeURI(csv);
  link = document.createElement('a');
  link.setAttribute('href', fullData);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloaddata(){
  sendRequestToAPI('GET', '/user/askdata', null, function(response){
    if (response.status == 200){
      make_download(response.responseJSON.toString())
    }else{
      toastr.error("Une erreur est survenue.", "Erreur");
    }
  });
}

