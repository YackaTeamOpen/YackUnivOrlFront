
$(document).keypress(function(event){
	let keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$("#connect-btn").click();
	}
});

let modalValidComputing = false;

$(document).ready(function () {
  document.querySelector("#email").addEventListener('change', function(e) {
    this.value = this.value.trim();
  });
	$("#connect-btn").click(function () {
		const email = $("#email").val().trim();
		const password = $("#password").val();

		if (email == "" || password == "") {
			toastr.error("Veuillez remplir tous les champs.", "Oups !");
		} else {
			var pass = new jsSHA("SHA-256", "TEXT", {numRounds: 1});
			pass.update(password)

			sendPostRequestToAPI('/login',{"email":email,"password":pass.getHash("HEX")},function(response){
				var resp = response.responseJSON
				if (response.status == 200){
          let searchParams = new URLSearchParams(window.location.search);
          if (searchParams.has('returnUrl')) {
            let urlReturnStrStart = window.location.search.indexOf('returnUrl');
            window.location.href = window.location.search.substring(urlReturnStrStart + 10);
          } else {
            if (resp.type == 1) {
              window.location.href = "companies/home.html";
            } else if (resp.type == 2 || resp.type == 4) {
              if (resp.last_login){
                window.location.href = "users/home.html";
              } else {
                window.location.href = "users/onboard2.html";
              }
            } else if (resp.type == 0) {
              window.location.href = "admin/home.html";
            };
          }
				} else if (response.status == 401) {
					toastr.error("Courriel ou mot de passe invalide", "Oups !");
					$("#password").val("");
        } else if (response.status == 403) {
          toastr.error("Vous devez valider votre identifiant avant de pouvoir vous connecter", "Encore une étape !");
          document.querySelector('#resend-emailcheck-div').style.display = "flex";
          $("#password").val("");
				} else {
					toastr.error("Une erreur est survenue : " + response.status, "Oups !");
					$("#password").val("");
				}
			});
		}
	});

	$("#create-btn").click(function(){
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('returnUrl')) {
      let urlReturnStrStart = window.location.search.indexOf('returnUrl');
      window.location.href = "signup.html?" + window.location.search.substring(urlReturnStrStart);
    } else {
		  window.location.href = "signup.html";
    };
	});

  // create forgot password modal html
  let modalElement = document.querySelector("#modals-holder");
  let modalHtml = getConfirmModalHtml(
    elementId = "detail-modal",
    title = "Mot de passe oublié",
    subtitle = "Réinitialisation de votre mot de passe",
    yesButtonText = "Envoyer",
    noButtonText = "Fermer",
    message = "",
    enterInfoLabel = "Courriel",
    enterInfoType = "email",
    enterInfoPlaceholder = "camille.schtroumpf@exemple.fr"
    );
  modalElement.insertAdjacentHTML('beforeend', modalHtml);

	$("#forgot-pwd-btn").click(function () {
		$("#detail-modal").modal("show");
	});

  document.querySelector('#modal-valid-btn').addEventListener("click", function (e) {
    if (! modalValidComputing) {
      modalValidComputing = true;
      const email_forget = $("#enter-info").val();
      if (email_forget != ""){
        sendPostRequestToAPI('/forgot',{"email":email_forget},function(response){
          if (response.status == 200) {
            toastr.success("Un courriel avec des instructions à suivre vient de vous être envoyé. Vérifiez bien que ce lien commence par " + environment.web_manager_url + ".");
            $("#detail-modal").modal("hide");
            // $("#add-error").css("display", "none");
          } else if (response.status == 401) {
            toastr.error("Courriel non reconnu", "Oups !");
            modalValidComputing = false;
          } else {
            toastr.error("Une erreur est survenue", "Oups !");
            modalValidComputing = false;
          }
        });
      } else {
        toastr.error("Indiquez votre courriel !", "Oups !");
        modalValidComputing = false;
      }
    }
	});

  document.querySelector('#resend-emailcheck-btn').addEventListener("click", function(e) {
    const email = $("#email").val().trim();
    if (email == "") {
      toastr.error("Veuillez préciser votre courriel.", "Oups !");
    } else {
      document.querySelector('#resend-emailcheck-btn').style.display = "flex;";
      sendPostRequestToAPI(
        '/resendemailcheck',
        {"email":email},
        function(response) {
          if (response.status == 200) {
            toastr.success("Un courriel avec des instructions à suivre vient de vous être envoyé. Vérifiez bien que ce lien commence par " + environment.web_manager_url + ".");
            document.querySelector('#resend-emailcheck-div').style.display = "none";
          } else if (response.status == 401) {
            toastr.error("Courriel non reconnu", "Oups !");
          } else {
            toastr.error("Une erreur est survenue", "Oups !");
          }
      });
    }
  });

  document.getElementById('email').focus();

});
